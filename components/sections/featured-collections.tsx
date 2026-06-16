import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { FeaturedCollection } from "./section-data";
import { Container, Heading, SubHeading, Paragraph } from "../ui";
import TextButton from "../ui/TextButton";

interface FeaturedCollectionsProps {
  collections: FeaturedCollection[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function FeaturedCollections({
  collections,
  title = "Design Directions",
  subtitle = "Featured Collections",
  className,
}: FeaturedCollectionsProps) {
  
  // Custom spring arrow for luxury catalog buttons
  const ArrowRight = () => (
    <svg className="w-3.5 h-3.5 transition-transform duration-300" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 8h14M10 3l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <section className={cn("py-32 md:py-40 bg-[#FDFCF7] border-t border-[#F2EDE2]", className)}>
      <Container variant="default" className="space-y-28 md:space-y-40">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <SubHeading variant="caps" size="sm" className="text-[#8C8273]">
            {subtitle}
          </SubHeading>
          <Heading variant="display" weight="light" className="text-[#1A1A1A]">
            {title}
          </Heading>
          <div className="w-12 h-[1px] bg-[#8C8273]/40 mx-auto pt-1" />
        </div>

        {/* Collections Stack */}
        <div className="space-y-36 md:space-y-48">
          {collections.map((collection, index) => {
            const isEven = index % 2 === 0;

            // Varying layout widths: 8+4 or 7+5
            const imageColSpan = isEven ? "lg:col-span-8" : "lg:col-span-7";
            const textColSpan = isEven ? "lg:col-span-4 lg:pl-12" : "lg:col-span-5 lg:pr-16";

            return (
              <div
                key={collection.id}
                className={cn(
                  "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
                )}
              >
                {/* Immersive Image Frame */}
                <motion.div
                  className={cn(
                    "relative aspect-[4/3] lg:aspect-[1.5] overflow-hidden bg-[#F5F2EA] rounded-none group border border-[#F2EDE2]",
                    isEven ? "lg:order-1" : "lg:order-2",
                    imageColSpan
                  )}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.4, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  {/* Fine dust/grain style shadow cover */}
                  <div className="absolute inset-0 bg-[#0F0E0D]/[0.02] z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Subtle pan and scale on image hover */}
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className={cn(
                      "w-full h-full object-cover object-center select-none transition-all duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)]",
                      isEven ? "group-hover:scale-103 group-hover:translate-x-1.5" : "group-hover:scale-103 group-hover:-translate-x-1.5"
                    )}
                  />
                </motion.div>

                {/* Narrative Text Block */}
                <motion.div
                  className={cn(
                    "space-y-6 md:space-y-8",
                    isEven ? "lg:order-2" : "lg:order-1",
                    textColSpan
                  )}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1], delay: 0.15 }}
                >
                  <div className="space-y-3">
                    <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#8C8273] font-light block select-none">
                      {collection.meta}
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1A1A1A] leading-tight tracking-wide">
                      {collection.title}
                    </h3>
                    <p className="font-sans italic text-xs text-[#8C8273] font-light">
                      {collection.subtitle}
                    </p>
                  </div>

                  <Paragraph variant="md" className="text-[#6E6B64] font-light leading-relaxed text-justify text-pretty">
                    {collection.description}
                  </Paragraph>

                  <div className="pt-2">
                    <TextButton
                      as={Link}
                      to={collection.href}
                      size="md"
                      rightIcon={<ArrowRight />}
                    >
                      {collection.linkText}
                    </TextButton>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
export type { FeaturedCollectionsProps };
