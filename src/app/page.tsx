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
} from "lucide-react";
import {
  FloatingElements,
  MagneticButton,
  GlowingCard,
  ScrollIndicator,
  AnimatedGradientBorder,
  Ripple,
} from "@/components/landing";

// Dynamically import 3D scene to avoid SSR issues
const Phone3DScene = dynamic(
  () => import("@/components/landing/phone-3d").then((mod) => mod.Phone3DScene),
  {
    ssr: false,
    loading: () => (
      <div className="relative">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30">
          <div className="bg-gradient-to-r from-[#1890FF]/90 to-[#99E7F1]/90 px-4 py-3 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-sm font-medium text-white/90">
                ✨ Loading 3D Preview...
              </span>
            </div>
            <div className="w-14" />
          </div>
          <div
            className="h-[550px] w-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c1929 100%)",
            }}
          >
            <motion.div
              className="w-20 h-20 rounded-full border-4 border-[#1890FF] border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-xs text-white/60">Initializing...</span>
            </div>
            <span className="text-xs text-white/40">Powered by Three.js</span>
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

// Animated Counter Component
function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0.8, 1]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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
      color: "blue",
    },
    {
      icon: Shield,
      title: "Role & Permission System",
      description:
        "Granular permission management with customizable roles to match your organizational structure.",
      color: "purple",
    },
    {
      icon: Activity,
      title: "Activity Logging",
      description:
        "Complete audit trail of all system activities with advanced filtering and export capabilities.",
      color: "emerald",
    },
    {
      icon: Lock,
      title: "Session Control",
      description:
        "Manage active sessions, force logout users, and maintain security across all devices.",
      color: "amber",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description:
        "Monitor system health, user activity, and AI operations with comprehensive dashboards.",
      color: "cyan",
    },
    {
      icon: Workflow,
      title: "AI Orchestration",
      description:
        "Coordinate complex AI workflows with intelligent automation and process management.",
      color: "pink",
    },
  ];

  const aiFeatures = [
    {
      icon: Brain,
      title: "Smart AI Assistant",
      description:
        "Powered by advanced language models for intelligent conversations",
    },
    {
      icon: MessageSquare,
      title: "Natural Conversations",
      description: "Chat naturally with context-aware responses",
    },
    {
      icon: Mic,
      title: "Voice Commands",
      description: "Hands-free interaction with voice recognition",
    },
    {
      icon: Camera,
      title: "Visual AI",
      description: "Image recognition and visual processing capabilities",
    },
  ];

  return (
    <div className="min-h-screen bg-[#99E7F1] text-[#3D3D3D] overflow-x-hidden">
      {/* Floating Background Elements */}
      <FloatingElements />

      {/* Navigation */}
      <motion.header
        style={{ opacity: headerOpacity }}
        className="fixed top-0 z-50 w-full border-b border-[#1890FF]/10 bg-[#99E7F1]/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white overflow-hidden"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/pictures/mozenith.jpg"
                alt="Mozenith Logo"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <span className="text-xl font-bold text-[#3D3D3D]">Mozenith</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {["Features", "About", "Reviews", "Team", "Security"].map(
              (item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm text-[#666666] transition-colors hover:text-[#1890FF] relative"
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1890FF]"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ),
            )}
          </nav>
          <MagneticButton>
            <Link href="/login">
              <Button className="bg-[#FF6B00] hover:bg-[#E55F00] shadow-lg shadow-[#FF6B00]/25">
                Login
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </MagneticButton>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden pt-32 pb-24">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute left-1/4 top-1/3 h-[600px] w-[600px] rounded-full bg-[#1890FF]/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full bg-[#FF6B00]/10 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              y: [0, -30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Animated Grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(24 144 255 / 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
            {/* Left Content */}
            <motion.div
              initial="initial"
              animate={isLoaded ? "animate" : "initial"}
              variants={stagger}
              className="text-left"
            >
              {/* Badge */}
              <motion.div
                variants={fadeInUp}
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#1890FF]/30 bg-white/60 px-4 py-1.5 text-sm backdrop-blur-sm"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4 text-[#1890FF]" />
                </motion.div>
                <span className="text-[#666666]">
                  AI-Powered Mobile Experience
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl text-[#3D3D3D]"
              >
                Your AI Assistant,{" "}
                <span className="relative">
                  <span className="text-[#1890FF]">Always Ready</span>
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1 bg-[#FF6B00] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mb-10 max-w-xl text-lg text-[#666666] md:text-xl"
              >
                Experience the future of mobile AI. Our intelligent app learns,
                adapts, and assists you in ways you never imagined possible.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col items-start gap-4 sm:flex-row"
              >
                <MagneticButton>
                  <Link href="/login">
                    <Button
                      size="lg"
                      className="bg-[#FF6B00] px-8 hover:bg-[#E55F00] shadow-xl shadow-[#FF6B00]/30 group"
                    >
                      <Smartphone className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                      Try the App
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </MagneticButton>
                <a href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#1890FF]/30 px-8 text-[#1890FF] hover:bg-[#1890FF]/10"
                  >
                    Explore Features
                  </Button>
                </a>
              </motion.div>

              {/* AI Features Quick List */}
              <motion.div
                variants={fadeInUp}
                className="mt-12 grid grid-cols-2 gap-4"
              >
                {aiFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255,255,255,0.8)",
                    }}
                  >
                    <div className="p-2 rounded-lg bg-[#1890FF]/10">
                      <feature.icon className="h-5 w-5 text-[#1890FF]" />
                    </div>
                    <span className="text-sm font-medium text-[#3D3D3D]">
                      {feature.title}
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
              {/* Glow Effect Behind Phone */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Ripple />
              </div>

              <Suspense
                fallback={
                  <div className="relative">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30">
                      <div className="bg-gradient-to-r from-[#1890FF]/90 to-[#99E7F1]/90 px-4 py-3 flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-400" />
                          <div className="w-3 h-3 rounded-full bg-yellow-400" />
                          <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="flex-1 text-center">
                          <span className="text-sm font-medium text-white/90">
                            ✨ Loading 3D Preview...
                          </span>
                        </div>
                        <div className="w-14" />
                      </div>
                      <div
                        className="h-[550px] w-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c1929 100%)",
                        }}
                      >
                        <motion.div
                          className="w-20 h-20 rounded-full border-4 border-[#1890FF] border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </div>
                      <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                          <span className="text-xs text-white/60">
                            Initializing...
                          </span>
                        </div>
                        <span className="text-xs text-white/40">
                          Powered by Three.js
                        </span>
                      </div>
                    </div>
                  </div>
                }
              >
                <Phone3DScene />
              </Suspense>

              {/* Floating Labels */}
              <motion.div
                className="absolute top-20 -left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-[#1890FF]" />
                  <span className="text-sm font-medium">AI Processing</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-32 -right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#52C41A]" />
                  <span className="text-sm font-medium">
                    Real-time Response
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <ScrollIndicator />
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative py-24 bg-white overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-[#3D3D3D]">
              Built for Enterprise Control
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#666666]">
              Complete visibility and control over your AI infrastructure with
              enterprise-grade security and compliance.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <GlowingCard className="group h-full">
                  <div className="relative overflow-hidden rounded-2xl border border-[#EEEEEE] bg-white p-6 transition-all hover:border-[#99E7F1] hover:shadow-xl h-full">
                    <motion.div
                      className={`mb-4 inline-flex rounded-xl p-3 ${
                        feature.color === "blue"
                          ? "bg-[#1890FF]/10 text-[#1890FF]"
                          : feature.color === "purple"
                            ? "bg-[#1890FF]/10 text-[#1890FF]"
                            : feature.color === "emerald"
                              ? "bg-[#52C41A]/10 text-[#52C41A]"
                              : feature.color === "amber"
                                ? "bg-[#FAAD14]/10 text-[#FAAD14]"
                                : feature.color === "cyan"
                                  ? "bg-[#99E7F1]/30 text-[#1890FF]"
                                  : "bg-[#FF6B00]/10 text-[#FF6B00]"
                      }`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <feature.icon className="h-6 w-6" />
                    </motion.div>
                    <h3 className="mb-2 text-xl font-semibold text-[#3D3D3D]">
                      {feature.title}
                    </h3>
                    <p className="text-[#666666]">{feature.description}</p>

                    {/* Hover effect arrow */}
                    <motion.div
                      className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <ArrowRight className="h-5 w-5 text-[#1890FF]" />
                    </motion.div>
                  </div>
                </GlowingCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#1890FF] to-[#0054C5] overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-white/10 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], y: [0, -30, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <motion.div
                  className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-sm mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <stat.icon className="h-8 w-8 text-white" />
                </motion.div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/80 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
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
                <motion.div
                  className="space-y-4"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                >
                  <motion.img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                    alt="Team collaboration"
                    className="rounded-2xl shadow-lg w-full h-48 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.img
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=300&fit=crop"
                    alt="Modern office"
                    className="rounded-2xl shadow-lg w-full h-36 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <motion.div
                  className="space-y-4 pt-8"
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                >
                  <motion.img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop"
                    alt="Team meeting"
                    className="rounded-2xl shadow-lg w-full h-36 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.img
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop"
                    alt="Innovation"
                    className="rounded-2xl shadow-lg w-full h-48 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>
              {/* Floating Badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-[#FF6B00] text-white rounded-2xl p-4 shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-3xl font-bold">5+</div>
                <div className="text-sm opacity-90">Years of Excellence</div>
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
                className="inline-flex items-center gap-2 rounded-full border border-[#1890FF]/30 bg-[#99E7F1]/30 px-4 py-1.5 text-sm mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Heart className="h-4 w-4 text-[#FF6B00]" />
                <span className="text-[#666666]">About Mozenith</span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#3D3D3D] mb-6">
                We&apos;re on a Mission to{" "}
                <span className="text-[#1890FF]">Democratize AI</span>
              </h2>

              <p className="text-lg text-[#666666] mb-6">
                Founded in 2021, Mozenith emerged from a simple observation:
                enterprises needed better tools to manage their AI operations.
                What started as a small team of passionate engineers has grown
                into a global platform serving thousands of businesses.
              </p>

              <p className="text-lg text-[#666666] mb-8">
                Our mission is to make AI management accessible, secure, and
                efficient for organizations of all sizes. We believe that the
                future of business is AI-powered, and we&apos;re here to help
                you get there.
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
                    <div className="p-2 rounded-lg bg-[#99E7F1]/30">
                      <item.icon className="h-5 w-5 text-[#1890FF]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#3D3D3D]">
                        {item.title}
                      </div>
                      <div className="text-sm text-[#666666]">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <MagneticButton>
                <Button className="bg-[#1890FF] hover:bg-[#0054C5] shadow-lg shadow-[#1890FF]/25">
                  Learn Our Story
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video/Demo Section */}
      <section className="relative py-24 bg-[#0f172a] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1890FF]/10 to-transparent" />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#1890FF]/20"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#1890FF]/10"
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See Mozenith in Action
            </h2>
            <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto">
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
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop"
                alt="Platform Demo"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <motion.button
                  className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="flex items-center justify-center w-16 h-16 rounded-full bg-[#FF6B00] shadow-lg shadow-[#FF6B00]/50"
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
              className="absolute -left-4 top-1/4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-[#52C41A]" />
                <div>
                  <div className="text-white font-semibold">40%</div>
                  <div className="text-white/60 text-xs">Efficiency Boost</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-4 bottom-1/4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-[#FAAD14]" />
                <div>
                  <div className="text-white font-semibold">10x</div>
                  <div className="text-white/60 text-xs">Faster Deployment</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials/Reviews Section */}
      <section
        id="reviews"
        className="relative py-24 bg-[#99E7F1] overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 rounded-full bg-white/30 blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-[#1890FF]/10 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-[#1890FF]/30 bg-white/60 px-4 py-1.5 text-sm mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="h-4 w-4 text-[#FAAD14]" fill="#FAAD14" />
              <span className="text-[#666666]">Customer Reviews</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D3D3D] mb-4">
              Loved by Teams Worldwide
            </h2>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">
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
                      className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <Quote className="h-12 w-12 text-[#99E7F1] mb-6" />
                      <p className="text-xl md:text-2xl text-[#3D3D3D] mb-8 leading-relaxed">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-[#99E7F1]"
                        />
                        <div>
                          <div className="font-semibold text-[#3D3D3D]">
                            {testimonial.name}
                          </div>
                          <div className="text-[#666666] text-sm">
                            {testimonial.role}
                          </div>
                        </div>
                        <div className="ml-auto flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 text-[#FAAD14]"
                              fill="#FAAD14"
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
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#99E7F1] transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-[#3D3D3D]" />
            </button>
            <button
              onClick={() =>
                setCurrentTestimonial(
                  (prev) => (prev + 1) % testimonials.length,
                )
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#99E7F1] transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-[#3D3D3D]" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial
                      ? "bg-[#1890FF] w-8"
                      : "bg-[#1890FF]/30 hover:bg-[#1890FF]/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <p className="text-[#666666] mb-6">Trusted by industry leaders</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
              {partners.map((partner, index) => (
                <motion.img
                  key={index}
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 md:h-10 object-contain grayscale hover:grayscale-0 transition-all"
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="relative py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-[#1890FF]/30 bg-[#99E7F1]/30 px-4 py-1.5 text-sm mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="h-4 w-4 text-[#1890FF]" />
              <span className="text-[#666666]">Our Team</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D3D3D] mb-4">
              Meet the Innovators
            </h2>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              A passionate team of experts dedicated to transforming how
              enterprises manage their AI operations.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {teamMembers.map((member, index) => {
              // Different floating icon positions for each member
              const floatingIcons = [
                [
                  { icon: Sparkles, position: "top-0 right-4", delay: 0 },
                  { icon: Star, position: "bottom-8 left-0", delay: 0.5 },
                  { icon: Zap, position: "top-12 -left-4", delay: 1 },
                ],
                [
                  { icon: Brain, position: "top-4 left-0", delay: 0.2 },
                  { icon: Target, position: "bottom-4 right-2", delay: 0.7 },
                  { icon: Rocket, position: "-top-2 right-8", delay: 1.2 },
                ],
                [
                  { icon: TrendingUp, position: "top-8 -right-2", delay: 0.3 },
                  { icon: Heart, position: "bottom-12 left-2", delay: 0.8 },
                  { icon: Globe, position: "top-0 left-8", delay: 1.3 },
                ],
                [
                  { icon: Award, position: "-top-2 left-4", delay: 0.1 },
                  { icon: Sparkles, position: "bottom-4 -right-2", delay: 0.6 },
                  { icon: Star, position: "top-16 right-0", delay: 1.1 },
                ],
                [
                  { icon: Zap, position: "top-2 right-0", delay: 0.4 },
                  { icon: Brain, position: "bottom-8 left-4", delay: 0.9 },
                  { icon: Target, position: "-top-4 left-12", delay: 1.4 },
                ],
                [
                  { icon: Rocket, position: "top-4 -left-2", delay: 0.15 },
                  { icon: Globe, position: "bottom-0 right-4", delay: 0.65 },
                  { icon: Heart, position: "top-12 right-2", delay: 1.15 },
                ],
              ];

              const icons = floatingIcons[index % floatingIcons.length];

              return (
                <motion.div key={index} variants={fadeInUp} className="group">
                  <div className="relative flex flex-col items-center py-8 px-4">
                    {/* Floating Icons */}
                    {icons.map((iconData, i) => {
                      const IconComponent = iconData.icon;
                      return (
                        <motion.div
                          key={i}
                          className={`absolute ${iconData.position} z-10`}
                          animate={{
                            y: [0, -8, 0],
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 3,
                            delay: iconData.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <div className="p-2 rounded-full bg-gradient-to-br from-[#1890FF]/20 to-[#99E7F1]/20 backdrop-blur-sm border border-[#1890FF]/20">
                            <IconComponent className="w-4 h-4 text-[#1890FF]" />
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* Circular Image Container */}
                    <div className="relative mb-6">
                      {/* Animated ring */}
                      <motion.div
                        className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#1890FF] via-[#99E7F1] to-[#1890FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{ padding: "3px" }}
                      />

                      {/* Static border ring */}
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#1890FF]/30 to-[#99E7F1]/30 group-hover:from-[#1890FF]/50 group-hover:to-[#99E7F1]/50 transition-all duration-300" />

                      {/* Image */}
                      <motion.div
                        className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1890FF]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                          <p className="text-white text-xs text-center px-2 font-medium">
                            {member.bio}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Name and Role */}
                    <motion.div className="text-center" whileHover={{ y: -2 }}>
                      <h3 className="text-lg font-bold text-[#3D3D3D] mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[#1890FF] text-sm font-medium">
                        {member.role}
                      </p>
                    </motion.div>

                    {/* Decorative dots */}
                    <div className="flex gap-1 mt-4">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[#1890FF]/40"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.2,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Join Team CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <p className="text-[#666666] mb-4">Want to join our team?</p>
            <MagneticButton>
              <Button
                variant="outline"
                className="border-[#1890FF] text-[#1890FF] hover:bg-[#1890FF]/10"
              >
                View Open Positions
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* AI App Showcase Section */}
      <section
        id="ai-app"
        className="relative py-24 bg-[#EEEEEE] overflow-hidden"
      >
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-6 text-3xl font-bold md:text-4xl text-[#3D3D3D]">
                Enterprise-Grade
                <br />
                <span className="text-[#1890FF]">AI Control Center</span>
              </h2>
              <p className="mb-8 text-lg text-[#666666]">
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
                    className="flex items-center gap-3"
                    whileHover={{ x: 10 }}
                  >
                    <motion.div
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1890FF]"
                      whileHover={{ scale: 1.2 }}
                    >
                      <Check className="h-4 w-4 text-white" />
                    </motion.div>
                    <span className="text-[#3D3D3D]">{item}</span>
                  </motion.div>
                ))}
              </motion.div>

              <MagneticButton>
                <Link href="/login" className="mt-8 inline-block">
                  <Button className="bg-[#FF6B00] hover:bg-[#E55F00] shadow-lg shadow-[#FF6B00]/25">
                    Get Started
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <AnimatedGradientBorder>
                <div className="p-1">
                  <div className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-white shadow-2xl">
                    {/* Mock Dashboard */}
                    <div className="border-b border-[#EEEEEE] bg-white px-4 py-3">
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="h-3 w-3 rounded-full bg-[#FF4D4F]"
                          whileHover={{ scale: 1.3 }}
                        />
                        <motion.div
                          className="h-3 w-3 rounded-full bg-[#FAAD14]"
                          whileHover={{ scale: 1.3 }}
                        />
                        <motion.div
                          className="h-3 w-3 rounded-full bg-[#52C41A]"
                          whileHover={{ scale: 1.3 }}
                        />
                        <span className="ml-4 text-sm text-[#666666]">
                          mozenith.app/dashboard
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex gap-4">
                        {/* Sidebar mock */}
                        <div className="w-48 space-y-3">
                          {[1, 2, 3, 4].map((i) => (
                            <motion.div
                              key={i}
                              className={`h-8 w-full rounded-lg ${i === 2 ? "bg-[#99E7F1]/50" : "bg-[#EEEEEE]"}`}
                              whileHover={{
                                scale: 1.02,
                                backgroundColor: "rgba(153, 231, 241, 0.5)",
                              }}
                            />
                          ))}
                        </div>
                        {/* Content mock */}
                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <motion.div
                              className="rounded-lg bg-[#EEEEEE] p-4"
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="mb-2 h-4 w-16 rounded bg-[#CCCCCC]" />
                              <div className="h-8 w-24 rounded bg-[#99E7F1]" />
                            </motion.div>
                            <motion.div
                              className="rounded-lg bg-[#EEEEEE] p-4"
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="mb-2 h-4 w-16 rounded bg-[#CCCCCC]" />
                              <div className="h-8 w-24 rounded bg-[#1890FF]" />
                            </motion.div>
                          </div>
                          <motion.div
                            className="rounded-lg bg-[#EEEEEE] p-4"
                            whileHover={{ scale: 1.01 }}
                          >
                            <div className="space-y-2">
                              <div className="h-4 w-full rounded bg-[#CCCCCC]" />
                              <div className="h-4 w-3/4 rounded bg-[#CCCCCC]" />
                              <div className="h-4 w-1/2 rounded bg-[#CCCCCC]" />
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedGradientBorder>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-[#3D3D3D]">
              Security-First Architecture
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#666666]">
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
                items: [
                  "Complete activity logging",
                  "Session tracking",
                  "User action history",
                  "Export capabilities",
                ],
              },
            ].map((column, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <GlowingCard className="h-full">
                  <div className="rounded-2xl border border-[#EEEEEE] bg-white p-6 hover:shadow-xl transition-all h-full">
                    <motion.div
                      className="mb-4 inline-flex rounded-xl bg-[#99E7F1]/30 p-3"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <column.icon className="h-6 w-6 text-[#1890FF]" />
                    </motion.div>
                    <h3 className="mb-4 text-xl font-semibold text-[#3D3D3D]">
                      {column.title}
                    </h3>
                    <ul className="space-y-3">
                      {column.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          className="flex items-center gap-2 text-[#666666]"
                          whileHover={{ x: 5 }}
                        >
                          <Check className="h-4 w-4 text-[#52C41A]" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </GlowingCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#EEEEEE] overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-[#1890FF]/20 bg-gradient-to-br from-[#1890FF] to-[#0054C5] p-12"
          >
            <motion.div
              className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/20 blur-3xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/20 blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            {/* Floating Icons */}
            <motion.div
              className="absolute top-8 left-8 p-3 rounded-full bg-white/10"
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="h-6 w-6 text-white" />
            </motion.div>
            <motion.div
              className="absolute bottom-8 right-8 p-3 rounded-full bg-white/10"
              animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Rocket className="h-6 w-6 text-white" />
            </motion.div>

            <div className="relative">
              <motion.div
                className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm text-white mb-6"
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
                className="mb-4 text-3xl font-bold md:text-4xl text-white"
              >
                Ready to Take Control?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-8 text-lg text-white/80 max-w-xl mx-auto"
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
                <MagneticButton>
                  <Link href="/login">
                    <Button
                      size="lg"
                      className="bg-[#FF6B00] px-8 hover:bg-[#E55F00] shadow-xl shadow-black/20"
                    >
                      Start Free Trial
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                </MagneticButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#1890FF]/30 px-8 text-[#1890FF] hover:bg-[#1890FF] hover:text-white hover:border-[#1890FF]"
                >
                  Schedule Demo
                </Button>
              </motion.div>
              <motion.p
                className="mt-6 text-white/60 text-sm"
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
      <section className="py-16 bg-white border-b border-[#EEEEEE]">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-[#3D3D3D] mb-2">
                Stay Updated
              </h3>
              <p className="text-[#666666]">
                Get the latest news, updates, and AI insights delivered to your
                inbox.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl border border-[#EEEEEE] focus:border-[#1890FF] focus:outline-none focus:ring-2 focus:ring-[#1890FF]/20 transition-all"
              />
              <Button className="bg-[#1890FF] hover:bg-[#0054C5] px-6">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#0f172a]">
        <div className="mx-auto max-w-7xl px-6">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <motion.div
                className="flex items-center gap-2 mb-4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white overflow-hidden">
                  <img
                    src="/pictures/mozenith.jpg"
                    alt="Mozenith Logo"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-xl font-bold text-white">Mozenith</span>
              </motion.div>
              <p className="text-white/60 mb-6 max-w-sm">
                Enterprise AI Control Platform. Manage, monitor, and secure your
                AI operations with confidence.
              </p>
              <div className="flex gap-4">
                {["twitter", "linkedin", "github", "youtube"].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#1890FF] hover:text-white transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <span className="text-xs font-semibold uppercase">
                      {social[0]}
                    </span>
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
                <h4 className="text-white font-semibold mb-4">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        className="text-white/60 hover:text-white transition-colors text-sm"
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
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-white/40">
                © 2026 Mozenith. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                  "Security",
                ].map((item) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="hover:text-white transition-colors"
                    whileHover={{ y: -1 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <div className="w-2 h-2 rounded-full bg-[#52C41A]" />
                All systems operational
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
