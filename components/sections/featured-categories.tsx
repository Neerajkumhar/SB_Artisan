import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { CategoryCard } from "./section-data";
import { Container, SectionTitle } from "../ui";

const MotionLink = motion(Link);

interface FeaturedCategoriesProps {
  categories: CategoryCard[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function FeaturedCategories({
  categories,
  title = "Curated Spaces",
  subtitle = "Showroom Spheres",
  className,
}: FeaturedCategoriesProps) {
  
  // Asymmetrical column widths for a premium print editorial grid
  const getColSpan = (index: number) => {
    // 8+4, 4+8, 6+6 grid layout rhythm
    const patterns = [
      "lg:col-span-8 md:col-span-12", // 1
      "lg:col-span-4 md:col-span-6",  // 2
      "lg:col-span-4 md:col-span-6",  // 3
      "lg:col-span-8 md:col-span-12", // 4
      "lg:col-span-6 md:col-span-6",  // 5
      "lg:col-span-6 md:col-span-6",  // 6
    ];
    return patterns[index % patterns.length];
  };

  // Distinct aspect ratios for asymmetrical sizing
  const getAspectClass = (index: number) => {
    // Large spans use wider aspect ratios, smaller spans use taller portrait layouts
    const layouts = [
      "aspect-[4/3] lg:aspect-[1.6]",  // Col 8 (Wide)
      "aspect-[4/3] lg:aspect-[0.8]",  // Col 4 (Portrait)
      "aspect-[4/3] lg:aspect-[0.8]",  // Col 4 (Portrait)
      "aspect-[4/3] lg:aspect-[1.6]",  // Col 8 (Wide)
      "aspect-[4/3] lg:aspect-[1.2]",  // Col 6 (Medium)
      "aspect-[4/3] lg:aspect-[1.2]",  // Col 6 (Medium)
    ];
    return layouts[index % layouts.length];
  };

  return (
    <section className={cn("py-32 bg-[#FDFCF7] border-t border-[#F2EDE2]", className)}>
      <Container variant="default" className="space-y-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-[#F2EDE2]">
          <SectionTitle
            eyebrow={subtitle}
            title={title}
            description="Explore seasoned teak, woven cane, and bone inlay furniture systems tailored for high-end boutique hospitality spaces."
            spacing="compact"
            titleProps={{ variant: "xl", weight: "light" }}
            descriptionProps={{ variant: "sm" }}
            className="md:max-w-2xl"
          />
          <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#8C8273] font-light md:mb-1 select-none hidden md:inline-block">
            Showroom Showcase 2026
          </span>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {categories.slice(0, 6).map((category, index) => (
            <MotionLink
              key={category.id}
              to={category.href}
              className={cn(
                "group relative block overflow-hidden bg-[#F5F2EA] rounded-none border border-[#F2EDE2]/60 focus:outline-none focus:ring-1 focus:ring-[#8C8273] transition-all duration-300",
                getColSpan(index)
              )}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1], delay: (index % 3) * 0.1 }}
            >
              {/* Outer Sizing Wrapper with Dynamic Aspect Ratios */}
              <div className={cn("w-full overflow-hidden relative", getAspectClass(index))}>
                
                {/* Visual Imagery */}
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover object-center select-none transition-transform duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                />

                {/* Earthy Dark/Warm Overlay mask (luxury gradient) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0D]/95 via-[#0F0E0D]/40 to-[#0F0E0D]/10 group-hover:from-[#0F0E0D]/98 group-hover:via-[#0F0E0D]/55 group-hover:to-[#0F0E0D]/20 transition-all duration-700 ease-in-out z-10" />

                {/* Typography Container */}
                <div className="absolute inset-0 z-20 p-8 md:p-10 flex flex-col justify-between text-[#EAE5D9]">
                  
                  {/* Category Meta Eyebrow (Contrast Sand Accent) */}
                  <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-light text-[#A3927B] opacity-90 group-hover:text-[#CBB593] transition-colors duration-500">
                    {category.meta}
                  </span>

                  {/* Body Content & CTA block */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl md:text-3xl font-light text-white tracking-wide leading-tight">
                      {category.title}
                    </h3>
                    
                    {/* Handcrafted Description - slides up and fades in on hover */}
                    <p className="font-sans text-[11px] md:text-xs text-[#8C8273] font-light leading-relaxed max-w-md opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto overflow-hidden transform translate-y-3 group-hover:translate-y-0 transition-all duration-500 ease-out select-none">
                      {category.description}
                    </p>

                    {/* Elegant CTA link with vector spring arrow */}
                    <div className="flex items-center gap-2 pt-2 text-[10px] tracking-[0.22em] uppercase font-sans font-light text-white group-hover:text-[#CBB593] transition-all duration-300">
                      <span>{category.ctaText}</span>
                      <svg 
                        className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out" 
                        viewBox="0 0 16 16" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M1 8h14M10 3l5 5-5 5" 
                          stroke="currentColor" 
                          strokeWidth="1.25" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                </div>
              </div>
            </MotionLink>
          ))}
        </div>

      </Container>
    </section>
  );
}
export type { FeaturedCategoriesProps };
