import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_VITE_SUPABASE_ANON_KEY!
);

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

export async function GET() {
  try {
    // Pull every distinct authorName from the submissions table
    const { data, error } = await supabase
      .from('poetry_festival_s2_submissions')
      .select('authorName, title, poem_number')
      .order('authorName', { ascending: true });

    if (error) throw new Error(error.message);

    // All unique authorNames in the DB (lowercase → original)
    const dbAuthors = new Map<string, string>(); // lower → original
    for (const row of data || []) {
      const lower = (row.authorName || '').toLowerCase().trim();
      if (!dbAuthors.has(lower)) dbAuthors.set(lower, row.authorName);
    }

    const hofSet = new Set(HALL_OF_FAME_AUTHORS.map(n => n.toLowerCase().trim()));

    // Find HoF names with NO exact match in DB
    const missing: { hofName: string; closestDbMatch: string | null }[] = [];
    for (const hofName of HALL_OF_FAME_AUTHORS) {
      const lower = hofName.toLowerCase().trim();
      if (!dbAuthors.has(lower)) {
        // Try to find a close match (contains or similar)
        let closest: string | null = null;
        const hofWords = lower.split(/\s+/);
        let bestScore = 0;
        for (const [dbLower, dbOriginal] of dbAuthors) {
          const dbWords = dbLower.split(/\s+/);
          const sharedWords = hofWords.filter(w => w.length > 2 && dbWords.some(d => d.includes(w) || w.includes(d)));
          const score = sharedWords.length / Math.max(hofWords.length, dbWords.length);
          if (score > bestScore && score > 0.3) {
            bestScore = score;
            closest = dbOriginal;
          }
        }
        missing.push({ hofName, closestDbMatch: closest });
      }
    }

    // Also show DB names that are NOT in HoF list (extra submissions)
    const notInHof: string[] = [];
    for (const [lower, original] of dbAuthors) {
      if (!hofSet.has(lower)) notInHof.push(original);
    }

    return NextResponse.json({
      totalHofNames: HALL_OF_FAME_AUTHORS.length,
      totalInDb: dbAuthors.size,
      matchedCount: HALL_OF_FAME_AUTHORS.length - missing.length,
      missingCount: missing.length,
      missing,        // HoF names with no DB submission — need name fix
      notInHof,       // DB names not in HoF list — possible aliases
    }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
