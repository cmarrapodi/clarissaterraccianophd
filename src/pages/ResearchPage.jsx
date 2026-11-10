import React from "react";
import { ArrowRight, FileText } from "lucide-react";

const publications = [
  {
    type: "Doctoral dissertation",
    year: "2026",
    citation: "Terracciano, Clarissa. (2026). Higher Education Institutions in U.S. Blockchain Innovation Governance Documents. Electronic Theses and Dissertations, 2753. University of Denver.",
    venue: "University of Denver",
    url: "https://digitalcommons.du.edu/etd/2753",
    doi: "https://doi.org/10.56902/ETDCRP.2026.125",
  },
  {
    type: "Conference presentation",
    year: "2024",
    citation: "Terracciano, C. (2024). Blockchain for Justice and Joy: A Unique Perspective on Revolutionizing Equity, Access and Mobility Through Leadership and Policy.",
    venue: "UCEA Annual Convention, Los Angeles, CA, USA",
    url: null,
    doi: null,
  },
  {
    type: "University blog",
    year: "2025",
    citation: "Terracciano, C. (2025, April 2). Part II: How blockchain can support all learners.",
    venue: "Notre Dame Center for Literacy Education",
    url: "https://iei.nd.edu/initiatives/notre-dame-center-for-literacy-education/news/part-ii-how-blockchain-can-support-all",
    doi: null,
  },
];

export default function ResearchPage() {
  return (
    <div style={{ background: "#F9F6F2", minHeight: "100vh", color: "#0D0D0D" }}>
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 2.5rem", borderBottom: "0.5px solid rgba(0,0,0,0.09)", background: "rgba(249,246,242,0.94)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 50 }}>
        <a href="/" style={{ color: "#0D0D0D", textDecoration: "none", fontSize: "15px", fontWeight: 500, letterSpacing: "0.06em" }}>Dr. Clarissa Terracciano</a>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center", fontSize: "13px", color: "#666" }}>
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</a>
          <a href="/services" style={{ color: "inherit", textDecoration: "none" }}>Services</a>
          <a href="/projects" style={{ color: "inherit", textDecoration: "none" }}>Projects</a>
          <a href="/research" style={{ color: "#5C2D82", textDecoration: "none", fontWeight: 600 }}>Research & Publications</a>
        </div>
      </nav>

      <section style={{ padding: "6rem 2.5rem 4rem", background: "#fff", borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
            <div style={{ width: "28px", height: "1.5px", background: "#9B6BBD", borderRadius: "2px" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9B6BBD" }}>Research & Publications</span>
          </div>
          <h1 style={{ fontSize: "clamp(34px, 5vw, 60px)", fontWeight: 400, letterSpacing: "-0.04em", marginBottom: "1rem" }}>Research at the intersection of education, policy, and innovation.</h1>
          <p style={{ fontSize: "18px", lineHeight: 1.8, maxWidth: "720px", color: "#666", margin: 0 }}>
            The work brings together inquiry, practice, and systems thinking to rethink how learning and educational opportunity can be designed for a more equitable future.
          </p>
        </div>
      </section>

      <section style={{ padding: "4rem 2.5rem 6rem" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {publications.map((pub) => (
            <div key={pub.citation} style={{ background: "#fff", border: "0.5px solid rgba(92,45,130,0.12)", borderRadius: "10px", borderLeft: "3px solid #5C2D82", padding: "1.5rem", display: "flex", gap: "1rem" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "8px", background: "#F2EBF8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FileText size={18} color="#5C2D82" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap", marginBottom: "6px" }}>
                  <span style={{ background: "#F2EBF8", color: "#9B6BBD", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "100px" }}>{pub.type}</span>
                  <span style={{ fontSize: "11px", color: "#aaa", letterSpacing: "0.06em" }}>{pub.year}</span>
                </div>
                <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#333", margin: "0 0 8px" }}>{pub.citation}</p>
                <p style={{ fontSize: "12px", color: "#9B6BBD", letterSpacing: "0.04em", margin: "0 0 12px" }}>{pub.venue}</p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  {pub.url && (
                    <a href={pub.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#5C2D82", textDecoration: "none", fontSize: "12px", letterSpacing: "0.06em", fontWeight: 500 }}>
                      View publication <ArrowRight size={11} />
                    </a>
                  )}
                  {pub.doi && (
                    <a href={pub.doi} target="_blank" rel="noopener noreferrer" style={{ color: "#5C2D82", textDecoration: "none", fontSize: "12px", letterSpacing: "0.06em", fontWeight: 500 }}>
                      DOI
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
