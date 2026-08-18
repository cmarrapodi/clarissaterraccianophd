import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function ProjectsPage() {
  return (
    <div
      style={{
        background: "#F9F6F2",
        color: "#0D0D0D",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* NAV */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 2.5rem",
          borderBottom: "0.5px solid rgba(0,0,0,0.09)",
          background: "rgba(249,246,242,0.94)",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <a
          href="/"
          style={{
            color: "#0D0D0D",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: 500,
            letterSpacing: "0.06em",
          }}
        >
          Dr. Clarissa Terracciano
        </a>

        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            fontSize: "13px",
            color: "#666",
          }}
        >
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
            Home
          </a>

          <a
            href="/projects"
            style={{
              color: "#5C2D82",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Projects
          </a>

          <a href="/book" style={{ color: "inherit", textDecoration: "none" }}>
            Book
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          padding: "7rem 2.5rem 6rem",
          borderBottom: "0.5px solid rgba(0,0,0,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-100px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background: "rgba(155,107,189,0.16)",
          }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          style={{
            maxWidth: "980px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "1.5px",
                background: "#9B6BBD",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#9B6BBD",
              }}
            >
              Projects & Innovation
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: "clamp(42px, 6vw, 72px)",
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              maxWidth: "900px",
              marginBottom: "2rem",
            }}
          >
            Building the systems I believe education{" "}
            <em
              style={{
                color: "#5C2D82",
                fontWeight: 300,
                fontStyle: "italic",
              }}
            >
              can become.
            </em>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "18px",
              lineHeight: 1.9,
              color: "#666",
              maxWidth: "760px",
            }}
          >
            My work does not stop at research, consultation, or theory. I design
            and build educational technology intended to expand learner agency,
            strengthen access, rethink digital infrastructure, and move
            education toward more human-centered, equitable, and liberatory
            systems.
          </motion.p>
        </motion.div>
      </section>

      {/* ALETHEIA */}
      <section
        style={{
          padding: "7rem 2.5rem",
          background: "#1A0F24",
          color: "#fff",
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <motion.div variants={fadeUp}>
            <div
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "#9B6BBD",
                marginBottom: "1rem",
              }}
            >
              Human-Centered Digital Platform
            </div>

            <h2
              style={{
                fontSize: "clamp(34px, 4vw, 52px)",
                fontWeight: 400,
                letterSpacing: "-0.025em",
                marginBottom: "1.5rem",
              }}
            >
              Aletheia.Social
            </h2>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.62)",
                marginBottom: "1.5rem",
              }}
            >
              Aletheia.Social is a digital platform exploring what social and
              learning environments can look like when they are intentionally
              designed around human development, meaningful connection, agency,
              and value rather than attention extraction.
            </p>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.62)",
                marginBottom: "2.5rem",
              }}
            >
              The project brings together my background in developmental
              psychology, education, technology, and systems thinking to explore
              healthier, more purposeful forms of digital participation.
            </p>

            <a
              href="https://alethia.social"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#5C2D82",
                color: "#fff",
                padding: "14px 26px",
                borderRadius: "3px",
                textDecoration: "none",
                textTransform: "uppercase",
                fontSize: "12px",
                letterSpacing: "0.1em",
              }}
            >
              Explore Aletheia <ArrowRight size={14} />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            whileHover={{ y: -6 }}
            style={{
              minHeight: "420px",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "#ffffff",
              padding: "2.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
              overflow: "hidden",
            }}
          >
            <img
              src="/aletheia-logo.png"
              alt="Aletheia — Advancing Knowledge. Connecting Minds."
              style={{
                width: "100%",
                maxWidth: "520px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* DOT */}
      <section
        style={{
          padding: "7rem 2.5rem",
          background: "#F9F6F2",
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -6 }}
            style={{
              minHeight: "420px",
              borderRadius: "20px",
              border: "1px solid rgba(92,45,130,0.12)",
              background: "#ffffff",
              padding: "2.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 30px 70px rgba(92,45,130,0.08)",
              overflow: "hidden",
            }}
          >
            <img
              src="/dot-logo.png"
              alt="DOT — Development Over Time"
              style={{
                width: "100%",
                maxWidth: "560px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <div
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "#9B6BBD",
                marginBottom: "1rem",
              }}
            >
              Educational Technology Ecosystem
            </div>

            <h2
              style={{
                fontSize: "clamp(34px, 4vw, 52px)",
                fontWeight: 400,
                letterSpacing: "-0.025em",
                marginBottom: "1.5rem",
              }}
            >
              Development Over Time
            </h2>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.9,
                color: "#666",
                marginBottom: "1.5rem",
              }}
            >
              Development Over Time (DOT) is an educational technology
              ecosystem designed to rethink how learning is created,
              experienced, documented, and recognized.
            </p>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.9,
                color: "#666",
                marginBottom: "1.5rem",
              }}
            >
              DOT brings together learner-centered pathways, curriculum and
              standards architecture, educator and creator tools, alternative
              learning environments, and emerging credentialing technologies
              within a unified educational ecosystem.
            </p>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.9,
                color: "#666",
                marginBottom: "2.5rem",
              }}
            >
              It is the applied extension of my doctoral research into
              educational policy, blockchain technology, decentralized systems,
              equity, access, and learner ownership.
            </p>

            <a
              href="https://developmentovertime.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#5C2D82",
                color: "#fff",
                padding: "14px 26px",
                borderRadius: "3px",
                textDecoration: "none",
                textTransform: "uppercase",
                fontSize: "12px",
                letterSpacing: "0.1em",
              }}
            >
              Explore Development Over Time <ArrowRight size={14} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section
        style={{
          padding: "6rem 2.5rem",
          background: "#F2EBF8",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(30px, 4vw, 46px)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              marginBottom: "1.5rem",
            }}
          >
            Research informs the work.{" "}
            <em
              style={{
                color: "#5C2D82",
                fontWeight: 300,
                fontStyle: "italic",
              }}
            >
              Building tests what is possible.
            </em>
          </h2>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.85,
              color: "#666",
              marginBottom: "2.5rem",
            }}
          >
            I work with families, schools, institutions, founders, and
            organizations seeking thoughtful guidance at the intersection of
            learning, technology, policy, and educational innovation.
          </p>

          <a
            href="/book"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#5C2D82",
              color: "#fff",
              padding: "15px 30px",
              borderRadius: "3px",
              textDecoration: "none",
              textTransform: "uppercase",
              fontSize: "12px",
              letterSpacing: "0.1em",
            }}
          >
            Work With Dr. Terracciano <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </div>
  );
}
