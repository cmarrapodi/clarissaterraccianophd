import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  GraduationCap,
  Lightbulb,
  CalendarDays,
  Quote,
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
  {
    num: "01",
    title: "20 Years Supporting Diverse Learners",
    description:
      "Nearly two decades supporting children and families across Florida, Colorado, and New York — navigating learning differences, neurodiversity, literacy development, and individualized educational pathways.",
  },
  {
    num: "02",
    title: "Licensed Special Educator & Educational Leader",
    description:
      "Licensed in New York and Colorado with deep expertise spanning special education, child development, literacy instruction, curriculum design, and learner-centered instructional practice.",
  },
  {
    num: "03",
    title: "Blockchain, Policy & The Future of Learning",
    description:
      "Five years of doctoral research specializing in blockchain technology, decentralized learning systems, and the future of credentialing — helping institutions transition toward equitable, learner-owned ecosystems.",
  },
];

const services = [
  {
    icon: Brain,
    title: "Learning & Development Consultations",
    description:
      "Personalized guidance for families seeking clarity around how their child learns, grows, and needs to be supported academically and emotionally.",
  },
  {
    icon: BookOpen,
    title: "Literacy & Reading Support",
    description:
      "Expert insight rooted in structured literacy, special education, developmental psychology, and evidence-informed reading practices.",
  },
  {
    icon: GraduationCap,
    title: "Homeschool & Alternative Pathway Planning",
    description:
      "Strategic support for families designing rigorous, joyful, or flexible learning pathways outside the traditional classroom model.",
  },
  {
    icon: Lightbulb,
    title: "Curriculum, EdTech & Learning Strategy",
    description:
      "Consulting for educators, founders, and organizations building meaningful learning systems, courses, or education technology tools.",
  },
];

const heroTags = [
  "Special Education",
  "Literacy",
  "Blockchain & EdTech",
  "Homeschool Planning",
];

const stripItems = [
  "Literacy & Reading",
  "Special Education",
  "Curriculum Design",
  "EdTech Strategy",
  "Blockchain & Credentialing",
  "Homeschool Planning",
  "Child Development",
  "Educational Leadership",
];

const values = [
  "Deep respect for each learner's individuality",
  "Research-informed, practical recommendations",
  "A warm but direct approach to solving learning challenges",
  "Experience across public, private, virtual, and alternative education spaces",
];

function MarqueeStrip() {
  const doubled = [...stripItems, ...stripItems];
  return (
    <div style={{ background: "#5C2D82", borderTop: "0.5px solid rgba(255,255,255,0.1)", borderBottom: "0.5px solid rgba(255,255,255,0.1)", overflow: "hidden", whiteSpace: "nowrap", padding: "14px 0" }}>
      <motion.div
        style={{ display: "inline-flex", gap: "2.5rem" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>
            {item}
            {i < doubled.length - 1 && (
              <span style={{ color: "rgba(255,255,255,0.25)", marginLeft: "2.5rem" }}>·</span>
            )}
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
      <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9B6BBD" }}>
        {children}
      </span>
    </div>
  );
}

export default function ClarissaWebsite() {
  return (
    <div style={{ background: "#F9F6F2", color: "#0D0D0D", minHeight: "100vh", fontFamily: "inherit", overflowX: "hidden" }}>

      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 2.5rem", borderBottom: "0.5px solid rgba(0,0,0,0.09)", background: "rgba(249,246,242,0.92)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ fontSize: "15px", fontWeight: 500, letterSpacing: "0.06em" }}>Clarissa Terracciano</div>
        <div style={{ display: "flex", gap: "2rem", fontSize: "13px", color: "#666" }}>
          <a href="#about" style={{ color: "inherit", textDecoration: "none" }}>About</a>
          <a href="#services" style={{ color: "inherit", textDecoration: "none" }}>Services</a>
          <a href="#booking" style={{ color: "inherit", textDecoration: "none" }}>Book</a>
        </div>
        <button style={{ background: "#5C2D82", color: "#fff", border: "none", padding: "10px 22px", borderRadius: "3px", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>
          Schedule
        </button>
      </nav>

      <section style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", minHeight: "88vh" }}>
        <motion.div initial="hidden" animate="visible" variants={stagger}
          style={{ padding: "5rem 3rem 4rem 2.5rem", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: "0.5px solid rgba(0,0,0,0.09)" }}>
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2rem" }}>
            <div style={{ width: "28px", height: "1.5px", background: "#9B6BBD", borderRadius: "2px" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9B6BBD" }}>Educational Consulting</span>
          </motion.div>
          <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#0D0D0D", marginBottom: "2rem" }}>
            Exceptional guidance for{" "}
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "#5C2D82" }}>exceptional</em>{" "}
            learners.
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: "15px", lineHeight: 1.85, color: "#666", maxWidth: "420px", marginBottom: "2.5rem" }}>
            Dr. Clarissa Terracciano partners with families, educators, and institutions to design high-impact educational pathways grounded in two decades of expertise.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "2.5rem" }}>
            {heroTags.map((tag) => (
              <span key={tag} style={{ background: "#F2EBF8", color: "#3B1A55", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 14px", borderRadius: "100px" }}>
                {tag}
              </span>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button style={{ background: "#5C2D82", color: "#fff", padding: "14px 30px", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: "3px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
              Book a consultation <ArrowRight size={14} />
            </button>
            <button style={{ background: "transparent", color: "#0D0D0D", padding: "14px 30px", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", border: "0.5px solid rgba(0,0,0,0.25)", borderRadius: "3px", cursor: "pointer" }}>
              Explore services
            </button>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }}
          style={{ background: "#1A0F24", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "3rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "rgba(155,107,189,0.18)" }} />
          <div style={{ position: "absolute", bottom: "60px", left: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(242,235,248,0.07)" }} />
          <div style={{ position: "absolute", inset: 0 }}>
            <img src="/clarissa-headshot.jpg" alt="Dr. Clarissa Terracciano" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,15,36,0.85) 0%, rgba(26,15,36,0.2) 50%, transparent 100%)" }} />
          </div>
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "inline-block", background: "rgba(155,107,189,0.3)", color: "#F2EBF8", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 14px", borderRadius: "100px", marginBottom: "1.25rem" }}>
              Ph.D. · Licensed NY & CO
            </div>
            <div style={{ fontSize: "26px", fontWeight: 300, color: "#fff", letterSpacing: "-0.01em", marginBottom: "4px" }}>Dr. Clarissa Terracciano</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}>Educational Consultant · 20 Years Experience</div>
          </div>
        </motion.div>
      </section>

      <MarqueeStrip />

      <section id="about" style={{ padding: "6rem 2.5rem" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger}>
          <motion.div variants={fadeUp}><SectionLabel>About Clarissa</SectionLabel></motion.div>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#0D0D0D", marginBottom: "1.5rem", maxWidth: "560px" }}>
            A career built on{" "}<em style={{ fontStyle: "italic", fontWeight: 300, color: "#5C2D82" }}>transforming</em>{" "}how people learn.
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: "15px", lineHeight: 1.85, color: "#666", maxWidth: "640px", marginBottom: "4rem" }}>
            Dr. Clarissa Terracciano believes that education has the power to meaningfully shape confidence, opportunity, growth, and long-term life outcomes.
          </motion.p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "0.5px solid rgba(0,0,0,0.1)" }}>
            {expertiseAreas.map((area, index) => (
              <motion.div key={area.num} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ padding: "2.5rem 2rem", borderRight: index < expertiseAreas.length - 1 ? "0.5px solid rgba(0,0,0,0.1)" : "none" }}>
                <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#9B6BBD", fontWeight: 500, marginBottom: "1.25rem" }}>{area.num}</div>
                <div style={{ width: "32px", height: "2px", background: "#5C2D82", borderRadius: "2px", marginBottom: "1.25rem" }} />
                <div style={{ fontSize: "16px", fontWeight: 500, color: "#0D0D0D", marginBottom: "1rem", lineHeight: 1.35 }}>{area.title}</div>
                <div style={{ fontSize: "13px", lineHeight: 1.85, color: "#666" }}>{area.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }}
        style={{ background: "#F2EBF8", borderTop: "0.5px solid rgba(92,45,130,0.12)", borderBottom: "0.5px solid rgba(92,45,130,0.12)", padding: "5rem 2.5rem" }}>
        <div style={{ maxWidth: "800px" }}>
          <Quote size={28} color="#9B6BBD" style={{ marginBottom: "1.5rem", opacity: 0.6 }} />
          <p style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 300, lineHeight: 1.5, color: "#3B1A55", fontStyle: "italic", letterSpacing: "-0.01em" }}>
            "True educational growth requires more than generic solutions — it requires someone who understands the whole learner, the full system, and the long road ahead."
          </p>
          <div style={{ marginTop: "1.5rem", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#9B6BBD" }}>— Dr. Clarissa Terracciano</div>
        </div>
      </motion.section>

      <section id="services" style={{ background: "#1A0F24", padding: "6rem 2.5rem" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <motion.div variants={fadeUp}><SectionLabel>Services</SectionLabel></motion.div>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#fff", marginBottom: "4rem", maxWidth: "560px" }}>
            High-level consulting designed to create{" "}<em style={{ fontStyle: "italic", fontWeight: 300, color: "#9B6BBD" }}>clarity</em> and results.
          </motion.h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", border: "0.5px solid rgba(255,255,255,0.07)" }}>
            {services.map((service, index) => {
              const Icon = service.icon;
              const isRightCol = index % 2 !== 0;
              const isLastRow = index >= services.length - 2;
              return (
                <motion.div key={service.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: index * 0.08 }} whileHover={{ background: "rgba(92,45,130,0.2)" }}
                  style={{ padding: "2.5rem", borderRight: !isRightCol ? "0.5px solid rgba(255,255,255,0.07)" : "none", borderBottom: !isLastRow ? "0.5px solid rgba(255,255,255,0.07)" : "none", transition: "background 0.2s" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(92,45,130,0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                    <Icon size={18} color="#F2EBF8" />
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 500, color: "#fff", marginBottom: "0.75rem" }}>{service.title}</div>
                  <div style={{ fontSize: "13px", lineHeight: 1.85, color: "rgba(255,255,255,0.45)" }}>{service.description}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section style={{ padding: "6rem 2.5rem" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger} style={{ maxWidth: "800px", margin: "0 auto" }}>
          <motion.div variants={fadeUp}><SectionLabel>My approach</SectionLabel></motion.div>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#0D0D0D", marginBottom: "3rem", maxWidth: "500px" }}>
            Strategic expertise for{" "}<em style={{ fontStyle: "italic", fontWeight: 300, color: "#5C2D82" }}>meaningful</em> educational growth.
          </motion.h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {values.map((value) => (
              <motion.div key={value} variants={fadeUp} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "1.25rem 1.5rem", background: "#F2EBF8", border: "0.5px solid rgba(92,45,130,0.12)", borderRadius: "6px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#5C2D82", flexShrink: 0, marginTop: "7px" }} />
                <span style={{ fontSize: "14px", lineHeight: 1.75, color: "#3B1A55" }}>{value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="booking" style={{ padding: "8rem 2.5rem", borderTop: "0.5px solid rgba(0,0,0,0.09)", textAlign: "center" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
          <motion.div variants={fadeUp} style={{ width: "56px", height: "56px", borderRadius: "12px", background: "#F2EBF8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem" }}>
            <CalendarDays size={26} color="#5C2D82" />
          </motion.div>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 400, letterSpacing: "-0.025em", color: "#0D0D0D", marginBottom: "1.5rem", lineHeight: 1.08 }}>
            Bring expert insight into your{" "}<em style={{ fontStyle: "italic", fontWeight: 300, color: "#5C2D82" }}>learner's</em> journey.
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: "15px", color: "#666", maxWidth: "520px", margin: "0 auto 3rem" }}>
            Book a consultation for thoughtful, research-informed educational guidance tailored to your learner, family, school, or organization.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ background: "#5C2D82", color: "#fff", padding: "15px 32px", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: "3px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
              Book a free discovery call <ArrowRight size={14} />
            </button>
            <button style={{ background: "transparent", color: "#0D0D0D", padding: "15px 32px", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", border: "0.5px solid rgba(0,0,0,0.25)", borderRadius: "3px", cursor: "pointer" }}>
              Book a private consultation
            </button>
          </motion.div>
        </motion.div>
      </section>

      <footer style={{ borderTop: "0.5px solid rgba(0,0,0,0.09)", padding: "2rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>Clarissa Terracciano</div>
        <div style={{ fontSize: "12px", color: "#aaa", letterSpacing: "0.04em" }}>Learning · Literacy · Special Education · Curriculum · EdTech · Policy</div>
        <div style={{ fontSize: "12px", color: "#aaa" }}>© 2026 Educational Consulting</div>
      </footer>
    </div>
  );
}

