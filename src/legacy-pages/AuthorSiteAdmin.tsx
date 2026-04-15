import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Trash2, BookOpen, FileText, UserCircle, Type, Eye, EyeOff, X, Award, Copy, Check, Headset } from 'lucide-react';
import BrutalistEditor from '../components/BrutalistEditor';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { supabase } from '../lib/supabase';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '../contexts/AuthContext';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';

const CharCounter = ({ current, max }: { current: number; max: number }) => (
    <span className={`text-[10px] font-black tracking-widest px-2 py-0.5 ml-2 border-[2px] border-black ${current > max ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 text-black'}`}>
        {current} / {max}
    </span>
);

const AuthorSiteAdmin = () => {
    const { user, authorUsername } = useAuth();
    const authorId = user?.uid;
    const { toast } = useToast();
    const navigate = useNavigate();

    // UI State
    const [activeTab, setActiveTab] = useState('basic'); // 'basic', 'hero', 'library', 'archive', 'awards'
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
        books: [{ id: "b2", title: "Love at minus one co anthology", year: "2024", description: "A collaborative anthology exploring romance below the freezing point.", link: "#", cover_image: "", is_public: true, role: "Co-Author" }], writing_pieces: [],
        experiences: []
    });

    useEffect(() => {
        const fetchPortfolio = async () => {
            if (!authorId) return;
            // Public URL dynamically generated via authorUsername or fallback to ID
            const publicUrlPath = authorUsername ? `/author/${authorUsername}` : `/author/${authorId}`;
            const defaultWebsite = `${window.location.origin}${publicUrlPath}`;

            try {
                const docRef = doc(db, 'author_portfolios', authorId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const parsed = docSnap.data();
                    setFormData({
                        ...parsed,
                        tags: parsed.tags || [],
                        awards: parsed.awards || [],
                        experiences: parsed.experiences || [],
                        website: parsed.website || defaultWebsite,
                        location: parsed.location || "",
                        wip_title: parsed.wip_title || "",
                        wip_current: parsed.wip_current || 0,
                        wip_target: parsed.wip_target || 0
                    });
                } else {
                    setFormData((prev: any) => ({ ...prev, website: defaultWebsite }));
                }
            } catch (err) {
                console.error("Error fetching portfolio:", err);
                toast({ title: "ERROR LOADING PROFILE", description: "Failed to load from database.", variant: "destructive" });
            }
        };

        fetchPortfolio();
    }, [authorId, authorUsername]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setIsSaved(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!authorId) {
            toast({ title: "SAVE FAILED", description: "Not logged in.", variant: "destructive" });
            return;
        }

        try {
            await setDoc(doc(db, 'author_portfolios', authorId), formData, { merge: true });
            setIsSaved(true);
            toast({ title: "PORTFOLIO SAVED", description: "All changes updated to live site.", variant: "default" });
            setTimeout(() => setIsSaved(false), 3000);
        } catch (err: any) {
            console.error("Error saving portfolio:", err);
            toast({ title: "SAVE FAILED", description: err.message, variant: "destructive" });
        }
    };

    const handleImageUpload = async (file: File) => {
        if (!file || !user) return;

        setUploadingImage(true);
        toast({ title: "UPLOADING AVATAR...", description: "Securely transferring image to cloud storage.", variant: "default" });

        try {
            const fileName = `${Date.now()}.jpeg`;
            const filePath = `profiles/${user.uid}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('author-media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('author-media')
                .getPublicUrl(filePath);

            setFormData({ ...formData, profile_image: data.publicUrl });
            setIsSaved(false);
            toast({ title: "UPLOAD SUCCESSFUL", description: "Avatar synced to Supabase.", variant: "default" });
        } catch (error: any) {
            console.error("Error uploading image:", error.message);
            toast({ title: "UPLOAD FAILED", description: error.message || "Failed to upload to Supabase storage.", variant: "destructive" });
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
            // Reset input value so the same file can be selected again if needed
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
            console.error("Error during crop save:", e);
            toast({ title: "CROP FAILED", description: e.message, variant: "destructive" });
            setUploadingImage(false);
        } finally {
            setImageSrc(null);
        }
    };

    const handleCropCancel = () => {
        setIsCropping(false);
        setImageSrc(null);
    };

    // --- TAGS HANDLERS ---
    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
        if ('key' in e && e.key !== 'Enter') return;
        if ('preventDefault' in e) e.preventDefault();

        const trimmed = tagInput.trim().toUpperCase();
        if (trimmed && trimmed.length <= 15 && formData.tags.length < 3 && !formData.tags.includes(trimmed)) {
            setFormData({ ...formData, tags: [...formData.tags, trimmed] });
            setTagInput('');
            setIsSaved(false);
        }
    };

    const handleRemoveTag = (indexToRemove: number) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((_: any, index: number) => index !== indexToRemove)
        });
        setIsSaved(false);
    };

    // --- BOOKS HANDLERS ---
    const addBook = () => {
        if (formData.books && formData.books.length >= 4) {
            toast({
                title: "LIBRARY LIMIT REACHED",
                description: "You have reached the maximum limit of 4 books.",
                variant: "destructive",
            });
            return;
        }
        const newBook = { id: `b${Date.now()}`, title: '', year: '', description: '', link: '', cover_image: '', is_public: true, role: 'Author' };
        setFormData({ ...formData, books: [...(formData.books || []), newBook] });
        setIsSaved(false);
    };

    const updateBook = (id: string, field: string, value: any) => {
        const updatedBooks = formData.books.map((b: any) => b.id === id ? { ...b, [field]: value } : b);
        setFormData({ ...formData, books: updatedBooks });
        setIsSaved(false);
    };

    const removeBook = (id: string) => {
        setFormData({ ...formData, books: formData.books.filter((b: any) => b.id !== id) });
        setIsSaved(false);
    };

    const handleBookImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateBook(id, 'cover_image', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // --- EXPERIENCE TIMELINE HANDLERS ---
    const addExperience = () => {
        setFormData({
            ...formData,
            experiences: [...(formData.experiences || []), { id: Date.now().toString(), year: new Date().getFullYear().toString(), title: "NEW EXPERIENCE", description: "", is_public: true }]
        });
        setIsSaved(false);
    };

    const updateExperience = (id: string, field: string, value: any) => {
        const updatedExperiences = formData.experiences.map((exp: any) => exp.id === id ? { ...exp, [field]: value } : exp);
        setFormData({ ...formData, experiences: updatedExperiences });
        setIsSaved(false);
    };

    const removeExperience = (id: string) => {
        setFormData({ ...formData, experiences: formData.experiences.filter((exp: any) => exp.id !== id) });
        setIsSaved(false);
    };

    // --- AWARDS HANDLERS ---
    const addAward = () => {
        setFormData({
            ...formData,
            awards: [...(formData.awards || []), { id: Date.now().toString(), title: "NEW AWARD", year: new Date().getFullYear().toString(), organization: "", description: "" }]
        });
        setIsSaved(false);
    };

    const updateAward = (id: string, field: string, value: any) => {
        const updatedAwards = formData.awards.map((a: any) => a.id === id ? { ...a, [field]: value } : a);
        setFormData({ ...formData, awards: updatedAwards });
        setIsSaved(false);
    };

    const removeAward = (id: string) => {
        setFormData({ ...formData, awards: formData.awards.filter((a: any) => a.id !== id) });
        setIsSaved(false);
    };

    // --- WRITING PIECES HANDLERS ---
    const addPiece = () => {
        const newId = Date.now().toString();
        setFormData({
            ...formData,
            writing_pieces: [...(formData.writing_pieces || []), { id: newId, title: "NEW PIECE", type: "Short Story", content: "", is_public: true }]
        });
        setEditingPieceId(newId);
        setIsSaved(false);
    };

    const updatePiece = (id: string, field: string, value: any) => {
        const updatedPieces = formData.writing_pieces.map((p: any) => p.id === id ? { ...p, [field]: value } : p);
        setFormData({ ...formData, writing_pieces: updatedPieces });
        setIsSaved(false);
    };

    const removePiece = (id: string) => {
        setFormData({ ...formData, writing_pieces: formData.writing_pieces.filter((p: any) => p.id !== id) });
        if (editingPieceId === id) setEditingPieceId(null);
        setIsSaved(false);
    };

    return (
        <div className="min-h-screen bg-[#FFFDF7] p-2 lg:p-4 font-mono selection:bg-[#39FF14] selection:text-black">

            {/* Top Navigation Bar */}
            <div className="max-w-7xl mx-auto w-full bg-black text-white py-2 md:py-3 px-2 md:px-6 flex flex-row items-center justify-between text-xs md:text-sm font-bold uppercase shadow-[6px_6px_0_0_#39FF14] mb-8 border-[3px] border-black sticky top-0 z-50 gap-2 md:gap-4 overflow-hidden">
                <span className="tracking-widest md:tracking-[0.2em] text-[#39FF14] text-[10px] sm:text-base md:text-lg flex-shrink-0 whitespace-nowrap">● COMMAND CENTER</span>
                <div className="flex flex-row items-center justify-end gap-2 md:gap-4 w-auto flex-nowrap flex-shrink-0">
                    {isSaved && <span className="hidden sm:inline-block text-[#39FF14] text-[10px] md:text-xs font-bold animate-pulse px-2 py-1 border border-[#39FF14] whitespace-nowrap">DATA SAVED</span>}
                    <button onClick={handleSave} className="bg-[#39FF14] text-black font-black text-[10px] sm:text-xs md:text-base px-3 sm:px-6 md:px-10 py-2 md:py-3 border-[2px] md:border-[3px] border-black hover:bg-white transition-colors hover:-translate-y-1 active:translate-y-0 active:shadow-none hover:shadow-[4px_4px_0_0_#000] whitespace-nowrap">
                        SAVE UPDATES
                    </button>
                    <Link to={authorUsername ? `/author/${authorUsername}` : `/author/${authorId}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4F00] text-[10px] sm:text-xs md:text-sm transition-colors underline decoration-2 underline-offset-4 font-black whitespace-nowrap flex-shrink-0">
                        VIEW SITE ↗
                    </Link>
                </div>
            </div>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 pb-32 lg:pb-20">

                {/* LEFT SIDEBAR: TAB NAVIGATION */}
                <div className="lg:col-span-3 flex flex-col lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
                    <div className="grid grid-cols-5 lg:flex lg:flex-col gap-1 sm:gap-2 lg:gap-4 fixed inset-x-0 bottom-0 z-40 bg-[#FFFDF7] p-1 sm:p-2 border-t-[3px] border-black lg:border-t-0 lg:static lg:bg-transparent lg:pt-0 lg:px-0 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] lg:shadow-none">
                        <button
                            onClick={() => setActiveTab('basic')}
                            className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:w-full p-1 sm:p-2 md:p-4 border-[2px] sm:border-[3px] border-black font-black uppercase tracking-wider text-[8px] sm:text-[10px] md:text-sm gap-1 md:gap-3 transition-all ${activeTab === 'basic' ? 'bg-[#FFC700] shadow-[2px_2px_0_0_#000] lg:shadow-[6px_6px_0_0_#000] lg:translate-x-1 lg:-translate-y-1' : 'bg-white hover:bg-gray-100'}`}
                        >
                            <UserCircle size={16} className="md:w-5 md:h-5 block" /> <span className="block text-center lg:text-left leading-tight">Basic</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('hero')}
                            className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:w-full p-1 sm:p-2 md:p-4 border-[2px] sm:border-[3px] border-black font-black uppercase tracking-wider text-[8px] sm:text-[10px] md:text-sm gap-1 md:gap-3 transition-all ${activeTab === 'hero' ? 'bg-[#39FF14] shadow-[2px_2px_0_0_#000] lg:shadow-[6px_6px_0_0_#000] lg:translate-x-1 lg:-translate-y-1' : 'bg-white hover:bg-gray-100'}`}
                        >
                            <Type size={16} className="md:w-5 md:h-5 block" /> <span className="block text-center lg:text-left leading-tight">Hero</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('library')}
                            className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:w-full p-1 sm:p-2 md:p-4 border-[2px] sm:border-[3px] border-black font-black uppercase tracking-wider text-[8px] sm:text-[10px] md:text-sm gap-1 md:gap-3 transition-all ${activeTab === 'library' ? 'bg-[#00A3FF] text-black shadow-[2px_2px_0_0_#000] lg:shadow-[6px_6px_0_0_#000] lg:translate-x-1 lg:-translate-y-1' : 'bg-white hover:bg-gray-100'}`}
                        >
                            <BookOpen size={16} className="md:w-5 md:h-5 block" /> <span className="block text-center lg:text-left leading-tight">Library</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('archive')}
                            className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:w-full p-1 sm:p-2 md:p-4 border-[2px] sm:border-[3px] border-black font-black uppercase tracking-wider text-[8px] sm:text-[10px] md:text-sm gap-1 md:gap-3 transition-all ${activeTab === 'archive' ? 'bg-[#FF4F00] text-white shadow-[2px_2px_0_0_#000] lg:shadow-[6px_6px_0_0_#000] lg:translate-x-1 lg:-translate-y-1' : 'bg-white hover:bg-gray-100'}`}
                        >
                            <FileText size={16} className="md:w-5 md:h-5 block" /> <span className="block text-center lg:text-left leading-tight">Archive</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('awards')}
                            className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:w-full p-1 sm:p-2 md:p-4 border-[2px] sm:border-[3px] border-black font-black uppercase tracking-wider text-[8px] sm:text-[10px] md:text-sm gap-1 md:gap-3 transition-all ${activeTab === 'awards' ? 'bg-[#9D00FF] text-white shadow-[2px_2px_0_0_#000] lg:shadow-[6px_6px_0_0_#000] lg:translate-x-1 lg:-translate-y-1' : 'bg-white hover:bg-gray-100'}`}
                        >
                            <Award size={16} className="md:w-5 md:h-5 block" /> <span className="block text-center lg:text-left leading-tight">Awards</span>
                        </button>
                    </div>

                    <div className="pt-8 text-xs text-gray-500 font-bold uppercase tracking-widest leading-loose">
                        <p>ID: {authorId}</p>
                        <p>STATUS: ACTIVE</p>
                        <p>SYS: INKFETISH DB</p>
                    </div>

                    <div className="fixed bottom-24 right-4 lg:static lg:relative z-50 flex flex-col items-end lg:items-start lg:w-full lg:mt-8">
                        {isContactModalOpen && (
                            <>
                                <div className="fixed inset-0 z-[55] lg:hidden" onClick={() => setIsContactModalOpen(false)} />
                                <div className="absolute bottom-16 right-0 lg:bottom-auto lg:top-full lg:mt-2 w-64 bg-white border-[3px] border-black p-4 shadow-[6px_6px_0_0_#000] z-[60] flex flex-col gap-3 font-sans mb-2 lg:mb-0">
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest border-b-[2px] border-black pb-2 text-left">SUPPORT CHANNELS</p>

                                    <a
                                        href="https://wa.me/917250504240"
                                        target="_blank" rel="noopener noreferrer"
                                        className="flex flex-col items-start bg-[#25D366] text-black border-[2px] border-black p-3 hover:bg-black hover:text-[#25D366] transition-colors shadow-[2px_2px_0_0_#000]"
                                        onClick={() => setIsContactModalOpen(false)}
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-widest">WhatsApp</span>
                                        <span className="text-sm font-bold">7250504240 - Saksham</span>
                                    </a>

                                    <a
                                        href="mailto:inkfetishh@gmail.com"
                                        className="flex flex-col items-start bg-[#FFC700] text-black border-[2px] border-black p-3 hover:bg-black hover:text-[#FFC700] transition-colors shadow-[2px_2px_0_0_#000]"
                                        onClick={() => setIsContactModalOpen(false)}
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-widest">Email</span>
                                        <span className="text-sm font-bold truncate w-full text-left">inkfetishh@gmail.com</span>
                                    </a>
                                </div>
                            </>
                        )}
                        <button
                            onClick={() => setIsContactModalOpen(!isContactModalOpen)}
                            className="w-14 h-14 lg:w-full lg:h-auto flex items-center justify-center lg:justify-start gap-0 lg:gap-3 p-0 lg:p-4 rounded-full lg:rounded-none border-[3px] border-black font-black uppercase tracking-tight lg:tracking-wider transition-all bg-black text-white hover:bg-[#FF4F00] shadow-[4px_4px_0_0_rgba(100,100,100,0.5)] lg:shadow-[6px_6px_0_0_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 group relative z-[60]"
                            title="Contact Support"
                        >
                            <Headset size={24} className="lg:w-5 lg:h-5 lg:mb-0" />
                            <span className="hidden lg:block text-sm leading-none">Contact</span>
                        </button>
                    </div>
                </div>

                {/* RIGHT CONTENT AREA */}
                <div className="lg:col-span-9">

                    {/* TAB: BASIC INTEL */}
                    {activeTab === 'basic' && (
                        <div className="bg-white border-[4px] border-black p-4 md:p-6 lg:p-10 shadow-[8px_8px_0_0_rgba(0,0,0,1)] lg:shadow-[12px_12px_0_0_rgba(0,0,0,1)] animate-in fade-in slide-in-from-bottom-4 space-y-6 lg:space-y-8">

                            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter border-b-[4px] border-black pb-3 md:pb-4 text-[#FF4F00]">
                                AUTHOR INTEL
                            </h2>

                            {/* Section 0: Profile Link */}
                            <div className="bg-[#39FF14]/10 p-3 sm:p-4 md:p-6 border-[2px] sm:border-[3px] border-black flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
                                <div>
                                    <h3 className="font-black text-xs sm:text-sm uppercase tracking-widest text-black">YOUR PORTFOLIO LINK</h3>
                                    <p className="text-[10px] sm:text-xs font-bold text-gray-500 mt-0.5">Share this URL to show off your work.</p>
                                </div>
                                <div className="flex w-full md:w-auto mt-1 md:mt-0">
                                    <input
                                        type="text"
                                        readOnly
                                        value={authorUsername ? `${window.location.origin}/author/${authorUsername}` : `${window.location.origin}/author/${authorId}`}
                                        className="bg-white border-[2px] sm:border-[3px] border-black border-r-0 p-2 text-[10px] sm:text-xs md:text-sm font-bold w-full md:w-64 focus:outline-none truncate"
                                    />
                                    <button
                                        onClick={() => {
                                            const url = authorUsername ? `${window.location.origin}/author/${authorUsername}` : `${window.location.origin}/author/${authorId}`;
                                            navigator.clipboard.writeText(url);
                                            setCopied(true);
                                            setTimeout(() => setCopied(false), 2000);
                                        }}
                                        className="bg-black text-[#39FF14] px-3 sm:px-4 font-black border-[2px] sm:border-[3px] border-black hover:bg-[#39FF14] hover:text-black transition-colors flex items-center justify-center gap-2 text-[10px] sm:text-xs md:text-sm whitespace-nowrap"
                                    >
                                        {copied ? <><Check size={14} /> COPIED</> : <><Copy size={14} /> COPY</>}
                                    </button>
                                </div>
                            </div>

                            {/* Section 1: Identity & Avatar */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 bg-gray-50 p-4 sm:p-6 border-[2px] sm:border-[3px] border-black shadow-sm">
                                <div className="space-y-4 md:space-y-6">
                                    <div>
                                        <label className="block text-[10px] sm:text-xs md:text-sm font-black bg-black text-white inline-block px-2 py-0.5 mb-2 tracking-widest uppercase">Identity Photo</label>
                                        <div className="flex gap-4 items-center">
                                            <div className="w-24 h-24 sm:w-32 sm:h-32 border-[3px] sm:border-[4px] border-black bg-white relative group overflow-hidden flex-shrink-0 shadow-[4px_4px_0_0_#000]">
                                                {formData.profile_image ? (
                                                    <>
                                                        <img src={formData.profile_image} alt="preview" className="w-full h-full object-cover" />
                                                        <button
                                                            onClick={() => setFormData({ ...formData, profile_image: "" })}
                                                            className="absolute inset-0 bg-red-600/90 text-white font-black opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-[10px] tracking-widest gap-1"
                                                        >
                                                            <Trash2 size={16} />
                                                            <span>REMOVE</span>
                                                        </button>
                                                    </>
                                                ) : (
                                                    <span className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 font-bold text-[10px] text-center px-4 uppercase tracking-tighter">No Signal</span>
                                                )}
                                            </div>
                                            <div className="flex-grow">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileSelect}
                                                    id="avatar-upload"
                                                    className="hidden"
                                                    disabled={uploadingImage}
                                                />
                                                <label
                                                    htmlFor="avatar-upload"
                                                    className={`inline-block w-full sm:w-auto text-center bg-[#FFC700] text-black font-black uppercase text-[10px] sm:text-xs px-4 py-3 border-[2px] sm:border-[3px] border-black cursor-pointer hover:bg-black hover:text-[#FFC700] transition-all shadow-[2px_2px_0_0_#000] ${uploadingImage ? 'opacity-50 pointer-events-none' : ''}`}
                                                >
                                                    {uploadingImage ? 'UPLOADING...' : 'CHOOSE FILE'}
                                                </label>
                                                <p className="text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-tight">Square images work best.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CROPPING MODAL */}
                                {isCropping && imageSrc && (
                                    <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4">
                                        <div className="relative w-full max-w-2xl h-[60vh] md:h-[70vh] bg-black border-[4px] border-white flex-shrink-0">
                                            <Cropper
                                                image={imageSrc}
                                                crop={crop}
                                                zoom={zoom}
                                                aspect={1}
                                                cropShape="rect"
                                                showGrid={true}
                                                onCropChange={setCrop}
                                                onCropComplete={onCropComplete}
                                                onZoomChange={setZoom}
                                                style={{
                                                    containerStyle: { backgroundColor: '#111' },
                                                    mediaStyle: { border: '4px solid black' },
                                                    cropAreaStyle: { border: '4px solid #39FF14', boxShadow: '0 0 0 9999em rgba(0, 0, 0, 0.8)' }
                                                }}
                                            />
                                        </div>
                                        <div className="w-full max-w-2xl mt-6 space-y-4">
                                            <div className="flex items-center gap-4 bg-white p-4 border-[3px] border-black text-black">
                                                <span className="font-black text-xs uppercase tracking-widest min-w-[50px]">ZOOM</span>
                                                <input
                                                    type="range"
                                                    value={zoom}
                                                    min={1}
                                                    max={3}
                                                    step={0.1}
                                                    onChange={(e) => setZoom(Number(e.target.value))}
                                                    className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer"
                                                />
                                            </div>
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={handleCropCancel}
                                                    className="flex-1 bg-red-500 text-white font-black uppercase text-sm p-4 border-[3px] border-black hover:bg-black hover:text-red-500 transition-colors shadow-[4px_4px_0_0_#000]"
                                                >
                                                    CANCEL
                                                </button>
                                                <button
                                                    onClick={handleCropSave}
                                                    className="flex-1 bg-[#39FF14] text-black font-black uppercase text-sm p-4 border-[3px] border-black hover:bg-white transition-colors shadow-[4px_4px_0_0_#000]"
                                                >
                                                    CROP & UPLOAD ↗
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div><label className="block text-xs font-black mb-1 text-gray-500 flex items-center">REAL NAME <CharCounter current={formData.name?.length || 0} max={50} /></label><input type="text" name="name" value={formData.name} onChange={handleChange} maxLength={50} className="w-full bg-white border-[3px] border-black p-3 font-bold focus:bg-[#39FF14]/20 focus:outline-none text-lg" /></div>
                                    <div><label className="block text-xs font-black mb-1 text-gray-500 flex items-center">PEN NAME <CharCounter current={formData.pen_name?.length || 0} max={50} /></label><input type="text" name="pen_name" value={formData.pen_name} onChange={handleChange} maxLength={50} className="w-full bg-white border-[3px] border-black p-3 font-bold focus:bg-[#39FF14]/20 focus:outline-none text-lg" /></div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div><label className="block text-xs font-black mb-1 text-gray-500">DATE OF BIRTH</label><input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full bg-white border-[3px] border-black p-3 font-bold focus:bg-[#39FF14]/20 focus:outline-none" /></div>
                                        <div><label className="block text-xs font-black mb-1 text-gray-500 flex items-center">LOCATION <CharCounter current={formData.location?.length || 0} max={80} /></label><input type="text" name="location" value={formData.location} onChange={handleChange} maxLength={80} placeholder="City, Country" className="w-full bg-white border-[3px] border-black p-3 font-bold focus:bg-[#39FF14]/20 focus:outline-none" /></div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Tags & Branding */}
                            <div className="bg-gray-50 p-4 sm:p-6 border-[2px] sm:border-[3px] border-black space-y-4 md:space-y-6">
                                <h3 className="text-lg md:text-xl font-black uppercase border-b-[2px] md:border-b-2 border-black pb-2">Branding & Tags</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                    <div>
                                        <label className="block text-[10px] md:text-xs font-black mb-1 text-gray-500 uppercase tracking-widest flex items-center">PRIMARY THEME / GENRE <CharCounter current={formData.theme?.length || 0} max={60} /></label>
                                        <input type="text" name="theme" value={formData.theme} onChange={handleChange} maxLength={60} placeholder="e.g. Scifi Romance" className="w-full bg-white border-[2px] sm:border-[3px] border-black p-3 font-bold focus:bg-[#39FF14]/20 focus:outline-none text-sm md:text-base" />
                                    </div>

                                    {/* Tagging System */}
                                    <div>
                                        <label className="block text-[10px] md:text-xs font-black mb-1 text-gray-500 uppercase tracking-widest">AUTHOR TAGS (Max 3, 15 chars each)</label>
                                        <div className="flex gap-2 mb-3">
                                            <input
                                                type="text" value={tagInput}
                                                onChange={(e) => setTagInput(e.target.value.substring(0, 15))}
                                                onKeyDown={handleAddTag}
                                                disabled={formData.tags.length >= 3}
                                                placeholder={formData.tags.length >= 3 ? "Limit reached" : "Add a tag..."}
                                                className="flex-grow bg-white border-[2px] sm:border-[3px] border-black px-3 py-2 font-bold focus:outline-none disabled:bg-gray-200 uppercase text-xs md:text-sm"
                                            />
                                            <button
                                                onClick={handleAddTag}
                                                disabled={formData.tags.length >= 3 || !tagInput.trim()}
                                                className="bg-black text-[#FFC700] px-4 border-[2px] sm:border-[3px] border-black font-black disabled:opacity-50 hover:bg-[#FFC700] hover:text-black transition-colors text-xs md:text-sm"
                                            >
                                                ADD
                                            </button>
                                        </div>
                                        {/* Tag Display */}
                                        <div className="flex flex-wrap gap-2">
                                            {formData.tags.map((tag: string, index: number) => (
                                                <span key={index} className="bg-[#FFC700] border-[2px] border-black px-2 py-1 text-[10px] md:text-xs font-black flex items-center gap-1 shadow-[2px_2px_0_0_#000]">
                                                    {tag}
                                                    <button onClick={() => handleRemoveTag(index)} className="hover:text-red-600 bg-white border border-black rounded-full ml-1"><X size={10} /></button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2.5: Current Project (WIP) */}
                            <div className="bg-[#FF4F00]/5 p-4 sm:p-6 border-[2px] sm:border-[3px] border-black space-y-3 md:space-y-4">
                                <h3 className="text-lg md:text-xl font-black uppercase border-b-[2px] md:border-b-2 border-[#FF4F00] pb-2 text-[#FF4F00]">Current Project (WIP)</h3>
                                <p className="text-[10px] md:text-xs font-bold text-gray-500 mb-2 uppercase tracking-tight">Share what you're currently writing for the hype progress bar.</p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                    <div className="md:col-span-1">
                                        <label className="block text-[10px] md:text-xs font-black mb-1 text-gray-500 uppercase tracking-widest flex items-center">PROJECT TITLE <CharCounter current={formData.wip_title?.length || 0} max={80} /></label>
                                        <input type="text" name="wip_title" value={formData.wip_title || ''} onChange={handleChange} maxLength={80} placeholder="e.g. Project Obsidian" className="w-full bg-white border-[2px] sm:border-[3px] border-black p-3 font-bold focus:bg-[#39FF14]/20 focus:outline-none text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] md:text-xs font-black mb-1 text-gray-500 uppercase tracking-widest">TARGET WORD COUNT</label>
                                        <input type="number" name="wip_target" value={formData.wip_target || ''} onChange={handleChange} placeholder="e.g. 80000" className="w-full bg-white border-[2px] sm:border-[3px] border-black p-3 font-bold focus:bg-[#39FF14]/20 focus:outline-none text-sm" min="0" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] md:text-xs font-black mb-1 text-gray-500 uppercase tracking-widest">CURRENT COUNT</label>
                                        <input type="number" name="wip_current" value={formData.wip_current || ''} onChange={handleChange} placeholder="e.g. 15000" className="w-full bg-white border-[2px] sm:border-[3px] border-black p-3 font-bold focus:bg-[#39FF14]/20 focus:outline-none text-sm" min="0" />
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Comms & Bio */}
                            <div className="bg-gray-50 p-4 sm:p-6 border-[2px] sm:border-[3px] border-black space-y-4 md:space-y-6">
                                <h3 className="text-lg md:text-xl font-black uppercase border-b-[2px] md:border-b-2 border-black pb-2">Communications & Bio</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                    <div><label className="block text-[10px] md:text-xs font-black mb-1 text-gray-500 uppercase tracking-widest flex items-center">EMAIL ADDRESS <CharCounter current={formData.email?.length || 0} max={150} /></label><input type="email" name="email" value={formData.email} onChange={handleChange} maxLength={150} className="w-full bg-white border-[2px] sm:border-[3px] border-black p-3 font-bold focus:bg-[#39FF14]/20 focus:outline-none text-xs md:text-sm" /></div>
                                    <div><label className="block text-[10px] md:text-xs font-black mb-1 text-gray-500 uppercase tracking-widest flex items-center">INSTAGRAM URL <CharCounter current={formData.instagram?.length || 0} max={150} /></label><input type="url" name="instagram" value={formData.instagram} onChange={handleChange} maxLength={150} className="w-full bg-white border-[2px] sm:border-[3px] border-black p-3 font-bold focus:bg-[#39FF14]/20 focus:outline-none text-xs md:text-sm" /></div>
                                    <div><label className="block text-[10px] md:text-xs font-black mb-1 text-gray-500 uppercase tracking-widest flex items-center">PERSONAL WEBSITE <CharCounter current={formData.website?.length || 0} max={150} /></label><input type="url" name="website" value={formData.website} onChange={handleChange} maxLength={150} className="w-full bg-white border-[2px] sm:border-[3px] border-black p-3 font-bold focus:bg-[#39FF14]/20 focus:outline-none text-xs md:text-sm" /></div>
                                </div>

                                <div><label className="block text-[10px] md:text-xs font-black bg-black text-white inline-flex items-center px-2 py-0.5 mb-2 tracking-widest uppercase mt-2">ABOUT THE AUTHOR <CharCounter current={formData.bio?.length || 0} max={800} /></label>
                                    <textarea name="bio" value={formData.bio} onChange={handleChange} maxLength={800} className="w-full bg-white border-[2px] sm:border-[3px] border-black p-4 font-medium focus:bg-[#39FF14]/20 focus:outline-none min-h-[120px] resize-y leading-relaxed text-sm md:text-base cursor-text" />
                                </div>
                                <div className="pt-2"><label className="block text-[10px] md:text-xs font-black bg-gray-200 text-black border border-black inline-flex items-center px-2 py-0.5 mb-2 tracking-widest uppercase">Other Details <CharCounter current={formData.other_details?.length || 0} max={100} /></label>
                                    <input type="text" name="other_details" value={formData.other_details} onChange={handleChange} maxLength={100} className="w-full bg-white border-[2px] sm:border-[3px] border-black p-3 font-bold focus:bg-[#39FF14]/20 focus:outline-none text-sm" />
                                </div>
                            </div>

                            {/* Section 4: Collaborations & Contact */}
                            <div className="bg-[#39FF14]/5 p-4 sm:p-6 border-[2px] sm:border-[3px] border-black space-y-3 md:space-y-4 md:col-span-1 xl:col-span-3">
                                <h3 className="text-lg md:text-xl font-black uppercase border-b-[2px] md:border-b-2 border-black pb-2">Collaborations & Inquiries</h3>
                                <p className="text-[10px] md:text-xs font-bold text-gray-500 mb-2 uppercase tracking-tight">Set up a specific contact block on your portfolio for publishers or collaborators.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div>
                                        <label className="block text-[10px] md:text-xs font-black mb-1 text-gray-500 uppercase tracking-widest flex items-center">COLLAB PITCH <CharCounter current={formData.collab_prompt?.length || 0} max={150} /></label>
                                        <input type="text" name="collab_prompt" value={formData.collab_prompt || ''} onChange={handleChange} maxLength={150} placeholder="e.g. Open for anthologies etc." className="w-full bg-white border-[2px] sm:border-[3px] border-black p-3 font-bold focus:bg-[#39FF14]/20 focus:outline-none text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] md:text-xs font-black mb-1 text-gray-500 uppercase tracking-widest flex items-center">COLLAB EMAIL <CharCounter current={formData.collab_email?.length || 0} max={150} /></label>
                                        <input type="email" name="collab_email" value={formData.collab_email || ''} onChange={handleChange} maxLength={150} placeholder="Leave blank to use main email" className="w-full bg-white border-[2px] sm:border-[3px] border-black p-3 font-bold focus:bg-[#39FF14]/20 focus:outline-none text-sm" />
                                    </div>
                                </div>
                            </div>

                            {/* Section 5: Experience Timeline */}
                            <div className="bg-gray-100 p-4 sm:p-6 border-[2px] sm:border-[3px] border-black space-y-4 md:space-y-6 md:col-span-1 xl:col-span-3 pb-8">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-[2px] border-black pb-3 gap-4">
                                    <h3 className="text-lg md:text-xl font-black uppercase">Professional Timeline</h3>
                                    <button onClick={addExperience} className="w-full sm:w-auto bg-black text-[#FFC700] hover:bg-[#FFC700] hover:text-black border-[2px] sm:border-[3px] border-black font-black uppercase text-[10px] md:text-xs px-4 py-2 flex items-center justify-center gap-2 transition-all shadow-[3px_3px_0_0_#000] active:shadow-none active:translate-y-0.5">
                                        <Plus size={14} /> ADD ENTRY
                                    </button>
                                </div>

                                <div className="space-y-4 md:space-y-6">
                                    {(formData.experiences || []).map((exp: any, index: number) => (
                                        <div key={exp.id} className="border-[2px] sm:border-[3px] border-black bg-white p-3 sm:p-4 relative flex flex-col gap-3 sm:gap-4 shadow-[4px_4px_0_0_#000] group">
                                            <div className="absolute top-2 right-2 flex gap-1 z-10">
                                                <button
                                                    onClick={() => updateExperience(exp.id, 'is_public', !exp.is_public)}
                                                    className={`p-1 border-[1.5px] border-black font-black text-[8px] uppercase flex items-center gap-1 transition-colors ${exp.is_public ? 'bg-[#39FF14] text-black shadow-[1px_1px_0_0_#000]' : 'bg-gray-200 text-gray-500'}`}
                                                >
                                                    {exp.is_public ? <Eye size={10} /> : <EyeOff size={10} />}
                                                    <span className="hidden xs:inline">{exp.is_public ? 'PUBLIC' : 'PRIVATE'}</span>
                                                </button>
                                                <button onClick={() => removeExperience(exp.id)} className="bg-red-500 text-white p-1 border-[1.5px] border-black hover:bg-black hover:text-red-500 transition-colors shadow-[1px_1px_0_0_#000]">
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>

                                            <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-2">
                                                <div className="w-full md:w-32 flex-shrink-0">
                                                    <label className="block text-[9px] font-black tracking-widest text-gray-400 mb-1 leading-tight uppercase">Period</label>
                                                    <input type="text" value={exp.year} onChange={(e) => updateExperience(exp.id, 'year', e.target.value)} placeholder="e.g. 2023" className="w-full bg-gray-50 border-[1.5px] border-black p-2 font-bold text-xs ring-[#FFC700] focus:ring-2 focus:outline-none" />
                                                </div>
                                                <div className="flex-grow">
                                                    <label className="block text-[9px] font-black tracking-widest text-gray-400 mb-1 leading-tight uppercase">Role / Achievement</label>
                                                    <input type="text" value={exp.title} onChange={(e) => updateExperience(exp.id, 'title', e.target.value)} placeholder="e.g. Lead Writer" className="w-full bg-gray-50 border-[1.5px] border-black p-2 font-bold text-xs ring-[#FFC700] focus:ring-2 focus:outline-none" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[9px] font-black tracking-widest text-gray-400 mb-1 leading-tight uppercase">Brief Intel</label>
                                                <textarea value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} placeholder="What did you achieve here?" className="w-full bg-gray-50 border-[1.5px] border-black p-2 font-medium min-h-[50px] resize-y text-xs focus:ring-2 ring-[#FFC700] focus:outline-none" />
                                            </div>
                                        </div>
                                    ))}
                                    {(!formData.experiences || formData.experiences.length === 0) && (
                                        <div className="border-[2px] border-dashed border-gray-300 p-8 text-center text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                            STATUS: TIMELINE EMPTY
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    )}

                    {/* TAB: HERO WRITING SUITE */}
                    {activeTab === 'hero' && (
                        <div className="bg-white border-[3px] md:border-[4px] border-black p-4 md:p-6 lg:p-10 shadow-[6px_6px_0_0_#39FF14] md:shadow-[12px_12px_0_0_#39FF14] flex flex-col min-h-[600px] md:min-h-[700px] relative animate-in fade-in slide-in-from-bottom-4">
                            <div className="hidden md:block absolute top-0 right-0 bg-black text-[#39FF14] text-[10px] md:text-xs font-black px-4 py-2 tracking-widest uppercase border-b-[3px] border-l-[3px] border-black">
                                MAIN FEATURED EXCERPT
                            </div>

                            <p className="font-bold text-gray-500 uppercase tracking-widest text-[10px] md:text-xs mb-4 md:mb-8 max-w-lg mt-2 md:mt-6 leading-tight">
                                This is the large text block that appears right below the author header. Use it for their best hook or current project excerpt.
                            </p>

                            <div className="space-y-4 md:space-y-6 flex flex-col flex-grow">
                                <div>
                                    <label className="block text-[10px] md:text-xs font-black text-gray-400 mb-1 md:mb-2 uppercase tracking-widest flex items-center">Featured Title <CharCounter current={formData.writing_title?.length || 0} max={60} /></label>
                                    <input
                                        type="text" name="writing_title" value={formData.writing_title} onChange={handleChange} maxLength={60}
                                        className="w-full bg-transparent text-2xl sm:text-3xl md:text-6xl font-black uppercase focus:outline-none border-b-[3px] border-dashed border-gray-200 focus:border-[#FF4F00] pb-2 transition-colors placeholder:text-gray-100"
                                        placeholder="ENTER MAIN TITLE"
                                    />
                                </div>
                                <div className="flex-grow flex flex-col relative mt-4 h-[400px] md:h-[500px] lg:h-[600px]">
                                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #000 31px, #000 32px)', backgroundPositionY: '8px' }} />
                                    <div className="relative z-10 w-full h-full pb-8">
                                        <BrutalistEditor
                                            value={formData.writing_content}
                                            onChange={(val) => {
                                                setFormData({ ...formData, writing_content: val });
                                                setIsSaved(false);
                                            }}
                                            placeholder="Start typing the masterpiece..."
                                            maxWords={80}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: THE LIBRARY (BOOKS) */}
                    {activeTab === 'library' && (
                        <div className="bg-[#FFFDF7] border-[3px] md:border-[4px] border-black p-4 md:p-6 lg:p-10 shadow-[6px_6px_0_0_#00A3FF] md:shadow-[12px_12px_0_0_#00A3FF] animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-[3px] md:border-b-[4px] border-black pb-4 md:pb-6 gap-4">
                                <div>
                                    <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-black flex items-center gap-2 md:gap-3">
                                        <BookOpen size={20} className="text-[#39FF14] md:w-8 md:h-8" /> THE LIBRARY
                                    </h2>
                                    <p className="font-bold text-gray-500 uppercase tracking-widest text-[9px] md:text-xs mt-1 md:mt-2">Manage your published books and anthologies</p>
                                </div>
                                <button
                                    onClick={addBook}
                                    disabled={formData.books && formData.books.length >= 4}
                                    className={`w-full md:w-auto justify-center border-[2.5px] md:border-[3px] border-black font-black uppercase text-[10px] md:text-sm px-4 md:px-6 py-2.5 md:py-3 flex items-center gap-2 transition-all shadow-[3px_3px_0_0_#000] active:shadow-none active:translate-y-0.5 ${formData.books && formData.books.length >= 4 ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400' : 'bg-[#39FF14] text-black hover:bg-black hover:text-[#39FF14]'}`}
                                >
                                    <Plus size={16} /> {formData.books && formData.books.length >= 4 ? 'MAX 4 BOOKS' : 'ADD BOOK'}
                                </button>
                            </div>

                            <div className="space-y-6 md:space-y-8">
                                {(formData.books || []).map((book: any, index: number) => (
                                    <div key={book.id} className="border-[3px] md:border-[4px] border-black bg-white p-4 md:p-6 relative flex flex-col md:flex-row gap-6 md:gap-8 shadow-[4px_4px_0_0_#000] group">
                                        <div className="absolute top-2 right-2 flex gap-1 md:gap-2 z-10">
                                            <button
                                                onClick={() => updateBook(book.id, 'is_public', !book.is_public)}
                                                className={`p-1.5 border-[2px] border-black font-black text-[8px] md:text-xs uppercase flex items-center gap-1 transition-colors ${book.is_public ? 'bg-[#39FF14] text-black shadow-[1px_1px_0_0_#000]' : 'bg-gray-200 text-gray-500'}`}
                                            >
                                                {book.is_public ? <Eye size={12} /> : <EyeOff size={12} />}
                                                <span className="hidden sm:inline">{book.is_public ? 'VISIBLE' : 'HIDDEN'}</span>
                                            </button>
                                            <button onClick={() => removeBook(book.id)} className="bg-red-500 text-white p-1.5 border-[2px] border-black hover:bg-black transition-colors shadow-[1px_1px_0_0_#000]">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>

                                        {/* Cover Image Upload */}
                                        <div className="w-full md:w-48 h-64 border-[4px] border-dashed border-gray-400 bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden flex-shrink-0 cursor-pointer mt-8 md:mt-0">
                                            <input type="file" accept="image/*" onChange={(e) => handleBookImageUpload(book.id, e)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                            {book.cover_image ? (
                                                <img src={book.cover_image} alt="Cover" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-center px-4">
                                                    <BookOpen size={32} className="text-gray-300 mx-auto mb-2" />
                                                    <span className="text-xs text-gray-400 font-black">UPLOAD COVER<br />(Optional)</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-grow space-y-4">
                                            <div>
                                                <label className="block text-[10px] font-black tracking-widest text-gray-400 mb-1">ROLE</label>
                                                <select
                                                    value={book.role || "Author"}
                                                    onChange={(e) => updateBook(book.id, 'role', e.target.value)}
                                                    className="w-full bg-gray-100 md:w-48 text-black font-black p-3 border-[3px] border-black uppercase cursor-pointer text-sm"
                                                >
                                                    <option>Author</option>
                                                    <option>Co-Author</option>
                                                    <option>Contributor</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black tracking-widest text-gray-400 mb-1">BOOK TITLE</label>
                                                <input type="text" value={book.title} onChange={(e) => updateBook(book.id, 'title', e.target.value)} placeholder="BOOK TITLE" className="w-full bg-gray-100 border-[3px] border-black p-3 font-black text-2xl" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black tracking-widest text-gray-400 mb-1">YEAR PUBLISHED</label>
                                                <input type="text" value={book.year} onChange={(e) => updateBook(book.id, 'year', e.target.value)} placeholder="YYYY" className="w-32 bg-gray-100 border-[3px] border-black p-3 font-bold text-center" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black tracking-widest text-gray-400 mb-1">SHORT DESCRIPTION</label>
                                                <textarea value={book.description} onChange={(e) => updateBook(book.id, 'description', e.target.value)} placeholder="What is this book about?" className="w-full bg-gray-100 border-[3px] border-black p-3 font-medium text-base h-24 resize-none leading-relaxed" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black tracking-widest text-gray-400 mb-1">PURCHASE / INFO LINK</label>
                                                <input type="url" value={book.link} onChange={(e) => updateBook(book.id, 'link', e.target.value)} placeholder="https://..." className="w-full bg-gray-100 border-[3px] border-black p-3 font-medium text-blue-600" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(!formData.books || formData.books.length === 0) && (
                                    <div className="border-[4px] border-dashed border-gray-400 p-12 text-center text-gray-500 font-bold uppercase text-lg">
                                        No books added to the library yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* TAB: THE ARCHIVE (WRITINGS) */}
                    {activeTab === 'archive' && (
                        <div className="bg-[#FFFDF7] border-[3px] md:border-[4px] border-black p-4 md:p-6 lg:p-10 shadow-[6px_6px_0_0_#FFC700] md:shadow-[12px_12px_0_0_#FFC700] animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-[3px] md:border-b-[4px] border-black pb-4 md:pb-6 gap-4">
                                <div>
                                    <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-black flex items-center gap-2 md:gap-3">
                                        <FileText size={20} className="text-[#FFC700] md:w-8 md:h-8" /> THE ARCHIVE
                                    </h2>
                                    <p className="font-bold text-gray-500 uppercase tracking-widest text-[9px] md:text-xs mt-1 md:mt-2">Manage short stories, poems, and articles</p>
                                </div>
                                <button onClick={addPiece} className="w-full md:w-auto justify-center bg-[#FFC700] text-black border-[2.5px] md:border-[3px] border-black font-black uppercase text-[10px] md:text-sm px-4 md:px-6 py-2.5 md:py-3 flex items-center gap-2 hover:bg-black hover:text-[#FFC700] transition-all shadow-[3px_3px_0_0_#000] active:shadow-none active:translate-y-0.5">
                                    <Plus size={16} /> ADD PIECE
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {(formData.writing_pieces || []).map((piece: any, index: number) => (
                                    <div key={piece.id} onClick={() => setEditingPieceId(piece.id)} className="border-[3px] md:border-[4px] border-black bg-white p-4 md:p-6 relative flex flex-col gap-2 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] transition-all cursor-pointer group">

                                        <div className="flex justify-between items-start mb-2">
                                            <span className="bg-black text-[#FFC700] px-2 py-0.5 text-[8px] md:text-[10px] font-black uppercase tracking-widest">{piece.type}</span>
                                            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    onClick={() => updatePiece(piece.id, 'is_public', !piece.is_public)}
                                                    className={`p-1 border-[1.5px] border-black font-black text-[8px] uppercase flex items-center gap-1 transition-colors ${piece.is_public ? 'bg-[#39FF14] text-black shadow-[1px_1px_0_0_#000]' : 'bg-gray-200 text-gray-500'}`}
                                                >
                                                    {piece.is_public ? <Eye size={10} /> : <EyeOff size={10} />}
                                                    <span className="hidden sm:inline">{piece.is_public ? 'PUBLIC' : 'DRAFT'}</span>
                                                </button>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-black uppercase leading-tight line-clamp-2">{piece.title || "UNTITLED PIECE"}</h3>
                                        <p className="text-xs text-gray-500 font-medium line-clamp-3 mt-2">{piece.content ? piece.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' : 'No content added yet.'}</p>

                                        <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-300 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs font-black text-[#FF4F00] uppercase tracking-widest flex items-center gap-1">EDIT <FileText size={12} /></span>
                                        </div>
                                    </div>
                                ))}
                                {(!formData.writing_pieces || formData.writing_pieces.length === 0) && (
                                    <div className="col-span-full border-[4px] border-dashed border-gray-400 p-12 text-center text-gray-500 font-bold uppercase text-lg">
                                        The archive is empty. Add a piece to begin.
                                    </div>
                                )}
                            </div>

                            {/* FULLSCREEN PIECE EDIT MODAL */}
                            {editingPieceId && (
                                <div className="fixed inset-0 z-[110] bg-[#FFFDF7] flex flex-col border-[4px] md:border-[8px] border-black animate-in slide-in-from-bottom-full overflow-hidden w-full h-[100dvh]">
                                    {(() => {
                                        const currentPiece = formData.writing_pieces.find((p: any) => p.id === editingPieceId);
                                        if (!currentPiece) return null;
                                        return (
                                            <>
                                                <div className="bg-white border-b-[3px] md:border-b-[4px] border-black px-2 md:px-4 py-2.5 md:py-3 flex justify-between items-center z-10 shadow-sm flex-shrink-0">
                                                    <div className="flex items-center gap-4">
                                                        <button onClick={() => setEditingPieceId(null)} className="text-black hover:text-[#FF4F00] transition-colors p-2 bg-gray-100 border-[2px] border-black">
                                                            <X size={20} />
                                                        </button>
                                                        <h3 className="font-black uppercase tracking-widest text-xs md:text-base line-clamp-1 w-32 sm:w-auto">EDITING: {currentPiece.title || "UNTITLED"}</h3>
                                                    </div>
                                                    <button onClick={() => removePiece(currentPiece.id)} className="text-red-500 hover:text-white hover:bg-red-500 border-[2px] border-red-500 px-2 md:px-3 py-1 font-black text-[10px] md:text-xs uppercase flex items-center gap-1 transition-colors flex-shrink-0">
                                                        <Trash2 size={14} /> <span className="hidden md:inline">DELETE</span>
                                                    </button>
                                                </div>

                                                <div className="flex-1 overflow-hidden p-3 md:p-8 bg-gray-50">
                                                    <div className="max-w-4xl mx-auto flex flex-col h-full space-y-4 md:space-y-6">
                                                        {/* Metadata Row */}
                                                        <div className="flex flex-col md:flex-row gap-4 flex-shrink-0">
                                                            <div className="w-full md:w-64 flex-shrink-0">
                                                                <label className="block text-xs font-black tracking-widest text-gray-500 mb-1">PIECE TYPE</label>
                                                                <select
                                                                    value={currentPiece.type}
                                                                    onChange={(e) => updatePiece(currentPiece.id, 'type', e.target.value)}
                                                                    className="w-full bg-[#FFC700] text-black font-black p-4 border-[4px] border-black uppercase cursor-pointer text-sm"
                                                                >
                                                                    <option>Short Story</option>
                                                                    <option>Poem</option>
                                                                    <option>Article</option>
                                                                    <option>Excerpt</option>
                                                                    <option>Review</option>
                                                                </select>
                                                            </div>
                                                            <div className="flex-grow">
                                                                <label className="block text-xs font-black tracking-widest text-gray-500 mb-1">TITLE</label>
                                                                <input
                                                                    type="text" value={currentPiece.title}
                                                                    onChange={(e) => updatePiece(currentPiece.id, 'title', e.target.value)}
                                                                    placeholder="TITLE"
                                                                    className="w-full bg-white border-[4px] border-black p-4 font-black text-2xl"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Editor Box - Restricted to remaining space */}
                                                        <div className="border-[3px] md:border-[4px] border-black bg-white flex flex-col flex-1 min-h-0">
                                                            <label className="block text-[10px] md:text-xs font-black tracking-widest bg-black text-white px-3 md:px-4 py-2 uppercase border-b-[3px] md:border-[4px] border-black flex-shrink-0">FULL CONTENT EDITOR</label>
                                                            <div className="flex-1 relative overflow-hidden">
                                                                <BrutalistEditor
                                                                    value={currentPiece.content}
                                                                    onChange={(val) => updatePiece(currentPiece.id, 'content', val)}
                                                                    placeholder="Write or paste your formatted piece here..."
                                                                    minHeight="100%"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                            )}
                        </div>
                    )}

                    {/* TAB: AWARDS & PRESS */}
                    {activeTab === 'awards' && (
                        <div className="bg-[#FFFDF7] border-[3px] md:border-[4px] border-black p-4 md:p-6 lg:p-10 shadow-[6px_6px_0_0_#9D00FF] md:shadow-[12px_12px_0_0_#9D00FF] animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-[3px] md:border-b-[4px] border-black pb-4 md:pb-6 gap-4">
                                <div>
                                    <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-black flex items-center gap-2 md:gap-3">
                                        <Award size={20} className="text-[#9D00FF] md:w-8 md:h-8" /> AWARDS & PRESS
                                    </h2>
                                    <p className="font-bold text-gray-500 uppercase tracking-widest text-[9px] md:text-xs mt-1 md:mt-2">List author achievements, awards, and notable mentions</p>
                                </div>
                                <button onClick={addAward} className="w-full md:w-auto justify-center bg-[#9D00FF] text-white border-[2.5px] md:border-[3px] border-black font-black uppercase text-[10px] md:text-sm px-4 md:px-6 py-2.5 md:py-3 flex items-center gap-2 hover:bg-black hover:text-[#9D00FF] transition-all shadow-[3px_3px_0_0_#000] active:shadow-none active:translate-y-0.5">
                                    <Plus size={16} /> ADD AWARD
                                </button>
                            </div>

                            <div className="space-y-6 md:space-y-8">
                                {(formData.awards || []).map((award: any, index: number) => (
                                    <div key={award.id} className="border-[3px] md:border-[4px] border-black bg-white p-4 md:p-6 relative flex flex-col gap-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] group">

                                        <div className="absolute top-2 right-2 flex gap-1 md:gap-2 z-10">
                                            <button onClick={() => removeAward(award.id)} className="bg-red-500 text-white p-1.5 border-[2px] border-black hover:bg-black transition-colors shadow-[1px_1px_0_0_#000]">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[90%]">
                                            <div className="lg:col-span-2">
                                                <label className="block text-[10px] font-black tracking-widest text-gray-400 mb-1">AWARD / MENTION TITLE</label>
                                                <input type="text" value={award.title} onChange={(e) => updateAward(award.id, 'title', e.target.value)} placeholder="e.g. Best Sci-Fi Novel 2024" className="w-full bg-gray-100 border-[3px] border-black p-3 font-black text-xl" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black tracking-widest text-gray-400 mb-1">YEAR</label>
                                                <input type="text" value={award.year} onChange={(e) => updateAward(award.id, 'year', e.target.value)} placeholder="YYYY" className="w-full bg-gray-100 border-[3px] border-black p-3 font-bold text-center" />
                                            </div>
                                            <div className="lg:col-span-2">
                                                <label className="block text-[10px] font-black tracking-widest text-gray-400 mb-1">ORGANIZATION / PUBLICATION</label>
                                                <input type="text" value={award.organization} onChange={(e) => updateAward(award.id, 'organization', e.target.value)} placeholder="e.g. The Nebula Awards" className="w-full bg-gray-100 border-[3px] border-black p-3 font-bold" />
                                            </div>
                                            <div className="lg:col-span-3">
                                                <label className="block text-[10px] font-black tracking-widest text-gray-400 mb-1">SHORT DESCRIPTION (Optional)</label>
                                                <textarea value={award.description} onChange={(e) => updateAward(award.id, 'description', e.target.value)} placeholder="A brief note about this achievement..." className="w-full bg-gray-100 border-[3px] border-black p-3 font-medium h-20 resize-none" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(!formData.awards || formData.awards.length === 0) && (
                                    <div className="border-[4px] border-dashed border-gray-400 p-12 text-center text-gray-500 font-bold uppercase text-lg">
                                        No awards or mentions added yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

export default AuthorSiteAdmin;
