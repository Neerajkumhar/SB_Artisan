import React from "react";

interface HospitalityUsageProps {
  usageText: string;
  category: string;
}

export default function HospitalityUsage({
  usageText,
  category,
}: HospitalityUsageProps) {
  return (
    <div className="space-y-6">
      <h3 className="font-serif text-lg font-light text-[#1A1A1A] tracking-wide border-b border-[#F2EDE2] pb-3">
        Hospitality Spec & Durability Ratings
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Card: Placement & Volume */}
        <div className="md:col-span-2 space-y-4 border border-[#EAE5D9]/60 p-5 bg-[#FAF8F2]/30 rounded-sm">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A3927B]" />
            <h4 className="font-sans text-[10px] uppercase tracking-wider font-semibold text-[#1A1A1A]">
              Ideal Space Config & Volume
            </h4>
          </div>
          <p className="font-sans text-xs text-[#6E6B64] font-light leading-relaxed">
            {usageText}
          </p>
        </div>

        {/* Right Card: Durability Ratings */}
        <div className="space-y-4 border border-[#EAE5D9]/60 p-5 bg-[#FAF8F2]/60 rounded-sm font-sans text-xs">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A3927B]" />
            <h4 className="font-sans text-[10px] uppercase tracking-wider font-semibold text-[#1A1A1A]">
              Contract Specs
            </h4>
          </div>
          
          <div className="space-y-3 font-light text-[#6E6B64] divide-y divide-[#EAE5D9]/50">
            <div className="flex justify-between py-1 first:pt-0">
              <span>Traffic Rating</span>
              <span className="font-medium text-[#1A1A1A]">Commercial / High-Traffic</span>
            </div>
            
            <div className="flex justify-between py-1">
              <span>Joinery Spec</span>
              <span className="font-medium text-[#1A1A1A]">Mortise & Tenon (Pinned)</span>
            </div>

            <div className="flex justify-between py-1">
              <span>Climate Class</span>
              <span className="font-medium text-[#1A1A1A]">Indoor / Covered Outdoor</span>
            </div>

            <div className="flex justify-between py-1">
              <span>Warranty</span>
              <span className="font-medium text-[#1A1A1A]">3-Year Contract Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
