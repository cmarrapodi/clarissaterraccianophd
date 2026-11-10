import React from "react";
import { ArrowRight, BookOpenText, Building2, Globe, Users } from "lucide-react";

const serviceCards = [
  {
    title: "Educational Consulting & Academic Support",
    text: "Personalized educational support for children, students, and adult learners. Includes literacy, mathematics, learning differences, dyslexia, executive functioning, gifted education, homeschooling, individualized instruction, and special education support.",
    icon: BookOpenText,
  },
  {
    title: "Family Support & Parent Coaching",
    text: "Guidance for parents and families navigating learning, child development, educational decisions, and school experiences. Includes parent coaching, social-emotional learning, educational advocacy, homeschooling, school transitions, and IEP/504 guidance.",
    icon: Users,
  },
  {
    title: "School & Organizational Consulting",
    text: "Research-informed consulting for schools, educational institutions, organizations, and leadership teams. Includes professional development, curriculum design, instructional improvement, inclusive education, educational leadership, program development, competency-based education, and organizational strategy.",
    icon: Building2,
  },
  {
    title: "Research, Policy & Educational Innovation",
    text: "Research and strategic consulting at the intersection of education, policy, emerging technologies, and innovation. Includes qualitative research, policy analysis, blockchain in education, decentralized learning systems, educational technology, competency-based credentials, and research collaboration.",
    icon: Globe,
  },
];

export default function ServicesPage() {
  return (
    <div style={{ background: "#F9F6F2", minHeight: "100vh", color: "#0D0D0D" }}>
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 2.5rem", borderBottom: "0.5px solid rgba(0,0,0,0.09)", background: "rgba(249,246,242,0.94)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 50 }}>
        <a href="/" style={{ color: "#0D0D0D", textDecoration: "none", fontSize: "15px", fontWeight: 500, letterSpacing: "0.06em" }}>Dr. Clarissa Terracciano</a>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center", fontSize: "13px", color: "#666" }}>
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</a>
          <a href="/services" style={{ color: "#5C2D82", textDecoration: "none", fontWeight: 600 }}>Services</a>
          <a href="/projects" style={{ color: "inherit", textDecoration: "none" }}>Projects</a>
          <a href="/research" style={{ color: "inherit", textDecoration: "none" }}>Research & Publications</a>
        </div>
      </nav>

      <section style={{ padding: "6rem 2.5rem 4rem", background: "#1A0F24", color: "#fff" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
            <div style={{ width: "28px", height: "1.5px", background: "#9B6BBD", borderRadius: "2px" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9B6BBD" }}>How I Can Help</span>
          </div>
          <h1 style={{ fontSize: "clamp(34px, 5vw, 60px)", fontWeight: 400, letterSpacing: "-0.04em", marginBottom: "1rem" }}>Consulting designed for real needs.</h1>
          <p style={{ fontSize: "18px", lineHeight: 1.8, maxWidth: "720px", color: "rgba(255,255,255,0.78)", margin: 0 }}>
            I support learners, families, schools, and organizations with research-informed guidance, strategic thinking, and compassionate, practical solutions.
          </p>
        </div>
      </section>

      <section style={{ padding: "4rem 2.5rem 6rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
          {serviceCards.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} style={{ background: "#fff", border: "1px solid rgba(92,45,130,0.12)", borderRadius: "12px", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#F2EBF8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={18} color="#5C2D82" />
                </div>
                <div style={{ fontSize: "18px", fontWeight: 500, lineHeight: 1.4 }}>{service.title}</div>
                <div style={{ fontSize: "14px", lineHeight: 1.8, color: "#666" }}>{service.text}</div>
                <a href="/book" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#5C2D82", textDecoration: "none", marginTop: "0.25rem" }}>
                  Request a Consultation <ArrowRight size={12} />
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
