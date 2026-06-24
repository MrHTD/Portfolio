import { useState } from 'react';
import { motion } from 'motion/react';
import { Server, Database, Cloud, Cpu, Laptop, Bell, Activity, Wifi, ShieldAlert } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  type: 'client' | 'web' | 'app' | 'db' | 'cloud' | 'alert';
  status: 'online' | 'standby';
}

interface Connection {
  from: string;
  to: string;
  label?: string;
}

interface Props {
  nodes: Node[];
  connections: Connection[];
  projectId: string;
}

export default function ArchitectureDiagram({ nodes, connections, projectId }: Props) {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Position nodes horizontally/vertically based on project type to lay out beautifully
  const getNodePosition = (node: Node, index: number, total: number) => {
    // Return relative X, Y percentages for scalable SVG/HTML placement
    if (projectId === 'proj1') {
      // Postgres Backup script
      switch (node.id) {
        case 'postgres': return { x: 20, y: 30 };
        case 'backup_container': return { x: 50, y: 50 };
        case 'gdrive': return { x: 80, y: 30 };
        case 'discord': return { x: 80, y: 70 };
        default: return { x: 50, y: 50 };
      }
    } else if (projectId === 'proj2') {
      // AWS Three-Tier Web App
      switch (node.id) {
        case 'client': return { x: 10, y: 50 };
        case 'alb': return { x: 32, y: 50 };
        case 'nginx_web': return { x: 55, y: 30 };
        case 'app_tier': return { x: 55, y: 70 };
        case 'rds_db': return { x: 85, y: 50 };
        default: return { x: 50, y: 50 };
      }
    } else {
      // LAMP Stack Deploy
      switch (node.id) {
        case 'ansible_control': return { x: 20, y: 50 };
        case 'target_host': return { x: 50, y: 50 };
        case 'apache_srv': return { x: 80, y: 30 };
        case 'mysql_db': return { x: 80, y: 70 };
        default: return { x: 50, y: 50 };
      }
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'client': return <Laptop size={20} className="text-blue-400" />;
      case 'web': return <Server size={20} className="text-indigo-400" />;
      case 'app': return <Cpu size={20} className="text-indigo-400" />;
      case 'db': return <Database size={20} className="text-emerald-400" />;
      case 'cloud': return <Cloud size={20} className="text-purple-400" />;
      case 'alert': return <Bell size={20} className="text-amber-400" />;
      default: return <Server size={20} />;
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'client': return 'border-blue-500/30 bg-blue-950/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]';
      case 'web': return 'border-indigo-500/30 bg-indigo-950/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]';
      case 'app': return 'border-indigo-500/30 bg-indigo-950/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]';
      case 'db': return 'border-emerald-500/30 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]';
      case 'cloud': return 'border-purple-500/30 bg-purple-950/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]';
      case 'alert': return 'border-amber-500/30 bg-amber-950/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]';
      default: return 'border-gray-500 bg-gray-900';
    }
  };

  const getSystemDetails = (node: Node) => {
    switch (node.id) {
      case 'postgres':
        return { ip: '10.0.4.12 (Internal)', status: 'Active', details: 'Private RDS PostgreSQL Database instance containing tables, records, and indexes, secured with DB-level network firewalls.', metric: 'Uptime: 99.99%' };
      case 'backup_container':
        return { ip: 'Docker Host Local', status: 'Optimal', details: 'A modular Docker backup agent script configured via crontab that triggers pg_dump backups, compresses and secures them.', metric: 'Memory: 124MB' };
      case 'gdrive':
        return { ip: 'Google Workspace Cloud API', status: 'Online', details: 'Google API secure channel utilizing OAuth 2.0 credentials to push system artifacts directly into cold cloud storage drives.', metric: 'Quota: 2TB' };
      case 'discord':
        return { ip: 'https://discord.com/api/webhooks/...', status: 'Online', details: 'Instantly dispatches pipeline statuses, system monitoring warnings, or backup success payloads via rich webhooks.', metric: 'Latency: 140ms' };
      case 'client':
        return { ip: 'DHCP Public Gateway', status: 'Connected', details: 'End-users initiating request handshakes on HTTPS port 443 with modern browsers.', metric: 'HTTP/2 Supported' };
      case 'alb':
        return { ip: '54.210.23.4 (Elastic IP)', status: 'Active', details: 'AWS Application Load Balancer splitting high workloads safely across redundant Web Servers, terminating TLS protocols.', metric: 'Active Nodes: 2' };
      case 'nginx_web':
        return { ip: '10.0.1.5, 10.0.1.18 (ASG)', status: 'Auto-scaling', details: 'Dual Nginx static web proxy hosts, provisioned via Ansible inside an AWS Auto Scaling group for maximum traffic elasticity.', metric: 'CPU: 14% avg' };
      case 'app_tier':
        return { ip: '10.0.2.8 (Private Private Subnet)', status: 'Active', details: 'Server application services running runtime packages, completely segregated from public web interfaces.', metric: 'Threads: 4 active' };
      case 'rds_db':
        return { ip: '10.0.3.50 (RDS Multi-AZ Private)', status: 'Active', details: 'AWS PostgreSQL database with synchronous hot standby replication enabled across different regional availability zones.', metric: 'Idle Connections: 8' };
      case 'ansible_control':
        return { ip: 'Local Host Server', status: 'Active', details: 'Central workstation deploying idempotent tasks, inventory files, templates, and complex scripts via SSH.', metric: 'SSH Agent: Active' };
      case 'target_host':
        return { ip: '184.23.10.8 (VPS Host)', status: 'Active', details: 'Target production host running remote commands, provisioning software suites, and maintaining config baselines.', metric: 'OS: Ubuntu 22.04' };
      case 'apache_srv':
        return { ip: '127.0.0.1:80', status: 'Optimal', details: 'Apache HTTP web server daemon configured with customized virtual host mapping to serve PHP script backends.', metric: 'Virtual Hosts: 1' };
      case 'mysql_db':
        return { ip: '127.0.0.1:3306', status: 'Active', details: 'Secure MySQL server containerizing database tables and indexes, allowing query requests via specific users.', metric: 'Uptime: 45 Days' };
      default:
        return { ip: 'Dynamic Alloc', status: 'Optimal', details: 'DevOps cloud cluster resource performing isolated operations.', metric: 'Healthy' };
    }
  };

  return (
    <div className="relative flex flex-col h-[520px] bg-gray-950 rounded-xl border border-gray-800 p-6 overflow-hidden select-none">
      
      {/* Top Banner Controls */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-800/80">
        <div>
          <h4 className="text-sm font-semibold font-sans text-gray-200">Interactive Architecture Topology</h4>
          <p className="text-xs text-gray-500">Hover or click nodes to audit infrastructure assets, IPs, and telemetry logs.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-xs text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-900/40">
            <Wifi size={12} className="animate-pulse" />
            <span>Telemetry Link Live</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas and Node Grid */}
      <div className="relative flex-1 bg-gray-900/20 border border-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
        
        {/* Animated Connections Canvas */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="cyan-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
            </linearGradient>
            <marker id="arrow" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#4b5563" />
            </marker>
            <marker id="arrow-active" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#6366f1" />
            </marker>
          </defs>

          {/* Render Connection Lines */}
          {connections.map((conn, idx) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const fromPos = getNodePosition(fromNode, 0, 0);
            const toPos = getNodePosition(toNode, 0, 0);

            // Calculate exact pixel position on the fly in percentage units
            const fromX = `${fromPos.x}%`;
            const fromY = `${fromPos.y}%`;
            const toX = `${toPos.x}%`;
            const toY = `${toPos.y}%`;

            const isHighlighted = selectedNode?.id === fromNode.id || selectedNode?.id === toNode.id;

            return (
              <g key={idx}>
                {/* Connection pipe line background */}
                <line
                  x1={fromX}
                  y1={fromY}
                  x2={toX}
                  y2={toY}
                  stroke={isHighlighted ? '#6366f1' : '#1f2937'}
                  strokeWidth={isHighlighted ? 2 : 1.5}
                  markerEnd={isHighlighted ? 'url(#arrow-active)' : 'url(#arrow)'}
                  className="transition-all duration-300"
                />
                
                {/* Animated flow dots along the connection path */}
                <line
                  x1={fromX}
                  y1={fromY}
                  x2={toX}
                  y2={toY}
                  stroke="#6366f1"
                  strokeWidth={2}
                  strokeDasharray="5, 12"
                  strokeDashoffset="100"
                  className="animate-[dash_8s_linear_infinite]"
                  style={{
                    animationPlayState: 'running',
                    animationKeyframes: 'dash'
                  }}
                  opacity={isHighlighted ? 0.9 : 0.4}
                />

                {/* Connection label helper (centered) */}
                {conn.label && (
                  <foreignObject
                    x={`calc(${(fromPos.x + toPos.x) / 2}% - 50px)`}
                    y={`calc(${(fromPos.y + toPos.y) / 2}% - 10px)`}
                    width="100"
                    height="20"
                    className="overflow-visible pointer-events-none"
                  >
                    <div className="flex justify-center">
                      <span className="text-[9px] font-mono font-medium tracking-tight bg-gray-950/90 text-gray-500 border border-gray-900/60 rounded px-1.5 py-0.5 shadow-sm whitespace-nowrap">
                        {conn.label}
                      </span>
                    </div>
                  </foreignObject>
                )}
              </g>
            );
          })}
        </svg>

        {/* HTML Render Nodes overlay */}
        <div className="absolute inset-0 w-full h-full z-10">
          {nodes.map((node, idx) => {
            const pos = getNodePosition(node, idx, nodes.length);
            const isSelected = selectedNode?.id === node.id;

            return (
              <motion.div
                key={node.id}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className="absolute cursor-pointer group"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                onClick={() => setSelectedNode(node)}
              >
                {/* Glowing pulse ring if selected */}
                <div 
                  className={`absolute -inset-3 rounded-xl transition-all duration-500 blur-sm ${
                    isSelected ? 'bg-indigo-500/20 scale-110 opacity-100' : 'bg-transparent scale-90 opacity-0 group-hover:bg-indigo-500/5 group-hover:scale-100 group-hover:opacity-100'
                  }`}
                />

                {/* Main Node Card */}
                <div 
                  className={`relative flex flex-col items-center p-3 rounded-lg border-2 w-36 text-center select-none transition-all duration-300 ${
                    isSelected ? 'border-indigo-400 bg-gray-950 scale-105' : 'border-gray-800 bg-gray-950/90 group-hover:border-indigo-500/40'
                  } ${getNodeColor(node.type)}`}
                >
                  <div className="p-1.5 rounded-md bg-gray-900/60 mb-2 border border-gray-800/60">
                    {getNodeIcon(node.type)}
                  </div>
                  
                  <span className="text-[10px] font-bold font-sans tracking-wide text-gray-200 line-clamp-1">
                    {node.label}
                  </span>
                  
                  {/* Small Live Uptime Pill */}
                  <div className="mt-1 flex items-center space-x-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${node.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`} />
                    <span className="text-[8px] font-mono text-gray-500 uppercase tracking-wider">{node.status}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Node Telemetry Terminal Detail Dashboard */}
      <div className="mt-4 bg-gray-900 border border-gray-800 rounded-lg p-4 h-[120px] flex items-center justify-between font-mono text-xs z-10 transition-all duration-300">
        {selectedNode ? (
          (() => {
            const details = getSystemDetails(selectedNode);
            return (
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                <div className="sm:border-r border-gray-800 pr-3 flex flex-col justify-between">
                  <div>
                    <span className="text-gray-500 font-sans block mb-1">NODE RESOURCE</span>
                    <span className="text-indigo-400 font-bold text-sm block">{selectedNode.label}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-[10px] bg-indigo-950/40 text-indigo-400 px-2 py-0.5 rounded border border-indigo-900/30">
                      TYPE: {selectedNode.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="sm:border-r border-gray-800 px-1 sm:px-3 flex flex-col justify-between">
                  <div>
                    <span className="text-gray-500 font-sans block mb-1">NETWORK DETAILS</span>
                    <div className="text-gray-300 space-y-1">
                      <span className="block">IP Addr: <span className="text-emerald-400 font-semibold">{details.ip}</span></span>
                      <span className="block">Health status: <span className="text-emerald-400">{details.status}</span></span>
                    </div>
                  </div>
                </div>

                <div className="pl-1 sm:pl-3 flex flex-col justify-between">
                  <div>
                    <span className="text-gray-500 font-sans block mb-1">TELEMETRY DESCRIPTION</span>
                    <p className="text-[10px] text-gray-400 leading-normal line-clamp-2">{details.details}</p>
                  </div>
                  <div className="text-right text-[10px] text-indigo-400 font-semibold mt-1">
                    {details.metric}
                  </div>
                </div>
              </div>
            );
          })()
        ) : (
          <div className="flex items-center justify-center w-full text-gray-500 space-x-2 text-center">
            <Activity size={16} className="text-indigo-500 animate-pulse" />
            <span>Select any infrastructure node to monitor active environment telemetry, network IPs, and host configurations.</span>
          </div>
        )}
      </div>

      {/* Embedded CSS for custom keyframe connections */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}</style>
    </div>
  );
}
