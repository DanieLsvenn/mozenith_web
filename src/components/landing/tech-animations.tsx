"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { animate, stagger } from "animejs";

// Neural Network Background with connecting nodes
export function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }[] = [];
    const nodeCount = 80;
    const connectionDistance = 150;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99, 179, 237, 0.6)";
        ctx.fill();

        // Draw connections
        nodes.slice(i + 1).forEach((otherNode) => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            const opacity = (1 - distance / connectionDistance) * 0.3;
            ctx.strokeStyle = `rgba(99, 179, 237, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
}

// Glitch Text Effect
export function GlitchText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <span
            className="absolute inset-0 text-[#99E7F1]"
            style={{
              transform: "translate(-2px, -1px)",
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
              opacity: 0.8,
            }}
          >
            {text}
          </span>
          <span
            className="absolute inset-0 text-[#FF6B00]"
            style={{
              transform: "translate(2px, 1px)",
              clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
              opacity: 0.8,
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}

// 3D Tilt Card with anime.js
export function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    animate(cardRef.current, {
      rotateX: -rotateX,
      rotateY: rotateY,
      duration: 400,
      easing: "easeOutExpo",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    animate(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 800,
      easing: "easeOutElastic(1, .5)",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transform-gpu ${className}`}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      {children}
    </div>
  );
}

// Animated Grid Lines Background
export function GridLinesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Vertical scanning line */}
      <motion.div
        className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-[#99E7F1] to-transparent"
        animate={{
          x: [0, typeof window !== "undefined" ? window.innerWidth : 1920, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 0.4 }}
      />
      {/* Horizontal scanning line */}
      <motion.div
        className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-[#0054C5] to-transparent"
        animate={{
          y: [0, typeof window !== "undefined" ? window.innerHeight : 1080, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 0.3 }}
      />
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 179, 237, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 179, 237, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

// Magnetic Cursor Effect
export function MagneticCursor({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = (e.clientX - centerX) * 0.3;
      const distanceY = (e.clientY - centerY) * 0.3;
      x.set(distanceX);
      y.set(distanceY);
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

// Animated Number Counter with anime.js
export function AnimatedCounter({
  target,
  duration = 2000,
  suffix = "",
  prefix = "",
}: {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const formatValue = (v: number) =>
      target % 1 === 0 ? Math.floor(v).toLocaleString() : v.toFixed(1);

    // Set initial value immediately so it's never stuck at 0
    if (countRef.current) {
      countRef.current.textContent = `${prefix}${formatValue(target)}${suffix}`;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const obj = { value: 0 };
            animate(obj, {
              value: target,
              duration,
              easing: "easeOutExpo",
              round: target % 1 === 0 ? 1 : 10,
              update: () => {
                if (countRef.current) {
                  countRef.current.textContent = `${prefix}${formatValue(obj.value)}${suffix}`;
                }
              },
            });
          }
        });
      },
      { threshold: 0.3 },
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration, suffix, prefix]);

  const initialDisplay =
    target % 1 === 0 ? Math.floor(target).toLocaleString() : target.toFixed(1);

  return (
    <span ref={countRef} className="tabular-nums">
      {prefix}
      {initialDisplay}
      {suffix}
    </span>
  );
}

// Floating Orbs Background
export function FloatingOrbs() {
  const orbs = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        size: 200 + Math.random() * 300,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color:
          i % 3 === 0
            ? "rgba(153, 231, 241, 0.15)"
            : i % 3 === 1
              ? "rgba(0, 84, 197, 0.1)"
              : "rgba(255, 107, 0, 0.08)",
        duration: 15 + Math.random() * 10,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            backgroundColor: orb.color,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Text Reveal Animation
export function TextReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll(".char");

    animate(chars, {
      translateY: [40, 0],
      opacity: [0, 1],
      rotateX: [-90, 0],
      duration: 800,
      delay: stagger(30, { start: delay }),
      easing: "easeOutExpo",
    });
  }, [delay]);

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block"
          style={{
            opacity: 0,
            transformStyle: "preserve-3d",
            transformOrigin: "center bottom",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

// Hover Card with Spotlight Effect
export function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 179, 237, 0.15), transparent 40%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
      {/* Border glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 179, 237, 0.4), transparent 40%)`,
          opacity: isHovered ? 1 : 0,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      {children}
    </motion.div>
  );
}

// Typewriter Effect with Cursor
export function TypewriterEffect({
  words,
  className = "",
}: {
  words: string[];
  className?: string;
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < word.length) {
            setCurrentText(word.substring(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(word.substring(0, currentText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        className="inline-block w-[3px] h-[1em] bg-[#99E7F1] ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      />
    </span>
  );
}

// Staggered Grid Animation
export function StaggeredGrid({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.children;

    animate(items, {
      opacity: [0, 1],
      translateY: [60, 0],
      scale: [0.9, 1],
      duration: 800,
      delay: stagger(100, { grid: [4, 4], from: "center" }),
      easing: "easeOutExpo",
    });
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

// Morphing Background Shapes
export function MorphingShapes() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const paths = [
      "M100,50 C100,50 150,0 200,50 C250,100 200,150 200,150 C200,150 150,200 100,150 C50,100 50,50 100,50",
      "M100,20 C150,20 180,50 180,100 C180,150 150,180 100,180 C50,180 20,150 20,100 C20,50 50,20 100,20",
      "M150,50 C200,50 220,100 200,150 C180,200 120,200 80,150 C40,100 80,50 150,50",
    ];

    if (pathRef.current) {
      animate(pathRef.current, {
        d: paths,
        duration: 10000,
        easing: "easeInOutQuad",
        loop: true,
        direction: "alternate",
      });
    }
  }, []);

  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute w-96 h-96 opacity-20"
      style={{ filter: "blur(40px)" }}
    >
      <path
        ref={pathRef}
        fill="url(#gradient)"
        d="M100,50 C100,50 150,0 200,50 C250,100 200,150 200,150 C200,150 150,200 100,150 C50,100 50,50 100,50"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#63b3ed" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Scroll Progress Indicator
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#99E7F1] via-[#0054C5] to-[#FF6B00] z-[100] origin-left"
      style={{ scaleX: progress / 100 }}
    />
  );
}

// Infinite Logo Carousel
export function LogoCarousel({
  logos,
  speed = 30,
}: {
  logos: { name: string; logo: string }[];
  speed?: number;
}) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-16 items-center"
        animate={{ x: [0, -50 * logos.length * 2] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100"
          >
            <img
              src={logo.logo}
              alt={logo.name}
              className="h-10 w-auto object-contain"
            />
          </div>
        ))}
      </motion.div>
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
    </div>
  );
}

// Interactive Feature Cards Carousel
export function FeatureCarousel({
  features,
}: {
  features: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    color: string;
  }[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="relative">
      <div ref={containerRef} className="flex gap-4 overflow-hidden">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={feature.title}
              className={`flex-shrink-0 cursor-pointer transition-all duration-500 ${
                isActive ? "w-80" : "w-20"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <div
                className={`h-64 rounded-2xl p-6 transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-[#99E7F1]/30"
                    : "bg-slate-800/50 border border-slate-700/50"
                }`}
              >
                <div
                  className={`inline-flex p-3 rounded-xl mb-4 ${
                    isActive ? "bg-[#99E7F1]/20" : "bg-slate-700/50"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${isActive ? "text-[#99E7F1]" : "text-slate-400"}`}
                  />
                </div>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-8 bg-[#99E7F1]" : "w-1.5 bg-slate-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
