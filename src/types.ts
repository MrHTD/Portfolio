export interface Skill {
  name: string;
  category: 'Cloud' | 'IaC & CI/CD' | 'Containers' | 'Linux System Administrator' | 'Monitoring & Script' | 'Security & Other';
  proficiency: number; // percentage
  status: 'Active' | 'Optimal' | 'Stable' | 'Standby';
  uptime: string;
  version?: string;
  commands?: string[]; // Quick command associated
}

export interface MetricHighlight {
  label: string;
  value: string;
  subtext: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  period: string;
  bulletPoints: string[];
  metrics: MetricHighlight[];
  optimizationId?: 'jenkins-speed' | 'aws-scaling' | 'certbot' | 'backups' | 'upwork-proxy' | 'upwork-lamp';
}

export interface ProjectLogStep {
  text: string;
  type: 'info' | 'success' | 'warn' | 'error';
  delayMs: number;
}

export interface Project {
  id: string;
  title: string;
  date: string;
  description: string;
  bulletPoints: string[];
  technologies: string[];
  architectureNodes: {
    id: string;
    label: string;
    type: 'client' | 'web' | 'app' | 'db' | 'cloud' | 'alert';
    status: 'online' | 'standby';
  }[];
  architectureConnections: {
    from: string;
    to: string;
    label?: string;
  }[];
  simulatorLogs: ProjectLogStep[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string;
  gpa?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  logo?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'QUEUED' | 'PROVISIONING' | 'ROUTING' | 'RESOLVED';
  timestamp: string;
  ticketId: string;
}
