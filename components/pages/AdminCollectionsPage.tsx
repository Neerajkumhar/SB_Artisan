import React from "react";
import { MOCK_COLLECTIONS } from "../product/hospitality-data";

export default function AdminCollectionsPage() {
  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-10 selection:bg-[#CBB593] selection:text-[#0B0A0A]">
      
      {/* Header */}
      <div className="border-b border-[#23211F] pb-6 space-y-1">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#8C8273] uppercase font-light">
          <span>ADMIN PANEL</span>
          <span>•</span>
          <span className="text-[#CBB593]">COLLECTIONS MANAGEMENT</span>
        </div>
        <h2 className="font-serif text-3xl font-light text-white tracking-wide">
          Bespoke Series
        </h2>
      </div>

      {/* Collections Table List */}
      <div className="grid grid-cols-1 gap-8">
        {MOCK_COLLECTIONS.map((coll) => (
          <div key={coll.id} className="bg-[#121110] border border-[#23211F] p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
            {/* Image Thumbnail */}
            <div className="lg:col-span-4 aspect-[1.8] lg:aspect-[1.5] bg-[#1E1D1C] overflow-hidden relative border border-[#23211F]">
              <img
                src={coll.image}
                alt={coll.name}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#0F0E0D]/10" />
            </div>

            {/* Description details */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.2em] text-[#8C8273] uppercase font-light block">
                  {coll.tagline}
                </span>
                <h3 className="font-serif text-2xl font-light text-white tracking-wide">
                  {coll.name}
                </h3>
              </div>

              <p className="font-sans text-xs text-[#8C8273] font-light leading-relaxed text-justify max-w-2xl">
                {coll.description}
              </p>

              <div className="pt-4 border-t border-[#23211F]/60 flex items-center justify-between text-[10px] font-sans tracking-wide text-[#8C8273]">
                <div className="flex items-center gap-4">
                  <span>URL Slug: <span className="text-[#CBB593] font-mono">{coll.slug}</span></span>
                  <span>•</span>
                  <span>Artisans Engaged: <span className="text-white">6 Guild Masters</span></span>
                </div>
                <span className={cn(
                  "py-1 px-3 text-[8px] tracking-widest uppercase font-medium",
                  coll.featured 
                    ? "bg-[#CBB593]/10 border border-[#CBB593]/20 text-[#CBB593]" 
                    : "bg-neutral-800 border border-[#2C2B29] text-[#8C8273]"
                )}>
                  {coll.featured ? "Featured Showcase" : "Standard catalog"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// Inline helper to support cn inside components
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
