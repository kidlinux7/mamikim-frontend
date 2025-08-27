import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export async function POST(req: NextRequest) {
  try {
    const { courseId, courseTitle, price, studentId } = await req.json();
    if (!courseId || !courseTitle || !price || !studentId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'tzs',
            product_data: {
              name: courseTitle,
            },
            unit_amount: price * 100, // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${courseId}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${courseId}?canceled=1`,
      metadata: {
        courseId,
        studentId, // Pass studentId in metadata
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe session error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Webhook handler for Stripe events
export async function webhookHandler(req: NextRequest) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!
  );
  const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
  });

  const sig = req.headers.get('stripe-signature');
  const rawBody = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response(`Webhook Error: ${(err as Error).message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    
    const session = event.data.object as any;
    const courseId = session.metadata.courseId;
    const studentId = session.metadata.studentId; // You must pass this in metadata when creating the session
    const paymentIntentId = session.payment_intent;
    const price = session.amount_total / 100;
    const currency = session.currency;
    const paymentStatus = session.payment_status;


    // Insert transaction
    const { data: transaction, error: txError } = await supabaseAdmin
      .from('transactions')
      .insert({
        course_id: courseId,
        student_id: studentId,
        stripe_payment_intent_id: paymentIntentId,
        price,
        currency,
        payment_status: paymentStatus,
      })
      .select()
      .single();

    if (txError) {
      return new Response('Failed to record transaction', { status: 500 });
    }

    // Insert enrollment
    const { error: enrollError } = await supabaseAdmin
      .from('enrollment')
      .insert({
        course_id: courseId,
        student_id: studentId,
        transaction_id: transaction.id,
      });

    if (enrollError) {
      return new Response('Failed to enroll student', { status: 500 });
    }
  }

  return new Response('Webhook received', { status: 200 });
} 