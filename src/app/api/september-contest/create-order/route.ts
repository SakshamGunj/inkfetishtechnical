import { NextResponse } from 'next/server';
import { Cashfree, CFEnvironment } from 'cashfree-pg';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, amount } = body;

    if (!name || !email || !phone || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Set up Cashfree credentials
    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    const mode = process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox';

    if (!appId || !secretKey) {
      console.error('Cashfree credentials are not set in environment variables');
      return NextResponse.json(
        { error: 'Payment gateway configuration error' },
        { status: 500 }
      );
    }

    const environment = mode === 'production' ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX;
    const cashfree = new Cashfree(environment, appId, secretKey);
    cashfree.XApiVersion = "2025-01-01";

    // Generate unique order ID
    const orderId = `sept_contest_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const orderAmount = Number(amount);

    // Sanitize data for Cashfree strict validations
    let cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length > 10) cleanPhone = cleanPhone.slice(-10);
    if (cleanPhone.length < 10) cleanPhone = '9999999999'; // fallback to pass validation
    
    let cleanName = name.replace(/[^a-zA-Z0-9 ]/g, '').trim();
    if (cleanName.length < 3) cleanName = (cleanName + ' User').substring(0, 50);

    const request = {
      order_amount: orderAmount,
      order_currency: 'INR',
      order_id: orderId,
      customer_details: {
        customer_id: cleanPhone,
        customer_phone: cleanPhone,
        customer_email: email || "test@test.com",
        customer_name: cleanName.substring(0, 50),
      },
      order_meta: {
        return_url: `https://www.inkfetish.in/september-writing-contest?order_id={order_id}`,
      },
      order_note: `September Contest Registration for ${cleanName}`
    };

    const response = await cashfree.PGCreateOrder(request);
    
    return NextResponse.json({
      payment_session_id: response.data.payment_session_id,
      order_id: response.data.order_id,
    });

  } catch (error: any) {
    const errorDetails = error.response?.data || error.message || "Unknown error";
    console.error('Error creating Cashfree order:', errorDetails);
    
    let errorMsg = 'Failed to create payment order';
    if (typeof errorDetails === 'object' && errorDetails !== null) {
        if (errorDetails.message) errorMsg = errorDetails.message;
        else errorMsg = JSON.stringify(errorDetails);
    } else if (typeof errorDetails === 'string') {
        errorMsg = errorDetails;
    }

    return NextResponse.json(
      { error: `Cashfree Error: ${errorMsg}` },
      { status: 500 }
    );
  }
}
