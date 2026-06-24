import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion } from 'motion/react';
import { Terminal as TerminalIcon, Play, RefreshCw, Trash2, ArrowRight } from 'lucide-react';
import { PERSONAL_DETAILS } from '../data';

interface CommandOutput {
  command?: string;
  text: string;
  type: 'input' | 'output' | 'success' | 'error' | 'system';
}

export default function Terminal() {
  const [history, setHistory] = useState<CommandOutput[]>([
    { text: 'System boot sequence initiated...', type: 'system' },
    { text: `Welcome to Mughis's DevOps CLI [Version 1.0.4]`, type: 'system' },
    { text: 'Type "help" to view available automation commands or tap the quick buttons below.', type: 'system' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickCommands = [
    { label: 'neofetch', cmd: 'neofetch' },
    { label: 'terraform apply', cmd: 'terraform apply' },
    { label: 'kubectl get pods', cmd: 'kubectl get pods' },
    { label: 'jenkins build', cmd: 'jenkins build' },
    { label: 'skills', cmd: 'skills' },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const scrollToBottom = () => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommandSubmit = (cmdStr: string) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    const newEntries: CommandOutput[] = [
      { command: cmdStr.trim(), text: '', type: 'input' }
    ];

    switch (cleanCmd) {
      case 'help':
        newEntries.push({
          text: `Available commands:
  neofetch         - Displays DevOps system parameters & profile overview.
  skills           - Prints core toolchains and proficiency ratings.
  experience       - Summarizes professional work history.
  projects         - Showcases active automated infrastructure projects.
  terraform apply  - Simulates an automated Infrastructure-as-Code execution.
  kubectl get pods - Performs an active health check on a simulated Kubernetes cluster.
  jenkins build    - Simulates triggering a Jenkins CI/CD pipeline.
  contact          - Displays direct terminal contact coordinates.
  clear            - Purges the current terminal log console.`,
          type: 'output'
        });
        break;

      case 'neofetch':
        newEntries.push({
          text: `       _,.------....___,.' ',_
    ,-'          _,..---''    ' '-'._
  ,'     _..---''                  '._
 /   _.-'                             '\\     USER: mughis_uddin@portfolio
/  ,'                                  '\\    OS: Ubuntu 22.04 LTS (DevOps Edition)
| /                                     ||   KERNEL: Bash-Virtual-v1.0
| |   🚀 AUTOMATE EVERYTHING            ||   UPTIME: 2+ Years Experience
| \\                                     ||   SHELL: mughis-sh v1.0.4
\\  ',                                  //    CPU: AWS Nitro (Simulated)
 \\   '-._                             //     MEMORY: 16GB / 32GB (Optimal Allocation)
  ',     '-..---''                  ,'       CI/CD: Jenkins Continuous Runner
    '-._          ''--..---.._   _.-'        INFRASTRUCTURE: Terraform AWS Cloud
        ''------....___,.'  ' -'`,
          type: 'success'
        });
        break;

      case 'skills':
        newEntries.push({
          text: `=== MUGHIS'S CORE TOOLCHAIN MATRIX ===
[Cloud Infrastructure]
  - AWS (EC2, S3, RDS, VPC) [████████████████████] 92%
  - Terraform (IaC)         [██████████████████░░] 90%
[CI/CD & Orchestration]
  - Jenkins                 [████████████████████] 94%
  - Docker                  [███████████████████░] 93%
  - Kubernetes              [█████████████████░░░] 87%
  - Ansible                 [█████████████████░░░] 86%
[System Administration]
  - Linux Kernel & Bash     [████████████████████] 92%
  - Nginx                   [██████████████████░░] 89%
  - Monitoring (Prom/Graf)  [█████████████████░░░] 88%`,
          type: 'output'
        });
        break;

      case 'experience':
        newEntries.push({
          text: `=== WORK HISTORY PIPELINE ===
1. Jr. DevOps-IT Engineer @ Digital graphiks (Feb 2026 - Present)
   * Cut release cycle times by 83% (60m -> 10m) using automated Jenkins workflows.
   * Managed 10+ Linux hosts, configuring Apache and Nginx web environments.
   * Secured 50+ staging and production domains with automatic Let's Encrypt certificates.

2. Jr. DevOps Engineer @ devxonic (Jan 2025 - Nov 2025)
   * Deployed containerized microservices on Kubernetes clusters.
   * Optimized AWS infrastructure spending by 15% through EC2 sizing analysis.
   * Decreased incident resolution response times by 30% with Prometheus monitoring.`,
          type: 'output'
        });
        break;

      case 'projects':
        newEntries.push({
          text: `=== ACTIVE DEVOPS LAB PROJECTS ===
[01] Automated PostgreSQL Backup Suite
     * Bash-scripted, Docker-containerized Postgres database dumps.
     * Google Drive OAuth 2.0 uploads + instant Discord webhook reporting.
[02] AWS Three-Tier Scalable Web App
     * EC2 Nginx web tier, Private App Tier, Private Multi-AZ RDS PostgreSQL.
     * Elastic Load Balancing & Security Group least-privilege configurations.
[03] Automated LAMP Stack Provisioner
     * 100% repeatable Ansible playbooks configuring Linux, Apache, MySQL, PHP.`,
          type: 'output'
        });
        break;

      case 'terraform apply':
        newEntries.push({ text: 'terraform apply -auto-approve', type: 'system' });
        newEntries.push({ text: 'Initializing AWS terraform provider plugins...', type: 'output' });
        newEntries.push({ text: 'Analyzed configuration: 15 resources to add, 0 to change, 0 to destroy.', type: 'output' });
        newEntries.push({ text: 'aws_vpc.prod_vpc: Creating...', type: 'output' });
        newEntries.push({ text: 'aws_subnet.private_app[0]: Creating...', type: 'output' });
        newEntries.push({ text: 'aws_rds_cluster.postgres: Creating...', type: 'output' });
        newEntries.push({ text: 'aws_instance.nginx_web: Creating (Auto-scaling triggered)...', type: 'output' });
        newEntries.push({ text: 'Apply complete! Resources: 15 added, 0 changed, 0 destroyed.', type: 'success' });
        newEntries.push({ text: 'Outputs:\n  load_balancer_dns = "http://lb-prod-91823.amazonaws.com"\n  db_endpoint = "prod-db.cluster-ro-xyz.us-east-1.rds.amazonaws.com"', type: 'success' });
        break;

      case 'kubectl get pods':
        newEntries.push({ text: 'kubectl get pods -n production -o wide', type: 'system' });
        newEntries.push({
          text: `NAME                                 READY   STATUS    RESTARTS   AGE     IP            NODE
nginx-ingress-controller-678fc       1/1     Running   0          42d     10.244.0.5    node-worker-1
mughis-app-frontend-849c7b5-abc12    1/1     Running   0          12h     10.244.1.28   node-worker-2
mughis-app-backend-df83cb12-98s7x    1/1     Running   0          12h     10.244.2.14   node-worker-3
redis-cache-leader-0                 1/1     Running   0          15d     10.244.2.10   node-worker-3
postgres-backup-cronjob-28712-xc9    0/1     Completed 0          10h     10.244.1.35   node-worker-1`,
          type: 'success'
        });
        break;

      case 'jenkins build':
        newEntries.push({ text: 'jenkins-cli build "Mughis-Portfolio-Deploy" --follow', type: 'system' });
        newEntries.push({ text: 'Retrieving Git Repository (branch: main)...', type: 'output' });
        newEntries.push({ text: 'Parsing Jenkinsfile pipeline definition...', type: 'output' });
        newEntries.push({ text: '[Pipeline] Stage: Code Checkout -> SUCCESS', type: 'success' });
        newEntries.push({ text: '[Pipeline] Stage: Code Linter & Tests -> SUCCESS', type: 'success' });
        newEntries.push({ text: '[Pipeline] Stage: Dockerize Image build -> Tagging mughis/portfolio:latest', type: 'output' });
        newEntries.push({ text: '[Pipeline] Stage: Push Docker Image -> Success (Pushed to GHCR)', type: 'success' });
        newEntries.push({ text: '[Pipeline] Stage: Deploy to AWS ECS Cluster -> rolling-update in progress...', type: 'output' });
        newEntries.push({ text: 'SUCCESS: Jenkins build #452 terminated with status SUCCESS.', type: 'success' });
        break;

      case 'contact':
        newEntries.push({
          text: `=== MUGHIS'S CONTACT COORDINATES ===
  Email:      ${PERSONAL_DETAILS.email}
  Phone:      ${PERSONAL_DETAILS.phone}
  Location:   ${PERSONAL_DETAILS.location}
  LinkedIn:   ${PERSONAL_DETAILS.linkedin}
  GitHub:     ${PERSONAL_DETAILS.github}`,
          type: 'output'
        });
        break;

      case 'clear':
        setHistory([]);
        setInputValue('');
        return;

      default:
        newEntries.push({
          text: `mughis-bash: command not found: "${cmdStr}". Type "help" to view list of valid automated systems operations.`,
          type: 'error'
        });
    }

    setHistory((prev) => [...prev, ...newEntries]);
    setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommandSubmit(inputValue);
    }
  };

  return (
    <div 
      className="relative flex flex-col h-[480px] bg-zinc-950 rounded-xl border border-zinc-800 shadow-2xl overflow-hidden terminal-scanline font-mono text-sm leading-relaxed text-zinc-300"
      onClick={focusInput}
    >
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 select-none z-10">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
          <span className="text-xs text-zinc-500 font-medium pl-2">mughis@devops-node-01:~</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-indigo-400">
          <TerminalIcon size={14} className="animate-pulse" />
          <span>CLI Active</span>
        </div>
      </div>

      {/* Terminal Outputs */}
      <div 
        ref={terminalContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 z-10 scrollbar scroll-smooth"
      >
        {history.map((entry, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="whitespace-pre-wrap"
          >
            {entry.command !== undefined && (
              <div className="flex items-center text-indigo-400 font-semibold mb-1">
                <span className="text-emerald-500 mr-2">mughis-terminal$</span>
                <span>{entry.command}</span>
              </div>
            )}
            {entry.text && (
              <div 
                className={`
                  ${entry.type === 'error' ? 'text-red-400 font-medium' : ''}
                  ${entry.type === 'success' ? 'text-emerald-400 font-semibold' : ''}
                  ${entry.type === 'system' ? 'text-indigo-400 font-medium opacity-90' : ''}
                  ${entry.type === 'output' ? 'text-zinc-300' : ''}
                `}
              >
                {entry.text}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Input bar */}
      <div className="flex items-center px-4 py-3 bg-zinc-900/60 border-t border-zinc-800/80 z-10">
        <span className="text-emerald-500 font-semibold mr-2 select-none">mughis-terminal$</span>
        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent border-none outline-none text-indigo-400 font-medium caret-indigo-400 focus:ring-0 p-0"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help' and press Enter..."
          autoFocus
        />
        <button 
          onClick={() => handleCommandSubmit(inputValue)}
          className="p-1 hover:bg-zinc-800 rounded text-indigo-400 transition-all cursor-pointer"
          title="Run Command"
        >
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Quick Action suggestion tabs */}
      <div className="flex flex-wrap gap-2 p-3 bg-zinc-950 border-t border-zinc-900 z-10 select-none">
        <span className="text-xs text-zinc-500 flex items-center pr-1">
          <Play size={10} className="mr-1 text-indigo-500" /> Quick Commands:
        </span>
        {quickCommands.map((qc) => (
          <button
            key={qc.cmd}
            onClick={(e) => {
              e.stopPropagation();
              handleCommandSubmit(qc.cmd);
            }}
            className="text-xs bg-zinc-900 hover:bg-indigo-500/10 hover:text-indigo-400 hover:border-indigo-500/50 text-zinc-400 px-2.5 py-1 rounded border border-zinc-800 transition-all cursor-pointer"
          >
            {qc.label}
          </button>
        ))}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setHistory([{ text: 'Console buffer cleared. Shell ready.', type: 'system' }]);
          }}
          className="ml-auto text-xs text-zinc-500 hover:text-red-400 flex items-center space-x-1 cursor-pointer"
          title="Clear screen"
        >
          <Trash2 size={12} />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>
    </div>
  );
}
