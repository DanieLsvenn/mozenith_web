"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui";
import {
  Shield,
  Activity,
  Lock,
  BarChart3,
  Users,
  Workflow,
  ArrowRight,
  Check,
  ChevronRight,
  Sparkles,
  Brain,
  Smartphone,
  MessageSquare,
  Mic,
  Camera,
  Star,
  Quote,
  Zap,
  Globe,
  Heart,
  Award,
  Target,
  Rocket,
  TrendingUp,
  Clock,
  Play,
  Building2,
  ChevronLeft,
  Code,
  Cpu,
  Database,
  Cloud,
  Menu,
  X,
} from "lucide-react";
import {
  NeuralNetworkBackground,
  GridLinesBackground,
  FloatingOrbs,
  SpotlightCard,
  TypewriterEffect,
  AnimatedCounter,
  ScrollProgress,
  LogoCarousel,
  TiltCard,
  MagneticCursor,
  GlitchText,
} from "@/components/landing";

// Dynamically import 3D scene to avoid SSR issues
const Phone3DScene = dynamic(
  () => import("@/components/landing/phone-3d").then((mod) => mod.Phone3DScene),
  {
    ssr: false,
    loading: () => (
      <div className="relative">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/20 bg-slate-900/50 backdrop-blur">
          <div className="h-[500px] w-full flex items-center justify-center">
            <motion.div
              className="w-16 h-16 rounded-full border-2 border-cyan-400 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    ),
  },
);

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0.9, 1]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate features carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeatureIndex((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: 50000, suffix: "+", label: "Active Users", icon: Users },
    { value: 99.9, suffix: "%", label: "Uptime SLA", icon: Clock },
    { value: 150, suffix: "+", label: "Enterprise Clients", icon: Building2 },
    { value: 4.9, suffix: "/5", label: "User Rating", icon: Star },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO at TechFlow Inc.",
      content:
        "Mozenith transformed how we manage AI operations. The control and visibility we have now is incredible. Our team productivity increased by 40%.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "VP Engineering at DataScale",
      content:
        "The security features are top-notch. We've passed every compliance audit since implementing Mozenith. It's become essential to our infrastructure.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Head of AI at InnovateLabs",
      content:
        "Finally, an AI management platform that understands enterprise needs. The real-time monitoring and analytics are game-changers.",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "David Kim",
      role: "Founder at AIFirst Startup",
      content:
        "We scaled from 100 to 10,000 users seamlessly. Mozenith handled everything without breaking a sweat. Truly enterprise-grade.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
  ];

  const teamMembers = [
    {
      name: "Huong Tra",
      role: "CEO & Founder",
      image: "/pictures/Tra.png",
      bio: "Visionary leader driving innovation in AI enterprise solutions.",
    },
    {
      name: "Nhu Thanh",
      role: "CTO - Data & AI Engineer",
      image: "/pictures/Thanh.png",
      bio: "Expert in machine learning and data architecture.",
    },
    {
      name: "Ngoc My",
      role: "CMO - Business Development",
      image: "/pictures/My.png",
      bio: "Strategic thinker with a passion for market growth.",
    },
    {
      name: "Truc Nhi",
      role: "Graphic & UI/UX Designer",
      image: "/pictures/Nhi.png",
      bio: "Creative mind crafting beautiful user experiences.",
    },
    {
      name: "Thanh Thuy",
      role: "Front-end Developer",
      image: "/pictures/Thuy.png",
      bio: "Building seamless and responsive web interfaces.",
    },
    {
      name: "Duc Anh",
      role: "Back-end Developer & AI Support",
      image: "/pictures/Anh.png",
      bio: "Architecting robust systems and AI integrations.",
    },
  ];

  const partners = [
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
    },
    {
      name: "Google Cloud",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/512px-Google_Cloud_logo.svg.png",
    },
    {
      name: "AWS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/512px-Amazon_Web_Services_Logo.svg.png",
    },
    {
      name: "OpenAI",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/512px-OpenAI_Logo.svg.png",
    },
  ];

  const features = [
    {
      icon: Users,
      title: "User Management",
      description:
        "Comprehensive user administration with role-based access control and detailed activity tracking.",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Shield,
      title: "Role & Permission System",
      description:
        "Granular permission management with customizable roles to match your organizational structure.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Activity,
      title: "Activity Logging",
      description:
        "Complete audit trail of all system activities with advanced filtering and export capabilities.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Lock,
      title: "Session Control",
      description:
        "Manage active sessions, force logout users, and maintain security across all devices.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description:
        "Monitor system health, user activity, and AI operations with comprehensive dashboards.",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: Workflow,
      title: "AI Orchestration",
      description:
        "Coordinate complex AI workflows with intelligent automation and process management.",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  const techStack = [
    { icon: Code, label: "Modern Stack" },
    { icon: Cpu, label: "AI Powered" },
    { icon: Database, label: "Scalable" },
    { icon: Cloud, label: "Cloud Native" },
    { icon: Shield, label: "Enterprise Security" },
    { icon: Zap, label: "High Performance" },
  ];

  return (
    <div className="min-h-screen bg-[#fefbf3] text-[#1a1a2e] overflow-x-hidden">
      {/* Scroll Progress - hidden for neobrutalism */}
      <ScrollProgress />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <NeuralNetworkBackground />
        <FloatingOrbs />
      </div>

      {/* Navigation */}
      <motion.header
        style={{ opacity: headerOpacity }}
        className="fixed top-0 z-50 w-full border-b-3 border-[#1a1a2e] bg-white"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#99E7F1] border-2 border-[#1a1a2e] shadow-[2px_2px_0_#1a1a2e] overflow-hidden"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <img
                src="/pictures/mozenith.jpg"
                alt="Mozenith Logo"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <span className="text-xl font-black text-[#1a1a2e]">Mozenith</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {["Features", "About", "Reviews", "Team", "Security"].map(
              (item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-bold text-[#1a1a2e] transition-colors hover:text-[#0054C5] relative neo-underline"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ),
            )}
          </nav>

          <div className="flex items-center gap-4">
            <MagneticCursor>
              <Link href="/login">
                <Button className="bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold border-2 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] hover:shadow-[6px_6px_0_#1a1a2e] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </MagneticCursor>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-[#1a1a2e] hover:text-[#0054C5]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800"
          >
            <nav className="flex flex-col p-4 gap-2">
              {["Features", "About", "Reviews", "Team", "Security"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-[#1a1a2e] font-bold hover:text-[#0054C5] py-3 px-4 border-2 border-transparent hover:border-[#1a1a2e] hover:bg-[#99E7F1] rounded-lg transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ),
              )}
            </nav>
          </motion.div>
        )}
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden pt-32 pb-24 bg-[#fefbf3]">
        <GridLinesBackground />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
            {/* Left Content */}
            <motion.div
              initial="initial"
              animate={isLoaded ? "animate" : "initial"}
              variants={stagger}
              className="text-left relative z-10"
            >
              {/* Badge */}
              <motion.div
                variants={fadeInUp}
                className="mb-8 inline-flex items-center gap-2 rounded-full border-2 border-[#1a1a2e] bg-[#99E7F1] px-5 py-2 text-sm font-bold shadow-[3px_3px_0_#1a1a2e]"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4 text-[#1a1a2e]" />
                </motion.div>
                <span className="text-[#1a1a2e]">
                  AI-Powered Enterprise Platform
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="mb-6 text-5xl font-black leading-tight tracking-tight md:text-6xl lg:text-7xl"
              >
                <span className="text-[#1a1a2e]">The Future of</span>
                <br />
                <span className="text-[#0054C5]">
                  <TypewriterEffect
                    words={[
                      "AI Control",
                      "Enterprise",
                      "Innovation",
                      "Security",
                    ]}
                  />
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mb-10 max-w-xl text-lg text-[#3a3a4e] md:text-xl leading-relaxed font-medium"
              >
                Transform your enterprise with intelligent AI orchestration.
                Secure, scalable, and built for the future of business.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col items-start gap-4 sm:flex-row"
              >
                <MagneticCursor>
                  <Link href="/login">
                    <Button
                      size="lg"
                      className="bg-[#FF6B00] px-8 hover:bg-[#E55F00] group border-2 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] hover:shadow-[2px_2px_0_#1a1a2e] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-white font-bold"
                    >
                      <Smartphone className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                      Start Free Trial
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </MagneticCursor>
                <a href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#1a1a2e] px-8 text-[#1a1a2e] bg-white hover:bg-[#99E7F1] shadow-[4px_4px_0_#1a1a2e] hover:shadow-[2px_2px_0_#1a1a2e] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-bold"
                  >
                    Explore Platform
                  </Button>
                </a>
              </motion.div>

              {/* Tech Stack Pills */}
              <motion.div
                variants={fadeInUp}
                className="mt-12 flex flex-wrap gap-3"
              >
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.label}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-[#1a1a2e] shadow-[2px_2px_0_#1a1a2e]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      x: -1,
                      y: -1,
                    }}
                  >
                    <tech.icon className="h-4 w-4 text-[#0054C5]" />
                    <span className="text-sm font-bold text-[#1a1a2e]">
                      {tech.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - 3D Phone */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative"
            >
              {/* Decorative shapes behind phone */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full bg-[#99E7F1]/30 border-2 border-[#1a1a2e]" />
                <div className="absolute w-60 h-60 rounded-full bg-[#0054C5]/20 border-2 border-[#1a1a2e] translate-x-20 -translate-y-10" />
              </div>

              <Suspense
                fallback={
                  <div className="relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-[6px_6px_0_#1a1a2e] border-3 border-[#1a1a2e] bg-white">
                      <div className="h-[500px] w-full flex items-center justify-center">
                        <motion.div
                          className="w-16 h-16 rounded-full border-4 border-[#0054C5] border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                }
              >
                <Phone3DScene />
              </Suspense>

              {/* Floating Labels */}
              <motion.div
                className="absolute top-20 -left-4 bg-[#99E7F1] rounded-xl px-4 py-2 shadow-[3px_3px_0_#1a1a2e] border-2 border-[#1a1a2e]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-[#1a1a2e]" />
                  <span className="text-sm font-bold text-[#1a1a2e]">
                    AI Processing
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-32 -right-4 bg-[#FF6B00] rounded-xl px-4 py-2 shadow-[3px_3px_0_#1a1a2e] border-2 border-[#1a1a2e]"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-white" />
                  <span className="text-sm font-bold text-white">
                    Real-time Response
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <span className="text-sm text-[#3a3a4e] font-medium">
              Scroll to explore
            </span>
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-[#1a1a2e] flex justify-center pt-2 bg-white"
              animate={{
                borderColor: ["#1a1a2e", "#0054C5", "#1a1a2e"],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#0054C5]"
                animate={{ y: [0, 16, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Carousel Section */}
      <section
        id="features"
        className="relative py-24 overflow-hidden bg-[#fefbf3]"
      >
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#1a1a2e] bg-[#0054C5] px-4 py-1.5 text-sm mb-6 shadow-[3px_3px_0_#1a1a2e] font-bold"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="h-4 w-4 text-white" />
              <span className="text-white">Powerful Features</span>
            </motion.div>
            <h2 className="mb-4 text-3xl font-black md:text-5xl text-[#1a1a2e]">
              Built for{" "}
              <span className="text-[#0054C5]">Enterprise Control</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#3a3a4e] font-medium">
              Complete visibility and control over your AI infrastructure with
              enterprise-grade security and compliance.
            </p>
          </motion.div>

          {/* Interactive Feature Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <TiltCard key={index}>
                <SpotlightCard className="h-full">
                  <motion.div
                    className={`relative h-full rounded-xl border-3 border-[#1a1a2e] bg-white p-6 shadow-[4px_4px_0_#1a1a2e] transition-all hover:shadow-[6px_6px_0_#1a1a2e] hover:-translate-x-[2px] hover:-translate-y-[2px] ${
                      activeFeatureIndex === index ? "bg-[#99E7F1]/20" : ""
                    }`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setActiveFeatureIndex(index)}
                  >
                    <motion.div
                      className={`mb-4 inline-flex rounded-xl p-3 border-2 border-[#1a1a2e] shadow-[2px_2px_0_#1a1a2e] bg-gradient-to-br ${feature.gradient}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <h3 className="mb-2 text-xl font-bold text-[#1a1a2e]">
                      {feature.title}
                    </h3>
                    <p className="text-[#3a3a4e] font-medium">
                      {feature.description}
                    </p>

                    {/* Active indicator */}
                    {activeFeatureIndex === index && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-[#0054C5] rounded-b-xl"
                        layoutId="activeFeature"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.div>
                </SpotlightCard>
              </TiltCard>
            ))}
          </div>

          {/* Feature Progress Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveFeatureIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 border-2 border-[#1a1a2e] ${
                  index === activeFeatureIndex
                    ? "w-10 bg-[#0054C5]"
                    : "w-3 bg-white hover:bg-[#99E7F1]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 overflow-hidden bg-[#99E7F1]">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: "50,000+", label: "Active Users" },
              { icon: Clock, value: "99.9%", label: "Uptime SLA" },
              { icon: Building2, value: "150+", label: "Enterprise Clients" },
              { icon: Star, value: "4.9/5", label: "User Rating" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <motion.div
                  className="inline-flex p-4 rounded-xl bg-white mb-4 border-2 border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e]"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <stat.icon className="h-8 w-8 text-[#0054C5]" />
                </motion.div>
                <div className="text-4xl md:text-5xl font-black text-[#1a1a2e] mb-2">
                  {stat.value}
                </div>
                <div className="text-[#1a1a2e] font-bold text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="about"
        className="relative py-24 overflow-hidden bg-[#fefbf3]"
      >
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.div className="space-y-4">
                  <motion.img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                    alt="Team collaboration"
                    className="rounded-xl shadow-[4px_4px_0_#1a1a2e] w-full h-48 object-cover border-2 border-[#1a1a2e]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.img
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=300&fit=crop"
                    alt="Modern office"
                    className="rounded-xl shadow-[4px_4px_0_#1a1a2e] w-full h-36 object-cover border-2 border-[#1a1a2e]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <motion.div className="space-y-4 pt-8">
                  <motion.img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop"
                    alt="Team meeting"
                    className="rounded-xl shadow-[4px_4px_0_#1a1a2e] w-full h-36 object-cover border-2 border-[#1a1a2e]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.img
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop"
                    alt="Innovation"
                    className="rounded-xl shadow-[4px_4px_0_#1a1a2e] w-full h-48 object-cover border-2 border-[#1a1a2e]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>
              {/* Floating Badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-[#FF6B00] text-white rounded-xl p-4 border-2 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-3xl font-black">5+</div>
                <div className="text-sm font-bold">Years of Excellence</div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#1a1a2e] bg-[#0054C5] px-4 py-1.5 text-sm mb-6 shadow-[3px_3px_0_#1a1a2e] font-bold"
                whileHover={{ scale: 1.05 }}
              >
                <Heart className="h-4 w-4 text-white" />
                <span className="text-white">About Mozenith</span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-black text-[#1a1a2e] mb-6">
                We&apos;re on a Mission to{" "}
                <span className="text-[#0054C5]">Democratize AI</span>
              </h2>

              <p className="text-lg text-[#3a3a4e] mb-6 font-medium">
                Founded in 2021, Mozenith emerged from a simple observation:
                enterprises needed better tools to manage their AI operations.
                What started as a small team of passionate engineers has grown
                into a global platform serving thousands of businesses.
              </p>

              <p className="text-lg text-[#3a3a4e] mb-8 font-medium">
                Our mission is to make AI management accessible, secure, and
                efficient for organizations of all sizes.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  {
                    icon: Target,
                    title: "Our Vision",
                    desc: "AI-powered enterprises everywhere",
                  },
                  {
                    icon: Rocket,
                    title: "Our Mission",
                    desc: "Simplify AI management at scale",
                  },
                  {
                    icon: Award,
                    title: "Our Values",
                    desc: "Security, Innovation, Trust",
                  },
                  {
                    icon: Globe,
                    title: "Our Reach",
                    desc: "40+ countries worldwide",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-2 rounded-lg bg-[#99E7F1] border-2 border-[#1a1a2e] shadow-[2px_2px_0_#1a1a2e]">
                      <item.icon className="h-5 w-5 text-[#1a1a2e]" />
                    </div>
                    <div>
                      <div className="font-bold text-[#1a1a2e]">
                        {item.title}
                      </div>
                      <div className="text-sm text-[#3a3a4e] font-medium">
                        {item.desc}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <MagneticCursor>
                <Button className="bg-[#FF6B00] hover:bg-[#E55F00] border-2 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] hover:shadow-[2px_2px_0_#1a1a2e] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-bold">
                  Learn Our Story
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </MagneticCursor>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video/Demo Section */}
      <section className="relative py-24 overflow-hidden bg-[#0054C5]">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-2 border-white/20"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-2 border-white/10"
            animate={{ scale: [1.1, 1, 1.1], rotate: [360, 180, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              See <span className="text-[#99E7F1]">Mozenith</span> in Action
            </h2>
            <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto font-medium">
              Watch how leading enterprises use Mozenith to transform their AI
              operations and achieve unprecedented efficiency.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-[8px_8px_0_#1a1a2e] border-3 border-[#1a1a2e] bg-white">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop"
                alt="Platform Demo"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-[#1a1a2e]/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  className="flex items-center justify-center w-20 h-20 rounded-full bg-white border-3 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="flex items-center justify-center w-16 h-16 rounded-full bg-[#FF6B00] border-2 border-[#1a1a2e]"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Play className="h-8 w-8 text-white ml-1" fill="white" />
                  </motion.div>
                </motion.button>
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              className="absolute -left-4 top-1/4 bg-[#99E7F1] rounded-xl p-4 border-2 border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-[#1a1a2e]" />
                <div>
                  <div className="text-[#1a1a2e] font-black">40%</div>
                  <div className="text-[#1a1a2e] text-xs font-bold">
                    Efficiency Boost
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-4 bottom-1/4 bg-[#FF6B00] rounded-xl p-4 border-2 border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e]"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-white" />
                <div>
                  <div className="text-white font-black">10x</div>
                  <div className="text-white text-xs font-bold">
                    Faster Deployment
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials/Reviews Section */}
      <section
        id="reviews"
        className="relative py-24 overflow-hidden bg-[#fefbf3]"
      >
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#1a1a2e] bg-[#FF6B00] px-4 py-1.5 text-sm mb-6 shadow-[3px_3px_0_#1a1a2e] font-bold"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="h-4 w-4 text-white" fill="white" />
              <span className="text-white">Customer Reviews</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a2e] mb-4">
              Loved by <span className="text-[#0054C5]">Teams Worldwide</span>
            </h2>
            <p className="text-lg text-[#3a3a4e] max-w-2xl mx-auto font-medium">
              Don&apos;t just take our word for it. Here&apos;s what our
              customers have to say about their experience with Mozenith.
            </p>
          </motion.div>

          {/* Testimonial Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${currentTestimonial * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <motion.div
                      className="bg-white rounded-xl p-8 md:p-12 border-3 border-[#1a1a2e] shadow-[6px_6px_0_#1a1a2e] max-w-3xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <Quote className="h-12 w-12 text-[#0054C5] mb-6" />
                      <p className="text-xl md:text-2xl text-[#1a1a2e] mb-8 leading-relaxed font-medium">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-[#1a1a2e]"
                        />
                        <div>
                          <div className="font-bold text-[#1a1a2e]">
                            {testimonial.name}
                          </div>
                          <div className="text-[#3a3a4e] text-sm font-medium">
                            {testimonial.role}
                          </div>
                        </div>
                        <div className="ml-auto flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 text-[#FF6B00]"
                              fill="#FF6B00"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() =>
                setCurrentTestimonial(
                  (prev) =>
                    (prev - 1 + testimonials.length) % testimonials.length,
                )
              }
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white border-2 border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e] flex items-center justify-center hover:bg-[#99E7F1] transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-[#1a1a2e]" />
            </button>
            <button
              onClick={() =>
                setCurrentTestimonial(
                  (prev) => (prev + 1) % testimonials.length,
                )
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white border-2 border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e] flex items-center justify-center hover:bg-[#99E7F1] transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-[#1a1a2e]" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-3 rounded-full transition-all border-2 border-[#1a1a2e] ${
                    index === currentTestimonial
                      ? "bg-[#0054C5] w-10"
                      : "bg-white hover:bg-[#99E7F1] w-3"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Partners Logo Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20"
          >
            <p className="text-[#3a3a4e] font-bold text-center mb-8">
              Trusted by industry leaders
            </p>
            <LogoCarousel logos={partners} speed={25} />
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section
        id="team"
        className="relative py-24 overflow-hidden bg-[#99E7F1]"
      >
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#1a1a2e] bg-white px-4 py-1.5 text-sm mb-6 shadow-[3px_3px_0_#1a1a2e] font-bold"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="h-4 w-4 text-[#1a1a2e]" />
              <span className="text-[#1a1a2e]">Our Team</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a2e] mb-4">
              Meet the <span className="text-[#0054C5]">Innovators</span>
            </h2>
            <p className="text-lg text-[#1a1a2e] max-w-2xl mx-auto font-medium">
              A passionate team of experts dedicated to transforming how
              enterprises manage their AI operations.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={fadeInUp} className="group">
                <TiltCard>
                  <div className="relative flex flex-col items-center p-8 rounded-xl bg-white border-3 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] hover:shadow-[6px_6px_0_#1a1a2e] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
                    {/* Image Container */}
                    <div className="relative mb-6">
                      {/* Animated ring */}
                      <motion.div
                        className="absolute -inset-2 rounded-full bg-[#0054C5] opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-2 border-[#1a1a2e]"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{ padding: "2px" }}
                      />

                      {/* Image */}
                      <motion.div
                        className="relative w-32 h-32 rounded-full overflow-hidden border-3 border-[#1a1a2e]"
                        whileHover={{ scale: 1.05 }}
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-[#1a1a2e]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                          <p className="text-white text-xs text-center px-2 font-medium">
                            {member.bio}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Name and Role */}
                    <div className="text-center relative z-10">
                      <h3 className="text-lg font-black text-[#1a1a2e] mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[#0054C5] text-sm font-bold">
                        {member.role}
                      </p>
                    </div>

                    {/* Social dots */}
                    <div className="flex gap-2 mt-4">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-[#1a1a2e]/30 group-hover:bg-[#FF6B00]"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.2,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Join Team CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <p className="text-[#1a1a2e] font-bold mb-4">
              Want to join our team?
            </p>
            <MagneticCursor>
              <Button
                variant="outline"
                className="border-2 border-[#1a1a2e] text-[#1a1a2e] bg-white hover:bg-[#FF6B00] hover:text-white shadow-[4px_4px_0_#1a1a2e] hover:shadow-[2px_2px_0_#1a1a2e] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-bold"
              >
                View Open Positions
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </MagneticCursor>
          </motion.div>
        </div>
      </section>

      {/* AI App Showcase Section */}
      <section
        id="ai-app"
        className="relative py-24 overflow-hidden bg-[#fefbf3]"
      >
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#1a1a2e] bg-[#0054C5] px-4 py-1.5 text-sm mb-6 shadow-[3px_3px_0_#1a1a2e] font-bold"
                whileHover={{ scale: 1.05 }}
              >
                <Cpu className="h-4 w-4 text-white" />
                <span className="text-white">Control Center</span>
              </motion.div>

              <h2 className="mb-6 text-3xl font-black md:text-4xl text-[#1a1a2e]">
                Enterprise-Grade
                <br />
                <span className="text-[#0054C5]">AI Control Center</span>
              </h2>
              <p className="mb-8 text-lg text-[#3a3a4e] font-medium">
                Mozenith provides a centralized command center for all your AI
                operations, ensuring security, compliance, and operational
                excellence.
              </p>

              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={stagger}
                className="space-y-4"
              >
                {[
                  "Complete role-based access control (RBAC)",
                  "Real-time activity monitoring and audit logs",
                  "Session management across all devices",
                  "Granular permission configuration",
                  "JWT token-based authentication",
                  "Secure API with refresh token rotation",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-center gap-3 group"
                    whileHover={{ x: 10 }}
                  >
                    <motion.div
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0054C5] border-2 border-[#1a1a2e]"
                      whileHover={{ scale: 1.2 }}
                    >
                      <Check className="h-4 w-4 text-white" />
                    </motion.div>
                    <span className="text-[#3a3a4e] font-medium group-hover:text-[#1a1a2e] transition-colors">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-8">
                <MagneticCursor>
                  <Link href="/login" className="inline-block">
                    <Button className="bg-[#FF6B00] hover:bg-[#E55F00] border-2 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] hover:shadow-[2px_2px_0_#1a1a2e] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-bold">
                      Get Started
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </MagneticCursor>
              </div>
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <SpotlightCard>
                <div className="p-1">
                  <div className="overflow-hidden rounded-xl border-3 border-[#1a1a2e] bg-white shadow-[6px_6px_0_#1a1a2e]">
                    {/* Mock Dashboard */}
                    <div className="border-b-2 border-[#1a1a2e] bg-[#99E7F1] px-4 py-3">
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="h-3 w-3 rounded-full bg-[#FF6B00] border border-[#1a1a2e]"
                          whileHover={{ scale: 1.3 }}
                        />
                        <motion.div
                          className="h-3 w-3 rounded-full bg-[#0054C5] border border-[#1a1a2e]"
                          whileHover={{ scale: 1.3 }}
                        />
                        <motion.div
                          className="h-3 w-3 rounded-full bg-[#1a1a2e] border border-[#1a1a2e]"
                          whileHover={{ scale: 1.3 }}
                        />
                        <span className="ml-4 text-sm text-[#1a1a2e] font-bold">
                          mozenith.app/dashboard
                        </span>
                      </div>
                    </div>
                    <div className="p-6 bg-[#fefbf3]">
                      <div className="flex gap-4">
                        {/* Sidebar mock */}
                        <div className="w-48 space-y-3">
                          {[1, 2, 3, 4].map((i) => (
                            <motion.div
                              key={i}
                              className={`h-8 w-full rounded-lg border-2 border-[#1a1a2e] ${i === 2 ? "bg-[#99E7F1]" : "bg-white"}`}
                              whileHover={{
                                scale: 1.02,
                                backgroundColor: "#99E7F1",
                              }}
                            />
                          ))}
                        </div>
                        {/* Content mock */}
                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <motion.div
                              className="rounded-lg bg-white p-4 border-2 border-[#1a1a2e] shadow-[2px_2px_0_#1a1a2e]"
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="mb-2 h-4 w-16 rounded bg-[#1a1a2e]/20" />
                              <div className="h-8 w-24 rounded bg-[#99E7F1]" />
                            </motion.div>
                            <motion.div
                              className="rounded-lg bg-white p-4 border-2 border-[#1a1a2e] shadow-[2px_2px_0_#1a1a2e]"
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="mb-2 h-4 w-16 rounded bg-[#1a1a2e]/20" />
                              <div className="h-8 w-24 rounded bg-[#0054C5]" />
                            </motion.div>
                          </div>
                          <motion.div
                            className="rounded-lg bg-white p-4 border-2 border-[#1a1a2e] shadow-[2px_2px_0_#1a1a2e]"
                            whileHover={{ scale: 1.01 }}
                          >
                            <div className="space-y-2">
                              <div className="h-4 w-full rounded bg-[#1a1a2e]/20" />
                              <div className="h-4 w-3/4 rounded bg-[#1a1a2e]/20" />
                              <div className="h-4 w-1/2 rounded bg-[#1a1a2e]/20" />
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section
        id="security"
        className="relative py-24 overflow-hidden bg-[#0054C5]"
      >
        <FloatingOrbs />

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#1a1a2e] bg-white px-4 py-1.5 text-sm mb-6 shadow-[3px_3px_0_#1a1a2e] font-bold"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="h-4 w-4 text-[#1a1a2e]" />
              <span className="text-[#1a1a2e]">Enterprise Security</span>
            </motion.div>

            <h2 className="mb-4 text-3xl font-black md:text-4xl text-white">
              Security-First{" "}
              <span className="text-[#99E7F1]">Architecture</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/80 font-medium">
              Built with enterprise security requirements in mind, Mozenith
              ensures your AI operations are protected at every level.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-3"
          >
            {[
              {
                icon: Lock,
                title: "Authentication",
                color: "cyan",
                items: [
                  "JWT access tokens",
                  "Secure refresh token rotation",
                  "OAuth 2.0 support (Google, Facebook)",
                  "Email OTP verification",
                ],
              },
              {
                icon: Shield,
                title: "Authorization",
                color: "purple",
                items: [
                  "Role-based access control",
                  "Granular permissions",
                  "Route-level protection",
                  "Component-level visibility",
                ],
              },
              {
                icon: Activity,
                title: "Auditing",
                color: "emerald",
                items: [
                  "Complete activity logging",
                  "Session tracking",
                  "User action history",
                  "Export capabilities",
                ],
              },
            ].map((column, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <TiltCard>
                  <div className="relative h-full rounded-xl border-3 border-[#1a1a2e] bg-white p-6 shadow-[4px_4px_0_#1a1a2e] hover:shadow-[6px_6px_0_#1a1a2e] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all group overflow-hidden">
                    <motion.div
                      className={`mb-4 inline-flex rounded-xl p-3 border-2 border-[#1a1a2e] shadow-[2px_2px_0_#1a1a2e] ${
                        column.color === "cyan"
                          ? "bg-[#99E7F1]"
                          : column.color === "purple"
                            ? "bg-[#0054C5]"
                            : "bg-[#FF6B00]"
                      }`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <column.icon
                        className={`h-6 w-6 ${
                          column.color === "cyan"
                            ? "text-[#1a1a2e]"
                            : "text-white"
                        }`}
                      />
                    </motion.div>
                    <h3 className="mb-4 text-xl font-bold text-[#1a1a2e]">
                      {column.title}
                    </h3>
                    <ul className="space-y-3">
                      {column.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          className="flex items-center gap-2 text-[#3a3a4e] font-medium"
                          whileHover={{ x: 5 }}
                        >
                          <Check
                            className={`h-4 w-4 flex-shrink-0 ${
                              column.color === "cyan"
                                ? "text-[#0054C5]"
                                : column.color === "purple"
                                  ? "text-[#0054C5]"
                                  : "text-[#FF6B00]"
                            }`}
                          />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden bg-[#fefbf3]">
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-xl border-3 border-[#1a1a2e] bg-white p-12 shadow-[8px_8px_0_#1a1a2e]"
          >
            <motion.div
              className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#99E7F1] border-2 border-[#1a1a2e]"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#0054C5] border-2 border-[#1a1a2e]"
              animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            {/* Floating Icons */}
            <motion.div
              className="absolute top-8 left-8 p-3 rounded-full bg-white border-2 border-[#1a1a2e] shadow-[2px_2px_0_#1a1a2e]"
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="h-6 w-6 text-[#0054C5]" />
            </motion.div>
            <motion.div
              className="absolute bottom-8 right-8 p-3 rounded-full bg-white border-2 border-[#1a1a2e] shadow-[2px_2px_0_#1a1a2e]"
              animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Rocket className="h-6 w-6 text-[#FF6B00]" />
            </motion.div>

            <div className="relative">
              <motion.div
                className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-[#1a1a2e] px-4 py-1.5 text-sm text-[#1a1a2e] mb-6 font-bold shadow-[2px_2px_0_#1a1a2e]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Zap className="h-4 w-4" />
                <span>Start your free trial today</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-4 text-3xl font-black md:text-4xl text-[#1a1a2e]"
              >
                Ready to <span className="text-[#0054C5]">Take Control</span>?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-8 text-lg text-[#3a3a4e] max-w-xl mx-auto font-medium"
              >
                Join thousands of enterprises already using Mozenith to power
                their AI operations. No credit card required.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <MagneticCursor>
                  <Link href="/login">
                    <Button
                      size="lg"
                      className="bg-[#FF6B00] px-8 hover:bg-[#E55F00] border-2 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] hover:shadow-[2px_2px_0_#1a1a2e] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-bold"
                    >
                      Start Free Trial
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                </MagneticCursor>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#1a1a2e] px-8 text-[#1a1a2e] bg-white hover:bg-[#99E7F1] shadow-[4px_4px_0_#1a1a2e] hover:shadow-[2px_2px_0_#1a1a2e] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-bold"
                >
                  Schedule Demo
                </Button>
              </motion.div>
              <motion.p
                className="mt-6 text-[#3a3a4e] text-sm font-bold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                ✓ 14-day free trial &nbsp;&nbsp; ✓ No credit card required
                &nbsp;&nbsp; ✓ Cancel anytime
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-16 border-b-3 border-[#1a1a2e] bg-[#99E7F1]">
        <div className="relative mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div>
              <h3 className="text-2xl font-black text-[#1a1a2e] mb-2">
                Stay Updated
              </h3>
              <p className="text-[#1a1a2e] font-medium">
                Get the latest news, updates, and AI insights delivered to your
                inbox.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl border-2 border-[#1a1a2e] bg-white text-[#1a1a2e] placeholder-[#3a3a4e] focus:outline-none shadow-[3px_3px_0_#1a1a2e] transition-all font-medium"
              />
              <Button className="bg-[#FF6B00] hover:bg-[#E55F00] px-6 border-2 border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e] hover:shadow-[1px_1px_0_#1a1a2e] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-bold">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 bg-[#1a1a2e]">
        <div className="relative mx-auto max-w-7xl px-6">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <motion.div
                className="flex items-center gap-2 mb-4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden border-2 border-white">
                  <div className="absolute inset-0 bg-[#99E7F1]" />
                  <img
                    src="/pictures/mozenith.jpg"
                    alt="Mozenith Logo"
                    className="relative h-full w-full object-cover"
                  />
                </div>
                <span className="text-xl font-black text-white">Mozenith</span>
              </motion.div>
              <p className="text-white/70 mb-6 max-w-sm font-medium">
                Enterprise AI Control Platform. Manage, monitor, and secure your
                AI operations with confidence.
              </p>
              <div className="flex gap-3">
                {[
                  { name: "twitter", icon: "𝕏" },
                  { name: "linkedin", icon: "in" },
                  { name: "github", icon: "◉" },
                  { name: "youtube", icon: "▶" },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-white border-2 border-white flex items-center justify-center text-[#1a1a2e] hover:bg-[#99E7F1] transition-all font-bold"
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <span className="text-sm font-bold">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            {[
              {
                title: "Product",
                links: [
                  "Features",
                  "Pricing",
                  "Integrations",
                  "API Docs",
                  "Changelog",
                ],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Blog", "Press Kit", "Contact"],
              },
              {
                title: "Resources",
                links: [
                  "Documentation",
                  "Help Center",
                  "Community",
                  "Webinars",
                  "Status",
                ],
              },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="text-white font-bold mb-4">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        className="text-white/60 hover:text-[#99E7F1] transition-colors text-sm font-medium"
                        whileHover={{ x: 3 }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t-2 border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-white/60 font-medium">
                © 2026 Mozenith. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                  "Security",
                ].map((item) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="hover:text-[#99E7F1] transition-colors font-medium"
                    whileHover={{ y: -1 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm font-medium">
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#99E7F1]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                All systems operational
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
