import React from "react";
import { motion } from "framer-motion";
import { Container, Heading, SubHeading, Paragraph } from "../ui";

interface AdvantageItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

export default function WhyArtisan() {
  const advantages: AdvantageItem[] = [
    {
      id: "manufacturer",
      num: "01",
      title: "Direct Manufacturer",
      subtitle: "Direct From Jodhpur",
      description: "Fabricated entirely inside our Jodhpur manufacturing workshops. No middle agencies, brokers, or outsourced markups.",
      icon: (
        <svg className="w-5 h-5 text-[#8C8273]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: "quality",
      num: "02",
      title: "Export Quality Production",
      subtitle: "Globally Certified Specs",
      description: "Seasoned, kiln-dried hardwoods moisture-tested to withstand global climates. Secured in heavy crated export packaging.",
      icon: (
        <svg className="w-5 h-5 text-[#8C8273]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: "custom",
      num: "03",
      title: "Custom Furniture Development",
      subtitle: "Tailored to Spec Sheets",
      description: "Fully customizable dimensions, wood species, and finishes. We adapt dimensions to your exact architectural CAD layout specifications.",
      icon: (
        <svg className="w-5 h-5 text-[#8C8273]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      id: "craftsmanship",
      num: "04",
      title: "Skilled Artisan Craftsmanship",
      subtitle: "Rajasthani Heritage Guilds",
      description: "Carved and hand-tensioned by master woodworkers using traditional haveli woodcarving, joinery, and detailed inlay crafts.",
      icon: (
        <svg className="w-5 h-5 text-[#8C8273]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      id: "bulk",
      num: "05",
      title: "Bulk Order Capability",
      subtitle: "Hospitality Volume Scaling",
      description: "Our high-capacity production facilities cater to contract projects, delivering consistent luxury specs for complete resort and hotel lots.",
      icon: (
        <svg className="w-5 h-5 text-[#8C8273]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      id: "shipping",
      num: "06",
      title: "Worldwide Shipping",
      subtitle: "Full-Container Sea Logistics",
      description: "Seamless door-to-port logistics. Complete export certification, customs broker support, and global shipping container loading.",
      icon: (
        <svg className="w-5 h-5 text-[#8C8273]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2m-4-3h1.872c.5 0 .965.263 1.214.702l1.108 1.94a2 2 0 01.253.962V18a2 2 0 01-2 2h-15a2 2 0 01-2-2V8a2 2 0 012-2h3" />
        </svg>
      ),
    },
    {
      id: "sustainable",
      num: "07",
      title: "Sustainable Materials",
      subtitle: "Ethically Harvested Woods",
      description: "Utilizing sustainably grown plantation teakwood, mango wood, and natural cane. Finished with organic beeswax seals.",
      icon: (
        <svg className="w-5 h-5 text-[#8C8273]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      id: "pricing",
      num: "08",
      title: "Competitive Factory Pricing",
      subtitle: "Direct Tiered Trade Rates",
      description: "Bypass dealer margins. Substantial cost savings structured directly for commercial trade buyers, developers, and architects.",
      icon: (
        <svg className="w-5 h-5 text-[#8C8273]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1M10 12h4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FDFCF7] border-t border-[#F2EDE2]">
      <Container variant="default">
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto space-y-6 mb-20">
          <SubHeading variant="caps" size="sm" className="text-[#8C8273]">
            Trade Partnership Advantages
          </SubHeading>
          <Heading variant="display" weight="light" className="text-[#1A1A1A]">
            Why Partner with SB Artisan
          </Heading>
          <div className="w-12 h-[1px] bg-[#8C8273]/30 mx-auto" />
          <Paragraph variant="md" className="text-[#6E6B64] font-light leading-relaxed">
            From our dedicated production units in Jodhpur directly to your development site, we engineer premium furniture solutions to full export-ready standards.
          </Paragraph>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#F2EDE2]">
          {advantages.map((adv, idx) => (
            <motion.div
              key={adv.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.25, 1, 0.5, 1] }}
              className="p-8 border-r border-b border-[#F2EDE2] bg-[#FDFCF7] hover:bg-[#FAF8F2] transition-colors duration-500 flex flex-col justify-between group min-h-[300px]"
            >
              <div className="space-y-6">
                {/* Header Row: Icon + Number */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#FAF8F2] border border-[#F2EDE2] rounded-sm group-hover:border-[#8C8273]/30 group-hover:bg-[#F5F2EA] transition-all duration-500">
                    {adv.icon}
                  </div>
                  <span className="font-serif text-2xl font-light text-[#8C8273]/20 group-hover:text-[#8C8273]/40 transition-colors duration-500 select-none">
                    {adv.num}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                    {adv.title}
                  </h3>
                  <span className="block font-sans text-[10px] uppercase tracking-[0.15em] text-[#8C8273] font-light">
                    {adv.subtitle}
                  </span>
                </div>
              </div>

              {/* Description (Anchored to bottom) */}
              <p className="font-sans text-xs text-[#6E6B64] font-light leading-relaxed pt-6">
                {adv.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
