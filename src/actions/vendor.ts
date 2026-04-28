'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { sendNotification } from '@/lib/serverNotify';

export async function approveVendor(vendorProfileId: string) {
  try {
    const updated = await prisma.vendorProfile.update({
      where: { id: vendorProfileId },
      data: { 
        isApproved: true,
        rejectionReason: null 
      }
    });

    await sendNotification(
      updated.userId,
      'Account Verified! 🎉',
      'Your vendor account has been approved. You can now start adding products.',
      'SYSTEM'
    );
    
    revalidatePath('/admin/documents');
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function rejectVendor(vendorProfileId: string, reason: string) {
  try {
    const updated = await prisma.vendorProfile.update({
      where: { id: vendorProfileId },
      data: { 
        isApproved: false,
        rejectionReason: reason 
      }
    });

    await sendNotification(
      updated.userId,
      'Document Review Failed ❌',
      `Your account verification failed. Reason: ${reason}. Please re-upload valid documents.`,
      'SYSTEM'
    );
    
    revalidatePath('/admin/documents');
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
