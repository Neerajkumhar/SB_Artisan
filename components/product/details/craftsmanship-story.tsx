import React from "react";
import { Paragraph } from "../../ui";

interface CraftsmanshipStoryProps {
  designer: string;
  story: string;
}

export default function CraftsmanshipStory({
  designer,
  story,
}: CraftsmanshipStoryProps) {
  // Extract location/region helper from designer name
  const getRegionName = () => {
    const name = designer.toLowerCase();
    if (name.includes("jodhpur")) return "Jodhpur Woodworking Atelier, Rajasthan";
    if (name.includes("jaipur")) return "Jaipur Architectural Crafts Guild";
    if (name.includes("kerala")) return "Malabar Weaving Conservatories, Kerala";
    if (name.includes("varanasi")) return "Varanasi Silk Loom Guilds, Uttar Pradesh";
    return "Indian Heritage Woodcrafts Workshop";
  };

  return (
    <div className="space-y-8 bg-[#FAF8F2] border border-[#EAE5D9] p-8 md:p-12 rounded-sm relative overflow-hidden">
      {/* Decorative subtle texture label */}
      <div className="absolute right-0 top-0 opacity-[0.03] select-none pointer-events-none transform translate-x-10 -translate-y-10">
        <span className="font-serif text-[120px] font-bold text-[#1A1A1A]">
          HANDMADE
        </span>
      </div>

      <div className="max-w-2xl space-y-6 relative z-10">
        <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#8C8273] font-semibold block">
          Artisanal Preservation Project
        </span>
        
        <h3 className="font-serif text-2xl md:text-3xl font-light text-[#1A1A1A] leading-tight">
          Handcrafted by {getRegionName()}
        </h3>
        
        <Paragraph variant="md" className="text-[#6E6B64] font-light leading-relaxed text-justify">
          {story}
        </Paragraph>

        {/* Narrative Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-[#EAE5D9]">
          <div className="space-y-1">
            <span className="block text-[9px] uppercase tracking-wider font-semibold text-[#1A1A1A] font-sans">
              Lead Time
            </span>
            <span className="block text-xs text-[#8C8273] font-light font-sans">
              8 – 12 Weeks (Bespoke)
            </span>
          </div>
          
          <div className="space-y-1">
            <span className="block text-[9px] uppercase tracking-wider font-semibold text-[#1A1A1A] font-sans">
              Craft preservation
            </span>
            <span className="block text-xs text-[#8C8273] font-light font-sans">
              100% Hand-finished
            </span>
          </div>

          <div className="space-y-1">
            <span className="block text-[9px] uppercase tracking-wider font-semibold text-[#1A1A1A] font-sans">
              Export Crated
            </span>
            <span className="block text-xs text-[#8C8273] font-light font-sans">
              ISPM-15 Wood Packing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
