import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs, 
  doc, 
  setDoc, 
  getDoc,
  orderBy,
  limit
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Collection names with inkcult_ prefix
const USERS_COLLECTION = "inkcult_users";
const SUBMISSIONS_COLLECTION = "inkcult_submissions";
const PROMPTS_COLLECTION = "inkcult_prompts";

// Types
export interface InkculttUser {
  uid: string;
  name: string;
  email: string;
  createdAt: any;
  totalSubmissions?: number;
}

export interface PoetrySubmission {
  id?: string;
  userId: string;
  userName: string;
  userEmail: string;
  title: string;
  content: string;
  theme: string;
  submissionDate: any;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
  promptId?: string;
  voteCount?: number;
}

export interface Prompt {
  id?: string;
  text: string;
  isActive: boolean;
  createdAt: any;
}

/**
 * Create or update user profile in inkcult_users collection
 */
export const createOrUpdateUser = async (user: InkculttUser): Promise<{ success: boolean; error?: string }> => {
  try {
    const userRef = doc(db, USERS_COLLECTION, user.uid);
    await setDoc(userRef, {
      ...user,
      createdAt: user.createdAt || serverTimestamp(),
      totalSubmissions: 0
    }, { merge: true });
    
    return { success: true };
  } catch (error) {
    console.error("Error creating/updating user:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
};

/**
 * Get user profile by UID
 */
export const getUserProfile = async (uid: string): Promise<InkculttUser | null> => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { uid, ...userSnap.data() } as InkculttUser;
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
};

/**
 * Submit a poetry entry
 */
export const submitPoetry = async (submission: Omit<PoetrySubmission, 'id' | 'submissionDate' | 'status'>): Promise<{ success: boolean; error?: string; submissionId?: string }> => {
  try {
    // Check if user has reached the 3 submission limit
    const userSubmissionsCount = await getUserSubmissionCount(submission.userId);
    if (userSubmissionsCount >= 3) {
      return {
        success: false,
        error: "You have reached the maximum limit of 3 poetry submissions."
      };
    }

    // Add submission to Firestore
    const submissionData: Omit<PoetrySubmission, 'id'> = {
      ...submission,
      submissionDate: serverTimestamp(),
      status: 'submitted',
      voteCount: 0 // Initialize vote count
    };

    const docRef = await addDoc(collection(db, SUBMISSIONS_COLLECTION), submissionData);

    // Update user's total submissions count
    const userRef = doc(db, USERS_COLLECTION, submission.userId);
    await setDoc(userRef, {
      totalSubmissions: userSubmissionsCount + 1
    }, { merge: true });

    return {
      success: true,
      submissionId: docRef.id
    };
  } catch (error) {
    console.error("Error submitting poetry:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit poetry"
    };
  }
};

/**
 * Get user's submission count
 */
export const getUserSubmissionCount = async (userId: string): Promise<number> => {
  try {
    const q = query(
      collection(db, SUBMISSIONS_COLLECTION),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error("Error getting user submission count:", error);
    return 0;
  }
};

/**
 * Get user's submissions
 */
export const getUserSubmissions = async (userId: string): Promise<PoetrySubmission[]> => {
  try {
    const q = query(
      collection(db, SUBMISSIONS_COLLECTION),
      where("userId", "==", userId),
      orderBy("submissionDate", "desc")
    );
    const querySnapshot = await getDocs(q);
    
    const submissions: PoetrySubmission[] = [];
    querySnapshot.forEach((doc) => {
      submissions.push({ id: doc.id, ...doc.data() } as PoetrySubmission);
    });
    
    return submissions;
  } catch (error) {
    console.error("Error getting user submissions:", error);
    return [];
  }
};

/**
 * Get active prompts
 */
export const getActivePrompts = async (): Promise<Prompt[]> => {
  try {
    const q = query(
      collection(db, PROMPTS_COLLECTION),
      where("isActive", "==", true),
      orderBy("createdAt", "desc"),
      limit(5) // Get up to 5 active prompts
    );
    const querySnapshot = await getDocs(q);
    
    const prompts: Prompt[] = [];
    querySnapshot.forEach((doc) => {
      prompts.push({ id: doc.id, ...doc.data() } as Prompt);
    });
    
    return prompts;
  } catch (error) {
    console.error("Error getting active prompts:", error);
    // Return a default prompt if no prompts are found
    return [{
      id: "default",
      text: "Write a poem about the beauty of nature and how it inspires your soul.",
      isActive: true,
      createdAt: new Date()
    }];
  }
};

/**
 * Get all submissions (for admin use)
 */
export const getAllSubmissions = async (): Promise<PoetrySubmission[]> => {
  try {
    const q = query(
      collection(db, SUBMISSIONS_COLLECTION),
      orderBy("submissionDate", "desc")
    );
    const querySnapshot = await getDocs(q);
    
    const submissions: PoetrySubmission[] = [];
    querySnapshot.forEach((doc) => {
      submissions.push({ id: doc.id, ...doc.data() } as PoetrySubmission);
    });
    
    return submissions;
  } catch (error) {
    console.error("Error getting all submissions:", error);
    return [];
  }
};

/**
 * Create a new prompt (for admin use)
 */
export const createPrompt = async (promptText: string): Promise<{ success: boolean; error?: string; promptId?: string }> => {
  try {
    const docRef = await addDoc(collection(db, PROMPTS_COLLECTION), {
      text: promptText,
      isActive: true,
      createdAt: serverTimestamp()
    });
    
    return {
      success: true,
      promptId: docRef.id
    };
  } catch (error) {
    console.error("Error creating prompt:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create prompt"
    };
  }
};
