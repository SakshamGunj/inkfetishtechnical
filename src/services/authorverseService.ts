import { 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy,
  doc,
  getDoc
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Collection names
const AUTHORVERSE_COLLECTION = "authorverseSummit";

// Types for Authorverse submissions
export interface AuthorverseSubmission {
  id?: string;
  content: string;
  eligible: boolean;
  name: string;
  stage2Content?: string;
  stage2SubmittedAt?: string;
  stage2Theme?: string;
  stage2Title?: string;
  submittedAt: string;
  theme: string;
  title: string;
}

// Convert to voting system format
export interface VotingSubmission {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  title: string;
  content: string;
  theme: string;
  submissionDate: any;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
  voteCount?: number;
  hasVoted?: boolean;
}

/**
 * Get all eligible submissions from authorverseSummit collection
 */
export const getEligibleAuthorverseSubmissions = async (): Promise<VotingSubmission[]> => {
  try {
    console.log("Fetching eligible authorverse submissions...");
    
    // Get all submissions and filter for eligible ones
    const allQuery = query(collection(db, AUTHORVERSE_COLLECTION));
    const allSnapshot = await getDocs(allQuery);
    
    console.log(`Total submissions found: ${allSnapshot.size}`);
    
    const submissions: VotingSubmission[] = [];
    
    allSnapshot.forEach((doc) => {
      const data = doc.data() as AuthorverseSubmission;
      
      // Only include eligible submissions
      if (data.eligible === true) {
        const submission: VotingSubmission = {
          id: doc.id,
          userId: doc.id, // Use document ID as user ID
          userName: data.name,
          userEmail: `${data.name.toLowerCase().replace(/\s+/g, '.')}@authorverse.com`, // Generate email
          title: data.stage2Title || data.title,
          content: data.stage2Content || data.content,
          theme: data.stage2Theme || data.theme,
          submissionDate: new Date(data.stage2SubmittedAt || data.submittedAt),
          status: 'approved', // All eligible submissions are considered approved
          voteCount: 0 // Initialize vote count
        };
        
        submissions.push(submission);
      }
    });
    
    console.log(`Found ${submissions.length} eligible submissions for voting`);
    return submissions;
  } catch (error) {
    console.error("Error getting eligible authorverse submissions:", error);
    return [];
  }
};

/**
 * Get a specific submission by ID
 */
export const getAuthorverseSubmissionById = async (submissionId: string): Promise<VotingSubmission | null> => {
  try {
    const docRef = doc(db, AUTHORVERSE_COLLECTION, submissionId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data() as AuthorverseSubmission;
      
      return {
        id: docSnap.id,
        userId: docSnap.id,
        userName: data.name,
        userEmail: `${data.name.toLowerCase().replace(/\s+/g, '.')}@authorverse.com`,
        title: data.stage2Title || data.title,
        content: data.stage2Content || data.content,
        theme: data.stage2Theme || data.theme,
        submissionDate: new Date(data.stage2SubmittedAt || data.submittedAt),
        status: 'approved',
        voteCount: 0
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error getting authorverse submission by ID:", error);
    return null;
  }
};

/**
 * Get submission statistics
 */
export const getAuthorverseStats = async (): Promise<{
  totalSubmissions: number;
  eligibleSubmissions: number;
  stage2Submissions: number;
}> => {
  try {
    const q = query(collection(db, AUTHORVERSE_COLLECTION));
    const querySnapshot = await getDocs(q);
    
    let totalSubmissions = 0;
    let eligibleSubmissions = 0;
    let stage2Submissions = 0;
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as AuthorverseSubmission;
      totalSubmissions++;
      
      if (data.eligible) {
        eligibleSubmissions++;
      }
      
      if (data.stage2Content) {
        stage2Submissions++;
      }
    });
    
    return {
      totalSubmissions,
      eligibleSubmissions,
      stage2Submissions
    };
  } catch (error) {
    console.error("Error getting authorverse stats:", error);
    return {
      totalSubmissions: 0,
      eligibleSubmissions: 0,
      stage2Submissions: 0
    };
  }
};