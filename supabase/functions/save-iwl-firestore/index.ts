
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { initializeApp, cert, getApps } from "npm:firebase-admin@11.11.0/app";
import { getFirestore } from "npm:firebase-admin@11.11.0/firestore";
import serviceAccount from "./service-account.json" assert { type: "json" };

console.log("Hello from save-iwl-firestore!");

// Initialize Firebase Admin (Singleton pattern)
if (getApps().length === 0) {
    initializeApp({
        credential: cert(serviceAccount)
    });
}

const db = getFirestore();

serve(async (req) => {
    // CORS Helper
    if (req.method === 'OPTIONS') {
        return new Response('ok', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
            }
        })
    }

    try {
        const {
            orderId,
            name,
            email,
            whatsapp,
            category,
            plan,
            submission1,
            submission2,
            submissionType
        } = await req.json();

        console.log(`Saving submission type ${submissionType} for Order: ${orderId}`);

        // Reference to 'iwl_submissions' collection in Firestore
        const docRef = db.collection('iwl_submissions').doc(orderId);

        // Prepare data to merge
        // We want to handle multiple submissions incrementally
        const dataToUpdate: any = {
            orderId,
            name,
            email,
            whatsapp,
            category,
            plan,
            updatedAt: new Date().toISOString()
        };

        if (submissionType === 1) {
            dataToUpdate.submission1 = submission1;
            dataToUpdate.status = "partial_submission";
        } else if (submissionType === 2) {
            dataToUpdate.submission2 = submission2;
            dataToUpdate.status = "full_submission";
        }

        // Use set with merge: true to upset
        await docRef.set(dataToUpdate, { merge: true });

        console.log("✅ Written to Firestore successfully.");

        return new Response(
            JSON.stringify({ success: true, message: "Saved to Firestore" }),
            { headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' } }
        );

    } catch (error) {
        console.error("Error saving to Firestore:", error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' } }
        )
    }
})
