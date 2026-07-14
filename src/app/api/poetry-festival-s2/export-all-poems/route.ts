import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_VITE_SUPABASE_ANON_KEY!
);

// Full Hall of Fame author list (must match TopWritersClient)
const HALL_OF_FAME_AUTHORS = [
  "Gayathri Nair C","Pen name - Mamnoon","Monalisa Biswal","SWARUP GHOSH",
  "Salman Tamimi","Shubham Pandey Radhey","Karthik sadagopal","Ramanpreet",
  "Sheetal Sanghvi","Anjana Ragunath","Udit pratap singh","NinjaMenon",
  "Prachala Anupmeya","Bhargavi Sonowal Kouli","Ankita Kakati","Narahari Rao Bapuram",
  "Dr. Tushar Amankar","Dr. Tushar mankar","Harshdeep singh","Vanya Singh Jauhar",
  "The New Era","Priyami Dutta","Rashi Suhasaria","Lokesh Goenka","Ribon Teronpi",
  "Chandra Prakash Yadav","Deependra Vashishtha","GS Chandrashekhar","Adeela Jawaid",
  "Sejal C.","Ridhima Bhagawati","Jump Start Your Heart","Debasish Mahapatra",
  "Sushil Kumar Rana","HENSI CHELANI","Moumita","Dharmesh Parmar","Akshay Khare",
  "Utsab Dey","Surekha Anandraya Bhat","Ashish Changavalli","chetna choudhary",
  "Vinamra Pawar","Kirtika","RAVIKANT VISHWANATH KHADSE","Meenakshi","Ashok Bhandari",
  "Swati Sharma","SANJAY DANGE","Anil Gokhale","Sumegha S","Rafat naseer","Jia modha",
  "Dr Deepak Tak","kumkum saxena","Azra Azad","ਹਰਮਨਪ੍ਰੀ ਤ ਕੌਰ","Dr Mohan Shende",
  "Mrutyunjay Dash","Deepali Singhal","Pragya Narayan","YAJUSH DUBEY","Shalu parveen",
  "Roohani Sharma","Rupesh Mahotra","Nishtha Mishra","PRIYANKA DARGI","EShruti Gokhale",
  "Samriddhi","Kalkhi heenal","Prachi Dhawan","Vaishali saxena","Pooja Soni",
  "Mehek Naskar","FATHIMA A","M Shiva Kumar","Asmita Mishra","Pranshu",
  "Subasini mohanty","Srishti Kumari","Sreetija Choudhury","Arshiya","arshpreet kaur",
  "Naqiyah Jariwala","Gargi Kulkarni","Shahnawaz Salmani","Anchal Trivedi",
  "Ananya Narang","Shauryam Rawat","V Poojitha","Geetha Haridas","Nikita Pathak Jog",
  "Jyotee Dokhale","Dr. Infini Lionne","Aswin A","Nivisha","Akshay Udaykumar Jangam",
  "Dr. Mervyn Abreo","Mahima Mittal Gupta","Agni (Selva Mahalakshmi)","Deeksha Mehta",
  "Pathan Kiswakhan","Devananda V","Samar Nayak","Fasiha Khan","Aleena Kashif",
  "इम्ति या ज़ संजी दा","Debangana Bhattacharjee","Punya Prasun Dash","Sumayya.P.M",
  "Dr.ANAPARTHI RAMA MOHANA RAO","Salil Bahl","Arjumand Bint Wahaj","Pratiti Bhadra",
  "Aditi Kadam","Srijita Bhattacharyya","Amandeep Kaur","Sasanka Satapathy","Shibi A R",
  "Wasaka bari shah","Hemant Prasad","Kartik Raina","Dr. Biplab Chowdhury",
  "M Blessy Aquila","Deebikaa.E","Debashis Bhattacharyya","RAHUL BHUJEL",
  "Gopinath S Iyengar","Sree Bindu.R.S","Gargi Sidana","Wangshak",
  "Upadhayayula Krishna Sanjana","Beetroot","Clint climaco colaco","Lakshmi Supriya",
  "Dr. Ekta Priya","Archana Anil Patil/Girija","Kaviya Karthikeyan","VIVEK ARPOYIL",
  "DR. SUDEVI BASU","Deepika Rawal","Aizah Khan","Sanjukta Guha","Aarna Khivasara",
  "Siddhi Singh","Alina Shaikh","Mohammed Mukarram","Dharmik Mehta","Dr.B.Ps.Toi",
  "Dr. Aditya Verma","Aritra Banerjee","Mohammed Adil","Smitha krishna","Dr D Wilfin John",
  "K.BHUVANEESHWARI/SRIKO","Harleen sethi","L Leema Daphne","Dilnaz. J","Truce",
  "Zunera Asad","Nabanita Roy","REMADEVI RAJESH","Preetha T","Kekhuleto Viswentso",
  "Asim Baadshah","डॉ अनुरा ग शर्मा","Piya Poppy Rathbone","Manjistha Pathak",
  "Mayur Parashar","Raghav Keer","shashank tripathi (RAHI)","Kumar Shekhar",
  "Himanshi Priyani","Rahul Kulkarni","Bincy Babu","JOYDEV MURMU","Ishi Kakkar",
  "Prabha Tiwari","Mauli Agrawal","Pragya B","Kalindi Singh","Domya Kaur","Rasika S",
  "UpaSana Mitra","Lavanya Jalan","Purnasha Paul","Adhiyan","Dr Akshara T",
  "Debadrita Mukherjee","Amritha Jain","K. BHUVANEESHWARI/SRIKO","Somanathan",
  "Kartik Kulkarni","Ayush Kartik/Aoi Raikage","Divya Kumawat","Swara Moharkar",
  "Vijay Pratap","Amita Saxena","Mitali Saikia","Lavanya",
];

// Name alias map: HoF display name (lowercase) → actual DB authorName (lowercase)
// Used when the writer typed a slightly different name when submitting their poem
const NAME_ALIASES: Record<string, string> = {
  "vanya singh jauhar":            "vanya singh",
  "the new era":                   "the new era",   // check DB — may not have submitted
  "gs chandrashekhar":             "g s chandrashekhar",
  "jump start your heart":         "jump start your heart", // check DB
  "meenakshi":                     "meenakshi",
  "kumkum saxena":                 "kumkum saxena",
  "ਹਰਮਨਪ੍ਰੀ ਤ ਕੌਰ":                "✍️ਹਰਮਨਪ੍ਰੀਤ ਕੌਰ ✍️",
  "naqiyah jariwala":              "naqiyah jariwala / n.h. jariwalala",
  "इम्ति या ज़ संजी दा":           "इम्तियाज़ संजीदा",
  "dr. ekta priya":                "dr.ekta priya",
  "डॉ अनुरा ग शर्मा":              "dr. anurag sharma",
  "shashank tripathi (rahi)":      "shashank tripathi (rahi)",
  "rahul kulkarni":                "rahul kulkarni _ poet loading",
  "k. bhuvaneeshwari/sriko":       "k.bhuvaneeshwari/sriko",
  "ayush kartik/aoi raikage":      "ayush kartik/ aoi raikage",
  "divya kumawat":                 "dr divya kumawat",
  "swara moharkar":                "swara moharkar",
  "vijay pratap":                  "vijay pratap tadashi",
  "amita saxena":                  "amita saxena",
  "mitali saikia":                 "mitali saikia",
  "lavanya":                       "lavanya venugopal",
};

function htmlToPlainText(html: string): string {
  if (!html) return '';
  let text = html;
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<\/p>/gi, '\n');
  text = text.replace(/<\/div>/gi, '\n');
  text = text.replace(/<\/h[1-6]>/gi, '\n');
  text = text.replace(/<[^>]+>/g, '');
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&rsquo;/g, "'");
  text = text.replace(/&lsquo;/g, "'");
  text = text.replace(/&rdquo;/g, '"');
  text = text.replace(/&ldquo;/g, '"');
  text = text.replace(/&mdash;/g, '—');
  text = text.replace(/&ndash;/g, '–');
  text = text.replace(/&hellip;/g, '...');
  text = text.replace(/\n{3,}/g, '\n\n');
  return text.trim();
}

export async function GET() {
  try {
    // Fetch ALL submissions in one query (no filter — we filter in memory by author list)
    // Using pagination to get all records safely
    let allRows: any[] = [];
    let from = 0;
    const PAGE = 1000;

    while (true) {
      const { data, error } = await supabase
        .from('poetry_festival_s2_submissions')
        .select('id, title, poetryHtml, wordCount, poem_number, created_at, authorName')
        .order('authorName', { ascending: true })
        .order('poem_number', { ascending: true })
        .range(from, from + PAGE - 1);

      if (error) throw new Error(error.message);
      if (!data || data.length === 0) break;

      allRows = allRows.concat(data);
      if (data.length < PAGE) break;
      from += PAGE;
    }

    // Build a lowercase set of all possible lookup keys:
    // both the HoF name and its alias DB name
    const hofSet = new Set(HALL_OF_FAME_AUTHORS.map(n => n.toLowerCase().trim()));
    const aliasValues = new Set(Object.values(NAME_ALIASES).map(v => v.toLowerCase().trim()));

    // Group all rows by author (lowercase), indexed by BOTH direct name AND alias DB name
    const authorMap = new Map<string, any[]>();

    for (const row of allRows) {
      const authorLower = (row.authorName || '').toLowerCase().trim();
      // Accept this row if it's either directly in the HoF set OR is an alias target
      if (!hofSet.has(authorLower) && !aliasValues.has(authorLower)) continue;

      if (!authorMap.has(authorLower)) {
        authorMap.set(authorLower, []);
      }

      // Deduplicate by title within this author's poems
      const existing = authorMap.get(authorLower)!;
      const titleLower = (row.title || '').toLowerCase().trim();
      const alreadyHasTitle = existing.some(
        r => (r.title || '').toLowerCase().trim() === titleLower
      );
      if (!alreadyHasTitle) {
        existing.push(row);
      }
    }

    // For each author: if they have 2 poems → pick randomly either poem 1 or poem 2
    //                  if they have 1 poem  → use that one
    //                  if they have 0       → skip
    const selectedRows: any[] = [];
    let authorIndex = 0;

    for (const hofName of HALL_OF_FAME_AUTHORS) {
      const authorLower = hofName.toLowerCase().trim();

      // Try direct match first, then alias fallback
      const aliasKey = NAME_ALIASES[authorLower];
      const poems = authorMap.get(authorLower) || (aliasKey ? authorMap.get(aliasKey) : undefined);

      if (!poems || poems.length === 0) continue; // no submission found


      let chosen: any;
      if (poems.length === 1) {
        // Only 1 poem — use it
        chosen = poems[0];
      } else {
        // 2+ poems — randomly pick one (Math.random() is fine here, server-side only)
        const pick = Math.floor(Math.random() * Math.min(poems.length, 2));
        chosen = poems[pick];
      }

      selectedRows.push({ ...chosen, _displayIndex: authorIndex + 1 });
      authorIndex++;
    }

    // Build the mega markdown document
    const sections: string[] = [];

    sections.push(`# Poetry Festival Season 2 — Hall of Fame Top 200`);
    sections.push(`## Complete Poems Collection`);
    sections.push(``);
    sections.push(`*Published by Inkfetish Publications*`);
    sections.push(`*Exported: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}*`);
    sections.push(`*Total writers featured: ${selectedRows.length}*`);
    sections.push(`*Note: Writers with 2 submissions have one poem randomly selected for this export.*`);
    sections.push(``);
    sections.push(`---`);
    sections.push(``);

    selectedRows.forEach((row) => {
      const plainText = htmlToPlainText(row.poetryHtml || '');
      const dateStr = row.created_at
        ? new Date(row.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
        : '';

      sections.push(`## ${row._displayIndex}. ${row.title || 'Untitled'}`);
      sections.push(``);
      sections.push(`**Author:** ${row.authorName}`);
      if (dateStr) sections.push(`**Submitted:** ${dateStr}`);
      if (row.wordCount) sections.push(`**Word Count:** ${row.wordCount}`);
      sections.push(``);
      sections.push(`---`);
      sections.push(``);
      sections.push(plainText);
      sections.push(``);
      sections.push(`---`);
      sections.push(``);
    });

    sections.push(`*End of collection — Poetry Festival Season 2, Inkfetish Publications*`);

    const markdown = sections.join('\n');

    return new Response(markdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="PFS2_Hall_of_Fame_All_Poems.md"`,
        'Cache-Control': 'no-store',
      },
    });

  } catch (err: any) {
    console.error('export-all-poems error:', err);
    return NextResponse.json({ error: 'Failed to export poems' }, { status: 500 });
  }
}
