import React from "react";
import { cn } from "../../../lib/utils";

interface FinishSelectorProps {
  finishes: string[];
  selectedFinish: string;
  onChange: (finish: string) => void;
}

// Map finishes to visual colors/descriptions for high-end preview selectors
const FINISH_METADATA: Record<string, { color: string; desc: string }> = {
  "smoked charcoal matte oil": {
    color: "bg-[#252423]",
    desc: "A rich charcoal black polish that retains the raw wood grain patterns beneath."
  },
  "natural aged teak wax": {
    color: "bg-[#8E6E53]",
    desc: "Organic beeswax finish celebrating the natural warm golden honey tones of premium teak wood."
  },
  "honey amber polish": {
    color: "bg-[#AA7B52]",
    desc: "A warm luster polish emphasizing depth and high contrast inside old-growth teak."
  },
  "bleached raw cane": {
    color: "bg-[#DFD3C3]",
    desc: "Clean, natural raw cane dried under direct sunlight, leaving an airy desert beige tone."
  },
  "sun-baked amber": {
    color: "bg-[#CA9E7A]",
    desc: "Steam-infused amber tones highlighting rich rattan peel characteristics."
  },
  "toasted ochre": {
    color: "bg-[#AC7C58]",
    desc: "Slow-roasted deep brown hues offering organic warmth to bentwood designs."
  },
  "charcoal onyx resin": {
    color: "bg-[#181818]",
    desc: "Deep pitch black resin base framing ivory white bone inlay chips."
  },
  "emerald forest resin": {
    color: "bg-[#1F2F26]",
    desc: "Rich deep forest resin replicating royal Rajasthani court emerald mosaics."
  },
  "sandstone beige resin": {
    color: "bg-[#C4B7A5]",
    desc: "Warm mineral resin color reminiscent of dry Jodhpur fortress sandstone."
  },
  "natural matte rosewood wax": {
    color: "bg-[#5D3D2B]",
    desc: "Traditional oil rub that honors the dark, expressive violet graining of Sheesham."
  },
  "ebonized walnut polish": {
    color: "bg-[#2A231E]",
    desc: "Deep, satin-sheen black polish tailored for grand, high-contrast dining spaces."
  },
  "aged brass pvd base": {
    color: "bg-[#C5A880]",
    desc: "Brushed brass treatment protecting stainless steel structures against oxidization."
  },
  "matte gunmetal base": {
    color: "bg-[#424242]",
    desc: "Charcoal sand-blasted metal finish offering modern industrial vibes."
  },
  "polished stainless steel": {
    color: "bg-[#E0E0E0]",
    desc: "High-shine silver sheen providing crisp architectural mirror reflections."
  },
  "deep indigo royal resin": {
    color: "bg-[#1F2A3F]",
    desc: "Deep blue pigmented organic resin paying tribute to the Blue City of Jodhpur."
  },
  "jet black space resin": {
    color: "bg-[#0F0F0F]",
    desc: "Super-matte black resin that emphasizes geometric bone star highlights."
  },
  "natural teak finish": {
    color: "bg-[#917154]",
    desc: "Organic natural teak sealer highlighting rich grains with a dry tactile feel."
  },
  "smoked walnut finish": {
    color: "bg-[#4D3A2B]",
    desc: "A rich dark stain providing classic mid-century warmth to clean teak frames."
  }
};

export default function FinishSelector({
  finishes,
  selectedFinish,
  onChange,
}: FinishSelectorProps) {
  return (
    <div className="space-y-4">
      <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] font-medium text-[#1A1A1A]">
        Bespoke Finish Selection
      </h4>
      
      {/* Visual Circle Selectors */}
      <div className="flex flex-wrap gap-3">
        {finishes.map((finish) => {
          const key = finish.toLowerCase().trim();
          const meta = FINISH_METADATA[key] || { color: "bg-[#CCCCCC]", desc: "Custom handcrafted finish option." };
          const isSelected = selectedFinish === finish;

          return (
            <button
              key={finish}
              onClick={() => onChange(finish)}
              className={cn(
                "w-7 h-7 rounded-full border transition-all duration-300 relative flex items-center justify-center p-0.5 shrink-0",
                isSelected ? "border-[#1A1A1A] scale-105" : "border-[#EAE5D9] hover:border-[#8C8273]"
              )}
              title={finish}
            >
              <span className={cn("w-full h-full rounded-full block", meta.color)} />
            </button>
          );
        })}
      </div>

      {/* Selected Finish Label & Detail */}
      <div className="p-3 bg-[#FAF8F2] border border-[#EAE5D9]/50 rounded-sm">
        <span className="block font-sans text-[10px] uppercase tracking-wider font-semibold text-[#1A1A1A]">
          Active Choice: {selectedFinish}
        </span>
        <p className="font-sans text-[11px] text-[#6E6B64] font-light leading-relaxed mt-1">
          {FINISH_METADATA[selectedFinish.toLowerCase().trim()]?.desc || "Individually hand-polished by our studio finishers using natural oils and waxes."}
        </p>
      </div>
    </div>
  );
}
