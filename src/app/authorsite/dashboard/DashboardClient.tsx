'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, BookOpen, FileText, UserCircle, Type, Eye, EyeOff, X, Award, Copy, Check, Headset, TrendingUp, Globe, Palette, Mail, MessageSquareQuote, QrCode, Share2, Sparkles, Download } from 'lucide-react';
import BrutalistEditor from '@/components/BrutalistEditor';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/utils/cropImage';

const CharCounter = ({ current, max }: { current: number; max: number }) => (
    <span className={`text-[10px] font-black tracking-widest px-2 py-0.5 ml-2 border-[2px] border-black ${current > max ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 text-black'}`}>
        {current} / {max}
    </span>
);

const DashboardClient = () => {
    const { user, authorUsername, loading: authLoading } = useAuth();
    const authorId = user?.uid;
    const { toast } = useToast();
    const router = useRouter();

    // UI State
    const [activeTab, setActiveTab] = useState('basic'); 
    const [isSaved, setIsSaved] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const [copied, setCopied] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [editingPieceId, setEditingPieceId] = useState<string | null>(null);

    // Image Cropping State
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isCropping, setIsCropping] = useState(false);

    // Form State
    const [formData, setFormData] = useState<any>({
        name: "", pen_name: "", dob: "", email: "", phone: "", instagram: "",
        twitter: "", tiktok: "", substack: "",
        website: "", location: "",
        theme: "", writing_title: "", writing_content: "",
        bio: "", other_details: "", profile_image: "", collab_prompt: "", collab_email: "",
        wip_title: "", wip_current: 0, wip_target: 0,
        tags: [], awards: [],
        books: [], writing_pieces: [],
        experiences: []
    });

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            router.push('/login');
            return;
        }

        const fetchPortfolio = async () => {
            try {
                if (!user) return;
                
                const publicUrlPath = authorUsername ? `/author/${authorUsername}` : `/author/${user.uid}`;
                const defaultWebsite = typeof window !== 'undefined' ? `${window.location.origin}${publicUrlPath}` : '';

                const docRef = doc(db, 'author_portfolios', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const parsed = docSnap.data();
                    setFormData({
                        ...formData,
                        ...parsed,
                        name: parsed.name || "",
                        pen_name: parsed.pen_name || "",
                        bio: parsed.bio || "",
                        writing_title: parsed.writing_title || "",
                        writing_content: parsed.writing_content || "",
                        tags: parsed.tags || [],
                        awards: parsed.awards || [],
                        experiences: parsed.experiences || [],
                        website: parsed.website || defaultWebsite,
                        location: parsed.location || "",
                    });
                } else {
                    setFormData((prev: any) => ({ ...prev, website: defaultWebsite }));
                }
            } catch (err: any) {
                console.error("Error fetching portfolio:", err);
                setError(err.message || "Failed to load from database.");
                toast({ 
                    title: "ERROR LOADING PROFILE", 
                    description: err.message || "Failed to load from database.", 
                    variant: "destructive" 
                });
            }
        };

        fetchPortfolio();
    }, [user, authorUsername, authLoading, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setIsSaved(false);
    };

    const handleSave = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!authorId) return;

        try {
            await setDoc(doc(db, 'author_portfolios', authorId), {
                ...formData,
                updated_at: new Date().toISOString()
            }, { merge: true });
            setIsSaved(true);
            toast({ title: "PROFILE SAVED!", description: "All changes are now live." });
            setTimeout(() => setIsSaved(false), 4000);
        } catch (err: any) {
            console.error("Error saving portfolio:", err);
            toast({ title: "SAVE FAILED", description: err.message, variant: "destructive" });
        }
    };

    const handleImageUpload = async (file: File) => {
        if (!file || !user) return;
        
        if (!supabase) {
            toast({ 
                title: "CONFIGURATION ERROR", 
                description: "Supabase storage is not configured. Please contact the administrator.", 
                variant: "destructive" 
            });
            return;
        }

        setUploadingImage(true);
        try {
            const fileName = `${Date.now()}.jpeg`;
            const filePath = `profiles/${user.uid}/${fileName}`;
            const { error: uploadError } = await supabase.storage.from('author-media').upload(filePath, file);
            if (uploadError) throw uploadError;
            const { data } = supabase.storage.from('author-media').getPublicUrl(filePath);
            setFormData({ ...formData, profile_image: data.publicUrl });
            setIsSaved(false);
            toast({ title: "PHOTO UPLOADED", description: "Your new photo is ready." });
        } catch (error: any) {
            console.error(error);
            toast({ title: "UPLOAD FAILED", description: error.message, variant: "destructive" });
        } finally {
            setUploadingImage(false);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImageSrc(reader.result?.toString() || null);
                setIsCropping(true);
            });
            reader.readAsDataURL(file);
            e.target.value = '';
        }
    };

    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleCropSave = async () => {
        if (!imageSrc || !croppedAreaPixels || !user) return;
        setIsCropping(false);
        setUploadingImage(true);
        try {
            const croppedImageFile = await getCroppedImg(imageSrc, croppedAreaPixels);
            if (!croppedImageFile) throw new Error("Processing failed");
            await handleImageUpload(croppedImageFile as File);
        } catch (e: any) {
            toast({ title: "CROP FAILED", description: e.message, variant: "destructive" });
            setUploadingImage(false);
        } finally {
            setImageSrc(null);
        }
    };

    // Module Form States & Handlers
    const [bookForm, setBookForm] = useState({ title: '', price: '', format: 'Paperback', isbn: '', buy_link: '', description: '' });
    const handleAddBook = () => {
        if (!bookForm.title.trim()) return toast({ title: "BOOK TITLE REQUIRED", variant: "destructive" });
        const newBook = { id: Date.now().toString(), ...bookForm };
        setFormData((prev: any) => ({ ...prev, books: [...(prev.books || []), newBook] }));
        setBookForm({ title: '', price: '', format: 'Paperback', isbn: '', buy_link: '', description: '' });
        toast({ title: "BOOK ADDED!", description: "Don't forget to click SAVE PROFILE." });
    };
    const handleDeleteBook = (id: string) => {
        setFormData((prev: any) => ({ ...prev, books: (prev.books || []).filter((b: any) => b.id !== id) }));
        toast({ title: "BOOK REMOVED" });
    };

    const [storyForm, setStoryForm] = useState({ title: '', category: 'Short Story', content: '', published_date: new Date().toISOString().split('T')[0] });
    const handleAddStory = () => {
        if (!storyForm.title.trim()) return toast({ title: "STORY TITLE REQUIRED", variant: "destructive" });
        const newStory = { id: Date.now().toString(), ...storyForm };
        setFormData((prev: any) => ({ ...prev, experiences: [...(prev.experiences || []), newStory] }));
        setStoryForm({ title: '', category: 'Short Story', content: '', published_date: new Date().toISOString().split('T')[0] });
        toast({ title: "STORY ADDED!", description: "Don't forget to click SAVE PROFILE." });
    };
    const handleDeleteStory = (id: string) => {
        setFormData((prev: any) => ({ ...prev, experiences: (prev.experiences || []).filter((s: any) => s.id !== id) }));
        toast({ title: "STORY REMOVED" });
    };

    const [awardForm, setAwardForm] = useState({ title: '', issuer: '', year: new Date().getFullYear().toString(), description: '' });
    const handleAddAward = () => {
        if (!awardForm.title.trim()) return toast({ title: "AWARD TITLE REQUIRED", variant: "destructive" });
        const newAward = { id: Date.now().toString(), ...awardForm };
        setFormData((prev: any) => ({ ...prev, awards: [...(prev.awards || []), newAward] }));
        setAwardForm({ title: '', issuer: '', year: new Date().getFullYear().toString(), description: '' });
        toast({ title: "AWARD ADDED!", description: "Don't forget to click SAVE PROFILE." });
    };
    // Tag Handlers (Max 3 tags, Max 15 chars per tag)
    const handleAddTag = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmed = tagInput.trim().replace(/^#/, '').toUpperCase();
        if (!trimmed) return;
        
        if ((formData.tags || []).length >= 3) {
            toast({ title: "MAX 3 TAGS ALLOWED", description: "You can only add up to 3 genre tags.", variant: "destructive" });
            return;
        }

        if (trimmed.length > 15) {
            toast({ title: "TAG TOO LONG", description: "Each tag must be 15 characters or less.", variant: "destructive" });
            return;
        }

        if ((formData.tags || []).includes(trimmed)) {
            toast({ title: "TAG ALREADY ADDED", variant: "destructive" });
            return;
        }

        setFormData((prev: any) => ({ ...prev, tags: [...(prev.tags || []), trimmed] }));
        setTagInput('');
        toast({ title: "TAG ADDED!", description: `#${trimmed}` });
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData((prev: any) => ({ ...prev, tags: (prev.tags || []).filter((t: string) => t !== tagToRemove) }));
        toast({ title: "TAG REMOVED" });
    };

    // Languages Handlers
    const [langInput, setLangInput] = useState('');
    const handleAddLang = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmed = langInput.trim().toUpperCase();
        if (!trimmed) return;
        if ((formData.languages || []).includes(trimmed)) return;
        setFormData((prev: any) => ({ ...prev, languages: [...(prev.languages || []), trimmed] }));
        setLangInput('');
    };
    const handleRemoveLang = (lToRemove: string) => {
        setFormData((prev: any) => ({ ...prev, languages: (prev.languages || []).filter((l: string) => l !== lToRemove) }));
    };

    // Writing Types / Forms Handlers
    const [writingTypeInput, setWritingTypeInput] = useState('');
    const handleAddWritingType = (valToAdd?: string, e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmed = (valToAdd || writingTypeInput).trim();
        if (!trimmed) return;
        if ((formData.writing_types || []).includes(trimmed)) return;
        setFormData((prev: any) => ({ ...prev, writing_types: [...(prev.writing_types || []), trimmed] }));
        setWritingTypeInput('');
    };
    const handleRemoveWritingType = (wtToRemove: string) => {
        setFormData((prev: any) => ({ ...prev, writing_types: (prev.writing_types || []).filter((wt: string) => wt !== wtToRemove) }));
    };
    const [reviewForm, setReviewForm] = useState({ reviewer: '', quote: '', source: 'Editorial Review', rating: '5' });
    const handleAddReview = () => {
        if (!reviewForm.quote.trim()) return toast({ title: "QUOTE CONTENT REQUIRED", variant: "destructive" });
        const newReview = { id: Date.now().toString(), ...reviewForm };
        setFormData((prev: any) => ({ ...prev, reviews: [...(prev.reviews || []), newReview] }));
        setReviewForm({ reviewer: '', quote: '', source: 'Editorial Review', rating: '5' });
        toast({ title: "REVIEW ADDED!", description: "Don't forget to click SAVE PROFILE." });
    };
    const handleDeleteReview = (id: string) => {
        setFormData((prev: any) => ({ ...prev, reviews: (prev.reviews || []).filter((r: any) => r.id !== id) }));
        toast({ title: "REVIEW REMOVED" });
    };

    // Multiple Featured Pieces State & Handlers
    const [featuredForm, setFeaturedForm] = useState({
        id: '',
        title: '',
        content: '',
        format: 'POETRY',
        font: 'SERIF',
        backstory: '',
        pinned: true
    });
    const [editingFeaturedId, setEditingFeaturedId] = useState<string | null>(null);

    const handleSaveFeaturedPiece = () => {
        if (!featuredForm.title.trim()) return toast({ title: "TITLE REQUIRED", variant: "destructive" });
        if (!featuredForm.content.trim()) return toast({ title: "CONTENT REQUIRED", variant: "destructive" });

        const existingList: any[] = formData.featured_pieces && formData.featured_pieces.length > 0 
            ? formData.featured_pieces 
            : (formData.writing_content ? [{
                id: 'legacy-1',
                title: formData.writing_title || 'Untitled',
                content: formData.writing_content,
                format: formData.writing_format || 'POETRY',
                font: formData.writing_font || 'SERIF',
                backstory: formData.writing_backstory || '',
                pinned: true
            }] : []);

        const pinnedCount = existingList.filter((p) => p.pinned !== false && p.id !== editingFeaturedId).length;
        let finalPinned = featuredForm.pinned;
        if (finalPinned && pinnedCount >= 3) {
            finalPinned = false;
            toast({ title: "MAX 3 PINNED ON PROFILE", description: "This piece was saved as unpinned because you already have 3 pieces pinned to your main profile.", variant: "destructive" });
        }

        const pieceData = { ...featuredForm, pinned: finalPinned };

        if (editingFeaturedId) {
            const updated = existingList.map((item) => item.id === editingFeaturedId ? { ...item, ...pieceData } : item);
            setFormData((prev: any) => ({ ...prev, featured_pieces: updated }));
            toast({ title: "FEATURED PIECE UPDATED!", description: "Click SAVE PROFILE to publish changes." });
        } else {
            const newPiece = { id: Date.now().toString(), ...pieceData };
            setFormData((prev: any) => ({ ...prev, featured_pieces: [...existingList, newPiece] }));
            toast({ title: "FEATURED PIECE ADDED!", description: "Click SAVE PROFILE to publish changes." });
        }

        setFeaturedForm({ id: '', title: '', content: '', format: 'POETRY', font: 'SERIF', backstory: '', pinned: true });
        setEditingFeaturedId(null);
    };

    const handleDeleteFeaturedPiece = (id: string) => {
        const existingList: any[] = formData.featured_pieces || [];
        setFormData((prev: any) => ({ ...prev, featured_pieces: existingList.filter((p) => p.id !== id) }));
        toast({ title: "PIECE REMOVED" });
    };

    const handleTogglePinFeaturedPiece = (id: string) => {
        const existingList: any[] = formData.featured_pieces || [];
        const target = existingList.find((p) => p.id === id);
        const pinnedCount = existingList.filter((p) => p.pinned !== false).length;
        if (!target?.pinned && pinnedCount >= 3) {
            return toast({ title: "MAX 3 PINNED PIECES", description: "You can pin up to 3 featured writings on your main profile.", variant: "destructive" });
        }
        const updated = existingList.map((p) => p.id === id ? { ...p, pinned: !p.pinned } : p);
        setFormData((prev: any) => ({ ...prev, featured_pieces: updated }));
    };

    const getReadingTime = (content: string) => {
        if (!content) return "0 MIN READ";
        const plainText = content.replace(/<[^>]+>/g, ' ').trim();
        const words = plainText.split(/\s+/).filter(Boolean).length;
        if (words === 0) return "0 MIN READ";
        if (words < 150) {
            const seconds = Math.max(15, Math.ceil((words / 200) * 60));
            return `${seconds} SEC READ`;
        }
        const minutes = Math.ceil(words / 200);
        return `${minutes} MIN READ`;
    };

    if (authLoading) return <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center font-mono font-black animate-pulse">LOADING...</div>;

    if (error) {
        return (
            <div className="min-h-screen bg-[#FFFDF7] flex flex-col items-center justify-center font-mono p-4">
                <div className="bg-red-500 text-white p-8 border-[4px] border-black shadow-[12px_12px_0_0_#000] max-w-xl w-full">
                    <h1 className="text-4xl font-black mb-4 uppercase">CRITICAL SYSTEM FAILURE</h1>
                    <p className="font-bold mb-6">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-black text-white px-8 py-3 font-black border-[3px] border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0_0_#fff]"
                    >
                        RETRY INITIALIZATION
                    </button>
                    <Link href="/" className="block mt-4 text-center underline font-black">SYSTEM EXIT</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFDF7] p-2 lg:p-4 font-mono selection:bg-[#39FF14] selection:text-black">
            {/* TOP RIGHT BRIGHT GREEN SAVED NOTIFICATION POPUP */}
            {isSaved && (
                <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[9999] bg-[#39FF14] text-black border-[4px] border-black p-4 sm:p-5 font-black uppercase shadow-[6px_6px_0_0_#000] sm:shadow-[8px_8px_0_0_#000] flex items-center gap-3 animate-in slide-in-from-top-5 duration-300 max-w-sm">
                    <span className="text-2xl shrink-0">✅</span>
                    <div className="space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-black tracking-wider leading-none">PROFILE SAVED!</h4>
                        <p className="text-[10px] sm:text-xs font-bold text-black/80">All changes are live on your public profile.</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsSaved(false)}
                        className="ml-auto bg-black text-[#39FF14] hover:bg-white hover:text-black font-black px-2 py-0.5 text-xs border border-black transition-colors shrink-0"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Command Bar */}
            <div className="max-w-7xl mx-auto w-full bg-black text-white p-4 sm:py-3 sm:px-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between text-xs md:text-sm font-bold uppercase shadow-[4px_4px_0_0_#39FF14] sm:shadow-[6px_6px_0_0_#39FF14] mb-4 sm:mb-8 border-[3px] border-black sticky top-2 sm:top-4 z-50 gap-3">
                <span className="tracking-widest text-[#39FF14] text-base md:text-lg text-center sm:text-left font-black">YOUR DASHBOARD</span>
                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <button onClick={() => handleSave()} className="flex-1 sm:flex-none bg-[#39FF14] text-black font-black px-4 sm:px-6 py-2.5 sm:py-2 border-[2px] sm:border-[3px] border-black hover:bg-white transition-all shadow-[2px_2px_0_0_#000] sm:shadow-[4px_4px_0_0_#000] active:shadow-none min-h-[44px] flex items-center justify-center">
                        SAVE PROFILE
                    </button>
                    <Link href={authorUsername ? `/author/${authorUsername}` : `/author/${user?.uid}`} target="_blank" className="flex-1 sm:flex-none text-center bg-white text-black hover:text-[#FF4F00] transition-colors font-black px-3 py-2.5 sm:py-2 border-[2px] border-black min-h-[44px] flex items-center justify-center text-xs">
                        LIVE PROFILE ↗
                    </Link>
                </div>
            </div>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-32">
                {/* Sidebar Navigation - Horizontal Scrollable on Mobile, Vertical Stack on Desktop */}
                <div className="lg:col-span-3 flex overflow-x-auto pb-2 lg:pb-0 gap-2 lg:flex-col lg:space-y-4 lg:gap-0 scrollbar-thin scrollbar-thumb-black whitespace-nowrap -mx-2 px-2 lg:mx-0 lg:px-0">
                    {[
                        { id: 'basic', label: 'My Info', icon: <UserCircle size={18} />, color: '#FFC700' },
                        { id: 'hero', label: 'Featured Writing', icon: <Type size={18} />, color: '#39FF14' },
                        { id: 'library', label: 'My Books', icon: <BookOpen size={18} />, color: '#00A3FF' },
                        { id: 'awards', label: 'My Awards', icon: <Award size={18} />, color: '#9D00FF' },
                        { id: 'wip', label: 'WIP Tracker', icon: <TrendingUp size={18} />, color: '#FF0055' },
                        { id: 'socials', label: 'Socials & Collab', icon: <Globe size={18} />, color: '#00E5FF' },
                        { id: 'share', label: 'QR Code & Share', icon: <QrCode size={18} />, color: '#39FF14' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`p-3 lg:p-4 border-[2px] lg:border-[3px] border-black font-black uppercase tracking-wider text-xs lg:text-sm flex items-center gap-2 lg:gap-3 transition-all shrink-0 lg:w-full min-h-[44px] ${activeTab === tab.id ? `shadow-[3px_3px_0_0_#000] lg:shadow-[6px_6px_0_0_#000] lg:translate-x-1 lg:-translate-y-1` : 'bg-white hover:bg-gray-50'}`}
                            style={{ backgroundColor: activeTab === tab.id ? tab.color : 'white' }}
                        >
                            {tab.icon} <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="lg:col-span-9">
                    {activeTab === 'basic' && (
                        <div className="bg-white border-[4px] border-black p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)] space-y-8 animate-in fade-in zoom-in-95">
                            <h2 className="text-3xl font-black uppercase border-b-4 border-black pb-4 text-[#FF4F00]">ABOUT ME</h2>
                            <div className="bg-[#39FF14]/5 p-6 border-[3px] border-black space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="block text-xs font-black bg-black text-white px-2 py-1 uppercase w-fit">Profile Photo / Writer Avatar</label>
                                        <div className="flex items-center gap-4 flex-wrap">
                                            <div className="w-28 h-28 border-4 border-black bg-gray-50 shadow-[4px_4px_0_0_#000] relative group shrink-0">
                                                {formData.profile_image ? (
                                                    <img src={formData.profile_image} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="h-full flex items-center justify-center text-gray-300 font-black text-xs text-center p-2">NO PHOTO</div>
                                                )}
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <input type="file" onChange={handleFileSelect} className="hidden" id="dash-avatar-up" />
                                                <label htmlFor="dash-avatar-up" className="inline-block bg-[#FFC700] border-2 border-black px-3 py-1.5 text-xs font-black uppercase cursor-pointer hover:bg-black hover:text-[#FFC700] transition-all shadow-[2px_2px_0_0_#000]">
                                                    📁 UPLOAD CUSTOM PHOTO
                                                </label>
                                                
                                                <div className="pt-1">
                                                    <span className="block text-[10px] font-black text-gray-500 uppercase mb-1">CHOOSE FROM 10 UNIQUE WRITER AVATARS:</span>
                                                    <div className="grid grid-cols-5 gap-2 max-w-xs">
                                                        {[
                                                            { label: '🖋️ Classic Poet', bg: '#39FF14', fg: '%23000', icon: '🖋️' },
                                                            { label: '📜 Vintage Author', bg: '#FFC700', fg: '%23000', icon: '📜' },
                                                            { label: '📚 Modern Novelist', bg: '#00A3FF', fg: '%23000', icon: '📚' },
                                                            { label: '🔮 Cosmic Wordsmith', bg: '#9D00FF', fg: '%23FFF', icon: '🔮' },
                                                            { label: '⚡ Cyber Bard', bg: '#FF0055', fg: '%23FFF', icon: '⚡' },
                                                            { label: '🌙 Midnight Solitary', bg: '#1A1A2E', fg: '%2339FF14', icon: '🌙' },
                                                            { label: '☕ Coffee & Quill', bg: '#8B4513', fg: '%23FFC700', icon: '☕' },
                                                            { label: '🌲 Haiku Nature', bg: '#059669', fg: '%23FFF', icon: '🌲' },
                                                            { label: '🎭 Playwright', bg: '#DC2626', fg: '%23FFF', icon: '🎭' },
                                                            { label: '🕯️ Gothic Romantic', bg: '#18181B', fg: '%23FFC700', icon: '🕯️' },
                                                        ].map((av, idx) => {
                                                            const svgData = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="${encodeURIComponent(av.bg)}"/><circle cx="50" cy="38" r="22" fill="${av.fg}" opacity="0.85"/><path d="M20 90 C20 62 80 62 80 90 Z" fill="${av.fg}" opacity="0.85"/><text x="50" y="44" font-size="22" text-anchor="middle">${av.icon}</text></svg>`;
                                                            return (
                                                                <button
                                                                    key={idx}
                                                                    type="button"
                                                                    onClick={() => setFormData((prev: any) => ({ ...prev, profile_image: svgData }))}
                                                                    className="w-10 h-10 border-2 border-black shadow-[2px_2px_0_0_#000] hover:scale-110 transition-transform overflow-hidden relative bg-white"
                                                                    title={`Use ${av.label}`}
                                                                >
                                                                    <img src={svgData} className="w-full h-full object-cover" />
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-black text-gray-400 uppercase mb-1">Your Full Name</label>
                                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white border-2 border-black p-3 font-bold focus:bg-[#39FF14]/5 outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-gray-400 uppercase mb-1">Pen Name (Optional)</label>
                                            <input type="text" name="pen_name" value={formData.pen_name} onChange={handleChange} className="w-full bg-white border-2 border-black p-3 font-bold focus:bg-[#39FF14]/5 outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-gray-400 uppercase mb-1">👤 Gender Identity</label>
                                            <select
                                                name="gender"
                                                value={formData.gender || ""}
                                                onChange={handleChange}
                                                className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#39FF14]/10"
                                            >
                                                <option value="">-- Select Gender --</option>
                                                <option value="Male">Male 👨</option>
                                                <option value="Female">Female 👩</option>
                                                <option value="Non-Binary">Non-Binary 🧑</option>
                                                <option value="Prefer not to say">Prefer not to say 👤</option>
                                            </select>
                                            <div className="flex items-center gap-2 mt-2">
                                                <input
                                                    type="checkbox"
                                                    id="show_gender_cb"
                                                    checked={formData.show_gender !== false}
                                                    onChange={(e) => setFormData((prev: any) => ({ ...prev, show_gender: e.target.checked }))}
                                                    className="w-4 h-4 border-2 border-black accent-black cursor-pointer"
                                                />
                                                <label htmlFor="show_gender_cb" className="text-xs font-bold uppercase cursor-pointer text-gray-700">
                                                    Show Gender on Public Profile Page
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* TAGLINE & AVAILABILITY STATUS */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-2 border-black">
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-1">⚡ One-Line Tagline / Motto</label>
                                        <input
                                            type="text"
                                            name="tagline"
                                            value={formData.tagline || ""}
                                            onChange={handleChange}
                                            className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#39FF14]/10"
                                            placeholder="e.g. Weaving heartbreak into stanzas since 2019"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-1">🎯 Current Availability / Status Badge</label>
                                        <select
                                            name="availability_status"
                                            value={formData.availability_status || "OPEN_FOR_SUBMISSIONS"}
                                            onChange={handleChange}
                                            className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#39FF14]/10"
                                        >
                                            <option value="OPEN_FOR_SUBMISSIONS">🟢 Open for Book Deals & Agent Queries</option>
                                            <option value="DEEP_WRITING_MODE">🟡 Writing Next Manuscript (Deep Focus)</option>
                                            <option value="AVAILABLE_FOR_SPEAKING">🔵 Available for Keynote Speaking & Workshops</option>
                                            <option value="OPEN_FOR_COLLABS">🟣 Open for Co-Authorship & Anthologies</option>
                                        </select>
                                    </div>
                                </div>

                                {/* HOMETOWN & PRESS KIT URL */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-1">📍 Hometown / Writing Base</label>
                                        <input
                                            type="text"
                                            name="hometown"
                                            value={formData.hometown || ""}
                                            onChange={handleChange}
                                            className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#39FF14]/10"
                                            placeholder="e.g. New Delhi, India"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-1">📄 Downloadable Press Kit / Media Resume URL</label>
                                        <input
                                            type="url"
                                            name="press_kit_url"
                                            value={formData.press_kit_url || ""}
                                            onChange={handleChange}
                                            className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#39FF14]/10"
                                            placeholder="e.g. https://drive.google.com/your-press-kit.pdf"
                                        />
                                    </div>
                                </div>

                                {/* TYPES / FORMS OF WRITING & WRITING LANGUAGES */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-2 border-black">
                                    {/* Primary Types of Writing */}
                                    <div className="space-y-3">
                                        <label className="block text-xs font-black text-gray-500 uppercase">✍️ Primary Forms / Types of Writing</label>
                                        <form onSubmit={(e) => handleAddWritingType(undefined, e)} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={writingTypeInput}
                                                onChange={(e) => setWritingTypeInput(e.target.value)}
                                                className="w-full bg-white border-2 border-black p-2.5 font-bold text-xs outline-none"
                                                placeholder="e.g. Poetry, Novels, Short Story..."
                                            />
                                            <button type="submit" className="bg-black text-white font-black px-4 py-2 text-xs uppercase border-2 border-black hover:bg-[#39FF14] hover:text-black shrink-0">+ ADD</button>
                                        </form>
                                        {/* Quick preset buttons */}
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {['Poetry', 'Short Story', 'Novel', 'Essays', 'Screenplays'].map((preset) => (
                                                <button
                                                    key={preset}
                                                    type="button"
                                                    onClick={() => handleAddWritingType(preset)}
                                                    className="bg-gray-100 border border-black px-2 py-0.5 text-[10px] font-bold uppercase hover:bg-[#39FF14]"
                                                >
                                                    + {preset}
                                                </button>
                                            ))}
                                        </div>
                                        {/* Live Badges */}
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {(formData.writing_types || []).map((wt: string, idx: number) => (
                                                <span key={idx} className="bg-black text-white border-2 border-black px-2.5 py-1 text-xs font-black uppercase flex items-center gap-2">
                                                    {wt}
                                                    <button type="button" onClick={() => handleRemoveWritingType(wt)} className="hover:text-red-400"><X size={12} /></button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Writing Languages */}
                                    <div className="space-y-3">
                                        <label className="block text-xs font-black text-gray-500 uppercase">🗣️ Writing Languages & Dialects</label>
                                        <form onSubmit={handleAddLang} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={langInput}
                                                onChange={(e) => setLangInput(e.target.value)}
                                                className="w-full bg-white border-2 border-black p-2.5 font-bold text-xs uppercase outline-none"
                                                placeholder="e.g. ENGLISH, HINDI, URDU..."
                                            />
                                            <button type="submit" className="bg-black text-white font-black px-4 py-2 text-xs uppercase border-2 border-black hover:bg-[#39FF14] hover:text-black shrink-0">+ ADD</button>
                                        </form>
                                        {/* Live Badges */}
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {(formData.languages || []).map((lang: string, idx: number) => (
                                                <span key={idx} className="bg-[#00A3FF] text-white border-2 border-black px-2.5 py-1 text-xs font-black uppercase flex items-center gap-2">
                                                    {lang}
                                                    <button type="button" onClick={() => handleRemoveLang(lang)} className="hover:text-red-400"><X size={12} /></button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 w-full min-w-0 overflow-hidden">
                                    <label className="block text-xs font-black text-gray-400 uppercase">My Bio</label>
                                    <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full h-32 bg-white border-2 border-black p-4 font-medium focus:bg-[#39FF14]/5 outline-none resize-none break-words [overflow-wrap:anywhere]" placeholder="Share your literary journey, themes, signature style, and inspirations..." />
                                </div>

                                {/* PRO-TIPS FOR A WOW AUTHOR BIO (THEORY GUIDE) */}
                                <div className="bg-[#FFC700]/15 p-6 border-[3px] border-black space-y-3">
                                    <h4 className="font-black text-sm uppercase flex items-center gap-2 bg-black text-[#FFC700] px-3 py-1 w-fit">
                                        💡 PRO-TIPS FOR A WOW AUTHOR BIO
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-gray-800">
                                        <div className="bg-white p-3 border-2 border-black space-y-1 shadow-[2px_2px_0_0_#000]">
                                            <span className="text-[#FF4F00] font-black">1. THE HOOK & GENRE</span>
                                            <p className="font-medium text-gray-600">State your core writing style and primary genres (e.g. "Dark Romance poet & speculative fiction author").</p>
                                        </div>
                                        <div className="bg-white p-3 border-2 border-black space-y-1 shadow-[2px_2px_0_0_#000]">
                                            <span className="text-[#9D00FF] font-black">2. HONORS & MILESTONES</span>
                                            <p className="font-medium text-gray-600">Mention notable contest features, published anthologies, or bestselling book launches.</p>
                                        </div>
                                        <div className="bg-white p-3 border-2 border-black space-y-1 shadow-[2px_2px_0_0_#000]">
                                            <span className="text-[#00A3FF] font-black">3. INSPIRATION & ORIGIN</span>
                                            <p className="font-medium text-gray-600">Briefly share when you began writing and key literary figures that shape your craft.</p>
                                        </div>
                                        <div className="bg-white p-3 border-2 border-black space-y-1 shadow-[2px_2px_0_0_#000]">
                                            <span className="text-[#39FF14] font-black">4. CURRENT PROJECTS</span>
                                            <p className="font-medium text-gray-600">Tease what you're currently working on to build anticipation among readers!</p>
                                        </div>
                                    </div>
                                </div>

                                {/* AGE / DOB & WRITING SINCE OPTIONS */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-2 border-black">
                                    {/* Age / DOB Option */}
                                    <div className="bg-white p-4 border-2 border-black space-y-4 shadow-[4px_4px_0_0_#000]">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                id="show_age_cb"
                                                checked={formData.show_age === true}
                                                onChange={(e) => setFormData({ ...formData, show_age: e.target.checked })}
                                                className="w-5 h-5 border-2 border-black accent-black cursor-pointer"
                                            />
                                            <label htmlFor="show_age_cb" className="font-black text-xs uppercase cursor-pointer">
                                                Show Age / DOB on my Public Profile
                                            </label>
                                        </div>

                                        {formData.show_age && (
                                            <div className="space-y-3 pt-2">
                                                <div className="flex gap-4 text-xs font-black uppercase">
                                                    <label className="flex items-center gap-1 cursor-pointer">
                                                        <input type="radio" name="age_type" value="age" checked={formData.age_type !== 'dob'} onChange={() => setFormData({ ...formData, age_type: 'age' })} className="accent-black" />
                                                        Exact Age (e.g. 24)
                                                    </label>
                                                    <label className="flex items-center gap-1 cursor-pointer">
                                                        <input type="radio" name="age_type" value="dob" checked={formData.age_type === 'dob'} onChange={() => setFormData({ ...formData, age_type: 'dob' })} className="accent-black" />
                                                        Date of Birth (DOB)
                                                    </label>
                                                </div>

                                                {formData.age_type === 'dob' ? (
                                                    <input
                                                        type="date"
                                                        name="age_val"
                                                        value={formData.age_val || ""}
                                                        onChange={handleChange}
                                                        className="w-full bg-white border-2 border-black p-2.5 font-bold text-xs outline-none"
                                                    />
                                                ) : (
                                                    <input
                                                        type="number"
                                                        name="age_val"
                                                        placeholder="e.g. 24"
                                                        value={formData.age_val || ""}
                                                        onChange={handleChange}
                                                        className="w-full bg-white border-2 border-black p-2.5 font-bold text-xs outline-none"
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Writing Since Year Option */}
                                    <div className="bg-white p-4 border-2 border-black space-y-4 shadow-[4px_4px_0_0_#000]">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                id="show_ws_cb"
                                                checked={formData.show_writing_since !== false}
                                                onChange={(e) => setFormData({ ...formData, show_writing_since: e.target.checked })}
                                                className="w-5 h-5 border-2 border-black accent-black cursor-pointer"
                                            />
                                            <label htmlFor="show_ws_cb" className="font-black text-xs uppercase cursor-pointer">
                                                Show "Writing Since" Year on Public Profile
                                            </label>
                                        </div>

                                        {formData.show_writing_since !== false && (
                                            <div className="space-y-1 pt-2">
                                                <label className="block text-[10px] font-black text-gray-500 uppercase">Writing Since Year</label>
                                                <input
                                                    type="number"
                                                    name="writing_since_year"
                                                    placeholder="e.g. 2018"
                                                    value={formData.writing_since_year || ""}
                                                    onChange={handleChange}
                                                    className="w-full bg-white border-2 border-black p-2.5 font-bold text-xs outline-none"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Genre Hashtags Section (Max 3 tags, Max 15 chars per tag) */}
                                <div className="space-y-4 pt-4 border-t-2 border-black">
                                    <div className="flex justify-between items-center flex-wrap gap-2">
                                        <label className="block text-xs font-black text-gray-500 uppercase">
                                            GENRE HASHTAGS ({(formData.tags || []).length} / 3 TAGS USED)
                                        </label>
                                        <span className="text-[10px] font-black uppercase text-gray-400">MAX 15 CHARACTERS PER TAG</span>
                                    </div>

                                    {(formData.tags || []).length < 3 && (
                                        <form onSubmit={handleAddTag} className="flex gap-2">
                                            <div className="relative flex-grow">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-black text-sm text-black">#</span>
                                                <input
                                                    type="text"
                                                    value={tagInput}
                                                    maxLength={15}
                                                    onChange={(e) => setTagInput(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
                                                    className="w-full bg-white border-2 border-black pl-8 pr-16 py-3 font-black text-sm uppercase outline-none focus:bg-[#39FF14]/10"
                                                    placeholder="POETRY"
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">
                                                    {tagInput.length}/15
                                                </span>
                                            </div>
                                            <button
                                                type="submit"
                                                className="bg-black text-white font-black px-6 py-3 text-xs uppercase border-2 border-black hover:bg-[#39FF14] hover:text-black transition-colors shrink-0 shadow-[2px_2px_0_0_#000]"
                                            >
                                                + ADD TAG
                                            </button>
                                        </form>
                                    )}

                                    {/* Live Badges Display */}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {(formData.tags || []).map((tag: string, idx: number) => (
                                            <span
                                                key={idx}
                                                className="bg-[#FF4F00] text-white border-2 border-black px-3 py-1.5 text-xs font-black uppercase shadow-[3px_3px_0_0_#000] flex items-center gap-2"
                                            >
                                                #{tag}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTag(tag)}
                                                    className="bg-black text-white rounded-full p-0.5 hover:bg-white hover:text-black transition-colors"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </span>
                                        ))}
                                        {(formData.tags || []).length === 0 && (
                                            <p className="text-xs font-bold text-gray-400 italic">No genre tags added yet. Add up to 3 tags (e.g. #POETRY, #ROMANCE).</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'hero' && (
                        <div className="bg-white border-[4px] border-black p-8 shadow-[12px_12px_0_0_#39FF14] min-h-[600px] flex flex-col space-y-8">
                            <div className="flex justify-between items-center flex-wrap gap-4 border-b-4 border-black pb-4 text-[#39FF14] bg-black px-4 -mx-8 -mt-8">
                                <div>
                                    <h2 className="text-3xl font-black uppercase text-[#39FF14]">FEATURED WRITING PORTFOLIO</h2>
                                    <p className="text-xs font-bold text-gray-300">
                                        Add unlimited poems & stories. Select up to <span className="text-[#39FF14] font-black underline">MAX 3</span> to show on your main profile!
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="bg-[#39FF14] text-black font-black text-xs px-3 py-1 border border-black uppercase">
                                        📌 {(formData.featured_pieces || []).filter((p: any) => p.pinned !== false).length} / 3 PINNED TO PROFILE
                                    </span>
                                </div>
                            </div>

                            {/* LIST OF EXISTING FEATURED WRITINGS */}
                            {(formData.featured_pieces || []).length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-sm font-black uppercase tracking-wider bg-black text-white px-3 py-1 w-fit">
                                        YOUR FEATURED WRITING ARCHIVE
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        {(formData.featured_pieces || []).map((piece: any) => (
                                            <div key={piece.id} className="border-2 border-black p-4 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0_0_#000]">
                                                <div className="space-y-1 min-w-0 flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="text-[10px] font-black bg-black text-white px-2 py-0.5 uppercase">
                                                            {piece.format || 'POETRY'}
                                                        </span>
                                                        <span className="text-[10px] font-bold bg-gray-200 text-black px-2 py-0.5 uppercase border border-black">
                                                            ⏱️ {getReadingTime(piece.content)}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleTogglePinFeaturedPiece(piece.id)}
                                                            className={`text-[10px] font-black px-2 py-0.5 border border-black uppercase transition-all ${piece.pinned !== false ? 'bg-[#39FF14] text-black shadow-[2px_2px_0_0_#000]' : 'bg-white text-gray-400 hover:text-black'}`}
                                                        >
                                                            {piece.pinned !== false ? '📌 PINNED ON MAIN PROFILE' : '➕ PIN TO PROFILE'}
                                                        </button>
                                                    </div>
                                                    <h4 className="font-black text-lg uppercase truncate">{piece.title}</h4>
                                                    <p className="text-xs text-gray-600 line-clamp-1 italic font-serif">
                                                        "{piece.content.replace(/<[^>]+>/g, ' ').slice(0, 100)}..."
                                                    </p>
                                                </div>

                                                <div className="flex gap-2 w-full md:w-auto">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setEditingFeaturedId(piece.id);
                                                            setFeaturedForm({
                                                                id: piece.id,
                                                                title: piece.title,
                                                                content: piece.content,
                                                                format: piece.format || 'POETRY',
                                                                font: piece.font || 'SERIF',
                                                                backstory: piece.backstory || '',
                                                                pinned: piece.pinned !== false
                                                            });
                                                        }}
                                                        className="flex-1 md:flex-initial bg-black text-white px-3 py-1.5 text-xs font-black uppercase hover:bg-yellow-400 hover:text-black border border-black transition-colors"
                                                    >
                                                        EDIT
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteFeaturedPiece(piece.id)}
                                                        className="flex-1 md:flex-initial bg-red-600 text-white px-3 py-1.5 text-xs font-black uppercase hover:bg-black border border-black transition-colors"
                                                    >
                                                        DELETE
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ADD / EDIT FEATURED PIECE FORM */}
                            <div className="bg-[#39FF14]/5 p-6 border-[3px] border-black space-y-6">
                                <div className="flex justify-between items-center flex-wrap gap-2">
                                    <h3 className="text-sm font-black uppercase tracking-wider bg-black text-[#39FF14] px-3 py-1 w-fit">
                                        {editingFeaturedId ? '✏️ EDIT FEATURED WRITING' : '➕ ADD NEW FEATURED WRITING'}
                                    </h3>
                                    {editingFeaturedId && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingFeaturedId(null);
                                                setFeaturedForm({ id: '', title: '', content: '', format: 'POETRY', font: 'SERIF', backstory: '', pinned: true });
                                            }}
                                            className="text-xs font-black uppercase text-red-600 underline"
                                        >
                                            CANCEL EDIT
                                        </button>
                                    )}
                                </div>

                                {/* SUB-GENRE FORMAT & TYPOGRAPHY PICKER */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 border-2 border-black">
                                    <div>
                                        <label className="block text-xs font-black text-gray-600 uppercase mb-2">🏷️ Writing Format / Sub-Genre</label>
                                        <select
                                            value={featuredForm.format}
                                            onChange={(e) => setFeaturedForm({ ...featuredForm, format: e.target.value })}
                                            className="w-full bg-white border-2 border-black p-3 font-black text-xs uppercase outline-none focus:bg-[#39FF14]/10"
                                        >
                                            <option value="POETRY">📜 Poetry</option>
                                            <option value="PROSE_POETRY">✒️ Prose Poetry</option>
                                            <option value="FLASH_FICTION">⚡ Flash Fiction</option>
                                            <option value="CHAPTER_EXCERPT">📖 Chapter Excerpt</option>
                                            <option value="SPOKEN_WORD">🎤 Spoken Word</option>
                                            <option value="ESSAY">📝 Personal Essay</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black text-gray-600 uppercase mb-2">🔤 Typography & Font Style</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                                { id: 'SERIF', label: '📜 Serif' },
                                                { id: 'MONO', label: '⌨️ Mono' },
                                                { id: 'SANS', label: '✒️ Sans' },
                                            ].map((f) => (
                                                <button
                                                    key={f.id}
                                                    type="button"
                                                    onClick={() => setFeaturedForm({ ...featuredForm, font: f.id })}
                                                    className={`p-2.5 border-2 border-black text-xs font-black uppercase transition-all ${featuredForm.font === f.id ? 'bg-black text-[#39FF14] shadow-[3px_3px_0_0_#39FF14]' : 'bg-white text-black hover:bg-gray-100'}`}
                                                >
                                                    {f.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-1">Title *</label>
                                        <input
                                            type="text"
                                            value={featuredForm.title}
                                            onChange={(e) => setFeaturedForm({ ...featuredForm, title: e.target.value })}
                                            className="w-full text-xl font-black uppercase bg-white border-2 border-black p-3 outline-none focus:bg-[#39FF14]/10"
                                            placeholder="e.g. Midnight Stanzas on Varanasi Ghats"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-2">Writing Content *</label>
                                        <BrutalistEditor
                                            value={featuredForm.content}
                                            onChange={(val) => setFeaturedForm({ ...featuredForm, content: val })}
                                            placeholder="Write your story or poem here..."
                                            maxWords={200}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-1">📖 "Behind the Words" (Author Backstory Note - Optional)</label>
                                        <input
                                            type="text"
                                            value={featuredForm.backstory}
                                            onChange={(e) => setFeaturedForm({ ...featuredForm, backstory: e.target.value })}
                                            className="w-full bg-white border-2 border-black p-3 font-medium text-xs outline-none focus:bg-[#39FF14]/10"
                                            placeholder="e.g. Written on a rainy train from Kyoto... Inspired by loss and memory."
                                        />
                                    </div>

                                    <div className="flex items-center gap-3 pt-2">
                                        <input
                                            type="checkbox"
                                            id="pin_cb"
                                            checked={featuredForm.pinned}
                                            onChange={(e) => setFeaturedForm({ ...featuredForm, pinned: e.target.checked })}
                                            className="w-5 h-5 border-2 border-black accent-black cursor-pointer"
                                        />
                                        <label htmlFor="pin_cb" className="font-black text-xs uppercase cursor-pointer">
                                            📌 Pin to Main Profile Page (Show as 1 of up to 3 main preview pieces)
                                        </label>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleSaveFeaturedPiece}
                                        className="w-full bg-black text-[#39FF14] font-black py-4 text-sm uppercase border-2 border-black hover:bg-[#39FF14] hover:text-black transition-colors shadow-[4px_4px_0_0_#000]"
                                    >
                                        {editingFeaturedId ? 'SAVE FEATURED PIECE CHANGES →' : 'ADD TO FEATURED WRITING ARCHIVE →'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* My Books Module */}
                    {activeTab === 'library' && (
                        <div className="bg-white border-[4px] border-black p-8 shadow-[12px_12px_0_0_#00A3FF] space-y-8 animate-in fade-in zoom-in-95">
                            <h2 className="text-3xl font-black uppercase border-b-4 border-black pb-4 text-[#00A3FF]">MY BOOKS</h2>
                            
                            {/* Add Book Form */}
                            <div className="bg-[#00A3FF]/5 p-6 border-[3px] border-black space-y-4">
                                <h3 className="text-sm font-black uppercase tracking-wider bg-black text-white px-3 py-1 w-fit">ADD NEW BOOK</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-1">Book Title *</label>
                                        <input type="text" value={bookForm.title} onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })} className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#00A3FF]/10" placeholder="e.g. Legends of Tomorrow" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-1">Price (MRP in ₹)</label>
                                        <input type="number" value={bookForm.price} onChange={(e) => setBookForm({ ...bookForm, price: e.target.value })} className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#00A3FF]/10" placeholder="e.g. 499" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-1">Format</label>
                                        <select value={bookForm.format} onChange={(e) => setBookForm({ ...bookForm, format: e.target.value })} className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#00A3FF]/10">
                                            <option value="Paperback">Paperback</option>
                                            <option value="Hardcover">Hardcover</option>
                                            <option value="E-Book">E-Book</option>
                                            <option value="Audiobook">Audiobook</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-1">Buy Link / Amazon URL</label>
                                        <input type="text" value={bookForm.buy_link} onChange={(e) => setBookForm({ ...bookForm, buy_link: e.target.value })} className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#00A3FF]/10" placeholder="https://amazon.in/dp/..." />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase mb-1">Book Description / Tagline</label>
                                    <textarea value={bookForm.description} onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })} className="w-full h-24 bg-white border-2 border-black p-3 font-medium text-sm outline-none resize-none focus:bg-[#00A3FF]/10" placeholder="Brief synopsis or tagline..." />
                                </div>
                                <button onClick={handleAddBook} className="bg-[#00A3FF] text-white font-black px-6 py-3 border-[3px] border-black hover:bg-black transition-colors shadow-[4px_4px_0_0_#000]">
                                    + ADD BOOK TO LIBRARY
                                </button>
                            </div>

                            {/* Books List */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-black uppercase border-b-2 border-black pb-2">PUBLISHED BOOKS ({(formData.books || []).length})</h3>
                                {(formData.books || []).length === 0 ? (
                                    <p className="text-sm font-bold text-gray-400 italic">No books added yet. Use the form above to add your first book.</p>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {(formData.books || []).map((book: any, idx: number) => (
                                            <div key={book.id || idx} className="bg-white border-[3px] border-black p-4 shadow-[4px_4px_0_0_#000] flex justify-between items-start gap-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="bg-[#00A3FF] text-white text-[10px] font-black px-2 py-0.5 uppercase border border-black">{book.format || 'Book'}</span>
                                                        {book.price && <span className="font-black text-xs text-gray-700">₹{book.price}</span>}
                                                    </div>
                                                    <h4 className="font-black text-lg uppercase leading-tight">{book.title}</h4>
                                                    {book.description && <p className="text-xs text-gray-600 font-medium line-clamp-2">{book.description}</p>}
                                                </div>
                                                <button onClick={() => handleDeleteBook(book.id)} className="text-red-500 hover:bg-red-100 p-2 border border-black rounded transition-colors shrink-0">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* My Books Module */}

                    {/* My Awards Module */}
                    {activeTab === 'awards' && (
                        <div className="bg-white border-[4px] border-black p-8 shadow-[12px_12px_0_0_#9D00FF] space-y-8 animate-in fade-in zoom-in-95">
                            <h2 className="text-3xl font-black uppercase border-b-4 border-black pb-4 text-[#9D00FF]">MY AWARDS & ACCOMPLISHMENTS</h2>
                            
                            {/* Add Award Form */}
                            <div className="bg-[#9D00FF]/5 p-6 border-[3px] border-black space-y-4">
                                <h3 className="text-sm font-black uppercase tracking-wider bg-black text-white px-3 py-1 w-fit">ADD NEW AWARD</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-1">Award / Honor Title *</label>
                                        <input type="text" value={awardForm.title} onChange={(e) => setAwardForm({ ...awardForm, title: e.target.value })} className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#9D00FF]/10" placeholder="e.g. Shakespeare Poetry Award Winner" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-1">Year</label>
                                        <input type="text" value={awardForm.year} onChange={(e) => setAwardForm({ ...awardForm, year: e.target.value })} className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#9D00FF]/10" placeholder="2026" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase mb-1">Issuing Organization / Host</label>
                                    <input type="text" value={awardForm.issuer} onChange={(e) => setAwardForm({ ...awardForm, issuer: e.target.value })} className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#9D00FF]/10" placeholder="e.g. Inkfetish Publications" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase mb-1">Description / Notes</label>
                                    <textarea value={awardForm.description} onChange={(e) => setAwardForm({ ...awardForm, description: e.target.value })} className="w-full h-20 bg-white border-2 border-black p-3 font-medium text-sm outline-none resize-none focus:bg-[#9D00FF]/10" placeholder="Brief description of the award..." />
                                </div>
                                <button onClick={handleAddAward} className="bg-[#9D00FF] text-white font-black px-6 py-3 border-[3px] border-black hover:bg-black transition-colors shadow-[4px_4px_0_0_#000]">
                                    + ADD AWARD
                                </button>
                            </div>

                            {/* Awards List */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-black uppercase border-b-2 border-black pb-2">AWARDS & HONORS ({(formData.awards || []).length})</h3>
                                {(formData.awards || []).length === 0 ? (
                                    <p className="text-sm font-bold text-gray-400 italic">No awards added yet. Add your achievements using the form above.</p>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {(formData.awards || []).map((award: any, idx: number) => (
                                            <div key={award.id || idx} className="bg-white border-[3px] border-black p-4 shadow-[4px_4px_0_0_#000] flex justify-between items-start gap-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="bg-[#9D00FF] text-white text-[10px] font-black px-2 py-0.5 uppercase border border-black">🏆 {award.year || 'Award'}</span>
                                                        {award.issuer && <span className="font-bold text-xs text-gray-500">{award.issuer}</span>}
                                                    </div>
                                                    <h4 className="font-black text-lg uppercase leading-tight">{award.title}</h4>
                                                    {award.description && <p className="text-xs text-gray-600 font-medium">{award.description}</p>}
                                                </div>
                                                <button onClick={() => handleDeleteAward(award.id)} className="text-red-500 hover:bg-red-100 p-2 border border-black rounded transition-colors shrink-0">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Work in Progress (WIP Tracker) Module */}
                    {activeTab === 'wip' && (
                        <div className="bg-white border-[4px] border-black p-8 shadow-[12px_12px_0_0_#FF0055] space-y-8 animate-in fade-in zoom-in-95">
                            <h2 className="text-3xl font-black uppercase border-b-4 border-black pb-4 text-[#FF0055]">WORK IN PROGRESS (WIP TRACKER)</h2>
                            <p className="text-xs font-bold text-gray-600 uppercase">Show your readers what book or manuscript you are currently writing in real-time!</p>

                            <div className="bg-[#FF0055]/5 p-6 border-[3px] border-black space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-1">Book / Manuscript Title</label>
                                        <input type="text" name="wip_title" value={formData.wip_title || ""} onChange={handleChange} className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#FF0055]/10" placeholder="e.g. Volume II: The Silent Tempest" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-black text-gray-500 uppercase mb-1">Current Word Count Written</label>
                                            <input type="number" name="wip_current" value={formData.wip_current || 0} onChange={handleChange} className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#FF0055]/10" placeholder="32000" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-gray-500 uppercase mb-1">Target Goal Word Count</label>
                                            <input type="number" name="wip_target" value={formData.wip_target || 50000} onChange={handleChange} className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#FF0055]/10" placeholder="50000" />
                                        </div>
                                    </div>
                                </div>

                                {/* Live Progress Preview */}
                                {formData.wip_title && Number(formData.wip_target) > 0 && (
                                    <div className="border-[3px] border-black bg-white p-6 shadow-[6px_6px_0_0_#000] space-y-3">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <span className="text-[10px] font-black uppercase text-gray-500">LIVE PREVIEW ON PUBLIC PORTFOLIO</span>
                                                <h4 className="font-black text-xl uppercase">{formData.wip_title}</h4>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-2xl font-black text-[#FF0055]">
                                                    {Math.min(100, Math.round(((formData.wip_current || 0) / Number(formData.wip_target)) * 100))}%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full h-6 bg-gray-200 border-2 border-black relative overflow-hidden flex items-center">
                                            <div
                                                className="h-full bg-black transition-all duration-500"
                                                style={{ width: `${Math.min(100, Math.max(0, ((formData.wip_current || 0) / Number(formData.wip_target)) * 100))}%` }}
                                            />
                                        </div>
                                        <p className="text-xs font-bold text-gray-600 text-right">{Number(formData.wip_current || 0).toLocaleString()} / {Number(formData.wip_target).toLocaleString()} WORDS WRITTEN</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Socials & Collaborations Module */}
                    {activeTab === 'socials' && (
                        <div className="bg-white border-[4px] border-black p-8 shadow-[12px_12px_0_0_#00E5FF] space-y-8 animate-in fade-in zoom-in-95">
                            <h2 className="text-3xl font-black uppercase border-b-4 border-black pb-4 text-[#00E5FF] bg-black px-4 -mx-8 -mt-8 mb-8">SOCIALS & COLLABORATIONS</h2>

                            <div className="space-y-6">
                                <div className="bg-[#00E5FF]/5 p-6 border-[3px] border-black space-y-4">
                                    <h3 className="text-sm font-black uppercase tracking-wider bg-black text-white px-3 py-1 w-fit">SOCIAL MEDIA LINKS</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-black text-gray-500 uppercase mb-1">Instagram URL</label>
                                            <input type="text" name="instagram" value={formData.instagram || ""} onChange={handleChange} className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#00E5FF]/10" placeholder="https://instagram.com/yourhandle" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-gray-500 uppercase mb-1">Twitter / X URL</label>
                                            <input type="text" name="twitter" value={formData.twitter || ""} onChange={handleChange} className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#00E5FF]/10" placeholder="https://x.com/yourhandle" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-gray-500 uppercase mb-1">Substack Newsletter URL</label>
                                            <input type="text" name="substack" value={formData.substack || ""} onChange={handleChange} className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#00E5FF]/10" placeholder="https://yourname.substack.com" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-gray-500 uppercase mb-1">Personal Website URL</label>
                                            <input type="text" name="website" value={formData.website || ""} onChange={handleChange} className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#00E5FF]/10" placeholder="https://yourwebsite.com" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-yellow-500/5 p-6 border-[3px] border-black space-y-4">
                                    <h3 className="text-sm font-black uppercase tracking-wider bg-black text-white px-3 py-1 w-fit">OPEN FOR COLLABORATION</h3>
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-1">Collaboration Email / Booking Contact</label>
                                        <input type="email" name="collab_email" value={formData.collab_email || ""} onChange={handleChange} className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-yellow-500/10" placeholder="bookings@yourname.com" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-1">Inquiry / Booking Note</label>
                                        <textarea name="collab_prompt" value={formData.collab_prompt || ""} onChange={handleChange} className="w-full h-24 bg-white border-2 border-black p-3 font-medium text-sm outline-none resize-none focus:bg-yellow-500/10" placeholder="Open for keynote speaking, poetry readings, writing workshops, and press interviews..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Reviews & Praise Module */}
                    {activeTab === 'reviews' && (
                        <div className="bg-white border-[4px] border-black p-8 shadow-[12px_12px_0_0_#FFD700] space-y-8 animate-in fade-in zoom-in-95">
                            <h2 className="text-3xl font-black uppercase border-b-4 border-black pb-4 text-[#FFD700] bg-black px-4 -mx-8 -mt-8 mb-8">REVIEWS & PRAISE</h2>

                            {/* Add Review Form */}
                            <div className="bg-yellow-500/5 p-6 border-[3px] border-black space-y-4">
                                <h3 className="text-sm font-black uppercase tracking-wider bg-black text-white px-3 py-1 w-fit">ADD EDITORIAL REVIEW OR PRAISE</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-1">Reviewer Name / Publication *</label>
                                        <input type="text" value={reviewForm.reviewer} onChange={(e) => setReviewForm({ ...reviewForm, reviewer: e.target.value })} className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-yellow-500/10" placeholder="e.g. Times Literary Review / Dan Brown" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-1">Source Type</label>
                                        <select value={reviewForm.source} onChange={(e) => setReviewForm({ ...reviewForm, source: e.target.value })} className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-yellow-500/10">
                                            <option value="Editorial Review">Editorial Review</option>
                                            <option value="Author Praise">Author Endorsement</option>
                                            <option value="Reader Review">Reader Review</option>
                                            <option value="Press / Media">Press / Media</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase mb-1">Quote Content *</label>
                                    <textarea value={reviewForm.quote} onChange={(e) => setReviewForm({ ...reviewForm, quote: e.target.value })} className="w-full h-24 bg-white border-2 border-black p-3 font-medium text-sm outline-none resize-none focus:bg-yellow-500/10" placeholder="“One of the most striking literary debuts of 2026...”" />
                                </div>
                                <button onClick={handleAddReview} className="bg-[#FFD700] text-black font-black px-6 py-3 border-[3px] border-black hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0_0_#000]">
                                    + ADD REVIEW TO PORTFOLIO
                                </button>
                            </div>

                            {/* Reviews List */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-black uppercase border-b-2 border-black pb-2">REVIEWS ({(formData.reviews || []).length})</h3>
                                {(formData.reviews || []).length === 0 ? (
                                    <p className="text-sm font-bold text-gray-400 italic">No reviews added yet. Add press praise or reader quotes above.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {(formData.reviews || []).map((rev: any, idx: number) => (
                                            <div key={rev.id || idx} className="bg-white border-[3px] border-black p-4 shadow-[4px_4px_0_0_#000] flex justify-between items-start gap-4">
                                                <div className="space-y-1 w-full">
                                                    <div className="flex items-center gap-2">
                                                        <span className="bg-[#FFD700] text-black text-[10px] font-black px-2 py-0.5 uppercase border border-black">★ {rev.source || 'Review'}</span>
                                                        <span className="font-black text-sm">{rev.reviewer}</span>
                                                    </div>
                                                    <p className="text-sm font-serif italic text-gray-800 bg-gray-50 p-3 border border-black mt-2">“{rev.quote}”</p>
                                                </div>
                                                <button onClick={() => handleDeleteReview(rev.id)} className="text-red-500 hover:bg-red-100 p-2 border border-black rounded transition-colors shrink-0">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}





                    {/* QR Code & Share Module */}
                    {activeTab === 'share' && (
                        <div className="bg-white border-[4px] border-black p-8 shadow-[12px_12px_0_0_#39FF14] space-y-8 animate-in fade-in zoom-in-95">
                            <h2 className="text-3xl font-black uppercase border-b-4 border-black pb-4 text-black bg-[#39FF14] px-4 -mx-8 -mt-8 mb-8">QR CODE & SHARE TOOLS</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-black text-gray-500 uppercase">Your Portfolio Shortlink</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                readOnly
                                                value={typeof window !== 'undefined' ? `${window.location.origin}/author/${authorUsername || user?.uid}` : ''}
                                                className="w-full bg-gray-100 border-2 border-black p-3 font-mono font-bold text-xs"
                                            />
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(`${window.location.origin}/author/${authorUsername || user?.uid}`);
                                                    setCopied(true);
                                                    toast({ title: "LINK COPIED! 📋" });
                                                    setTimeout(() => setCopied(false), 2000);
                                                }}
                                                className="bg-black text-white font-black px-4 py-3 border-2 border-black hover:bg-[#39FF14] hover:text-black transition-colors shrink-0"
                                            >
                                                {copied ? <Check size={18} /> : <Copy size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-[#39FF14]/10 p-6 border-[3px] border-black space-y-2">
                                        <h4 className="font-black text-sm uppercase">💡 PRO-TIP FOR AUTHORS</h4>
                                        <p className="text-xs font-medium text-gray-700 leading-relaxed">
                                            Print your QR Code on the back cover of your paperback books, bookmarks, and business cards so readers can instantly scan and view your portfolio!
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 border-[4px] border-black p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-[6px_6px_0_0_#000]">
                                    <span className="text-xs font-black uppercase bg-black text-white px-3 py-1">SCAN TO VISIT PORTFOLIO</span>
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}/author/${authorUsername || user?.uid}` : '')}`}
                                        alt="Author QR Code"
                                        className="w-48 h-48 border-4 border-black shadow-[4px_4px_0_0_#000] bg-white p-2"
                                    />
                                    <a
                                        href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}/author/${authorUsername || user?.uid}` : '')}`}
                                        target="_blank"
                                        download="author-qr-code.png"
                                        className="bg-[#39FF14] text-black font-black px-6 py-2.5 text-xs border-2 border-black hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] flex items-center gap-2"
                                    >
                                        <Download size={16} /> DOWNLOAD QR CODE
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Cropper Modal Placeholder */}
            {isCropping && (
                <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-8">
                    <button onClick={() => setIsCropping(false)} className="absolute top-8 right-8 text-white"><X size={32} /></button>
                    <div className="text-white font-black text-2xl uppercase mb-8">FIX PHOTO</div>
                    <div className="w-full max-w-xl h-96 relative border-4 border-white">
                        <Cropper
                            image={imageSrc!}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                    <button onClick={handleCropSave} className="mt-8 bg-[#39FF14] text-black font-black px-12 py-4 border-4 border-black shadow-[6px_6px_0_0_#fff]">SAVE PHOTO</button>
                </div>
            )}
        </div>
    );
};

export default DashboardClient;
