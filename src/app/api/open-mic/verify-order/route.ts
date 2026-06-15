import { NextResponse } from 'next/server';
import { Cashfree, CFEnvironment } from 'cashfree-pg';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order_id } = body;

    if (!order_id) {
      return NextResponse.json(
        { error: 'Missing order_id' },
        { status: 400 }
      );
    }

    // Set up Cashfree credentials
    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    const mode = process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox';

    if (!appId || !secretKey) {
      return NextResponse.json(
        { error: 'Payment gateway configuration error' },
        { status: 500 }
      );
    }

    Cashfree.XClientId = appId;
    Cashfree.XClientSecret = secretKey;
    Cashfree.XEnvironment = mode === 'production' ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX;

    // Fetch order from Cashfree
    const response = await Cashfree.PGFetchOrder("2025-01-01", order_id);
    const orderStatus = response.data.order_status;

    if (orderStatus === 'PAID') {
      // Update the CSV record from PENDING to PAID instead of using Supabase
      try {
        const csvPath = path.join(process.cwd(), 'open_mic_registrations.csv');
        if (fs.existsSync(csvPath)) {
          const content = fs.readFileSync(csvPath, 'utf8');
          const lines = content.split('\n');
          const newLines = lines.map(line => {
            if (line.startsWith(order_id + ',')) {
              return line.replace('"PENDING"', '"PAID"');
            }
            return line;
          });
          fs.writeFileSync(csvPath, newLines.join('\n'));
        }
      } catch (fsError) {
        console.error('Error updating CSV to PAID:', fsError);
      }

      return NextResponse.json({ status: 'PAID' });
    } else {
      return NextResponse.json({ status: orderStatus });
    }

  } catch (error: any) {
    console.error('Error verifying Cashfree order:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to verify payment order' },
      { status: 500 }
    );
  }
}
