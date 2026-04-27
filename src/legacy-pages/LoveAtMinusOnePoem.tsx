import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Share2 } from "lucide-react";
import { toast } from "sonner";
import submissionsData from "@/data/anthology_submissions.json";

interface Poem {
    content: string;
    createdAt?: any;
    title?: string;
    author?: string;
}

const LoveAtMinusOnePoem = ({ id: propId }: { id?: string }) => {
    let routeId: string | undefined;
    try {
        const params = useParams();
        routeId = params.id;
    } catch (e) {
        // Fallback for Next.js environment where react-router-dom context is missing
        routeId = undefined;
    }
    const id = propId || routeId;
    const [poem, setPoem] = useState<Poem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPoem = async () => {
            if (!id) return;

            try {
                // 1. Try Firestore first (for new submissions)
                const docRef = doc(db, "loveatminusone_poems", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPoem(docSnap.data() as Poem);
                } else {
                    // 2. Fallback to local JSON (for legacy submissions)
                    const legacyPoem = (submissionsData as any[]).find(s => s.id === id);
                    if (legacyPoem) {
                        setPoem({
                            content: legacyPoem.poem1_content,
                            title: legacyPoem.poem1_title,
                            author: legacyPoem.is_pen_name ? legacyPoem.book_name : legacyPoem.real_name
                        });
                    } else {
                        setError("Poem not found");
                    }
                }
            } catch (err) {
                console.error("Error fetching poem:", err);
                setError("Failed to load poem");
            } finally {
                setLoading(false);
            }
        };

        fetchPoem();
    }, [id]);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        } catch (err) {
            toast.error("Failed to copy link");
        }
    };


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !poem) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-4">
                <h2 className="text-2xl font-bold text-destructive">{error || "Poem not found"}</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <header className="text-center space-y-4 border-b pb-8">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary tracking-tight">
                        {poem.title || "Love at Minus One anthology"}
                    </h1>
                    <p className="text-lg md:text-2xl text-muted-foreground font-serif italic">
                        {poem.author ? `by ${poem.author}` : "By inkfetish"}
                    </p>
                    {poem.title && (
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground pt-4">
                            Love at Minus One Anthology • Inkfetish
                        </p>
                    )}
                </header>

                <Card className="border-none shadow-none bg-transparent">
                    <CardContent className="space-y-8 p-0">
                        <div className="prose prose-lg dark:prose-invert mx-auto max-w-none px-2 md:px-0">
                            <div className="whitespace-pre-wrap break-words font-serif text-base md:text-xl leading-relaxed text-left min-h-[100px]">
                                {typeof poem.content === 'string' ? poem.content : "Content format error"}
                            </div>
                        </div>

                        <div className="flex justify-center gap-4 pt-8 border-t">
                            <Button onClick={handleShare} variant="outline" className="gap-2">
                                <Share2 className="h-4 w-4" />
                                Share Poem Link
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default LoveAtMinusOnePoem;
