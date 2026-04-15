import React, { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, doc, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Plus, BookOpen, CheckCircle, XCircle, Eye, Clock } from "lucide-react";

interface Prompt {
  id: string;
  text: string;
  isActive: boolean;
  createdAt: any;
}

interface Submission {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  title: string;
  content: string;
  theme: string;
  submissionDate: any;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
  promptId?: string;
  voteCount?: number;
}

const InkculttAdmin: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [newPromptText, setNewPromptText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPrompts, setIsLoadingPrompts] = useState(true);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(true);
  const [activeTab, setActiveTab] = useState("prompts");
  const { toast } = useToast();

  useEffect(() => {
    loadPrompts();
    loadSubmissions();
  }, []);

  const loadPrompts = async () => {
    try {
      setIsLoadingPrompts(true);
      const q = query(collection(db, "inkcult_prompts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      const promptsList: Prompt[] = [];
      querySnapshot.forEach((doc) => {
        promptsList.push({ id: doc.id, ...doc.data() } as Prompt);
      });
      
      setPrompts(promptsList);
    } catch (error) {
      console.error("Error loading prompts:", error);
      toast({
        title: "Error",
        description: "Failed to load prompts.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingPrompts(false);
    }
  };

  const loadSubmissions = async () => {
    try {
      setIsLoadingSubmissions(true);
      const q = query(collection(db, "inkcult_submissions"), orderBy("submissionDate", "desc"));
      const querySnapshot = await getDocs(q);
      
      const submissionsList: Submission[] = [];
      querySnapshot.forEach((doc) => {
        submissionsList.push({ id: doc.id, ...doc.data() } as Submission);
      });
      
      setSubmissions(submissionsList);
    } catch (error) {
      console.error("Error loading submissions:", error);
      toast({
        title: "Error",
        description: "Failed to load submissions.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingSubmissions(false);
    }
  };

  const approveSubmission = async (submissionId: string) => {
    try {
      await updateDoc(doc(db, "inkcult_submissions", submissionId), {
        status: "approved"
      });

      toast({
        title: "Success",
        description: "Submission approved for voting!",
      });

      await loadSubmissions(); // Reload submissions
    } catch (error) {
      console.error("Error approving submission:", error);
      toast({
        title: "Error",
        description: "Failed to approve submission.",
        variant: "destructive"
      });
    }
  };

  const rejectSubmission = async (submissionId: string) => {
    try {
      await updateDoc(doc(db, "inkcult_submissions", submissionId), {
        status: "rejected"
      });

      toast({
        title: "Success",
        description: "Submission rejected.",
      });

      await loadSubmissions(); // Reload submissions
    } catch (error) {
      console.error("Error rejecting submission:", error);
      toast({
        title: "Error",
        description: "Failed to reject submission.",
        variant: "destructive"
      });
    }
  };

  const createPrompt = async () => {
    if (!newPromptText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt text.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      await addDoc(collection(db, "inkcult_prompts"), {
        text: newPromptText.trim(),
        isActive: true,
        createdAt: serverTimestamp()
      });

      toast({
        title: "Success",
        description: "Prompt created successfully!",
      });

      setNewPromptText("");
      await loadPrompts(); // Reload prompts
    } catch (error) {
      console.error("Error creating prompt:", error);
      toast({
        title: "Error",
        description: "Failed to create prompt.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-2 border-b border-purple-500/30">
        <button
          onClick={() => setActiveTab("prompts")}
          className={`px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === "prompts"
              ? "bg-purple-600 text-white"
              : "text-gray-400 hover:text-white hover:bg-purple-600/20"
          }`}
        >
          <Plus className="h-4 w-4 inline mr-2" />
          Prompts
        </button>
        <button
          onClick={() => setActiveTab("submissions")}
          className={`px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === "submissions"
              ? "bg-purple-600 text-white"
              : "text-gray-400 hover:text-white hover:bg-purple-600/20"
          }`}
        >
          <BookOpen className="h-4 w-4 inline mr-2" />
          Submissions ({submissions.filter(s => s.status === 'submitted').length})
        </button>
      </div>

      {/* Prompts Tab */}
      {activeTab === "prompts" && (
        <>
          <Card className="bg-white/10 backdrop-blur-md border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Create New Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter a new writing prompt for poets..."
                value={newPromptText}
                onChange={(e) => setNewPromptText(e.target.value)}
                className="bg-white/10 border-purple-400/50 text-white placeholder-gray-400 min-h-[100px]"
              />
              <Button
                onClick={createPrompt}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
              >
                {isLoading ? "Creating..." : "Create Prompt"}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Existing Prompts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingPrompts ? (
                <div className="text-center text-gray-400">Loading prompts...</div>
              ) : prompts.length === 0 ? (
                <div className="text-center text-gray-400">No prompts found</div>
              ) : (
                <div className="space-y-3">
                  {prompts.map((prompt) => (
                    <div key={prompt.id} className="p-3 bg-white/5 rounded-lg border border-purple-500/20">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant={prompt.isActive ? "default" : "secondary"}>
                          {prompt.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {prompt.createdAt?.toDate?.()?.toLocaleDateString() || "Unknown date"}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{prompt.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Submissions Tab */}
      {activeTab === "submissions" && (
        <Card className="bg-white/10 backdrop-blur-md border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Poetry Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingSubmissions ? (
              <div className="text-center text-gray-400">Loading submissions...</div>
            ) : submissions.length === 0 ? (
              <div className="text-center text-gray-400">No submissions found</div>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div key={submission.id} className="p-4 bg-white/5 rounded-lg border border-purple-500/20">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{submission.title}</h3>
                        <p className="text-gray-400 text-sm">by {submission.userName}</p>
                        <p className="text-gray-500 text-xs">{submission.theme}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            submission.status === 'approved' ? 'default' : 
                            submission.status === 'rejected' ? 'destructive' : 
                            'secondary'
                          }
                        >
                          {submission.status.replace('_', ' ')}
                        </Badge>
                        {submission.voteCount !== undefined && (
                          <Badge variant="outline" className="border-green-500/50 text-green-400">
                            {submission.voteCount} votes
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-gray-300 prose prose-sm max-w-none mb-4">
                      <div 
                        dangerouslySetInnerHTML={{ 
                          __html: submission.content.length > 300 
                            ? submission.content.substring(0, 300) + '...' 
                            : submission.content 
                        }} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Submitted on {submission.submissionDate?.toDate?.()?.toLocaleDateString() || 'Unknown date'}
                      </span>
                      
                      {submission.status === 'submitted' && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => approveSubmission(submission.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => rejectSubmission(submission.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InkculttAdmin;
