import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { BlogArticle } from "./section-data";
import { Container, SectionTitle } from "../ui";
import TextButton from "../ui/TextButton";

import { Link } from "react-router-dom";

interface BlogPreviewProps {
  articles: BlogArticle[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function BlogPreview({
  articles,
  title = "Atelier Chronicles",
  subtitle = "Journal & Readings",
  className,
}: BlogPreviewProps) {
  
  // Custom spring arrow for reading actions
  const ArrowRight = () => (
    <svg className="w-3 h-3 transition-transform duration-300" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 8h14M10 3l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <section className={cn("py-28 bg-[#FDFCF7] border-t border-[#F2EDE2]", className)}>
      <Container variant="default" className="space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-4 border-b border-[#F2EDE2]">
          <SectionTitle
            eyebrow={subtitle}
            title={title}
            description="Essays on spatial geometry, material integrity, and legacy curation."
            spacing="compact"
            titleProps={{ variant: "xl", weight: "light" }}
            descriptionProps={{ variant: "sm" }}
            className="md:max-w-xl"
          />
          
          <div className="shrink-0 pt-2">
            <TextButton
              as={Link}
              to="/journal"
              size="sm"
              rightIcon={<ArrowRight />}
            >
              View Journal
            </TextButton>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-12">
          {articles.map((article) => (
            <motion.article
              key={article.id}
              className="group space-y-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            >
              {/* Image Container */}
              <div className="aspect-[3/2] w-full overflow-hidden bg-[#F5F2EA] relative">
                <div className="absolute inset-0 bg-black/[0.02] z-10 pointer-events-none" />
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover object-center transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-104"
                  loading="lazy"
                />
              </div>

              {/* Text Meta Container */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.2em] font-sans text-[#8C8273]">
                  <span>{article.category}</span>
                  <span>{article.readTime}</span>
                </div>
                
                <h3 className="font-serif text-lg font-light text-[#1A1A1A] leading-snug group-hover:text-[#8C8273] transition-colors duration-300 text-pretty">
                  <Link to={article.href}>{article.title}</Link>
                </h3>
                
                <div className="flex justify-between items-center text-[10px] font-sans text-[#9E9B95] font-light pt-2">
                  <span>By {article.author}</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </Container>
    </section>
  );
}
export type { BlogPreviewProps };
