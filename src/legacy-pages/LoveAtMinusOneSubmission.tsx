import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Share2, Download, Copy, RefreshCw } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

const formSchema = z.object({
    content: z.string().min(10, "Poem must be at least 10 characters"),
});

const LoveAtMinusOneSubmission = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedPoemId, setSubmittedPoemId] = useState<string | null>(null);
    const [submittedTitle, setSubmittedTitle] = useState<string>("");
    const qrRef = useRef<HTMLDivElement>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        try {
            const title = values.content.split('\n')[0].trim() || "Untitled";
            setSubmittedTitle(title);

            const docRef = await addDoc(collection(db, "loveatminusone_poems"), {
                ...values,
                createdAt: new Date(),
            });

            toast.success("Poem published successfully!");
            setSubmittedPoemId(docRef.id);
            form.reset();
        } catch (error) {
            console.error("Error submitting poem:", error);
            toast.error("Failed to submit poem. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const poemUrl = submittedPoemId ? `https://inkfetish.in/loveatminusone/${submittedPoemId}` : "";

    const handleCopyLink = () => {
        navigator.clipboard.writeText(poemUrl);
        toast.success("Link copied to clipboard!");
    };

    const handleDownloadQR = () => {
        if (!qrRef.current) return;

        const qrCanvas = qrRef.current.querySelector("canvas");
        if (qrCanvas) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const padding = 30;
            const textHeight = 60;
            canvas.width = qrCanvas.width + (padding * 2);
            canvas.height = qrCanvas.height + textHeight + (padding * 2);

            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#000000";
            ctx.font = "bold 24px serif";
            ctx.textAlign = "center";
            let displayTitle = submittedTitle;
            if (displayTitle.length > 25) displayTitle = displayTitle.substring(0, 22) + "...";
            ctx.fillText(displayTitle, canvas.width / 2, padding + 20);

            ctx.font = "14px serif";
            ctx.fillStyle = "#666666";
            ctx.fillText("Scan to read full poetry", canvas.width / 2, padding + 45);

            ctx.drawImage(qrCanvas, padding, padding + textHeight);

            const url = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = `love-at-minus-one-${displayTitle.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-qr.png`;
            link.href = url;
            link.click();
            toast.success("QR Code downloaded!");
        }
    };

    const handleReset = () => {
        setSubmittedPoemId(null);
    };

    if (submittedPoemId) {
        return (
            <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
                <Card className="max-w-md w-full border-2 border-primary/20 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-serif text-center text-primary">
                            Poem Published!
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 flex flex-col items-center">
                        <div ref={qrRef} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center border border-slate-100">
                            <h3 className="text-xl font-serif font-bold text-center text-primary mb-1 max-w-[200px] truncate">{submittedTitle}</h3>
                            <p className="text-sm font-serif font-medium text-muted-foreground mb-4">Scan to read full poetry</p>
                            <QRCodeCanvas
                                value={poemUrl}
                                size={200}
                                level={"H"}
                                includeMargin={true}
                            />
                        </div>

                        <div className="w-full space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Poem Link</label>
                            <div className="flex gap-2">
                                <input
                                    readOnly
                                    value={poemUrl}
                                    className="flex-1 px-3 py-2 text-sm border rounded-md bg-muted"
                                />
                                <Button onClick={handleCopyLink} size="icon" variant="outline">
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-4 w-full">
                            <Button onClick={handleDownloadQR} className="flex-1 gap-2">
                                <Download className="h-4 w-4" />
                                Save QR
                            </Button>
                            <Button onClick={handleCopyLink} variant="outline" className="flex-1 gap-2">
                                <Share2 className="h-4 w-4" />
                                Share Link
                            </Button>
                        </div>

                        <Button onClick={handleReset} variant="ghost" className="w-full gap-2 text-muted-foreground">
                            <RefreshCw className="h-4 w-4" />
                            Submit Another Poem
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-2xl mx-auto space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                        Love at Minus One anthology
                    </h1>
                    <p className="text-xl text-muted-foreground font-medium">
                        By inkfetish
                    </p>
                </header>

                <Card className="border-2 border-primary/20 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-serif text-center">
                            Submit Your Masterpiece
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Poem Content (Include Title & Name Here)</label>
                                <Textarea
                                    {...form.register("content")}
                                    placeholder="Title&#10;by Author Name&#10;&#10;Your poem content here..."
                                    className="min-h-[300px] font-serif whitespace-pre-wrap"
                                />
                                {form.formState.errors.content && (
                                    <p className="text-sm text-destructive">
                                        {form.formState.errors.content.message}
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full text-lg font-serif"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Publishing...
                                    </>
                                ) : (
                                    "Publish to Anthology"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default LoveAtMinusOneSubmission;
