import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, paymentId, signature, formData } = body;

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { error: 'Missing payment verification data' },
        { status: 400 }
      );
    }

    // Verify Razorpay signature
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '');
    shasum.update(`${orderId}|${paymentId}`);
    const digest = shasum.digest('hex');

    if (digest !== signature) {
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      );
    }

    // Payment verified successfully
    // TODO: Save registration to database here
    console.log('Payment verified for:', {
      orderId,
      paymentId,
      formData,
    });

    // Here you would:
    // 1. Save registration to database
    // 2. Send confirmation email
    // 3. Create certificate record
    // 4. Add to anthology

    return NextResponse.json(
      {
        success: true,
        message: 'Payment verified and registration saved',
        paymentId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verify payment error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
