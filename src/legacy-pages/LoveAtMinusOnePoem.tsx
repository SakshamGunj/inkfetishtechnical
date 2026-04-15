import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Share2 } from "lucide-react";
import { toast } from "sonner";

interface Poem {
    content: string;
    createdAt: any;
}

const LoveAtMinusOnePoem = () => {
    const { id } = useParams();
    const [poem, setPoem] = useState<Poem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPoem = async () => {
            if (!id) return;

            try {
                const docRef = doc(db, "loveatminusone_poems", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPoem(docSnap.data() as Poem);
                } else {
                    setError("Poem not found");
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
                    <h1 className="text-2xl md:text-4xl font-serif font-bold text-primary">
                        Love at Minus One anthology
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground font-medium">
                        By inkfetish
                    </p>
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
