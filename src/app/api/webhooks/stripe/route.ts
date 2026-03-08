import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createPurchase } from '@/lib/purchases';
import { headers } from 'next/headers';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY not set');
  }
  return new Stripe(key);
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature') || '';
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const productId = session.metadata?.productId;
    const stripeSessionId = session.id;

    if (userId && productId) {
      await createPurchase(userId, productId, stripeSessionId);
      console.log(`Purchase created: user=${userId}, product=${productId}`);
    }
  }

  return NextResponse.json({ received: true });
}
