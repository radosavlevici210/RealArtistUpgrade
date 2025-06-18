export interface WorkflowStep {
  id: number;
  name: string;
  completed: boolean;
  current: boolean;
}

export interface GenerationProgress {
  progress: number;
  timeRemaining: string;
  step: string;
}

export interface LyricsAnalysis {
  lines: number;
  words: number;
  estimatedDuration: string;
}
