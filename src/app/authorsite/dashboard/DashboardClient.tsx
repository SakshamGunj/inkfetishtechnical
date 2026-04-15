'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, BookOpen, FileText, UserCircle, Type, Eye, EyeOff, X, Award, Copy, Check, Headset } from 'lucide-react';
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
            const publicUrlPath = authorUsername ? `/author/${authorUsername}` : `/author/${user.uid}`;
            const defaultWebsite = typeof window !== 'undefined' ? `${window.location.origin}${publicUrlPath}` : '';

            try {
                const docRef = doc(db, 'author_portfolios', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const parsed = docSnap.data();
                    setFormData({
                        ...formData,
                        ...parsed,
                        tags: parsed.tags || [],
                        awards: parsed.awards || [],
                        experiences: parsed.experiences || [],
                        website: parsed.website || defaultWebsite,
                        location: parsed.location || "",
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
            toast({ title: "PROFILE SAVED", description: "All changes are now live." });
            setTimeout(() => setIsSaved(false), 3000);
        } catch (err: any) {
            console.error("Error saving portfolio:", err);
            toast({ title: "SAVE FAILED", description: err.message, variant: "destructive" });
        }
    };

    const handleImageUpload = async (file: File) => {
        if (!file || !user) return;
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

    // Helper functions (Tags, Books, Pieces, Awards) - simplified for migration
    const handleAddTag = (e: any) => {
        if (e.key && e.key !== 'Enter') return;
        const trimmed = tagInput.trim().toUpperCase();
        if (trimmed && formData.tags.length < 3 && !formData.tags.includes(trimmed)) {
            setFormData({ ...formData, tags: [...formData.tags, trimmed] });
            setTagInput('');
            setIsSaved(false);
        }
    };

    if (authLoading) return <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center font-mono font-black animate-pulse">LOADING...</div>;

    return (
        <div className="min-h-screen bg-[#FFFDF7] p-2 lg:p-4 font-mono selection:bg-[#39FF14] selection:text-black">
            {/* Command Bar */}
            <div className="max-w-7xl mx-auto w-full bg-black text-white py-3 px-6 flex items-center justify-between text-xs md:text-sm font-bold uppercase shadow-[6px_6px_0_0_#39FF14] mb-8 border-[3px] border-black sticky top-4 z-50">
                <span className="tracking-widest text-[#39FF14] md:text-lg">YOUR DASHBOARD</span>
                <div className="flex items-center gap-4">
                    <button onClick={() => handleSave()} className="bg-[#39FF14] text-black font-black px-6 py-2 border-[3px] border-black hover:bg-white transition-all shadow-[4px_4px_0_0_#000] active:shadow-none translate-y-[-2px] active:translate-y-0">
                        SAVE PROFILE
                    </button>
                    <Link href={authorUsername ? `/author/${authorUsername}` : `/author/${user?.uid}`} target="_blank" className="hover:text-[#FF4F00] transition-colors underline decoration-2 underline-offset-4 font-black">
                        SEE LIVE PROFILE ↗
                    </Link>
                </div>
            </div>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32">
                {/* Sidebar */}
                <div className="lg:col-span-3 space-y-4">
                    {[
                        { id: 'basic', label: 'My Info', icon: <UserCircle size={20} />, color: '#FFC700' },
                        { id: 'hero', label: 'Featured Writing', icon: <Type size={20} />, color: '#39FF14' },
                        { id: 'library', label: 'My Books', icon: <BookOpen size={20} />, color: '#00A3FF' },
                        { id: 'archive', label: 'My Stories', icon: <FileText size={20} />, color: '#FF4F00' },
                        { id: 'awards', label: 'My Awards', icon: <Award size={20} />, color: '#9D00FF' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full p-4 border-[3px] border-black font-black uppercase tracking-wider text-sm flex items-center gap-3 transition-all ${activeTab === tab.id ? `shadow-[6px_6px_0_0_#000] translate-x-1 -translate-y-1` : 'bg-white hover:bg-gray-50'}`}
                            style={{ backgroundColor: activeTab === tab.id ? tab.color : 'white' }}
                        >
                            {tab.icon} {tab.label}
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
                                        <label className="block text-xs font-black bg-black text-white px-2 py-1 uppercase w-fit">Profile Photo</label>
                                        <div className="w-32 h-32 border-4 border-black bg-gray-50 shadow-[4px_4px_0_0_#000] relative group">
                                            {formData.profile_image ? (
                                                <img src={formData.profile_image} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="h-full flex items-center justify-center text-gray-300 font-black">NO PHOTO</div>
                                            )}
                                        </div>
                                        <input type="file" onChange={handleFileSelect} className="hidden" id="dash-avatar-up" />
                                        <label htmlFor="dash-avatar-up" className="inline-block bg-[#FFC700] border-2 border-black px-4 py-2 text-xs font-black uppercase cursor-pointer hover:bg-black hover:text-[#FFC700] transition-all">UPLOAD PHOTO</label>
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
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-black text-gray-400 uppercase">My Bio</label>
                                    <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full h-32 bg-white border-2 border-black p-4 font-medium focus:bg-[#39FF14]/5 outline-none resize-none" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'hero' && (
                        <div className="bg-white border-[4px] border-black p-8 shadow-[12px_12px_0_0_#39FF14] min-h-[600px] flex flex-col">
                            <h2 className="text-3xl font-black uppercase border-b-4 border-black pb-4 text-[#39FF14] bg-black px-4 -mx-8 -mt-8 mb-8">FEATURED WRITING</h2>
                            <div className="space-y-6 flex-grow flex flex-col">
                                <input
                                    type="text" name="writing_title" value={formData.writing_title} onChange={handleChange}
                                    className="text-4xl md:text-6xl font-black uppercase bg-transparent border-b-4 border-black border-dashed outline-none pb-2 w-full"
                                    placeholder="YOUR TITLE"
                                />
                                <div className="flex-grow border-2 border-black p-4 bg-gray-50/50">
                                    <BrutalistEditor
                                        value={formData.writing_content}
                                        onChange={(val) => setFormData({ ...formData, writing_content: val })}
                                        placeholder="Write your story here..."
                                        maxWords={100}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Placeholder for other tabs */}
                    {['library', 'archive', 'awards'].includes(activeTab) && (
                        <div className="bg-gray-100 border-[4px] border-black p-12 text-center text-gray-400 font-bold uppercase animate-pulse">
                            COMING SOON...
                            <p className="text-xs mt-4">Module {activeTab} is being updated.</p>
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
