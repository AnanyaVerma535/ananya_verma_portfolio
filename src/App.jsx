import { useState, useEffect, useRef } from "react";

// Official Platform SVG Logos
const ICONS = {
  github: (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  leetcode: (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.594 2.337-1.594 3.833s.613 2.864 1.594 3.846l4.333 4.363c.981.982 2.336 1.595 3.832 1.595s2.864-.613 3.846-1.595l2.609-2.636c.514-.515.496-1.367-.039-1.902-.535-.535-1.387-.552-1.901-.038zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" />
    </svg>
  ),
  hackerrank: (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.66 17.5h-2.18v-4.52h-6.96v4.52H6.34V6.5h2.18v4.52h6.96V6.5h2.18v11z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  ),
};

const NAV_LINKS = ["About", "Projects", "Skills", "Achievements", "Education", "Certificates", "Coding Profiles", "Contact"];

const PROJECTS = [
  {
    id: 1,
    emoji: "🌍",
    title: "NGOHubX",
    role: "Full Stack Developer",
    period: "Feb – Apr 2026",
    badge: "Featured",
    badgeColor: "#4f46e5",
    badgeBg: "#eef2ff",
    desc: "Smart Emergency & Resource Allocation Platform connecting NGOs, volunteers, and citizens to solve scattered data and slow emergency response.",
    features: ["Citizen emergency reporting with location & urgency level", "NGO verification and automated volunteer matching by skills & proximity", "Real-time dashboards for impact tracking and transparency", "Location-based issue tracking via Google Maps API"],
    stack: ["HTML", "CSS", "JavaScript", "Firebase", "Gemini API", "Google Maps API"],
    github: "https://github.com/Aparna882006/Resource-Allocation-NGO-",
    demo: "https://smart-ngo-resource-allocation-and-v.vercel.app/",
  },
  {
    id: 2,
    emoji: "🤖",
    title: "AI Interview Bot",
    role: "Developer",
    period: "2025",
    badge: "AI-Powered",
    badgeColor: "#0891b2",
    badgeBg: "#ecfeff",
    desc: "Intelligent interview preparation platform powered by Generative AI simulating technical and HR interview scenarios with automated feedback.",
    features: ["AI-generated contextual interview questions", "Technical & HR interview simulation modes", "Automated feedback and performance analysis dashboard", "Personalized preparation recommendations"],
    stack: ["React", "Node.js", "Gemini API"],
    github: "https://github.com/Aparna882006/ai-interview-bot",
  },
  {
    id: 3,
    emoji: "🏗",
    title: "Infrasight",
    role: "Team Leader & Developer",
    period: "Mar – May 2025",
    badge: "Team Lead",
    badgeColor: "#b45309",
    badgeBg: "#fffbeb",
    desc: "AI-powered infrastructure issue reporting and management platform. Led a 4-member team to build a civic-tech system with intelligent image classification.",
    features: ["Gemini API automated classification from submitted images", "Geolocation-based validation for field-level actions", "MySQL database for complaint lifecycle tracking", "Git-based version control workflow"],
    stack: ["HTML", "CSS", "JavaScript", "MySQL", "Gemini API", "Geolocation API"],
    github: "https://github.com/AnanyaVerma535/infrasight-school-ai",
  },
  {
    id: 4,
    emoji: "🌦",
    title: "IoT Weather & Airship Monitor",
    role: "Developer",
    period: "2024",
    badge: "IoT",
    badgeColor: "#059669",
    badgeBg: "#ecfdf5",
    desc: "IoT-enabled environmental monitoring platform that collects, analyzes, and visualizes real-time weather and air quality data from embedded sensors.",
    features: ["Real-time temperature & humidity sensor feeds", "Cloud integration for data storage and trend analysis", "Dashboard visualization of environmental metrics"],
    stack: ["IoT Sensors", "Embedded Systems", "Cloud Integration", "Arduino"],
    github: "https://github.com/AnanyaVerma535/IoT-Weather-Station-Airship",
  },
  {
    id: 5,
    emoji: "👁",
    title: "Eye Bank Management System",
    role: "Developer",
    period: "2024",
    badge: "Database",
    badgeColor: "#7c3aed",
    badgeBg: "#f5f3ff",
    desc: "Database-driven application managing eye donation records, recipients, and inventory with full CRUD operations and report generation.",
    features: ["Donor and recipient lifecycle management", "Inventory tracking with report generation", "Database operations and search functionality"],
    stack: ["HTML", "CSS", "JavaScript", "MySQL"],
    github: "https://github.com/AnanyaVerma535/eye",
  },
  {
    id: 6,
    emoji: "🏠",
    title: "Real Estate Property System",
    role: "Developer",
    period: "In Progress",
    badge: "In Progress",
    badgeColor: "#6b7280",
    badgeBg: "#f9fafb",
    desc: "Property management platform to streamline property listings, user management, and search functionality.",
    features: ["Property listings and dashboard", "User management and search", "Currently under active development"],
    stack: ["HTML", "CSS", "JavaScript", "MySQL"],
  },
];

const SKILLS = [
  { cat: "Programming", items: ["Python", "C"] },
  { cat: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "React"] },
  { cat: "Database", items: ["MySQL", "Oracle", "Firebase"] },
  { cat: "AI & APIs", items: ["Generative AI", "Gemini API", "Google Maps API"] },
  { cat: "Core CS", items: ["Data Structures", "Algorithms", "DBMS", "Operating Systems", "DAA"] },
  { cat: "Tools", items: ["Git", "GitHub", "VS Code"] },
  { cat: "Soft Skills", items: ["Problem Solving", "Analytical Thinking", "Team Collaboration", "Leadership"] },
];

const ACHIEVEMENTS = [
  { icon: ICONS.leetcode, title: "250+ DSA Problems Solved", sub: "LeetCode — consistent practice across arrays, trees, graphs, DP", color: "#eef2ff", iconBg: "#4f46e5" },
  { icon: ICONS.hackerrank, title: "5★ Python on HackerRank", sub: "Top-tier rating in Python programming challenges", color: "#ecfdf5", iconBg: "#059669" },
  { icon: ICONS.hackerrank, title: "5★ SQL on HackerRank", sub: "Top-tier rating in SQL query challenges", color: "#ecfdf5", iconBg: "#059669" },
  { icon: ICONS.hackerrank, title: "4★ C on HackerRank", sub: "Advanced rating in C programming challenges", color: "#ecfdf5", iconBg: "#059669" },
  { icon: "🌍", title: "Google Solution Challenge", sub: "Competed in Google's global SDG-aligned innovation challenge", color: "#ecfeff", iconBg: "#0891b2" },
  { icon: "🛍", title: "Myntra Tech Event", sub: "Demonstrated innovation at industry-organized tech competition", color: "#f5f3ff", iconBg: "#7c3aed" },
  { icon: "💡", title: "Multiple Hackathons", sub: "Active participant in coding contests and innovation challenges", color: "#fff1f2", iconBg: "#e11d48" },
  { icon: "👥", title: "Team Lead — Infrasight", sub: "Led 4-member team through full-stack civic tech platform", color: "#fffbeb", iconBg: "#b45309" },
];

const EDUCATION = [
  { year: "2023 – 2027", degree: "B.Tech Computer Science (IoT)", school: "Pranveer Singh Institute of Technology, Kanpur", score: "CGPA: 8.28", highlight: true },
  { year: "2022 – 2023", degree: "Class XII", school: "Kendriya Vidyalaya No.1 Armapur, Kanpur", score: "76.16%" },
  { year: "2020 – 2021", degree: "Class X", school: "Kendriya Vidyalaya No.1 Armapur, Kanpur", score: "94.40%" },
];

const CERTS = [
  { name: "Software Engineering Job Simulation", issuer: "JP Morgan Chase", color: "#0071c5" },
  { name: "Supervised Machine Learning", issuer: "Coursera", color: "#0056d2" },
  { name: "OCI AI Foundations Associate", issuer: "Oracle", color: "#c74634" },
  { name: "Generative AI Certification", issuer: "GUVI", color: "#4f46e5" },
  { name: "Python Programming", issuer: "GUVI", color: "#4f46e5" },
  { name: "HTML Certification", issuer: "Infosys Springboard", color: "#059669" },
  { name: "CSS Certification", issuer: "Infosys Springboard", color: "#059669" },
  { name: "Database Management System (DBMS)", issuer: "Infosys Springboard", color: "#059669" },
  { name: "React Certification", issuer: "Infosys Springboard", color: "#059669" },
];

const PROFILES = [
  { name: "GitHub", handle: "AnanyaVerma535", desc: "Repositories & Projects", url: "https://github.com/AnanyaVerma535", color: "#1f2937", bg: "#f9fafb", icon: ICONS.github },
  { name: "LinkedIn", handle: "ananya-verma-960b93330", desc: "Professional Network", url: "https://linkedin.com/in/ananya-verma-960b93330", color: "#0a66c2", bg: "#eff6ff", icon: ICONS.linkedin },
  { name: "LeetCode", handle: "Ananya-Verma", desc: "250+ Problems Solved", url: "https://leetcode.com/u/Ananya-Verma/", color: "#f97316", bg: "#fff7ed", icon: ICONS.leetcode },
  { name: "HackerRank", handle: "Ananya_verma535", desc: "5★ Python · 5★ SQL · 4★ C", url: "https://www.hackerrank.com/profile/Ananya_verma535", color: "#16a34a", bg: "#f0fdf4", icon: ICONS.hackerrank },
];

const STATS = [
  { val: "250+", label: "DSA Problems" },
  { val: "8.28", label: "CGPA" },
  { val: "7+", label: "Projects Built" },
  { val: "10+", label: "Certifications" },
];

// Typing animation hook
function useTyping(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timer;
    if (!deleting && charIdx < word.length) {
      timer = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === word.length) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setDisplay(word.slice(0, charIdx));
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// Scroll reveal hook
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function RevealSection({ children, delay = 0 }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("About");
  const [expandedProject, setExpandedProject] = useState(null);
  const typed = useTyping(["Software Engineer", "Full Stack Developer", "AI Enthusiast", "IoT Builder", "Problem Solver"]);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase().replace(/\s+/g, "-"));
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(l => ({ id: l.toLowerCase().replace(/\s+/g, "-"), label: l }));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(sections[i].label); break; }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const s = {
    page: { width: "100%", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", background: "#fafafa", color: "#111827", overflowX: "hidden" },
    nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, background: "rgba(250,250,250,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid #e5e7eb", padding: "0 2rem" },
    navInner: { maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 },
    logo: { fontWeight: 800, fontSize: 20, color: "#4f46e5", letterSpacing: "-0.04em", cursor: "pointer", fontFamily: "monospace" },
    navLinks: { display: "flex", gap: 4, alignItems: "center" },
    navLink: (active) => ({ background: active ? "#eef2ff" : "transparent", color: active ? "#4f46e5" : "#6b7280", border: "none", cursor: "pointer", fontSize: 13, fontWeight: active ? 600 : 500, padding: "6px 12px", borderRadius: 8, transition: "all 0.15s", fontFamily: "inherit" }),
    hireBadge: { background: "#4f46e5", color: "white", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, padding: "7px 16px", borderRadius: 8, fontFamily: "inherit" },
  };

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <span style={s.logo} onClick={() => scrollTo("about")}>AV.</span>
          <div style={s.navLinks} className="desktop-nav">
            {NAV_LINKS.map(l => (
              <button key={l} style={s.navLink(activeSection === l)} onClick={() => scrollTo(l)}>{l}</button>
            ))}
          </div>
          <button style={s.hireBadge} onClick={() => scrollTo("contact")}>Hire me ↗</button>
        </div>
      </nav>

      <style>{`
        /* Force break out of Vite/React default containers */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100% !important; min-height: 100vh !important; margin: 0 !important; padding: 0 !important; background: #fafafa !important; }
        #root, #__next { max-width: 100% !important; width: 100% !important; margin: 0 !important; padding: 0 !important; text-align: left !important; }
        
        html { scroll-behavior: smooth; }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .proj-card:hover { transform: translateY(-4px) !important; box-shadow: 0 16px 40px rgba(79,70,229,0.12) !important; }
        .cert-item:hover { transform: translateX(4px) !important; border-color: #4f46e5 !important; }
        .profile-card:hover { transform: translateY(-4px) !important; box-shadow: 0 12px 32px rgba(0,0,0,0.1) !important; }
        .skill-tag:hover { background: #4f46e5 !important; color: white !important; border-color: #4f46e5 !important; }
        .ach-card:hover { transform: translateY(-2px) !important; box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important; }
        .cta-btn:hover { background: #3730a3 !important; transform: translateY(-1px) !important; }
        .ghost-btn:hover { background: #f3f4f6 !important; transform: translateY(-1px) !important; }
        .contact-row:hover { background: rgba(255,255,255,0.12) !important; }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: #f1f1f1; } ::-webkit-scrollbar-thumb { background: #4f46e5; border-radius: 3px; }
      `}</style>

      {/* HERO */}
      <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", maxWidth: 1100, margin: "0 auto", padding: "80px 2rem 4rem", gap: 60 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#ecfdf5", color: "#059669", padding: "6px 14px", borderRadius: 100, fontSize: 13, fontWeight: 600, marginBottom: 28, border: "1px solid #bbf7d0" }}>
            <span style={{ width: 7, height: 7, background: "#22c55e", borderRadius: "50%", animation: "blink 1.5s infinite" }} />
            Available for opportunities
          </div>

          <div style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: 16 }}>
            <div style={{ color: "#111827" }}>Hi, I'm</div>
            <div style={{ color: "#4f46e5" }}>Ananya Verma</div>
          </div>

          <div style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "#6b7280", marginBottom: 8, fontWeight: 500, height: 32, display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ color: "#4f46e5", fontWeight: 700 }}>{typed}</span>
            <span style={{ animation: "blink 1s infinite", color: "#4f46e5", fontWeight: 700 }}>|</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#9ca3af", fontSize: 13, marginBottom: 24, fontWeight: 500 }}>
            <span>{ICONS.location}</span> Kanpur, Uttar Pradesh, India
          </div>

          <p style={{ fontSize: "1rem", color: "#4b5563", lineHeight: 1.75, maxWidth: 500, marginBottom: 32 }}>
            B.Tech CSE (IoT) student at PSIT Kanpur passionate about building AI-powered applications, full-stack platforms, and intelligent automation systems that solve real-world problems.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
            <button className="cta-btn" onClick={() => scrollTo("projects")} style={{ background: "#4f46e5", color: "white", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700, padding: "12px 28px", borderRadius: 10, fontFamily: "inherit", transition: "all 0.2s" }}>
              View Projects →
            </button>
            <a href="mailto:ananyaverma639@gmail.com" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "white", color: "#374151", border: "1.5px solid #e5e7eb", fontSize: 14, fontWeight: 600, padding: "12px 24px", borderRadius: 10, textDecoration: "none", transition: "all 0.2s" }} className="ghost-btn">
              {ICONS.email} Contact Me
            </a>
            <a href="/Ananya_Verma_Resume.pdf" download="Ananya_Verma_Resume.pdf" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "white", color: "#374151", border: "1.5px solid #e5e7eb", fontSize: 14, fontWeight: 600, padding: "12px 24px", borderRadius: 10, textDecoration: "none", transition: "all 0.2s" }} className="ghost-btn">
              ↓ Resume
            </a>
          </div>

          {/* Social icons row */}
          <div style={{ display: "flex", gap: 10 }}>
            {PROFILES.map(p => (
              <a key={p.name} href={p.url} target="_blank" rel="noreferrer" title={p.name} style={{ width: 40, height: 40, background: "white", border: "1px solid #e5e7eb", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: p.color, textDecoration: "none", transition: "all 0.2s" }} className="ghost-btn">
                {p.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Hero right — AV avatar + stats */}
        <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <img 
            src="/profile.png" 
            alt="Ananya Verma" 
            style={{ width: 220, height: 220, borderRadius: "50%", objectFit: "cover", background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)", border: "4px solid white", boxShadow: "0 8px 40px rgba(79,70,229,0.18)", animation: "float 4s ease-in-out infinite" }} 
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback if Image Fails to Load */}
          <div style={{ display: "none", width: 220, height: 220, borderRadius: "50%", background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)", alignItems: "center", justifyContent: "center", fontSize: 64, fontWeight: 900, color: "#4f46e5", letterSpacing: "-0.05em", border: "4px solid white", boxShadow: "0 8px 40px rgba(79,70,229,0.18)", animation: "float 4s ease-in-out infinite" }}>
            AV
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {STATS.map(st => (
              <div key={st.label} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 14, padding: "14px 18px", textAlign: "center", minWidth: 100 }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#4f46e5", letterSpacing: "-0.04em", lineHeight: 1 }}>{st.val}</div>
                <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, marginTop: 4, letterSpacing: "0.02em" }}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ background: "white", padding: "80px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
          <RevealSection>
            <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.1em", color: "#9ca3af", marginBottom: 6 }}>// featured work</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "#111827", marginBottom: 10 }}>Projects that create impact</h2>
            <p style={{ color: "#6b7280", maxWidth: 500, marginBottom: 48, lineHeight: 1.7 }}>Real-world software solutions built using AI, web development, databases, and IoT technologies.</p>
          </RevealSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            {PROJECTS.map((p, i) => (
              <RevealSection key={p.id} delay={i * 60}>
                <div className="proj-card" style={{ background: "#fafafa", border: `1.5px solid ${p.id === 1 ? "#4f46e5" : "#e5e7eb"}`, borderRadius: 18, padding: "1.5rem", transition: "all 0.25s", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}
                  onClick={() => setExpandedProject(expandedProject === p.id ? null : p.id)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <span style={{ fontSize: 28 }}>{p.emoji}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, background: p.badgeBg, color: p.badgeColor, fontFamily: "monospace", letterSpacing: "0.04em" }}>{p.badge}</span>
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#111827", marginBottom: 4, letterSpacing: "-0.02em" }}>{p.title}</h3>
                  <p style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600, marginBottom: 10 }}>{p.role} · {p.period}</p>
                  <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.65, marginBottom: 14, flex: 1 }}>{p.desc}</p>

                  {expandedProject === p.id && (
                    <div style={{ marginBottom: 14 }}>
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        {p.features.map((f, fi) => (
                          <li key={fi} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: "#374151", padding: "3px 0" }}>
                            <span style={{ color: "#4f46e5", fontWeight: 800, marginTop: 1, flexShrink: 0 }}>→</span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                    {p.stack.map(t => (
                      <span key={t} style={{ fontFamily: "monospace", fontSize: 10, padding: "3px 8px", background: "white", border: "1px solid #e5e7eb", color: "#6b7280", borderRadius: 4 }}>{t}</span>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {p.github && <a href={p.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 13, fontWeight: 700, color: "white", background: "#111827", padding: "7px 16px", borderRadius: 8, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>{ICONS.github} GitHub ↗</a>}
                    {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 13, fontWeight: 600, color: "#4f46e5", background: "#eef2ff", padding: "7px 16px", borderRadius: 8, textDecoration: "none" }}>Live Demo ↗</a>}
                    <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: "auto" }}>{expandedProject === p.id ? "↑ Less" : "↓ More"}</span>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "80px 0", background: "#fafafa" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
          <RevealSection>
            <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.1em", color: "#9ca3af", marginBottom: 6 }}>// my toolkit</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "#111827", marginBottom: 10 }}>Technical skills</h2>
            <p style={{ color: "#6b7280", marginBottom: 48, lineHeight: 1.7 }}>Technologies and frameworks I work with across the full stack.</p>
          </RevealSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {SKILLS.map((sk, i) => (
              <RevealSection key={sk.cat} delay={i * 50}>
                <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 16, padding: "1.25rem 1.5rem" }}>
                  <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.08em", color: "#9ca3af", marginBottom: 12, textTransform: "uppercase" }}>{sk.cat}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {sk.items.map(item => (
                      <span key={item} className="skill-tag" style={{ fontSize: 13, fontWeight: 500, padding: "6px 14px", borderRadius: 8, background: "#f9fafb", border: "1px solid #e5e7eb", color: "#374151", cursor: "default", transition: "all 0.15s" }}>{item}</span>
                    ))}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" style={{ padding: "80px 0", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
          <RevealSection>
            <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.1em", color: "#9ca3af", marginBottom: 6 }}>// milestones</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "#111827", marginBottom: 10 }}>Achievements</h2>
            <p style={{ color: "#6b7280", marginBottom: 48, lineHeight: 1.7 }}>Competitions, coding milestones, and leadership experiences.</p>
          </RevealSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {ACHIEVEMENTS.map((a, i) => (
              <RevealSection key={a.title} delay={i * 40}>
                <div className="ach-card" style={{ background: a.color, borderRadius: 16, padding: "1.25rem", display: "flex", gap: 14, alignItems: "flex-start", border: "1px solid rgba(0,0,0,0.05)", transition: "all 0.2s" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: a.iconBg, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{a.icon}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 4, lineHeight: 1.3 }}>{a.title}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5 }}>{a.sub}</div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ padding: "80px 0", background: "#fafafa" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
          <RevealSection>
            <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.1em", color: "#9ca3af", marginBottom: 6 }}>// academic path</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "#111827", marginBottom: 10 }}>Education</h2>
            <p style={{ color: "#6b7280", marginBottom: 48, lineHeight: 1.7 }}>Formal academic background in Computer Science with IoT specialization.</p>
          </RevealSection>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative", paddingLeft: 32 }}>
            <div style={{ position: "absolute", left: 8, top: 10, bottom: 10, width: 2, background: "#e5e7eb", borderRadius: 2 }} />
            {EDUCATION.map((e, i) => (
              <RevealSection key={e.degree} delay={i * 100}>
                <div style={{ position: "relative", paddingBottom: i < EDUCATION.length - 1 ? 40 : 0 }}>
                  <div style={{ position: "absolute", left: -28, top: 6, width: 12, height: 12, borderRadius: "50%", background: e.highlight ? "#4f46e5" : "white", border: `2.5px solid ${e.highlight ? "#4f46e5" : "#d1d5db"}` }} />
                  <div style={{ background: "white", border: `1.5px solid ${e.highlight ? "#4f46e5" : "#e5e7eb"}`, borderRadius: 16, padding: "1.25rem 1.5rem" }}>
                    <div style={{ fontFamily: "monospace", fontSize: 11, color: "#9ca3af", letterSpacing: "0.04em", marginBottom: 6 }}>{e.year}</div>
                    <div style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", marginBottom: 3 }}>{e.degree}</div>
                    <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>{e.school}</div>
                    <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, padding: "3px 10px", background: "#eef2ff", color: "#4f46e5", borderRadius: 6 }}>{e.score}</span>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATES */}
      <section id="certificates" style={{ padding: "80px 0", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
          <RevealSection>
            <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.1em", color: "#9ca3af", marginBottom: 6 }}>// verified learning</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "#111827", marginBottom: 10 }}>Certifications</h2>
            <p style={{ color: "#6b7280", marginBottom: 48, lineHeight: 1.7 }}>10+ verified certifications from global tech leaders and learning platforms.</p>
          </RevealSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 12 }}>
            {CERTS.map((c, i) => (
              <RevealSection key={c.name} delay={i * 40}>
                <div className="cert-item" style={{ display: "flex", alignItems: "center", gap: 14, background: "#fafafa", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem 1.25rem", transition: "all 0.2s", cursor: "default" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{c.issuer}</div>
                  </div>
                  <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: c.color, padding: "2px 10px", background: "white", border: `1px solid ${c.color}22`, borderRadius: 6 }}>✓</span>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CODING PROFILES */}
      <section id="coding-profiles" style={{ padding: "80px 0", background: "#fafafa" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
          <RevealSection>
            <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.1em", color: "#9ca3af", marginBottom: 6 }}>// find me online</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "#111827", marginBottom: 10 }}>Coding profiles</h2>
            <p style={{ color: "#6b7280", marginBottom: 48, lineHeight: 1.7 }}>My presence across developer platforms — code, projects, and competitive programming.</p>
          </RevealSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {PROFILES.map((p, i) => (
              <RevealSection key={p.name} delay={i * 80}>
                <a href={p.url} target="_blank" rel="noreferrer" className="profile-card" style={{ display: "flex", flexDirection: "column", background: "white", border: "1px solid #e5e7eb", borderRadius: 18, padding: "1.75rem", textDecoration: "none", color: "inherit", transition: "all 0.25s" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: p.bg, color: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 14 }}>{p.icon}</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#111827", marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", fontFamily: "monospace", marginBottom: 8 }}>@{p.handle}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", flex: 1, marginBottom: 16, lineHeight: 1.5 }}>{p.desc}</div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: p.color }}>Visit Profile →</span>
                </a>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "80px 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RevealSection>
            <div style={{ background: "#111827", borderRadius: 24, padding: "4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
              <div>
                <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.1em", color: "#6b7280", marginBottom: 8 }}>// let's connect</p>
                <h2 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.04em", color: "white", marginBottom: 14, lineHeight: 1.15 }}>Let's build something amazing together</h2>
                <p style={{ color: "#9ca3af", fontSize: 15, lineHeight: 1.75, marginBottom: 28 }}>
                  Open to internship opportunities, collaboration ideas, and project discussions. Whether it's AI, full-stack, or IoT — I'm ready to contribute.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {PROFILES.map(p => (
                    <a key={p.name} href={p.url} target="_blank" rel="noreferrer" style={{ fontFamily: "monospace", fontSize: 12, padding: "7px 16px", borderRadius: 8, border: "1px solid #374151", color: "#9ca3af", textDecoration: "none", transition: "all 0.2s" }} className="contact-row">{p.name} ↗</a>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { icon: ICONS.email, label: "Email", val: "ananyaverma639@gmail.com", href: "mailto:ananyaverma639@gmail.com" },
                  { icon: ICONS.phone, label: "Phone", val: "+91 6392325645", href: "tel:+916392325645" },
                  { icon: ICONS.location, label: "Location", val: "Kanpur, Uttar Pradesh, India", href: null },
                  { icon: ICONS.hackerrank, label: "HackerRank", val: "5★ Python · 5★ SQL · 4★ C", href: "https://www.hackerrank.com/profile/Ananya_verma535" },
                ].map(r => (
                  <a key={r.label} href={r.href || "#"} className="contact-row" style={{ display: "flex", alignItems: "center", gap: 14, padding: "1rem 1.25rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, textDecoration: "none", color: "inherit", transition: "all 0.2s", cursor: r.href ? "pointer" : "default" }}>
                    <div style={{ width: 38, height: 38, background: "rgba(255,255,255,0.07)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "white", flexShrink: 0 }}>{r.icon}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "white", marginBottom: 1 }}>{r.label}</div>
                      <div style={{ fontSize: 12, color: "#6b7280" }}>{r.val}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "1.5rem", fontFamily: "monospace", fontSize: 12, color: "#9ca3af", borderTop: "1px solid #e5e7eb" }}>
        Designed & developed by Ananya Verma · © {new Date().getFullYear()} All rights reserved
      </footer>
    </div>
  );
}