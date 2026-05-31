import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  GraduationCap,
  Lightbulb,
  CalendarDays,
  Quote,
  Users,
  X,
  FileText,
  Globe,
  Building,
  Zap,
  Heart,
  BookMarked,
  Menu,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const expertiseAreas = [
  { num: "01", title: "B.A. Developmental Psychology", school: "Hunter College, City University of New York", description: "A foundational grounding in how children grow, think, and learn — informing every consultation with a deep understanding of child development, cognition, and the psychological dimensions of education." },
  { num: "02", title: "M.A. Inclusive Education", school: "Teachers College, Columbia University", description: "Graduate training specializing in inclusive practices and teaching students with disabilities — bridging research and real-world classroom application." },
  { num: "03", title: "Ph.D. Educational Leadership & Policy Studies", school: "University of Denver", description: "Doctoral research examining the policies governing emerging and innovative technology and digital infrastructure in education — positioning Dr. Terracciano at the intersection of educational leadership and the future of learning." },
];

const specializedTraining = [
  { title: "Orton-Gillingham", desc: "A structured, sequential, multisensory approach to literacy instruction — widely regarded as the gold standard for teaching students with dyslexia and other reading differences." },
  { title: "PAF (Preventing Academic Failure)", desc: "A structured literacy program developed specifically to teach reading, writing, and spelling to students who struggle with traditional methods. Learn more at pafprogram.com." },
  { title: "Wilson Reading System®", desc: "A systematic, multisensory structured literacy program based on Orton-Gillingham principles, designed for students with word-level reading and spelling difficulties." },
  { title: "Handwriting Without Tears®", desc: "A developmentally based handwriting curriculum that makes learning to write fun, easy, and accessible for all learners." },
  { title: "200-Hour Registered Yoga Teacher (RYT-200)", desc: "A fully certified yoga teacher training that deepens Dr. Terracciano's holistic approach to learning — bringing mindfulness, body awareness, and regulated nervous systems into every educational space she enters." },
];

const services = [
  { id: "consulting", icon: Brain, title: "Private Educational Consulting", desc: "Personalized 1:1 consulting for families navigating complex educational decisions, learning differences, or academic transitions. Dr. Terracciano works closely with you to understand your learner's unique needs and design a clear, actionable path forward." },
  { id: "tutoring", icon: BookOpen, title: "Academic Tutoring", desc: "Expert subject-matter support tailored to your learner's pace, style, and goals — from foundational skills to advanced coursework. Sessions are structured, engaging, and designed to build lasting confidence." },
  { id: "literacy", icon: BookMarked, title: "Literacy & Reading Support", desc: "Structured literacy intervention using Orton-Gillingham, Wilson Reading System®, and PAF — evidence-based approaches for all readers including those with dyslexia and reading differences." },
  { id: "homeschool", icon: GraduationCap, title: "Homeschool Planning & Curriculum Design", desc: "Custom curriculum architecture and learning plans for families building rigorous, joyful homeschool programs. Dr. Terracciano designs pathways that honor your child's learning style and your family's goals." },
  { id: "advocacy", icon: Heart, title: "Educational Advocacy & Parent Strategy", desc: "Empowering parents to navigate IEPs, 504 plans, school systems, and educational rights with confidence and clarity. You will never have to walk into a meeting unprepared again." },
  { id: "dissertation", icon: FileText, title: "Dissertation & Research Consulting", desc: "Expert guidance for doctoral students and researchers navigating qualitative methodology, data analysis, and academic writing. Dr. Terracciano brings deep research expertise to every stage of the process." },
  { id: "policy", icon: Globe, title: "Educational Policy & EdTech Consulting", desc: "Strategic consulting for organizations, institutions, and founders at the intersection of education, policy, and technology. Grounded in doctoral-level research and real-world implementation experience." },
  { id: "org", icon: Building, title: "School / Organizational Consulting", desc: "Systems-level consulting for schools and educational organizations seeking to improve outcomes, equity, and culture. Dr. Terracciano partners with leadership teams to drive meaningful, lasting change." },
  { id: "intervention", icon: Zap, title: "Intensive Academic Intervention", desc: "Targeted, high-impact sessions for students who need accelerated support in literacy, math, or executive functioning. Designed for learners who need more than the standard approach." },
  { id: "retainer", icon: CalendarDays, title: "Monthly Family Educational Retainer", desc: "Ongoing advisory support for families who want consistent, high-touch educational guidance throughout the school year. A dedicated partner in your child's educational journey." },
  { id: "pods", icon: Users, title: "Learning Pods", desc: "Curated small-group learning series for children focused on academic growth, supplemental enrichment, and intellectual curiosity. Intentionally small groups ensure every child is seen, supported, and challenged at the right level." },
  { id: "halfday", icon: Lightbulb, title: "Half-Day & Full-Day Consulting", desc: "Intensive consulting engagements for schools, organizations, and leadership teams requiring deep-dive strategic sessions. Available as half-day or full-day formats depending on scope and need." },
];

const heroTags = ["Special Education", "Literacy", "Blockchain & EdTech", "Homeschool Planning"];
const stripItems = ["Literacy & Reading", "Special Education", "Curriculum Design", "EdTech Strategy", "Blockchain & Credentialing", "Homeschool Planning", "Child Development", "Educational Leadership"];
const values = [
  "Deep respect for each learner's individuality",
  "Research-informed, practical recommendations",
  "A warm but direct approach to solving learning challenges",
  "Experience across public, private, virtual, and alternative education spaces",
];

function goToBook(serviceId) {
  window.location.href = serviceId ? `/book?service=${serviceId}` : "/book";
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

function MarqueeStrip() {
  const doubled = [...stripItems, ...stripItems];
  return (
    <div style={{ background: "#5C2D82", overflow: "hidden", whiteSpace: "nowrap", padding: "14px 0" }}>
      <motion.div style={{ display: "inline-flex", gap: "2.5rem" }} animate={{ x: ["0%", "-50%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>
            {item}{i < doubled.length - 1 && <span style={{ color: "rgba(255,255,255,0.25)", marginLeft: "2.5rem" }}>·</span>}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
      <div style={{ width: "20px", height: "1.5px", background: "#9B6BBD", borderRadius: "2px", flexShrink: 0 }} />
      <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9B6BBD" }}>{children}</span>
    </div>
  );
}

function ServiceModal({ service, onClose, isMobile }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", padding: isMobile ? "0" : "2rem" }}
    >
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 100 : 32, scale: isMobile ? 1 : 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: isMobile ? 100 : 32, scale: isMobile ? 1 : 0.96 }}
        transition={{ duration: 0.3 }}
        onClick={e => e.stopPropagation()}
        style={{ background: "#fff", borderRadius: isMobile ? "16px 16px 0 0" : "16px", padding: isMobile ? "2rem 1.5rem 3rem" : "3rem", maxWidth: isMobile ? "100%" : "540px", width: "100%", position: "relative", boxShadow: "0 24px 64px rgba(92,45,130,0.2)" }}
      >
        <button onClick={onClose} style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "none", border: "none", cursor: "pointer", color: "#999" }}>
          <X size={20} />
        </button>
        <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#F2EBF8", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
          <Icon size={22} color="#5C2D82" />
        </div>
        <h2 style={{ fontSize: isMobile ? "20px" : "24px", fontWeight: 500, color: "#0D0D0D", marginBottom: "1rem", letterSpacing: "-0.01em", lineHeight: 1.3 }}>{service.title}</h2>
        <p style={{ fontSize: "15px", lineHeight: 1.85, color: "#666", marginBottom: "2rem" }}>{service.desc}</p>
        <button
          onClick={() => goToBook(service.id)}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#5C2D82", color: "#fff", padding: "14px 28px", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: "3px", cursor: "pointer", width: isMobile ? "100%" : "auto", justifyContent: isMobile ? "center" : "flex-start" }}
        >
          Book this service <ArrowRight size={14} />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function ClarissaWebsite() {
  const [selectedService, setSelectedService] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div style={{ background: "#F9F6F2", color: "#0D0D0D", minHeight: "100vh", fontFamily: "inherit", overflowX: "hidden" }}>

      <style>{`
        @media (max-width: 767px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-image { min-height: 320px !important; }
          .expertise-grid { grid-template-columns: 1fr !important; }
          .expertise-item { border-right: none !important; border-bottom: 0.5px solid rgba(0,0,0,0.1); }
          .expertise-item:last-child { border-bottom: none; }
          .training-grid { grid-template-columns: 1fr !important; }
          .services-grid { grid-template-columns: 1fr 1fr !important; }
          .nav-links { display: none !important; }
          .nav-book-btn { display: none !important; }
          .about-section { padding: 4rem 1.25rem !important; }
          .services-section { padding: 4rem 1.25rem !important; }
          .approach-section { padding: 4rem 1.25rem !important; }
          .booking-section { padding: 5rem 1.25rem !important; }
          .quote-section { padding: 3rem 1.25rem !important; }
          .footer-inner { flex-direction: column !important; align-items: flex-start !important; gap: 0.5rem !important; }
        }
        @media (max-width: 480px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <AnimatePresence>
        {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} isMobile={isMobile} />}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "#1A0F24", zIndex: 200, display: "flex", flexDirection: "column", padding: "2rem 1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
              <div style={{ fontSize: "15px", fontWeight: 500, letterSpacing: "0.06em", color: "#fff" }}>Clarissa Terracciano</div>
              <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }}><X size={24} /></button>
            </div>
            {["About", "Services", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                style={{ fontSize: "28px", fontWeight: 300, color: "#fff", textDecoration: "none", letterSpacing: "-0.01em", padding: "1rem 0", borderBottom: "0.5px solid rgba(255,255,255,0.1)" }}>
                {item}
              </a>
            ))}
            <button onClick={() => { goToBook(); setMenuOpen(false); }}
              style={{ marginTop: "2rem", background: "#5C2D82", color: "#fff", border: "none", padding: "16px", borderRadius: "3px", fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>
              Book a session
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "1rem 1.25rem" : "1.25rem 2.5rem", borderBottom: "0.5px solid rgba(0,0,0,0.09)", background: "rgba(249,246,242,0.92)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ fontSize: "15px", fontWeight: 500, letterSpacing: "0.06em" }}>Clarissa Terracciano</div>
        <div className="nav-links" style={{ display: "flex", gap: "2rem", fontSize: "13px", color: "#666" }}>
          <a href="#about" style={{ color: "inherit", textDecoration: "none" }}>About</a>
          <a href="#services" style={{ color: "inherit", textDecoration: "none" }}>Services</a>
          <a href="#booking" style={{ color: "inherit", textDecoration: "none" }}>Contact</a>
        </div>
        <button className="nav-book-btn" onClick={() => goToBook()} style={{ background: "#5C2D82", color: "#fff", border: "none", padding: "10px 22px", borderRadius: "3px", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>
          Book a session
        </button>
        {isMobile && (
          <button onClick={() => setMenuOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "#0D0D0D", padding: "4px" }}>
            <Menu size={22} />
          </button>
        )}
      </nav>

      <section className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", minHeight: isMobile ? "auto" : "88vh" }}>
        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ padding: isMobile ? "3rem 1.25rem" : "5rem 3rem 4rem 2.5rem", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: isMobile ? "none" : "0.5px solid rgba(0,0,0,0.09)" }}>
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
            <div style={{ width: "28px", height: "1.5px", background: "#9B6BBD", borderRadius: "2px" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9B6BBD" }}>Educational Consulting</span>
          </motion.div>
          <motion.h1 variants={fadeUp} style={{ fontSize: isMobile ? "36px" : "clamp(36px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#0D0D0D", marginBottom: "1.5rem" }}>
            Exceptional guidance for{" "}<em style={{ fontStyle: "italic", fontWeight: 300, color: "#5C2D82" }}>exceptional</em>{" "}learners.
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: "15px", lineHeight: 1.85, color: "#666", marginBottom: "2rem" }}>
            Dr. Clarissa Terracciano partners with families, educators, and institutions to design high-impact educational pathways grounded in two decades of expertise.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "2rem" }}>
            {heroTags.map((tag) => (
              <span key={tag} style={{ background: "#F2EBF8", color: "#3B1A55", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 14px", borderRadius: "100px" }}>{tag}</span>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button onClick={() => goToBook()} style={{ background: "#5C2D82", color: "#fff", padding: "14px 24px", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: "3px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", flex: isMobile ? "1" : "none", justifyContent: "center" }}>
              Book a consultation <ArrowRight size={14} />
            </button>
            <a href="#services" style={{ background: "transparent", color: "#0D0D0D", padding: "14px 24px", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", border: "0.5px solid rgba(0,0,0,0.25)", borderRadius: "3px", textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: isMobile ? "1" : "none" }}>
              Explore services
            </a>
          </motion.div>
        </motion.div>

        <motion.div className="hero-image" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }}
          style={{ background: "#1A0F24", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2rem", position: "relative", overflow: "hidden", minHeight: isMobile ? "320px" : "auto" }}>
          <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "rgba(155,107,189,0.18)" }} />
          <div style={{ position: "absolute", inset: 0 }}>
            <img src="/clarissa-headshot.jpg" alt="Dr. Clarissa Terracciano" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,15,36,0.85) 0%, rgba(26,15,36,0.2) 50%, transparent 100%)" }} />
          </div>
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "inline-block", background: "rgba(155,107,189,0.3)", color: "#F2EBF8", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 14px", borderRadius: "100px", marginBottom: "1rem" }}>Ph.D. · Licensed NY & CO</div>
            <div style={{ fontSize: isMobile ? "20px" : "26px", fontWeight: 300, color: "#fff", letterSpacing: "-0.01em", marginBottom: "4px" }}>Dr. Clarissa Terracciano</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}>Educational Consultant · 20 Years Experience</div>
          </div>
        </motion.div>
      </section>

      <MarqueeStrip />

      <section id="about" className="about-section" style={{ padding: "6rem 2.5rem", textAlign: "center" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
          <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center" }}><SectionLabel>About Clarissa</SectionLabel></motion.div>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.15, color: "#0D0D0D", maxWidth: "560px", margin: "0 auto 1.5rem" }}>
            A career built on{" "}<em style={{ fontStyle: "italic", fontWeight: 300, color: "#5C2D82" }}>transforming</em>{" "}how people learn.
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: "15px", lineHeight: 1.85, color: "#666", maxWidth: "640px", margin: "0 auto 1.5rem", textAlign: "left" }}>
            Dr. Clarissa Terracciano's story in education begins at sixteen — not in a lecture hall, but at a South Florida summer camp, working alongside students with disabilities. It was her first glimpse into how differently people learn, and how profoundly the right support can change a child's experience of the world. She never looked back.
          </motion.p>
          <motion.p variants={fadeUp} style={{ fontSize: "15px", lineHeight: 1.85, color: "#666", maxWidth: "640px", margin: "0 auto 1.5rem", textAlign: "left" }}>
            That early spark led her to Hunter College, where she studied developmental psychology — building the scientific foundation for understanding how children grow, think, and learn. She began her journey in the schooling system working directly with learners across the full lifespan, from toddlers to adults in their sixties, coaching and guiding their development across three pillars that rarely get equal attention in traditional education: wellness, socialization, and sport.
          </motion.p>
          <motion.p variants={fadeUp} style={{ fontSize: "15px", lineHeight: 1.85, color: "#666", maxWidth: "640px", margin: "0 auto 1.5rem", textAlign: "left" }}>
            She went on to earn her Master's degree at Teachers College, Columbia University, where she specialized in inclusive education and teaching students with disabilities. After graduating, she brought that expertise into New York City schools and later Colorado schools, working across both urban and mountain communities to make meaningful, high-quality education accessible to all.
          </motion.p>
          <motion.p variants={fadeUp} style={{ fontSize: "15px", lineHeight: 1.85, color: "#666", maxWidth: "640px", margin: "0 auto 3rem", textAlign: "left" }}>
            Two decades into her career, she pursued her doctorate — earning a Ph.D. in Educational Leadership and Policy Studies, with research focused on the policies shaping emerging technology and digital infrastructure in education. That full arc — from a summer camp in South Florida to the frontier of educational policy — is what she brings to every family, educator, and organization she works with today.
          </motion.p>

          <div className="expertise-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "0.5px solid rgba(0,0,0,0.1)", marginBottom: "4rem", textAlign: "left" }}>
            {expertiseAreas.map((area, index) => (
              <motion.div key={area.num} className="expertise-item" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ padding: "2rem 1.75rem", borderRight: index < expertiseAreas.length - 1 ? "0.5px solid rgba(0,0,0,0.1)" : "none" }}>
                <div style={{ width: "32px", height: "2px", background: "#5C2D82", borderRadius: "2px", marginBottom: "1.25rem" }} />
                <div style={{ fontSize: "15px", fontWeight: 500, color: "#0D0D0D", marginBottom: "4px", lineHeight: 1.35 }}>{area.title}</div>
                <div style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#9B6BBD", marginBottom: "1rem" }}>{area.school}</div>
                <div style={{ fontSize: "13px", lineHeight: 1.85, color: "#666" }}>{area.description}</div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: "left" }}>
            <motion.div variants={fadeUp}><SectionLabel>Specialized Training & Certifications</SectionLabel></motion.div>
            <motion.p variants={fadeUp} style={{ fontSize: "15px", lineHeight: 1.85, color: "#666", maxWidth: "640px", marginBottom: "2rem" }}>
              Dr. Terracciano holds specialized training in the most respected structured literacy and learning methodologies in the field.
            </motion.p>
            <div className="training-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
              {specializedTraining.map((item, index) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ padding: "1.5rem", background: "#fff", border: "0.5px solid rgba(92,45,130,0.12)", borderRadius: "8px", borderLeft: "3px solid #5C2D82" }}>
                  <div style={{ fontSize: "15px", fontWeight: 600, color: "#0D0D0D", marginBottom: "6px" }}>{item.title}</div>
                  <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#666" }}>{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <motion.section className="quote-section" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}
        style={{ background: "#F2EBF8", borderTop: "0.5px solid rgba(92,45,130,0.12)", borderBottom: "0.5px solid rgba(92,45,130,0.12)", padding: "5rem 2.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Quote size={28} color="#9B6BBD" style={{ marginBottom: "1.5rem", opacity: 0.6 }} />
          <p style={{ fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 300, lineHeight: 1.5, color: "#3B1A55", fontStyle: "italic", letterSpacing: "-0.01em" }}>
            "True educational growth requires more than generic solutions — it requires someone who understands the whole learner, the full system, and the long road ahead."
          </p>
          <div style={{ marginTop: "1.5rem", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#9B6BBD" }}>— Dr. Clarissa Terracciano</div>
        </div>
      </motion.section>

      <section id="services" className="services-section" style={{ background: "#1A0F24", padding: "6rem 2.5rem" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={stagger}>
          <motion.div variants={fadeUp}><SectionLabel>Services</SectionLabel></motion.div>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#fff", marginBottom: "0.75rem", maxWidth: "560px" }}>
            High-level consulting designed to create{" "}<em style={{ fontStyle: "italic", fontWeight: 300, color: "#9B6BBD" }}>clarity</em> and results.
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", marginBottom: "2.5rem" }}>Tap any service to learn more and book.</motion.p>
          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.07)" }}>
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  whileHover={{ background: "rgba(92,45,130,0.3)" }}
                  onClick={() => setSelectedService(service)}
                  style={{ background: "#1A0F24", padding: "1.5rem", cursor: "pointer", transition: "background 0.2s" }}
                >
                  <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(92,45,130,0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
                    <Icon size={18} color="#F2EBF8" />
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "#fff", marginBottom: "6px", lineHeight: 1.35 }}>{service.title}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", display: "flex", alignItems: "center", gap: "4px" }}>
                    Learn more <ArrowRight size={10} />
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <button onClick={() => goToBook()} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#5C2D82", color: "#fff", padding: "15px 32px", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: "3px", cursor: "pointer", width: isMobile ? "100%" : "auto", justifyContent: "center" }}>
              Book a session <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </section>

      <section className="approach-section" style={{ padding: "6rem 2.5rem", background: "#fff" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center" }}><SectionLabel>My approach</SectionLabel></motion.div>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#0D0D0D", maxWidth: "500px", margin: "0 auto 2.5rem" }}>
            Strategic expertise for{" "}<em style={{ fontStyle: "italic", fontWeight: 300, color: "#5C2D82" }}>meaningful</em> educational growth.
          </motion.h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "left" }}>
            {values.map((value) => (
              <motion.div key={value} variants={fadeUp} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "1.25rem 1.5rem", background: "#F2EBF8", border: "0.5px solid rgba(92,45,130,0.12)", borderRadius: "6px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#5C2D82", flexShrink: 0, marginTop: "7px" }} />
                <span style={{ fontSize: "14px", lineHeight: 1.75, color: "#3B1A55" }}>{value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="booking" className="booking-section" style={{ padding: "8rem 2.5rem", borderTop: "0.5px solid rgba(0,0,0,0.09)", textAlign: "center" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <motion.div variants={fadeUp} style={{ width: "56px", height: "56px", borderRadius: "12px", background: "#F2EBF8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem" }}>
            <CalendarDays size={26} color="#5C2D82" />
          </motion.div>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 400, letterSpacing: "-0.025em", color: "#0D0D0D", marginBottom: "1.5rem", lineHeight: 1.1 }}>
            Bring expert insight into your{" "}<em style={{ fontStyle: "italic", fontWeight: 300, color: "#5C2D82" }}>learner's</em> journey.
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: "15px", color: "#666", maxWidth: "520px", margin: "0 auto 3rem" }}>
            Book a consultation for thoughtful, research-informed educational guidance tailored to your learner, family, school, or organization. All sessions are conducted via Zoom.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", flexDirection: isMobile ? "column" : "row", alignItems: "center" }}>
            <button onClick={() => goToBook()} style={{ background: "#5C2D82", color: "#fff", padding: "15px 32px", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: "3px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", width: isMobile ? "100%" : "auto", justifyContent: "center" }}>
              Book a free discovery call <ArrowRight size={14} />
            </button>
            <button onClick={() => goToBook()} style={{ background: "transparent", color: "#0D0D0D", padding: "15px 32px", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", border: "0.5px solid rgba(0,0,0,0.25)", borderRadius: "3px", cursor: "pointer", width: isMobile ? "100%" : "auto" }}>
              Book a service
            </button>
          </motion.div>
        </motion.div>
      </section>

      <footer style={{ borderTop: "0.5px solid rgba(0,0,0,0.09)", padding: "2rem 1.25rem" }}>
        <div className="footer-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <div style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px" }}>
            Clarissa Terracciano
            <a href="/admin" style={{ fontSize: "16px", color: "#0D0D0D", textDecoration: "none" }}>☮</a>
          </div>
          <div style={{ fontSize: "12px", color: "#aaa", letterSpacing: "0.04em" }}>Learning · Literacy · Special Education · Curriculum · EdTech · Policy</div>
          <div style={{ fontSize: "12px", color: "#aaa" }}>© 2026 Educational Consulting</div>
        </div>
      </footer>
    </div>
  );
}
