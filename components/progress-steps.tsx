"use client"

interface ProgressStepsProps {
  steps: string[]
  currentStep: number
}

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                index < currentStep
                  ? "bg-green-500/30 text-green-400 border border-green-500/50"
                  : index === currentStep
                    ? "bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 ring-2 ring-cyan-400/20"
                    : "bg-purple-500/20 text-gray-400 border border-purple-500/30"
              }`}
            >
              {index < currentStep ? "✓" : index + 1}
            </div>
            <p
              className={`text-xs mt-2 text-center font-medium ${index <= currentStep ? "text-gray-300" : "text-gray-500"}`}
            >
              {step}
            </p>
          </div>
        ))}
      </div>
      {/* Progress bar */}
      <div className="h-1 bg-purple-500/20 rounded-full overflow-hidden mt-6">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
