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
  Mic,
  PenLine,
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
  { id: "intervention", icon: Zap, title: "Intensive Academic Intervention", desc: "Targeted, high-impact sessions for students who need accelerated support in literacy, math, or executive functioning. Designed for learners who need more than the standard approach." },
  { id: "homeschool", icon: GraduationCap, title: "Homeschool Planning & Curriculum Design", desc: "Custom curriculum architecture and learning plans for families building rigorous, joyful homeschool programs. Dr. Terracciano designs pathways that honor your child's learning style and your family's goals." },
  { id: "advocacy", icon: Heart, title: "Educational Advocacy & Parent Strategy", desc: "Empowering parents to navigate IEPs, 504 plans, school systems, and educational rights with confidence and clarity. You will never have to walk into a meeting unprepared again." },
  { id: "dissertation", icon: FileText, title: "Dissertation & Research Consulting", desc: "Expert guidance for doctoral students and researchers navigating qualitative methodology, data analysis, and academic writing. Dr. Terracciano brings deep research expertise to every stage of the process." },
  { id: "policy", icon: Globe, title: "Educational Policy & EdTech Consulting", desc: "Strategic consulting for organizations, institutions, and founders at the intersection of education, policy, and technology. Grounded in doctoral-level research and real-world implementation experience." },
  { id: "org", icon: Building, title: "School / Organizational Consulting", desc: "Systems-level consulting for schools and educational organizations seeking to improve outcomes, equity, and culture. Dr. Terracciano partners with leadership teams to drive meaningful, lasting change." },
  { id: "retainer", icon: CalendarDays, title: "Monthly Family Educational Retainer", desc: "Ongoing advisory support for families who want consistent, high-touch educational guidance throughout the school year. A dedicated partner in your child's educational journey." },
  { id: "pods", icon: Users, title: "Learning Pods", desc: "Curated small-group learning series for children focused on academic growth, executive functioning practice, and social-emotional development. Intentionally small groups ensure every child is seen, supported, and challenged." },
  { id: "halfday", icon: Lightbulb, title: "Half-Day & Full-Day Consulting", desc: "Intensive consulting engagements for schools, organizations, and leadership teams requiring deep-dive strategic sessions. Available as half-day or full-day formats depending on scope and need." },
];

const publications = [
  {
    type: "presentation",
    icon: Mic,
    year: "2024",
    citation: "Terracciano, C. (2024). Blockchain for Justice and Joy: A Unique Perspective on Revolutionizing Equity, Access and Mobility Through Leadership and Policy.",
    venue: "UCEA Annual Convention, Los Angeles, CA, USA",
    url: null,
  },
  {
    type: "blog",
    icon: PenLine,
    year: "2025",
    citation: "Terracciano, C. (2025, April 1). Part I: Introduction to blockchain and literacy and language learning.",
    venue: "Notre Dame Center for Literacy Education",
    url: "https://iei.nd.edu/initiatives/notre-dame-center-for-literacy-education/news/part-i-introduction-to-blockchain-and",
  },
  {
    type: "blog",
    icon: PenLine,
    year: "2025",
    citation: "Terracciano, C. (2025, April 2). Part II: How blockchain can support all learners.",
    venue: "Notre Dame Center for Literacy Education",
    url: "https://iei.nd.edu/initiatives/notre-dame-center-for-literacy-education/news/part-ii-how-blockchain-can-support-all",
  },
];

const heroTags = ["Academic Growth", "Executive Functioning", "Social-Emotional Development", "Literacy & Reading", "Special Education"];

const stripItems = ["Academic Growth", "Executive Functioning", "Social-Emotional Coaching", "Literacy & Reading", "Special Education", "Curriculum Design", "EdTech Strategy", "Blockchain & Credentialing", "Homeschool Planning", "Educational Advocacy"];

const pillars = [
  {
    label: "Academic Growth",
    color: "#5C2D82",
    skills: ["Reading", "Writing", "Mathematics", "Study skills", "Learning strategies", "Project-based learning"],
  },
  {
    label: "Executive Functioning",
    color: "#0F7EA6",
    skills: ["Organization", "Planning & prioritization", "Time management", "Task initiation", "Sustained attention", "Working memory", "Goal setting", "Self-monitoring", "Independent learning"],
  },
  {
    label: "Social-Emotional Development",
    color: "#1A7A5E",
    skills: ["Emotional regulation", "Frustration tolerance", "Confidence building", "Growth mindset", "Problem-solving", "Self-advocacy", "Social skills", "Resilience", "Managing school anxiety"],
  },
];

const familyReasons = [
  "My child is smart but can't stay organized.",
  "Homework turns into a battle every night.",
  "My child struggles with focus and follow-through.",
  "School says they're capable, but they're not performing.",
  "My child lacks confidence.",
  "They're falling behind in reading or writing.",
  "They need help becoming more independent.",
  "We're looking for support beyond traditional tutoring.",
  "My child learns differently.",
  "Nothing we've tried seems to be working.",
];

const outcomes = [
  "Stronger executive functioning skills",
  "Greater independence",
  "Increased confidence",
  "Better decision-making abilities",
  "Improved self-awareness",
  "Academic competence",
  "Tools they can use for life",
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
      <motion.div style={{ display: "inline-flex", gap:
