import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface RegistrationData {
  name: string;
  instagram: string;
  whatsapp: string;
  registrationDate?: any;
  tier?: string;
  status?: string;
  paymentStatus?: string;
  userId?: string;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  registrationId?: string;
  error?: string;
}

// Collection name for registrations
const REGISTRATIONS_COLLECTION = "competition_registrations";

/**
 * Register a new user for the writing competition
 */
export const registerUser = async (data: RegistrationData): Promise<RegistrationResponse> => {
  try {
    // Validate required fields
    if (!data.name || !data.instagram || !data.whatsapp) {
      return {
        success: false,
        message: "All fields are required (name, instagram, whatsapp)"
      };
    }

    // Check if user already registered with same WhatsApp or Instagram
    const existingRegistration = await checkExistingRegistration(data.whatsapp, data.instagram);
    if (existingRegistration.exists) {
      return {
        success: false,
        message: `Registration already exists with this ${existingRegistration.field}. Each user can only register once.`
      };
    }

    // Prepare registration data
    const registrationData = {
      name: data.name.trim(),
      instagram: data.instagram.trim().toLowerCase(),
      whatsapp: data.whatsapp.trim(),
      tier: data.tier || "Silver", // Default to Silver tier
      status: data.status || "registered",
      paymentStatus: data.paymentStatus || "pending",
      registrationDate: serverTimestamp(),
      userId: generateUserId(), // Generate unique user ID
    };

    // Add to Firestore
    const docRef = await addDoc(collection(db, REGISTRATIONS_COLLECTION), registrationData);

    return {
      success: true,
      message: "Registration successful! You will receive confirmation on WhatsApp shortly.",
      registrationId: docRef.id
    };

  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      message: "Registration failed. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

/**
 * Check if user already registered with same WhatsApp or Instagram
 */
const checkExistingRegistration = async (whatsapp: string, instagram: string) => {
  try {
    // Check WhatsApp
    const whatsappQuery = query(
      collection(db, REGISTRATIONS_COLLECTION),
      where("whatsapp", "==", whatsapp.trim())
    );
    const whatsappSnapshot = await getDocs(whatsappQuery);
    
    if (!whatsappSnapshot.empty) {
      return { exists: true, field: "WhatsApp number" };
    }

    // Check Instagram
    const instagramQuery = query(
      collection(db, REGISTRATIONS_COLLECTION),
      where("instagram", "==", instagram.trim().toLowerCase())
    );
    const instagramSnapshot = await getDocs(instagramQuery);
    
    if (!instagramSnapshot.empty) {
      return { exists: true, field: "Instagram ID" };
    }

    return { exists: false, field: null };
  } catch (error) {
    console.error("Error checking existing registration:", error);
    return { exists: false, field: null };
  }
};

/**
 * Generate unique user ID
 */
const generateUserId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `user_${timestamp}_${randomStr}`;
};

/**
 * Get registration statistics (for admin use)
 */
export const getRegistrationStats = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, REGISTRATIONS_COLLECTION));
    const totalRegistrations = querySnapshot.size;
    
    let silverTier = 0;
    let goldTier = 0;
    let paid = 0;
    let pending = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.tier === "Silver") silverTier++;
      if (data.tier === "Gold") goldTier++;
      if (data.paymentStatus === "paid") paid++;
      if (data.paymentStatus === "pending") pending++;
    });

    return {
      total: totalRegistrations,
      silverTier,
      goldTier,
      paid,
      pending
    };
  } catch (error) {
    console.error("Error getting registration stats:", error);
    return null;
  }
}; 