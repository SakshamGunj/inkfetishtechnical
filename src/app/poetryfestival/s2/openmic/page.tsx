'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, Mic, Sparkles, Check, Trash2, Search, Plus, User } from 'lucide-react';

const INITIAL_NAMES = [
  "L Leema Daphne",
  "Sauravi Tiwatane",
  "Harleen sethi",
  "Zunera Asad",
  "Truce",
  "Dilnaz. J",
  "Moni Kutum",
  "Arwa Danish",
  "Somiya panwar",
  "Avni Gupta",
  "CHITRADA KISHORE KUMAR",
  "chetna choudhary",
  "Ashish Changavalli",
  "Kirtika",
  "Khadija khan",
  "RAVIKANT VISHWANATH KHADSE",
  "Prachala Anupmeya",
  "NinjaMenon",
  "Vinamra Pawar",
  "Meenakshi",
  "Priyami Dutta",
  "Ashok Bhandari",
  "Swati Sharma",
  "SANJAY DANGE",
  "Sumegha S",
  "Anl Gokhale",
  "Rafat naseer",
  "Jia modha",
  "Dr Deepak Tak",
  "kumkum saxena",
  "Harmanpreet Kaur",
  "Azra Azad",
  "Mrutyunjay Dash",
  "Deepali Singhal",
  "Richa",
  "Ashu Bansal",
  "Smitha krishna",
  "Dr D Wilfin John",
  "K.BHUVANEESHWARI_SRIKO",
  "Zoya",
  "Nilesh goje",
  "Uncanny",
  "Aritra Banerjee",
  "Mohammed Adil",
  "Tharani Devi D. Advocate",
  "Gargi Sidana",
  "Amita Saxena",
  "Nikita Pant",
  "Mohak Bajaj",
  "Purnasha Paul",
  "Nikita Pathak Jog",
  "Geetha Haridas",
  "Kanchan Chabuk",
  "Nivisha",
  "Mauli agrawal",
  "Aswin A",
  "Aman Srivastava",
  "ABHIJIT MUKHERJEE",
  "Devi vaidehi",
  "Lavanya Jalan",
  "Syseela jsyasimhan",
  "Akshay Udaykumar Jangam",
  "Dr. Mervyn Abreo",
  "Arshiya",
  "Anaya Gupta",
  "Sanjukta Guha",
  "Deepika Rawal",
  "Alphonsa Josy",
  "Meenal",
  "Aizah Khan",
  "Siddhi Singh",
  "Kalindi Singh",
  "Diksha Sharma",
  "Aarna Khivasara",
  "Prarthana Mehta",
  "Alina Shaikh",
  "Mohammed Mukarram",
  "Chaitanyadaas",
  "Samar Nayak",
  "Vibhuti jain",
  "Aleena Kashif",
  "Imtiyaz Akhtar",
  "Debangana Bhattacharjee",
  "Punya Prasun Dash",
  "Dr.ANAPARTHI RAMA MOHANA RAO",
  "GULSHAN WADHWA",
  "Asma Bint Wahaj",
  "Aparna Tripathi",
  "Salil Bahl",
  "V Poojitha",
  "Shalu parveen",
  "DR. SUDEVI BASU",
  "ATUL TYAGI",
  "Tajamul Fazili",
  "John Thomas Tharayil",
  "Mehi Chaudhary",
  "Vimaljeet sandhu",
  "Abhyutanvi _Tanvi Sharma_",
  "Bhanu Sinha",
  "Prabha Tiwari",
  "Mahima Mittal Gupta",
  "Agni _Selva Mahalakshmi_",
  "Amritha Jain",
  "Dr. Infini Lionne",
  "Deeksha Mehta",
  "Zerish Imran",
  "Pragya Narayan",
  "Pathan Kiswakhan",
  "Deepti Mehta",
  "C. Avantika",
  "Dr Divya Kumawat",
  "Devananda V",
  "Fasiha Khan",
  "Gargi Kulkarni",
  "Anjana Ragunath",
  "Dhanush kiran",
  "Bharat Singh_Hisaria",
  "SD",
  "Bijay joshi",
  "Parisa Kochar",
  "Shiv Kumar",
  "Sahana S",
  "Sakthe M",
  "Lavanya Venugopal",
  "Ghumlessgirl",
  "Shahnawaz Salmani",
  "Riya Jain",
  "Ananya Narang",
  "Shauryam Rawat",
  "Pragya B",
  "Nishtha Mishra",
  "PRIYANKA DARGI",
  "Rupesh Mahotra",
  "Roohani Sharma",
  "Dr Mohan Shende",
  "Akshay Khare",
  "YAJUSH DUBEY",
  "Shruti Gokhale",
  "SWARUP GHOSH",
  "Samriddhi",
  "Karthik sadagopal",
  "Prachi Dhawan",
  "Vaishali saxena",
  "Unspokenwords",
  "Manisha keshav",
  "Pooja Soni",
  "G S Chandrashekhar",
  "Salman Tamimi",
  "Ridhima Bhagawati",
  "Aria June",
  "Debasish Mahapatra",
  "Sheetal Sanghvi",
  "Scarlett",
  "Sushil Kumar Rana",
  "Shubham Pandey Radhey",
  "Dr. Dev",
  "HENSI CHELANI",
  "Dharmesh Parmar",
  "Moumita",
  "Utsab Dey",
  "Saumya Prajapati",
  "Surekha Anandraya Bhat",
  "Anup Kumar Bindal",
  "shashank tripathi_RAHI_",
  "Archita Kumar",
  "Aayushi Singh",
  "Kumar Shekhar",
  "Himanshi Priyani",
  "Archi",
  "Bincy Babu",
  "SRIKANTH K",
  "Rahul Kulkarni _ Poet loading",
  "Pulak Patra_Asher Graves_",
  "Sherin",
  "Arina Alam",
  "Kalkhi heenal",
  "Riddhi Pandya",
  "Chandra Prakash Yadav",
  "Kartik Kulkarni",
  "arshpreet kaur",
  "Naqiyah Jariwala _ N.H. Jariwalala",
  "Mrunali jagtap",
  "Alka Pandey",
  "Dr. Arpita Chatterjee",
  "Monalisa Biswal",
  "Amaira Gupta",
  "Sasanka Satapathy",
  "Sanvi Nanda",
  "Shibi A R",
  "Wasaka bari shah",
  "Amandeep Kaur",
  "Vanshaj Varma",
  "Reuben Mathew",
  "Dr Harshita Varshney",
  "RUMI SARMA",
  "NITYA LAKSHMI BALACHANDRAN",
  "anchal joshi",
  "Biplab Chowdhury",
  "Somanathan",
  "UpaSana Mitra",
  "Advocate Ankit Jain",
  "Solanki Maulikkumar _ _cynic_writes _",
  "Ishani soulthoughts",
  "Deebikaa.E",
  "Sufiya Fatima",
  "Vandana kanet",
  "Mehek Naskar",
  "Srishti Kumari",
  "Sreetija Choudhury",
  "Adhiyan",
  "Vijay Pratap Tadashi",
  "Kaviya Karthikeyan",
  "Karunakar Pradhan",
  "VIVEK ARPOYIL",
  "Radhhikka Bhandare",
  "Dev Patel",
  "Debashis Bhattacharyya",
  "Rina Sutradhar",
  "Shweta Kumari",
  "RAHUL BHUJEL",
  "Dr. Vibhav Saxena",
  "Anuja_voiceof_reason",
  "Gopinath S Iyengar",
  "Dr. Usha Pandey",
  "Domya Kaur",
  "Sree Bindu.R.S",
  "Aditi Kadam",
  "Tortured Poet",
  "Awang",
  "Richa Sarao",
  "Upadhayayula Krishna Sanjana",
  "Beetroot",
  "Clint climaco colaco",
  "Pratiti Bhadra",
  "Kekhuleto Viswentso",
  "Asim Baadshah",
  "Giteshvi sharma",
  "Debadrita Mukherjee",
  "Piya Poppy Rathbone",
  "Rasika S",
  "Dr. Anurag Sharma",
  "Manjistha Pathak",
  "Babita Rani",
  "Mayur Parashar",
  "Raghav Keer",
  "Dharmik Mehta",
  "Dr.B.Ps.Toi",
  "Dr. Aditya Verma",
  "Alpana Naik",
  "Lakshmi Supriya",
  "Shreemayi Nidhi C",
  "Ishi kakkar",
  "ARCHNA Dabral",
  "JOYDEV MURMU",
  "Dr. EKTA PRIYA",
  "pramod",
  "DEBANJAN",
  "Rolson Vishwas D'Souza",
  "Aparna Singh",
  "Nabanita Roy",
  "Likha Budh",
  "REMADEVI RAJESH",
  "Preetha T",
  "Sourabh Rout",
  "Isha",
  "Hemant Prasad",
  "Kartik Raina",
  "M Blessy Aquila",
  "ZakirHussain",
  "M.Haripriya",
  "Adarsh Tiwari",
  "Dr. Divyansh Bhatnagar",
  "Sneha Hegde",
  "Zoya Fatima",
  "FATHIMA A",
  "Asmita Mishra",
  "M Shiva Kumar",
  "Pranshu",
  "Subasini mohanty",
  "Asma Bint Wahaj",
  "Ravina yadav",
  "Jyotee Dokhale",
  "Srijita Bhattacharyya",
  "Sumayya.P.M",
  "Nikita Yadav",
  "Dr Akshara T",
  "Archana Anil Patil_Girija",
  "Chandraprakash Shinde",
  "Suhas Lahurikar",
  "Mayur Shirapure"
];

const ITEM_HEIGHT = 80; // height of each slot item in px

export default function OpenMicSlotMachine() {
  const [names, setNames] = useState<string[]>(INITIAL_NAMES);
  const [performed, setPerformed] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  
  // Custom name addition
  const [newName, setNewName] = useState('');
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Audio contexts
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // Canvas for confetti
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiCleanupRef = useRef<(() => void) | null>(null);

  // Initialize Audio Context on user interaction if needed
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
  };

  const playTick = () => {
    if (!soundEnabled) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      console.warn('Web Audio playback blocked or failed', e);
    }
  };

  const playChime = () => {
    if (!soundEnabled) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      // Play a lovely major triad chord
      const freqs = [392.00, 493.88, 587.33, 783.99]; // G4, B4, D5, G5
      freqs.forEach((f, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime + index * 0.08);
        
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + index * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
        
        osc.start(ctx.currentTime + index * 0.08);
        osc.stop(ctx.currentTime + 1.8);
      });
    } catch (e) {
      console.warn('Web Chime failed', e);
    }
  };

  // Trigger Gold Confetti
  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    if (confettiCleanupRef.current) {
      confettiCleanupRef.current();
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const parent = canvas.parentElement;
    canvas.width = parent?.clientWidth || window.innerWidth;
    canvas.height = parent?.clientHeight || window.innerHeight;
    
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      gravity: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];
    
    // Theme colors: Rich Gold, light gold, parchment, champagne, sparkling white
    const colors = ['#d4af37', '#f3e5ab', '#ffffff', '#c5a059', '#e8d3a7'];
    
    for (let i = 0; i < 180; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2 - 40,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 16,
        speedY: (Math.random() - 0.7) * 20 - 4,
        gravity: 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.15
      });
    }
    
    let animationFrameId: number;
    
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += p.gravity;
        p.rotation += p.rotationSpeed;
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        
        // draw diamonds or rectangles
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
        
        if (p.y < canvas.height && p.x > 0 && p.x < canvas.width) {
          active = true;
        }
      });
      
      if (active) {
        animationFrameId = requestAnimationFrame(update);
      }
    };
    
    update();
    confettiCleanupRef.current = () => cancelAnimationFrame(animationFrameId);
  };

  useEffect(() => {
    return () => {
      if (confettiCleanupRef.current) confettiCleanupRef.current();
    };
  }, []);

  // Filter pool
  const eligiblePool = names.filter(n => !performed.includes(n));

  const handleSpin = () => {
    if (isSpinning) return;
    if (eligiblePool.length === 0) {
      alert('All artists have performed! Press Reset Performer Registry to start again.');
      return;
    }
    
    initAudio();
    setIsSpinning(true);
    setWinner(null);

    // Pick a random performer from eligible pool
    const randWinner = eligiblePool[Math.floor(Math.random() * eligiblePool.length)];
    
    // Find its index in the base names array
    const baseIdx = names.indexOf(randWinner);
    
    // We want the wheel to spin at least 2 full rotations of the entire list and snap onto this index
    const currentOffset = scrollOffset;
    const currentItemIndex = Math.round(currentOffset / ITEM_HEIGHT);
    
    // Calculate final target index to snap to
    const targetItemIndex = currentItemIndex + (names.length * 2) + (baseIdx - (currentItemIndex % names.length));
    const targetOffset = targetItemIndex * ITEM_HEIGHT;
    const distance = targetOffset - currentOffset;

    let startTime: number | null = null;
    const duration = 5000; // 5 seconds of dramatic rolling

    let lastCrossedItem = currentItemIndex;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: Custom cubic bezier ease-out (super fast start, slow deceleration)
      const ease = 1 - Math.pow(1 - progress, 4);
      const nextOffset = currentOffset + distance * ease;
      
      // Play tick sound when crossing item thresholds
      const currentCrossedItem = Math.floor(nextOffset / ITEM_HEIGHT);
      if (currentCrossedItem !== lastCrossedItem) {
        playTick();
        lastCrossedItem = currentCrossedItem;
      }
      
      setScrollOffset(nextOffset);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setWinner(randWinner);
        setPerformed(prev => [...prev, randWinner]);
        playChime();
        triggerConfetti();
      }
    };
    
    requestAnimationFrame(animate);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset the Performer Registry? This will clear who has performed.')) {
      setPerformed([]);
      setWinner(null);
      setScrollOffset(0);
    }
  };

  const handleAddName = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newName.trim();
    if (!clean) return;
    if (names.includes(clean)) {
      alert('This performer is already in the registry.');
      return;
    }
    setNames(prev => [...prev, clean]);
    setNewName('');
  };

  const handleDeleteName = (target: string) => {
    if (isSpinning) return;
    setNames(prev => prev.filter(n => n !== target));
    setPerformed(prev => prev.filter(n => n !== target));
    if (winner === target) setWinner(null);
  };

  // Generate loop array for vertical slider (make it repeating to look continuous)
  const renderList = [];
  // Build a display array wrapping index around names length
  const totalDisplaySlots = 15;
  const pivotIndex = Math.floor(scrollOffset / ITEM_HEIGHT);
  
  for (let i = -5; i < totalDisplaySlots; i++) {
    const idx = pivotIndex + i;
    const arrayIdx = ((idx % names.length) + names.length) % names.length;
    const name = names[arrayIdx];
    renderList.push({ idx, name });
  }

  // Filter list for search panel
  const searchedNames = names.filter(n => 
    n.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#050505] text-[#eee] font-sans antialiased relative overflow-hidden py-12 px-4 md:px-8">
      {/* Absolute Ambient Glow backgrounds */}
      <div className="absolute top-[-20%] left-1/4 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-1/4 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />

      {/* Confetti Overlay Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-50 w-full h-full"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left / Center: Slot Machine Panel (8 cols) */}
        <div className="lg:col-span-8 flex flex-col items-center justify-between gap-8 bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-sm shadow-2xl relative">
          
          {/* Header Branding */}
          <div className="text-center w-full border-b border-white/5 pb-6">
            <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-bold bg-[#1a1510] border border-gold/15 py-1 px-3.5 rounded-full inline-block mb-3 font-mono">
              Inkfetish Publications Present
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-wider text-white flex items-center justify-center gap-3">
              <Mic className="w-6 h-6 md:w-8 md:h-8 text-gold animate-pulse" />
              Open Mic Performer Selector
            </h1>
            <p className="text-xs text-[#666] tracking-wide mt-2 uppercase font-serif">
              Poetry Festival Season 2 • Live Selection Room
            </p>
          </div>

          {/* Sound & Status toggles */}
          <div className="w-full flex justify-between items-center px-4 text-xs text-[#555]">
            <div className="flex items-center gap-1.5 bg-white/5 py-1 px-2.5 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
              <span className="text-[#888] font-mono">{eligiblePool.length} Performers remaining in pool</span>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex items-center gap-1.5 hover:text-white transition-colors py-1 px-2.5"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-gold" />
                  <span className="font-mono text-[#aaa]">Sound On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-[#444]" />
                  <span className="font-mono text-[#444]">Sound Muted</span>
                </>
              )}
            </button>
          </div>

          {/* THE SLOT MACHINE VIEWPORT */}
          <div className="w-full max-w-xl relative my-4">
            
            {/* Elegant Outer Slot Machine frame */}
            <div className="border-[6px] border-[#1f1a14] rounded-sm bg-[#050505] shadow-[0_0_60px_rgba(0,0,0,0.8)_inset] overflow-hidden relative h-[240px]">
              
              {/* Inner viewport glow */}
              <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

              {/* Horizontal Gold Selector Guides */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[80px] border-y-2 border-gold/40 bg-gold/5 pointer-events-none z-10">
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gold animate-bounce">▶</div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gold rotate-180 animate-bounce">▶</div>
              </div>

              {/* Rolling Names Track */}
              <div 
                className="w-full absolute"
                style={{
                  transform: `translateY(${-((scrollOffset % (names.length * ITEM_HEIGHT)) + (names.length * ITEM_HEIGHT)) % (names.length * ITEM_HEIGHT) + 80}px)`,
                  height: `${names.length * ITEM_HEIGHT}px`
                }}
              >
                {names.map((name, index) => {
                  const itemOffset = index * ITEM_HEIGHT;
                  return (
                    <div
                      key={`${name}-${index}`}
                      className="absolute w-full flex items-center justify-center px-4 transition-all duration-150"
                      style={{
                        top: `${itemOffset}px`,
                        height: `${ITEM_HEIGHT}px`
                      }}
                    >
                      <span className="text-xl md:text-2xl font-serif text-[#999] tracking-wider uppercase text-center font-bold">
                        {name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Overlapping helper mapping (above and below loop wrapper for visual continuity) */}
              <div 
                className="w-full absolute"
                style={{
                  transform: `translateY(${-((scrollOffset % (names.length * ITEM_HEIGHT)) + (names.length * ITEM_HEIGHT)) % (names.length * ITEM_HEIGHT) + 80 - (names.length * ITEM_HEIGHT)}px)`,
                  height: `${names.length * ITEM_HEIGHT}px`
                }}
              >
                {names.map((name, index) => {
                  return (
                    <div
                      key={`pre-${name}-${index}`}
                      className="absolute w-full flex items-center justify-center px-4"
                      style={{
                        top: `${index * ITEM_HEIGHT}px`,
                        height: `${ITEM_HEIGHT}px`
                      }}
                    >
                      <span className="text-xl md:text-2xl font-serif text-[#999] tracking-wider uppercase text-center font-bold">
                        {name}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div 
                className="w-full absolute"
                style={{
                  transform: `translateY(${-((scrollOffset % (names.length * ITEM_HEIGHT)) + (names.length * ITEM_HEIGHT)) % (names.length * ITEM_HEIGHT) + 80 + (names.length * ITEM_HEIGHT)}px)`,
                  height: `${names.length * ITEM_HEIGHT}px`
                }}
              >
                {names.map((name, index) => {
                  return (
                    <div
                      key={`post-${name}-${index}`}
                      className="absolute w-full flex items-center justify-center px-4"
                      style={{
                        top: `${index * ITEM_HEIGHT}px`,
                        height: `${ITEM_HEIGHT}px`
                      }}
                    >
                      <span className="text-xl md:text-2xl font-serif text-[#999] tracking-wider uppercase text-center font-bold">
                        {name}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* SPIN ACTION BUTTON */}
          <div className="w-full flex flex-col items-center gap-4 my-2">
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`w-full max-w-md py-4 px-8 rounded-sm text-base uppercase font-serif font-black tracking-widest transition-all duration-300 relative overflow-hidden group shadow-[0_0_30px_rgba(212,175,55,0.15)] ${
                isSpinning
                  ? 'bg-neutral-800 text-neutral-600 border border-neutral-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-gold via-[#dfb15b] to-gold text-[#0f0b04] hover:shadow-[0_0_40px_rgba(212,175,55,0.35)] active:scale-[0.99] border border-gold/30'
              }`}
            >
              {isSpinning ? (
                <span className="flex items-center justify-center gap-2.5">
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-neutral-500 border-t-transparent" />
                  Chanting Verses...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <Sparkles className="w-4 h-4" /> Spin Slot Machine
                </span>
              )}
              
              {/* Button Sheen/Glow */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
            </button>
            <p className="text-[10px] font-mono text-[#555] uppercase tracking-wider">
              Lever is set to 5.0 seconds dramatic decay curve
            </p>
          </div>

          {/* CELEBRATION WINNER CARD */}
          {winner && !isSpinning && (
            <div className="w-full max-w-xl bg-gradient-to-b from-[#181410] to-[#0a0a0a] border-2 border-gold/30 p-6 rounded-sm text-center relative animate-fade-in-up mt-2">
              <div className="absolute -top-3 -right-3 bg-gold text-[#0f0b04] p-1.5 rounded-full shadow-lg">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
              </div>
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#d4af37]">
                🎤 Next Performer Selected 🎤
              </span>
              <h3 className="text-2xl md:text-4xl font-serif font-black text-white uppercase tracking-wider my-3 px-2">
                {winner}
              </h3>
              <p className="text-[11px] text-[#888] italic px-8">
                "Prepare your parchment, step into the spotlight, and let your words move the room."
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <div className="text-[10px] uppercase font-mono bg-gold/10 text-gold py-1 px-3 border border-gold/20 rounded-sm">
                  Poetry Festival Season 2 Performer
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Panel: Registry & Search (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6 bg-[#0a0a0a] border border-white/5 p-6 rounded-sm shadow-xl max-h-[85vh] overflow-hidden">
          
          <div className="border-b border-white/5 pb-4">
            <h2 className="text-base font-serif font-black uppercase tracking-wider text-gold flex items-center gap-2">
              <Check className="w-4 h-4" /> Performer Registry
            </h2>
            <p className="text-xs text-[#666] mt-1">
              Active directory of registered open-mic poets.
            </p>
          </div>

          {/* Add custom performer */}
          <form onSubmit={handleAddName} className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Add name e.g. Priya"
              className="flex-1 bg-[#121212] border border-white/10 rounded-sm py-1.5 px-3 text-xs text-white placeholder-[#444] focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="bg-[#121212] border border-white/15 hover:border-gold hover:text-gold transition-colors text-white py-1.5 px-3 rounded-sm text-xs flex items-center gap-1 font-mono uppercase"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </form>

          {/* Search registry bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#444] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search performers..."
              className="w-full bg-[#121212] border border-white/10 rounded-sm py-1.5 pl-9 pr-3 text-xs text-white placeholder-[#444] focus:outline-none focus:border-gold"
            />
          </div>

          {/* List stats */}
          <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono uppercase bg-white/5 p-2 rounded-sm">
            <div>
              <span className="text-[#666] block">Pool Count</span>
              <span className="text-white text-xs font-bold">{names.length}</span>
            </div>
            <div>
              <span className="text-[#666] block">Completed</span>
              <span className="text-gold text-xs font-bold">{performed.length} / {names.length}</span>
            </div>
          </div>

          {/* Performers registry list */}
          <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {searchedNames.length > 0 ? (
              searchedNames.map(name => {
                const isDone = performed.includes(name);
                return (
                  <div
                    key={name}
                    className={`flex justify-between items-center py-2 px-3 border rounded-sm transition-colors ${
                      isDone
                        ? 'bg-[#121212]/30 border-white/5 text-[#444]'
                        : 'bg-[#121212] border-white/5 hover:border-white/10 text-[#bbb]'
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => {
                          if (isDone) {
                            setPerformed(prev => prev.filter(x => x !== name));
                          } else {
                            setPerformed(prev => [...prev, name]);
                          }
                        }}
                        className="accent-gold cursor-pointer"
                      />
                      <span className={`text-xs truncate font-serif ${isDone ? 'line-through' : 'font-semibold'}`}>
                        {name}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteName(name)}
                      className="text-[#333] hover:text-red-500 transition-colors p-1"
                      title="Remove from pool"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-xs text-[#444] py-8 uppercase tracking-widest font-mono">
                No Performers Found
              </p>
            )}
          </div>

          {/* Reset Registry Button */}
          <button
            onClick={handleReset}
            className="w-full bg-[#1c1212]/40 hover:bg-[#2c1212]/60 border border-red-950 hover:border-red-800 text-red-500/80 hover:text-red-400 py-2.5 px-4 rounded-sm text-xs font-serif font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Reset Performer Registry
          </button>

        </div>

      </div>

      {/* Embedded Styles for custom animations/scrollbar */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.2);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.4);
        }
      `}</style>
    </main>
  );
}
