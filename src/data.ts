import { Skill, WorkExperience, Project, Education, Certificate } from './types';

export const PERSONAL_DETAILS = {
  name: 'Mughis Uddin Ahmed',
  title: 'DevOps Engineer',
  tagline: 'Automating Infrastructure. Accelerating Delivery. Scaling with Precision.',
  summary: 'DevOps Engineer focused on building CI/CD pipelines and automating cloud infrastructure. Proficient in AWS, Terraform, Ansible, Docker, Jenkins, and Kubernetes.',
  email: 'mughis01@gmail.com',
  phone: '03172155377',
  // location: 'Karachi, Sindh, Pakistan',
  linkedin: 'https://www.linkedin.com/in/mughis-uddin-ahmed',
  github: 'https://github.com/mughis01', // Standard github link
};

export const SKILLS: Skill[] = [
  // Cloud
  { name: 'AWS EC2', category: 'Cloud', proficiency: 92, status: 'Optimal', uptime: '99.99%', version: 'v4', commands: ['aws ec2 describe-instances'] },
  { name: 'AWS S3', category: 'Cloud', proficiency: 95, status: 'Optimal', uptime: '100%', version: 'v4', commands: ['aws s3 ls'] },
  { name: 'AWS RDS', category: 'Cloud', proficiency: 88, status: 'Stable', uptime: '99.99%', version: 'v4', commands: ['aws rds describe-db-instances'] },
  { name: 'AWS IAM', category: 'Cloud', proficiency: 90, status: 'Optimal', uptime: '100%', version: 'v1', commands: ['aws iam list-users'] },
  { name: 'VPC & Route 53', category: 'Cloud', proficiency: 85, status: 'Optimal', uptime: '100%', version: 'v1', commands: ['aws ec2 describe-vpcs'] },
  
  // IaC & CI/CD
  { name: 'Terraform', category: 'IaC & CI/CD', proficiency: 90, status: 'Optimal', uptime: '99.95%', version: 'v1.7.0', commands: ['terraform plan', 'terraform apply'] },
  { name: 'Ansible', category: 'IaC & CI/CD', proficiency: 86, status: 'Optimal', uptime: '99.98%', version: 'v2.15.0', commands: ['ansible-playbook site.yml'] },
  { name: 'Jenkins', category: 'IaC & CI/CD', proficiency: 94, status: 'Optimal', uptime: '99.90%', version: 'v2.440', commands: ['jenkins-cli build deploy-job'] },
  
  // Containerization
  { name: 'Docker', category: 'Containers', proficiency: 93, status: 'Optimal', uptime: '99.99%', version: 'v25.0', commands: ['docker ps', 'docker-compose up -d'] },
  { name: 'Kubernetes', category: 'Containers', proficiency: 87, status: 'Stable', uptime: '99.92%', version: 'v1.29', commands: ['kubectl get pods -n prod', 'kubectl describe ingress'] },
  
  // System Admin
  { name: 'Linux (Ubuntu/CentOS)', category: 'Linux System Administrator', proficiency: 92, status: 'Active', uptime: '100%', version: 'Kernel 6.2', commands: ['uname -a', 'htop'] },
  { name: 'Nginx', category: 'Linux System Administrator', proficiency: 89, status: 'Optimal', uptime: '99.99%', version: 'v1.25', commands: ['nginx -t', 'systemctl status nginx'] },
  { name: 'Apache', category: 'Linux System Administrator', proficiency: 82, status: 'Stable', uptime: '99.95%', version: 'v2.4', commands: ['apache2ctl configtest'] },
  { name: 'SSH & VPN', category: 'Linux System Administrator', proficiency: 90, status: 'Optimal', uptime: '100%', version: 'OpenSSH 9.3', commands: ['ssh-add -l'] },
  
  // Monitoring & Scripting
  { name: 'Prometheus & Grafana', category: 'Monitoring & Script', proficiency: 88, status: 'Optimal', uptime: '99.96%', version: 'v2.49 / v10.2', commands: ['promtool check config'] },
  { name: 'Bash Scripting', category: 'Monitoring & Script', proficiency: 95, status: 'Optimal', uptime: '100%', version: 'GNU bash 5.2', commands: ['bash backup.sh'] },
  { name: 'Python', category: 'Monitoring & Script', proficiency: 80, status: 'Stable', uptime: '100%', version: 'v3.11', commands: ['python3 -m venv env'] },
  
  // Security
  { name: 'SSL/TLS (Certbot)', category: 'Security & Other', proficiency: 90, status: 'Optimal', uptime: '100%', version: 'v2.8', commands: ['certbot certificates'] },
  { name: 'Firewalls & Security Groups', category: 'Security & Other', proficiency: 88, status: 'Optimal', uptime: '100%', version: 'UFW/iptables', commands: ['sudo ufw status'] },
  { name: 'Git & GitHub', category: 'Security & Other', proficiency: 94, status: 'Optimal', uptime: '100%', version: 'v2.43', commands: ['git status', 'git log --oneline'] },
];

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: 'exp1',
    jobTitle: 'Jr. DevOps-IT Engineer',
    company: 'Digital graphiks',
    location: 'Karachi, Pakistan',
    period: 'Feb 2026 – Present',
    bulletPoints: [
      'Designed and implemented CI/CD pipelines using Jenkins for web applications across staging and production environments.',
      'Provisioned and maintained Linux infrastructure across 10+ servers, configuring Nginx and Apache virtual hosts to sustain high availability.',
      'Automated server provisioning and maintenance using custom shell scripts, enforcing deployment consistency across staging and production.',
      'Secured production domains by automating SSL/TLS provisioning with Certbot/Let\'s Encrypt and configuring DNS routing.',
      'Automated daily database and server backups via custom Bash + cron.'
    ],
    metrics: [
      { label: 'Release Time', value: '-83%', subtext: 'Cut from 60 to 10 minutes' },
      { label: 'Domains Secured', value: '50+', subtext: '0 certificate expiries' },
      { label: 'Setup Time', value: '-70%', subtext: 'Via bash scripting' },
      { label: 'Data Protected', value: '100GB+', subtext: 'Automated database backups' }
    ],
    optimizationId: 'jenkins-speed'
  },
  {
    id: 'exp2',
    jobTitle: 'Jr. DevOps Engineer',
    company: 'devxonic',
    location: 'Karachi, Pakistan',
    period: 'Jan 2025 – Nov 2025',
    bulletPoints: [
      'Deployed containerized web applications on Kubernetes using YAML manifests, configuring deployments, services, and ingress for scalability and accessibility.',
      'Built and maintained Jenkins CI/CD pipelines to streamline code delivery.',
      'Optimized AWS infrastructure by rightsizing EC2 instances and implementing Auto Scaling.',
      'Configured and secured Nginx servers for high traffic workloads.',
      'Automated infrastructure provisioning using Terraform and Ansible for AWS environments.',
      'Implemented monitoring with Prometheus & Grafana, enabling proactive issue detection.'
    ],
    metrics: [
      { label: 'AWS Cost', value: '-15%', subtext: 'Via instance rightsizing' },
      { label: 'Server Speed', value: '+35%', subtext: 'Nginx tuning' },
      { label: 'Incident Response', value: '-30%', subtext: 'Prometheus & Grafana' },
      { label: 'Deployment Errors', value: 'Minimal', subtext: 'Kubernetes orchestration' }
    ],
    optimizationId: 'aws-scaling'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj1',
    title: 'Automated PostgreSQL Backup & Cloud Upload Script',
    date: 'Apr 2025',
    description: 'Developed a highly reliable PostgreSQL backup system containerized in Docker using advanced Bash scripting, featuring automated secure cloud uploads, dynamic public link generation, and real-time Discord webhook alerts.',
    bulletPoints: [
      'Developed a highly reliable PostgreSQL backup system containerized in Docker using advanced Bash scripting.',
      'Integrated Google Drive OAuth for automated secure cloud uploads, dynamic public link generation, and real-time Discord webhook alerts.',
      'Engineered robust error handling, detailed logging, and timestamped backups to ensure comprehensive data protection.'
    ],
    technologies: ['Docker', 'Bash', 'PostgreSQL', 'Google Drive OAuth', 'Discord Webhook', 'Cron'],
    architectureNodes: [
      { id: 'postgres', label: 'PostgreSQL DB (prod_db)', type: 'db', status: 'online' },
      { id: 'backup_container', label: 'Docker Backup Utility', type: 'app', status: 'online' },
      { id: 'gdrive', label: 'Google Drive Cloud Storage', type: 'cloud', status: 'standby' },
      { id: 'discord', label: 'Discord (Alert Webhook)', type: 'alert', status: 'standby' }
    ],
    architectureConnections: [
      { from: 'backup_container', to: 'postgres', label: '1. Exec pg_dump' },
      { from: 'backup_container', to: 'gdrive', label: '2. Upload Archive (OAuth 2.0)' },
      { from: 'backup_container', to: 'discord', label: '3. Status Alert Webhook' }
    ],
    simulatorLogs: [
      { text: 'Initializing Automated PostgreSQL Backup container...', type: 'info', delayMs: 600 },
      { text: 'Retrieving environment parameters (DB_USER, BACKUP_DIR, GDRIVE_FOLDER)...', type: 'info', delayMs: 400 },
      { text: 'Testing database connectivity on prod_db:5432...', type: 'info', delayMs: 600 },
      { text: 'Connection verified. Executing: pg_dump -h prod_db -U postgres -d main_db | gzip > backup_20260624.sql.gz', type: 'info', delayMs: 1000 },
      { text: 'SUCCESS: Database dump generated. Archive size: 4.8 GB. Compression ratio: 78%', type: 'success', delayMs: 800 },
      { text: 'Accessing Google Drive OAuth client tokens...', type: 'info', delayMs: 500 },
      { text: 'Uploading backup_20260624.sql.gz to destination folder "DB_Backups"...', type: 'info', delayMs: 1200 },
      { text: 'SUCCESS: Google Drive upload complete. File ID: gdrive-backup-v12a7s8b', type: 'success', delayMs: 700 },
      { text: 'Dispatching alert notification payload to Discord webhook channel...', type: 'info', delayMs: 400 },
      { text: 'DISPATCHED: Webhook server responded with status 204 No Content.', type: 'success', delayMs: 500 },
      { text: 'ALERT CONTENTS: "Backup Job #9182 SUCCESS: 4.8 GB, 42.1s, 0 errors. Verified OK."', type: 'success', delayMs: 400 },
      { text: 'PostgreSQL Backup Cycle completed successfully. System reverting to crontab idle mode.', type: 'success', delayMs: 300 }
    ]
  },
  {
    id: 'proj2',
    title: 'AWS Three-Tier Web Application',
    date: 'May 2025',
    description: 'Designed and deployed a secure, scalable three-tier web application on AWS featuring an EC2/Nginx web tier, an EC2 application tier, and a private RDS PostgreSQL database tier.',
    bulletPoints: [
      'Designed and deployed a secure, scalable three-tier web application on AWS featuring an EC2/Nginx web tier, an EC2 application tier, and a private RDS PostgreSQL database tier.',
      'Implemented robust load balancing, auto-scaling groups, and strict IAM-based security protocols to achieve 99.9% application availability and high performance.'
    ],
    technologies: ['AWS EC2', 'Nginx', 'PostgreSQL (RDS)', 'AWS ALB', 'Auto Scaling', 'VPC', 'AWS IAM'],
    architectureNodes: [
      { id: 'client', label: 'End Users / Browser', type: 'client', status: 'online' },
      { id: 'alb', label: 'Application Load Balancer', type: 'web', status: 'online' },
      { id: 'nginx_web', label: 'Nginx Web Tier (EC2 Auto-scaling)', type: 'web', status: 'online' },
      { id: 'app_tier', label: 'NodeJS App Tier (EC2 Private)', type: 'app', status: 'online' },
      { id: 'rds_db', label: 'PostgreSQL (RDS Private Multi-AZ)', type: 'db', status: 'online' }
    ],
    architectureConnections: [
      { from: 'client', to: 'alb', label: 'HTTPS (Port 443)' },
      { from: 'alb', to: 'nginx_web', label: 'HTTP (Port 80)' },
      { from: 'nginx_web', to: 'app_tier', label: 'Proxy Pass (Port 3000)' },
      { from: 'app_tier', to: 'rds_db', label: 'SQL (Port 5432)' }
    ],
    simulatorLogs: [
      { text: 'Starting Terraform orchestration flow for AWS Three-Tier Web Stack...', type: 'info', delayMs: 600 },
      { text: 'Initializing AWS Provider plugins...', type: 'info', delayMs: 400 },
      { text: 'Verifying network plan: VPC 10.0.0.0/16, 2 Public Subnets, 4 Private Subnets...', type: 'info', delayMs: 600 },
      { text: 'Applying infrastructure plan. Creating subnets, Internet Gateway, NAT Gateways...', type: 'info', delayMs: 1200 },
      { text: 'Configuring security groups: RDS restricted to inbound App Server only...', type: 'info', delayMs: 700 },
      { text: 'Creating Application Load Balancer and listener rules on 80 -> 443 (Certbot SSL)...', type: 'info', delayMs: 1000 },
      { text: 'Launching EC2 instances within Multi-AZ Auto Scaling groups...', type: 'info', delayMs: 1100 },
      { text: 'Provisioning multi-AZ Amazon RDS PostgreSQL instance (db.t3.medium)...', type: 'info', delayMs: 1400 },
      { text: 'SUCCESS: RDS active and replicating. Slave instance ready in zone us-east-1b.', type: 'success', delayMs: 600 },
      { text: 'Triggering system state health validation on entrypoint: https://app.mughis-devops.com', type: 'info', delayMs: 800 },
      { text: 'HEALTH CHECK: Status Code 200 OK. Dynamic load balancing verified.', type: 'success', delayMs: 600 },
      { text: 'STACK READY: Three-Tier setup successfully provisioned. 99.9% uptime goal achieved.', type: 'success', delayMs: 400 }
    ]
  },
  {
    id: 'proj3',
    title: 'Automated LAMP Stack Deployment',
    date: 'March 2023',
    description: 'Developed Ansible playbooks and used Bash scripts to fully automate the provisioning and configuration of a complete LAMP stack (Linux, Apache, MySQL, PHP), making the server environment 100% repeatable.',
    bulletPoints: [
      'Developed Ansible playbooks and used Bash scripts to fully automate the provisioning and configuration of a complete LAMP stack (Linux, Apache, MySQL, PHP).',
      'The playbook installs necessary packages, configures Apache virtual hosts, and sets up a MySQL database, making the server environment 100% repeatable.'
    ],
    technologies: ['Ansible', 'Bash Scripting', 'Apache', 'MySQL', 'PHP', 'Linux Admin'],
    architectureNodes: [
      { id: 'ansible_control', label: 'Ansible Controller Node', type: 'app', status: 'online' },
      { id: 'target_host', label: 'Target Server (Ubuntu)', type: 'web', status: 'online' },
      { id: 'apache_srv', label: 'Apache HTTP Web Server', type: 'web', status: 'standby' },
      { id: 'mysql_db', label: 'MySQL Server Daemon', type: 'db', status: 'standby' }
    ],
    architectureConnections: [
      { from: 'ansible_control', to: 'target_host', label: 'Secure SSH Connection' },
      { from: 'target_host', to: 'apache_srv', label: 'Installs Apache/PHP-FPM' },
      { from: 'target_host', to: 'mysql_db', label: 'Installs & Secures MySQL' }
    ],
    simulatorLogs: [
      { text: 'Reading Ansible inventory file: inventory/production.ini...', type: 'info', delayMs: 500 },
      { text: 'Pinging remote server target_host_01 (184.23.10.8) via OpenSSH...', type: 'info', delayMs: 600 },
      { text: 'SUCCESS: target_host_01 responded (pong). Platform: Ubuntu 22.04 LTS.', type: 'success', delayMs: 400 },
      { text: 'Executing playbook: playbooks/deploy_lamp.yml...', type: 'info', delayMs: 500 },
      { text: 'Task 1: Update apt repository cache and upgrade basic packages...', type: 'info', delayMs: 900 },
      { text: 'CHANGED: 18 packages upgraded. Apt cache flushed.', type: 'success', delayMs: 400 },
      { text: 'Task 2: Install Apache2, PHP 8.1, and libapache2-mod-php modules...', type: 'info', delayMs: 1100 },
      { text: 'CHANGED: Apache2 and PHP components successfully compiled and installed.', type: 'success', delayMs: 500 },
      { text: 'Task 3: Configure Apache Virtual Host templates for domain "mughis.digital"...', type: 'info', delayMs: 700 },
      { text: 'CHANGED: Copied virtual host configuration, enabled mod_rewrite, reloaded Apache service.', type: 'success', delayMs: 500 },
      { text: 'Task 4: Secure MySQL DB and create production database user...', type: 'info', delayMs: 1000 },
      { text: 'CHANGED: Removed anonymous users, deactivated remote root access, created lamp_prod database.', type: 'success', delayMs: 600 },
      { text: 'Task 5: Deploy index.php test scripts and run environment validity audits...', type: 'info', delayMs: 600 },
      { text: 'SUCCESS: PHP database driver functional. SQL ping returned OK.', type: 'success', delayMs: 500 },
      { text: 'PLAY RECAP: target_host_01 : ok=11 changed=5 unreachable=0 failed=0', type: 'success', delayMs: 400 },
      { text: 'Automated LAMP Stack fully provisioned. Server environment is 100% repeatable.', type: 'success', delayMs: 300 }
    ]
  }
];

export const EDUCATIONS: Education[] = [
  {
    id: 'edu1',
    degree: 'Bachelors Business & Information Technology (BBIT)',
    institution: 'Virtual University of Pakistan',
    period: 'Oct 2023 – Expected 2027',
    details: 'Combining core computer science frameworks, networks, and business administration structures. Gaining deep insights into managing scalable technological infrastructures and cloud economics.'
  },
  {
    id: 'edu2',
    degree: 'ACCP Prime 2.0 Computer Science',
    institution: 'APTECH Pakistan',
    period: 'Dec 2021 - Dec 2024',
    details: 'Advanced computer software curriculum covering software engineering standards, database management system (DBMS), containerized hosting, and system administrator tools.',
    gpa: 'Distinction'
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'cert1',
    title: 'Certified Kubernetes Administrator (CKA) with Practice Tests',
    issuer: 'Udemy',
    date: 'Dec 2025',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg'
  },
  {
    id: 'cert2',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Jul 2025',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg'
  },
  {
    id: 'cert4',
    title: 'AWS Educate Introduction to Generative AI',
    issuer: 'Amazon Web Services',
    date: 'Mar 2025',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg'
  },
  {
    id: 'cert5',
    title: 'LFS158: Introduction to Kubernetes',
    issuer: 'The Linux Foundation',
    date: 'Jan 2025',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg'
  },
  {
    id: 'cert6',
    title: 'LFS101: Introduction to Linux',
    issuer: 'The Linux Foundation',
    date: 'Sep 2024',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg'
  },
  {
    id: 'cert7',
    title: 'Docker Training Course for the Absolute Beginner',
    issuer: 'KodeKloud',
    date: 'Sep 2024',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Docker_%28container_engine%29_logo.png'
  },
  {
    id: 'cert8',
    title: 'Introduction to Jenkins',
    issuer: 'The Linux Foundation',
    date: 'Jul 2024',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Jenkins_logo.svg'
  },
  {
    id: 'cert9',
    title: 'The Ultimate DevOps Bootcamp - 2023',
    issuer: 'Udemy',
    date: 'Jul 2023',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg'
  },
  {
    id: 'cert10',
    title: 'Linux Administration',
    issuer: 'Udemy',
    date: 'May 2022',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg'
  }
];
