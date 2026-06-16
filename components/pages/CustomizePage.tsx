import React from "react";
import { Container, Heading, SubHeading, Paragraph, SEO } from "../ui";

export default function CustomizePage() {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const whatsAppNumber = "919999999999";
  const preFilledMsg = encodeURIComponent(
    "Hello SB Artisan, I would like to consult about customizing furniture for my project."
  );
  const whatsAppUrl = `https://wa.me/${whatsAppNumber}?text=${preFilledMsg}`;

  const customizeSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom Furniture commissions via WhatsApp",
    "description": "SB Artisan offers direct custom furniture consultations. Send sketches, target dimensions, and material choices to our Jodhpur atelier on WhatsApp.",
    "provider": {
      "@type": "Organization",
      "name": "SB Artisan Jodhpur",
      "url": "https://www.sbartisan.com"
    }
  };

  return (
    <div className="bg-white pt-28 pb-20 selection:bg-[#EAE5D9]">
      <SEO
        title="Customize Your Dream Furniture | WhatsApp Commission"
        description="Connect directly with Jodhpur's master craftsmen on WhatsApp to design and customize solid wood, cane, and bone inlay furniture. Free B2B logistics details."
        keywords="custom furniture online, Jodhpur furniture customization, WhatsApp furniture order, bespoke contract wood, resort seating customization"
        canonical="/customize"
        schema={customizeSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. Hero Screenshot Section */}
        <a 
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative overflow-hidden rounded-sm border border-[#EAE5D9] group shadow-sm transition-all duration-300 hover:shadow-md"
        >
          <img 
            src="/images/whatsapp_contact_hero.jpg" 
            alt="Customize Your Dream Furniture" 
            className="w-full h-auto object-cover select-none transition-transform duration-300 group-hover:brightness-95"
          />
          {/* Subtle absolute badge indicating interactive link */}
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-sm backdrop-blur-xs font-mono select-none">
            Click to Start Consultation
          </div>
        </a>

        {/* 2. Value Props Cards Screenshot Section */}
        <div className="overflow-hidden rounded-sm border border-[#EAE5D9] shadow-sm bg-white">
          <img 
            src="/images/whatsapp_contact_cards.jpg" 
            alt="Customization advantages: Hassle-Free, Priced on Budget, Easy Progress Tracking, After-Sales Guarantee" 
            className="w-full h-auto object-cover select-none"
          />
        </div>
      </div>
    </div>
  );
}
