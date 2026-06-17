import { useState, useEffect, useRef } from "react";

// --- SVG ICONS ---
const ICONS = {
  github: <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>,
  linkedin: <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  leetcode: <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.594 2.337-1.594 3.833s.613 2.864 1.594 3.846l4.333 4.363c.981.982 2.336 1.595 3.832 1.595s2.864-.613 3.846-1.595l2.609-2.636c.514-.515.496-1.367-.039-1.902-.535-.535-1.387-.552-1.901-.038zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" /></svg>,
  hackerrank: <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.66 17.5h-2.18v-4.52h-6.96v4.52H6.34V6.5h2.18v4.52h6.96V6.5h2.18v11z" /></svg>,
  email: <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>,
  location: <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>,
  menu: <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>,
  close: <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>,
  code: <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>,
  hat: <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
};

// --- DATA ---
const NAV_LINKS = ["About", "Projects", "Skills", "Achievements", "Education", "Certificates", "Profiles", "Contact"];
const PROJECT_CATEGORIES = ["All", "AI/ML", "Full Stack", "IoT", "Database"];

const PROJECTS = [
  {
    id: 1, category: "AI/ML", emoji: "🏗", title: "Infrasight", role: "Team Leader & Developer", period: "Mar – May 2025", badge: "Team Lead", badgeColor: "#8b5cf6", badgeBg: "#ede9fe",
    desc: "AI-powered infrastructure issue reporting and management platform. Led a 4-member team to build a civic-tech system with intelligent image classification.",
    features: ["Gemini API automated classification from submitted images", "Geolocation-based validation for field-level actions", "MySQL database for complaint lifecycle tracking"],
    stack: ["HTML", "CSS", "JavaScript", "MySQL", "Gemini API", "Geolocation API"],
    github: "https://github.com/AnanyaVerma535/infrasight-school-ai", demo: "infrasightschoolmonitoring.vercel.app",
  },
  {
    id: 2, category: "AI/ML", emoji: "🤖", title: "AI Interview Bot", role: "Developer", period: "2025", badge: "AI-Powered", badgeColor: "#0ea5e9", badgeBg: "#e0f2fe",
    desc: "Intelligent interview preparation platform powered by Generative AI simulating technical and HR interview scenarios with automated feedback.",
    features: ["AI-generated contextual interview questions adapted to skill levels", "Technical & HR interview simulation modes", "Automated feedback and performance analysis dashboard"],
    stack: ["React", "Node.js", "Gemini API"],
    github: "https://github.com/Aparna882006/ai-interview-bot.git", demo: "https://lnkd.in/dK9UjJ2M",
  },
  {
    id: 3, category: "Full Stack", emoji: "🌍", title: "NGOHubX", role: "Full Stack Developer", period: "Feb – Apr 2026", badge: "Featured", badgeColor: "#10b981", badgeBg: "#d1fae5",
    desc: "Smart Emergency & Resource Allocation Platform connecting NGOs, volunteers, and citizens to solve scattered data and slow emergency response.",
    features: ["Citizen emergency reporting with location & urgency level", "NGO verification and automated volunteer matching", "Real-time dashboards for impact tracking and transparency"],
    stack: ["HTML", "CSS", "JavaScript", "Firebase", "Gemini API", "Google Maps API"],
    github: "https://github.com/Aparna882006/Resource-Allocation-NGO-.git", demo: "https://smart-ngo-resource-allocation-and-v.vercel.app/",
  },
  {
    id: 4, category: "IoT", emoji: "🌦", title: "IoT Weather & Airship Monitor", role: "Developer", period: "2024", badge: "Hardware", badgeColor: "#f59e0b", badgeBg: "#fef3c7",
    desc: "IoT-enabled environmental monitoring platform that collects, analyzes, and visualizes real-time weather and air quality data from embedded sensors.",
    features: ["Real-time temperature & humidity sensor feeds", "Cloud integration for data storage and trend analysis", "Dashboard visualization of environmental metrics"],
    stack: ["Arduino", "IoT Sensors", "Embedded Systems", "Cloud API"],
    github: "https://github.com/AnanyaVerma535/IoT-Weather-Station-Airship", demo: "",
  },
  {
    id: 5, category: "Database", emoji: "👁", title: "Eye Bank Management System", role: "Developer", period: "2024", badge: "Database", badgeColor: "#ef4444", badgeBg: "#fee2e2",
    desc: "Database-driven application managing eye donation records, recipients, and inventory with full CRUD operations and report generation.",
    features: ["Donor and recipient lifecycle management", "Inventory tracking with report generation", "Optimized SQL queries for rapid medical matching"],
    stack: ["HTML", "CSS", "JavaScript", "MySQL", "PHP"],
    github: "https://github.com/AnanyaVerma535/eye.git", demo: "",
  },
  {
    id: 6, category: "Full Stack", emoji: "🏠", title: "Real Estate Property System", role: "Developer", period: "In Progress", badge: "In Progress", badgeColor: "#64748b", badgeBg: "#f1f5f9",
    desc: "Property management platform to streamline property listings, user management, and search functionality.",
    features: ["Property listings and interactive dashboard", "User management and complex search filtering"],
    stack: ["HTML", "CSS", "JavaScript", "MySQL"],
    github: "", demo: "",
  }
];

const SKILLS = [
  { cat: "Languages", icon: "💻", items: ["Python","C"] },
  { cat: "Frontend", icon: "🎨", items: ["HTML5", "CSS3", "React.js"] },
  { cat: "Backend & DB", icon: "🗄️", items: ["Node.js", "MySQL", "Firebase", "Oracle DB"] },
  { cat: "AI & APIs", icon: "🤖", items: ["Generative AI", "Gemini API", "Google Maps API"] },
  { cat: "Core CS", icon: "🧠", items: ["Data Structures", "Algorithms", "DBMS", "Operating System"] },
  { cat: "Tools", icon: "⚙️", items: ["Git", "GitHub", "VS Code"] },
];

const PROFILES = [
  { name: "GitHub", handle: "AnanyaVerma535", desc: "Repositories & Open Source", url: "https://github.com/AnanyaVerma535", color: "#1f2937", bg: "#f9fafb", icon: ICONS.github },
  { name: "LinkedIn", handle: "ananya-verma", desc: "Professional Network", url: "https://www.linkedin.com/in/ananya-verma-960b93330/", color: "#0a66c2", bg: "#eff6ff", icon: ICONS.linkedin },
  { name: "LeetCode", handle: "Ananya-Verma", desc: "Problem Solving", url: "https://leetcode.com/u/Ananya-Verma/", color: "#f97316", bg: "#fff7ed", icon: ICONS.leetcode },
  { name: "HackerRank", handle: "Ananya_verma535", desc: "5★ Python · 5★ SQL · 4★ C", url: "https://www.hackerrank.com/profile/Ananya_verma535", color: "#16a34a", bg: "#f0fdf4", icon: ICONS.hackerrank },
];

const ACHIEVEMENTS = [
  { icon: ICONS.leetcode, title: "250+ DSA Problems Solved", sub: "LeetCode — consistent practice across arrays, trees, graphs, DP", color: "#eef2ff", iconBg: "#4f46e5" },
  { icon: ICONS.hackerrank, title: "5★ Python on HackerRank", sub: "Top-tier rating in Python programming challenges", color: "#ecfdf5", iconBg: "#059669" },
  { icon: ICONS.hackerrank, title: "5★ SQL on HackerRank", sub: "Top-tier rating in SQL query challenges", color: "#ecfdf5", iconBg: "#059669" },
  { icon: ICONS.hackerrank, title: "4★ C on HackerRank", sub: "Advanced rating in C programming challenges", color: "#ecfdf5", iconBg: "#059669" },
  { icon: "🌍", title: "Google Solution Challenge", sub: "Competed in Google's global SDG-aligned innovation challenge", color: "#e0f2fe", iconBg: "#0ea5e9" },
  { icon: "💡", title: "Multiple Hackathons", sub: "Active participant in coding contests and innovation challenges", color: "#fee2e2", iconBg: "#ef4444" },
];

const EDUCATION = [
  { year: "2023 — 2027", degree: "B.Tech, Computer Science (IoT)", school: "Pranveer Singh Institute of Technology", score: "CGPA: 8.28", highlight: true },
  { year: "2022 — 2023", degree: "Class XII", school: "Kendriya Vidyalaya No.1 Armapur", score: "76.16%", highlight: false },
  { year: "2020 — 2021", degree: "Class X", school: "Kendriya Vidyalaya No.1 Armapur", score: "94.40%", highlight: false },
];

const CERTS = [
  { name: "Software Engineering Job Simulation", issuer: "JP Morgan Chase (Forage)", color: "#0071c5", date: "Jan 2026", link: "https://www.theforage.com/completion-certificates/Sj7temL583QAYpHXD/E6McHJDKsQYh79moz_Sj7temL583QAYpHXD_696a47182e40c7c03cf33c42_1769253723181_completion_certificate.pdf", overview: "Completed an intensive simulation focusing on enterprise system design, Kafka integration, and Spring Boot microservices. Practiced Agile workflows and professional technical reporting." },
  { name: "Supervised Machine Learning", issuer: "Coursera", color: "#0056d2", date: "2026", link: "https://www.coursera.org/account/accomplishments/verify/KQ4XYG1ZEGJX", overview: "Mastered core ML algorithms including linear regression, logistic regression, and neural networks. Built predictive models using Python, NumPy, and TensorFlow." },
  { name: "OCI AI Foundations Associate", issuer: "Oracle", color: "#c74634", date: "2025", link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=C96696D8839D84EBA6CC27EB3F905DA71383FD063981D9169985DA310354D62C", overview: "Demonstrated foundational knowledge of AI, Machine Learning, Deep Learning, and Generative AI concepts within the Oracle Cloud Infrastructure ecosystem." },
  { name: "Generative AI Certification", issuer: "GUVI", color: "#4f46e5", date: "2024", link: "https://drive.google.com/file/d/1zOqtZdMHvtvYfgbTRVCofslu-xe2-KZR/view?usp=drive_link", overview: "Learned to integrate Large Language Models (LLMs) into applications, prompt engineering techniques, and API consumption for AI-driven software." },
  { name: "Python Programming", issuer: "GUVI", color: "#4f46e5", date: "2024", link: "https://drive.google.com/file/d/1Rs1atCPQJ1aS5IkMzIq5L0l-OCVMvFEx/view?usp=sharing", overview: "Gained strong proficiency in Python data structures, functional programming, file handling, and algorithm implementation." },
  { name: "Database Management System (DBMS)", issuer: "Infosys Springboard", color: "#059669", date: "2026", link: "https://drive.google.com/file/d/1zxQurLiePFIu7gbvCxabjuPXOZ_NWjjl/view?usp=drive_link", overview: "Acquired comprehensive knowledge of relational database design, SQL querying, normalization, and transaction management." },
  { name: "React Certification", issuer: "Infosys Springboard", color: "#059669", date: "2026", link: "https://drive.google.com/file/d/1GKxxBgQG3KnCWNEpvhivLJXqkAN_bImV/view?usp=drive_link", overview: "Developed interactive, component-based UIs. Mastered React Hooks, state management, and application routing." },
  { name: "HTML Certification", issuer: "Infosys Springboard", color: "#059669", date: "2024", link: "https://drive.google.com/file/d/1byHirqpivOhfrjuK8FxU8Ypczhf_vzMA/view?usp=drive_link", overview: "Mastered semantic HTML5 markup, accessibility standards, and structuring web content effectively." },
  { name: "CSS Certification", issuer: "Infosys Springboard", color: "#059669", date: "2025", link: "https://drive.google.com/file/d/1I8WgiCj32ND4EWwmtN_BYJyK4etWgh0D/view?usp=drive_link", overview: "Learned advanced styling techniques including Flexbox, Grid, animations, and responsive web design." },
];

const STATS = [
  { val: "250+", label: "DSA Problems" },
  { val: "8.28", label: "CGPA" },
  { val: "7+", label: "Projects Built" },
  { val: "10+", label: "Certifications" },
];

// --- HOOKS ---
function useTyping(words, speed = 60, pause = 2000) {
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

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// --- COMPONENTS ---
function RevealSection({ children, delay = 0 }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function ParticlesBackground() {
  return (
    <div className="particles-container">
      {Array.from({ length: 25 }).map((_, i) => (
        <div key={i} className="particle" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 15 + 15}s`,
          animationDelay: `-${Math.random() * 15}s`
        }}></div>
      ))}
    </div>
  );
}

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [bootText, setBootText] = useState("");
  const [activeSection, setActiveSection] = useState("About");
  const [expandedProject, setExpandedProject] = useState(null);
  const [projectFilter, setProjectFilter] = useState("All");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const typed = useTyping(["Software Engineer", "Full Stack Developer", "AI/ML Enthusiast", "IoT Builder"]);

  // --- SEO & META TAGS INJECTION ---
  useEffect(() => {
    document.title = "Ananya Verma | Software Engineer";
    
    const setMeta = (name, content, isProperty = false) => {
      let tag = document.querySelector(`meta[${isProperty ? 'property' : 'name'}="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        if (isProperty) tag.setAttribute('property', name);
        else tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta("description", "Portfolio of Ananya Verma, a Software Engineer and B.Tech CSE student specializing in Full Stack Development, AI/ML, and IoT.");
    setMeta("keywords", "Ananya Verma, Software Engineer, Full Stack Developer, React, Python, AI, ML, IoT, Portfolio");
    setMeta("theme-color", "#4f46e5");

    // Boot Sequence Animation
    const bootSequence = [
      "> Initializing system...",
      "> Loading dependencies...",
      "> Fetching profile data...",
      "> Compiling UI components...",
      "> System ready."
    ];
    
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        setBootText(prev => prev + bootSequence[currentLine] + "\n");
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 500);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // --- SCROLL HANDLING ---
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      const sections = NAV_LINKS.map(l => ({ id: l.toLowerCase().replace(/\s+/g, "-"), label: l }));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && window.scrollY >= el.offsetTop - 150) { 
          setActiveSection(sections[i].label); 
          break; 
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsMenuOpen(false); 
    const el = document.getElementById(id.toLowerCase().replace(/\s+/g, "-"));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filteredProjects = projectFilter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === projectFilter);

  if (isLoading) {
    return (
      <div style={{ height: "100vh", width: "100vw", background: "#0f172a", color: "#10b981", fontFamily: "monospace", padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "flex-end", boxSizing: "border-box" }}>
        <div style={{ whiteSpace: "pre-line", lineHeight: 1.6, fontSize: "clamp(14px, 2vw, 18px)" }}>{bootText}<span style={{ animation: "blink 1s infinite" }}>_</span></div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", background: "#f8fafc", color: "#0f172a", overflowX: "hidden", position: "relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      
      <ParticlesBackground />

      {/* GLOBAL CSS */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; margin: 0; padding: 0; background: transparent; scroll-behavior: smooth; }
        
        .particles-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); }
        .particle { position: absolute; width: 4px; height: 4px; background: rgba(79, 70, 229, 0.2); border-radius: 50%; animation: float linear infinite; }
        @keyframes float { 0% { transform: translateY(100vh) translateX(0) scale(1); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(-100px) translateX(20px) scale(1.5); opacity: 0; } }

        section { position: relative; z-index: 1; padding: 100px 1.5rem; max-width: 1200px; margin: 0 auto; }
        
        .gradient-text { background: linear-gradient(135deg, #4f46e5, #0ea5e9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float-img { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        
        /* Glass & Cards */
        .glass-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 999; background: rgba(255,255,255,0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(0,0,0,0.05); }
        .glass-card { background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border: 1px solid #e2e8f0; border-radius: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .glass-card:hover { transform: translateY(-6px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1); border-color: #c7d2fe; }
        
        /* Buttons & Tags */
        .btn-primary { background: linear-gradient(135deg, #4f46e5, #3b82f6); color: white; border: none; cursor: pointer; font-weight: 600; padding: 12px 28px; border-radius: 12px; transition: all 0.3s; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(79,70,229,0.3); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(79,70,229,0.4); filter: brightness(1.1); }
        
        .btn-outline { background: white; color: #0f172a; border: 1px solid #cbd5e1; cursor: pointer; font-weight: 600; padding: 12px 28px; border-radius: 12px; transition: all 0.3s; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
        .btn-outline:hover { border-color: #4f46e5; color: #4f46e5; background: #f8fafc; transform: translateY(-2px); }

        .skill-tag { font-family: monospace; font-size: 13px; font-weight: 500; padding: 6px 12px; border-radius: 8px; background: #f1f5f9; color: #334155; border: 1px solid #e2e8f0; transition: all 0.2s; cursor: crosshair; }
        .skill-tag:hover { background: #4f46e5; color: white; border-color: #4f46e5; transform: scale(1.05); }

        /* Scroll Top */
        .scroll-top { position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px; background: #4f46e5; color: white; border: none; border-radius: 50%; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 1000; box-shadow: 0 4px 15px rgba(79,70,229,0.4); transition: all 0.3s; opacity: 0; visibility: hidden; transform: translateY(20px); }
        .scroll-top.visible { opacity: 1; visibility: visible; transform: translateY(0); }
        .scroll-top:hover { background: #3730a3; transform: translateY(-4px); }

        /* Timeline CSS */
        .timeline-center-wrapper { position: relative; max-width: 900px; margin: 0 auto; padding: 20px 0; }
        .timeline-center-line { position: absolute; left: 50%; transform: translateX(-50%); width: 2px; top: 0; bottom: 0; background-color: #c7d2fe; z-index: 1; }
        .timeline-row { display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 40px; position: relative; }
        .timeline-content { width: calc(50% - 40px); position: relative; z-index: 3; }
        .timeline-dot-center { position: absolute; left: 50%; transform: translateX(-50%); top: 24px; width: 16px; height: 16px; border-radius: 50%; background-color: #4f46e5; z-index: 2; box-shadow: 0 0 0 4px #f8fafc; }

        /* Section Headings - Clean and Centered */
        .section-header { text-align: center; margin-bottom: 50px; }
        .section-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; letter-spacing: -0.04em; color: #0f172a; margin-bottom: 16px; }
        .section-subtitle { font-size: 1.1rem; color: #475569; max-width: 600px; margin: 0 auto; line-height: 1.7; }

        /* Responsive */
        .mobile-menu-btn { display: none; background: transparent; border: none; color: #0f172a; cursor: pointer; }
        .mobile-nav { display: none; position: fixed; top: 70px; left: 0; width: 100%; background: rgba(255,255,255,0.98); backdrop-filter: blur(10px); z-index: 998; flex-direction: column; padding: 2rem; border-bottom: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.05); transform: translateY(-100%); opacity: 0; transition: all 0.3s ease-in-out; }
        .mobile-nav.open { transform: translateY(0); opacity: 1; display: flex; }

        @media (max-width: 850px) { 
          .desktop-nav { display: none !important; } 
          .mobile-menu-btn { display: block; }
          .hero-buttons { justify-content: center; }
          .hero-text-area { text-align: center; display: flex; flex-direction: column; align-items: center; }
          #about { flex-direction: column-reverse !important; text-align: center; gap: 40px !important; padding-top: 120px !important; }
          section { padding: 60px 1.5rem !important; }

          /* Responsive Timeline adjustment */
          .timeline-center-line { left: 20px; transform: none; }
          .timeline-row { justify-content: flex-end !important; flex-direction: row !important; }
          .timeline-content { width: calc(100% - 50px) !important; text-align: left !important; }
          .timeline-dot-center { left: 20px !important; transform: translateX(-50%) !important; }
        }
      `}</style>

      {/* NAVIGATION */}
      <nav className="glass-nav">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 75 }}>
          <div style={{ fontWeight: 900, fontSize: 24, letterSpacing: "-0.05em", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} onClick={() => scrollTo("about")}>
            <span style={{ color: "#4f46e5" }}>{ICONS.code}</span>
            <span>Ananya<span style={{ color: "#4f46e5" }}>.dev</span></span>
          </div>
          
          <div className="desktop-nav" style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {NAV_LINKS.map(l => (
              <button key={l} style={{ background: activeSection === l ? "#eef2ff" : "transparent", color: activeSection === l ? "#4f46e5" : "#475569", border: "none", cursor: "pointer", fontSize: 14, fontWeight: activeSection === l ? 700 : 500, padding: "8px 16px", borderRadius: 8, transition: "all 0.2s", fontFamily: "inherit" }} onClick={() => scrollTo(l)}>{l}</button>
            ))}
          </div>

          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? ICONS.close : ICONS.menu}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(l => (
          <button key={l} style={{ background: "transparent", border: "none", borderBottom: "1px solid #f1f5f9", padding: "16px 0", fontSize: 18, fontWeight: 600, color: activeSection === l ? "#4f46e5" : "#0f172a", textAlign: "center" }} onClick={() => scrollTo(l)}>
            {l}
          </button>
        ))}
      </div>

      {/* HERO / ABOUT SECTION (Split Layout) */}
      <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap-reverse", gap: 60, paddingTop: 100 }}>
        
        {/* Left Side: Text */}
        <div className="hero-text-area" style={{ flex: "1 1 500px" }}>
          <RevealSection>
            {/* Open To Work Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "white", color: "#0f172a", padding: "8px 16px", borderRadius: 100, fontSize: 13, fontWeight: 600, marginBottom: 30, border: "1px solid #e2e8f0", fontFamily: "monospace", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" }}>
              <span style={{ width: 8, height: 8, background: "#10b981", borderRadius: "50%", animation: "blink 1.5s infinite", boxShadow: "0 0 8px #10b981" }} />
              <span style={{ color: "#64748b" }}>status:</span> <span style={{ color: "#10b981" }}>open_to_work</span>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: 20 }}>
              Hi, I'm <br/><span className="gradient-text">Ananya Verma</span>
            </h1>

            <div style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", color: "#334155", marginBottom: 24, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span>I build as a </span>
              <span style={{ color: "#4f46e5" }}>{typed}</span>
              <span style={{ animation: "blink 1s infinite", color: "#4f46e5" }}>|</span>
            </div>

            {/* Bio */}
            <p style={{ fontSize: "1.15rem", color: "#475569", lineHeight: 1.8, maxWidth: 600, marginBottom: 40 }}>
              B.Tech CSE (IoT) student at PSIT Kanpur. I specialize in architecting intelligent full-stack applications. Passionate about leveraging Python, React, and Machine Learning to construct scalable, data-driven solutions.
            </p>

            {/* Buttons */}
            <div className="hero-buttons" style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <button className="btn-primary" onClick={() => scrollTo("projects")}>
                View My Work
              </button>
              <a href="/Ananya_Verma_Resume.pdf" download="Ananya_Verma_Resume.pdf" className="btn-outline">
                Download Resume ↓
              </a>
            </div>

            {/* Stats Bar under buttons */}
            <div className="hero-buttons" style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap" }}>
              {STATS.map(st => (
                <div key={st.label} style={{ background: "white", padding: "12px 20px", borderRadius: 12, boxShadow: "0 4px 15px rgba(0,0,0,0.03)", border: "1px solid #f1f5f9" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#4f46e5", lineHeight: 1 }}>{st.val}</div>
                  <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, marginTop: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{st.label}</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>

        {/* Right Side: Image */}
        <div style={{ flex: "1 1 400px", display: "flex", justifyContent: "center", position: "relative" }}>
          <RevealSection delay={200}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: -15, background: "linear-gradient(135deg, #4f46e5, #0ea5e9)", borderRadius: "50%", filter: "blur(40px)", opacity: 0.15, animation: "blink 4s infinite" }}></div>
              <div style={{ position: "relative", padding: "8px", background: "linear-gradient(135deg, #e2e8f0, #f8fafc)", borderRadius: "50%", animation: "float-img 6s ease-in-out infinite" }}>
                <img 
                  src="/profile.png" 
                  alt="Ananya Verma" 
                  style={{ width: "clamp(220px, 35vw, 320px)", height: "clamp(220px, 35vw, 320px)", borderRadius: "50%", objectFit: "cover", border: "4px solid white", zIndex: 2, position: "relative" }} 
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                <div style={{ display: "none", width: "clamp(220px, 35vw, 320px)", height: "clamp(220px, 35vw, 320px)", borderRadius: "50%", background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)", alignItems: "center", justifyContent: "center", fontSize: 80, fontWeight: 900, color: "#4f46e5", border: "4px solid white", position: "relative", zIndex: 2 }}>
                  AV
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects">
        <RevealSection>
          <div className="section-header">
            <h2 className="section-title">Featured Architecture</h2>
            <p className="section-subtitle">
              Production-ready applications engineered with a focus on clean architecture, AI integration, and scalable database design.
            </p>
          </div>

          {/* Filter Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: 40 }}>
            {PROJECT_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setProjectFilter(cat)} style={{ fontFamily: "monospace", padding: "8px 16px", borderRadius: 8, border: "1px solid", fontSize: 13, cursor: "pointer", transition: "all 0.2s", background: projectFilter === cat ? "#4f46e5" : "transparent", color: projectFilter === cat ? "white" : "#475569", borderColor: projectFilter === cat ? "#4f46e5" : "#cbd5e1" }}>
                {cat}
              </button>
            ))}
          </div>
        </RevealSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {filteredProjects.map((p, i) => (
            <RevealSection key={p.id} delay={i * 50}>
              <div className="glass-card" style={{ padding: "2rem", height: "100%", display: "flex", flexDirection: "column" }} onClick={() => setExpandedProject(expandedProject === p.id ? null : p.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ fontSize: 32, background: "white", width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>{p.emoji}</div>
                  <span style={{ fontFamily: "monospace", fontSize: 11, padding: "4px 10px", borderRadius: 6, background: p.badgeBg, color: p.badgeColor, border: `1px solid ${p.badgeColor}33` }}>{p.badge}</span>
                </div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", marginBottom: 8, letterSpacing: "-0.02em" }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: "#64748b", fontWeight: 600, marginBottom: 16 }}>{p.role} // {p.period}</p>
                <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.6, marginBottom: 24, flex: 1 }}>{p.desc}</p>

                {expandedProject === p.id && (
                  <div style={{ marginBottom: 24, background: "#f8fafc", padding: "16px", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {p.features.map((f, fi) => (
                        <li key={fi} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13.5, color: "#475569", padding: "4px 0", lineHeight: 1.5 }}>
                          <span style={{ color: "#10b981", fontWeight: 800 }}>✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                  {p.stack.map(t => (
                    <span key={t} style={{ fontFamily: "monospace", fontSize: 11, padding: "4px 8px", background: "#f1f5f9", color: "#475569", borderRadius: 6, border: "1px solid #e2e8f0" }}>{t}</span>
                  ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: 20 }}>
                  {p.github && <a href={p.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="btn-outline" style={{ padding: "6px 14px", fontSize: 13, borderRadius: 8 }}>{ICONS.github} Code</a>}
                  {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="btn-primary" style={{ padding: "6px 14px", fontSize: 13, borderRadius: 8 }}>Live ↗</a>}
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", marginLeft: "auto" }}>{expandedProject === p.id ? "- Less" : "+ Features"}</span>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills">
        <RevealSection>
          <div className="section-header">
            <h2 className="section-title">Technical Expertise</h2>
            <p className="section-subtitle">
              Core technologies and frameworks I leverage to design and deploy scalable systems.
            </p>
          </div>
        </RevealSection>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {SKILLS.map((sk, i) => (
            <RevealSection key={sk.cat} delay={i * 50}>
              <div className="glass-card" style={{ padding: "2rem", height: "100%" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                  <span>{sk.icon}</span> {sk.cat}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {sk.items.map(item => (
                    <span key={item} className="skill-tag">{item}</span>
                  ))}
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements">
        <RevealSection>
          <div className="section-header">
            <h2 className="section-title">Key Milestones</h2>
            <p className="section-subtitle">
              Recognitions across competitive programming, hackathons, and global challenges.
            </p>
          </div>
        </RevealSection>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
          {ACHIEVEMENTS.map((a, i) => (
            <RevealSection key={a.title} delay={i * 40}>
              <div className="glass-card" style={{ padding: "1.5rem", display: "flex", gap: 16, alignItems: "flex-start", height: "100%" }}>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: a.iconBg, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0, boxShadow: `0 8px 20px ${a.iconBg}40` }}>{a.icon}</div>
                <div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: 6, lineHeight: 1.3 }}>{a.title}</div>
                  <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{a.sub}</div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* EDUCATION TIMELINE */}
      <section id="education" style={{ paddingBottom: "40px" }}>
        <RevealSection>
          <div className="section-header">
            <h2 className="section-title">Academic Journey</h2>
            <p className="section-subtitle">
              My formal education background and institutional learning.
            </p>
          </div>
        </RevealSection>

        <div className="timeline-center-wrapper">
          <div className="timeline-center-line"></div>
          {EDUCATION.map((edu, idx) => {
            const isLeft = idx % 2 !== 0; 
            return (
              <RevealSection key={idx} delay={idx * 100}>
                <div className="timeline-row" style={{ flexDirection: isLeft ? 'row-reverse' : 'row' }}>
                  <div className="timeline-dot-center"></div>
                  
                  {/* Empty div for spacing on desktop */}
                  <div className="timeline-content" style={{ opacity: 0, display: "none" }} /> 
                  
                  {/* Actual Content Card */}
                  <div className="timeline-content" style={{ textAlign: "left" }}>
                    <div className="glass-card" style={{ padding: "24px 32px", border: "1px solid #e2e8f0", borderRadius: "16px" }}>
                      <div style={{ fontFamily: "monospace", fontSize: 13, color: "#4f46e5", fontWeight: 700, marginBottom: 8 }}>{edu.year}</div>
                      <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", marginBottom: 12 }}>{edu.degree}</div>
                      
                      <div style={{ fontSize: 14, color: "#64748b", display: "flex", alignItems: "center", gap: 8, marginBottom: edu.score ? 16 : 0 }}>
                        <span style={{ color: "#94a3b8" }}>{ICONS.hat}</span>
                        <span>{edu.school}</span>
                      </div>

                      {edu.score && (
                        <span style={{ color: "#4f46e5", background: "#eef2ff", padding: "4px 12px", borderRadius: "100px", fontSize: 12, fontWeight: 700, display: "inline-block" }}>
                          {edu.score}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </RevealSection>
            );
          })}
        </div>
      </section>

      {/* CERTIFICATES */}
      <section id="certificates" style={{ paddingTop: "20px" }}>
        <RevealSection>
          <div className="section-header">
            <h2 className="section-title">Certifications</h2>
            <p className="section-subtitle">
              Verified learning credentials from global tech leaders and educational platforms.
            </p>
          </div>
        </RevealSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
          {CERTS.map((c, i) => (
            <RevealSection key={c.name} delay={i * 50}>
              <div className="glass-card cert-item" style={{ padding: "1.5rem", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", background: c.color, flexShrink: 0, marginTop: 4, boxShadow: `0 0 10px ${c.color}80` }} />
                  <div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.3, marginBottom: 4 }}>{c.name}</h4>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>{c.issuer} // {c.date}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{c.overview}</p>
                <a href={c.link} target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 700, color: c.color, textDecoration: "none", marginTop: "auto" }}>Verify Credential →</a>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ONLINE PRESENCE / CODING PROFILES */}
      <section id="profiles">
        <RevealSection>
          <div className="section-header">
            <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: "#4f46e5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Online Presence</div>
            <h2 className="section-title">Coding Profiles</h2>
            <p className="section-subtitle">
              Find me across the developer ecosystem.
            </p>
          </div>
        </RevealSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
          {PROFILES.map((p, i) => (
            <RevealSection key={p.name} delay={i * 80}>
              <a href={p.url} target="_blank" rel="noreferrer" className="glass-card profile-card" style={{ display: "flex", flexDirection: "column", padding: "2rem", textDecoration: "none", color: "inherit", height: "100%" }}>
                <div style={{ width: 54, height: 54, borderRadius: 16, background: p.bg, color: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20 }}>{p.icon}</div>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontFamily: "monospace", fontSize: 13, color: "#64748b", fontWeight: 600, marginBottom: 12 }}>@{p.handle}</div>
                <div style={{ fontSize: 14, color: "#475569", flex: 1, marginBottom: 20, lineHeight: 1.6 }}>{p.desc}</div>
                <span style={{ fontSize: 14, fontWeight: 700, color: p.color }}>View Profile ↗</span>
              </a>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <RevealSection>
          <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: 32, padding: "clamp(2rem, 5vw, 4rem)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "center", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)", position: "relative", overflow: "hidden" }}>
            
            {/* Background design elements */}
            <div style={{ position: "absolute", top: -100, right: -100, width: 300, height: 300, background: "#4f46e5", filter: "blur(100px)", opacity: 0.3, borderRadius: "50%" }}></div>
            <div style={{ position: "absolute", bottom: -100, left: -100, width: 300, height: 300, background: "#0ea5e9", filter: "blur(100px)", opacity: 0.2, borderRadius: "50%" }}></div>

            <div style={{ position: "relative", zIndex: 2 }}>
              <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "white", marginBottom: 20, lineHeight: 1.1 }}>Let's build the future.</h2>
              <p style={{ color: "#94a3b8", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: 40, maxWidth: 450 }}>
                Actively seeking Software Engineering Internships and Full-Time Roles. Let's collaborate on innovative AI, IoT, and Full Stack solutions.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {PROFILES.slice(0,2).map(p => (
                  <a key={p.name} href={p.url} target="_blank" rel="noreferrer" style={{ fontSize: 14, fontWeight: 600, padding: "10px 20px", borderRadius: 10, border: "1px solid #374151", color: "white", textDecoration: "none", transition: "all 0.2s", background: "rgba(255,255,255,0.05)" }} className="btn-hover">{p.name} ↗</a>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative", zIndex: 2 }}>
              {[
                { icon: ICONS.email, label: "Email", val: "ananyaverma639@gmail.com", href: "mailto:ananyaverma639@gmail.com" },
                { icon: ICONS.linkedin, label: "LinkedIn", val: "ananya-verma", href: "https://linkedin.com/in/ananya-verma-960b93330" },
                { icon: ICONS.github, label: "GitHub", val: "AnanyaVerma535", href: "https://github.com/AnanyaVerma535" },
                { icon: "📄", label: "Resume", val: "Download PDF", href: "/Ananya_Verma_Resume.pdf", download: true },
              ].map((r, idx) => (
                <a key={idx} href={r.href || "#"} download={r.download} className="btn-hover" style={{ display: "flex", alignItems: "center", gap: 20, padding: "20px", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, textDecoration: "none", color: "inherit", transition: "all 0.3s" }}>
                  <div style={{ width: 44, height: 44, background: "rgba(255,255,255,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "white", flexShrink: 0 }}>{r.icon}</div>
                  <div>
                    <div style={{ fontFamily: "monospace", fontSize: 13, color: "#94a3b8", marginBottom: 4 }}>{r.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "white", wordBreak: "break-word" }}>{r.val}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "3rem 1.5rem", borderTop: "1px solid #e2e8f0", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ fontWeight: 900, fontSize: 22, color: "#4f46e5", letterSpacing: "-0.04em" }}>Ananya.dev</div>
        <div style={{ fontSize: 14, color: "#64748b", fontWeight: 500 }}>Designed & Engineered by Ananya Verma · © {new Date().getFullYear()}</div>
        <div style={{ fontFamily: "monospace", fontSize: 12, color: "#94a3b8" }}>Built with React & Vite. Optimized for performance.</div>
      </footer>

      {/* SCROLL TO TOP */}
      <button 
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`} 
        onClick={() => window.scrollTo(0,0)}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
}