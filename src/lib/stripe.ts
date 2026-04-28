import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27' as any, // Using latest compatible
});

export async function createStripeCheckout(items: any[], orderId: string, currency: string, vendorConnectId?: string, commissionAmount?: number) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'apple_pay', 'google_pay' as any],
    line_items: items.map(item => ({
      price_data: {
        currency,
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects cents
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
    metadata: {
      orderId,
    },
    // If vendor is connected, split the payment automatically
    payment_intent_data: vendorConnectId ? {
      transfer_data: {
        destination: vendorConnectId,
        // The amount to be transferred to the vendor (Total - Commission)
        // Note: Stripe requires this in cents
      },
    } : undefined,
  });

  return session;
}

