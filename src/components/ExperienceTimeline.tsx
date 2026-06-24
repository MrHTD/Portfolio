import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { WORK_EXPERIENCES } from '../data';
import { Briefcase, MapPin, Calendar, Gauge, ArrowRight, Zap, RefreshCw, Cpu, Database, Check } from 'lucide-react';

export default function ExperienceTimeline() {
  const [activeSimulation, setActiveSimulation] = useState<'jenkins' | 'autoscaling' | 'proxy' | 'lamp' | null>(null);
  const [simStatus, setSimStatus] = useState<string>('idle');
  const [traditionalProgress, setTraditionalProgress] = useState(0);
  const [mughisProgress, setMughisProgress] = useState(0);
  const [autoScaleNodes, setAutoScaleNodes] = useState<number>(1);
  const [trafficRate, setTrafficRate] = useState<number>(20); // users/sec
  
  const [proxyStatus, setProxyStatus] = useState<'blocked' | 'bypassing' | 'connected'>('blocked');
  const [lampStatus, setLampStatus] = useState<'provisioning' | 'tuning' | 'optimized'>('provisioning');
  const [lampRps, setLampRps] = useState(10);

  const simulatorRef = useRef<HTMLDivElement>(null);

  const scrollToSimulator = () => {
    if (window.innerWidth < 1024 && simulatorRef.current) {
      simulatorRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const runJenkinsSimulation = () => {
    scrollToSimulator();
    setActiveSimulation('jenkins');
    setSimStatus('running');
    setTraditionalProgress(0);
    setMughisProgress(0);

    // Mughis's pipeline takes 10 mins (simulated as super fast)
    // Traditional takes 60 mins (simulated as slow)
    let traditionalVal = 0;
    let mughisVal = 0;

    const mughisInterval = setInterval(() => {
      mughisVal += 5;
      setMughisProgress(Math.min(mughisVal, 100));
      if (mughisVal >= 100) {
        clearInterval(mughisInterval);
      }
    }, 100);

    const traditionalInterval = setInterval(() => {
      traditionalVal += 1.2;
      setTraditionalProgress(Math.min(Math.round(traditionalVal), 100));
      if (traditionalVal >= 100) {
        clearInterval(traditionalInterval);
        setSimStatus('completed');
      }
    }, 120);
  };

  const runAutoScaleSimulation = () => {
    scrollToSimulator();
    setActiveSimulation('autoscaling');
    setSimStatus('running');
    setAutoScaleNodes(1);
    setTrafficRate(20);

    // Step 1: Normal Traffic (Nodes: 1, Traffic: 20/s)
    // Step 2: Traffic Spike (Traffic: 150/s)
    // Step 3: Traditional Server Crashes. Mughis's server auto-scales nodes up to 3!
    // Step 4: Traffic Cools down. Mughis's server scales down to cut 15% costs.

    setTimeout(() => {
      setTrafficRate(180); // Surge
    }, 1000);

    setTimeout(() => {
      setAutoScaleNodes(3); // Auto-scaled!
    }, 2200);

    setTimeout(() => {
      setTrafficRate(40); // Cools down
    }, 4500);

    setTimeout(() => {
      setAutoScaleNodes(1); // Scaled down to rightsized!
      setSimStatus('completed');
    }, 6000);
  };

  const runProxySimulation = () => {
    scrollToSimulator();
    setActiveSimulation('proxy');
    setSimStatus('running');
    setProxyStatus('blocked');
    
    setTimeout(() => {
      setProxyStatus('bypassing');
    }, 1500);

    setTimeout(() => {
      setProxyStatus('connected');
      setSimStatus('completed');
    }, 3500);
  };

  const runLampSimulation = () => {
    scrollToSimulator();
    setActiveSimulation('lamp');
    setSimStatus('running');
    setLampStatus('provisioning');
    setLampRps(10);

    setTimeout(() => {
      setLampStatus('tuning');
      setLampRps(500);
    }, 2000);

    setTimeout(() => {
      setLampStatus('optimized');
      setLampRps(5000);
      setSimStatus('completed');
    }, 4000);
  };

  const resetSimulation = () => {
    setActiveSimulation(null);
    setSimStatus('idle');
    setTraditionalProgress(0);
    setMughisProgress(0);
    setAutoScaleNodes(1);
    setTrafficRate(20);
    setProxyStatus('blocked');
    setLampStatus('provisioning');
    setLampRps(10);
  };

  const renderSimulator = (expId: string) => {
    if (activeSimulation !== expId) return null;

    return (
      <div 
        ref={simulatorRef}
        className="w-full xl:w-[480px] mt-6 xl:mt-0 xl:ml-6 shrink-0 self-start bg-zinc-950 border border-zinc-800 rounded-2xl p-5 shadow-xl flex flex-col overflow-hidden relative animate-in fade-in slide-in-from-right-4 duration-500"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[80px] pointer-events-none" />
        
        {/* Banner */}
        <div>
          <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-indigo-400">
            <Zap size={12} className="animate-bounce" />
            <span>DEVOPS BENCHMARK ARENA</span>
          </div>
          <h4 className="text-sm font-extrabold text-zinc-200 mt-1 font-sans">Active Optimization Sandbox</h4>
          <p className="text-[11px] text-zinc-500 leading-normal mt-1">
            Visualizing the business metrics optimized on Mughis's resume inside real simulated environments.
          </p>
        </div>

        {/* Content displays */}
        <div className="mt-6 mb-4 flex-1 flex flex-col justify-center">
          
          {/* SIMULATOR 1: JENKINS SPEED */}
          {activeSimulation === 'jenkins' && (
            <div className="space-y-5">
              {/* Traditional Slow Release */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-red-400 font-semibold flex items-center">
                    Legacy Deployment Process (Manual Tasks)
                  </span>
                  <span className="text-zinc-500 font-bold">Duration: 60 mins</span>
                </div>
                <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl h-5 p-[2px] overflow-hidden relative flex items-center">
                  <div 
                    className="bg-red-500/20 border-r border-red-500 h-full rounded-lg transition-all duration-100"
                    style={{ width: `${traditionalProgress}%` }}
                  />
                  <span className="absolute left-3 text-[9px] font-mono text-zinc-400 font-semibold">
                    {traditionalProgress < 100 ? `Packaging & SSH hand-copying files (${traditionalProgress}%)` : 'COMPLETED: Slow process'}
                  </span>
                </div>
              </div>

              {/* Mughis's Automated Jenkins pipeline */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-emerald-400 font-semibold flex items-center">
                    Mughis's Jenkins Pipeline Optimization
                  </span>
                  <span className="text-indigo-400 font-bold">Duration: 10 mins (83% faster!)</span>
                </div>
                <div className="w-full bg-zinc-900 border border-indigo-500/30 rounded-xl h-5 p-[2px] overflow-hidden relative flex items-center">
                  <div 
                    className="bg-indigo-600 h-full rounded-lg transition-all duration-100"
                    style={{ width: `${mughisProgress}%` }}
                  />
                  <span className="absolute left-3 text-[9px] font-mono text-white font-bold">
                    {mughisProgress < 100 ? `Running build, static lint, push, and rollback tests (${mughisProgress}%)` : '🟢 STACK OPTIMIZED & DEPLOYED'}
                  </span>
                </div>
              </div>

              {/* Dynamic Recaps */}
              <div className="bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl font-mono text-[10px] text-zinc-400 leading-normal space-y-1">
                <span className="text-indigo-400 font-bold block mb-1">AUTOMATION LOG AUDIT:</span>
                <div>- Build cache: Enabled (speed factor x6)</div>
                <div>- Static analysis stage: Integrated seamlessly</div>
                <div>- Success rate: 100% deployment consistency verified</div>
              </div>
            </div>
          )}

          {/* SIMULATOR 2: AWS AUTOSCALING */}
          {activeSimulation === 'autoscaling' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-800/50 border border-zinc-700/50 p-2.5 rounded-xl text-center font-mono">
                  <span className="text-[9px] text-zinc-500 block">SIMULATED TRAFFIC LOAD</span>
                  <span className="text-base font-extrabold text-indigo-400 mt-1 block animate-pulse">
                    {trafficRate} req/sec
                  </span>
                </div>
                <div className="bg-zinc-800/50 border border-zinc-700/50 p-2.5 rounded-xl text-center font-mono">
                  <span className="text-[9px] text-zinc-500 block">ACTIVE SERVER NODES</span>
                  <span className="text-base font-extrabold text-emerald-400 mt-1 block">
                    {autoScaleNodes} Instances
                  </span>
                </div>
              </div>

              {/* Cluster Graphic */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex justify-center items-center space-x-4 h-24 relative overflow-hidden">
                <div className="absolute top-1 left-2 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">AWS Auto-Scaling Pool</div>
                
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center p-2 rounded-xl border w-16 transition-all duration-500 ${
                      idx < autoScaleNodes
                        ? 'border-emerald-500/40 bg-emerald-500/10 scale-100 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                        : 'border-zinc-800 bg-zinc-800/30 scale-95 opacity-50 text-zinc-500'
                    }`}
                  >
                    <Cpu size={14} className={idx < autoScaleNodes && trafficRate > 100 ? 'animate-pulse' : ''} />
                    <span className="text-[8px] font-mono mt-1 font-semibold">EC2-N0{idx+1}</span>
                  </div>
                ))}
              </div>

              {/* Alert Message */}
              <div className="bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl font-mono text-[10px] text-zinc-400 leading-normal space-y-1">
                <span className="text-indigo-400 font-bold block mb-1">SYSTEM CONTROLLER LOGS:</span>
                {trafficRate === 20 && <div>[INFO] Traffic normal. Keeping base cluster configuration (1 Node).</div>}
                {trafficRate > 100 && (
                  <div className="text-amber-400 animate-pulse font-medium">
                    [WARNING] Traffic Spike detected ({trafficRate} req/s). CPU average &gt; 80%. Invoking auto-scale script policies!
                  </div>
                )}
                {trafficRate > 100 && autoScaleNodes === 3 && (
                  <div className="text-emerald-400 font-semibold">
                    [SUCCESS] Scaled up instances successfully. Dynamic load balancing active. Overload bypassed!
                  </div>
                )}
                {trafficRate === 40 && autoScaleNodes === 1 && (
                  <div className="text-indigo-400">
                    [INFO] Traffic cooled. Rightsized to 1 node. Successfully saved 15% in cloud billing expenditure.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SIMULATOR 3: REVERSE PROXY */}
          {activeSimulation === 'proxy' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-800/50 border border-zinc-700/50 p-2.5 rounded-xl text-center font-mono">
                  <span className="text-[9px] text-zinc-500 block">ISP STATUS</span>
                  <span className={`text-base font-extrabold mt-1 block ${proxyStatus === 'blocked' ? 'text-red-400' : 'text-zinc-500 line-through'}`}>
                    PORT 80/443 BLOCKED
                  </span>
                </div>
                <div className="bg-zinc-800/50 border border-zinc-700/50 p-2.5 rounded-xl text-center font-mono">
                  <span className="text-[9px] text-zinc-500 block">WIREGUARD VPN</span>
                  <span className={`text-base font-extrabold mt-1 block ${proxyStatus === 'connected' ? 'text-emerald-400' : proxyStatus === 'bypassing' ? 'text-amber-400 animate-pulse' : 'text-zinc-500'}`}>
                    {proxyStatus === 'connected' ? 'ACTIVE & SECURE' : proxyStatus === 'bypassing' ? 'NEGOTIATING...' : 'OFFLINE'}
                  </span>
                </div>
              </div>

              {/* Graphic */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex justify-between items-center h-24 relative overflow-hidden px-8">
                <div className="absolute top-1 left-2 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Traffic Flow</div>
                
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                    <span className="text-[10px] font-mono font-bold text-zinc-400">USER</span>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center relative">
                  <div className={`h-1 w-full max-w-[150px] rounded-full transition-all duration-500 ${
                    proxyStatus === 'connected' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 
                    proxyStatus === 'bypassing' ? 'bg-amber-500 animate-pulse' : 'bg-red-500'
                  }`} />
                  {proxyStatus === 'blocked' && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">BLOCKED</div>
                  )}
                  {proxyStatus === 'connected' && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">NGINX PROXY</div>
                  )}
                </div>

                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${proxyStatus === 'connected' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>
                    <Database size={16} />
                  </div>
                  <span className="text-[8px] font-mono mt-1 text-zinc-500">INTERNAL SVR</span>
                </div>
              </div>

              {/* Alert Message */}
              <div className="bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl font-mono text-[10px] text-zinc-400 leading-normal space-y-1">
                <span className="text-indigo-400 font-bold block mb-1">NETWORK GATEWAY LOGS:</span>
                {proxyStatus === 'blocked' && <div>[ERROR] External traffic dropping. ISP port restrictions detected.</div>}
                {proxyStatus === 'bypassing' && (
                  <div className="text-amber-400 animate-pulse font-medium">
                    [INFO] Initializing WireGuard tunnel... Configuring Nginx reverse proxy routing rules...
                  </div>
                )}
                {proxyStatus === 'connected' && (
                  <div className="text-emerald-400 font-semibold">
                    [SUCCESS] Tunnel established! Nginx proxy securely routing external requests to internal services.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SIMULATOR 4: LAMP TUNING */}
          {activeSimulation === 'lamp' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-800/50 border border-zinc-700/50 p-2.5 rounded-xl text-center font-mono">
                  <span className="text-[9px] text-zinc-500 block">APACHE THRUPUT</span>
                  <span className={`text-base font-extrabold mt-1 block ${lampStatus === 'optimized' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {lampRps.toLocaleString()} Req/Sec
                  </span>
                </div>
                <div className="bg-zinc-800/50 border border-zinc-700/50 p-2.5 rounded-xl text-center font-mono">
                  <span className="text-[9px] text-zinc-500 block">SERVER LOAD</span>
                  <span className={`text-base font-extrabold mt-1 block ${lampStatus === 'optimized' ? 'text-emerald-400' : 'text-red-400 animate-pulse'}`}>
                    {lampStatus === 'optimized' ? 'STABLE' : lampStatus === 'tuning' ? 'CRITICAL' : 'IDLE'}
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-indigo-400 font-semibold flex items-center">
                    LAMP Stack Optimization Progress
                  </span>
                  <span className="text-zinc-500 font-bold">Max Performance</span>
                </div>
                <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl h-5 p-[2px] overflow-hidden relative flex items-center">
                  <div 
                    className={`h-full rounded-lg transition-all duration-1000 ${lampStatus === 'optimized' ? 'bg-emerald-500 w-full' : lampStatus === 'tuning' ? 'bg-amber-500 w-1/2' : 'bg-zinc-600 w-12'}`}
                  />
                  <span className="absolute left-3 text-[9px] font-mono text-white font-semibold">
                    {lampStatus === 'provisioning' && 'Provisioning baseline LAMP stack...'}
                    {lampStatus === 'tuning' && 'Tuning MPM Prefork, KeepAlive, and Memory Caching...'}
                    {lampStatus === 'optimized' && 'OPTIMIZED: 50x Throughput Increase!'}
                  </span>
                </div>
              </div>

              {/* Alert Message */}
              <div className="bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl font-mono text-[10px] text-zinc-400 leading-normal space-y-1">
                <span className="text-indigo-400 font-bold block mb-1">TUNING AUDIT LOGS:</span>
                {lampStatus === 'provisioning' && <div>[INFO] Baseline Apache installed. Default config loaded.</div>}
                {lampStatus === 'tuning' && (
                  <div className="text-amber-400 font-medium">
                    [WARN] High traffic crashing default server. Tuning MaxRequestWorkers, adjusting KeepAliveTimeout...
                  </div>
                )}
                {lampStatus === 'optimized' && (
                  <div className="text-emerald-400 font-semibold">
                    [SUCCESS] Stack optimized for high-traffic environments. 100% uptime achieved under load test.
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="border-t border-zinc-800 pt-3 flex items-center justify-between text-[11px] font-mono mt-auto">
          <span className="text-zinc-500 uppercase tracking-widest">
            STATUS: {simStatus}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                if (activeSimulation === 'jenkins') runJenkinsSimulation();
                else if (activeSimulation === 'autoscaling') runAutoScaleSimulation();
                else if (activeSimulation === 'proxy') runProxySimulation();
                else if (activeSimulation === 'lamp') runLampSimulation();
              }}
              className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center space-x-1 cursor-pointer"
              disabled={simStatus === 'running'}
            >
              <RefreshCw size={11} className={simStatus === 'running' ? 'animate-spin' : ''} />
              <span>Re-run</span>
            </button>
            <span className="text-zinc-700">|</span>
            <button
              onClick={resetSimulation}
              className="text-zinc-400 hover:text-red-400 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full relative">
      
      {/* Vertical Timeline Container */}
      <div className="space-y-12 relative pl-6 border-l border-zinc-800">
        
        {/* Glow indicator on top of the timeline line */}
        <motion.div 
          animate={{ top: ["0%", "80%", "0%"] }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          className="absolute left-[-1px] w-[2px] h-32 bg-gradient-to-b from-transparent via-indigo-500 to-transparent" 
        />

        {WORK_EXPERIENCES.map((exp, idx) => (
          <motion.div 
            key={exp.id} 
            className="relative group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * idx }}
            viewport={{ once: true }}
          >
            
            {/* Timeline node icon */}
            <div className="absolute -left-[32px] top-1.5 p-1.5 rounded-full bg-zinc-950 border border-zinc-800 text-indigo-400 group-hover:border-indigo-500 transition-all shadow-md z-10">
              <Briefcase size={12} />
            </div>

            {/* Hover visual accent */}
            <div className="absolute -left-6 top-0 bottom-0 right-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all pointer-events-none -z-10" />

            <div className="flex flex-col xl:flex-row xl:items-start w-full">
              
              {/* Content Side */}
              <div className={`space-y-3 flex-1 transition-all duration-300 ${exp.optimizationId && activeSimulation === (exp.optimizationId === 'jenkins-speed' ? 'jenkins' : exp.optimizationId === 'aws-scaling' ? 'autoscaling' : exp.optimizationId === 'upwork-proxy' ? 'proxy' : 'lamp') ? 'xl:max-w-[calc(100%-480px)]' : 'w-full'}`}>
                {/* Job Title and Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-base font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">
                      {exp.jobTitle}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-400 mt-1">
                      <span className="text-indigo-400">{exp.company}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="flex items-center text-zinc-500">
                        <MapPin size={10} className="mr-1" /> {exp.location}
                      </span>
                    </div>
                  </div>
                  
                  {/* Period Date Badge */}
                  <span className="inline-flex items-center text-[10px] font-mono bg-zinc-800/50 border border-zinc-700/50 text-indigo-400 px-2.5 py-1 rounded-md self-start sm:self-center uppercase tracking-widest">
                    <Calendar size={10} className="mr-1" /> {exp.period}
                  </span>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-2 text-xs leading-relaxed text-zinc-400 pl-4 list-disc marker:text-indigo-500">
                  {exp.bulletPoints.map((point, index) => (
                    <li key={index} className="hover:text-zinc-300 transition-colors">
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Interactive optimization launcher buttons */}
                {exp.optimizationId && (
                  <div className="pt-2 flex flex-wrap gap-3 items-center">
                    <span className="text-[10px] font-mono text-zinc-500 flex items-center">
                      <Gauge size={11} className="mr-1 text-indigo-400" /> Optimization Arena:
                    </span>
                    <button
                      onClick={() => {
                        if (exp.optimizationId === 'jenkins-speed') runJenkinsSimulation();
                        else if (exp.optimizationId === 'aws-scaling') runAutoScaleSimulation();
                        else if (exp.optimizationId === 'upwork-proxy') runProxySimulation();
                        else if (exp.optimizationId === 'upwork-lamp') runLampSimulation();
                      }}
                      className={`inline-flex items-center space-x-1 text-[10px] font-mono transition-all cursor-pointer rounded-lg px-2.5 py-1 border ${activeSimulation === (exp.optimizationId === 'jenkins-speed' ? 'jenkins' : exp.optimizationId === 'aws-scaling' ? 'autoscaling' : exp.optimizationId === 'upwork-proxy' ? 'proxy' : 'lamp') ? 'bg-indigo-600 text-white border-indigo-500' : 'text-indigo-400 hover:text-white bg-indigo-500/10 hover:bg-indigo-600 border-indigo-500/20 hover:border-indigo-500'}`}
                    >
                      <Zap size={10} className={activeSimulation === (exp.optimizationId === 'jenkins-speed' ? 'jenkins' : exp.optimizationId === 'aws-scaling' ? 'autoscaling' : exp.optimizationId === 'upwork-proxy' ? 'proxy' : 'lamp') ? 'animate-pulse' : ''} />
                      <span>
                        {activeSimulation === (exp.optimizationId === 'jenkins-speed' ? 'jenkins' : exp.optimizationId === 'aws-scaling' ? 'autoscaling' : exp.optimizationId === 'upwork-proxy' ? 'proxy' : 'lamp') ? 'Simulation Running...' :
                         exp.optimizationId === 'jenkins-speed' ? 'Simulate CI/CD pipeline' : 
                         exp.optimizationId === 'aws-scaling' ? 'Simulate AWS auto-scaling' :
                         exp.optimizationId === 'upwork-proxy' ? 'Simulate Reverse Proxy' :
                         'Simulate LAMP Tuning'}
                      </span>
                      {activeSimulation !== (exp.optimizationId === 'jenkins-speed' ? 'jenkins' : exp.optimizationId === 'aws-scaling' ? 'autoscaling' : exp.optimizationId === 'upwork-proxy' ? 'proxy' : 'lamp') && <ArrowRight size={10} />}
                    </button>
                  </div>
                )}

                {/* Core metrics badges */}
                {(!activeSimulation || activeSimulation !== (exp.optimizationId === 'jenkins-speed' ? 'jenkins' : exp.optimizationId === 'aws-scaling' ? 'autoscaling' : exp.optimizationId === 'upwork-proxy' ? 'proxy' : 'lamp')) && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-zinc-800/50">
                    {exp.metrics.map((m, idx) => (
                      <div key={idx} className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-2 flex flex-col justify-between">
                        <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase">{m.label}</span>
                        <div className="flex items-baseline space-x-1.5 mt-1">
                          <span className="text-sm font-extrabold text-indigo-400 tracking-tight">{m.value}</span>
                          <span className="text-[9px] text-zinc-400 truncate">{m.subtext}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Simulator Component Inline rendering */}
              {exp.optimizationId && activeSimulation === (exp.optimizationId === 'jenkins-speed' ? 'jenkins' : exp.optimizationId === 'aws-scaling' ? 'autoscaling' : exp.optimizationId === 'upwork-proxy' ? 'proxy' : 'lamp') && renderSimulator(
                activeSimulation
              )}

            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
