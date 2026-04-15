
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
        const { order_id } = await req.json()

        const CLIENT_ID = '11224099eac214bd329a2eee86d9042211';
        const CLIENT_SECRET = 'cfsk_ma_prod_bfe9fc5e4670cc7c7fefd9363f027a72_efa3a41c';

        console.log(`Verifying Payment for Order: ${order_id}`);

        const response = await fetch(`https://api.cashfree.com/pg/orders/${order_id}`, {
            method: 'GET',
            headers: {
                'x-client-id': CLIENT_ID,
                'x-client-secret': CLIENT_SECRET,
                'x-api-version': '2023-08-01',
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        console.log("Cashfree Verify Response:", data);

        return new Response(
            JSON.stringify(data),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )
    }
})
