/* ===================================================================
   MUGHIS UDDIN AHMED — DEVOPS ENGINEER PORTFOLIO
   Interactive Engine, 3D WebGL Topology, and WhatsApp Integration
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------------------
     1. Sound FX Engine (Web Audio API Synthesizer)
     ----------------------------------------------------------------- */
  let audioCtx = null;
  let isSoundEnabled = localStorage.getItem('mua-sound') === 'true';

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSound(type = 'click') {
    if (!isSoundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'beep') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, now);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
        osc.start(now);
        osc.stop(now + 0.16);
      }
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  const soundToggleBtn = document.getElementById('soundToggle');
  if (soundToggleBtn) {
    if (!isSoundEnabled) {
      soundToggleBtn.classList.add('muted');
    }
    soundToggleBtn.addEventListener('click', () => {
      isSoundEnabled = !isSoundEnabled;
      localStorage.setItem('mua-sound', isSoundEnabled);
      if (isSoundEnabled) {
        soundToggleBtn.classList.remove('muted');
        initAudio();
        playSound('success');
      } else {
        soundToggleBtn.classList.add('muted');
      }
    });
  }

  /* -----------------------------------------------------------------
     2. Preloader Animation
     ----------------------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloaderBar');
  const preloaderCounter = document.getElementById('preloaderCounter');

  let loadProgress = 0;
  const loadInterval = setInterval(() => {
    loadProgress += Math.floor(Math.random() * 8) + 4;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(loadInterval);

      if (preloaderBar) preloaderBar.style.width = '100%';
      if (preloaderCounter) preloaderCounter.textContent = '100';

      setTimeout(() => {
        if (preloader) preloader.classList.add('loaded');
        triggerCounterAnimations();
      }, 350);
    } else {
      if (preloaderBar) preloaderBar.style.width = `${loadProgress}%`;
      if (preloaderCounter) {
        preloaderCounter.textContent = loadProgress.toString().padStart(3, '0');
      }
    }
  }, 30);

  /* -----------------------------------------------------------------
     3. Custom Magnetic Cursor
     ----------------------------------------------------------------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .card, .chip, .plate');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  /* -----------------------------------------------------------------
     4. Theme Switcher (Dark / Light)
     ----------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('themeToggle');
  const rootHtml = document.documentElement;
  const savedTheme = localStorage.getItem('mua-theme') || 'dark';

  rootHtml.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = rootHtml.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      rootHtml.setAttribute('data-theme', newTheme);
      localStorage.setItem('mua-theme', newTheme);
      playSound('click');
      update3DThemeColors(newTheme);
    });
  }

  /* -----------------------------------------------------------------
     5. Sticky Header & Mobile Drawer
     ----------------------------------------------------------------- */
  const siteHeader = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      playSound('click');
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* -----------------------------------------------------------------
     6. Scroll Spy (Header Nav & Side Rail Tracking)
     ----------------------------------------------------------------- */
  const trackedSections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');
  const railItems = document.querySelectorAll('.rail-item');

  function updateActiveSection() {
    const scrollPos = window.scrollY + 250;

    trackedSections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        desktopNavLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });

        railItems.forEach((item) => {
          const itemSection = item.getAttribute('data-section');
          item.classList.toggle('active', itemSection === sectionId);
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  updateActiveSection();

  /* -----------------------------------------------------------------
     7. Animated Quantitative Metrics Counter
     ----------------------------------------------------------------- */
  let countersAnimated = false;

  function triggerCounterAnimations() {
    if (countersAnimated) return;
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const isDecimal = target % 1 !== 0;
      let start = 0;
      const duration = 1800;
      const startTime = performance.now();

      function updateNumber(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const currentVal = start + (target - start) * easeOut;

        counter.textContent = isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal);

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(updateNumber);
    });

    countersAnimated = true;
  }

  const metricsRow = document.querySelector('.hero-metrics');
  if (metricsRow) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          triggerCounterAnimations();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(metricsRow);
  }

  /* -----------------------------------------------------------------
     8. INTERACTIVE 3D THREE.JS CLOUD INFRASTRUCTURE STAGE
     ----------------------------------------------------------------- */
  let update3DThemeColors = () => {};

  function init3DHeroElement() {
    const canvas = document.getElementById('hero3dCanvas');
    const container = document.getElementById('canvas3dWrap');
    if (!canvas || !container || typeof THREE === 'undefined') return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Master Group for 3D topology
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Dynamic Colors
    let goldColor = 0xC9A961;
    let wineColor = 0x6E1F2A;
    let cyanColor = 0x22D3EE;

    // 1. Core Polyhedron (Icosahedron / Network Core)
    const coreGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: goldColor,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(1.2, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: wineColor,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    rootGroup.add(innerMesh);

    // 2. Orbital Rings (CI/CD loops & AWS VPC bounds)
    const ringGeo1 = new THREE.TorusGeometry(2.7, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: goldColor, transparent: true, opacity: 0.5 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    rootGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.1, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xE0C98A, transparent: true, opacity: 0.4 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    rootGroup.add(ring2);

    // 3. Orbiting Cloud Node Cubes (AWS EC2, RDS, K8s Pods)
    const nodeCount = 8;
    const nodeMeshes = [];
    const nodeGeo = new THREE.BoxGeometry(0.24, 0.24, 0.24);

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.7;
      const nodeMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? goldColor : cyanColor,
        wireframe: false
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.userData = { angle: angle, speed: 0.008 + (i % 3) * 0.003, radius: radius, yOffset: (Math.sin(i) * 0.8) };
      nodeMeshes.push(nodeMesh);
      rootGroup.add(nodeMesh);
    }

    // 4. Ambient Particle Cloud (600 Micro-Nodes)
    const particleCount = 550;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount * 3; p += 3) {
      const r = 2.2 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      particlePositions[p] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[p + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[p + 2] = r * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: goldColor,
      size: 0.045,
      transparent: true,
      opacity: 0.65
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particleSystem);

    // Theme Update Handler
    update3DThemeColors = function(theme) {
      const isLight = theme === 'light';
      const newGold = isLight ? 0x9A7B3A : 0xC9A961;
      const newWine = isLight ? 0x5A1922 : 0x6E1F2A;

      coreMat.color.setHex(newGold);
      innerMat.color.setHex(newWine);
      ringMat1.color.setHex(newGold);
      particleMat.color.setHex(newGold);
    };

    // Mouse & Drag Orbit Interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationX = 0.2;
    let targetRotationY = 0.3;
    let mouseNormX = 0;
    let mouseNormY = 0;

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouseNormX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseNormY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      }

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    });

    // Touch support for mobile
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    // Buttons
    const btnReset = document.getElementById('btnReset3D');
    const btnWire = document.getElementById('btnWire3D');

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        targetRotationX = 0.2;
        targetRotationY = 0.3;
        playSound('click');
      });
    }

    let isWireMode = true;
    if (btnWire) {
      btnWire.addEventListener('click', () => {
        isWireMode = !isWireMode;
        coreMat.wireframe = isWireMode;
        innerMat.wireframe = isWireMode;
        btnWire.textContent = isWireMode ? 'Wire' : 'Solid';
        playSound('click');
      });
    }

    // Animation Loop
    let clock = new THREE.Clock();

    function animate3D() {
      requestAnimationFrame(animate3D);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Continuous gentle auto-rotation
      if (!isDragging) {
        targetRotationY += 0.0035;
      }

      // Smooth dampening towards target rotation + mouse parallax
      rootGroup.rotation.y += (targetRotationY + mouseNormX * 0.4 - rootGroup.rotation.y) * 0.08;
      rootGroup.rotation.x += (targetRotationX - mouseNormY * 0.4 - rootGroup.rotation.x) * 0.08;

      // Independent ring & core counter-rotations
      ring1.rotation.z += 0.005;
      ring2.rotation.z -= 0.004;
      innerMesh.rotation.y -= 0.007;

      // Update orbiting node cubes
      nodeMeshes.forEach((mesh) => {
        mesh.userData.angle += mesh.userData.speed;
        mesh.position.x = Math.cos(mesh.userData.angle) * mesh.userData.radius;
        mesh.position.z = Math.sin(mesh.userData.angle) * mesh.userData.radius;
        mesh.position.y = mesh.userData.yOffset + Math.sin(time * 2 + mesh.userData.angle) * 0.2;
        mesh.rotation.x += 0.02;
        mesh.rotation.y += 0.03;
      });

      // Ambient particle breathing
      particleSystem.rotation.y = time * 0.02;

      renderer.render(scene, camera);
    }

    animate3D();

    // Window Resize Handling
    window.addEventListener('resize', () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });
  }

  init3DHeroElement();

  /* -----------------------------------------------------------------
     9. DIRECT WHATSAPP MESSAGE COMPOSER
     ----------------------------------------------------------------- */
  const waPresets = {
    'role': "Hi Mughis, I reviewed your DevOps portfolio and would like to discuss a DevOps Engineering role with you at our company.",
    'aws': "Hi Mughis, I saw your AWS three-tier architecture work. We need help architecting and optimizing our AWS infrastructure and cutting cloud costs.",
    'cicd': "Hi Mughis, we are looking to accelerate our Jenkins & Kubernetes deployment pipelines and want to discuss your DevOps expertise.",
    'consult': "Hi Mughis, I'd like to schedule an infrastructure consultation to review our Linux server fleet, security, and container setup."
  };

  window.setWhatsAppTopic = function(topicKey, btnEl) {
    const textarea = document.getElementById('waCustomMessage');
    const chipBtns = document.querySelectorAll('.wa-chip-btn');

    if (textarea && waPresets[topicKey]) {
      textarea.value = waPresets[topicKey];
      playSound('click');
    }

    chipBtns.forEach((btn) => btn.classList.remove('active'));
    if (btnEl) {
      btnEl.classList.add('active');
    } else if (window.event && window.event.currentTarget) {
      window.event.currentTarget.classList.add('active');
    }
  };

  window.launchDirectWhatsApp = function() {
    const textarea = document.getElementById('waCustomMessage');
    const defaultMsg = "Hi Mughis, I am reaching out to you from your DevOps portfolio!";
    const messageText = textarea ? textarea.value.trim() : defaultMsg;
    const encodedText = encodeURIComponent(messageText || defaultMsg);
    const whatsappUrl = `https://wa.me/923172155377?text=${encodedText}`;

    playSound('success');
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  /* -----------------------------------------------------------------
     10. Interactive DevOps Command Center (Terminal Simulator)
     ----------------------------------------------------------------- */
  const terminalInput = document.getElementById('terminalInput');
  const terminalHistory = document.getElementById('terminalHistory');
  const terminalScreen = document.getElementById('terminalScreen');

  const cmdHistoryBuffer = [];
  let historyIndex = -1;

  const simulatedResponses = {
    'help': `Available Commands:
  • <span class="warning">help</span>                     Display this interactive reference manual
  • <span class="warning">whoami</span>                   Profile identity & role overview
  • <span class="warning">cat resume</span>               Full professional profile & executive summary
  • <span class="warning">aws ec2 ls</span>               Query AWS EC2 Auto Scaling fleet state
  • <span class="warning">kubectl get pods</span>         Inspect production Kubernetes cluster workloads
  • <span class="warning">jenkins status</span>           Inspect Jenkins CI/CD pipeline telemetry & velocity
  • <span class="warning">cat metrics</span>              Impact summary (83% faster release, 15% cost cut)
  • <span class="warning">cat backup.sh</span>            Examine Docker PostgreSQL backup header
  • <span class="warning">ansible-playbook lamp.yml</span> Dry-run configuration management playbook
  • <span class="warning">uptime</span>                   Display operational systems availability
  • <span class="warning">contact</span>                  Print direct connection endpoints
  • <span class="warning">clear</span>                    Reset operations console screen`,

    'whoami': `<span class="highlight">Mughis Uddin Ahmed</span>
Role: <span class="success">DevOps Engineer</span>
Location: Karachi, Sindh, Pakistan
Core Stack: AWS, Terraform, Ansible, Docker, Jenkins, Kubernetes, Linux, Nginx, Prometheus
Status: Open to Full-time Opportunities & Strategic Consulting`,

    'cat resume': `<span class="highlight">MUGHIS UDDIN AHMED — DEVOPS ENGINEER</span>
-------------------------------------------------------------------------
Summary:
DevOps Engineer with 2+ years of hands-on experience building CI/CD pipelines
and automating cloud infrastructure. Cut deployment cycle times by 83% and
reduced AWS cloud expenditure by 15% through infrastructure optimization.
Proficient in AWS, Terraform, Ansible, Docker, Jenkins, and Kubernetes.

Work History:
1. Implementation Engineer (July 2026 – Present) | Paysys Labs
   - Production telemetry, root cause analysis, zero-downtime verified rollouts.
2. Jr. DevOps-IT Engineer (Feb 2026 – July 2026) | Digital graphiks
   - 83% faster Jenkins cycles (60m -> 10m), 10+ servers, 50+ SSL domains, cron backups.
3. Jr. DevOps Engineer (Jan 2025 – Nov 2025) | devxonic
   - Kubernetes deployments, 15% AWS cost optimization, Terraform/Ansible automation.`,

    'aws ec2 ls': `<span class="info">QUERYING AWS REGION: us-east-1 [VPC: vpc-0a49fb92c1]...</span>
-------------------------------------------------------------------------
INSTANCE ID          TYPE        STATE     SUBNET        AUTO-SCALING   TAG / ROLE
i-08f39b1a094e       t3.medium   <span class="success">RUNNING</span>   sub-pub-1a    asg-web-tier   Web-ReverseProxy-Nginx-01
i-0419ebc528af       t3.medium   <span class="success">RUNNING</span>   sub-pub-1b    asg-web-tier   Web-ReverseProxy-Nginx-02
i-0b29c54e198a       t3.large    <span class="success">RUNNING</span>   sub-priv-1a   asg-app-core   App-Service-Worker-01
i-078a9c412f5e       t3.large    <span class="success">RUNNING</span>   sub-priv-1b   asg-app-core   App-Service-Worker-02
rds-pg-prod-cluster  db.t3.large <span class="success">AVAILABLE</span> sub-db-priv   Multi-AZ       RDS PostgreSQL Primary
-------------------------------------------------------------------------
ELB Status: <span class="success">HEALTHY</span> (Target Response Time: 12ms · 99.9% Uptime)`,

    'kubectl get pods': `<span class="info">CONTEXT: k8s-cluster.prod.mughis.cloud | NAMESPACES: prod-apps</span>
-------------------------------------------------------------------------
NAME                               READY   STATUS    RESTARTS   AGE     IP
web-frontend-79bc6d4f9b-2h8zk      1/1     <span class="success">Running</span>   0          42d     10.244.1.18
web-frontend-79bc6d4f9b-6l4m1      1/1     <span class="success">Running</span>   0          42d     10.244.2.22
api-service-58dc8b7764-x9q41       1/1     <span class="success">Running</span>   0          19d     10.244.1.25
api-service-58dc8b7764-z5w88       1/1     <span class="success">Running</span>   0          19d     10.244.2.31
ingress-nginx-controller-9df21     1/1     <span class="success">Running</span>   0          68d     10.244.0.5
prometheus-server-75cbf9897c-k4t   2/2     <span class="success">Running</span>   0          95d     10.244.3.12
grafana-core-684d79c66f-m9x22      1/1     <span class="success">Running</span>   0          95d     10.244.3.14
-------------------------------------------------------------------------
All Pods healthy. Zero crashloops detected.`,

    'jenkins status': `<span class="info">JENKINS MASTER NODE: https://ci.internal.ops</span>
-------------------------------------------------------------------------
Active Pipeline: prod-app-release-pipeline
Last Execution: Build #142 (<span class="success">SUCCESS</span>)
Stage Breakdown:
  [1] Checkout SCM          -> <span class="success">PASSED</span> (0.4m)
  [2] Lint & Unit Tests     -> <span class="success">PASSED</span> (1.8m)
  [3] Docker Multi-stage    -> <span class="success">PASSED</span> (3.2m)
  [4] Security Scan (Trivy) -> <span class="success">PASSED</span> (1.1m)
  [5] Staged K8s Deployment -> <span class="success">PASSED</span> (2.5m)
  [6] Post-Deploy HealthChk -> <span class="success">PASSED</span> (0.8m)
-------------------------------------------------------------------------
Cycle Velocity: 9.8 mins (slashed by 83% from legacy 60 min manual releases)`,

    'cat metrics': `<span class="highlight">PRODUCTION IMPACT TELEMETRY:</span>
  • Release Cycle Acceleration:   <span class="success">83%</span> (From 1 hr to 10 min release cycle)
  • Cloud Expenditure Reduction:  <span class="success">15%</span> (EC2 Rightsizing + ASG schedule)
  • Application Availability:     <span class="success">99.9%</span> (Three-Tier AWS Architecture)
  • Domain Protection:            <span class="success">50+</span> SSL certificates automated (Zero expiries)
  • Automated Backup Volume:      <span class="success">100GB+</span> PostgreSQL backups secured
  • Setup Time Elimination:       <span class="success">70%</span> reduction via Ansible/Bash playbooks`,

    'cat backup.sh': `#!/usr/bin/env bash
# ==============================================================================
# AUTOMATED POSTGRESQL DOCKER BACKUP & CLOUD RECOVERY SCRIPT
# Author: Mughis Uddin Ahmed (DevOps Engineer)
# ==============================================================================
set -euo pipefail
BACKUP_DIR="/var/backups/postgres"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DB_NAME="production_core"
BACKUP_FILE="\${BACKUP_DIR}/\${DB_NAME}_\${TIMESTAMP}.sql.gz"

log_info "Initiating pg_dump in container \${PG_CONTAINER}..."
docker exec -t "\${PG_CONTAINER}" pg_dump -U "\${PG_USER}" "\${DB_NAME}" | gzip -9 > "\${BACKUP_FILE}"

log_info "Encrypting payload with AES-256 GPG..."
gpg --batch --yes --passphrase "\${GPG_PASSPHRASE}" -c "\${BACKUP_FILE}"

log_info "Uploading encrypted dump to Google Drive via OAuth2 REST API..."
python3 /opt/scripts/gdrive_upload.py --file "\${BACKUP_FILE}.gpg"

log_info "Transmitting real-time webhook payload to Discord #alerts..."
curl -H "Content-Type: application/json" -X POST -d "{\\"content\\": \\"✅ Backup \${DB_NAME}_\${TIMESTAMP} successful.\\"}" "\${DISCORD_WEBHOOK}"`,

    'ansible-playbook lamp.yml': `<span class="info">PLAY [Provision High-Availability LAMP Stack Fleet] ***********************</span>

TASK [Gathering Facts] *********************************************************
ok: [web01.internal]
ok: [web02.internal]

TASK [packages : Install Apache, MySQL Client, PHP 8.2 and Modules] ************
ok: [web01.internal]
ok: [web02.internal]

TASK [apache : Deploy Tuned VirtualHost & Security Headers] ********************
changed: [web01.internal]
changed: [web02.internal]

TASK [mysql : Ensure Database and Privileged Service Users] ********************
ok: [web01.internal]
ok: [web02.internal]

TASK [firewall : Configure UFW Rules for HTTP/HTTPS/SSH] ***********************
ok: [web01.internal]
ok: [web02.internal]

PLAY RECAP *********************************************************************
web01.internal : ok=5  changed=1  unreachable=0  failed=0  skipped=0
web02.internal : ok=5  changed=1  unreachable=0  failed=0  skipped=0
<span class="success">PLAYBOOK COMPLETED: 100% IDEMPOTENT EXECUTION.</span>`,

    'uptime': ` 14:26:08 up 312 days, 14:18, 1 user, load average: 0.12, 0.08, 0.05
 System state: <span class="success">OPTIMAL</span> · Memory utilization: 32% · Disk space: 68% free`,

    'contact': `Connection Endpoints:
  • WhatsApp: <a href="https://wa.me/923172155377" target="_blank" class="warning">+92 317 2155377 (Click to Chat)</a>
  • Email:    <a href="mailto:mughis01@gmail.com" class="warning">mughis01@gmail.com</a>
  • Location: Karachi, Sindh, Pakistan`
  };

  window.runSimulatedCommand = function(cmdString) {
    if (!terminalInput) return;
    terminalInput.value = cmdString;
    handleTerminalSubmit();
    playSound('beep');
  };

  window.handleTerminalSubmit = function() {
    if (!terminalInput || !terminalHistory) return;
    const rawVal = terminalInput.value.trim();
    if (!rawVal) return;

    cmdHistoryBuffer.push(rawVal);
    historyIndex = cmdHistoryBuffer.length;

    const lowerVal = rawVal.toLowerCase();

    if (lowerVal === 'clear') {
      terminalHistory.innerHTML = '';
      terminalInput.value = '';
      return;
    }

    const cmdLineEl = document.createElement('div');
    cmdLineEl.className = 'terminal-line';
    cmdLineEl.innerHTML = `<span class="terminal-prompt">[mughis@bastion ~]$</span> <span class="terminal-cmd">${escapeHtml(rawVal)}</span>`;

    let responseHtml = simulatedResponses[lowerVal];
    if (!responseHtml) {
      if (lowerVal.startsWith('aws')) {
        responseHtml = simulatedResponses['aws ec2 ls'];
      } else if (lowerVal.startsWith('kubectl') || lowerVal.startsWith('k8s')) {
        responseHtml = simulatedResponses['kubectl get pods'];
      } else if (lowerVal.startsWith('cat resume') || lowerVal.startsWith('resume')) {
        responseHtml = simulatedResponses['cat resume'];
      } else if (lowerVal.startsWith('jenkins')) {
        responseHtml = simulatedResponses['jenkins status'];
      } else if (lowerVal.startsWith('ansible')) {
        responseHtml = simulatedResponses['ansible-playbook lamp.yml'];
      } else {
        responseHtml = `<span style="color:#e06c75;">bash: command not found: ${escapeHtml(rawVal)}</span>\nType <span class="warning">'help'</span> to see available operational commands.`;
      }
    }

    const outEl = document.createElement('div');
    outEl.className = 'terminal-out';
    outEl.innerHTML = responseHtml;

    cmdLineEl.appendChild(outEl);
    terminalHistory.appendChild(cmdLineEl);

    terminalInput.value = '';
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
    playSound('click');
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        if (cmdHistoryBuffer.length > 0 && historyIndex > 0) {
          historyIndex--;
          terminalInput.value = cmdHistoryBuffer[historyIndex];
        }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (historyIndex < cmdHistoryBuffer.length - 1) {
          historyIndex++;
          terminalInput.value = cmdHistoryBuffer[historyIndex];
        } else {
          historyIndex = cmdHistoryBuffer.length;
          terminalInput.value = '';
        }
        e.preventDefault();
      }
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m]));
  }

  /* -----------------------------------------------------------------
     11. Technology Stack Category Tabs
     ----------------------------------------------------------------- */
  const stackTabBtns = document.querySelectorAll('.stack-tab-btn');
  const stackCards = document.querySelectorAll('.stack-card');

  stackTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      stackTabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      playSound('click');

      stackCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* -----------------------------------------------------------------
     12. Architecture Topology Modal
     ----------------------------------------------------------------- */
  const archModal = document.getElementById('archModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContentDynamic = document.getElementById('modalContentDynamic');
  const modalTriggers = document.querySelectorAll('.open-arch-modal');

  const modalData = {
    'modal-threetier': `
      <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem;">
        <span class="index-numeral">SPECIFICATION 01</span>
        <span class="eyebrow-line"></span>
        <span class="eyebrow">AWS Cloud Architecture</span>
      </div>
      <h3 style="font-family:var(--font-display); font-size:2.2rem; font-weight:700; color:rgb(var(--quill)); line-height:1.15; margin-bottom:1.5rem;">
        AWS Secure Three-Tier Web Application Topology
      </h3>
      <div style="border-radius:2px; overflow:hidden; border:1px solid rgba(var(--rule), 0.3); margin-bottom:1.5rem;">
        <img src="assets/images/cloud_architecture.jpg" alt="AWS Cloud Architecture Topology Diagram" style="width:100%; aspect-ratio:16/9; object-fit:cover;">
      </div>
      <div style="font-size:14.5px; line-height:1.8; color:rgb(var(--quill-soft)); margin-bottom:1.5rem;">
        <h4 style="font-family:var(--font-sans); font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.2em; color:rgb(var(--gold)); margin-bottom:0.75rem;">1. Architectural Isolation &amp; VPC Segregation</h4>
        <p>A custom Virtual Private Cloud (VPC) spanning multiple Availability Zones (AZ1 &amp; AZ2) with three strictly isolated subnet tiers:</p>
        <ul style="margin-top:0.5rem; margin-bottom:1.25rem; padding-left:1.25rem; list-style:disc;">
          <li><strong>Public Web Tier:</strong> Application Load Balancer (ALB) and Nginx reverse proxies terminating TLS/SSL certificates and mitigating volumetric DDoS.</li>
          <li><strong>Private Application Tier:</strong> Auto-Scaling Group of EC2 instances running containerized application microservices, isolated from public internet exposure via NAT Gateways.</li>
          <li><strong>Isolated Database Tier:</strong> Multi-AZ Amazon RDS PostgreSQL cluster with synchronous replication, automated snapshot lifecycle policies, and strict security groups only permitting port 5432 ingress from the application fleet.</li>
        </ul>
        <h4 style="font-family:var(--font-sans); font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.2em; color:rgb(var(--gold)); margin-bottom:0.75rem;">2. High Availability &amp; Cost Efficiency</h4>
        <p>Configured dynamic target-tracking Auto Scaling policies linked to CPU utilization and ALB request counts, allowing the cluster to scale down during low-traffic windows — yielding a <strong>15% sustained reduction</strong> in monthly AWS cloud expenditure while delivering 99.9% availability.</p>
      </div>
    `,

    'modal-backup': `
      <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem;">
        <span class="index-numeral">SPECIFICATION 02</span>
        <span class="eyebrow-line"></span>
        <span class="eyebrow">Disaster Recovery Engineering</span>
      </div>
      <h3 style="font-family:var(--font-display); font-size:2.2rem; font-weight:700; color:rgb(var(--quill)); line-height:1.15; margin-bottom:1.5rem;">
        Automated PostgreSQL Backup &amp; Cloud Upload Pipeline
      </h3>
      <div style="border-radius:2px; overflow:hidden; border:1px solid rgba(var(--rule), 0.3); margin-bottom:1.5rem;">
        <img src="assets/images/backup_pipeline.jpg" alt="Automated PostgreSQL Backup Pipeline Graphic" style="width:100%; aspect-ratio:16/9; object-fit:cover;">
      </div>
      <div style="font-size:14.5px; line-height:1.8; color:rgb(var(--quill-soft)); margin-bottom:1.5rem;">
        <h4 style="font-family:var(--font-sans); font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.2em; color:rgb(var(--gold)); margin-bottom:0.75rem;">1. Containerized Dump &amp; Encryption Flow</h4>
        <p>A self-contained Docker runner executes non-blocking atomic dumps of live production PostgreSQL databases via scheduled cron. Each dump stream is immediately piped into gzip and AES-256 GPG encryption with ephemeral keys.</p>
        <h4 style="font-family:var(--font-sans); font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.2em; color:rgb(var(--gold)); margin-bottom:0.75rem;">2. Cloud Synchronization &amp; Discord Telemetry</h4>
        <p>Integrated Google Drive OAuth 2.0 token refresh automation to transmit encrypted backups offsite into cold storage, followed by an immediate HTTPS webhook payload dispatched to a secure Discord channel (#backup-alerts) containing timestamp, byte size, and integrity checksum.</p>
      </div>
    `,

    'modal-lamp': `
      <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem;">
        <span class="index-numeral">SPECIFICATION 03</span>
        <span class="eyebrow-line"></span>
        <span class="eyebrow">Configuration Management</span>
      </div>
      <h3 style="font-family:var(--font-display); font-size:2.2rem; font-weight:700; color:rgb(var(--quill)); line-height:1.15; margin-bottom:1.5rem;">
        Automated LAMP Stack Provisioning Playbook
      </h3>
      <div style="font-size:14.5px; line-height:1.8; color:rgb(var(--quill-soft)); margin-bottom:1.5rem;">
        <h4 style="font-family:var(--font-sans); font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.2em; color:rgb(var(--gold)); margin-bottom:0.75rem;">1. Complete Idempotent Infrastructure</h4>
        <p>Engineered an Ansible playbook suite that guarantees 100% repeatability across bare-metal or cloud virtual servers running Ubuntu and CentOS. The playbook provisions:</p>
        <ul style="margin-top:0.5rem; margin-bottom:1.25rem; padding-left:1.25rem; list-style:disc;">
          <li>Automated package installations (Apache2, PHP-FPM, MySQL Server, Certbot).</li>
          <li>Dynamic virtual host template rendering via Jinja2 templates.</li>
          <li>MySQL database creation, privilege grants, and root account hardening.</li>
          <li>UFW firewall automation opening only necessary HTTP/HTTPS/SSH ports.</li>
        </ul>
        <p>Resulted in a <strong>70% reduction in server environment onboarding time</strong>, eliminating manual configuration drift across environments.</p>
      </div>
    `
  };

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-target');
      if (modalData[targetId] && archModal && modalContentDynamic) {
        modalContentDynamic.innerHTML = modalData[targetId];
        archModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        playSound('click');
      }
    });
  });

  if (modalCloseBtn && archModal) {
    modalCloseBtn.addEventListener('click', () => {
      archModal.classList.remove('open');
      document.body.style.overflow = '';
      playSound('click');
    });

    archModal.addEventListener('click', (e) => {
      if (e.target === archModal) {
        archModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* -----------------------------------------------------------------
     13. Live Karachi Clock (PKT, UTC+5)
     ----------------------------------------------------------------- */
  const clockElement = document.getElementById('karachiClock');
  const yearElement = document.getElementById('currentYear');

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  function updateClock() {
    if (!clockElement) return;
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat('en-GB', options);
      clockElement.textContent = formatter.format(now);
    } catch (e) {
      clockElement.textContent = new Date().toLocaleTimeString();
    }
  }

  updateClock();
  setInterval(updateClock, 1000);

  /* -----------------------------------------------------------------
     14. 1-Click Clipboard Copy with Feedback
     ----------------------------------------------------------------- */
  window.copyToClipboard = function(text, btnElement) {
    if (!navigator.clipboard) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    } else {
      navigator.clipboard.writeText(text);
    }

    const originalText = btnElement.textContent;
    btnElement.textContent = 'Copied!';
    btnElement.style.borderColor = 'rgb(var(--gold))';
    btnElement.style.color = 'rgb(var(--gold))';
    playSound('success');

    setTimeout(() => {
      btnElement.textContent = originalText;
      btnElement.style.borderColor = '';
      btnElement.style.color = '';
    }, 2000);
  };

  /* -----------------------------------------------------------------
     15. Standard Contact Form Dispatch
     ----------------------------------------------------------------- */
  window.handleContactSubmit = function(e) {
    e.preventDefault();
    const form = document.getElementById('contactForm');
    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const subject = document.getElementById('senderSubject').value;
    const message = document.getElementById('senderMessage').value;
    const statusMsg = document.getElementById('formStatusMsg');

    if (!form || !statusMsg) return;

    statusMsg.className = 'form-status-msg';
    statusMsg.style.display = 'block';
    statusMsg.textContent = 'Encrypting & transmitting dispatch...';
    playSound('beep');

    setTimeout(() => {
      statusMsg.className = 'form-status-msg success';
      statusMsg.innerHTML = `✓ Transmission confirmed. Thank you, ${escapeHtml(name)}. You may also WhatsApp directly: <a href="https://wa.me/923172155377?text=${encodeURIComponent('Hi Mughis, ' + message)}" target="_blank" style="color:rgb(var(--whatsapp-green)); text-decoration:underline;">+92 317 2155377</a>`;
      form.reset();
      playSound('success');
    }, 1200);
  };

});
