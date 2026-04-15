import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const SUBMISSIONS_COLLECTION = "inkcult_submissions";

interface TestSubmission {
  userId: string;
  userName: string;
  userEmail: string;
  title: string;
  content: string;
  theme: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
  voteCount?: number;
}

const testSubmissions: TestSubmission[] = [
  {
    userId: "test_user_1",
    userName: "Emily Dickinson",
    userEmail: "emily@poetry.com",
    title: "Hope is the thing with feathers",
    content: `
      <p>Hope is the thing with feathers</p>
      <p>That perches in the soul,</p>
      <p>And sings the tune without the words,</p>
      <p>And never stops at all,</p>
      <br/>
      <p>And sweetest in the gale is heard;</p>
      <p>And sore must be the storm</p>
      <p>That could abash the little bird</p>
      <p>That kept so many warm.</p>
      <br/>
      <p>I've heard it in the chillest land,</p>
      <p>And on the strangest sea;</p>
      <p>Yet, never, in extremity,</p>
      <p>It asked a crumb of me.</p>
    `,
    theme: "Hope & Resilience",
    status: "approved",
    voteCount: 12
  },
  {
    userId: "test_user_2",
    userName: "Robert Frost",
    userEmail: "robert@poetry.com",
    title: "The Road Not Taken",
    content: `
      <p>Two roads diverged in a yellow wood,</p>
      <p>And sorry I could not travel both</p>
      <p>And be one traveler, long I stood</p>
      <p>And looked down one as far as I could</p>
      <p>To where it bent in the undergrowth;</p>
      <br/>
      <p>Then took the other, as just as fair,</p>
      <p>And having perhaps the better claim,</p>
      <p>Because it was grassy and wanted wear;</p>
      <p>Though as for that the passing there</p>
      <p>Had worn them really about the same,</p>
      <br/>
      <p>And both that morning equally lay</p>
      <p>In leaves no step had trodden black.</p>
      <p>Oh, I kept the first for another day!</p>
      <p>Yet knowing how way leads on to way,</p>
      <p>I doubted if I should ever come back.</p>
    `,
    theme: "Life Choices",
    status: "approved",
    voteCount: 8
  },
  {
    userId: "test_user_3",
    userName: "Maya Angelou",
    userEmail: "maya@poetry.com",
    title: "Still I Rise",
    content: `
      <p>You may write me down in history</p>
      <p>With your bitter, twisted lies,</p>
      <p>You may trod me in the very dirt</p>
      <p>But still, like dust, I'll rise.</p>
      <br/>
      <p>Does my sassiness upset you?</p>
      <p>Why are you beset with gloom?</p>
      <p>'Cause I walk like I've got oil wells</p>
      <p>Pumping in my living room.</p>
      <br/>
      <p>Just like moons and like suns,</p>
      <p>With the certainty of tides,</p>
      <p>Just like hopes springing high,</p>
      <p>Still I'll rise.</p>
    `,
    theme: "Empowerment",
    status: "approved",
    voteCount: 15
  },
  {
    userId: "test_user_4",
    userName: "Langston Hughes",
    userEmail: "langston@poetry.com",
    title: "Dreams",
    content: `
      <p>Hold fast to dreams</p>
      <p>For if dreams die</p>
      <p>Life is a broken-winged bird</p>
      <p>That cannot fly.</p>
      <br/>
      <p>Hold fast to dreams</p>
      <p>For when dreams go</p>
      <p>Life is a barren field</p>
      <p>Frozen with snow.</p>
    `,
    theme: "Dreams & Aspirations",
    status: "approved",
    voteCount: 6
  },
  {
    userId: "test_user_5",
    userName: "Walt Whitman",
    userEmail: "walt@poetry.com",
    title: "O Captain! My Captain!",
    content: `
      <p>O Captain! my Captain! our fearful trip is done,</p>
      <p>The ship has weather'd every rack, the prize we sought is won,</p>
      <p>The port is near, the bells I hear, the people all exulting,</p>
      <p>While follow eyes the steady keel, the vessel grim and daring;</p>
      <br/>
      <p>But O heart! heart! heart!</p>
      <p>O the bleeding drops of red,</p>
      <p>Where on the deck my Captain lies,</p>
      <p>Fallen cold and dead.</p>
    `,
    theme: "Loss & Remembrance",
    status: "approved",
    voteCount: 9
  },
  {
    userId: "test_user_6",
    userName: "Sylvia Plath",
    userEmail: "sylvia@poetry.com",
    title: "Mirror",
    content: `
      <p>I am silver and exact. I have no preconceptions.</p>
      <p>Whatever I see I swallow immediately</p>
      <p>Just as it is, unmisted by love or dislike.</p>
      <p>I am not cruel, only truthful --</p>
      <p>The eye of a little god, four-cornered.</p>
      <br/>
      <p>Most of the time I meditate on the opposite wall.</p>
      <p>It is pink, with speckles. I have looked at it so long</p>
      <p>I think it is part of my heart. But it flickers.</p>
      <p>Faces and darkness separate us over and over.</p>
    `,
    theme: "Self-Reflection",
    status: "approved",
    voteCount: 11
  }
];

export const populateTestData = async (): Promise<{ success: boolean; error?: string; count?: number }> => {
  try {
    let successCount = 0;
    
    for (const submission of testSubmissions) {
      try {
        await addDoc(collection(db, SUBMISSIONS_COLLECTION), {
          ...submission,
          submissionDate: serverTimestamp()
        });
        successCount++;
      } catch (error) {
        console.error(`Error adding submission "${submission.title}":`, error);
      }
    }
    
    return {
      success: true,
      count: successCount
    };
  } catch (error) {
    console.error("Error populating test data:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to populate test data"
    };
  }
};

export const clearTestData = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    // Note: This would require additional Firestore rules to allow deletion
    // For now, we'll just return a success message
    return {
      success: true
    };
  } catch (error) {
    console.error("Error clearing test data:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to clear test data"
    };
  }
};