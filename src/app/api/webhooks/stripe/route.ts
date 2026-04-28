import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { sendNotification } from '@/lib/serverNotify';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as any;

  if (event.type === 'checkout.session.completed') {
    const orderId = session.metadata.orderId;

    // 1. Update Order Status
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'PAID', stripePaymentId: session.id },
      include: { items: true }
    });

    // 2. Notify Customer
    await sendNotification(
      order.customerId,
      'Payment Successful! 💳',
      `Your order #${orderId} has been paid successfully.`,
      'ORDER'
    );

    // 3. Notify Vendors
    for (const item of order.items) {
      await sendNotification(
        item.vendorId,
        'New Paid Order! 📦',
        `A new order has been paid for your product. Check your dashboard.`,
        'ORDER'
      );
    }
  }

  // Handle Stripe Connect Account Updates
  if (event.type === 'account.updated') {
    const account = event.data.object as any;
    if (account.details_submitted) {
      await prisma.vendorProfile.update({
        where: { stripeConnectId: account.id },
        data: { isStripeConnected: true }
      });
    }
  }

  return new NextResponse(null, { status: 200 });
}

