import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const DEFAULT_INQUIRIES: InquiryRecord[] = [
  {
    id: "inq-1",
    clientName: "Rajiv Mehta",
    email: "r.mehta@tajhotels.com",
    phone: "+91 98765 43210",
    firm: "Taj Hotels Group",
    product: "Haveli Reclaimed Teak Dining Chair",
    category: "Restaurant Furniture",
    message: "We are looking to source 24 premium teak dining chairs for our private dining room at the Taj Mahal Palace, Mumbai. Please provide lead times and custom leather options.",
    date: "June 03, 2026",
    status: "New",
    notes: "Follow up via phone call before Friday.",
    volume: 24
  },
  {
    id: "inq-2",
    clientName: "Ayesha Sen",
    email: "ayesha@somaretreats.in",
    phone: "+91 99112 23344",
    firm: "Soma Wellness Retreat",
    product: "Keralite Coir Rope Daybed",
    category: "Rope Furniture",
    message: "Seeking 8 loungers for our spa terrace in Munnar. We need water-resistant finishes on the teakwood frames.",
    date: "June 01, 2026",
    status: "Contacted",
    notes: "Ayesha requested coir rope finish sample sheets.",
    volume: 8
  },
  {
    id: "inq-3",
    clientName: "Vikram Chawla",
    email: "vikram@bespokecafe.in",
    phone: "+91 98100 98100",
    firm: "Bespoke Cafe Delhi",
    product: "Varanasi Silk-Rope Barstool",
    category: "Bar Furniture",
    message: "Interested in Varanasi barstools for our new bistro counter in Connaught Place. Need 16 units.",
    date: "May 28, 2026",
    status: "Quotation Sent",
    notes: "Sent commercial quotation on May 29. Awaiting client feedback.",
    volume: 16
  },
  {
    id: "inq-4",
    clientName: "Priyesh Nair",
    email: "priyesh.nair@leelahotels.com",
    phone: "+91 98888 77777",
    firm: "Leela Resorts & Spas",
    product: "Dune Sand Wet-Bent Cane Lounge",
    category: "Cane Furniture",
    message: "Need 12 units for poolside cabanas. Are there bulk export discounts available?",
    date: "May 25, 2026",
    status: "Closed",
    notes: "Purchase order registered. Logistics dispatched on June 02.",
    volume: 12
  }
];

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<{ id: string; message: string; type?: "info" | "error" }[]>([]);
  
  // Detail Drawer state
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [internalNotesText, setInternalNotesText] = useState("");

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [filterDateRange, setFilterDateRange] = useState<string>("All");

  const triggerToast = (message: string, type: "info" | "error" = "info") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const mapBackendInquiry = (item: any): InquiryRecord => {
    const matchVol = (item.message || "").match(/Volume Required:\s*(\d+|[\d-]+)/i);
    const volumeStr = matchVol ? matchVol[1] : "1";
    const volumeVal = parseInt(volumeStr) || 1;

    let category = item.category || "General Sourcing";
    if (item.inquiry_type && item.inquiry_type.includes("Category Sourcing:")) {
      category = item.inquiry_type.replace("Category Sourcing:", "").trim();
    } else if (item.inquiry_type && item.inquiry_type.includes("Product Spec Acquisition:")) {
      category = "Product Spec Acquisition";
    }

    return {
      id: item.id.toString(),
      clientName: item.name,
      email: item.email,
      phone: item.phone || "Not Provided",
      firm: item.company_name || "Independent Buyer",
      product: item.inquiry_type || "General Consultation",
      category,
      message: item.message || "No details provided.",
      date: new Date(item.created_at || Date.now()).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      status: item.status || "New",
      notes: item.notes || "",
      volume: volumeVal
    };
  };

  const fetchInquiriesData = async () => {
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("sbartisan_admin_token");
      const res = await fetch("http://localhost:5000/api/inquiries", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setInquiries(json.data.map(mapBackendInquiry));
      } else {
        setInquiries(DEFAULT_INQUIRIES);
      }
    } catch (err) {
      console.error(err);
      setInquiries(DEFAULT_INQUIRIES);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiriesData();
  }, []);

  // --- Dynamic Stats Calculations ---
  const stats = useMemo(() => {
    return {
      total: inquiries.length,
      newCount: inquiries.filter((i) => i.status === "New").length,
      contactedCount: inquiries.filter((i) => i.status === "Contacted" || i.status === "Quotation Sent").length,
      closedCount: inquiries.filter((i) => i.status === "Closed").length
    };
  }, [inquiries]);

  // --- Status Update Triggers ---
  const handleUpdateStatus = async (id: string, newStatus: InquiryRecord["status"]) => {
    try {
      const token = sessionStorage.getItem("sbartisan_admin_token");
      const currentInq = inquiries.find(i => i.id === id);
      const notes = currentInq ? currentInq.notes : "";

      const res = await fetch(`http://localhost:5000/api/inquiries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus, notes })
      });
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      
      triggerToast(`Inquiry status updated to "${newStatus}"`);
      fetchInquiriesData();
      
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
    } catch (err) {
      console.error(err);
      triggerToast("Failed to update status in backend.", "error");
    }
  };

  const handleDeleteInquiry = async (id: string, name: string) => {
    if (!window.confirm(`Delete inquiry log from "${name}"?`)) return;

    try {
      const token = sessionStorage.getItem("sbartisan_admin_token");
      const res = await fetch(`http://localhost:5000/api/inquiries/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      
      triggerToast(`Deleted inquiry log from ${name}`, "error");
      fetchInquiriesData();
      
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
    } catch (err) {
      console.error(err);
      triggerToast("Failed to delete inquiry in backend.", "error");
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    try {
      const token = sessionStorage.getItem("sbartisan_admin_token");
      const res = await fetch(`http://localhost:5000/api/inquiries/${selectedInquiry.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: selectedInquiry.status, notes: internalNotesText })
      });
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      
      setSelectedInquiry({ ...selectedInquiry, notes: internalNotesText });
      triggerToast("Internal CRM notes saved successfully");
      fetchInquiriesData();
    } catch (err) {
      console.error(err);
      triggerToast("Failed to save notes in backend.", "error");
    }
  };

  const handleOpenDrawer = (inq: InquiryRecord) => {
    setSelectedInquiry(inq);
    setInternalNotesText(inq.notes || "");
  };

  // --- Filtering Pipeline ---
  const filteredInquiries = useMemo(() => {
    let result = [...inquiries];

    // 1. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.clientName.toLowerCase().includes(q) ||
          i.firm.toLowerCase().includes(q) ||
          i.email.toLowerCase().includes(q) ||
          i.product.toLowerCase().includes(q) ||
          i.id.toLowerCase().includes(q)
      );
    }

    // 2. Filter Status
    if (filterStatus !== "All") {
      result = result.filter((i) => i.status === filterStatus);
    }

    // 3. Filter Category
    if (filterCategory !== "All") {
      result = result.filter((i) =>
        i.category.toLowerCase().includes(filterCategory.toLowerCase())
      );
    }

    // 4. Filter Date Range
    if (filterDateRange !== "All") {
      const now = new Date();
      result = result.filter((i) => {
        const itemDate = new Date(i.date);
        const diffTime = Math.abs(now.getTime() - itemDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (filterDateRange === "today") return diffDays <= 1;
        if (filterDateRange === "week") return diffDays <= 7;
        if (filterDateRange === "month") return diffDays <= 30;
        return true;
      });
    }

    return result;
  }, [inquiries, searchQuery, filterStatus, filterCategory, filterDateRange]);

  const uniqueCategories = useMemo(() => {
    const cats = inquiries.map((i) => i.category).filter(Boolean);
    return Array.from(new Set(cats));
  }, [inquiries]);

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-8 md:space-y-10 selection:bg-[#CBB593] selection:text-[#0B0A0A] relative">
      
      {/* 1. Header Layout */}
      <div className="border-b border-[#23211F] pb-6 space-y-1">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#8C8273] uppercase font-light">
          <span>ADMIN PANEL</span>
          <span>•</span>
          <span className="text-[#CBB593]">INQUIRY MANAGEMENT CRM</span>
        </div>
        <h2 className="font-serif text-3xl font-light text-white tracking-wide">
          Private Client Desk
        </h2>
      </div>

      {/* 2. KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        
        {/* Total Inquiries */}
        <div className="bg-[#121110] border border-[#23211F] p-6 space-y-2 hover:border-[#CBB593]/30 transition-all duration-300">
          <p className="text-[10px] tracking-[0.2em] text-[#8C8273] uppercase font-light">Total Inquiries</p>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-serif text-white font-light">{stats.total} Logs</span>
            <span className="text-[10px] text-[#CBB593] font-sans font-medium">All Time</span>
          </div>
        </div>

        {/* New Inquiries */}
        <div className="bg-[#121110] border border-[#23211F] p-6 space-y-2 hover:border-[#CBB593]/30 transition-all duration-300">
          <p className="text-[10px] tracking-[0.2em] text-blue-400 uppercase font-light">New Requests</p>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-serif text-blue-400 font-light">{stats.newCount} New</span>
            <span className="text-[10px] text-[#8C8273] font-sans font-light">Needs Follow-up</span>
          </div>
        </div>

        {/* Contacted */}
        <div className="bg-[#121110] border border-[#23211F] p-6 space-y-2 hover:border-[#CBB593]/30 transition-all duration-300">
          <p className="text-[10px] tracking-[0.2em] text-[#CBB593] uppercase font-light">Active Pipeline</p>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-serif text-[#CBB593] font-light">{stats.contactedCount} Active</span>
            <span className="text-[10px] text-[#8C8273] font-sans font-light">Quoted / In Review</span>
          </div>
        </div>

        {/* Closed */}
        <div className="bg-[#121110] border border-[#23211F] p-6 space-y-2 hover:border-[#CBB593]/30 transition-all duration-300">
          <p className="text-[10px] tracking-[0.2em] text-emerald-400 uppercase font-light">Resolved Cases</p>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-serif text-emerald-400 font-light">{stats.closedCount} Closed</span>
            <span className="text-[10px] text-emerald-500 font-sans font-medium">Archived POs</span>
          </div>
        </div>

      </div>

      {/* 3. Search & Filters Bar */}
      <div className="bg-[#121110] border border-[#23211F] p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-sans text-xs">
          
          {/* Text Search */}
          <div className="space-y-1.5 md:col-span-1">
            <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">Search Customer / Product</label>
            <div className="relative border-b border-[#2C2B29] pb-1.5 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#8C8273] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter name, company..."
                className="bg-transparent text-xs text-[#EAE5D9] placeholder:text-[#6E6B64] focus:outline-none w-full font-sans font-light border-none"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-1.5">
            <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">Inquiry Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-[#1E1D1C] border border-[#2C2B29] focus:border-[#CBB593] p-2.5 text-xs text-white focus:outline-none rounded-none"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Quotation Sent">Quotation Sent</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="space-y-1.5">
            <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">Product Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-[#1E1D1C] border border-[#2C2B29] focus:border-[#CBB593] p-2.5 text-xs text-white focus:outline-none rounded-none"
            >
              <option value="All">All Categories</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Timeframe Filter */}
          <div className="space-y-1.5">
            <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">Creation Timeframe</label>
            <select
              value={filterDateRange}
              onChange={(e) => setFilterDateRange(e.target.value)}
              className="w-full bg-[#1E1D1C] border border-[#2C2B29] focus:border-[#CBB593] p-2.5 text-xs text-white focus:outline-none rounded-none"
            >
              <option value="All">All History</option>
              <option value="today">Created Today</option>
              <option value="week">Past 7 Days</option>
              <option value="month">Past 30 Days</option>
            </select>
          </div>

        </div>
      </div>

      {/* 4. CRM Inquiries Table grid */}
      <div className="bg-[#121110] border border-[#23211F] overflow-hidden">
        {isLoading ? (
          /* Skeletons Loading */
          <div className="p-8 space-y-6">
            <div className="h-4 bg-[#1E1D1C] rounded-sm w-1/4 animate-pulse" />
            <div className="space-y-3">
              <div className="h-8 bg-[#181716] w-full animate-pulse" />
              <div className="h-10 bg-[#1A1918] w-full animate-pulse" />
              <div className="h-10 bg-[#1A1918] w-full animate-pulse" />
              <div className="h-10 bg-[#1A1918] w-full animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            {filteredInquiries.length > 0 ? (
              <table className="w-full text-left border-collapse text-xs font-light">
                <thead>
                  <tr className="border-b border-[#23211F] text-[9px] tracking-[0.25em] text-[#8C8273] uppercase font-sans bg-[#181716] select-none">
                    <th className="py-4 px-6 font-medium">Customer Details</th>
                    <th className="py-4 px-6 font-medium">Company Name</th>
                    <th className="py-4 px-6 font-medium">Object Interest</th>
                    <th className="py-4 px-6 font-medium">Category</th>
                    <th className="py-4 px-6 font-medium">Date Received</th>
                    <th className="py-4 px-6 font-medium text-center">Status</th>
                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#23211F]/60 text-[#EAE5D9]">
                  {filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-[#181716]/40 transition-colors duration-200">
                      {/* Customer Details */}
                      <td className="py-4 px-6">
                        <div className="space-y-0.5">
                          <span className="font-serif text-sm font-medium text-white tracking-wide block">
                            {inq.clientName}
                          </span>
                          <span className="text-[10px] text-[#8C8273] block">{inq.email}</span>
                          {inq.phone && <span className="text-[9px] text-[#6E6B64] font-mono block">{inq.phone}</span>}
                        </div>
                      </td>

                      {/* Company */}
                      <td className="py-4 px-6 text-[#DDC9AC]">
                        {inq.firm}
                      </td>

                      {/* Product */}
                      <td className="py-4 px-6 font-serif italic text-white max-w-xs truncate">
                        {inq.product}
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6 text-[#8C8273]">
                        {inq.category}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-[#8C8273]">
                        {inq.date}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 text-center">
                        {inq.status === "New" && (
                          <span className="py-1 px-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[8px] uppercase tracking-widest font-semibold rounded-sm">
                            New
                          </span>
                        )}
                        {inq.status === "Contacted" && (
                          <span className="py-1 px-3 bg-[#CBB593]/10 border border-[#CBB593]/20 text-[#CBB593] text-[8px] uppercase tracking-widest font-semibold rounded-sm">
                            Contacted
                          </span>
                        )}
                        {inq.status === "Quotation Sent" && (
                          <span className="py-1 px-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[8px] uppercase tracking-widest font-semibold rounded-sm">
                            Quoted
                          </span>
                        )}
                        {inq.status === "Closed" && (
                          <span className="py-1 px-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] uppercase tracking-widest font-semibold rounded-sm">
                            Closed
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-3.5 select-none">
                          <button
                            onClick={() => handleOpenDrawer(inq)}
                            className="text-[#CBB593] hover:text-white transition-colors duration-300 uppercase text-[9px] tracking-wider bg-transparent border-none p-0 cursor-pointer"
                          >
                            View
                          </button>
                          <span className="text-[#23211F] select-none">|</span>
                          <button
                            onClick={() => handleUpdateStatus(inq.id, "Contacted")}
                            disabled={inq.status === "Contacted" || inq.status === "Closed"}
                            className="text-[#8C8273] hover:text-[#EAE5D9] disabled:opacity-30 disabled:hover:text-[#8C8273] transition-colors duration-300 uppercase text-[9px] tracking-wider bg-transparent border-none p-0 cursor-pointer"
                          >
                            Contact
                          </button>
                          <span className="text-[#23211F] select-none">|</span>
                          <button
                            onClick={() => handleUpdateStatus(inq.id, "Closed")}
                            disabled={inq.status === "Closed"}
                            className="text-[#8C8273] hover:text-emerald-400 disabled:opacity-30 disabled:hover:text-[#8C8273] transition-colors duration-300 uppercase text-[9px] tracking-wider bg-transparent border-none p-0 cursor-pointer"
                          >
                            Close
                          </button>
                          <span className="text-[#23211F] select-none">|</span>
                          <button
                            onClick={() => handleDeleteInquiry(inq.id, inq.clientName)}
                            className="text-[#8C8273] hover:text-red-400 transition-colors duration-300 uppercase text-[9px] tracking-wider bg-transparent border-none p-0 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-20 text-center space-y-2 select-none">
                <p className="text-white text-xs font-serif italic">No inquiries found matching criteria</p>
                <p className="text-[10px] text-[#8C8273] font-sans font-light uppercase tracking-wider">Try clearing filters or search queries</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 5. SLIDE OUT DETAILS DRAWER */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex justify-end">
            
            {/* Backdrop Mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInquiry(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl h-full bg-[#121110] border-l border-[#23211F] shadow-2xl z-10 flex flex-col justify-between overflow-y-auto text-[#EAE5D9]"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedInquiry(null)}
                aria-label="Close drawer"
                className="absolute top-6 right-6 text-[#8C8273] hover:text-white transition-colors focus:outline-none bg-transparent border-none cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 2.5l11 11M13.5 2.5l-11 11" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Top Details container */}
              <div className="p-8 space-y-8 flex-grow">
                
                {/* 1. Drawer Header */}
                <div className="space-y-2 border-b border-[#23211F] pb-6">
                  <div className="flex items-center gap-3 select-none">
                    <span className="text-[9px] tracking-widest text-[#CBB593] font-mono uppercase">
                      ID: {selectedInquiry.id}
                    </span>
                    <span className="text-[#8C8273]">•</span>
                    <span className="text-[9px] text-[#8C8273] uppercase tracking-wider font-sans font-light">
                      Received: {selectedInquiry.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-light text-white tracking-wide">
                    {selectedInquiry.clientName}
                  </h3>
                  
                  {/* Status update controls inside drawer */}
                  <div className="flex items-center gap-2 pt-2 select-none">
                    <span className="text-[9px] text-[#8C8273] uppercase tracking-wider">Status:</span>
                    <div className="flex items-center gap-1.5">
                      {["New", "Contacted", "Quotation Sent", "Closed"].map((st) => {
                        const isCurrent = selectedInquiry.status === st;
                        return (
                          <button
                            key={st}
                            type="button"
                            onClick={() => handleUpdateStatus(selectedInquiry.id, st as InquiryRecord["status"])}
                            className={`py-1 px-2.5 text-[8px] uppercase tracking-wider font-medium font-sans transition-all duration-300 border cursor-pointer ${
                              isCurrent
                                ? "bg-[#CBB593] text-[#0B0A0A] border-[#CBB593]"
                                : "bg-transparent border-[#2C2B29] text-[#8C8273] hover:text-white"
                            }`}
                          >
                            {st === "Quotation Sent" ? "Quoted" : st}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 2. Client specifications profile */}
                <div className="space-y-4">
                  <h4 className="text-[9px] tracking-[0.25em] text-[#8C8273] uppercase font-semibold">Client Specification Profile</h4>
                  
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6 bg-[#181716] border border-[#23211F]/50 p-4 font-sans text-xs">
                    <div>
                      <span className="text-[9px] text-[#8C8273] block uppercase tracking-wider">Company / Firm</span>
                      <span className="text-white font-medium block mt-0.5">{selectedInquiry.firm}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#8C8273] block uppercase tracking-wider">Email Address</span>
                      <a href={`mailto:${selectedInquiry.email}`} className="text-[#CBB593] hover:underline block mt-0.5">{selectedInquiry.email}</a>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#8C8273] block uppercase tracking-wider">Contact Number</span>
                      {selectedInquiry.phone !== "Not Provided" ? (
                        <a href={`tel:${selectedInquiry.phone}`} className="text-[#CBB593] hover:underline block mt-0.5 font-mono">{selectedInquiry.phone}</a>
                      ) : (
                        <span className="text-[#8C8273] block mt-0.5">Not Provided</span>
                      )}
                    </div>
                    <div>
                      <span className="text-[9px] text-[#8C8273] block uppercase tracking-wider">Quantity Demanded</span>
                      <span className="text-white block mt-0.5">{selectedInquiry.volume || 1} units</span>
                    </div>
                  </div>
                </div>

                {/* 3. Interest object */}
                <div className="space-y-2 border-b border-[#23211F] pb-6">
                  <h4 className="text-[9px] tracking-[0.25em] text-[#8C8273] uppercase font-semibold">Interest Object</h4>
                  <div className="space-y-1">
                    <span className="font-serif italic text-base text-white block">"{selectedInquiry.product}"</span>
                    <span className="text-[10px] text-[#8C8273] uppercase block">Atelier Category: <span className="text-[#DDC9AC]">{selectedInquiry.category}</span></span>
                  </div>
                </div>

                {/* 4. Complete Message */}
                <div className="space-y-2 border-b border-[#23211F] pb-6">
                  <h4 className="text-[9px] tracking-[0.25em] text-[#8C8273] uppercase font-semibold">Client Project Brief / Message</h4>
                  <p className="font-sans text-xs text-[#9E9B95] font-light leading-relaxed text-justify bg-[#181716]/30 p-4 border border-[#23211F] italic select-text">
                    "{selectedInquiry.message}"
                  </p>
                </div>

                {/* 5. Inquiry CRM progress timeline */}
                <div className="space-y-4 border-b border-[#23211F] pb-6 select-none">
                  <h4 className="text-[9px] tracking-[0.25em] text-[#8C8273] uppercase font-semibold">Inquiry Progress Timeline</h4>
                  
                  <div className="space-y-4 pl-4 relative before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[1px] before:bg-[#2C2B29]">
                    
                    {/* Log 1 */}
                    <div className="relative flex gap-3 text-[11px] font-sans">
                      <div className="w-2.5 h-2.5 bg-[#CBB593] rounded-full shrink-0 mt-1 border-2 border-[#121110] relative z-10" />
                      <div>
                        <span className="text-white font-medium block">Inquiry Registered</span>
                        <span className="text-[9px] text-[#8C8273] block mt-0.5">{selectedInquiry.date}</span>
                      </div>
                    </div>

                    {/* Log 2 */}
                    {selectedInquiry.status !== "New" && (
                      <div className="relative flex gap-3 text-[11px] font-sans">
                        <div className="w-2.5 h-2.5 bg-[#CBB593] rounded-full shrink-0 mt-1 border-2 border-[#121110] relative z-10" />
                        <div>
                          <span className="text-white font-medium block">Contact Initiated & Specifications Reviewed</span>
                          <span className="text-[9px] text-[#8C8273] block mt-0.5">Updated</span>
                        </div>
                      </div>
                    )}

                    {/* Log 3 */}
                    {selectedInquiry.status === "Closed" && (
                      <div className="relative flex gap-3 text-[11px] font-sans">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shrink-0 mt-1 border-2 border-[#121110] relative z-10" />
                        <div>
                          <span className="text-white font-medium block">Case Closed & PO Filed</span>
                          <span className="text-[9px] text-[#8C8273] block mt-0.5">Archive Registered</span>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* 6. Internal CRM Notes */}
                <div className="space-y-2">
                  <h4 className="text-[9px] tracking-[0.25em] text-[#8C8273] uppercase font-semibold">Internal CRM Notes</h4>
                  <div className="space-y-2">
                    <textarea
                      value={internalNotesText}
                      onChange={(e) => setInternalNotesText(e.target.value)}
                      placeholder="Add office reminders, communication logs, client requests, or quote calculations..."
                      rows={3}
                      className="w-full bg-[#1E1D1C] border border-[#2C2B29] focus:border-[#CBB593] p-3 text-xs text-white placeholder:text-[#6E6B64] focus:outline-none resize-none rounded-none font-sans"
                    />
                    <div className="flex justify-end select-none">
                      <button
                        type="button"
                        onClick={handleSaveNotes}
                        className="py-2 px-4 bg-[#CBB593] hover:bg-[#DDC9AC] text-[#0B0A0A] text-[9px] uppercase tracking-[0.2em] font-sans font-semibold transition-colors duration-300 rounded-none border-none cursor-pointer"
                      >
                        Save Notes
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* 6. GLOBAL CRM TOAST NOTIFICATIONS */}
      <div className="fixed bottom-6 right-6 z-[60] space-y-3 pointer-events-none select-none max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              className={`p-4 border shadow-2xl flex items-start gap-3 pointer-events-auto rounded-none ${
                t.type === "error"
                  ? "bg-red-950/20 border-red-800/40 text-red-300"
                  : "bg-[#121110] border-[#CBB593]/30 text-[#EAE5D9]"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {t.type === "error" ? (
                <svg className="w-4 h-4 text-red-400 shrink-0 pt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-[#CBB593] shrink-0 pt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <div className="flex-grow space-y-0.5">
                <span className="text-[8px] tracking-widest text-[#8C8273] uppercase font-light block">
                  Registry System
                </span>
                <p className="text-[11px] font-sans font-light leading-normal">{t.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
