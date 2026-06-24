import { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  ExternalLink, 
  Clock, 
  Terminal as TerminalIcon, 
  BookOpen, 
  Award, 
  Download, 
  Gauge, 
  Server, 
  ShieldCheck, 
  Cpu, 
  Layers,
  ChevronRight,
  Database
} from 'lucide-react';

// Core Data
import { PERSONAL_DETAILS, PROJECTS, EDUCATIONS, CERTIFICATES } from './data';

// Custom Interactive Components
import Terminal from './components/Terminal';
import SkillsGrid from './components/SkillsGrid';
import ExperienceTimeline from './components/ExperienceTimeline';
import ContactConsole from './components/ContactConsole';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import ProjectSimulator from './components/ProjectSimulator';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [projectTab, setProjectTab] = useState<'architecture' | 'simulator'>('architecture');
  const [karachiTime, setKarachiTime] = useState('');
  const [activeSection, setActiveSection] = useState('hero');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Update Karachi time dynamically
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setKarachiTime(new Date().toLocaleTimeString('en-US', options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const activeProject = PROJECTS[activeProjectIdx];

  const stats = [
    { value: '83%', label: 'Jenkins Deploy Speedup', desc: 'Cut release from 60m to 10m' },
    { value: '15%', label: 'AWS Billing Saved', desc: 'Optimized EC2 & Auto-Scaling' },
    { value: '50+', label: 'SSL Domains Secured', desc: '0 certificate expiry events' },
    { value: '100GB+', label: 'Daily DB Backups', desc: 'Automated Bash/Docker cron' }
  ];

  const handleDownloadResume = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      
      {/* Background ambient glow */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      {/* Modern Fixed Navbar */}
      <header className="sticky top-0 z-50 bg-zinc-950/60 backdrop-blur-xl border-b border-zinc-800/50 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <a href="#hero" className="flex items-center space-x-2 group">
            <span className="text-zinc-100 font-bold tracking-tighter text-xl">MUGHIS UDDIN AHMED</span>
            <span className="text-xs text-zinc-500 font-mono pl-2 hidden sm:inline uppercase tracking-widest">/ DevOps</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 text-xs font-mono font-medium text-zinc-500 uppercase tracking-widest">
            <a href="#experience" className={`transition-colors ${activeSection === 'experience' ? 'text-indigo-400 font-bold' : 'hover:text-indigo-400'}`}>Experience</a>
            <a href="#education" className={`transition-colors ${activeSection === 'education' ? 'text-indigo-400 font-bold' : 'hover:text-indigo-400'}`}>Education</a>
            <a href="#certifications" className={`transition-colors ${activeSection === 'certifications' ? 'text-indigo-400 font-bold' : 'hover:text-indigo-400'}`}>Certs</a>
            <a href="#skills" className={`transition-colors ${activeSection === 'skills' ? 'text-indigo-400 font-bold' : 'hover:text-indigo-400'}`}>Skills</a>
            <a href="#projects" className={`transition-colors ${activeSection === 'projects' ? 'text-indigo-400 font-bold' : 'hover:text-indigo-400'}`}>Projects</a>
            <a href="#contact" className={`transition-colors ${activeSection === 'contact' ? 'text-indigo-400 font-bold' : 'hover:text-indigo-400'}`}>Contact</a>
            
            <span className="text-zinc-800">|</span>

            {/* Live Uptime Clock */}
            <div className="flex items-center space-x-1.5 text-[11px] text-zinc-400">
              <span>PK_TIME: {karachiTime || 'Loading'}</span>
            </div>
          </div>

          {/* Mobile menu triggers */}
          <div className="flex items-center space-x-3 md:hidden">
            <div className="text-[10px] font-mono text-zinc-400">
              {karachiTime}
            </div>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-400 hover:text-indigo-400 p-1 cursor-pointer"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-800 p-5 flex flex-col font-mono text-xs uppercase tracking-widest text-zinc-500 gap-4 shadow-xl">
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} className={`transition-colors ${activeSection === 'experience' ? 'text-indigo-400 font-bold' : 'hover:text-indigo-400'}`}>Experience</a>
            <a href="#education" onClick={() => setMobileMenuOpen(false)} className={`transition-colors ${activeSection === 'education' ? 'text-indigo-400 font-bold' : 'hover:text-indigo-400'}`}>Education</a>
            <a href="#certifications" onClick={() => setMobileMenuOpen(false)} className={`transition-colors ${activeSection === 'certifications' ? 'text-indigo-400 font-bold' : 'hover:text-indigo-400'}`}>Certs</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className={`transition-colors ${activeSection === 'skills' ? 'text-indigo-400 font-bold' : 'hover:text-indigo-400'}`}>Skills</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className={`transition-colors ${activeSection === 'projects' ? 'text-indigo-400 font-bold' : 'hover:text-indigo-400'}`}>Projects</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className={`transition-colors ${activeSection === 'contact' ? 'text-indigo-400 font-bold' : 'hover:text-indigo-400'}`}>Contact</a>
          </div>
        )}
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-4 auto-rows-min">
        
        {/* Section 1: Hero Section */}
        <section id="hero" className="col-span-1 lg:col-span-4 bg-zinc-900 rounded-3xl p-8 lg:p-16 border border-zinc-800 flex flex-col justify-center relative overflow-hidden z-10 text-center items-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] font-black text-[200px] pointer-events-none whitespace-nowrap">HELLO</div>
          
          <div className="space-y-6 z-10 max-w-4xl mx-auto flex flex-col items-center">
            <span className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-mono font-bold tracking-widest uppercase mb-4">
              {PERSONAL_DETAILS.location} • Available for hire
            </span>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-zinc-100 leading-none tracking-tight">
              MUGHIS <br /> UDDIN <span className="text-indigo-500">AHMED</span>
            </h1>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-zinc-400 mt-4">
              DevOps & <span className="italic text-zinc-300">Cloud Infrastructure</span> Engineer
            </h2>

            <p className="text-base sm:text-lg text-zinc-500 leading-relaxed max-w-2xl font-sans mt-8 text-center">
              {PERSONAL_DETAILS.summary}
            </p>

            {/* Social Links & Action Call Button */}
            <div className="flex flex-wrap justify-center gap-4 items-center pt-8 z-10">
              <a 
                href="#contact" 
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(79,70,229,0.3)]"
              >
                Hire Me
              </a>

              <button 
                onClick={handleDownloadResume}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold py-4 px-8 rounded-xl border border-zinc-700 transition-all hover:scale-105 text-sm uppercase tracking-wider"
              >
                Download Resume
              </button>

              <div className="flex space-x-3 ml-2">
                <a href={PERSONAL_DETAILS.linkedin} target="_blank" rel="noreferrer" className="p-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href={PERSONAL_DETAILS.github} target="_blank" rel="noreferrer" className="p-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors">
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Live Core Stats row */}
        <section id="stats" className="col-span-1 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((st, idx) => (
            <div key={idx} className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block font-bold mb-1">
                  {st.label}
                </span>
                <p className="text-[11px] text-zinc-400 leading-normal">{st.desc}</p>
              </div>
              <div className="text-4xl font-black italic text-zinc-100 mt-4">
                {st.value}
              </div>
            </div>
          ))}
        </section>

        {/* Section 3: Professional Experience */}
        <section id="experience" className="col-span-1 lg:col-span-4 bg-zinc-900 rounded-3xl p-6 lg:p-8 border border-zinc-800 flex flex-col gap-6">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Experience</div>
          <ExperienceTimeline />
        </section>

        {/* Section 4: Education */}
        <section id="education" className="col-span-1 lg:col-span-4 bg-zinc-900 rounded-3xl p-6 lg:p-8 border border-zinc-800 flex flex-col gap-6">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <BookOpen size={14} className="text-indigo-400" /> Education
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {EDUCATIONS.map((edu) => (
              <div key={edu.id} className="border-l-2 border-zinc-800 hover:border-indigo-500 transition-colors pl-5 py-2 relative group bg-zinc-950/30 rounded-r-2xl pr-4 border-t border-r border-b border-zinc-800/30">
                <div className="absolute w-3 h-3 rounded-full border-2 border-zinc-900 bg-zinc-700 -left-[7px] top-4 transition-colors group-hover:bg-indigo-500 group-hover:border-indigo-900" />
                <div className="flex justify-between items-center gap-2">
                  <p className="text-xs text-zinc-500 font-mono">{edu.period}</p>
                  {edu.gpa && <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">{edu.gpa}</span>}
                </div>
                <p className="font-bold text-sm md:text-base text-zinc-100 mt-2">{edu.degree}</p>
                <p className="text-xs font-medium text-indigo-400 mt-1">{edu.institution}</p>
                <p className="text-[11px] sm:text-xs text-zinc-400 mt-3 leading-relaxed">{edu.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Certifications */}
        <section id="certifications" className="col-span-1 lg:col-span-4 bg-zinc-900 rounded-3xl p-6 lg:p-8 border border-zinc-800 flex flex-col gap-6">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Award size={14} className="text-indigo-400" /> Certifications & Credentials
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {CERTIFICATES.map((cert) => (
              <div key={cert.id} className="bg-zinc-950/80 rounded-2xl p-5 flex flex-col justify-between border border-zinc-800/80 hover:border-indigo-500/50 hover:bg-zinc-900/50 transition-all duration-300 group relative overflow-hidden shadow-sm hover:shadow-[0_0_15px_rgba(79,70,229,0.1)]">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity transform group-hover:scale-110 group-hover:-rotate-12 duration-500">
                  <Award size={80} />
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700/50 flex items-center justify-center p-2.5 flex-shrink-0 shadow-inner group-hover:border-indigo-500/30 transition-colors">
                    {cert.logo ? (
                      <img src={cert.logo} alt={cert.issuer} className="w-full h-full object-contain transition-all duration-300 opacity-90 group-hover:opacity-100" />
                    ) : (
                      <Award size={20} className="text-indigo-400" />
                    )}
                  </div>
                  <div className="flex-1 pt-0.5 z-10">
                    <span className="text-sm font-bold text-zinc-100 line-clamp-3 leading-tight group-hover:text-indigo-300 transition-colors">{cert.title}</span>
                    <p className="text-[11px] text-zinc-400 font-sans mt-1.5 line-clamp-1">{cert.issuer}</p>
                  </div>
                </div>
                <div className="text-[9px] font-mono text-indigo-400/80 group-hover:text-indigo-400 flex justify-between items-center mt-3 border-t border-zinc-800/60 pt-3 transition-colors z-10">
                  <span className="flex items-center gap-1.5"><ShieldCheck size={12} /> VERIFIED</span>
                  <span className="bg-zinc-900 px-2 py-0.5 rounded text-zinc-400">{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Skills Toolchain */}
        <section id="skills" className="col-span-1 lg:col-span-4 bg-zinc-900 rounded-3xl p-6 lg:p-8 border border-zinc-800 flex flex-col gap-4">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Skills</div>
          <SkillsGrid />
        </section>

        {/* Section 6: Interactive Project Lab */}
        <section id="projects" className="col-span-1 lg:col-span-4 bg-zinc-900 rounded-3xl p-6 lg:p-8 border border-zinc-800 flex flex-col gap-4">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Projects</div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar list selection - 4 Cols */}
            <div className="lg:col-span-4 space-y-3">
              {PROJECTS.map((proj, idx) => {
                const isActive = activeProjectIdx === idx;
                return (
                  <button
                    key={proj.id}
                    onClick={() => {
                      setActiveProjectIdx(idx);
                      setProjectTab('architecture');
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start space-x-3 cursor-pointer ${
                      isActive
                        ? 'bg-zinc-800/80 border-indigo-500/50 text-zinc-100'
                        : 'bg-zinc-800/30 border-zinc-700/50 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                    }`}
                  >
                    <div className={`p-2 rounded-xl flex-shrink-0 transition-colors ${
                      isActive ? 'bg-indigo-500/20 text-indigo-400' : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      {proj.id === 'proj1' ? <Database size={16} /> : proj.id === 'proj2' ? <Server size={16} /> : <Cpu size={16} />}
                    </div>
                    
                    <div className="space-y-1 flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold tracking-tight">
                          {proj.title}
                        </h4>
                        <span className="text-[9px] font-mono text-zinc-500">{proj.date}</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 line-clamp-1">{proj.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Showcase Visualizer Panel - 8 Cols */}
            <div className="lg:col-span-8 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 relative flex flex-col min-h-[560px] overflow-hidden">
              <div className="space-y-6 flex-1 flex flex-col">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800/50 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-100 mb-2">
                      {activeProject.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.technologies.map((tech) => (
                        <span key={tech} className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-1 p-1 bg-zinc-800/50 rounded-xl">
                    <button
                      onClick={() => setProjectTab('architecture')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        projectTab === 'architecture' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      Topology
                    </button>
                    <button
                      onClick={() => setProjectTab('simulator')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        projectTab === 'simulator' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      Simulator
                    </button>
                  </div>
                </div>

                <div className="relative rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900 flex-1 min-h-[300px]">
                  {projectTab === 'architecture' ? (
                    <ArchitectureDiagram 
                      nodes={activeProject.architectureNodes}
                      connections={activeProject.architectureConnections}
                      projectId={activeProject.id}
                    />
                  ) : (
                    <ProjectSimulator 
                      steps={activeProject.simulatorLogs}
                      projectName={activeProject.title}
                    />
                  )}
                </div>

                <div className="bg-zinc-800/30 p-4 rounded-2xl">
                  <ul className="space-y-2 text-xs text-zinc-400 list-disc pl-4 marker:text-indigo-500">
                    {activeProject.bulletPoints.map((b, idx) => (
                      <li key={idx} className="hover:text-zinc-300 transition-colors">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Seamless Contact Ticket Console */}
        <section id="contact" className="col-span-1 lg:col-span-4 bg-zinc-900 rounded-3xl p-6 lg:p-8 border border-zinc-800 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-2">
            <div className="flex flex-col gap-2 max-w-xl">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Connect</div>
              <h3 className="text-2xl font-bold text-zinc-100 mt-2">Let's start a project together.</h3>
              <p className="text-zinc-400 text-sm">Currently accepting new inquiries for roles and consulting. Send a secure payload directly to my inbox.</p>
            </div>
          </div>
          
          <div className="w-full">
            <ContactConsole />
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12 py-8 px-4 text-center font-mono text-xs text-zinc-500 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold text-zinc-400">Mughis Uddin Ahmed — DevOps Portfolio</span>
          <div className="flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full text-[10px]">
            <ShieldCheck size={12} className="text-indigo-400" />
            <span>PLATFORM: STABLE</span>
          </div>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>

      {/* Floating Terminal Button */}
      <button 
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-zinc-900 border border-zinc-700 hover:border-indigo-500 text-zinc-100 p-4 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all group flex items-center justify-center"
      >
        <TerminalIcon size={24} className="group-hover:text-indigo-400 transition-colors" />
      </button>

      {/* Terminal Modal */}
      {isTerminalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsTerminalOpen(false)} />
          <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[80vh] max-h-[800px] animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <TerminalIcon size={16} className="text-indigo-400" />
                <span className="text-xs font-mono font-bold text-zinc-300">SYSTEM_TERMINAL</span>
              </div>
              <button 
                onClick={() => setIsTerminalOpen(false)}
                className="text-zinc-500 hover:text-zinc-300 p-1"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-hidden relative">
              <Terminal />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

