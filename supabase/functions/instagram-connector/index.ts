import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const VERIFY_TOKEN = "AUTHORVERSE_WEBHOOK_VERIFY";

console.log("Instagram Webhook Function is running!");

serve(async (req) => {
    const { method } = req;

    // 1. Handle Verification (GET)
    if (method === "GET") {
        const url = new URL(req.url);
        const mode = url.searchParams.get("hub.mode");
        const token = url.searchParams.get("hub.verify_token");
        const challenge = url.searchParams.get("hub.challenge");

        if (mode && token) {
            if (mode === "subscribe" && token === VERIFY_TOKEN) {
                console.log("WEBHOOK_VERIFIED");
                return new Response(challenge, { status: 200 });
            } else {
                return new Response("Forbidden", { status: 403 });
            }
        }
    }

    // 2. Handle Events (POST)
    if (method === "POST") {
        try {
            const payload = await req.json();
            console.log("Received Webhook Payload:", JSON.stringify(payload));

            const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
            const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
            const supabase = createClient(supabaseUrl, supabaseKey);

            // NUCLEAR DEBUGGING: Log the raw payload to the DB
            const { error: logError } = await supabase.from('instagram_mentions').insert({
                instagram_media_id: 'log_' + Date.now() + '_' + Math.random(), // Ensure uniqueness
                type: 'DEBUG_LOG',
                username: 'Webhook Logger',
                caption: JSON.stringify(payload).substring(0, 500),
                timestamp: new Date().toISOString(),
                status: 'unread'
            });

            if (logError) {
                console.error("Critical DB Error:", logError);
                // Return 500 so Meta reports failure
                return new Response(JSON.stringify({ error: "DB_WRITE_FAILED", details: logError }), { status: 500 });
            }

            // Helper to process a mention
            const processMention = async (mention: any) => {
                const { error } = await supabase
                    .from('instagram_mentions')
                    .upsert({
                        instagram_media_id: mention.media_id || mention.comment_id,
                        type: mention.media_id ? 'MENTION' : 'COMMENT',
                        username: 'Sample User', // Samples often lack username
                        caption: 'This is a test mention from Meta.',
                        timestamp: new Date().toISOString(),
                        status: 'unread'
                    }, { onConflict: 'instagram_media_id' });
                if (error) console.error("Error saving mention:", error);
            };

            // 1. Handle Meta "Sample" Payload (Flat structure)
            if (payload.field === 'mentions' && payload.value) {
                console.log("Processing Sample Payload");
                await processMention(payload.value);
                return new Response("SAMPLE_PROCESSED", { status: 200 });
            }

            // Iterate through entries and changes
            if (payload.entry && payload.entry.length > 0) {
                for (const entry of payload.entry) {
                    // entry.messaging is for detailed messages, entry.changes is for fields like 'mentions'
                    if (entry.changes && entry.changes.length > 0) {
                        for (const change of entry.changes) {
                            if (change.field === 'mentions') {
                                const mention = change.value;
                                // Insert into DB
                                const { error } = await supabase
                                    .from('instagram_mentions')
                                    .upsert({
                                        instagram_media_id: mention.media_id || mention.comment_id,
                                        type: mention.media_id ? 'MENTION' : 'COMMENT', // Heuristic
                                        username: 'Unknown', // Webhook implies it but doesn't always send username in 'value'
                                        timestamp: new Date().toISOString(),
                                        status: 'unread'
                                    }, { onConflict: 'instagram_media_id' });

                                if (error) console.error("Error saving mention:", error);
                            }
                        }
                    }
                }
            }

            return new Response("EVENT_RECEIVED", { status: 200 });
        } catch (error) {
            console.error("Webhook Error:", error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
    }

    return new Response("Not Found", { status: 404 });
});
