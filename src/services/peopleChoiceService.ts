import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface PeopleChoiceNominationData {
  fullName: string;
  email: string;
  whatsapp: string;
  age: string;
}

export interface PeopleChoiceNominationResponse {
  success: boolean;
  message: string;
  nominationId?: string;
  error?: string;
}

const COLLECTION_NAME = "people_choice_registrations";

/**
 * Saves initial nomination details into Firestore when candidate completes Step 1.
 * Uses Server API route (Firebase Admin) to guarantee zero permission errors,
 * with client-side fallback if offline.
 */
export const savePeopleChoiceNomination = async (
  data: PeopleChoiceNominationData
): Promise<PeopleChoiceNominationResponse> => {
  try {
    if (!data.fullName || !data.email || !data.age) {
      return {
        success: false,
        message: "Required nomination details missing."
      };
    }

    // 1. Try server API route using Firebase Admin SDK (bypasses Firestore Security Rules)
    try {
      const res = await fetch('/api/people-choice/nominate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'CREATE_NOMINATION',
          fullName: data.fullName,
          email: data.email,
          whatsapp: data.whatsapp,
          age: data.age
        })
      });

      if (res.ok) {
        const result = await res.json();
        if (result.nominationId) {
          return {
            success: true,
            message: "Initial nomination saved successfully.",
            nominationId: result.nominationId
          };
        }
      }
    } catch (apiErr) {
      console.warn("Server API nomination save fallback to client SDK:", apiErr);
    }

    // 2. Client SDK fallback
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    const nominationId = `pca_${timestamp}_${randomSuffix}`;

    const docRef = doc(db, COLLECTION_NAME, nominationId);
    await setDoc(docRef, {
      nomination_id: nominationId,
      name: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      whatsapp: data.whatsapp.trim(),
      age: data.age,
      payment_status: "STEP1_COMPLETED",
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    }, { merge: true });

    return {
      success: true,
      message: "Initial nomination saved via client SDK.",
      nominationId
    };
  } catch (error) {
    console.error("Error saving People's Choice nomination to Firestore:", error);
    return {
      success: false,
      message: "Failed to save nomination to database.",
      error: error instanceof Error ? error.message : "Unknown database error"
    };
  }
};

/**
 * Updates an existing nomination record in Firestore with selected plan details.
 */
export const updateNominationPlan = async (
  nominationId: string,
  plan: number
): Promise<boolean> => {
  try {
    if (!nominationId) return false;

    // 1. Try server API route using Firebase Admin SDK
    try {
      const res = await fetch('/api/people-choice/nominate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'UPDATE_PLAN',
          nominationId,
          plan
        })
      });
      if (res.ok) return true;
    } catch (apiErr) {
      console.warn("Server API plan update fallback to client SDK:", apiErr);
    }

    // 2. Client SDK fallback
    const docRef = doc(db, COLLECTION_NAME, nominationId);
    await updateDoc(docRef, {
      plan_amount: plan,
      payment_status: "PENDING",
      updated_at: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating nomination plan in Firestore:", error);
    return false;
  }
};
