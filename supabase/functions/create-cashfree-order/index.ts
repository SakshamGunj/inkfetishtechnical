
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { amount, customer_phone, customer_name, customer_email } = await req.json()

        const CLIENT_ID = '11224099eac214bd329a2eee86d9042211';
        const CLIENT_SECRET = 'cfsk_ma_prod_bfe9fc5e4670cc7c7fefd9363f027a72_efa3a41c';

        // Use Real Amounts
        const orderAmount = amount;

        const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        const payload = {
            order_amount: orderAmount,
            order_currency: "INR",
            order_id: orderId,
            customer_details: {
                customer_id: customer_email.replace(/[^a-zA-Z0-9]/g, '_'),
                customer_phone: customer_phone,
                customer_name: customer_name,
                customer_email: customer_email
            },
            order_meta: {
                return_url: `${req.headers.get('origin')}/indian-writers-league?order_id={order_id}`
            }
        };

        const response = await fetch('https://api.cashfree.com/pg/orders', {
            method: 'POST',
            headers: {
                'x-client-id': CLIENT_ID,
                'x-client-secret': CLIENT_SECRET,
                'x-api-version': '2023-08-01',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create order');
        }

        return new Response(
            JSON.stringify(data),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
