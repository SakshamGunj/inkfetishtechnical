import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function SinglePoem() {
  const { id } = useParams();
  const [submission, setSubmission] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await fetch(`/api/submissions/${id}`);
        if (!res.ok) throw new Error("Poem not found");
        const data = await res.json();
        setSubmission(data.submission);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchSubmission();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <p className="text-zinc-500 font-medium">{error || "Not found"}</p>
      </div>
    );
  }

  const content = submission.activeSubmission;

  return (
    <div className="min-h-screen bg-zinc-50 p-6 sm:p-12 font-sans flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-zinc-100">
        <p className="text-sm font-medium text-indigo-600 mb-6 uppercase tracking-widest text-center">
          {submission.name || "Anonymous"}
        </p>
        
        {content?.title && (
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-8 font-serif text-center leading-tight">
            {content.title}
          </h1>
        )}
        
        {content?.content && (
          <p className="text-zinc-800 leading-relaxed sm:leading-loose whitespace-pre-wrap font-serif text-base sm:text-lg text-center">
            {content.content}
          </p>
        )}
      </div>
    </div>
  );
}
