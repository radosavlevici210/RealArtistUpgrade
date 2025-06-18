import { useState } from "react";
import { NavigationSidebar } from "@/components/navigation-sidebar";
import { WorkflowProgress } from "@/components/workflow-progress";
import { LyricsInput } from "@/components/lyrics-input";
import { ArtistSelection } from "@/components/artist-selection";
import { RecentProjects } from "@/components/recent-projects";
import { QuickStats } from "@/components/quick-stats";
import { AdvancedFeatures } from "@/components/advanced-features";
import { AIProcessingModal } from "@/components/ai-processing-modal";
import { SecurityFooter } from "@/components/security-footer";
import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/hooks/use-projects";
import { useGenerateScript } from "@/hooks/use-ai-generation";
import { useToast } from "@/hooks/use-toast";
import type { GenerationProgress } from "@/types";

export default function Studio() {
  const [lyrics, setLyrics] = useState("");
  const [mood, setMood] = useState("uplifting");
  const [genre, setGenre] = useState("pop");
  const [tempo, setTempo] = useState(120);
  const [selectedArtist, setSelectedArtist] = useState("AI Pop Vocalist");
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [processingProgress, setProcessingProgress] = useState<GenerationProgress>({
    progress: 0,
    timeRemaining: "0s",
    step: "Initializing...",
  });

  const createProjectMutation = useCreateProject();
  const generateScriptMutation = useGenerateScript();
  const { toast } = useToast();

  const handleGenerateScript = async () => {
    if (!lyrics.trim()) {
      toast({
        title: "Error",
        description: "Please enter lyrics before generating a script.",
        variant: "destructive",
      });
      return;
    }

    try {
      // First create the project
      const project = await createProjectMutation.mutateAsync({
        title: `New Project ${new Date().toLocaleTimeString()}`,
        lyrics,
        mood,
        genre,
        tempo,
        artistVoice: selectedArtist,
      });

      // Show processing modal
      setIsProcessingModalOpen(true);
      setProcessingProgress({
        progress: 0,
        timeRemaining: "2m 30s",
        step: "Analyzing lyrics and emotional patterns...",
      });

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProcessingProgress(prev => {
          const newProgress = Math.min(prev.progress + 10, 90);
          const remaining = Math.max(0, 150 - (newProgress * 1.5));
          const minutes = Math.floor(remaining / 60);
          const seconds = remaining % 60;
          
          return {
            progress: newProgress,
            timeRemaining: `${minutes}m ${seconds}s`,
            step: newProgress < 30 ? "Analyzing lyrics and emotional patterns..." :
                  newProgress < 60 ? "Generating song structure..." :
                  newProgress < 90 ? "Optimizing for selected artist voice..." :
                  "Finalizing AI script...",
          };
        });
      }, 200);

      // Generate the script
      const script = await generateScriptMutation.mutateAsync({
        lyrics,
        mood,
        genre,
      });

      clearInterval(progressInterval);
      setProcessingProgress({
        progress: 100,
        timeRemaining: "0s",
        step: "Script generation complete!",
      });

      setTimeout(() => {
        setIsProcessingModalOpen(false);
        setCurrentStep(2);
        toast({
          title: "Success!",
          description: "AI script generated successfully. Ready for next step.",
        });
      }, 1000);

    } catch (error) {
      setIsProcessingModalOpen(false);
      toast({
        title: "Generation Failed",
        description: "Failed to generate AI script. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-primary-900">
      <NavigationSidebar />
      
      <div className="ml-64 min-h-screen">
        {/* Top Header */}
        <header className="bg-primary-800 border-b border-primary-700 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Production Studio</h2>
              <p className="text-gray-400">AI-Powered Music Creation Pipeline</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="px-4 py-2 bg-accent-purple hover:bg-accent-purple/80 rounded-lg font-medium">
                <i className="fas fa-plus mr-2"></i>New Project
              </Button>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
                <span>AI Systems Online</span>
              </div>
            </div>
          </div>
        </header>

        <WorkflowProgress currentStep={currentStep} />

        {/* Main Workspace */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            <LyricsInput
              lyrics={lyrics}
              mood={mood}
              genre={genre}
              tempo={tempo}
              onLyricsChange={setLyrics}
              onMoodChange={setMood}
              onGenreChange={setGenre}
              onTempoChange={setTempo}
              onGenerateScript={handleGenerateScript}
              isGenerating={generateScriptMutation.isPending}
            />

            {/* Side Panel */}
            <div className="space-y-6">
              <ArtistSelection
                selectedArtist={selectedArtist}
                onArtistSelect={setSelectedArtist}
              />
              <RecentProjects />
              <QuickStats />
            </div>

          </div>

          <AdvancedFeatures />
        </div>

        <SecurityFooter />
      </div>

      <AIProcessingModal
        isOpen={isProcessingModalOpen}
        onClose={() => setIsProcessingModalOpen(false)}
        progress={processingProgress}
      />
    </div>
  );
}
