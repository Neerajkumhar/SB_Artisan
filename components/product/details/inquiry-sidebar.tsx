import React, { useState } from "react";
import { HospitalityProduct } from "../hospitality-data";

interface InquirySidebarProps {
  product: HospitalityProduct;
  selectedFinish: string;
}

export default function InquirySidebar({
  product,
  selectedFinish,
}: InquirySidebarProps) {
  const productTitle = product.title;
  const [name, setName] = useState("");
  const [firm, setFirm] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("Boutique Hotel");
  const [units, setUnits] = useState("1-10");
  const [timeline, setTimeline] = useState("3-6 months");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setStatus("loading");
    setTimeout(() => {
      // Create new inquiry record for B2B logs persistence
      const newInquiry = {
        id: `inq-${Date.now()}`,
        clientName: name,
        firm: firm || "Independent Architect / Designer",
        product: productTitle,
        volume: parseInt(units) || 10,
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        status: "New",
        email: email,
      };

      try {
        const saved = localStorage.getItem("sbartisan_inquiries");
        const list = saved ? JSON.parse(saved) : [
          {
            id: "inq-1",
            clientName: "Rajiv Mehta",
            firm: "Taj Hotels Group",
            product: "Haveli Reclaimed Teak Dining Chair",
            volume: 24,
            date: "June 03, 2026",
            status: "New",
            email: "r.mehta@tajhotels.com"
          },
          {
            id: "inq-2",
            clientName: "Ayesha Sen",
            firm: "Soma Wellness Retreat",
            product: "Keralite Coir Rope Daybed",
            volume: 8,
            date: "June 01, 2026",
            status: "Under Review",
            email: "ayesha@somaretreats.in"
          },
          {
            id: "inq-3",
            clientName: "Vikram Chawla",
            firm: "Bespoke Cafe Delhi",
            product: "Varanasi Silk-Rope Barstool",
            volume: 16,
            date: "May 28, 2026",
            status: "Resolved",
            email: "vikram@bespokecafe.in"
          },
          {
            id: "inq-4",
            clientName: "Priyesh Nair",
            firm: "Leela Resorts & Spas",
            product: "Dune Sand Wet-Bent Cane Lounge",
            volume: 12,
            date: "May 25, 2026",
            status: "New",
            email: "priyesh.nair@leelahotels.com"
          }
        ];
        list.unshift(newInquiry);
        localStorage.setItem("sbartisan_inquiries", JSON.stringify(list));
      } catch (err) {
        console.error("Local storage sync error", err);
      }

      setStatus("success");
      setName("");
      setFirm("");
      setEmail("");
      setNotes("");
    }, 1500);
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      `Hello SB Artisan, I am interested in seeking a trade pricing quote for the "${product.title}" in the "${selectedFinish}" finish for a hospitality project.`
    );
    window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
  };

  const handleDownloadCatalog = () => {
    const specContent = `=========================================
SB ARTISAN - TECHNICAL TEARSHEET
=========================================
Product: ${product.title}
Category: ${product.category} > ${product.subcategory}
Origin: Handcrafted in Rajasthan, India
Designer: ${product.designer}

Specifications:
- Materials: ${product.materials.join(", ")}
- Selected Finish: ${selectedFinish}
- Standard Finishes: ${product.finishes.join(", ")}

Standard Dimensions:
- Height: ${product.dimensions.height} cm
- Width: ${product.dimensions.width} cm
- Depth: ${product.dimensions.depth} cm

Hospitality Suitability:
- Commercial / High-traffic contract grade
- Jointing: Mortise & Tenon (Pinned)
- Placement: ${product.hospitalityUsage}
- 3-Year Contract Warranty

Trade Inquiry & Customization:
Contact our Trade Acquisition Desk at concierge@sbartisan.com
or via WhatsApp at +91 99999 99999 for volume orders, custom finishes,
and global shipping logistics.
`;

    const blob = new Blob([specContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sbartisan-spec-${product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border border-[#EAE5D9] bg-[#FAF8F2] p-6 md:p-8 rounded-sm space-y-6">
      <div className="space-y-2 border-b border-[#EAE5D9] pb-4">
        <span className="text-[9px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8C8273] block">
          Trade Acquisition Desk
        </span>
        <h3 className="font-serif text-lg font-light text-[#1A1A1A]">
          Request Commercial Spec
        </h3>
        <p className="font-sans text-[11px] text-[#6E6B64] font-light leading-relaxed">
          For hotels, cafes, and architects. Get export packing options, custom finishes, and trade volume pricing.
        </p>
      </div>

      {status === "success" ? (
        <div className="p-4 bg-[#F5F2EA] border border-[#EAE5D9] rounded-sm space-y-2.5 animate-fadeIn">
          <p className="font-serif text-sm text-[#1A1A1A] font-semibold">Inquiry Registered</p>
          <p className="font-sans text-xs text-[#6E6B64] font-light leading-relaxed">
            Our trade desk concierge has received your request for the <strong>"{productTitle}"</strong> in the <strong>"{selectedFinish}"</strong> finish. We will compile a custom export estimate and specification tear sheets within 1 business day.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
          {/* Contact Details */}
          <div className="space-y-3.5">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contact Person Name"
              disabled={status === "loading"}
              className="bg-transparent border-b border-[#2C2B29] pb-2 text-xs text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none focus:border-[#1A1A1A] w-full font-sans font-light transition-colors disabled:opacity-50"
            />
            <input
              type="text"
              required
              value={firm}
              onChange={(e) => setFirm(e.target.value)}
              placeholder="Design Firm / Hotel Group Name"
              disabled={status === "loading"}
              className="bg-transparent border-b border-[#2C2B29] pb-2 text-xs text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none focus:border-[#1A1A1A] w-full font-sans font-light transition-colors disabled:opacity-50"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Business Email Address"
              disabled={status === "loading"}
              className="bg-transparent border-b border-[#2C2B29] pb-2 text-xs text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none focus:border-[#1A1A1A] w-full font-sans font-light transition-colors disabled:opacity-50"
            />
          </div>

          {/* Project Type */}
          <div className="space-y-1">
            <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
              Project Class
            </label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              disabled={status === "loading"}
              className="w-full bg-transparent border-b border-[#2C2B29] py-1 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-light transition-all rounded-none"
            >
              <option value="Boutique Hotel">Boutique Hotel / Resort</option>
              <option value="Cafe / Bistro">Cafe & Bistro</option>
              <option value="Fine Dining">Fine Dining Restaurant</option>
              <option value="Residential">Private Residential Development</option>
              <option value="Workspace">Executive Workspace</option>
              <option value="Other">Other Creative Space</option>
            </select>
          </div>

          {/* Quantity and Timeline */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                Volume Needed
              </label>
              <select
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                disabled={status === "loading"}
                className="w-full bg-transparent border-b border-[#2C2B29] py-1 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-light transition-all rounded-none"
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
                className="w-full bg-transparent border-b border-[#2C2B29] py-1 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-light transition-all rounded-none"
              >
                <option value="Immediate">Under 3 Months</option>
                <option value="3-6 months">3 – 6 Months</option>
                <option value="6+ months">6+ Months</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1 pt-1">
            <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
              Bespoke Specifications / Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="E.g. Custom fabric upholstery requirements, specific wood stain requests..."
              disabled={status === "loading"}
              rows={3}
              className="w-full bg-transparent border border-[#EAE5D9] p-2 text-xs text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none focus:border-[#1A1A1A] font-sans font-light transition-colors resize-none rounded-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 bg-[#1A1A1A] hover:bg-[#8C6D4F] text-white border border-[#1A1A1A] hover:border-[#8C6D4F] text-[10px] uppercase tracking-[0.25em] font-sans font-medium transition-all duration-300 rounded-sm"
          >
            {status === "loading" ? "Registering Spec Request..." : "Request Spec Sheet & Quote"}
          </button>
        </form>
      )}

      {/* Additional Trade Actions */}
      <div className="border-t border-[#EAE5D9]/60 pt-4 mt-2 space-y-2.5">
        <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#8C8273] block text-center font-sans">
          Instant Direct Actions
        </span>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="flex items-center justify-center gap-2 py-2.5 border border-[#EAE5D9] bg-[#FAF8F2] hover:bg-[#F5F2EA] text-[#1A1A1A] text-[9px] uppercase tracking-[0.2em] font-sans font-semibold transition-all duration-300 rounded-sm"
          >
            <svg className="w-3.5 h-3.5 text-[#8C6D4F]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.116-2.887-6.98C16.584 1.897 14.11 1.867 11.47 1.867c-5.436 0-9.86 4.42-9.864 9.864 0 1.685.443 3.329 1.288 4.776L1.879 21.08l4.768-1.256c.001 0 .001 0 0 0zm11.758-5.321c-.266-.134-1.579-.78-1.823-.867-.243-.088-.42-.132-.596.133-.176.265-.681.861-.836 1.039-.153.176-.308.199-.575.066-.267-.134-1.129-.417-2.15-1.328-.793-.708-1.329-1.582-1.485-1.848-.156-.266-.017-.409.117-.541.12-.12.267-.309.4-.464.133-.155.177-.265.267-.442.089-.176.044-.331-.022-.464-.066-.133-.596-1.436-.816-1.966-.215-.518-.453-.448-.623-.456-.16-.008-.344-.01-.528-.01-.184 0-.485.069-.739.344-.254.275-.97.949-.97 2.314 0 1.365.992 2.68 1.114 2.846.122.166 1.953 2.983 4.73 4.181.661.285 1.176.455 1.579.583.664.211 1.269.181 1.747.11.533-.08 1.579-.646 1.8-.1237.221-.592.221-1.101.155-1.192-.066-.091-.243-.135-.508-.269z" />
            </svg>
            WhatsApp Inquiry
          </button>
          <button
            type="button"
            onClick={handleDownloadCatalog}
            className="flex items-center justify-center gap-2 py-2.5 border border-[#EAE5D9] bg-[#FAF8F2] hover:bg-[#F5F2EA] text-[#1A1A1A] text-[9px] uppercase tracking-[0.2em] font-sans font-semibold transition-all duration-300 rounded-sm"
          >
            <svg className="w-3.5 h-3.5 text-[#8C8273]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Catalog
          </button>
        </div>
      </div>
    </div>
  );
}
