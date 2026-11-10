import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpenText,
  Building2,
  CalendarDays,
  FileText,
  Globe,
  Menu,
  Quote,
  Users,
  X,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const serviceCards = [
  {
    title: "Educational Consulting & Academic Support",
    text: "Personalized educational support for children, students, and adult learners. Includes literacy, mathematics, learning differences, dyslexia, executive functioning, gifted education, homeschooling, individualized instruction, and special education support.",
  },
  {
    title: "Family Support & Parent Coaching",
    text: "Guidance for parents and families navigating learning, child development, educational decisions, and school experiences. Includes parent coaching, social-emotional learning, educational advocacy, homeschooling, school transitions, and IEP/504 guidance.",
  },
  {
    title: "School & Organizational Consulting",
    text: "Research-informed consulting for schools, educational institutions, organizations, and leadership teams. Includes professional development, curriculum design, instructional improvement, inclusive and special education, educational leadership, program development, competency-based education, and organizational strategy.",
  },
  {
    title: "Research, Policy & Educational Innovation",
    text: "Research and strategic consulting at the intersection of education, policy, emerging technologies, and innovation. Includes qualitative research, policy analysis, blockchain in education, decentralized learning systems, educational technology, competency-based credentials, and research collaboration.",
  },
];

const publications = [
  {
    type: "Doctoral dissertation",
    year: "2026",
    citation:
      "Terracciano, Clarissa. (2026). Higher Education Institutions in U.S. Blockchain Innovation Governance Documents. Electronic Theses and Dissertations, 2753. University of Denver.",
    venue: "University of Denver",
    url: "https://digitalcommons.du.edu/etd/2753",
    doi: "https://doi.org/10.56902/ETDCRP.2026.125",
  },
  {
    type: "Conference presentation",
    year: "2024",
    citation:
      "Terracciano, C. (2024). Blockchain for Justice and Joy: A Unique Perspective on Revolutionizing Equity, Access and Mobility Through Leadership and Policy.",
    venue: "UCEA Annual Convention, Los Angeles, CA, USA",
    url: null,
    doi: null,
  },
  {
    type: "University blog",
    year: "2025",
    citation:
      "Terracciano, C. (2025, April 2). Part II: How blockchain can support all learners.",
    venue: "Notre Dame Center for Literacy Education",
    url: "https://iei.nd.edu/initiatives/notre-dame-center-for-literacy-education/news/part-ii-how-blockchain-can-support-all",
    doi: null,
  },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return isMobile;
}

function goToBook() {
  window.location.href = "/book";
}

export default function ClarissaWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div style={{ background: "#F9F6F2", color: "#0D0D0D", minHeight: "100vh", fontFamily: "inherit", overflowX: "hidden" }}>
      <style>{`
        html { scroll-behavior: smooth; }
        @media (max-width: 767px) {
          .nav-links { display: none !important; }
          .nav-request-btn { display: none !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-image { min-height: 320px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .footer-inner { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: "fixed", inset: 0, background: "#1A0F24", zIndex: 200, display: "flex", flexDirection: "column", padding: "2rem 1.5rem" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
            <div style={{ fontSize: "15px", fontWeight: 500, letterSpacing: "0.06em", color: "#fff" }}>Clarissa Terracciano</div>
            <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }}>
              <X size={24} />
            </button>
          </div>
          {["About", "Services", "Projects", "Research & Publications", "Contact"].map((item) => {
            const href = item === "About" ? "#about" : item === "Services" ? "/services" : item === "Projects" ? "/projects" : item === "Research & Publications" ? "/research" : item === "Contact" ? "#contact" : "/";
            return (
              <a
                key={item}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: "28px", fontWeight: 300, color: "#fff", textDecoration: "none", letterSpacing: "-0.01em", padding: "1rem 0", borderBottom: "0.5px solid rgba(255,255,255,0.1)" }}
              >
                {item}
              </a>
            );
          })}
          <a
            href="/book"
            onClick={() => setMenuOpen(false)}
            style={{ marginTop: "2rem", background: "#5C2D82", color: "#fff", border: "none", padding: "16px", borderRadius: "3px", fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", textDecoration: "none", textAlign: "center" }}
          >
            Request a Consultation
          </a>
        </motion.div>
      )}

      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "1rem 1.25rem" : "1.25rem 2.5rem", borderBottom: "0.5px solid rgba(0,0,0,0.09)", background: "rgba(249,246,242,0.92)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 50 }}>
        <a href="/" style={{ color: "#0D0D0D", textDecoration: "none", fontSize: "15px", fontWeight: 500, letterSpacing: "0.06em" }}>Clarissa Terracciano</a>
        <div className="nav-links" style={{ display: "flex", gap: "2rem", fontSize: "13px", color: "#666" }}>
          <a href="#about" style={{ color: "inherit", textDecoration: "none" }}>About</a>
          <a href="/services" style={{ color: "inherit", textDecoration: "none" }}>Services</a>
          <a href="/projects" style={{ color: "inherit", textDecoration: "none" }}>Projects</a>
          <a href="/research" style={{ color: "inherit", textDecoration: "none" }}>Research & Publications</a>
          <a href="#contact" style={{ color: "inherit", textDecoration: "none" }}>Contact</a>
        </div>
        <a href="/book" className="nav-request-btn" style={{ background: "#5C2D82", color: "#fff", padding: "10px 22px", borderRadius: "3px", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          Request a Consultation
        </a>
        {isMobile && (
          <button onClick={() => setMenuOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "#0D0D0D", padding: "4px" }}>
            <Menu size={22} />
          </button>
        )}
      </nav>

      <section className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", minHeight: isMobile ? "auto" : "88vh" }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          style={{ padding: isMobile ? "3rem 1.25rem" : "5rem 3rem 4rem 2.5rem", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: isMobile ? "none" : "0.5px solid rgba(0,0,0,0.09)" }}
        >
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
            <div style={{ width: "28px", height: "1.5px", background: "#9B6BBD", borderRadius: "2px" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9B6BBD" }}>Dr. Clarissa Terracciano, PhD</span>
          </motion.div>
          <motion.div variants={fadeUp} style={{ fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#5C2D82", marginBottom: "1rem" }}>
            Educational Consultant | Researcher | EdTech Developer
          </motion.div>
          <motion.h1 variants={fadeUp} style={{ fontSize: isMobile ? "38px" : "clamp(42px, 4vw, 60px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#0D0D0D", marginBottom: "1.5rem" }}>
            Helping learners, families, and organizations thrive.
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: "15px", lineHeight: 1.85, color: "#666", marginBottom: "2rem", maxWidth: "620px" }}>
            I bring together educational research, individualized learning support, and strategic consulting to help people and organizations navigate challenges, strengthen learning, and create meaningful change.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <a href="/book" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#5C2D82", color: "#fff", padding: "14px 24px", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: "3px", cursor: "pointer", textDecoration: "none", flex: isMobile ? "1" : "auto" }}>
              Request a Consultation <ArrowRight size={14} />
            </a>
            <a href="/services" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "transparent", color: "#0D0D0D", padding: "14px 24px", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", border: "0.5px solid rgba(0,0,0,0.25)", borderRadius: "3px", textDecoration: "none", flex: isMobile ? "1" : "auto" }}>
              Explore services
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ background: "#1A0F24", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2rem", position: "relative", overflow: "hidden", minHeight: isMobile ? "320px" : "auto" }}
        >
          <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "rgba(155,107,189,0.18)" }} />
          <div style={{ position: "absolute", inset: 0 }}>
            <img
              src="/clarissa-headshot.jpg"
              alt="Dr. Clarissa Terracciano"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,15,36,0.85) 0%, rgba(26,15,36,0.2) 50%, transparent 100%)" }} />
          </div>
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "inline-block", background: "rgba(155,107,189,0.3)", color: "#F2EBF8", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 14px", borderRadius: "100px", marginBottom: "1rem" }}>
              Educator · Researcher · EdTech Developer
            </div>
            <div style={{ fontSize: isMobile ? "20px" : "26px", fontWeight: 300, color: "#fff", letterSpacing: "-0.01em", marginBottom: "6px" }}>Dr. Clarissa Terracciano</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}>Learning, policy, and innovation with purpose</div>
          </div>
        </motion.div>
      </section>

      <section id="about" className="about-section" style={{ padding: "6rem 2.5rem", background: "#F9F6F2" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} style={{ maxWidth: "960px", margin: "0 auto" }}>
          <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
              <div style={{ width: "20px", height: "1.5px", background: "#9B6BBD", borderRadius: "2px", flexShrink: 0 }} />
              <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9B6BBD" }}>About</span>
            </div>
          </motion.div>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.15, color: "#0D0D0D", textAlign: "center", marginBottom: "1.5rem" }}>
            Helping learners and organizations move forward with clarity and purpose.
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: "15px", lineHeight: 1.85, color: "#666", marginBottom: "1rem", textAlign: "left" }}>
            Dr. Terracciano works at the intersection of education, research, and innovation. Her work supports families navigating learning differences, schools seeking stronger systems, and organizations building more equitable and future-ready educational experiences.
          </motion.p>
          <motion.p variants={fadeUp} style={{ fontSize: "15px", lineHeight: 1.85, color: "#666", marginBottom: "2rem", textAlign: "left" }}>
            With a background in developmental psychology, inclusive and special education, and educational policy, she brings both practical experience and a research-informed approach to every engagement. Her consulting is grounded in understanding how learners grow, what families need, and how institutions can create more meaningful change.
          </motion.p>
          <motion.div variants={fadeUp} className="about-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1rem" }}>
            {[
              { title: "Research-informed", text: "Approaches grounded in evidence, educational practice, and real-world context." },
              { title: "Human-centered", text: "Support designed around the individual learner, family, or organization in front of you." },
              { title: "Strategic", text: "Practical guidance that helps move from challenge to action with clarity." },
            ].map((item) => (
              <div key={item.title} style={{ background: "#fff", border: "0.5px solid rgba(92,45,130,0.12)", borderRadius: "12px", padding: "1.5rem", borderTop: "3px solid #5C2D82" }}>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#0D0D0D", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "10px" }}>{item.title}</div>
                <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#666" }}>{item.text}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section id="contact" className="booking-section" style={{ padding: "6rem 2.5rem", background: "#F9F6F2", textAlign: "center" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} style={{ maxWidth: "980px", margin: "0 auto" }}>
          <motion.div variants={fadeUp} style={{ width: "56px", height: "56px", borderRadius: "12px", background: "#F2EBF8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <CalendarDays size={24} color="#5C2D82" />
          </motion.div>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 400, letterSpacing: "-0.025em", color: "#0D0D0D", marginBottom: "1rem", lineHeight: 1.1 }}>
            Let's talk about what support will help most.
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: "15px", color: "#666", marginBottom: "2rem", lineHeight: 1.8 }}>
            Whether you are supporting a learner, navigating a family decision, or building a stronger educational system, I would be glad to learn more about your needs and discuss the best next steps.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1rem", marginBottom: "2rem", textAlign: "left" }}>
            {[{ label: "Services", href: "/services", text: "Educational guidance, family support, and organizational consulting." }, { label: "Projects", href: "/projects", text: "Research-informed digital platforms and educational innovation work." }, { label: "Research & Publications", href: "/research", text: "Dissertation, publications, and policy-focused scholarship." }].map((item) => (
              <a key={item.label} href={item.href} style={{ background: "#fff", border: "1px solid rgba(92,45,130,0.12)", borderRadius: "12px", padding: "1.5rem", textDecoration: "none", color: "#0D0D0D" }}>
                <div style={{ fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#9B6BBD", marginBottom: "0.75rem" }}>{item.label}</div>
                <div style={{ fontSize: "15px", lineHeight: 1.7, color: "#666" }}>{item.text}</div>
              </a>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
            <a href="/book" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#5C2D82", color: "#fff", padding: "15px 32px", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: "3px", cursor: "pointer", textDecoration: "none" }}>
              Request a Consultation <ArrowRight size={14} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      <footer style={{ borderTop: "0.5px solid rgba(0,0,0,0.09)", padding: "2rem 1.25rem" }}>
        <div className="footer-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <div style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>Clarissa Terracciano</div>
          <div style={{ fontSize: "12px", color: "#aaa", letterSpacing: "0.04em" }}>Educational Consultant · Researcher · EdTech Developer</div>
          <div style={{ fontSize: "12px", color: "#aaa" }}>© 2026</div>
        </div>
      </footer>
    </div>
  );
}
