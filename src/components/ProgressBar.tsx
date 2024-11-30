import React, { useEffect, useState } from 'react';

interface Phase {
  name: 'scanning' | 'analyzing' | 'finalizing';
  range: [number, number];
  speed: number;
  description: string;
}

const phases: Phase[] = [
  { 
    name: 'scanning',
    range: [0, 30],
    speed: 8,
    description: 'Scanning file contents and calculating hashes...'
  },
  { 
    name: 'analyzing',
    range: [30, 70],
    speed: 5,
    description: 'Analyzing patterns and checking signatures...'
  },
  { 
    name: 'finalizing',
    range: [70, 100],
    speed: 2,
    description: 'Finalizing analysis and generating report...'
  }
];

export function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>(phases[0]);
  const [steps, setSteps] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (Math.random() * phase.speed);
        
        // Update phase based on progress
        const currentPhase = phases.find(p => 
          newProgress >= p.range[0] && newProgress < p.range[1]
        ) || phases[phases.length - 1];

        if (currentPhase.name !== phase.name) {
          setPhase(currentPhase);
          setSteps(prev => [...prev, `Completed ${phase.name} phase`]);
        }

        return Math.min(newProgress, 99);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [phase]);

  const gradientColors = {
    scanning: 'from-blue-500 via-purple-500 to-indigo-500',
    analyzing: 'from-purple-500 via-indigo-500 to-violet-500',
    finalizing: 'from-indigo-500 via-violet-500 to-fuchsia-500'
  };

  const getProgressIndicator = () => {
    const percentage = Math.round(progress);
    return (
      <div className="flex items-center space-x-2">
        <span className="text-gray-600 font-bold">{percentage}%</span>
        <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping-slow" />
      </div>
    );
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-4">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden p-[1px]">
          <div
            className={`h-full bg-gradient-to-r ${gradientColors[phase.name]} transition-all duration-300 ease-out rounded-full relative`}
            style={{ width: `${Math.min(progress, 99)}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse-slow" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-purple-600 font-medium animate-pulse">
            {phase.description}
          </span>
          {getProgressIndicator()}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium">
          {phases.map((p, i) => (
            <div
              key={p.name}
              className={`flex items-center space-x-1 ${
                progress >= p.range[0] ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${
                progress >= p.range[0] ? 'bg-purple-600 animate-pulse' : 'bg-gray-300'
              }`} />
              <span>{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</span>
            </div>
          ))}
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 animate-fade-in"
            >
              <div className="w-1 h-1 rounded-full bg-green-500" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}