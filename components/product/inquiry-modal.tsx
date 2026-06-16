import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HospitalityProduct } from "./hospitality-data";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: HospitalityProduct | null;
}

export default function InquiryModal({ isOpen, onClose, product }: InquiryModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [firm, setFirm] = useState("");
  const [projectType, setProjectType] = useState("Boutique Hotel");
  const [units, setUnits] = useState("1-10");
  const [timeline, setTimeline] = useState("3-6 months");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // Reset state when modal opens/closes or product changes
  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setFirm("");
      setProjectType("Boutique Hotel");
      setUnits("1-10");
      setTimeline("3-6 months");
      setNotes("");
      setStatus("idle");
    }
  }, [isOpen, product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setStatus("loading");
    try {
      const payload = {
        name,
        company_name: firm || "Independent Architect / Designer",
        email,
        phone: "Not Provided",
        country: "India",
        message: `Project Class: ${projectType} | Volume Required: ${units} | Timeline: ${timeline} | Brief/Requirements: ${notes || "None"}`,
        inquiry_type: product ? `Product Spec Acquisition: ${product.title}` : "General Sourcing"
      };

      const res = await fetch("http://localhost:5000/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const json = await res.json();
      
      if (json.success) {
        setStatus("success");
      } else {
        throw new Error(json.message || "Failed to log inquiry");
      }
    } catch (err) {
      console.error("Inquiry submission error:", err);
      alert("We encountered an error submitting your trade inquiry. Please try again or chat via WhatsApp.");
      setStatus("idle");
    }
  };

  const handleWhatsAppDirect = () => {
    const productText = product 
      ? `regarding the "${product.title}"` 
      : "for our upcoming project";
    const text = encodeURIComponent(
      `Hello SB Artisan, I would like to initiate a trade consultation ${productText}.`
    );
    window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          
          {/* Backdrop mask with smooth fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#FAF8F2] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-[#EAE5D9] flex flex-col md:flex-row rounded-sm z-10"
          >
            
            {/* Left Column: Premium Visual Panel */}
            <div className="w-full md:w-5/12 bg-[#F2EDE2] relative overflow-hidden flex flex-col justify-between p-8 min-h-[200px] md:min-h-0">
              
              {/* Product preview or general B2B backdrop */}
              <div className="absolute inset-0 z-0">
                <img
                  src={product ? product.image : "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"}
                  alt={product ? product.title : "Hospitality Lobby Showcase"}
                  className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
              </div>

              {/* Header Text */}
              <div className="relative z-10 space-y-2">
                <span className="text-[9px] uppercase tracking-[0.3em] font-sans font-semibold text-[#CBB593] block">
                  SB ARTISAN
                </span>
                <h3 className="font-serif text-2xl font-light text-white leading-tight">
                  {product ? "Object Spec Acquisition" : "Bespoke Project Bureau"}
                </h3>
              </div>

              {/* Description / Metadata */}
              <div className="relative z-10 space-y-4 pt-12">
                {product ? (
                  <div className="space-y-2 text-white/90">
                    <p className="font-serif text-sm italic border-b border-white/20 pb-2">
                      {product.title}
                    </p>
                    <div className="font-sans text-[10px] uppercase tracking-wider text-white/60 space-y-1">
                      <p>Atelier: {product.designer}</p>
                      <p>Category: {product.category}</p>
                      {product.price && <p>Base Trade: {product.price}</p>}
                    </div>
                  </div>
                ) : (
                  <p className="font-sans text-xs text-white/80 font-light leading-relaxed">
                    Collaborate with our Jodhpur design atelier on boutique resort, bistro cafe, and custom workspace furniture commissions.
                  </p>
                )}
                
                <div className="pt-2">
                  <p className="font-sans text-[10px] text-white/60 font-light leading-relaxed">
                    Trade desk inquiries are processed with certified material spec logs and freight logistics within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form Panel */}
            <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col overflow-y-auto max-h-[60vh] md:max-h-none">
              
              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-4 right-4 text-[#8C8273] hover:text-black transition-colors focus:outline-none"
              >
                <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 2.5l11 11M13.5 2.5l-11 11" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
              </button>

              {status === "success" ? (
                <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 py-10 px-4">
                  <div className="w-12 h-12 rounded-full bg-[#8C6D4F]/10 border border-[#8C6D4F]/30 flex items-center justify-center text-[#8C6D4F]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <div className="space-y-2.5">
                    <h4 className="font-serif text-xl font-light text-[#1A1A1A]">
                      Acquisition Inquiry Registered
                    </h4>
                    <p className="font-sans text-xs text-[#6E6B64] font-light leading-relaxed max-w-md">
                      Thank you. A custom specification document and commercial trade quote for <strong>{product ? `"${product.title}"` : "your design project"}</strong> has been logged at our Jodhpur Trade Desk.
                    </p>
                    <p className="font-sans text-[11px] text-[#8C8273] italic">
                      A coordinator will email you at {email} shortly.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#EAE5D9] bg-white hover:bg-[#F5F2EA] text-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 rounded-sm"
                    >
                      WhatsApp Chat
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 py-3 bg-[#1A1A1A] hover:bg-[#8C6D4F] text-white text-[10px] uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 rounded-sm"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-lg font-light text-[#1A1A1A]">
                      Trade Quotation & Specification Request
                    </h4>
                    <p className="font-sans text-[11px] text-[#8C8273] font-light mt-1">
                      Access commercial pricing, material customizations, and bulk export solutions.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs font-light">
                    
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                          Contact Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="E.g., Rajiv Mehta"
                          disabled={status === "loading"}
                          className="bg-transparent border-b border-[#2C2B29] pb-2 text-xs text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none focus:border-[#1A1A1A] w-full font-sans transition-colors disabled:opacity-50"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                          Business Email
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="E.g., r.mehta@group.com"
                          disabled={status === "loading"}
                          className="bg-transparent border-b border-[#2C2B29] pb-2 text-xs text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none focus:border-[#1A1A1A] w-full font-sans transition-colors disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                        Design Firm / Hotel Group
                      </label>
                      <input
                        type="text"
                        required
                        value={firm}
                        onChange={(e) => setFirm(e.target.value)}
                        placeholder="E.g., Taj Hotels & Resorts"
                        disabled={status === "loading"}
                        className="bg-transparent border-b border-[#2C2B29] pb-2 text-xs text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none focus:border-[#1A1A1A] w-full font-sans transition-colors disabled:opacity-50"
                      />
                    </div>

                    {/* Spec Selectors */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                          Project Class
                        </label>
                        <select
                          value={projectType}
                          onChange={(e) => setProjectType(e.target.value)}
                          disabled={status === "loading"}
                          className="w-full bg-transparent border-b border-[#2C2B29] py-1 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-all rounded-none"
                        >
                          <option value="Boutique Hotel">Boutique Hotel / Resort</option>
                          <option value="Cafe / Bistro">Cafe & Bistro</option>
                          <option value="Fine Dining">Fine Dining Restaurant</option>
                          <option value="Residential">Residential Development</option>
                          <option value="Workspace">Executive Workspace</option>
                          <option value="Other">Other Creative Space</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                          Volume Needed
                        </label>
                        <select
                          value={units}
                          onChange={(e) => setUnits(e.target.value)}
                          disabled={status === "loading"}
                          className="w-full bg-transparent border-b border-[#2C2B29] py-1 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-all rounded-none"
                        >
                          <option value="1-10">1 – 10 Units</option>
                          <option value="11-50">11 – 50 Units</option>
                          <option value="51-100">51 – 100 Units</option>
                          <option value="100+">100+ Units</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                          Timeline
                        </label>
                        <select
                          value={timeline}
                          onChange={(e) => setTimeline(e.target.value)}
                          disabled={status === "loading"}
                          className="w-full bg-transparent border-b border-[#2C2B29] py-1 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-all rounded-none"
                        >
                          <option value="Immediate">Under 3 Months</option>
                          <option value="3-6 months">3 – 6 Months</option>
                          <option value="6+ months">6+ Months</option>
                        </select>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                        Bespoke Requirements / Project Brief
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Detail custom dimensions, fabric requests, finishes, or logistics details..."
                        disabled={status === "loading"}
                        rows={3}
                        className="w-full bg-transparent border border-[#EAE5D9] p-2 text-xs text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none focus:border-[#1A1A1A] font-sans transition-colors resize-none rounded-sm"
                      />
                    </div>

                    {/* Form Action buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="flex-1 py-3.5 bg-[#1A1A1A] hover:bg-[#8C6D4F] text-white border border-[#1A1A1A] hover:border-[#8C6D4F] text-[9px] uppercase tracking-[0.25em] font-sans font-medium transition-all duration-300 rounded-sm"
                      >
                        {status === "loading" ? "Registering..." : "Submit Spec & Pricing Request"}
                      </button>
                      
                      <button
                        type="button"
                        onClick={handleWhatsAppDirect}
                        className="sm:w-auto px-5 py-3.5 border border-[#EAE5D9] hover:bg-[#F5F2EA] text-[#1A1A1A] text-[9px] uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 rounded-sm flex items-center justify-center gap-2"
                      >
                        <svg className="w-3.5 h-3.5 text-[#8C6D4F]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.116-2.887-6.98C16.584 1.897 14.11 1.867 11.47 1.867c-5.436 0-9.86 4.42-9.864 9.864 0 1.685.443 3.329 1.288 4.776L1.879 21.08l4.768-1.256c.001 0 .001 0 0 0zm11.758-5.321c-.266-.134-1.579-.78-1.823-.867-.243-.088-.42-.132-.596.133-.176.265-.681.861-.836 1.039-.153.176-.308.199-.575.066-.267-.134-1.129-.417-2.15-1.328-.793-.708-1.329-1.582-1.485-1.848-.156-.266-.017-.409.117-.541.12-.12.267-.309.4-.464.133-.155.177-.265.267-.442.089-.176.044-.331-.022-.464-.066-.133-.596-1.436-.816-1.966-.215-.518-.453-.448-.623-.456-.16-.008-.344-.01-.528-.01-.184 0-.485.069-.739.344-.254.275-.97.949-.97 2.314 0 1.365.992 2.68 1.114 2.846.122.166 1.953 2.983 4.73 4.181.661.285 1.176.455 1.579.583.664.211 1.269.181 1.747.11.533-.08 1.579-.646 1.8-.1237.221-.592.221-1.101.155-1.192-.066-.091-.243-.135-.508-.269z" />
                        </svg>
                        WhatsApp
                      </button>
                    </div>

                  </form>
                </div>
              )}

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
