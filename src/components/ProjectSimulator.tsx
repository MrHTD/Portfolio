import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle, Terminal as TermIcon, ShieldCheck } from 'lucide-react';
import { ProjectLogStep } from '../types';

interface Props {
  steps: ProjectLogStep[];
  projectName: string;
}

export default function ProjectSimulator({ steps, projectName }: Props) {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(-1);
  const [printedLogs, setPrintedLogs] = useState<ProjectLogStep[]>([]);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset when project changes
    handleReset();
  }, [steps]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [printedLogs]);

  useEffect(() => {
    if (!isRunning) return;

    if (currentStepIdx < steps.length - 1) {
      const nextIdx = currentStepIdx + 1;
      const currentStep = steps[nextIdx];

      const timer = setTimeout(() => {
        setCurrentStepIdx(nextIdx);
        setPrintedLogs((prev) => [...prev, currentStep]);
        setProgress(Math.min(Math.round(((nextIdx + 1) / steps.length) * 100), 100));
      }, currentStep.delayMs);

      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
    }
  }, [isRunning, currentStepIdx, steps]);

  const handleStart = () => {
    if (currentStepIdx >= steps.length - 1) {
      // Completed, do a reset first
      setPrintedLogs([]);
      setCurrentStepIdx(-1);
      setProgress(0);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStepIdx(-1);
    setPrintedLogs([]);
    setProgress(0);
  };

  return (
    <div className="flex flex-col h-[400px] bg-gray-950 border border-gray-800 rounded-xl overflow-hidden font-mono text-xs text-gray-300">
      
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="text-[11px] text-gray-500 pl-2 font-semibold">deploy_simulator_agent.sh</span>
        </div>
        <div className="flex items-center space-x-1.5 text-indigo-400">
          <TermIcon size={12} className={isRunning ? 'animate-spin' : ''} />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            {isRunning ? 'Executing Pipeline' : currentStepIdx === steps.length - 1 ? 'Job Succeeded' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="bg-gray-950/60 border-b border-gray-900 px-4 py-2 flex items-center justify-between">
        <div className="flex-1 mr-4">
          <div className="flex justify-between text-[10px] text-gray-500 mb-1">
            <span>PIPELINE ORCHESTRATION PROGRESS</span>
            <span className="font-bold text-indigo-400">{progress}%</span>
          </div>
          <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex items-center space-x-2">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="flex items-center space-x-1 px-3 py-1 bg-indigo-950/40 text-indigo-400 hover:bg-indigo-900/40 border border-indigo-800/60 rounded text-[11px] font-semibold transition-all cursor-pointer"
            >
              <Play size={10} className="fill-current" />
              <span>{currentStepIdx === -1 ? 'Deploy' : 'Resume'}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex items-center space-x-1 px-3 py-1 bg-amber-950/40 text-amber-400 hover:bg-amber-900/40 border border-amber-800/60 rounded text-[11px] font-semibold transition-all cursor-pointer"
            >
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse mr-1" />
              <span>Pause</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-1 hover:bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-400 rounded transition-all cursor-pointer"
            title="Reset Simulator"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

      {/* Interactive Logs Output */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 bg-black/40 scrollbar scroll-smooth"
      >
        {printedLogs.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-600 space-y-2 select-none">
            <ShieldCheck size={28} className="text-indigo-500/30" />
            <div className="text-xs">DevOps Orchestrator Standby</div>
            <p className="text-[10px] max-w-xs leading-normal">
              Click the <strong className="text-indigo-500 font-semibold">"Deploy"</strong> button to run a simulated automated terminal build for <strong>{projectName}</strong>.
            </p>
          </div>
        )}

        {printedLogs.map((log, index) => (
          <div 
            key={index}
            className={`flex items-start text-[11px] leading-relaxed transition-all duration-300 animate-[fadeIn_0.2s_ease-out]`}
          >
            {/* Log Level Prefix */}
            <span className="mr-2 select-none font-sans font-bold">
              {log.type === 'info' && <span className="text-indigo-500 bg-indigo-950/30 px-1 py-0.5 rounded border border-indigo-900/40 text-[9px]">INFO</span>}
              {log.type === 'success' && <span className="text-emerald-500 bg-emerald-950/30 px-1 py-0.5 rounded border border-emerald-900/40 text-[9px]">PASS</span>}
              {log.type === 'warn' && <span className="text-amber-500 bg-amber-950/30 px-1 py-0.5 rounded border border-amber-900/40 text-[9px]">WARN</span>}
              {log.type === 'error' && <span className="text-red-500 bg-red-950/30 px-1 py-0.5 rounded border border-red-900/40 text-[9px]">FAIL</span>}
            </span>

            {/* Log Time Indicator */}
            <span className="text-gray-600 mr-2 text-[10px]">
              [{new Date().toLocaleTimeString('en-US', { hour12: false })}]
            </span>

            {/* Log Text */}
            <span className={`flex-1 ${
              log.type === 'success' ? 'text-emerald-400 font-medium' : 
              log.type === 'error' ? 'text-red-400 font-semibold' : 
              log.type === 'warn' ? 'text-amber-300' : 'text-gray-300'
            }`}>
              {log.text}
            </span>
          </div>
        ))}
      </div>

      {/* Terminal Footer Status Bar */}
      <div className="px-4 py-2 bg-gray-900 border-t border-gray-800 text-[10px] text-gray-500 flex justify-between select-none">
        <span className="flex items-center">
          <span className={`w-2 h-2 rounded-full mr-1.5 ${progress === 100 ? 'bg-emerald-500 animate-pulse' : isRunning ? 'bg-indigo-500 animate-pulse' : 'bg-gray-600'}`} />
          <span>SIMULATOR CONSOLE STACK: v1.1.2</span>
        </span>
        <span>
          {progress === 100 ? (
            <span className="text-emerald-400 font-bold flex items-center space-x-1">
              <CheckCircle size={10} />
              <span>PIPELINE DISPATCH VERIFIED</span>
            </span>
          ) : isRunning ? (
            <span className="text-indigo-400 animate-pulse font-semibold">EXECUTING AUTOMATION PLAN...</span>
          ) : (
            <span>STANDBY</span>
          )}
        </span>
      </div>
    </div>
  );
}
