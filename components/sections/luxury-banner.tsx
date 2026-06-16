import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";
import { Container } from "../ui";

interface LuxuryBannerProps {
  quote?: string;
  author?: string;
  image?: string;
  className?: string;
}

export default function LuxuryBanner({
  quote = "“Simplicity is the ultimate sophistication.”",
  author = "Leonardo da Vinci",
  image = "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1600&q=90",
  className,
}: LuxuryBannerProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Parallax Scroll Effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Translate background slightly slower than scroll to create depth
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative h-[55vh] md:h-[65vh] flex items-center justify-center overflow-hidden bg-black text-[#EAE5D9]",
        className
      )}
    >
      {/* 1. PARALLAX BACKGROUND IMAGE */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center select-none"
        style={{
          y: backgroundY,
          backgroundImage: `url(${image})`,
        }}
      />

      {/* Understated darken overlay for text contrast */}
      <div className="absolute inset-0 bg-[#0F0E0D]/65 z-10 pointer-events-none" />

      {/* 2. TEXT PANEL */}
      <Container variant="narrow" className="relative z-20 text-center space-y-6 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="space-y-4"
        >
          {/* Quote */}
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl font-light italic leading-relaxed text-balance text-white">
            {quote}
          </blockquote>
          
          {/* Divider */}
          <div className="w-12 h-[1px] bg-[#EAE5D9]/30 mx-auto my-6" />

          {/* Author */}
          <cite className="font-sans text-[10px] uppercase tracking-[0.25em] font-light text-[#8C8273] not-italic">
            {author}
          </cite>
        </motion.div>
      </Container>
    </section>
  );
}
export type { LuxuryBannerProps };
