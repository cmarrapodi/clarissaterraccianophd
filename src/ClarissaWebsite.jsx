import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
  { num: "01", title: "B.A. Developmental Psychology", school: "Hunter College, City University of New York", description: "A foundational grounding in how children grow, think, and learn — informing every consultation with a deep understanding of child development, cognition, and the psychological dimensions of education." },
  { num: "02", title: "M.A. Inclusive Education", school: "Teachers College, Columbia University", description: "Graduate training at one of the world's foremost schools of education, specializing in inclusive practices and teaching students with disabilities — bridging research and real-world classroom application." },
  { num: "03", title: "Ph.D. Educational Leadership & Policy Studies", school: "University of Denver", description: "Doctoral research examining the policies governing emerging and innovative technology and digital infrastructure in education — positioning Dr. Terracciano at the intersection of educational leadership and the future of learning." },
];

const heroTags = ["Special Education", "Literacy", "Blockchain & EdTech", "Homeschool Planning"];

const stripItems = ["Literacy & Reading", "Special Education", "Curriculum Design", "EdTech Strategy", "Blockchain & Credentialing", "Homeschool Planning", "Child Development", "Educational Leadership"];

const values = [
  "Deep respect for each learner's individuality",
  "Research-informed, practical recommendations",
  "A warm but direct approach to solving learning challenges",
  "Experience across public, private, virtual, and alternative education spaces",
];

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
