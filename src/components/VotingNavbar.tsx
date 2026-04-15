import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Vote, 
  Heart, 
  TrendingUp,
  Send
} from "lucide-react";

interface VotingNavbarProps {
  totalVotes: number;
  remainingVotes: number;
  totalSubmissions: number;
  selectedPoems: string[];
  hasSubmitted: boolean;
  submittingBatch: boolean;
  onSubmitBatchVotes: () => void;
}

const VotingNavbar: React.FC<VotingNavbarProps> = ({ 
  totalVotes, 
  remainingVotes, 
  totalSubmissions,
  selectedPoems,
  hasSubmitted,
  submittingBatch,
  onSubmitBatchVotes
}) => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-40 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-xl border-b border-slate-600/40 shadow-2xl"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
              <Vote className="h-4 w-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white">Authorverse Summit Voting</h1>
            </div>
            <div className="sm:hidden">
              <h1 className="text-base font-bold text-white">Voting</h1>
            </div>
          </div>

          {/* Right side - Stats and Submit Button */}
          <div className="flex items-center space-x-3">
            {/* Voting Status Badge */}
            {!hasSubmitted && (
              <div className="hidden sm:flex items-center space-x-3">
                <Badge 
                  variant={remainingVotes === 0 ? "destructive" : "secondary"}
                  className="font-medium bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-100 border-purple-400/40"
                >
                  {remainingVotes} votes remaining
                </Badge>
              </div>
            )}

            {/* Mobile Status */}
            {!hasSubmitted && (
              <div className="sm:hidden flex items-center space-x-2">
                <Badge 
                  variant={remainingVotes === 0 ? "destructive" : "secondary"}
                  className="font-medium text-xs bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-100 border-purple-400/40"
                >
                  {remainingVotes} left
                </Badge>
              </div>
            )}

            {/* Submit Button - Sticky */}
            {!hasSubmitted && selectedPoems.length > 0 && (
              <Button
                onClick={onSubmitBatchVotes}
                disabled={submittingBatch}
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold px-4 sm:px-6 py-2 shadow-xl shadow-emerald-500/25 text-sm border-0 rounded-lg transition-all duration-300"
              >
                {submittingBatch ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Send className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Submit {selectedPoems.length} Vote{selectedPoems.length !== 1 ? 's' : ''}</span>
                    <span className="sm:hidden">Submit</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VotingNavbar;