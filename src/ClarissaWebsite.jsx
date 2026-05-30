import React, { useState } from "react";
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
  { id: "org", icon: Building, title: "School / Organizational Consulting", desc: "Systems-level consulting for schools and educ
