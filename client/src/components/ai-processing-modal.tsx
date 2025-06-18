import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import type { GenerationProgress } from "@/types";

interface AIProcessingModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: GenerationProgress;
}

export function AIProcessingModal({ isOpen, onClose, progress }: AIProcessingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-primary-800 border border-primary-700 max-w-md">
        <div className="text-center p-4">
          <div className="w-16 h-16 bg-gradient-to-br from-accent-purple to-accent-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">AI Processing</h3>
          <p className="text-gray-400 mb-6">{progress.step}</p>
          
          <div className="bg-primary-900 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-400">Progress</span>
              <span className="text-accent-purple font-medium">{progress.progress}%</span>
            </div>
            <Progress 
              value={progress.progress} 
              className="w-full bg-primary-700 h-2"
            />
          </div>

          <div className="text-sm text-gray-400">
            <p>Estimated time remaining: <span className="text-white font-medium">{progress.timeRemaining}</span></p>
          </div>

          <button 
            onClick={onClose}
            className="mt-6 px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel Process
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
