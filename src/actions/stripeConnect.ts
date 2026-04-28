'use server';

import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function createStripeConnectAccount() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'VENDOR') {
    return { success: false, error: 'Unauthorized' };
  }

  const vendor = await prisma.vendorProfile.findUnique({
    where: { userId: session.user.id }
  });

  if (!vendor) return { success: false, error: 'Vendor profile not found' };

  let stripeAccountId = vendor.stripeConnectId;

  // 1. Create a new Stripe Connect Account if one doesn't exist
  if (!stripeAccountId) {
    const account = await stripe.accounts.create({
      type: 'express',
      email: session.user.email!,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      metadata: {
        vendorId: vendor.id,
      }
    });
    
    stripeAccountId = account.id;
    await prisma.vendorProfile.update({
      where: { id: vendor.id },
      data: { stripeConnectId: stripeAccountId }
    });
  }

  // 2. Create an Account Link for onboarding
  const accountLink = await stripe.accountLinks.create({
    account: stripeAccountId,
    refresh_url: `${process.env.NEXT_PUBLIC_SITE_URL}/vendor/settings?stripe=refresh`,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/vendor/settings?stripe=success`,
    type: 'account_onboarding',
  });

  return { success: true, url: accountLink.url };
}

export async function checkStripeAccountStatus(stripeAccountId: string, vendorId: string) {
  const account = await stripe.accounts.retrieve(stripeAccountId);
  
  if (account.details_submitted) {
    await prisma.vendorProfile.update({
      where: { id: vendorId },
      data: { isStripeConnected: true }
    });
    return true;
  }
  
  return false;
}
