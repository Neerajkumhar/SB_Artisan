import React, { useState } from "react";
import { cn } from "../../lib/utils";

export default function AdminSettingsPage() {
  const [conciergeEmail, setConciergeEmail] = useState("concierge@sbartisan.com");
  const [markupRate, setMarkupRate] = useState("15");
  const [isWhatsAppActive, setIsWhatsAppActive] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState("+9102912740801");
  const [leadTimeWeeks, setLeadTimeWeeks] = useState("8");

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-6 md:p-12 max-w-2xl mx-auto space-y-10 selection:bg-[#CBB593] selection:text-[#0B0A0A]">
      
      {/* Header */}
      <div className="border-b border-[#23211F] pb-6 space-y-1">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#8C8273] uppercase font-light">
          <span>ADMIN PANEL</span>
          <span>•</span>
          <span className="text-[#CBB593]">SYSTEM CONFIGURATIONS</span>
        </div>
        <h2 className="font-serif text-3xl font-light text-white tracking-wide">
          Atelier Settings
        </h2>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-[#121110] border border-[#23211F] p-6 space-y-6">
        
        {/* Concierge Desk Mail */}
        <div className="space-y-2">
          <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Concierge Email</label>
          <input
            type="email"
            value={conciergeEmail}
            onChange={(e) => setConciergeEmail(e.target.value)}
            className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none"
          />
        </div>

        {/* Trade Pricing Markup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Trade Price Markup (%)</label>
            <input
              type="number"
              value={markupRate}
              onChange={(e) => setMarkupRate(e.target.value)}
              className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none text-center"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Default Lead Time (Weeks)</label>
            <input
              type="number"
              value={leadTimeWeeks}
              onChange={(e) => setLeadTimeWeeks(e.target.value)}
              className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none text-center"
            />
          </div>
        </div>

        {/* WhatsApp integration toggle */}
        <div className="flex items-center justify-between p-4 border border-[#23211F] bg-[#181716] select-none">
          <div className="space-y-0.5">
            <span className="text-[10px] tracking-widest text-white uppercase font-light block">WhatsApp Consultation Link</span>
            <span className="text-[9px] text-[#8C8273] font-sans font-light block">Activate the sticky chat trigger on details pages</span>
          </div>
          <button
            type="button"
            onClick={() => setIsWhatsAppActive(!isWhatsAppActive)}
            className={cn(
              "w-12 h-6 flex items-center p-1 cursor-pointer transition-colors duration-300 rounded-full border-none focus:outline-none",
              isWhatsAppActive ? "bg-[#CBB593]" : "bg-[#2C2B29]"
            )}
          >
            <div 
              className="bg-[#0B0A0A] w-4 h-4 rounded-full transition-transform duration-300"
              style={{ transform: isWhatsAppActive ? "translateX(24px)" : "translateX(0px)" }}
            />
          </button>
        </div>

        {/* WhatsApp Phone */}
        {isWhatsAppActive && (
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">WhatsApp Contact Number</label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none"
            />
          </div>
        )}

        {/* Submit Actions */}
        <div className="pt-4 border-t border-[#23211F]/60 flex items-center justify-between">
          <div className="h-6">
            {isSaved && (
              <span className="text-[10px] text-[#CBB593] font-medium tracking-wide animate-fade-in block">
                ✓ Configurations saved to active registry
              </span>
            )}
          </div>
          <button
            type="submit"
            className="py-3 px-8 bg-[#CBB593] text-[#0B0A0A] hover:bg-[#DDC9AC] font-sans text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-none border-none cursor-pointer"
          >
            Save Settings
          </button>
        </div>

      </form>

    </div>
  );
}
