import { INITIAL_CANDIDATES } from './peopleChoiceCandidates';

export interface WinnerEntry {
  rank: number;
  id: string;
  authorName: string;
  pieceTitle: string;
  category: 'Poetry / Verse' | 'Story / Prose';
  accolade: string;
  badge: string;
  tier: 'champion' | 'runner-up-1' | 'runner-up-2' | 'top-10' | 'top-20';
  excerpt: string;
  fullContent: string;
}

const RAW_WINNERS_ROSTER: {
  rank: number;
  name: string;
  title: string;
  category: 'Poetry / Verse' | 'Story / Prose';
  accolade: string;
  badge: string;
  tier: 'champion' | 'runner-up-1' | 'runner-up-2' | 'top-10' | 'top-20';
}[] = [
  {
    rank: 1,
    name: "MR.VIJAY TARACHAND CHAUDHARI(अवि)",
    title: "व्हायचंच झालं तर काय व्हावं?",
    category: "Poetry / Verse",
    accolade: "Grand Winner & Champion",
    badge: "🥇 1st Place Champion",
    tier: "champion"
  },
  {
    rank: 2,
    name: "Saniya S",
    title: "The Ocean Within Me",
    category: "Story / Prose",
    accolade: "1st Runner Up",
    badge: "🥈 1st Runner Up",
    tier: "runner-up-1"
  },
  {
    rank: 3,
    name: "Sadiqua Jabeen",
    title: "Another Earth",
    category: "Poetry / Verse",
    accolade: "2nd Runner Up",
    badge: "🥉 2nd Runner Up",
    tier: "runner-up-2"
  },
  {
    rank: 4,
    name: "Mukundananda Nayak",
    title: "Ek shayar ki Maut",
    category: "Poetry / Verse",
    accolade: "People's Choice Laureate",
    badge: "Rank 4",
    tier: "top-10"
  },
  {
    rank: 5,
    name: "RAM BERI",
    title: "PULI MEKA VETA",
    category: "Story / Prose",
    accolade: "People's Choice Laureate",
    badge: "Rank 5",
    tier: "top-10"
  },
  {
    rank: 6,
    name: "Anoop shanker madan",
    title: "Kaliyuga series",
    category: "Story / Prose",
    accolade: "People's Choice Laureate",
    badge: "Rank 6",
    tier: "top-10"
  },
  {
    rank: 7,
    name: "Manu vaish",
    title: "क्षणभंगुर जीवन",
    category: "Poetry / Verse",
    accolade: "People's Choice Laureate",
    badge: "Rank 7",
    tier: "top-10"
  },
  {
    rank: 8,
    name: "Pooja Shukla",
    title: "तू ख़ुद ही ख़ुद का साथी है! !",
    category: "Poetry / Verse",
    accolade: "People's Choice Laureate",
    badge: "Rank 8",
    tier: "top-10"
  },
  {
    rank: 9,
    name: "harsh sule",
    title: "bazar-e-ishque",
    category: "Poetry / Verse",
    accolade: "People's Choice Laureate",
    badge: "Rank 9",
    tier: "top-10"
  },
  {
    rank: 10,
    name: "Divya Iyer",
    title: "Papa Never Said I Love You",
    category: "Story / Prose",
    accolade: "People's Choice Laureate",
    badge: "Rank 10",
    tier: "top-10"
  },
  {
    rank: 11,
    name: "Adarsh",
    title: "The Untold Story",
    category: "Story / Prose",
    accolade: "Official Top 20 Laureate",
    badge: "Rank 11",
    tier: "top-20"
  },
  {
    rank: 12,
    name: "Sakshi Rajan Tevar",
    title: "The Accused wasn't Me (A survivor's Story)",
    category: "Poetry / Verse",
    accolade: "Official Top 20 Laureate",
    badge: "Rank 12",
    tier: "top-20"
  },
  {
    rank: 13,
    name: "Ekta Nandi",
    title: "स्त्री: ख़ुद से ख़ुद तक का सफ़र",
    category: "Poetry / Verse",
    accolade: "Official Top 20 Laureate",
    badge: "Rank 13",
    tier: "top-20"
  },
  {
    rank: 14,
    name: "Neha Mahendra Jain",
    title: "नियति",
    category: "Poetry / Verse",
    accolade: "Official Top 20 Laureate",
    badge: "Rank 14",
    tier: "top-20"
  },
  {
    rank: 15,
    name: "Arsh Ansari",
    title: "Maa Calling",
    category: "Story / Prose",
    accolade: "Official Top 20 Laureate",
    badge: "Rank 15",
    tier: "top-20"
  },
  {
    rank: 16,
    name: "Rinu Maria Jose",
    title: "The Curse of Knowing Love",
    category: "Poetry / Verse",
    accolade: "Official Top 20 Laureate",
    badge: "Rank 16",
    tier: "top-20"
  },
  {
    rank: 17,
    name: "Suranjan Jana",
    title: "For This Awesome Potter",
    category: "Poetry / Verse",
    accolade: "Official Top 20 Laureate",
    badge: "Rank 17",
    tier: "top-20"
  },
  {
    rank: 18,
    name: "Sumaiyal. B",
    title: "The Borrowed Face",
    category: "Story / Prose",
    accolade: "Official Top 20 Laureate",
    badge: "Rank 18",
    tier: "top-20"
  },
  {
    rank: 19,
    name: "Swarnadeep Mandal",
    title: "The Maybe",
    category: "Poetry / Verse",
    accolade: "Official Top 20 Laureate",
    badge: "Rank 19",
    tier: "top-20"
  },
  {
    rank: 20,
    name: "Sayyed Riyaz",
    title: "Harif-e-Yaar",
    category: "Poetry / Verse",
    accolade: "Official Top 20 Laureate",
    badge: "Rank 20",
    tier: "top-20"
  }
];

export const OFFICIAL_WINNERS: WinnerEntry[] = RAW_WINNERS_ROSTER.map((winner) => {
  const match = INITIAL_CANDIDATES.find((candidate) => {
    const authorMatch = candidate.authorName.trim().toLowerCase() === winner.name.trim().toLowerCase();
    const titleMatch = candidate.pieceTitle.trim().toLowerCase().includes(winner.title.trim().toLowerCase().slice(0, 8));
    return authorMatch || titleMatch;
  });

  return {
    rank: winner.rank,
    id: match?.id || `pca_winner_${winner.rank}`,
    authorName: match?.authorName || winner.name,
    pieceTitle: match?.pieceTitle || winner.title,
    category: (match?.category === 'Story / Prose' ? 'Story / Prose' : 'Poetry / Verse') as 'Poetry / Verse' | 'Story / Prose',
    accolade: winner.accolade,
    badge: winner.badge,
    tier: winner.tier,
    excerpt: match?.excerpt || '',
    fullContent: match?.fullContent || match?.excerpt || ''
  };
});
