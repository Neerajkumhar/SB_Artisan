import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Heading, SubHeading, Paragraph, SectionTitle, SEO } from "../ui";
import { cn } from "../../lib/utils";

export default function BespokePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setProject("");
      setNotes("");
    }, 1500);
  };

  const bespokeSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom Hospitality Furniture OEM Manufacturing",
    "description": "SB Artisan offers custom contract furniture manufacturing, CAD shop drawings, joint specifications, and sustainable timber selections for hotel and commercial projects.",
    "provider": {
      "@type": "Organization",
      "name": "SB Artisan Jodhpur",
      "logo": "https://www.sbartisan.com/images/commercial_workshop_custom.png"
    }
  };

  return (
    <div className="bg-[#FDFCF7] pt-28 pb-20">
      <SEO 
        title="Custom Hospitality Furniture OEM & Contracting"
        description="Submit custom FF&E specifications to Jodhpur's premier furniture OEM manufacturer. We produce custom dimensions, bespoke finishes, and shop drawings for contract developers."
        keywords="custom hospitality furniture manufacturer, contract furniture OEM, bespoke hotel furniture suppliers, furniture shop drawings, Jodhpur factory custom wood"
        canonical="/bespoke"
        schema={bespokeSchema}
      />
      
      {/* 1. HERO HEADER */}
      <Container variant="default" className="py-12 border-b border-[#F2EDE2]">
        <div className="max-w-2xl space-y-4">
          <SubHeading variant="caps" size="sm" className="text-[#8C8273]">
            PRIVATE CONCIERGE
          </SubHeading>
          <Heading variant="hero" weight="light" className="text-[#1A1A1A]">
            Bespoke Atelier Commission Services
          </Heading>
        </div>
      </Container>


      {/* 2. SERVICES INTRO SPLIT */}
      <Container variant="default" className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-serif text-2xl font-light text-[#1A1A1A] leading-snug">
              "We execute custom furniture configurations tailored for specific hospitality architectures."
            </h3>
            <p className="font-sans text-xs text-[#8C8273] font-light leading-relaxed">
              SB Artisan coordinates with international designers, hospitality specifiers, and hotel owners to manufacture custom timber scales, export finishes, and bespoke weaving patterns.
            </p>
          </div>

          {/* Detailed Bespoke Options */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-light text-[#1A1A1A]">Custom Timber & Scale Options</h4>
              <Paragraph variant="md" className="text-[#6E6B64] font-light">
                Our Jodhpur workshop selects woods according to your specific grain and color density requests. Dining tables, daybeds, and benches can be milled to custom lengths, heights, and custom structural joint depths.
              </Paragraph>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-light text-[#1A1A1A]">Weaves & Textiles COM</h4>
              <Paragraph variant="md" className="text-[#6E6B64] font-light">
                SB Artisan seating can be finished in our catalog rope colors or hand-bent rattan profiles, or upholstered in Customer's Own Material (COM) for boutique hotel bedrooms.
              </Paragraph>
            </div>

            <div className="space-y-4">
              <h4 className="font-serif text-lg font-light text-[#1A1A1A]">Digital Room Layouts</h4>
              <Paragraph variant="md" className="text-[#6E6B64] font-light">
                For major commercial resort projects, our Jodhpur design team provides digital structural layout mockups and material finish sample boards, allowing specifiers to preview space configurations.
              </Paragraph>
            </div>
          </div>
        </div>
      </Container>

      {/* 3. BESPOKE COMMISSION REQUEST FORM */}
      <Container variant="narrow" className="py-16 border-t border-[#F2EDE2] mt-8">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <SubHeading variant="caps" size="sm" className="text-[#8C8273]">
              COMMISSION INQUIRY
            </SubHeading>
            <h3 className="font-serif text-2xl font-light text-[#1A1A1A]">
              Register Your Commission Request
            </h3>
            <p className="font-sans text-xs text-[#8C8273] font-light max-w-sm mx-auto">
              Our trade desk coordinates export commissions directly with our Jodhpur woodworking workshops.
            </p>
          </div>

          {status === "success" ? (
            <div className="p-6 bg-[#F5F2EA] border border-[#EAE5D9] rounded-sm text-center space-y-2">
              <p className="font-serif text-base text-[#1A1A1A] font-light">Commission Request Dispatched</p>
              <p className="font-sans text-xs text-[#6E6B64] font-light leading-relaxed max-w-md mx-auto">
                Thank you. A bespoke commission coordinator has been assigned to your project. We will contact you within 24 business hours to discuss dimensions, materials, and workshop scheduling.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-sans">
                    Client Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={status === "loading"}
                    className="w-full bg-transparent border-b border-[#2C2B29]/60 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-light font-sans"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-sans">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    className="w-full bg-transparent border-b border-[#2C2B29]/60 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-light font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-sans">
                  Project Title / Object Type
                </label>
                <input
                  type="text"
                  placeholder="e.g. Haveli Chair Custom Finish"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  disabled={status === "loading"}
                  className="w-full bg-transparent border-b border-[#2C2B29]/60 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-light font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-sans">
                  Customization Details & Dimensions
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={status === "loading"}
                  placeholder="Describe your structural layout dimensions, wood stain preferences, or specific stone request..."
                  className="w-full bg-transparent border-b border-[#2C2B29]/60 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-light font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className={cn(
                  "w-full py-3.5 text-xs uppercase tracking-[0.25em] font-sans font-light transition-all duration-500 rounded-sm border",
                  status === "loading"
                    ? "bg-[#8C8273] text-white border-[#8C8273]"
                    : "bg-[#1A1A1A] text-white border-[#1A1A1A] hover:bg-transparent hover:text-[#1A1A1A]"
                )}
              >
                {status === "loading" ? "Submitting Inquiry Dossier..." : "Register Bespoke Commission"}
              </button>
            </form>
          )}
        </div>
      </Container>

    </div>
  );
}
