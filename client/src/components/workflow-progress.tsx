import type { WorkflowStep } from "@/types";

interface WorkflowProgressProps {
  currentStep: number;
  steps: WorkflowStep[];
}

const defaultSteps: WorkflowStep[] = [
  { id: 1, name: "Lyrics Input", completed: false, current: true },
  { id: 2, name: "AI Script", completed: false, current: false },
  { id: 3, name: "Voice Generation", completed: false, current: false },
  { id: 4, name: "Music Composition", completed: false, current: false },
  { id: 5, name: "Video Creation", completed: false, current: false },
  { id: 6, name: "Bundle & Export", completed: false, current: false },
];

export function WorkflowProgress({ currentStep = 1, steps = defaultSteps }: WorkflowProgressProps) {
  const progress = Math.round((currentStep / steps.length) * 100);

  return (
    <div className="px-8 py-6 bg-primary-800 border-b border-primary-700">
      <div className="flex items-center justify-between max-w-6xl">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <div key={step.id} className="flex items-center space-x-2">
                {index > 0 && (
                  <div className={`w-12 h-0.5 ${isCompleted ? 'bg-accent-purple' : 'bg-primary-700'}`}></div>
                )}
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isActive
                        ? "bg-accent-purple text-white"
                        : isCompleted
                        ? "bg-accent-purple text-white"
                        : "bg-primary-700 text-gray-400"
                    }`}
                  >
                    {isCompleted ? <i className="fas fa-check text-xs"></i> : step.id}
                  </div>
                  <span
                    className={`font-medium ${
                      isActive ? "text-accent-purple" : isCompleted ? "text-accent-purple" : "text-gray-400"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-sm text-gray-400">
          Step {currentStep} of {steps.length} • <span className="text-accent-purple">{progress}% Complete</span>
        </div>
      </div>
    </div>
  );
}
