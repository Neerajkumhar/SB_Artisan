import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Heading, SubHeading, Paragraph, SEO } from "../ui";
import { cn } from "../../lib/utils";

interface InquiryRecord {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  firm: string;
  product: string;
  category: string;
  message: string;
  date: string;
  status: "New" | "Contacted" | "Quotation Sent" | "Closed";
  notes?: string;
  volume?: number;
}

interface CargoItem {
  id: string;
  name: string;
  cbm: number;
  weight: number; // in kg
  count: number;
}

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [activeTab, setActiveTab] = useState<"enquiry" | "catalogue">("enquiry");

  // Form A: Project Enquiry State
  const [enqName, setEnqName] = useState("");
  const [enqEmail, setEnqEmail] = useState("");
  const [enqPhone, setEnqPhone] = useState("");
  const [enqFirm, setEnqFirm] = useState("");
  const [enqCountry, setEnqCountry] = useState("");
  const [enqProfession, setEnqProfession] = useState("Hotel Developer");
  const [enqVolume, setEnqVolume] = useState("20ft Container (FCL)");
  const [enqMessage, setEnqMessage] = useState("");
  const [enqStatus, setEnqStatus] = useState<"idle" | "loading" | "success">("idle");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form B: Catalogue Request State
  const [catName, setCatName] = useState("");
  const [catEmail, setCatEmail] = useState("");
  const [catFirm, setCatFirm] = useState("");
  const [catCategory, setCatCategory] = useState("Complete Trade Dossier");
  const [catWhatsApp, setCatWhatsApp] = useState("");
  const [catStatus, setCatStatus] = useState<"idle" | "loading" | "success">("idle");
  const [isGmailWarning, setIsGmailWarning] = useState(false);

  // Container Calculator State
  const [cargo, setCargo] = useState<CargoItem[]>([
    { id: "chair", name: "Dining / Side Chairs", cbm: 0.18, weight: 12, count: 0 },
    { id: "stool", name: "Bar & Counter Stools", cbm: 0.22, weight: 15, count: 0 },
    { id: "table", name: "8-Seater Dining Tables", cbm: 0.85, weight: 75, count: 0 },
    { id: "lounge", name: "Lounge Chairs / Armchairs", cbm: 0.45, weight: 25, count: 0 },
    { id: "bed", name: "King Beds / Headboards", cbm: 1.15, weight: 95, count: 0 },
    { id: "sideboard", name: "Sideboards / Buffet Cabinets", cbm: 0.75, weight: 65, count: 0 },
  ]);

  // Calculations for cargo
  const totalCbm = cargo.reduce((sum, item) => sum + item.cbm * item.count, 0);
  const totalWeight = cargo.reduce((sum, item) => sum + item.weight * item.count, 0);
  
  // Recommend container based on CBM
  let recommendedContainer = "Less than Container Load (LCL)";
  let recommendedValue = "Less than Container Load (LCL)";
  if (totalCbm === 0) {
    recommendedContainer = "No cargo selected";
    recommendedValue = "Less than Container Load (LCL)";
  } else if (totalCbm > 0 && totalCbm <= 15) {
    recommendedContainer = "Palletized Shared Space (LCL)";
    recommendedValue = "Less than Container Load (LCL)";
  } else if (totalCbm > 15 && totalCbm <= 33) {
    recommendedContainer = "20ft Ocean Container (FCL) - Best Match";
    recommendedValue = "20ft Container (FCL)";
  } else if (totalCbm > 33 && totalCbm <= 76) {
    recommendedContainer = "40ft High-Cube Container (FCL) - Best Match";
    recommendedValue = "40ft Container (FCL)";
  } else {
    recommendedContainer = "Multi-Container Contract Loading Program";
    recommendedValue = "Multi-Container Project";
  }

  const handleUpdateCargoCount = (id: string, delta: number) => {
    setCargo(prev =>
      prev.map(item =>
        item.id === id ? { ...item, count: Math.max(0, item.count + delta) } : item
      )
    );
  };

  const handleApplyCargoToForm = () => {
    if (totalCbm === 0) {
      triggerToast("Please add items to the estimator first.");
      return;
    }
    
    // Switch tab
    setActiveTab("enquiry");
    
    // Set recommended volume
    setEnqVolume(recommendedValue);
    
    // Format message
    const cargoDetails = cargo
      .filter(item => item.count > 0)
      .map(item => `  - ${item.name}: ${item.count} unit(s) (${(item.cbm * item.count).toFixed(2)} CBM)`)
      .join("\n");
      
    const messageTemplate = `Project Scope Specifications:
Estimator Cargo Mix:
${cargoDetails}
----------------------------------------
Total Calculated Volume: ${totalCbm.toFixed(2)} CBM
Estimated Net Weight: ${totalWeight.toLocaleString()} kg
Recommended Shipping Method: ${recommendedContainer}

Please provide a custom manufacturing quote for the above layout, detailing lead times and freight options.`;
    
    setEnqMessage(messageTemplate);
    triggerToast("Cargo configuration applied to enquiry form! Scroll down to submit.");
    
    // Scroll to forms
    const formsElement = document.getElementById("contact-forms-anchor");
    if (formsElement) {
      formsElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Corporate email warning check
  const handleCatEmailChange = (val: string) => {
    setCatEmail(val);
    const personalDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "aol.com", "mail.com"];
    const domain = val.split("@")[1]?.toLowerCase();
    if (domain && personalDomains.includes(domain)) {
      setIsGmailWarning(true);
    } else {
      setIsGmailWarning(false);
    }
  };

  // Submit Handler for Project Enquiry
  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enqName || !enqEmail || !enqMessage) return;

    setEnqStatus("loading");

    setTimeout(() => {
      let numericVolume = 1;
      if (enqVolume.includes("20ft")) numericVolume = 20;
      else if (enqVolume.includes("40ft")) numericVolume = 40;
      else if (enqVolume.includes("Multi")) numericVolume = 80;

      const newInquiry: InquiryRecord = {
        id: `inq-${Date.now()}`,
        clientName: enqName,
        email: enqEmail,
        phone: enqPhone || "Not Provided",
        firm: enqFirm || "Independent Buyer",
        product: `B2B Project Inquiry (${enqProfession})`,
        category: "Hospitality Furniture",
        message: `[Country: ${enqCountry || "N/A"}] [Volume Requirement: ${enqVolume}] Message: ${enqMessage}`,
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        status: "New",
        volume: numericVolume,
      };

      saveInquiryToLocalStorage(newInquiry);
      setEnqStatus("success");
    }, 1200);
  };

  // Submit Handler for Catalogue Request
  const handleCatalogueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName || !catEmail) return;

    setCatStatus("loading");

    setTimeout(() => {
      const newInquiry: InquiryRecord = {
        id: `inq-${Date.now()}`,
        clientName: catName,
        email: catEmail,
        phone: catWhatsApp || "Not Provided",
        firm: catFirm || "Independent Designer",
        product: `Catalogue Request: ${catCategory}`,
        category: "Catalogue Request",
        message: `WhatsApp Delivery Request Sent. Preferred Catalog: ${catCategory}. Client Email Verified: ${catEmail}.`,
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        status: "New",
        volume: 1,
      };

      saveInquiryToLocalStorage(newInquiry);
      setCatStatus("success");
    }, 1200);
  };

  const saveInquiryToLocalStorage = (newRecord: InquiryRecord) => {
    try {
      const saved = localStorage.getItem("sbartisan_inquiries");
      const list = saved ? JSON.parse(saved) : [];
      list.unshift(newRecord);
      localStorage.setItem("sbartisan_inquiries", JSON.stringify(list));
    } catch (err) {
      console.error("Failed to sync inquiry to local storage", err);
    }
  };

  // WhatsApp click handlers with pre-filled department messages
  const launchWhatsApp = (department: "rfq" | "production" | "logistics") => {
    let text = "";
    if (department === "rfq") {
      text = "Hello SB Artisan, I am seeking a custom CAD drawing approval and manufacturing bid for an upcoming B2B contract project.";
    } else if (department === "production") {
      text = "Hello SB Artisan, I would like to request a production status report and progress images for our active furniture orders.";
    } else {
      text = "Hello SB Artisan, I want to check shipping transit schedules, container loading capacities, and certificate files (FSC/fumigation).";
    }
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/919999999999?text=${encoded}`, "_blank");
  };

  // B2B FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    {
      q: "What is your Minimum Order Quantity (MOQ) for international container exports?",
      a: "Our standard export MOQ is one 20ft container (approx. 28-33 CBM). We allow client to mix up to 6 different catalog designs to construct a balanced import container. Small batch LCL/pallet loads are processed on a case-by-case basis for high-end hospitality designs."
    },
    {
      q: "Can we submit custom shop drawings, or do you offer OEM/ODM services?",
      a: "Yes. Over 70% of our production is fully customized OEM contract furniture. We have an in-house drafting desk using AutoCAD and SolidWorks. We submit precise 2D shop drawings, joinery cutaways, and physical wood finish blocks to procurement agents for approval prior to raw saw cutting."
    },
    {
      q: "How do you guarantee wood moisture stability in cold, dry climates (e.g. US, Northern Europe)?",
      a: "Jodhpur is famous for its seasoned solid wood. We operate heavy-duty vacuum drying chambers that reduce wood moisture levels to a stabilized 8-12%. Every joint is reinforced with tension-relief cuts and tongue-and-groove joinery, shielding our furniture from cracking or twisting in low-humidity zones."
    },
    {
      q: "What certifications do your lumber and factory hold?",
      a: "We are committed to legal harvesting and trade ethics. Our factory operates under the Forest Stewardship Council (FSC) Certification, EPA TSCA Title VI compliance, and the Indian Vriksh Timber Legality Assessment. We are also active members of EPCH (Export Promotion Council for Handicrafts)."
    },
    {
      q: "What are your standard payment terms and shipping transit times?",
      a: "Our payment terms are T/T (30% deposit to initiate shop drawings, 70% balance against scanning of Original Bill of Lading) or Irrevocable Letter of Credit (L/C) at sight. Shipping lead times range between 8 to 11 weeks for manufacturing, with an extra 20-30 days ocean transit depending on destination ports."
    }
  ];

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SB Artisan Jodhpur Factory",
    "image": "https://www.sbartisan.com/images/commercial_workshop_custom.png",
    "telephone": "+91-291-274-0801",
    "email": "export@sbartisan.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Phase II, Basni Industrial Area",
      "addressLocality": "Jodhpur",
      "addressRegion": "Rajasthan",
      "postalCode": "342005",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "26.2358",
      "longitude": "73.0033"
    },
    "url": "https://www.sbartisan.com/contact"
  };

  return (
    <div className="bg-[#FDFCF7] pt-24 pb-20 selection:bg-[#EAE5D9] text-[#1A1A1A] font-sans antialiased overflow-x-hidden">
      <SEO 
        title="Jodhpur Factory Export & Sourcing Coordinates"
        description="Contact our Jodhpur furniture manufacturing plant coordinates directly. Speak to our custom RFQ, quality control, or container logistics desks."
        keywords="contact furniture manufacturer Jodhpur, Jodhpur factory export coordinates, furniture wholesale Jodhpur, custom design RFQ India"
        canonical="/contact"
        schema={contactSchema}
      />
      
      {/* Dynamic Action Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-[#FAF8F2] text-xs px-6 py-4 rounded-sm shadow-xl z-50 flex items-center gap-3 border border-[#8C6D4F]/30"
          >
            <svg className="w-4 h-4 text-[#8C6D4F] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO BRAND BANNER */}
      <section className="pt-24 pb-10 bg-white">
        <Container variant="default">
          <a 
            href="https://wa.me/919999999999?text=Hello%20SB%20Artisan%2C%20I%20would%20like%20to%20consult%20about%20customizing%20furniture%20for%20my%20project."
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
        </Container>
      </section>

      {/* 2. DYNAMIC B2B ESTIMATOR & LEAD MAGNET (LUXURY CHARCOAL LAYOUT) */}
      <section className="py-20 bg-[#0F0E0D] text-[#EAE5D9] relative border-b border-[#2C2B29]">
        <Container variant="default" className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#8C6D4F] block">
                CARGO OPTIMIZER
              </span>
              <Heading variant="display" size="sm" weight="light" className="text-white leading-tight">
                Container Volume & Load Estimator
              </Heading>
              <Paragraph variant="md" className="text-[#9E9B95] font-light leading-relaxed">
                International shipping efficiency requires dense loading coordinates. Use our interactive estimator to compute the approximate volume (CBM) of your trade mix and immediately map it into a container request.
              </Paragraph>
              
              <div className="bg-[#1E1D1B] border border-[#2C2B29] p-6 rounded-sm space-y-5">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-[#8C8273]">Total Calculated Volume</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif text-[#8C6D4F] font-light">
                      {totalCbm.toFixed(2)}
                    </span>
                    <span className="text-xs text-[#9E9B95] font-light">Cubic Meters (CBM)</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-[#8C8273]">Estimated Gross Weight</span>
                  <div className="text-lg font-light text-white">
                    {totalWeight.toLocaleString()} <span className="text-xs text-[#8C8273]">KG</span>
                  </div>
                </div>

                {/* Progress Visualizer for 20ft (33 CBM) & 40ft HC (76 CBM) */}
                <div className="space-y-4 pt-2 border-t border-[#2C2B29]">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-white">20ft Dry Cargo FCL (33 CBM Limit)</span>
                      <span className={totalCbm > 33 ? "text-red-400" : "text-[#8C6D4F]"}>
                        {Math.min(100, Math.round((totalCbm / 33) * 100))}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#2C2B29] rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full transition-all duration-500 ease-out rounded-full",
                          totalCbm > 33 ? "bg-red-400" : "bg-[#8C6D4F]"
                        )}
                        style={{ width: `${Math.min(100, (totalCbm / 33) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-white">40ft High-Cube FCL (76 CBM Limit)</span>
                      <span className={totalCbm > 76 ? "text-red-400" : "text-[#8C6D4F]"}>
                        {Math.min(100, Math.round((totalCbm / 76) * 100))}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#2C2B29] rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full transition-all duration-500 ease-out rounded-full",
                          totalCbm > 76 ? "bg-red-400" : "bg-[#8C6D4F]"
                        )}
                        style={{ width: `${Math.min(100, (totalCbm / 76) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[11px] font-mono text-[#8C8273] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span>Recommendation: <strong className="text-white font-normal">{recommendedContainer}</strong></span>
                </div>

                <button
                  onClick={handleApplyCargoToForm}
                  className="w-full py-3 bg-[#8C6D4F] hover:bg-[#A3927B] text-[#0F0E0D] hover:text-[#0F0E0D] text-[10px] font-semibold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Apply cargo mix to form
                </button>
              </div>
            </div>

            {/* Right Estimator Slider Cards */}
            <div className="lg:col-span-7 bg-[#1E1D1B] border border-[#2C2B29] p-6 sm:p-8 rounded-sm shadow-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-[#2C2B29] pb-4">
                <span className="text-xs uppercase tracking-widest text-[#8C8273] font-medium font-mono">PRODUCT SPECIMENS</span>
                <span className="text-[10px] text-[#8C6D4F] font-mono">Select estimates below</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                {cargo.map(item => (
                  <div 
                    key={item.id} 
                    className="border border-[#2C2B29] bg-[#121211] p-4 rounded-sm flex flex-col justify-between space-y-3 hover:border-[#8C6D4F]/50 transition-all duration-300"
                  >
                    <div>
                      <h4 className="font-serif text-sm font-light text-white leading-tight">{item.name}</h4>
                      <p className="text-[10px] text-[#8C8273] font-mono mt-1">
                        Est. Volume: {item.cbm.toFixed(2)} CBM | Weight: {item.weight} kg
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#2C2B29]/60">
                      <span className="text-[10px] font-mono text-[#8C6D4F]">Quantity</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleUpdateCargoCount(item.id, -5)}
                          className="w-6 h-6 border border-[#2C2B29] hover:border-[#8C6D4F] rounded-full text-xs flex items-center justify-center text-[#8C8273] hover:text-white transition-colors duration-200 outline-none"
                        >
                          -5
                        </button>
                        <button
                          onClick={() => handleUpdateCargoCount(item.id, -1)}
                          className="w-6 h-6 border border-[#2C2B29] hover:border-[#8C6D4F] rounded-full text-xs flex items-center justify-center text-[#8C8273] hover:text-white transition-colors duration-200 outline-none"
                        >
                          -1
                        </button>
                        <span className="w-8 text-center text-sm font-mono font-bold text-white">
                          {item.count}
                        </span>
                        <button
                          onClick={() => handleUpdateCargoCount(item.id, 1)}
                          className="w-6 h-6 border border-[#2C2B29] hover:border-[#8C6D4F] rounded-full text-xs flex items-center justify-center text-[#8C8273] hover:text-white transition-colors duration-200 outline-none"
                        >
                          +1
                        </button>
                        <button
                          onClick={() => handleUpdateCargoCount(item.id, 5)}
                          className="w-6 h-6 border border-[#2C2B29] hover:border-[#8C6D4F] rounded-full text-xs flex items-center justify-center text-[#8C8273] hover:text-white transition-colors duration-200 outline-none"
                        >
                          +5
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[10px] text-[#8C8273] font-light leading-relaxed font-mono flex items-start gap-2">
                <svg className="w-4 h-4 text-[#8C6D4F] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Estimated volumes include general packing margins. Actual container loading layout will be mathematically approved via factory software.</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. FACTORY PROFILE SHOWCASE */}
      <section className="py-20 bg-[#FAF8F2] border-b border-[#F2EDE2]">
        <Container variant="default" className="space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Visual Factory Floor */}
            <div className="lg:col-span-6 space-y-6">
              <div className="relative border border-[#EAE5D9] rounded-sm overflow-hidden bg-white group shadow-sm">
                <img
                  src="/images/commercial_workshop_custom.png"
                  alt="SB Artisan Jodhpur Production Hub Floor"
                  className="w-full h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[9px] uppercase tracking-widest text-[#8C6D4F] font-mono">Basni Industrial Estate</span>
                  <h3 className="font-serif text-lg font-light tracking-wide mt-1">Jodhpur Production Headquarters</h3>
                  <p className="text-[11px] text-gray-300 font-light mt-1 max-w-md">
                    Integrated logs wood seasoning kilns, carpentry workshops, polishing facilities, and secure container crating bays.
                  </p>
                </div>
              </div>

              {/* Technical Certifications */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#FDFCF7] border border-[#EAE5D9] p-3 rounded-sm text-center">
                  <span className="block text-xs font-serif text-[#1A1A1A]">FSC® Cert</span>
                  <span className="text-[8px] text-[#8C8273] font-mono uppercase tracking-wider block mt-1">Sustainable Wood</span>
                </div>
                <div className="bg-[#FDFCF7] border border-[#EAE5D9] p-3 rounded-sm text-center">
                  <span className="block text-xs font-serif text-[#1A1A1A]">Vriksh compliant</span>
                  <span className="text-[8px] text-[#8C8273] font-mono uppercase tracking-wider block mt-1">Forest Legality</span>
                </div>
                <div className="bg-[#FDFCF7] border border-[#EAE5D9] p-3 rounded-sm text-center">
                  <span className="block text-xs font-serif text-[#1A1A1A]">ISO 9001:2015</span>
                  <span className="text-[8px] text-[#8C8273] font-mono uppercase tracking-wider block mt-1">Quality Standards</span>
                </div>
                <div className="bg-[#FDFCF7] border border-[#EAE5D9] p-3 rounded-sm text-center">
                  <span className="block text-xs font-serif text-[#1A1A1A]">EPCH Member</span>
                  <span className="text-[8px] text-[#8C8273] font-mono uppercase tracking-wider block mt-1">Craft Council</span>
                </div>
              </div>
            </div>

            {/* Right Column: Factory Specs & Moisture Control */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#8C6D4F] block">
                  MANUFACTURING METRICS
                </span>
                <Heading variant="display" size="sm" weight="light" className="text-[#1A1A1A]">
                  Built For Global Destination Specs
                </Heading>
                <div className="w-12 h-[1.5px] bg-[#8C6D4F]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D4F]" />
                    <h4 className="font-serif text-sm font-light text-[#1A1A1A]">45,000 SQ FT Facility</h4>
                  </div>
                  <p className="text-xs text-[#5A5751] font-light leading-relaxed">
                    Houses fully segregated sawmill sections, structural sanders, joint routing machinery, and double-insulated lacquer bays to support commercial contracts.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D4F]" />
                    <h4 className="font-serif text-sm font-light text-[#1A1A1A]">Moisture Kiln Control</h4>
                  </div>
                  <p className="text-xs text-[#5A5751] font-light leading-relaxed">
                    20,000 cubic feet timber kiln capacity ensuring lumber relative humidity is lowered to 8-12% preventing cracking in heated spaces.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D4F]" />
                    <h4 className="font-serif text-sm font-light text-[#1A1A1A]">40 Container Monthly Volume</h4>
                  </div>
                  <p className="text-xs text-[#5A5751] font-light leading-relaxed">
                    Highly scalable production capacity, structured cargo workflows, phytosanitary treatment clearances, and certified fumigation processes.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D4F]" />
                    <h4 className="font-serif text-sm font-light text-[#1A1A1A]">ICD Dry Port Transit</h4>
                  </div>
                  <p className="text-xs text-[#5A5751] font-light leading-relaxed">
                    Fast access via Jodhpur Inland Container Depot directly linked to Mundra/Kandla sea ports in 48 hours, keeping logistics highly coordinated.
                  </p>
                </div>
              </div>

              {/* Timber Species Profiles */}
              <div className="p-5 border border-[#EAE5D9] bg-[#FDFCF7] rounded-sm space-y-3">
                <span className="text-[9px] uppercase tracking-widest text-[#8C8273] font-mono block">WOOD SPECIES PROFILES</span>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] bg-[#FAF8F2] border border-[#EAE5D9] px-2 py-1 text-[#1A1A1A] rounded-xs font-mono">Premium Indian Teak</span>
                  <span className="text-[10px] bg-[#FAF8F2] border border-[#EAE5D9] px-2 py-1 text-[#1A1A1A] rounded-xs font-mono">Acacia Wood</span>
                  <span className="text-[10px] bg-[#FAF8F2] border border-[#EAE5D9] px-2 py-1 text-[#1A1A1A] rounded-xs font-mono">Sheesham (Indian Rosewood)</span>
                  <span className="text-[10px] bg-[#FAF8F2] border border-[#EAE5D9] px-2 py-1 text-[#1A1A1A] rounded-xs font-mono">Mango Timber</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3.5 WHY CUSTOMIZE WITH US VALUE PROPS */}
      <section className="py-20 bg-[#FAF8F2] border-b border-[#F2EDE2]">
        <Container variant="default">
          <div className="overflow-hidden rounded-sm border border-[#EAE5D9] shadow-sm bg-white">
            <img 
              src="/images/whatsapp_contact_cards.jpg" 
              alt="Customization advantages: Hassle-Free, Priced on Budget, Easy Progress Tracking, After-Sales Guarantee" 
              className="w-full h-auto object-cover select-none"
            />
          </div>
        </Container>
      </section>

      {/* 4. DUAL WHATSAPP CONCIERGE & CHANNELS */}
      <section className="py-20 border-b border-[#F2EDE2]">
        <Container variant="default" className="space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#8C6D4F] block">
              REAL-TIME COLLABORATION
            </span>
            <Heading variant="display" size="sm" weight="light" className="text-[#1A1A1A] leading-tight">
              Direct Trade Desk & Department Channels
            </Heading>
            <Paragraph variant="md" className="text-[#5A5751] font-light max-w-xl">
              Connect directly with our specialized factory units. Select a channel below to initiate a WhatsApp workspace conversation with pre-loaded context templates.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Channel A: Pre-Contract / Quotes */}
            <div className="border border-[#EAE5D9] bg-[#FAF8F2] hover:bg-white p-6 rounded-sm flex flex-col justify-between space-y-6 transition-all duration-300 hover:shadow-md hover:border-[#8C6D4F]/30">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-[#8C6D4F]/10 text-[#8C6D4F] flex items-center justify-center rounded-xs">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h4 className="font-serif text-base text-[#1A1A1A] font-light">Custom RFQ & CAD Desk</h4>
                <p className="text-xs text-[#5A5751] font-light leading-relaxed">
                  Submit shop drawings, custom hotel layouts, wood finishing specifications, and requests for wholesale trade discounts.
                </p>
              </div>

              <button
                onClick={() => launchWhatsApp("rfq")}
                className="w-full py-3 border border-[#8C6D4F] hover:bg-[#8C6D4F] hover:text-white text-[#8C6D4F] text-[10px] font-semibold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.457 3.473 1.332 4.99L2 22l5.176-1.357a9.92 9.92 0 004.836 1.258h.005c5.506 0 9.987-4.482 9.987-9.988C22 6.482 17.518 2 12.012 2zm5.776 14.156c-.246.696-1.43 1.31-1.956 1.396-.477.078-1.096.148-3.176-.71-2.656-1.096-4.366-3.79-4.5-3.966-.13-.178-1.066-1.423-1.066-2.715 0-1.29.673-1.922.91-2.184.24-.262.527-.328.706-.328.178 0 .356.006.51.012.164.006.386-.062.604.46.224.536.76 1.86.826 1.996.066.136.108.296.018.476-.09.18-.178.29-.356.5-.178.21-.376.47-.536.63-.178.178-.366.372-.158.73.208.358.924 1.524 1.98 2.466 1.362 1.214 2.51 1.592 2.868 1.772.358.18.564.15.774-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.32.12 2.03.956 2.38 1.126.35.17.584.254.67.4.086.148.086.852-.16 1.548z" />
                </svg>
                Chat custom specs
              </button>
            </div>

            {/* Channel B: Production & QC */}
            <div className="border border-[#EAE5D9] bg-[#FAF8F2] hover:bg-white p-6 rounded-sm flex flex-col justify-between space-y-6 transition-all duration-300 hover:shadow-md hover:border-[#8C6D4F]/30">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-[#8C6D4F]/10 text-[#8C6D4F] flex items-center justify-center rounded-xs">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
                </div>
                <h4 className="font-serif text-base text-[#1A1A1A] font-light">QC & Production Desk</h4>
                <p className="text-xs text-[#5A5751] font-light leading-relaxed">
                  Monitor work-in-progress. Request weekly manufacturing photos, seasoning graphs, raw structure inspections, and finish reports.
                </p>
              </div>

              <button
                onClick={() => launchWhatsApp("production")}
                className="w-full py-3 border border-[#8C6D4F] hover:bg-[#8C6D4F] hover:text-white text-[#8C6D4F] text-[10px] font-semibold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.457 3.473 1.332 4.99L2 22l5.176-1.357a9.92 9.92 0 004.836 1.258h.005c5.506 0 9.987-4.482 9.987-9.988C22 6.482 17.518 2 12.012 2zm5.776 14.156c-.246.696-1.43 1.31-1.956 1.396-.477.078-1.096.148-3.176-.71-2.656-1.096-4.366-3.79-4.5-3.966-.13-.178-1.066-1.423-1.066-2.715 0-1.29.673-1.922.91-2.184.24-.262.527-.328.706-.328.178 0 .356.006.51.012.164.006.386-.062.604.46.224.536.76 1.86.826 1.996.066.136.108.296.018.476-.09.18-.178.29-.356.5-.178.21-.376.47-.536.63-.178.178-.366.372-.158.73.208.358.924 1.524 1.98 2.466 1.362 1.214 2.51 1.592 2.868 1.772.358.18.564.15.774-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.32.12 2.03.956 2.38 1.126.35.17.584.254.67.4.086.148.086.852-.16 1.548z" />
                </svg>
                Request order photos
              </button>
            </div>

            {/* Channel C: Logistics */}
            <div className="border border-[#EAE5D9] bg-[#FAF8F2] hover:bg-white p-6 rounded-sm flex flex-col justify-between space-y-6 transition-all duration-300 hover:shadow-md hover:border-[#8C6D4F]/30">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-[#8C6D4F]/10 text-[#8C6D4F] flex items-center justify-center rounded-xs">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.321-5.128a1.13 1.13 0 00-1.09-1.053H14.5a1.13 1.13 0 00-1.092.839l-.35 1.112m-.073 5.352a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H9.75M12 10.5V1.875c0-.621-.504-1.125-1.125-1.125H8.25m0 0a1.5 1.5 0 013 0m-3 0a1.5 1.5 0 003 0m-9 7.375h9.75M3 10.5h18" />
                  </svg>
                </div>
                <h4 className="font-serif text-base text-[#1A1A1A] font-light">Logistics & Shipping Desk</h4>
                <p className="text-xs text-[#5A5751] font-light leading-relaxed">
                  Query ocean freight rates, coordinate port deliveries, request packing certificates, customs paperwork, and fumigation papers.
                </p>
              </div>

              <button
                onClick={() => launchWhatsApp("logistics")}
                className="w-full py-3 border border-[#8C6D4F] hover:bg-[#8C6D4F] hover:text-white text-[#8C6D4F] text-[10px] font-semibold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.457 3.473 1.332 4.99L2 22l5.176-1.357a9.92 9.92 0 004.836 1.258h.005c5.506 0 9.987-4.482 9.987-9.988C22 6.482 17.518 2 12.012 2zm5.776 14.156c-.246.696-1.43 1.31-1.956 1.396-.477.078-1.096.148-3.176-.71-2.656-1.096-4.366-3.79-4.5-3.966-.13-.178-1.066-1.423-1.066-2.715 0-1.29.673-1.922.91-2.184.24-.262.527-.328.706-.328.178 0 .356.006.51.012.164.006.386-.062.604.46.224.536.76 1.86.826 1.996.066.136.108.296.018.476-.09.18-.178.29-.356.5-.178.21-.376.47-.536.63-.178.178-.366.372-.158.73.208.358.924 1.524 1.98 2.466 1.362 1.214 2.51 1.592 2.868 1.772.358.18.564.15.774-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.32.12 2.03.956 2.38 1.126.35.17.584.254.67.4.086.148.086.852-.16 1.548z" />
                </svg>
                Track shipping details
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. DUAL FORMS SECTION (MAIN ACTION ANCHOR) */}
      <section id="contact-forms-anchor" className="py-20 bg-[#FAF8F2]">
        <Container variant="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#8C6D4F] block">OFFICE COORDINATES</span>
                <Heading variant="display" size="sm" weight="light" className="text-[#1A1A1A]">
                  Global HQ & Showroom
                </Heading>
                <div className="w-12 h-[1.5px] bg-[#8C6D4F]" />
              </div>

              {/* Contact Information Details */}
              <div className="space-y-6 font-sans text-xs text-[#5A5751] font-light leading-relaxed">
                <div>
                  <span className="block text-[8px] uppercase tracking-widest text-[#8C8273] font-semibold font-mono">GENERAL ENQUIRIES & CONTRACT BIDDING</span>
                  <a href="mailto:export@sbartisan.com" className="text-sm font-serif text-[#1A1A1A] hover:text-[#8C6D4F] transition-colors duration-200">
                    export@sbartisan.com
                  </a>
                </div>
                <div>
                  <span className="block text-[8px] uppercase tracking-widest text-[#8C8273] font-semibold font-mono">HEAD OFFICE LINE</span>
                  <p className="text-sm font-serif text-[#1A1A1A] font-light">+91 (291) 274-0801</p>
                </div>
                <div>
                  <span className="block text-[8px] uppercase tracking-widest text-[#8C8273] font-semibold font-mono">FACTORY WORKSHOP ADDRESS</span>
                  <p className="text-sm text-[#1A1A1A] font-light leading-snug">
                    SB Artisan, Phase II, Basni Industrial Area,<br />
                    Jodhpur, Rajasthan 342005, India
                  </p>
                </div>
              </div>

              {/* Styled Mock Google Map Iframe pointing to Jodhpur basni */}
              <div className="space-y-2 pt-2">
                <span className="block text-[8px] uppercase tracking-widest text-[#8C8273] font-semibold font-mono">SHOWROOM COORDINATES</span>
                <div className="relative w-full h-[250px] border border-[#EAE5D9] rounded-sm overflow-hidden bg-[#F2EDE2]">
                  <iframe
                    title="SB Artisan Jodhpur Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d14309.288219460592!2d73.00331008678589!3d26.23577322961819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c39ab3e1b7d%3A0xe21287847de48bc2!2sBasni%2C%20Jodhpur%2C%20Rajasthan%20342005!5e0!3m2!1sen!2sin!4v1717658092000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "grayscale(1) contrast(1.1) brightness(0.95)" }}
                    allowFullScreen={false}
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 right-2 bg-[#FAF8F2]/90 backdrop-blur-xs border border-[#EAE5D9] px-2.5 py-1 text-[9px] font-mono text-[#8C8273] tracking-wider uppercase rounded-xs">
                    26.2358° N, 73.0033° E
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Component */}
            <div className="lg:col-span-7 bg-[#FDFCF7] border border-[#EAE5D9] p-6 sm:p-10 rounded-sm shadow-xl relative">
              
              {/* Form Tabs */}
              <div className="flex border-b border-[#EAE5D9] pb-4 mb-8">
                <button
                  onClick={() => {
                    setActiveTab("enquiry");
                  }}
                  className={cn(
                    "flex-1 pb-2 text-[10px] uppercase tracking-[0.2em] font-medium text-center border-b transition-all duration-300 outline-none font-mono",
                    activeTab === "enquiry"
                      ? "border-[#1A1A1A] text-[#1A1A1A] font-semibold"
                      : "border-transparent text-[#8C8273] hover:text-[#1A1A1A]"
                  )}
                >
                  Export Project Enquiry
                </button>
                <button
                  onClick={() => {
                    setActiveTab("catalogue");
                  }}
                  className={cn(
                    "flex-1 pb-2 text-[10px] uppercase tracking-[0.2em] font-medium text-center border-b transition-all duration-300 outline-none font-mono",
                    activeTab === "catalogue"
                      ? "border-[#1A1A1A] text-[#1A1A1A] font-semibold"
                      : "border-transparent text-[#8C8273] hover:text-[#1A1A1A]"
                  )}
                >
                  Request Trade Catalogue
                </button>
              </div>

              {/* Tab Content panels */}
              <AnimatePresence mode="wait">
                
                {/* 1. PROJECT ENQUIRY */}
                {activeTab === "enquiry" && (
                  <motion.div
                    key="enquiry-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    {enqStatus === "success" ? (
                      <div className="py-12 px-6 text-center space-y-5 bg-[#FAF8F2] border border-[#EAE5D9] rounded-sm">
                        <svg className="w-12 h-12 text-[#8C6D4F] mx-auto" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                        </svg>
                        <h4 className="font-serif text-lg font-light text-[#1A1A1A]">Project Dossier Registered</h4>
                        <p className="text-xs text-[#5A5751] font-light leading-relaxed max-w-md mx-auto">
                          Thank you for contacting the SB Artisan Export desk. A container logistics specialist has been assigned to your file. We will review your project specs and respond within 24 business hours.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleEnquirySubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-mono">
                              Contact Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={enqName}
                              onChange={(e) => setEnqName(e.target.value)}
                              disabled={enqStatus === "loading"}
                              className="w-full bg-transparent border-b border-[#2C2B29]/30 py-2 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8C6D4F] font-light font-sans transition-all duration-300"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-mono">
                              Business Email *
                            </label>
                            <input
                              type="email"
                              required
                              value={enqEmail}
                              onChange={(e) => setEnqEmail(e.target.value)}
                              disabled={enqStatus === "loading"}
                              placeholder="you@company.com"
                              className="w-full bg-transparent border-b border-[#2C2B29]/30 py-2 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8C6D4F] font-light font-sans transition-all duration-300"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-mono">
                              WhatsApp / Phone (Include Country Code)
                            </label>
                            <input
                              type="tel"
                              value={enqPhone}
                              onChange={(e) => setEnqPhone(e.target.value)}
                              disabled={enqStatus === "loading"}
                              placeholder="+1 (555) 019-2834"
                              className="w-full bg-transparent border-b border-[#2C2B29]/30 py-2 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8C6D4F] font-light font-sans transition-all duration-300"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-mono">
                              Company / Design Firm Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={enqFirm}
                              onChange={(e) => setEnqFirm(e.target.value)}
                              disabled={enqStatus === "loading"}
                              className="w-full bg-transparent border-b border-[#2C2B29]/30 py-2 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8C6D4F] font-light font-sans transition-all duration-300"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-mono">
                              Destination Country *
                            </label>
                            <input
                              type="text"
                              required
                              value={enqCountry}
                              onChange={(e) => setEnqCountry(e.target.value)}
                              disabled={enqStatus === "loading"}
                              placeholder="e.g., United States, UAE, UK"
                              className="w-full bg-transparent border-b border-[#2C2B29]/30 py-2 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8C6D4F] font-light font-sans transition-all duration-300"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-mono">
                              Professional Profile *
                            </label>
                            <select
                              value={enqProfession}
                              onChange={(e) => setEnqProfession(e.target.value)}
                              disabled={enqStatus === "loading"}
                              className="w-full bg-transparent border-b border-[#2C2B29]/30 py-2 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8C6D4F] font-light font-sans cursor-pointer transition-all duration-300"
                            >
                              <option value="Hotel Developer">Hotel Developer / Owner</option>
                              <option value="Procurement Agent">FF&E Procurement Agent</option>
                              <option value="Interior Designer">Hospitality Architect / Designer</option>
                              <option value="Furniture Importer">Furniture Wholesaler / Importer</option>
                              <option value="Retail Brand Buyer">Retail Brand Sourcing Director</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-mono">
                            Estimated Cargo Volume *
                          </label>
                          <select
                            value={enqVolume}
                            onChange={(e) => setEnqVolume(e.target.value)}
                            disabled={enqStatus === "loading"}
                            className="w-full bg-transparent border-b border-[#2C2B29]/30 py-2 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8C6D4F] font-light font-sans cursor-pointer transition-all duration-300"
                          >
                            <option value="Less than Container Load (LCL)">Less than Container Load (LCL / Pallets)</option>
                            <option value="20ft Container (FCL)">20ft Ocean Container (FCL - 33 CBM)</option>
                            <option value="40ft Container (FCL)">40ft High-Cube Ocean Container (FCL - 76 CBM)</option>
                            <option value="Multi-Container Project">Multi-Container Contract Program</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-mono">
                            Project Brief & Material Specifications *
                          </label>
                          <textarea
                            rows={5}
                            required
                            value={enqMessage}
                            onChange={(e) => setEnqMessage(e.target.value)}
                            disabled={enqStatus === "loading"}
                            placeholder="Describe custom dimension parameters, wood choice preferences (Teak, Acacia, Mango), steel details, quantities, and target shipping schedule..."
                            className="w-full bg-transparent border border-[#2C2B29]/20 p-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8C6D4F] font-light font-sans resize-none transition-all duration-300 rounded-xs bg-[#FAF8F2]/30"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={enqStatus === "loading"}
                          className="w-full py-4 text-[10px] uppercase tracking-[0.25em] font-sans font-medium transition-all duration-300 rounded-sm border bg-[#1A1A1A] text-white border-[#1A1A1A] hover:bg-transparent hover:text-[#1A1A1A] disabled:bg-[#8C8273] cursor-pointer"
                        >
                          {enqStatus === "loading" ? "Registering Export Dossier..." : "Submit Project RFP"}
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}

                {/* 2. CATALOGUE REQUEST */}
                {activeTab === "catalogue" && (
                  <motion.div
                    key="catalogue-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    {catStatus === "success" ? (
                      <div className="py-12 px-6 text-center space-y-5 bg-[#FAF8F2] border border-[#EAE5D9] rounded-sm">
                        <svg className="w-12 h-12 text-[#8C6D4F] mx-auto" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h4 className="font-serif text-lg font-light text-[#1A1A1A]">Catalogue Verification Granted</h4>
                        <p className="text-xs text-[#5A5751] font-light leading-relaxed max-w-sm mx-auto">
                          Your trade status has been validated. You can access our digital high-res collection catalogs using the button below. A copy has also been sent to your registered WhatsApp.
                        </p>
                        <div className="pt-2">
                          <button
                            onClick={() => {
                              alert("Simulating PDF download: sb_artisan_export_dossier.pdf (42 MB). Under actual production environments this triggers file download.");
                            }}
                            className="inline-block font-sans text-[9px] uppercase tracking-[0.2em] font-medium py-3 px-6 bg-[#8C6D4F] hover:bg-[#1A1A1A] text-white transition-all duration-300 rounded-sm cursor-pointer"
                          >
                            Download Catalogue Dossier (PDF)
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleCatalogueSubmit} className="space-y-6">
                        <div className="space-y-1">
                          <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-mono">
                            Client Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={catName}
                            onChange={(e) => setCatName(e.target.value)}
                            disabled={catStatus === "loading"}
                            className="w-full bg-transparent border-b border-[#2C2B29]/30 py-2 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8C6D4F] font-light font-sans transition-all duration-300"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-baseline">
                            <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-mono">
                              Corporate Email Address *
                            </label>
                            {isGmailWarning && (
                              <span className="text-[9px] text-[#8C6D4F] font-mono italic animate-pulse">
                                Requires corporate domain
                              </span>
                            )}
                          </div>
                          <input
                            type="email"
                            required
                            value={catEmail}
                            onChange={(e) => handleCatEmailChange(e.target.value)}
                            disabled={catStatus === "loading"}
                            placeholder="name@firmname.com"
                            className="w-full bg-transparent border-b border-[#2C2B29]/30 py-2 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8C6D4F] font-light font-sans transition-all duration-300"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-mono">
                            Company / Architecture Firm *
                          </label>
                          <input
                            type="text"
                            required
                            value={catFirm}
                            onChange={(e) => setCatFirm(e.target.value)}
                            disabled={catStatus === "loading"}
                            className="w-full bg-transparent border-b border-[#2C2B29]/30 py-2 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8C6D4F] font-light font-sans transition-all duration-300"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-mono">
                              Target Catalogue Category
                            </label>
                            <select
                              value={catCategory}
                              onChange={(e) => setCatCategory(e.target.value)}
                              disabled={catStatus === "loading"}
                              className="w-full bg-transparent border-b border-[#2C2B29]/30 py-2 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8C6D4F] font-light font-sans cursor-pointer transition-all duration-300"
                            >
                              <option value="Complete Trade Dossier">Complete Trade Dossier (42 MB)</option>
                              <option value="Restaurant & Bistro Range">Restaurant & Bistro Range</option>
                              <option value="Hotel & Lobby Range">Hotel & Lobby Furniture Catalog</option>
                              <option value="Bone Inlay Collections">Bone Inlay Accent Casegoods</option>
                              <option value="Rattan & Rope Collections">Tropical Cane & Rope Series</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-mono">
                              WhatsApp (for secure link delivery)
                            </label>
                            <input
                              type="tel"
                              value={catWhatsApp}
                              onChange={(e) => setCatWhatsApp(e.target.value)}
                              disabled={catStatus === "loading"}
                              placeholder="+1 (555) 019-2834"
                              className="w-full bg-transparent border-b border-[#2C2B29]/30 py-2 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8C6D4F] font-light font-sans transition-all duration-300"
                            />
                          </div>
                        </div>

                        <div className="pt-2">
                          <p className="text-[10px] text-[#8C8273] font-light leading-relaxed mb-4">
                            By requesting catalog access you authorize SB Artisan to contact your firm with digital catalogs, spec sheets, and price tables.
                          </p>
                          <button
                            type="submit"
                            disabled={catStatus === "loading"}
                            className="w-full py-4 text-[10px] uppercase tracking-[0.25em] font-sans font-medium transition-all duration-300 rounded-sm border bg-[#1A1A1A] text-white border-[#1A1A1A] hover:bg-transparent hover:text-[#1A1A1A] disabled:bg-[#8C8273] cursor-pointer"
                          >
                            {catStatus === "loading" ? "Validating Trade Access..." : "Verify & Request Download"}
                          </button>
                        </div>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. LOGISTICS TRANSIT TIME HUB */}
      <section className="py-20 bg-[#0F0E0D] text-[#EAE5D9]">
        <Container variant="default" className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#8C6D4F] block">
                GLOBAL LOGISTICS PATHWAY
              </span>
              <Heading variant="display" size="sm" weight="light" className="text-white leading-tight">
                Mundra Sea Port Transit Timelines
              </Heading>
              <Paragraph variant="md" className="text-[#9E9B95] font-light leading-relaxed">
                Jodhpur factory shipments are loaded into containers directly at the workshop and transferred under customs seal to Mundra Sea Port (Gujarat) in 2 days. Below are typical sea-freight transit durations.
              </Paragraph>
              <div className="pt-4 flex flex-col space-y-2 text-xs font-mono text-[#8C8273]">
                <div className="flex justify-between border-b border-[#2C2B29] pb-1">
                  <span>Inland Rail Corridor (Jodhpur ICD to Mundra)</span>
                  <span className="text-white">~48 Hours</span>
                </div>
                <div className="flex justify-between border-b border-[#2C2B29] pb-1">
                  <span>Customs Stuffing & Clearance</span>
                  <span className="text-white">~24 Hours</span>
                </div>
              </div>
            </div>

            {/* Transit Route Timelines Cards */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="border border-[#2C2B29] bg-[#1E1D1B] p-4 rounded-sm space-y-1">
                <span className="text-[9px] uppercase tracking-widest text-[#8C8273] font-mono block">United Kingdom</span>
                <h4 className="font-serif text-sm font-light text-white">Felixstowe Port</h4>
                <div className="text-lg font-light text-[#8C6D4F] pt-2">21 - 24 Days</div>
              </div>

              <div className="border border-[#2C2B29] bg-[#1E1D1B] p-4 rounded-sm space-y-1">
                <span className="text-[9px] uppercase tracking-widest text-[#8C8273] font-mono block">United States (East)</span>
                <h4 className="font-serif text-sm font-light text-white">Newark Port (NY)</h4>
                <div className="text-lg font-light text-[#8C6D4F] pt-2">28 - 32 Days</div>
              </div>

              <div className="border border-[#2C2B29] bg-[#1E1D1B] p-4 rounded-sm space-y-1">
                <span className="text-[9px] uppercase tracking-widest text-[#8C8273] font-mono block">United Arab Emirates</span>
                <h4 className="font-serif text-sm font-light text-white">Jebel Ali Port</h4>
                <div className="text-lg font-light text-[#8C6D4F] pt-2">7 - 9 Days</div>
              </div>

              <div className="border border-[#2C2B29] bg-[#1E1D1B] p-4 rounded-sm space-y-1">
                <span className="text-[9px] uppercase tracking-widest text-[#8C8273] font-mono block">Germany</span>
                <h4 className="font-serif text-sm font-light text-white">Hamburg Port</h4>
                <div className="text-lg font-light text-[#8C6D4F] pt-2">23 - 26 Days</div>
              </div>

              <div className="border border-[#2C2B29] bg-[#1E1D1B] p-4 rounded-sm space-y-1">
                <span className="text-[9px] uppercase tracking-widest text-[#8C8273] font-mono block">Singapore</span>
                <h4 className="font-serif text-sm font-light text-white">PSA Singapore</h4>
                <div className="text-lg font-light text-[#8C6D4F] pt-2">12 - 14 Days</div>
              </div>

              <div className="border border-[#2C2B29] bg-[#1E1D1B] p-4 rounded-sm space-y-1">
                <span className="text-[9px] uppercase tracking-widest text-[#8C8273] font-mono block">Australia</span>
                <h4 className="font-serif text-sm font-light text-white">Sydney Port</h4>
                <div className="text-lg font-light text-[#8C6D4F] pt-2">25 - 28 Days</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. B2B TECHNICAL FAQS */}
      <section className="py-20 bg-[#FDFCF7]">
        <Container variant="default" className="max-w-4xl space-y-12">
          <div className="text-center space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#8C6D4F] block">EXPORT KNOWLEDGEBASE</span>
            <Heading variant="display" size="sm" weight="light" className="text-[#1A1A1A]">
              Frequently Asked B2B Questions
            </Heading>
            <Paragraph variant="md" className="text-[#5A5751] font-light max-w-xl mx-auto">
              Clear technical details on minimum volumes, customs coordination, timber seasoning, and bespoke OEM drawing approvals.
            </Paragraph>
          </div>

          <div className="space-y-4 pt-6">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="border border-[#EAE5D9] rounded-sm bg-[#FAF8F2] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full py-5 px-6 text-left flex justify-between items-center gap-4 hover:bg-white transition-colors duration-200 outline-none cursor-pointer"
                  >
                    <span className="font-serif text-sm md:text-base font-light text-[#1A1A1A] leading-snug">
                      {faq.q}
                    </span>
                    <span className="shrink-0 text-[#8C6D4F]">
                      <svg 
                        className={cn("w-4 h-4 transition-transform duration-300", isOpen ? "rotate-180" : "")} 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-[#5A5751] font-light leading-relaxed border-t border-[#EAE5D9]/50">
                      {faq.a}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}

