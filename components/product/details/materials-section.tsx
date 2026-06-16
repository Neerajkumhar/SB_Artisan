import React from "react";

interface MaterialDetail {
  name: string;
  description: string;
  source?: string;
}

interface MaterialsSectionProps {
  materials: string[];
}

// Map material terms to realistic descriptions to display high-fidelity copywriting rather than raw tags
const MATERIAL_DICTIONARY: Record<string, MaterialDetail> = {
  "reclaimed teakwood": {
    name: "Reclaimed Shekhawati Teak",
    description: "Old-growth structural timber sourced from dismantled heritage havelis. Naturally seasoned for over a century, providing unrivaled density, resistance to warping, and a rich dark honey patina.",
    source: "Rajasthan, India"
  },
  "natural rattan cane": {
    name: "A-Grade Malabar Cane",
    description: "Grown in the wet tropical forests of the Western Ghats. Individually selected peel rattan cane is wet-bent and woven by hand, creating lightweight yet commercial-grade structural meshes.",
    source: "Kerala Backwaters, India"
  },
  "ethically sourced camel bone": {
    name: "Ethical Camel Bone Inlay",
    description: "Sourced responsibly from naturally deceased draft animals. Carved piece-by-piece and laid in ornate geometric alignments inside custom water-resistant organic resins.",
    source: "Jodhpur Desert Guilds, India"
  },
  "organic coconut coir ropes": {
    name: "Double-Braided Coir Cordage",
    description: "Fibers harvested from organic coconut husks, soaked and hand-twisted into high-tensile, climate-resistant cordage that maintains optimal structural tension.",
    source: "Alleppey Coastline, India"
  },
  "high-tensile silk-blend cord": {
    name: "Loom-spun Silk-blend Rope",
    description: "A combination of raw organic silk threads and performance-grade nylon, offering a smooth touch alongside high load resilience for high-traffic lounge and bar counters.",
    source: "Varanasi Weaving Hubs, India"
  },
  "solid mango wood frame": {
    name: "Sustainable Mango Wood Core",
    description: "Dense, sustainable hardwood salvaged from commercial orchards at the end of their fruiting life cycles, providing robust core casing properties.",
    source: "Uttar Pradesh orchards, India"
  },
  "forest green indian marble": {
    name: "Udaipur Forest Green Marble",
    description: "Monolithic, dense serpentinite marble celebrating wild deep green veins and warm calcite formations, polished to an unhoned satin luster.",
    source: "Udaipur Quarries, India"
  }
};

export default function MaterialsSection({ materials }: MaterialsSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="font-serif text-lg font-light text-[#1A1A1A] tracking-wide border-b border-[#F2EDE2] pb-3">
        Artisanal Provenance & Materials
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((m) => {
          const key = m.toLowerCase().trim();
          const detail = MATERIAL_DICTIONARY[key] || {
            name: m,
            description: "Premium commercial-grade structural material selected specifically to ensure durability in high-end contract hospitality environments."
          };

          return (
            <div key={m} className="space-y-2 border border-[#EAE5D9]/60 p-4 bg-[#FAF8F2]/45 rounded-sm">
              <div className="flex justify-between items-baseline">
                <h4 className="font-sans text-xs uppercase tracking-wider font-semibold text-[#1A1A1A]">
                  {detail.name}
                </h4>
                {detail.source && (
                  <span className="text-[9px] text-[#8C8273] font-light uppercase tracking-widest font-sans">
                    {detail.source}
                  </span>
                )}
              </div>
              <p className="font-sans text-xs text-[#6E6B64] font-light leading-relaxed">
                {detail.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
