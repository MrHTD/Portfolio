import { SKILLS } from '../data';
import { Share2, CircleDot, GitCommit } from 'lucide-react';
import { useState, useMemo } from 'react';
import { motion } from 'motion/react';

export default function SkillsGrid() {
  const categories = ['Cloud', 'IaC & CI/CD', 'Containers', 'Linux System Administrator', 'Monitoring & Script', 'Security & Other'];
  const [activeVariant, setActiveVariant] = useState<'network' | 'flow'>('network');

  // Helper for deterministic random based on string
  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

  const getPos = (str: string, isX: boolean) => {
    const val = Math.abs(Math.sin(hashString(str)) * 10000);
    return isX ? 15 + (val % 70) : 15 + ((val * 13) % 70);
  };

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'Cloud': return '#38bdf8'; // sky-400
      case 'IaC & CI/CD': return '#818cf8'; // indigo-400
      case 'Containers': return '#34d399'; // emerald-400
      case 'Linux System Administrator': return '#fbbf24'; // amber-400
      case 'Monitoring & Script': return '#f472b6'; // pink-400
      case 'Security & Other': return '#f87171'; // red-400
      default: return '#9ca3af'; // gray-400
    }
  };

  const networkNodes = useMemo(() => {
    // Shuffle deterministically so categories are spread out
    const shuffledSkills = [...SKILLS].sort((a, b) => hashString(a.name) - hashString(b.name));
    
    const cols = 6;
    const rows = Math.ceil(shuffledSkills.length / cols);
    
    const xMin = 15;
    const xMax = 85;
    const yMin = 20;
    const yMax = 80;
    
    return shuffledSkills.map((skill, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      
      const cellWidth = (xMax - xMin) / Math.max(1, (cols - 1));
      const cellHeight = (yMax - yMin) / Math.max(1, (rows - 1));
      
      const baseX = xMin + col * cellWidth;
      const baseY = yMin + row * cellHeight;
      
      // Jitter
      const jitterX = (Math.sin(hashString(skill.name + "x")) * (cellWidth * 0.3));
      const jitterY = (Math.cos(hashString(skill.name + "y")) * (cellHeight * 0.3));
      
      const cx = baseX + jitterX;
      const cy = baseY + jitterY;
      
      return { ...skill, cx, cy, color: getCategoryColor(skill.category) };
    });
  }, []);

  // Calculate lines for network
  const networkLines = useMemo(() => {
    const lines = [];
    for(let i=0; i<networkNodes.length; i++) {
      let connections = 0;
      for(let j=i+1; j<networkNodes.length; j++) {
        const n1 = networkNodes[i];
        const n2 = networkNodes[j];
        const dist = Math.sqrt(Math.pow(n1.cx - n2.cx, 2) + Math.pow(n1.cy - n2.cy, 2));
        
        if (dist < 22 && connections < 3) {
          lines.push({ n1, n2, opacity: Math.max(0.05, 0.25 - (dist/80)) });
          connections++;
        } else if (n1.category === n2.category && dist < 40 && connections < 4) {
          lines.push({ n1, n2, opacity: Math.max(0.05, 0.3 - (dist/100)) });
          connections++;
        }
      }
    }
    return lines;
  }, [networkNodes]);

  const renderNetworkVariant = () => (
    <div className="flex flex-col animate-in fade-in duration-500 w-full">
      
      {/* Network Canvas */}
      <div className="relative w-full h-[600px] sm:h-[700px] bg-[#050505] rounded-[2rem] overflow-hidden group">
        
        {/* Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {networkLines.map((line, i) => (
            <motion.line 
              key={i}
              x1={`${line.n1.cx}%`} 
              y1={`${line.n1.cy}%`} 
              x2={`${line.n2.cx}%`} 
              y2={`${line.n2.cy}%`} 
              stroke={line.n1.color} 
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: line.opacity }}
              transition={{ duration: 1.5, delay: i * 0.01 + 0.5, ease: "easeOut" }}
            />
          ))}
        </svg>

        {/* Nodes */}
        {networkNodes.map((node, i) => (
          <motion.div 
            key={node.name}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1
            }}
            transition={{ 
              scale: { duration: 0.5, delay: i * 0.03, ease: "backOut" },
              opacity: { duration: 0.5, delay: i * 0.03 }
            }}
            className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-110 hover:z-20 cursor-default group/node"
            style={{ left: `${node.cx}%`, top: `${node.cy}%` }}
          >
            <div className="relative flex items-center justify-center">
              <motion.div 
                className="absolute w-6 h-6 rounded-full border border-zinc-700/30 group-hover/node:border-zinc-500 transition-colors duration-500" 
                style={{ borderColor: `${node.color}40` }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
              />
              <div className="absolute w-3 h-3 rounded-full border border-zinc-500/30"></div>
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: node.color, boxShadow: `0 0 8px ${node.color}` }}></div>
            </div>
            <span className="absolute top-full mt-2 text-[10px] font-mono text-zinc-400 whitespace-nowrap group-hover/node:text-zinc-100 transition-colors">{node.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Footer list */}
      <div className="mt-8 border-t border-zinc-800/50 pt-8 px-4 flex flex-col items-center gap-8">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3 text-[10px] sm:text-[11px] font-mono text-zinc-400 max-w-5xl leading-loose">
          {SKILLS.map((skill, i) => (
             <span key={skill.name} className="flex items-center gap-4 group cursor-default">
               <span className="group-hover:text-zinc-100 transition-colors">{skill.name}</span>
               {i !== SKILLS.length - 1 && <span className="w-1 h-1 rounded-full bg-zinc-800"></span>}
             </span>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-2">
          {categories.map(cat => (
            <div key={cat} className="flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-zinc-100 transition-colors cursor-default">
              <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: getCategoryColor(cat), color: getCategoryColor(cat) }}></div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider">{cat}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );

  const renderFlowVariant = () => {
    return (
      <div className="relative w-full min-h-[500px] bg-[#050505] rounded-3xl border border-zinc-800/50 p-8 overflow-x-auto animate-in fade-in duration-500 scrollbar-thin scrollbar-thumb-zinc-800">
        <div className="min-w-[900px] flex justify-between h-full relative">
          
          {categories.map((cat, i) => {
            const catSkills = SKILLS.filter(s => s.category === cat);
            const color = getCategoryColor(cat);
            
            return (
              <div key={cat} className="flex flex-col items-center relative z-10 w-40">
                <div className="text-[10px] font-mono uppercase tracking-widest mb-8 border-b border-zinc-800/50 pb-3 w-full text-center" style={{ color }}>
                  {cat}
                </div>
                
                <div className="flex flex-col gap-6 w-full">
                  {catSkills.map((skill, j) => (
                    <div key={skill.name} className="relative group">
                       <div className="bg-zinc-900 border border-zinc-800 group-hover:border-zinc-600 rounded-xl p-3 text-center transition-colors shadow-lg cursor-pointer">
                          <span className="text-[11px] font-mono text-zinc-400 group-hover:text-zinc-100">{skill.name}</span>
                       </div>
                       
                       {/* Connecting lines */}
                       {i < categories.length - 1 && j % 2 === 0 && (
                          <svg className="absolute top-1/2 left-full w-full h-10 overflow-visible pointer-events-none -z-10">
                            <path 
                              d={`M 0 0 C 30 0, 30 ${j === 0 ? 30 : -30}, 60 ${j === 0 ? 30 : -30}`} 
                              fill="none" 
                              stroke={color} 
                              strokeWidth="1" 
                              strokeOpacity="0.2" 
                              strokeDasharray="4 4"
                            />
                          </svg>
                       )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Variant Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex bg-[#050505] p-1.5 rounded-2xl border border-zinc-800/50">
          <button
            onClick={() => setActiveVariant('network')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] uppercase tracking-widest font-mono transition-all ${
              activeVariant === 'network' ? 'bg-zinc-800 text-zinc-100 shadow-md' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Share2 size={14} /> Constellation
          </button>
          <button
            onClick={() => setActiveVariant('flow')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] uppercase tracking-widest font-mono transition-all ${
              activeVariant === 'flow' ? 'bg-zinc-800 text-zinc-100 shadow-md' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <GitCommit size={14} /> Neural Flow
          </button>
        </div>
      </div>

      {/* Render Active Variant */}
      <div className="w-full">
        {activeVariant === 'network' && renderNetworkVariant()}
        {activeVariant === 'flow' && renderFlowVariant()}
      </div>
    </div>
  );
}

