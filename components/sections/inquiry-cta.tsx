import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Container, Heading, SubHeading, Paragraph } from "../ui";

interface InquiryCTAProps {
  title?: string;
  subtitle?: string;
  description?: string;
  email?: string;
  phone?: string;
  whatsappNumber?: string;
  className?: string;
}

export default function InquiryCTA({
  title = "Bespoke Commissions & Sourcing Specifications",
  subtitle = "Private Trade Consultations",
  description = "Whether selecting wood finishes for a resort masterplan, requesting customized dimensions, or coordinating a private walkthrough of our Jodhpur woodworking workshops, our trade desk team is prepared to execute your request.",
  email = "concierge@sbartisan.com",
  phone = "+91 (0291) 274 0801",
  whatsappNumber = "919999999999", // Mock WhatsApp concierge
  className,
}: InquiryCTAProps) {
  
  // Custom fine-line SVGs for luxury contact links
  const EmailIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );

  const WhatsAppIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );

  return (
    <section className={cn("py-28 bg-[#161513] text-[#EAE5D9] border-t border-black relative overflow-hidden", className)}>
      {/* Restrained subtle dark light effect */}
      <div className="absolute inset-0 bg-radial-gradient-to-b from-white/[0.015] to-transparent pointer-events-none" />

      <Container variant="default" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Block: Philosophy and text */}
          <motion.div
            className="lg:col-span-6 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="space-y-4">
              <SubHeading variant="caps" size="sm" className="text-[#8C8273]">
                {subtitle}
              </SubHeading>
              
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight tracking-wide">
                {title}
              </h2>
            </div>

            <Paragraph variant="md" className="text-[#9E9B95] font-light leading-relaxed text-justify max-w-xl">
              {description}
            </Paragraph>
          </motion.div>

          {/* Right Block: Contact options list */}
          <motion.div
            className="lg:col-span-6 space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
          >
            {/* Email link card */}
            <a
              href={`mailto:${email}`}
              className="flex items-center justify-between p-6 border border-[#2D2B28]/60 rounded-sm hover:border-[#EAE5D9]/40 hover:bg-[#1C1A18] transition-all duration-500 group"
            >
              <div className="flex items-center gap-5">
                <div className="text-[#8C8273] group-hover:text-white transition-colors duration-300">
                  <EmailIcon />
                </div>
                <div className="space-y-1">
                  <span className="block text-[9px] tracking-[0.25em] uppercase font-sans text-[#8C8273] font-light">
                    Electronic Mail
                  </span>
                  <span className="block text-sm font-sans text-white font-light group-hover:text-[#EAE5D9] transition-colors">
                    {email}
                  </span>
                </div>
              </div>
              
              <svg className="w-3.5 h-3.5 text-[#8C8273] transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 8h14M10 3l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Telephone link card */}
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-between p-6 border border-[#2D2B28]/60 rounded-sm hover:border-[#EAE5D9]/40 hover:bg-[#1C1A18] transition-all duration-500 group"
            >
              <div className="flex items-center gap-5">
                <div className="text-[#8C8273] group-hover:text-white transition-colors duration-300">
                  <PhoneIcon />
                </div>
                <div className="space-y-1">
                  <span className="block text-[9px] tracking-[0.25em] uppercase font-sans text-[#8C8273] font-light">
                    Jodhpur Showroom
                  </span>
                  <span className="block text-sm font-sans text-white font-light group-hover:text-[#EAE5D9] transition-colors">
                    {phone}
                  </span>
                </div>
              </div>
              
              <svg className="w-3.5 h-3.5 text-[#8C8273] transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 8h14M10 3l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* WhatsApp Concierge link card */}
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 border border-[#2D2B28]/60 rounded-sm hover:border-[#EAE5D9]/40 hover:bg-[#1C1A18] transition-all duration-500 group"
            >
              <div className="flex items-center gap-5">
                <div className="text-[#8C8273] group-hover:text-white transition-colors duration-300">
                  <WhatsAppIcon />
                </div>
                <div className="space-y-1">
                  <span className="block text-[9px] tracking-[0.25em] uppercase font-sans text-[#8C8273] font-light">
                    Direct Concierge Chat
                  </span>
                  <span className="block text-sm font-sans text-white font-light group-hover:text-[#EAE5D9] transition-colors">
                    Bespoke WhatsApp Consultation
                  </span>
                </div>
              </div>
              
              <svg className="w-3.5 h-3.5 text-[#8C8273] transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 8h14M10 3l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

          </motion.div>

        </div>
      </Container>
    </section>
  );
}
export type { InquiryCTAProps };
