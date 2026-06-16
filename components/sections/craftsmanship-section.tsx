import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Container, Heading, SubHeading, Paragraph } from "../ui";
import TextButton from "../ui/TextButton";

import { Link } from "react-router-dom";

interface CraftsmanshipSectionProps {
  title?: string;
  subtitle?: string;
  image?: string;
  className?: string;
}

export default function CraftsmanshipSection({
  title = "Export-Grade Craftsmanship, Built to Last.",
  subtitle = "Authentic Craft Provenance",
  image = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=90",
  className,
}: CraftsmanshipSectionProps) {
  
  // Custom spring arrow for redirect button
  const ArrowRight = () => (
    <svg className="w-3.5 h-3.5 transition-transform duration-300" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 8h14M10 3l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <section className={cn("py-32 bg-[#FDFCF7] border-t border-[#F2EDE2]", className)}>
      <Container variant="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Visual Storytelling */}
          <motion.div
            className="lg:col-span-6 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-[1.1] overflow-hidden bg-[#F5F2EA] group">
              {/* Soft overlay */}
              <div className="absolute inset-0 bg-black/[0.02] z-10 pointer-events-none" />
              
              <motion.img
                src={image}
                alt="Artisan hand-planing solid oak timber slab in showroom workshop"
                className="w-full h-full object-cover object-center"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
              />
            </div>
            
            {/* Elegant caption caption details */}
            <div className="flex justify-between items-baseline text-[10px] uppercase tracking-[0.2em] font-sans text-[#8C8273]">
              <span>Plate 04 / Jodhpur Workshop</span>
              <span>Teakwood Joint Dressing</span>
            </div>
          </motion.div>

          {/* Right Column: Narrative */}
          <motion.div
            className="lg:col-span-6 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          >
            <div className="space-y-4">
              <SubHeading variant="caps" size="sm" className="text-[#8C8273]">
                {subtitle}
              </SubHeading>
              
              <Heading variant="display" weight="light" className="text-[#1A1A1A]">
                {title}
              </Heading>
            </div>

            <div className="space-y-6 text-[#6E6B64] font-light text-xs md:text-sm leading-relaxed text-justify">
              <Paragraph variant="md">
                Every lounge frame, inlay table, and solid teak seat is built inside our Jodhpur workshops. By utilizing age-old Indian joinery (like blind mortise-and-tenon joints) and natural cane weaves, we ensure contract-grade structural stability without relying on temporary modern glues or synthetic fasteners.
              </Paragraph>
              <Paragraph variant="md">
                We believe that furniture should carry stories forward. By finishing each surface in organic beeswax seals and custom-blended natural oils, our woods do not decay — they weather elegantly over decades, carrying the patina of generations.
              </Paragraph>
            </div>

            {/* List of craftsmanship highlights */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-b border-[#F2EDE2] py-8 my-4">
              <div className="space-y-1">
                <span className="block text-[10px] tracking-[0.2em] uppercase font-sans text-[#1A1A1A] font-medium">
                  Sustainably Sourced
                </span>
                <span className="block text-xs font-sans text-[#8C8273] font-light">
                  Certified Indian Hardwoods
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] tracking-[0.2em] uppercase font-sans text-[#1A1A1A] font-medium">
                  Hand-Milled Slabs
                </span>
                <span className="block text-xs font-sans text-[#8C8273] font-light">
                  Individually numbered details
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] tracking-[0.2em] uppercase font-sans text-[#1A1A1A] font-medium">
                  Beeswax Sealing
                </span>
                <span className="block text-xs font-sans text-[#8C8273] font-light">
                  Zero chemical gloss finishes
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] tracking-[0.2em] uppercase font-sans text-[#1A1A1A] font-medium">
                  Export Shipping
                </span>
                <span className="block text-xs font-sans text-[#8C8273] font-light">
                  Export-Grade Sea/Air Freight
                </span>
              </div>
            </div>

            <div className="pt-2">
              <TextButton
                as={Link}
                to="/our-story"
                size="md"
                rightIcon={<ArrowRight />}
              >
                Discover Our Heritage
              </TextButton>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
export type { CraftsmanshipSectionProps };
