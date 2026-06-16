import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { Container, SubHeading, Paragraph, PrimaryButton, SecondaryButton } from "../ui";
import { HeroSlide } from "./section-data";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  primaryLink?: string;
  primaryText?: string;
  secondaryLink?: string;
  secondaryText?: string;
  slides?: HeroSlide[];
  className?: string;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  image,
  primaryLink = "/collections",
  primaryText = "Explore Collection",
  secondaryLink = "/bespoke-services",
  secondaryText = "Bespoke Consultation",
  slides,
  className,
}: HeroSectionProps) {
  
  // Custom spring arrows for luxury visual buttons
  const ArrowRight = () => (
    <svg className="w-3.5 h-3.5 transition-transform duration-300" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 8h14M10 3l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // Set up active slides list, supporting single slide props as fallback
  const activeSlides = slides && slides.length > 0 
    ? slides 
    : [{
        id: "hero-legacy",
        title: title || "",
        subtitle: subtitle || "",
        description: description || "",
        image: image || "",
        primaryLink,
        primaryText,
        secondaryLink,
        secondaryText,
      }];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance logic (interval of 6 seconds, resets on index change)
  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, activeSlides.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Framer Motion reveal variants for typography lines
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1], // Cubic bezier curve for smooth deceleration
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.25,
      }
    }
  };

  const currentSlide = activeSlides[currentIndex];
  const pLink = currentSlide.primaryLink || "/collections";
  const sLink = currentSlide.secondaryLink || "/bespoke-services";

  return (
    <section className={cn("relative bg-[#FDFCF7] overflow-hidden", className)}>
      <Container variant="wide" className="pt-32 pb-24 md:pt-40 md:pb-32 lg:min-h-[85vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center w-full">
          
          {/* Left Text Block */}
          <div className="lg:col-span-5 min-h-[380px] md:min-h-[400px] lg:min-h-[450px] flex flex-col justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8 flex flex-col justify-center w-full"
              >
                <div className="space-y-4">
                  <motion.div variants={itemVariants}>
                    <SubHeading variant="caps" size="sm" className="text-[#8C8273]">
                      {currentSlide.subtitle}
                    </SubHeading>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    {/* Render line breaks correctly for raw typography styling */}
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-[1.12] tracking-wide text-balance">
                      {currentSlide.title.split("\n").map((line, idx) => (
                        <React.Fragment key={idx}>
                          {line}
                          {idx < currentSlide.title.split("\n").length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </h1>
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <Paragraph variant="md" className="text-[#6E6B64] font-light max-w-md leading-relaxed">
                    {currentSlide.description}
                  </Paragraph>
                </motion.div>

                {/* CTAs */}
                <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
                  <PrimaryButton
                    as={pLink.startsWith("/") ? Link : "a"}
                    {...(pLink.startsWith("/") ? { to: pLink } : { href: pLink })}
                    size="md"
                    shape="square"
                    rightIcon={<ArrowRight />}
                  >
                    {currentSlide.primaryText || "Explore Collection"}
                  </PrimaryButton>
                  
                  {currentSlide.secondaryText && (
                    <SecondaryButton
                      as={sLink.startsWith("/") ? Link : "a"}
                      {...(sLink.startsWith("/") ? { to: sLink } : { href: sLink })}
                      size="md"
                      shape="square"
                    >
                      {currentSlide.secondaryText}
                    </SecondaryButton>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Cinematic Image Block */}
          <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-[1.4] overflow-hidden bg-[#F5F2EA] group rounded-sm shadow-sm">
            {/* Soft shadow depth cover overlay */}
            <div className="absolute inset-0 bg-[#1A1A1A]/[0.03] z-10 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={currentSlide.image}
                alt={currentSlide.title}
                className="absolute inset-0 w-full h-full object-cover object-center select-none"
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{
                  duration: 1.0,
                  ease: [0.25, 1, 0.5, 1], // Slow ease out
                }}
              />
            </AnimatePresence>

            {/* Slider Navigation Controls */}
            {activeSlides.length > 1 && (
              <>
                {/* Arrow Left */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/90 hover:bg-white text-[#1A1A1A] backdrop-blur-md rounded-full shadow-md border border-[#EAE5D9] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
                  aria-label="Previous Slide"
                >
                  <svg className="w-4 h-4 rotate-180" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 8h14M10 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {/* Arrow Right */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/90 hover:bg-white text-[#1A1A1A] backdrop-blur-md rounded-full shadow-md border border-[#EAE5D9] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
                  aria-label="Next Slide"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 8h14M10 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                {/* Dots indicators inside image container */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2.5 bg-black/20 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
                  {activeSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className={cn(
                        "w-1.5 h-1.5 rounded-full transition-all duration-300",
                        idx === currentIndex
                          ? "bg-white w-4.5"
                          : "bg-white/40 hover:bg-white/70"
                      )}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </Container>
    </section>
  );
}
export type { HeroSectionProps };

