'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { sendNotification } from '@/lib/serverNotify';

export async function updateOrderStatusAndSettle(orderItemId: string, newStatus: string) {
  try {
    // We use Prisma Transaction to ensure absolute data integrity for money matters
    const result = await prisma.$transaction(async (tx) => {
      // 1. Fetch the order item and ensure it's not already settled
      const orderItem = await tx.orderItem.findUnique({
        where: { id: orderItemId },
        include: {
          product: {
            include: {
              vendor: {
                include: { vendorProfile: true }
              }
            }
          }
        }
      });

      if (!orderItem) throw new Error('Order item not found');
      if (orderItem.isSettled) throw new Error('This order item has already been settled.');

      // 2. Update status
      const updatedItem = await tx.orderItem.update({
        where: { id: orderItemId },
        data: { vendorStatus: newStatus }
      });

      // 3. If Delivered, process automatic settlement
      if (newStatus === 'DELIVERED') {
        const vendorProfile = orderItem.product.vendor.vendorProfile;
        if (!vendorProfile) throw new Error('Vendor profile not found for settlement');

        const grossAmount = orderItem.price * orderItem.quantity;
        const commissionRate = vendorProfile.commissionRate;
        
        // Calculate the cut
        const commissionAmount = (grossAmount * commissionRate) / 100;
        const netVendorAmount = grossAmount - commissionAmount;

        // Add to Vendor Wallet
        await tx.vendorProfile.update({
          where: { id: vendorProfile.id },
          data: { walletBalance: { increment: netVendorAmount } }
        });

        // Record Vendor Transaction
        await tx.walletTransaction.create({
          data: {
            vendorProfileId: vendorProfile.id,
            amount: netVendorAmount,
            type: 'EARNING',
            description: `Earning for Order Item ${orderItemId}`,
            orderId: orderItem.orderId
          }
        });

        // Record Admin Profit in Ledger
        await tx.profitLedger.create({
          data: {
            orderItemId: orderItemId,
            vendorId: vendorProfile.userId,
            grossAmount: grossAmount,
            commissionRate: commissionRate,
            netCommission: commissionAmount
          }
        });

        // Mark as settled
        await tx.orderItem.update({
          where: { id: orderItemId },
          data: { isSettled: true }
        });

        // 4. Send Real-time Wallet Alert Notification to Vendor
        await sendNotification(
          vendorProfile.userId,
          'Wallet Settlement Complete 💸',
          `$${netVendorAmount.toFixed(2)} has been added to your withdrawable balance for Order ${orderItem.id}.`,
          'WALLET'
        );
      }

      return updatedItem;
    });

    revalidatePath('/admin/dashboard');
    return { success: true, data: result };

  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
