import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container, Heading, SubHeading, Paragraph, SEO } from "../ui";

export default function AboutPage() {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About SB Artisan - Jodhpur Furniture Factory & Exporter",
    "description": "Learn about SB Artisan's solid wood furniture manufacturing heritage in Jodhpur, India. Read about our wood seasoning kilns, hand-carved joinery details, and international B2B export capabilities.",
    "publisher": {
      "@type": "Organization",
      "name": "SB Artisan Jodhpur",
      "logo": "https://www.sbartisan.com/images/commercial_workshop_custom.png"
    }
  };

  return (
    <div className="bg-[#FDFCF7] pt-28 pb-20 selection:bg-[#EAE5D9] text-[#1A1A1A]">
      <SEO 
        title="Jodhpur Furniture Manufacturer Sourcing & Factory Profile"
        description="Explore SB Artisan's Jodhpur furniture manufacturing plant profile. Discover our sustainable wood seasoning practices, generational craftsmanship, and global container logistics capabilities."
        keywords="furniture manufacturer Jodhpur, Indian furniture factory profile, solid wood exporter, custom furniture sourcing India, hotel furniture contractor Jodhpur"
        canonical="/about"
        schema={aboutSchema}
      />

      {/* 1. HERO HEADER */}
      <Container variant="default" className="py-12 border-b border-[#F2EDE2]">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-3xl space-y-4"
        >
          <SubHeading variant="caps" size="sm" className="text-[#8C8273]">
            Trade Profile & Dossier
          </SubHeading>
          <Heading variant="hero" weight="light" className="text-[#1A1A1A] leading-tight">
            Premium Indian Hospitality Furniture Manufacturer & Exporter
          </Heading>
          <Paragraph variant="md" className="text-[#6E6B64] font-light max-w-xl">
            Based in Jodhpur, India, SB Artisan designs and fabricates seasoned <Link to="/category/restaurant-furniture" className="underline hover:text-[#8C6D4F] transition-colors duration-200">teakwood dining tables</Link>, custom <Link to="/category/cane-furniture" className="underline hover:text-[#8C6D4F] transition-colors duration-200">rattan cane lounge chairs</Link>, and royal <Link to="/category/bone-inlay-furniture" className="underline hover:text-[#8C6D4F] transition-colors duration-200">bone inlay cabinets</Link> to international contract standards.
          </Paragraph>
        </motion.div>
      </Container>

      {/* 2. OUR STORY */}
      <section className="py-20 border-b border-[#F2EDE2]/60">
        <Container variant="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#8C8273] font-semibold block">01 / Provenance</span>
              <Heading variant="display" weight="light" className="text-[#1A1A1A]">
                Our Story
              </Heading>
              <div className="w-12 h-[1px] bg-[#8C8273]/30" />
            </div>
            <div className="lg:col-span-7 space-y-6 text-[#6E6B64] font-light text-xs md:text-sm leading-relaxed text-justify">
              <Paragraph variant="md">
                SB Artisan was founded in Jodhpur, Rajasthan, with a mission to bring authentic Indian woodworking techniques to the global hospitality market. Moving away from standard, mass-produced commercial furniture, we established a manufacturing guild that blends generational Rajasthani craftsmanship with modern, high-precision engineering.
              </Paragraph>
              <Paragraph variant="md">
                Today, we operate direct-to-project <Link to="/bespoke" className="underline hover:text-[#8C6D4F] transition-colors duration-200">custom contract manufacturing workshops</Link>, crafting custom installations for boutique hotels, island resorts, and premium fine-dining salons worldwide. By working directly with designers and developers, we bypass middle brokers to offer authentic craft integrity at competitive factory rates.
              </Paragraph>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. WHO WE ARE */}
      <section className="py-20 bg-[#FAF8F2] border-b border-[#F2EDE2]/60">
        <Container variant="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#8C8273] font-semibold block">02 / Identity</span>
              <Heading variant="display" weight="light" className="text-[#1A1A1A]">
                Who We Are
              </Heading>
              <div className="w-12 h-[1px] bg-[#8C8273]/30" />
            </div>
            <div className="lg:col-span-7 space-y-6 text-[#6E6B64] font-light text-xs md:text-sm leading-relaxed text-justify">
              <Paragraph variant="md">
                SB Artisan is a leading Indian supplier and exporter of handcrafted wooden, cane, rope, and bone inlay furniture. Rooted in Jodhpur, the handicraft capital of India, we bridge the gap between regional artisan guilds and international hospitality developments.
              </Paragraph>
              <Paragraph variant="md">
                We partner directly with hotels, resorts, cafés, bars, wholesalers, and commercial interior project developers worldwide. By operating our own wood mills and assembly halls, we ensure strict contract-grade quality specs while maintaining competitive direct-to-factory trade pricing.
              </Paragraph>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. MANUFACTURING EXPERTISE */}
      <section className="py-20 border-b border-[#F2EDE2]/60">
        <Container variant="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#8C8273] font-semibold block">03 / Infrastructure</span>
              <Heading variant="display" weight="light" className="text-[#1A1A1A]">
                Manufacturing Expertise
              </Heading>
              <div className="w-12 h-[1px] bg-[#8C8273]/30" />
            </div>
            <div className="lg:col-span-7 space-y-6 text-[#6E6B64] font-light text-xs md:text-sm leading-relaxed text-justify">
              <Paragraph variant="md">
                Our facilities in Jodhpur combine heavy wood-milling machinery with dedicated seasoning kilns. Solid hardwoods such as plantation teakwood, Indian Rosewood (Sheesham), and sustainable mango wood are processed through precision sawmills to ensure clean geometric frame lines.
              </Paragraph>
              <Paragraph variant="md">
                We maintain massive wood seasoning chambers where logs undergo slow drying, stabilizing the internal moisture level of the timber to international climate targets before it enters fabrication.
              </Paragraph>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. ARTISAN CRAFTSMANSHIP */}
      <section className="py-20 bg-[#FAF8F2] border-b border-[#F2EDE2]/60">
        <Container variant="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#8C8273] font-semibold block">04 / The Guilds</span>
              <Heading variant="display" weight="light" className="text-[#1A1A1A]">
                Artisan Craftsmanship
              </Heading>
              <div className="w-12 h-[1px] bg-[#8C8273]/30" />
            </div>
            <div className="lg:col-span-7 space-y-6 text-[#6E6B64] font-light text-xs md:text-sm leading-relaxed text-justify">
              <Paragraph variant="md">
                Mechanical joints are carved by master carpenters utilizing traditional blind mortise-and-tenon and dowel joinery methods. This guarantees structural stability under intensive commercial use without relying on synthetic chemical adhesives.
              </Paragraph>
              <Paragraph variant="md">
                Our specialized material sub-guilds hand-split blonde rattan cane for open star weaves, twist Alleppey coconut fibers into coir rope daybeds, and lay thousands of hand-carved ethically sourced camel bone tiles tile-by-tile into colored organic resins. Each piece carries the distinct touch of Indian artistry.
              </Paragraph>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. EXPORT CAPABILITIES */}
      <section className="py-20 border-b border-[#F2EDE2]/60">
        <Container variant="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#8C8273] font-semibold block">05 / Supply Chain</span>
              <Heading variant="display" weight="light" className="text-[#1A1A1A]">
                Export Capabilities
              </Heading>
              <div className="w-12 h-[1px] bg-[#8C8273]/30" />
            </div>
            <div className="lg:col-span-7 space-y-6 text-[#6E6B64] font-light text-xs md:text-sm leading-relaxed text-justify">
              <Paragraph variant="md">
                We coordinate container-load logistics globally. Our packing processes are optimized for both Full Container Load (FCL) and Less than Container Load (LCL) sea freight. Solid wood products are wrapped in humidity-absorbing sheets and secured in heavy-gauge corrugated cartons with reinforced corner caps.
              </Paragraph>
              <Paragraph variant="md">
                SB Artisan handles complete <Link to="/contact" className="underline hover:text-[#8C6D4F] transition-colors duration-200">export documentation & logistics</Link>, including phytosanitary certification, fumigation records, origin declarations, and customs clearance filings. We clear freight from Jodhpur's dry ports directly to international hubs, ensuring scheduled arrivals for resort openings and commercial installations.
              </Paragraph>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. QUALITY CONTROL PROCESS */}
      <section className="py-20 bg-[#FAF8F2] border-b border-[#F2EDE2]/60">
        <Container variant="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#8C8273] font-semibold block">06 / Precision Check</span>
              <Heading variant="display" weight="light" className="text-[#1A1A1A]">
                Quality Control Process
              </Heading>
              <div className="w-12 h-[1px] bg-[#8C8273]/30" />
            </div>
            <div className="lg:col-span-7 space-y-8">
              <Paragraph variant="md" className="text-[#6E6B64] font-light text-xs md:text-sm leading-relaxed text-justify">
                To guarantee durability in diverse destination climates, we enforce a strict multi-tier quality control protocol:
              </Paragraph>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                <div className="space-y-2 border border-[#EAE5D9] p-5 bg-[#FAF8F2] rounded-sm">
                  <span className="text-[9px] uppercase tracking-widest text-[#8C8273] font-semibold block">Phase 1</span>
                  <h4 className="font-serif text-sm font-light text-[#1A1A1A]">Moisture Control</h4>
                  <p className="font-sans text-[10px] text-[#6E6B64] font-light leading-relaxed">
                    Timber is kiln-dried and standardized strictly to 8-12% moisture targets, preventing checking, splitting, or warping in dry indoor heating or humid coastal regions.
                  </p>
                </div>
                <div className="space-y-2 border border-[#EAE5D9] p-5 bg-[#FAF8F2] rounded-sm">
                  <span className="text-[9px] uppercase tracking-widest text-[#8C8273] font-semibold block">Phase 2</span>
                  <h4 className="font-serif text-sm font-light text-[#1A1A1A]">Stress & Joint Test</h4>
                  <p className="font-sans text-[10px] text-[#6E6B64] font-light leading-relaxed">
                    Assembled frames undergo shear testing to verify joint load resilience. We audit joinery pins and tensioned rope grids before final finishing processes.
                  </p>
                </div>
                <div className="space-y-2 border border-[#EAE5D9] p-5 bg-[#FAF8F2] rounded-sm">
                  <span className="text-[9px] uppercase tracking-widest text-[#8C8273] font-semibold block">Phase 3</span>
                  <h4 className="font-serif text-sm font-light text-[#1A1A1A]">Surface Clearance</h4>
                  <p className="font-sans text-[10px] text-[#6E6B64] font-light leading-relaxed">
                    Inlay alignment, cane mesh tensioning, and natural beeswax coats are inspected under specialized studio lighting. Only defect-free pieces enter crating.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. GLOBAL MARKET VISION */}
      <section className="py-20 bg-transparent">
        <Container variant="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#8C8273] font-semibold block">07 / Horizon</span>
              <Heading variant="display" weight="light" className="text-[#1A1A1A]">
                Global Market Vision
              </Heading>
              <div className="w-12 h-[1px] bg-[#8C8273]/30" />
            </div>
            <div className="lg:col-span-7 space-y-6 text-[#6E6B64] font-light text-xs md:text-sm leading-relaxed text-justify">
              <Paragraph variant="md">
                We believe that premium Indian furniture should stand as a global benchmark for hospitality projects. Our vision is to place SB Artisan pieces inside Michelin-starred restaurants, beachfront wellness retreats, and luxury urban hotels in North America, Europe, Australia, and the Middle East.
              </Paragraph>
              <Paragraph variant="md">
                By maintaining a transparent factory supply chain, adhering to strict sustainable harvesting regulations, and respecting the legacy of Rajasthan's artisan guilds, we build trade relationships that support local Indian craft communities while equipping international developments with heritage objects built to last.
              </Paragraph>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
