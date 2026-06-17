import React, { useState, useEffect, useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { INDIAN_HOSPITALITY_PRODUCTS, getUniqueCategories } from "../product";

interface InquiryRecord {
  id: string;
  clientName: string;
  firm: string;
  product: string;
  volume: number;
  date: string;
  status: "New" | "Under Review" | "Resolved";
  email: string;
}

export default function AdminDashboardPage() {
  const { theme, setTheme } = useOutletContext<{ theme: "dark" | "light"; setTheme: (t: "dark" | "light") => void }>();
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [productsList, setProductsList] = useState<any[]>([]);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("sbartisan_admin_token");
        const headers: HeadersInit = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // Fetch inquiries
        const inqRes = await fetch("http://localhost:5000/api/inquiries", { headers });
        const inqJson = await inqRes.json();
        if (inqJson.success && Array.isArray(inqJson.data)) {
          setInquiries(inqJson.data.map((item: any) => {
            // Volume can be parsed from phone or defaults to 1
            const matchVol = (item.message || "").match(/Volume Required:\s*(\d+|[\d-]+)/i);
            const volumeStr = matchVol ? matchVol[1] : "1";
            const volumeVal = parseInt(volumeStr) || 1;

            return {
              id: item.id.toString(),
              clientName: item.name,
              firm: item.company_name || "Independent Buyer",
              product: item.inquiry_type || "Product Sourcing",
              volume: volumeVal,
              date: new Date(item.created_at || Date.now()).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
              status: item.status as any,
              email: item.email
            };
          }));
        }

        // Fetch products
        const prodRes = await fetch("http://localhost:5000/api/products");
        const prodJson = await prodRes.json();
        if (prodJson.success && Array.isArray(prodJson.data)) {
          setProductsList(prodJson.data.map((p: any) => ({
            id: p.id.toString(),
            title: p.name,
            category: p.category_name || "Uncategorized",
            designer: "Jodhpur Atelier",
            price: p.price ? `₹${parseFloat(p.price).toLocaleString("en-IN")}` : "Contact",
            image: p.primary_image || "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=150&q=80",
            featured: !!p.featured
          })));
        }

        // Fetch categories
        const catRes = await fetch("http://localhost:5000/api/categories");
        const catJson = await catRes.json();
        if (catJson.success && Array.isArray(catJson.data)) {
          setCategoriesList(catJson.data);
        }

      } catch (err) {
        console.error("Dashboard data fetching error:", err);
      }
    };

    fetchData();
  }, []);

  // Compute stats dynamically
  const stats = useMemo(() => {
    const totalProducts = productsList.length;
    const totalCategories = categoriesList.length > 0 ? categoriesList.length : 7;
    const totalInquiries = inquiries.length;
    const featuredProducts = productsList.filter((p) => p.featured).length;

    return {
      totalProducts,
      totalCategories,
      totalInquiries,
      featuredProducts,
    };
  }, [productsList, inquiries, categoriesList]);

  // Top 4 recent inquiries
  const recentInquiries = useMemo(() => {
    return inquiries.slice(0, 4);
  }, [inquiries]);

  // Top 4 recent products (newest additions first)
  const recentProducts = useMemo(() => {
    return [...productsList].reverse().slice(0, 4);
  }, [productsList]);

  // Quick Action: Export database log
  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({
        exportDate: new Date().toISOString(),
        products: productsList,
        inquiries: inquiries,
      }, null, 2)
    );
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sb_artisan_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Quick Action: Reset inquiries database
  const handleResetLog = () => {
    if (window.confirm("Restore default mock inquiries log? This clears current custom entries.")) {
      localStorage.removeItem("sbartisan_inquiries");
      window.location.reload();
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-8 md:space-y-10 selection:bg-[#CBB593] selection:text-[#0B0A0A]">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[#23211F] pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#8C8273] uppercase font-light">
            <span>ADMIN PANEL</span>
            <span>•</span>
            <span className="text-[#CBB593]">DASHBOARD WORKSPACE</span>
          </div>
          <h2 className="font-serif text-3xl font-light text-white tracking-wide">
            Atelier Overview
          </h2>
        </div>

        {/* Quick actions panel */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Theme Selector Toggle */}
          <div className="flex items-center border border-[#2C2B29] bg-[#1E1D1C] p-0.5 select-none rounded-none">
            <button
              onClick={() => setTheme("dark")}
              type="button"
              className={`px-3.5 py-1.5 text-[9px] uppercase tracking-[0.15em] font-sans font-medium transition-all duration-300 cursor-pointer border-none focus:outline-none ${
                theme === "dark"
                  ? "bg-[#CBB593] text-[#0B0A0A]"
                  : "bg-transparent text-[#8C8273] hover:text-white"
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => setTheme("light")}
              type="button"
              className={`px-3.5 py-1.5 text-[9px] uppercase tracking-[0.15em] font-sans font-medium transition-all duration-300 cursor-pointer border-none focus:outline-none ${
                theme === "light"
                  ? "bg-[#CBB593] text-[#0B0A0A]"
                  : "bg-transparent text-[#8C8273] hover:text-white"
              }`}
            >
              Light
            </button>
          </div>

          <Link
            to="/admin/products"
            className="py-2.5 px-4 bg-[#1E1D1C] hover:bg-[#2C2B29] border border-[#2C2B29] text-white text-[9px] uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 rounded-none text-center"
          >
            + New Commission
          </Link>
          <button
            onClick={handleExportBackup}
            className="py-2.5 px-4 bg-[#1E1D1C] hover:bg-[#2C2B29] border border-[#2C2B29] text-white text-[9px] uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 rounded-none text-center"
          >
            Backup Archive
          </button>
          <button
            onClick={handleResetLog}
            className="py-2.5 px-4 bg-transparent hover:bg-red-950/20 border border-red-900/30 hover:border-red-800 text-red-400 text-[9px] uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 rounded-none text-center"
          >
            Reset Logs
          </button>
        </div>
      </div>

      {/* 2. KPI statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        
        {/* Total Products */}
        <div className="bg-[#121110] border border-[#23211F] p-6 space-y-2 hover:border-[#CBB593]/40 transition-all duration-300">
          <p className="text-[10px] tracking-[0.2em] text-[#8C8273] uppercase font-light">Total Products</p>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-serif text-white font-light">{stats.totalProducts} Items</span>
            <span className="text-[10px] text-[#CBB593] font-sans font-medium">Cataloged</span>
          </div>
        </div>

        {/* Total Categories */}
        <div className="bg-[#121110] border border-[#23211F] p-6 space-y-2 hover:border-[#CBB593]/40 transition-all duration-300">
          <p className="text-[10px] tracking-[0.2em] text-[#8C8273] uppercase font-light">Active Categories</p>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-serif text-white font-light">{stats.totalCategories} Sectors</span>
            <span className="text-[10px] text-[#8C8273] font-sans font-light">B2B Segments</span>
          </div>
        </div>

        {/* Total Inquiries */}
        <div className="bg-[#121110] border border-[#23211F] p-6 space-y-2 hover:border-[#CBB593]/40 transition-all duration-300">
          <p className="text-[10px] tracking-[0.2em] text-[#8C8273] uppercase font-light">Total Inquiries</p>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-serif text-white font-light">{stats.totalInquiries} Logs</span>
            <span className="text-[10px] text-[#CBB593] font-sans font-medium">Concierge Desk</span>
          </div>
        </div>

        {/* Featured Products */}
        <div className="bg-[#121110] border border-[#23211F] p-6 space-y-2 hover:border-[#CBB593]/40 transition-all duration-300">
          <p className="text-[10px] tracking-[0.2em] text-[#8C8273] uppercase font-light">Featured Products</p>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-serif text-white font-light">{stats.featuredProducts} Objects</span>
            <span className="text-[10px] text-[#8C8273] font-sans font-light">Showcase Placed</span>
          </div>
        </div>

      </div>

      {/* 3. Analytics Chart Section */}
      <div className="bg-[#121110] border border-[#23211F] p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] tracking-widest text-[#CBB593] uppercase font-medium">Acquisition Volumetrics</span>
            <h3 className="font-serif text-lg font-light text-white tracking-wide">Weekly Inquiry Volume</h3>
          </div>
          <span className="text-[9px] tracking-wider text-[#8C8273] uppercase border border-[#2C2B29] py-1 px-3">Last 30 Days</span>
        </div>

        {/* SVG Line Chart */}
        <div className="h-48 w-full bg-[#181716]/40 border border-[#23211F]/30 p-4 flex flex-col justify-between relative select-none">
          <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
            <div className="w-full border-t border-[#23211F]/20" />
            <div className="w-full border-t border-[#23211F]/20" />
            <div className="w-full border-t border-[#23211F]/20" />
          </div>

          <svg className="w-full h-32 mt-4 z-10" viewBox="0 0 600 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="chart-grad-panel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--admin-text-brand)" stopOpacity="0.12" />
                <stop offset="100%" stopColor="var(--admin-text-brand)" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path d="M10 110 C 100 80, 200 95, 300 50 C 400 20, 500 45, 590 10 L 590 120 L 10 120 Z" fill="url(#chart-grad-panel)" />
            <path d="M10 110 C 100 80, 200 95, 300 50 C 400 20, 500 45, 590 10" stroke="var(--admin-text-brand)" strokeWidth="1.25" strokeLinecap="round" />
            <circle cx="300" cy="50" r="4" fill="var(--admin-bg)" stroke="var(--admin-text-brand)" strokeWidth="1.25" />
            <circle cx="590" cy="10" r="4" fill="var(--admin-bg)" stroke="var(--admin-text-brand)" strokeWidth="1.25" />
          </svg>

          <div className="flex justify-between text-[9px] text-[#8C8273] uppercase tracking-wider px-2 z-10">
            <span>May 05</span>
            <span>May 12</span>
            <span>May 19</span>
            <span>May 26</span>
            <span>Jun 02</span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Data Grid (Inquiries & Products Tables) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Inquiries Table */}
        <div className="bg-[#121110] border border-[#23211F] p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#23211F] pb-4">
            <div className="space-y-1">
              <span className="text-[9px] tracking-widest text-[#8C8273] uppercase font-light">Client Desk Logs</span>
              <h3 className="font-serif text-lg font-light text-white tracking-wide">Recent Spec Requests</h3>
            </div>
            <Link
              to="/admin/inquiries"
              className="text-[9px] text-[#CBB593] hover:text-white uppercase tracking-wider font-sans font-light hover:underline"
            >
              View All Inquiries &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse text-[11px] font-light">
              <thead>
                <tr className="border-b border-[#23211F]/60 text-[8px] tracking-[0.2em] text-[#8C8273] uppercase font-sans select-none">
                  <th className="pb-3 font-medium">Representative</th>
                  <th className="pb-3 font-medium">Firm</th>
                  <th className="pb-3 font-medium">Object</th>
                  <th className="pb-3 font-medium text-center">Vol</th>
                  <th className="pb-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#23211F]/30">
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-[#181716]/20 transition-colors duration-200">
                    <td className="py-3 pr-2 text-white font-medium">{inq.clientName}</td>
                    <td className="py-3 pr-2 text-[#DDC9AC]">{inq.firm}</td>
                    <td className="py-3 pr-2 italic font-serif text-[#EAE5D9]">{inq.product.split(" ")[0]}...</td>
                    <td className="py-3 pr-2 text-center text-white">{inq.volume}</td>
                    <td className="py-3 text-right">
                      {inq.status === "New" && (
                        <span className="py-0.5 px-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[8px] uppercase tracking-wider rounded-sm">
                          New
                        </span>
                      )}
                      {inq.status === "Under Review" && (
                        <span className="py-0.5 px-2 bg-[#CBB593]/10 border border-[#CBB593]/20 text-[#CBB593] text-[8px] uppercase tracking-wider rounded-sm">
                          Review
                        </span>
                      )}
                      {inq.status === "Resolved" && (
                        <span className="py-0.5 px-2 bg-neutral-800 border border-neutral-700 text-[#8C8273] text-[8px] uppercase tracking-wider rounded-sm">
                          Resolved
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Products Table */}
        <div className="bg-[#121110] border border-[#23211F] p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#23211F] pb-4">
            <div className="space-y-1">
              <span className="text-[9px] tracking-widest text-[#8C8273] uppercase font-light">Showroom Archive</span>
              <h3 className="font-serif text-lg font-light text-white tracking-wide">Recent Commission Registry</h3>
            </div>
            <Link
              to="/admin/products"
              className="text-[9px] text-[#CBB593] hover:text-white uppercase tracking-wider font-sans font-light hover:underline"
            >
              View Showroom &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse text-[11px] font-light">
              <thead>
                <tr className="border-b border-[#23211F]/60 text-[8px] tracking-[0.2em] text-[#8C8273] uppercase font-sans select-none">
                  <th className="pb-3 font-medium">Object Details</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Designer</th>
                  <th className="pb-3 font-medium text-right">Est Trade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#23211F]/30">
                {recentProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#181716]/20 transition-colors duration-200">
                    <td className="py-2.5 pr-2 flex items-center gap-3">
                      <div className="w-8 h-8 overflow-hidden bg-[#1E1D1C] border border-[#2C2B29] shrink-0">
                        <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-white font-medium">{prod.title.split(" ")[0]}...</span>
                    </td>
                    <td className="py-2.5 pr-2 text-[#8C8273]">{prod.category.split(" ")[0]}</td>
                    <td className="py-2.5 pr-2 text-[#DDC9AC] italic">{prod.designer.split(" ")[0]}...</td>
                    <td className="py-2.5 text-right text-white font-mono">{prod.price || "Contact"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
