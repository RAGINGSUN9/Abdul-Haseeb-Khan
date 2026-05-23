import { Skill, Project, TimelineItem } from './types';

export const skillsData: Skill[] = [
  // Cybersecurity
  {
    name: "Penetration Testing",
    category: "security",
    level: 90,
    description: "Ethical hacking of web applications, localized networks, and system endpoints.",
    tags: ["Metasploit", "Nmap", "Burp Suite", "OWASP Top 10"]
  },
  {
    name: "OSINT Techniques",
    category: "security",
    level: 85,
    description: "Collecting and analyzing public intelligence vectors and tracing digital footprints.",
    tags: ["Metadata Analysis", "Social Engineering Audits", "EXIF Data extraction"]
  },
  {
    name: "Network & Wireless Audit",
    category: "security",
    level: 80,
    description: "Analyzing packet streams, handshake captures, and auditing router credentials.",
    tags: ["Wireshark", "Aircrack-ng", "WPA3 protocols", "Deauth mitigation"]
  },
  {
    name: "CTF & Exploit Theory",
    category: "security",
    level: 85,
    description: "Participating in capture-the-flags, reverse engineering, and simple binary exploits.",
    tags: ["Crypto", "Reverse Engineering", "Privilege Escalation", "Python scripting"]
  },

  // AI & Data Science
  {
    name: "Machine Learning Models",
    category: "ai",
    level: 85,
    description: "Implementing and training algorithms for pattern recognition and intrusion detection.",
    tags: ["TensorFlow", "Scikit-Learn", "Keras", "Predictive Analytics"]
  },
  {
    name: "Neural Networks & Deep Learning",
    category: "ai",
    level: 75,
    description: "Building neural topologies to classify threat categories or automate anomaly detection.",
    tags: ["CNNs", "NLP", "PyTorch", "Model Evaluation"]
  },
  {
    name: "Data Pipelines & Analysis",
    category: "ai",
    level: 80,
    description: "Cleaning and exploring massive network traffic arrays to find outliers.",
    tags: ["Pandas", "NumPy", "Matplotlib", "Data Wrangling"]
  },

  // Development & Automation
  {
    name: "Python Automation",
    category: "dev",
    level: 90,
    description: "Writing lightweight, reliable tools, threat scrapers, and raw network sockets.",
    tags: ["Asynchronous Requesting", "Scapy", "CLI design", "BeautifulSoup"]
  },
  {
    name: "Secure PHP/Web backend",
    category: "dev",
    level: 80,
    description: "Hardening databases, preventing common cross-site scripts and parameter tampers.",
    tags: ["PDO", "Session Management", "XSS Defenses", "Bcrypt Hashing"]
  },
  {
    name: "Bash & Linux Systems",
    category: "dev",
    level: 85,
    description: "Configuring hardened environments, writing shell automation, managing access controls.",
    tags: ["Linux Commands", "Hardening", "Cron Jobs", "Iptables"]
  }
];

export const projectsData: Project[] = [
  {
    id: "network-client-monitor",
    title: "Network Client Monitor",
    category: "security",
    description: "A lightweight network scanner built to capture active LAN devices and identify rogue clients.",
    detailDescription: "A specialized network auditing script that maps a Local Area Network (LAN). It listens for active host ARP responses, matches physical MAC addresses with their respective local IP allocations, and performs cross-checking against a secure known-hosts JSON manifest. It flags unconfirmed MACs, serving as a first defense against physical LAN intrusion or unauthorized router utilization.",
    tags: ["Network Security", "Python", "Raw Sockets", "LAN Audit"],
    githubUrl: "https://github.com/ragingsun9/Network-Client-Monitor",
    keyFeatures: [
      "Utilizes raw socket frames to broadcast ARP requests recursively",
      "Dynamic device validation against an authorized host whitelist",
      "Generates continuous polling logs to track connection duration metrics",
      "Designed for low-resource headless Linux environments (Raspberry Pi)"
    ],
    architecture: "Python 3 backend leveraging Scapy for packet assembly and parsing, with robust JSON configuration states.",
    terminalCommandDemo: "python network_monitor.py --interface eth0 --whitelist authorized.json",
    codeSnippet: `import scapy.all as scapy

def scan_subnet(subnet_ip):
    # Craft an ARP Request to the broadcast address
    arp_req = scapy.ARP(pdst=subnet_ip)
    broadcast = scapy.Ether(dst="ff:ff:ff:ff:ff:ff")
    combined_packet = broadcast / arp_req
    
    # Broadcast and collect answered hosts
    answered = scapy.srp(combined_packet, timeout=1.5, verbose=False)[0]
    
    clients = []
    for sent, received in answered:
        clients.append({
            "ip": received.psrc,
            "mac": received.hwsrc
        })
    return clients`
  },
  {
    id: "ghost-trace-research",
    title: "Ghost-Trace-Research",
    category: "security",
    description: "Advanced OSINT tool designed to scrape, extract, and analyze target digital footmarks and meta-data.",
    detailDescription: "Ghost-Trace-Research is an open-source intelligence (OSINT) suite designed for forensic research of social profiles, images, and user aliases. It scans up to 80 online platforms using high-speed async HTTP, searching for footprint intersections. Additionally, it features an embedded EXIF JPEG parser which targets coordinates embedded inside files and parses GPS metadata automatically, plotting them to reveal digital habits.",
    tags: ["OSINT", "Metadata Parsing", "Python", "Anti-Scraping Bypass"],
    githubUrl: "https://github.com/ragingsun9/Ghost-Trace-Research",
    keyFeatures: [
      "Executes concurrent non-blocking lookup pipelines for username availability check",
      "Extracts nested camera models, system timestamps, and embedded GPS coordinates",
      "Includes configurable delays and random user-agent profiles to circumvent IP restrictions",
      "Presents final analytical results in a clean console layout or markdown summaries"
    ],
    architecture: "Python with asyncio & aiohttp for high-velocity scraping, and Pillow (PIL) for forensic image segment reading.",
    terminalCommandDemo: "python ghost_trace.py --target suspicious_user --exif suspicious_pic.jpg",
    codeSnippet: `import asyncio
import aiohttp
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS

async def check_platform(session, url, username):
    target = url.format(username)
    try:
      async with session.get(target, timeout=5) as response:
          if response.status == 200:
              return {"platform": url.split('.')[1], "exists": True, "url": target}
    except Exception:
        pass
    return None`
  },
  {
    id: "php-secure-login",
    title: "PHP Secure Login System",
    category: "dev",
    description: "Production-ready authentication system featuring bcrypt hashing, CSRF shields, and session security.",
    detailDescription: "A security-first, robust PHP backend architecture designed for bulletproof user management. Created specifically to demonstrate structural remedies to the OWASP Top 10 vulnerabilities. Refrains from static query execution by using prepared statements, integrates multi-layer session token checks, rate-limits brute force attempts, and encrypts all passwords with modern industry standards.",
    tags: ["Web Security", "PHP Secure Development", "MySQL PDO", "Session Hardening"],
    githubUrl: "https://github.com/ragingsun9/PHP-Secure-Login-System",
    keyFeatures: [
      "Password hashing using native robust bcrypt (PASSWORD_BCRYPT) configurations",
      "SQL Injection validation using PHP PDO prepared statements strictly",
      "Unique cryptographically secure CSRF token issuance per session",
      "Rate-limiting mechanism logs failed trials to freeze compromised accounts temporarily"
    ],
    architecture: "PHP 8, MySQL with strict PDO handles, secure cookie flag declarations (HttpOnly, Secure, SameSite=Strict).",
    terminalCommandDemo: "composer install && php -S localhost:8000",
    codeSnippet: `// Hardening session initialization
function start_secure_session() {
    ini_set('session.use_only_cookies', 1);
    ini_set('session.use_strict_mode', 1);
    
    session_set_cookie_params([
        'lifetime' => 1800,
        'path' => '/',
        'domain' => '',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Strict'
    ]);
    
    session_start();
    session_regenerate_id(true);
}`
  },
  {
    id: "wifi-security-toolkit",
    title: "WiFi Security Toolkit",
    category: "security",
    description: "A consolidated shell script utility to audit and evaluate local wireless system encryption levels.",
    detailDescription: "Designed for certified penetration testers to conduct authorized signal auditing. This script maps wireless interfaces to monitoring states, parses nearby target networks, automates physical de-authentication broadcasts to capture handshakes, and provides interactive tools for auditing password strength using robust dictionaries.",
    tags: ["Wireless Security", "Bash scripting", "Handshake Audit", "Linux Terminal"],
    githubUrl: "https://github.com/ragingsun9/WiFi-Security-Toolkit",
    keyFeatures: [
      "Automated wireless interface conversion to 'Monitor Mode'",
      "Targeted continuous de-authentication stream targeting designated client MACs",
      "WPA/WPA2 capture verifying tools, validating handshakes on the fly",
      "Unified simple menu-driven shell format for quick command executions"
    ],
    architecture: "Pure Unix Bash shell scripting acting as a secure interface to aircrack-ng, wash, and tshark binaries.",
    terminalCommandDemo: "sudo ./wifi_toolkit.sh --interface wlan0mon --scan",
    codeSnippet: `# Convert interface to monitor mode securely
enable_monitor_mode() {
    local dev=$1
    echo "[*] Unblocking soft blocks on wireless devices..."
    rfkill unblock wifi
    echo "[*] Terminating conflicting background processes..."
    airmon-ng check kill
    echo "[*] Activating monitor mode on \${dev}..."
    airmon-ng start \${dev}
    echo "[+] Wireless card configured on: \${dev}mon"
}`
  },
  {
    id: "ctf-automation-scripts",
    title: "CTF Automation Scripts",
    category: "security",
    description: "Exploitation and scripting suite for rapid flag capture in competitive cybersecurity labs.",
    detailDescription: "A personal repository of battle-tested automation routines configured for Jeopardy-style Capture The Flag (CTF) challenges. Includes tools for mathematical modular decryption, automated base conversion, EXIF parsing loops, rot13/rot47 routines, dynamic buffer calculation payloads, and socket listeners for binary remote interactions.",
    tags: ["CTF Hacking", "Python Automation", "Binary exploitation", "Cryptography"],
    githubUrl: "https://github.com/ragingsun9/CTF-Automation-Scripts",
    keyFeatures: [
      "Automated brute-force wordlists testing for simple web form paths",
      "Payload construction library for stack overflow parameter testing (pwntools wrappers)",
      "Multi-byte XOR cipher solver with automatic dictionary validation checkers",
      "Interactive multi-client socket listener scripts"
    ],
    architecture: "Python 3 script collection, customizable, utilizing pwntools, requests, and PyCryptodome packages.",
    terminalCommandDemo: "python ctf_helpers.py --crypt-xor --input enc_data.hex --key brute",
    codeSnippet: `def xor_brute(ciphertext_bytes):
    # Try XORing against all single-byte keys
    for key in range(256):
        decrypted = bytes([b ^ key for b in ciphertext_bytes])
        try:
            text = decrypted.decode('utf-8')
            # Check if common English dictionary flags are found
            if "flag" in text.lower() or "ctf" in text.lower():
                print(f"[+] Found Match with Key: {hex(key)}")
                print(f"    Payload: {text}")
        except UnicodeDecodeError:
            continue`
  },
  {
    id: "web-vulnerability-scanner",
    title: "Web Vulnerability Scanner",
    category: "security",
    description: "Multi-threaded scanner inspecting web forms for directory structures and header security anomalies.",
    detailDescription: "An analytical Python tool developed to search web hosts for architectural lapses. Inspects HTTP response headers for missing security-centric parameters (X-Frame-Options, Content-Security-Policy, HSTS), searches directories for server backup assets (.git, .bak, config.php), and audits active parameters for basic DOM cross-site (XSS) reflection vulnerabilities.",
    tags: ["Security Audit", "OWASP 10 Scanner", "Python Requests", "Header Audit"],
    githubUrl: "https://github.com/ragingsun9/Web-Vulnerability-Scanner",
    keyFeatures: [
      "Concurrent directory scanner with customizable thread allocations",
      "Analyzes response codes recursively (identifying 301, 403, 200 outputs)",
      "Checks security parameters (HSTS, secure cookie guidelines, Referrer directives)",
      "Simple HTML report generation module mapping security risk indices"
    ],
    architecture: "Python with multi-threading architectures (ThreadPoolExecutor) and robust TLS request validations.",
    terminalCommandDemo: "python web_scanner.py --url https://example.com --threads 10 --headers-check",
    codeSnippet: `import requests
from concurrent.futures import ThreadPoolExecutor

REQUIRED_HEADERS = ["Content-Security-Policy", "X-Frame-Options", "Strict-Transport-Security"]

def audit_security_headers(target_url):
    try:
        response = requests.head(target_url, timeout=5, allow_redirects=True)
        headers = response.headers
        vulnerabilities = []
        for req in REQUIRED_HEADERS:
            if req not in headers:
                vulnerabilities.append({
                    "severity": "Medium",
                    "issue": f"Missing critical header: {req}",
                    "remediation": "Configure web server to issue this header on all responses."
                })
        return vulnerabilities
    except Exception as e:
        return [{"severity": "Error", "issue": str(e)}]`
  }
];

export const timelineData: TimelineItem[] = [
  {
    period: "2024 - Present",
    title: "BS Artificial Intelligence",
    subtitle: "Undergraduate Degree",
    description: "Deep dive into machine learning models, statistical neural networks, artificial intelligence ethics, and complex computational cybersecurity applications. Combining algorithmic development with security defenses.",
    type: "education",
    badges: ["Machine Learning", "Neural Nets", "Python", "Data Structure"]
  },
  {
    period: "Ongoing Labs",
    title: "TryHackMe & Hack The Box",
    subtitle: "Cybersecurity Training Labs",
    description: "Engaging in hands-on laboratories testing exploit paths, active subnet auditing, privilege escalations on Windows and Active Directory, and OWASP web vulnerability analysis. Actively rising on ranking ladders.",
    type: "experience",
    badges: ["TryHackMe Labs", "Hack The Box", "OWASP 10", "Privilege Escalation"]
  },
  {
    period: "2024 - Ongoing",
    title: "Independent Cybersecurity Research",
    subtitle: "Personal Projects & Security Audits",
    description: "Developing custom OSINT scrapers and LAN diagnostics. Researching the nexus between Machine Learning models and defensive cybersecurity systems (e.g., using neural nets for real-time intrusion profiling).",
    type: "experience",
    badges: ["OSINT Tools", "Threat Detection", "Network Audit Scripts"]
  },
  {
    period: "2022 - 2024",
    title: "FSc Pre-Engineering",
    subtitle: "Intermediate Education",
    description: "Strong academic grounding in mathematics, analytical physics, and introductory computer logic. Graduated with honors, setting the course for AI and cybersecurity research.",
    type: "education",
    badges: ["Physics", "Mathematics", "Applied Logic"]
  },
  {
    period: "2020 - 2022",
    title: "Secondary Matriculation (Science)",
    subtitle: "High School Studies",
    description: "First contact with systematic coding paradigms, standard algorithmic design, and electronics theories.",
    type: "education",
    badges: ["Computer Science", "Mathematic Sciences"]
  }
];
