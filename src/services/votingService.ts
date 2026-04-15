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
  limit,
  updateDoc,
  increment,
  onSnapshot
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getEligibleAuthorverseSubmissions, type VotingSubmission as AuthorverseVotingSubmission } from "./authorverseService";

// Collection names
const VOTES_COLLECTION = "inkcult_votes";
const SUBMISSIONS_COLLECTION = "inkcult_submissions";
const AUTHORVERSE_VOTE_COUNTS = "authorverse_vote_counts";
const BATCH_VOTES_COLLECTION = "inkcult_batch_votes";

// Types
export interface Vote {
  id?: string;
  submissionId: string;
  deviceId: string;
  userId?: string; // Optional, for authenticated users
  createdAt: any;
  submissionTitle?: string;
  submissionAuthor?: string;
}

export interface BatchVote {
  id?: string;
  deviceId: string;
  userId?: string | null;
  votes: string[]; // Array of submission IDs
  createdAt: any;
  status: 'pending' | 'submitted';
}

export interface SubmissionWithVotes {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  title: string;
  content: string;
  theme: string;
  submissionDate: any;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
  promptId?: string;
  voteCount: number;
  hasVoted: boolean;
}

/**
 * Generate a unique device ID for vote tracking
 */
export const generateDeviceId = (): string => {
  // Try to get existing device ID from localStorage
  let deviceId = localStorage.getItem('inkcult_device_id');
  
  if (!deviceId) {
    // Generate a new device ID
    deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('inkcult_device_id', deviceId);
  }
  
  return deviceId;
};

/**
 * Submit a batch of votes for poetry submissions
 */
export const submitBatchVotes = async (submissionIds: string[], userId?: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const deviceId = generateDeviceId();
    
    // Check if user has already submitted votes
    const existingBatch = await getExistingBatchVote(deviceId, userId);
    if (existingBatch && existingBatch.status === 'submitted') {
      return {
        success: false,
        error: "You have already submitted your votes for this session."
      };
    }
    
    // Validate vote count
    if (submissionIds.length > 5) {
      return {
        success: false,
        error: "You can only vote for a maximum of 5 poems."
      };
    }
    
    if (submissionIds.length === 0) {
      return {
        success: false,
        error: "Please select at least one poem to vote for."
      };
    }
    
    // Check if any of these submissions have already been voted for
    const existingVotes = await checkExistingVotes(submissionIds, deviceId, userId);
    if (existingVotes.length > 0) {
      return {
        success: false,
        error: "Some of your selected poems have already been voted for."
      };
    }
    
    // Create batch vote record
    const batchVoteData: any = {
      deviceId,
      votes: submissionIds,
      createdAt: serverTimestamp(),
      status: 'submitted'
    };
    
    // Only add userId if it exists
    if (userId) {
      batchVoteData.userId = userId;
    }
    
    // Add batch vote to Firestore
    await addDoc(collection(db, BATCH_VOTES_COLLECTION), batchVoteData);
    
    // Update vote counts for each submission
    for (const submissionId of submissionIds) {
      await updateSubmissionVoteCount(submissionId);
    }
    
    return { success: true };
    
  } catch (error) {
    console.error("Error submitting batch votes:", error);
    return {
      success: false,
      error: "Failed to submit votes. Please try again."
    };
  }
};

/**
 * Get existing batch vote for device/user
 */
export const getExistingBatchVote = async (deviceId: string, userId?: string): Promise<BatchVote | null> => {
  try {
    let q;
    if (userId) {
      q = query(
        collection(db, BATCH_VOTES_COLLECTION),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(1)
      );
    } else {
      q = query(
        collection(db, BATCH_VOTES_COLLECTION),
        where("deviceId", "==", deviceId),
        orderBy("createdAt", "desc"),
        limit(1)
      );
    }
    
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as BatchVote;
    }
    
    return null;
  } catch (error) {
    console.error("Error getting existing batch vote:", error);
    return null;
  }
};

/**
 * Check existing votes for multiple submissions
 */
export const checkExistingVotes = async (submissionIds: string[], deviceId: string, userId?: string): Promise<string[]> => {
  try {
    const existingVotes: string[] = [];
    
    for (const submissionId of submissionIds) {
      const existingVote = await checkExistingVote(submissionId, deviceId, userId);
      if (existingVote) {
        existingVotes.push(submissionId);
      }
    }
    
    return existingVotes;
  } catch (error) {
    console.error("Error checking existing votes:", error);
    return [];
  }
};

/**
 * Update submission vote count
 */
export const updateSubmissionVoteCount = async (submissionId: string): Promise<void> => {
  try {
    // First try to update inkcult submission
    try {
      const submissionRef = doc(db, SUBMISSIONS_COLLECTION, submissionId);
      await updateDoc(submissionRef, {
        voteCount: increment(1)
      });
      return; // Successfully updated inkcult submission
    } catch (error) {
      // If inkcult submission doesn't exist, try authorverse vote count
      console.log("Inkcult submission not found, updating authorverse vote count");
    }
    
    // Update authorverse vote count
    const voteCountRef = doc(db, AUTHORVERSE_VOTE_COUNTS, submissionId);
    await setDoc(voteCountRef, {
      voteCount: increment(1),
      lastUpdated: serverTimestamp()
    }, { merge: true });
    
  } catch (error) {
    console.error("Error updating submission vote count:", error);
  }
};

/**
 * Submit a vote for a poetry submission (legacy function - kept for compatibility)
 */
export const submitVote = async (submissionId: string, userId?: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const deviceId = generateDeviceId();
    
    // Check if user has already voted for this submission
    const existingVote = await checkExistingVote(submissionId, deviceId, userId);
    if (existingVote) {
      return {
        success: false,
        error: "You have already voted for this submission."
      };
    }
    
    // Check vote limits
    const voteCount = await getUserVoteCount(deviceId, userId);
    if (voteCount >= 5) {
      return {
        success: false,
        error: "You have reached the maximum limit of 5 votes."
      };
    }
    
    // Get submission details for the vote record
    const submissionRef = doc(db, SUBMISSIONS_COLLECTION, submissionId);
    const submissionSnap = await getDoc(submissionRef);
    
    if (!submissionSnap.exists()) {
      return {
        success: false,
        error: "Submission not found."
      };
    }
    
    const submissionData = submissionSnap.data();
    
    // Create vote record
    const voteData: any = {
      submissionId,
      deviceId,
      createdAt: serverTimestamp(),
      submissionTitle: submissionData.title,
      submissionAuthor: submissionData.userName
    };
    
    // Only add userId if it exists
    if (userId) {
      voteData.userId = userId;
    }
    
    await addDoc(collection(db, VOTES_COLLECTION), voteData);
    
    // Update submission vote count
    await updateDoc(submissionRef, {
      voteCount: increment(1)
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error submitting vote:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit vote"
    };
  }
};

/**
 * Check if user has already voted for a specific submission
 */
export const checkExistingVote = async (submissionId: string, deviceId: string, userId?: string): Promise<boolean> => {
  try {
    let q;
    
    if (userId) {
      // Check by both device ID and user ID for authenticated users
      q = query(
        collection(db, VOTES_COLLECTION),
        where("submissionId", "==", submissionId),
        where("deviceId", "==", deviceId)
      );
    } else {
      // Check by device ID only for anonymous users
      q = query(
        collection(db, VOTES_COLLECTION),
        where("submissionId", "==", submissionId),
        where("deviceId", "==", deviceId)
      );
    }
    
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking existing vote:", error);
    return false;
  }
};

/**
 * Get user's total vote count
 */
export const getUserVoteCount = async (deviceId: string, userId?: string): Promise<number> => {
  try {
    let q;
    
    if (userId) {
      // Count votes by both device ID and user ID for authenticated users
      q = query(
        collection(db, VOTES_COLLECTION),
        where("deviceId", "==", deviceId)
      );
    } else {
      // Count votes by device ID only for anonymous users
      q = query(
        collection(db, VOTES_COLLECTION),
        where("deviceId", "==", deviceId)
      );
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error("Error getting user vote count:", error);
    return 0;
  }
};

/**
 * Get vote count for a submission (combines original and new votes)
 */
export const getSubmissionVoteCount = async (submissionId: string): Promise<number> => {
  try {
    // Try to get vote count from authorverse_vote_counts collection
    const voteCountRef = doc(db, AUTHORVERSE_VOTE_COUNTS, submissionId);
    const voteCountSnap = await getDoc(voteCountRef);
    
    if (voteCountSnap.exists()) {
      const data = voteCountSnap.data();
      return data.voteCount || 0;
    }
    
    return 0;
  } catch (error) {
    console.error("Error getting submission vote count:", error);
    return 0;
  }
};

/**
 * Get all approved submissions with vote counts and user vote status
 */
export const getSubmissionsForVoting = async (): Promise<SubmissionWithVotes[]> => {
  try {
    const deviceId = generateDeviceId();
    console.log("Getting submissions for voting...");
    
    // First, get authorverse submissions (real data)
    const authorverseSubmissions = await getEligibleAuthorverseSubmissions();
    console.log(`Found ${authorverseSubmissions.length} authorverse submissions`);
    
    // Convert authorverse submissions to the expected format and check votes
    const convertedAuthorverseSubmissions: SubmissionWithVotes[] = [];
    
    for (const submission of authorverseSubmissions) {
      // Check if current user has voted for this submission
      const hasVoted = await checkExistingVote(submission.id, deviceId);
      
      convertedAuthorverseSubmissions.push({
        ...submission,
        voteCount: submission.voteCount || 0,
        hasVoted
      } as SubmissionWithVotes);
    }
    
    console.log(`Converted ${convertedAuthorverseSubmissions.length} authorverse submissions`);
    
    // Then get inkcultt submissions
    const q = query(
      collection(db, SUBMISSIONS_COLLECTION),
      where("status", "==", "approved"),
      orderBy("submissionDate", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const inkculttSubmissions: SubmissionWithVotes[] = [];
    
    for (const doc of querySnapshot.docs) {
      const submissionData = doc.data();
      const submissionId = doc.id;
      
      // Check if current user has voted for this submission
      const hasVoted = await checkExistingVote(submissionId, deviceId);
      
      // Get vote count (default to 0 if not set)
      const voteCount = submissionData.voteCount || 0;
      
      inkculttSubmissions.push({
        id: submissionId,
        ...submissionData,
        voteCount,
        hasVoted
      } as SubmissionWithVotes);
    }
    
    console.log(`Found ${inkculttSubmissions.length} inkcultt submissions`);
    
    // Combine both sources and sort by submission date
    const allSubmissions = [...convertedAuthorverseSubmissions, ...inkculttSubmissions];
    allSubmissions.sort((a, b) => {
      const dateA = a.submissionDate?.toDate?.() || new Date(a.submissionDate);
      const dateB = b.submissionDate?.toDate?.() || new Date(b.submissionDate);
      return dateB.getTime() - dateA.getTime();
    });
    
    console.log(`Total submissions for voting: ${allSubmissions.length}`);
    console.log("🔍 DEBUG: About to return submissions, length:", allSubmissions.length);
    
    if (allSubmissions.length > 0) {
      console.log("Sample submission:", {
        id: allSubmissions[0].id,
        title: allSubmissions[0].title,
        userName: allSubmissions[0].userName,
        contentLength: allSubmissions[0].content?.length || 0,
        hasVoted: allSubmissions[0].hasVoted,
        voteCount: allSubmissions[0].voteCount
      });
    }
    
    // Add a delay to ensure async operations complete
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log("🔍 DEBUG: Returning submissions array:", allSubmissions.length);
    return allSubmissions;
  } catch (error) {
    console.error("Error getting submissions for voting:", error);
    return [];
  }
};

/**
 * Get user's voting statistics
 */
export const getUserVotingStats = async (): Promise<{ totalVotes: number; remainingVotes: number; hasSubmitted: boolean }> => {
  try {
    const deviceId = generateDeviceId();
    
    // Check if user has already submitted batch votes
    const existingBatch = await getExistingBatchVote(deviceId);
    const hasSubmitted = existingBatch?.status === 'submitted';
    
    if (hasSubmitted) {
      return {
        totalVotes: existingBatch.votes.length,
        remainingVotes: 0,
        hasSubmitted: true
      };
    }
    
    // Get total votes used (for legacy votes)
    const totalVotes = await getUserVoteCount(deviceId);
    const remainingVotes = Math.max(0, 5 - totalVotes);
    
    return { totalVotes, remainingVotes, hasSubmitted: false };
  } catch (error) {
    console.error("Error getting user voting stats:", error);
    return { totalVotes: 0, remainingVotes: 5, hasSubmitted: false };
  }
};

/**
 * Real-time listener for submissions with votes
 */
export const subscribeToSubmissions = (
  callback: (submissions: SubmissionWithVotes[]) => void
) => {
  const deviceId = generateDeviceId();
  
  const q = query(
    collection(db, SUBMISSIONS_COLLECTION),
    where("status", "==", "approved"),
    orderBy("submissionDate", "desc")
  );
  
  return onSnapshot(q, async (snapshot) => {
    try {
      // Get authorverse submissions (real data)
      const authorverseSubmissions = await getEligibleAuthorverseSubmissions();
      
      // Convert authorverse submissions and check votes
      const convertedAuthorverseSubmissions: SubmissionWithVotes[] = [];
      
      for (const submission of authorverseSubmissions) {
        // Check if current user has voted for this submission
        const hasVoted = await checkExistingVote(submission.id, deviceId);
        
        convertedAuthorverseSubmissions.push({
          ...submission,
          voteCount: submission.voteCount || 0,
          hasVoted
        } as SubmissionWithVotes);
      }
      
      // Process inkcultt submissions
      const inkculttSubmissions: SubmissionWithVotes[] = [];
      
      for (const doc of snapshot.docs) {
        const submissionData = doc.data();
        const submissionId = doc.id;
        
        // Check if current user has voted for this submission
        const hasVoted = await checkExistingVote(submissionId, deviceId);
        
        // Get vote count (default to 0 if not set)
        const voteCount = submissionData.voteCount || 0;
        
        inkculttSubmissions.push({
          id: submissionId,
          ...submissionData,
          voteCount,
          hasVoted
        } as SubmissionWithVotes);
      }
      
      // Combine both sources and sort by submission date
      const allSubmissions = [...convertedAuthorverseSubmissions, ...inkculttSubmissions];
      allSubmissions.sort((a, b) => {
        const dateA = a.submissionDate?.toDate?.() || new Date(a.submissionDate);
        const dateB = b.submissionDate?.toDate?.() || new Date(b.submissionDate);
        return dateB.getTime() - dateA.getTime();
      });
      
      callback(allSubmissions);
    } catch (error) {
      console.error("Error in subscription callback:", error);
      callback([]);
    }
  });
};