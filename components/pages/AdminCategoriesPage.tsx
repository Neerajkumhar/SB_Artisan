import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INDIAN_HOSPITALITY_PRODUCTS } from "../product";

interface Category {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  featured: boolean;
  status: "Active" | "Inactive";
}

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  parentCategoryId: string;
  status: "Active" | "Inactive";
}

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "cat-restaurant",
    title: "Restaurant Furniture",
    slug: "restaurant-furniture",
    description: "Sculptural dining seating, hand-planed tables, and serving casegoods designed for upscale hotel private dining salons and fine-dining spaces.",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=90",
    featured: true,
    status: "Active"
  },
  {
    id: "cat-cafe",
    title: "Cafe Furniture",
    slug: "cafe-furniture",
    description: "Compact bistro tables, weather-treated dining chairs, and lightweight cane armchair sets engineered for breezy indoor-outdoor cafe placements.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=90",
    featured: true,
    status: "Active"
  },
  {
    id: "cat-bar",
    title: "Bar Furniture",
    slug: "bar-furniture",
    description: "High-tensile woven silk barstools, wood-wrapped leather counters, and ornate bone inlay bar cabinets designed to elevate high-end hotel lounges.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=90",
    featured: true,
    status: "Active"
  },
  {
    id: "cat-hotel",
    title: "Hotel Furniture",
    slug: "hotel-furniture",
    description: "Grand lobby tables, custom carved consoles, and reading lounger statements that define hotel guest sanctuaries.",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=90",
    featured: true,
    status: "Active"
  },
  {
    id: "cat-cane",
    title: "Cane Furniture",
    slug: "cane-furniture",
    description: "Organically steam-bent cane loungers, two-tiered green marble tables, and breezy rattan armchairs showcasing natural peel weaves for tropical hospitality.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=90",
    featured: true,
    status: "Active"
  },
  {
    id: "cat-rope",
    title: "Rope Furniture",
    slug: "rope-furniture",
    description: "Traditional Rosewood charpais and benches featuring hand-tensioned coconut coir and jute rope grids.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=90",
    featured: true,
    status: "Active"
  },
  {
    id: "cat-bone-inlay",
    title: "Bone Inlay Furniture",
    slug: "bone-inlay-furniture",
    description: "Intricately detailed bar cabinets, credenzas, and bistro tables hand-laid tile-by-tile in water-resistant resins.",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=90",
    featured: true,
    status: "Active"
  }
];

const DEFAULT_SUBCATEGORIES: Subcategory[] = [
  // Cafe
  { id: "sub-1", name: "Cafe Chairs", slug: "cafe-chairs", parentCategoryId: "cat-cafe", status: "Active" },
  { id: "sub-2", name: "Cafe Tables", slug: "cafe-tables", parentCategoryId: "cat-cafe", status: "Active" },
  { id: "sub-3", name: "Cafe Benches", slug: "cafe-benches", parentCategoryId: "cat-cafe", status: "Active" },
  { id: "sub-4", name: "Outdoor Cafe Furniture", slug: "outdoor-cafe", parentCategoryId: "cat-cafe", status: "Active" },
  
  // Hotel
  { id: "sub-5", name: "Hotel Beds", slug: "hotel-beds", parentCategoryId: "cat-hotel", status: "Active" },
  { id: "sub-6", name: "Hotel Chairs", slug: "hotel-chairs", parentCategoryId: "cat-hotel", status: "Active" },
  { id: "sub-7", name: "Hotel Sofas", slug: "hotel-sofas", parentCategoryId: "cat-hotel", status: "Active" },
  { id: "sub-8", name: "Hotel Tables", slug: "hotel-tables", parentCategoryId: "cat-hotel", status: "Active" },
  { id: "sub-9", name: "Wardrobes", slug: "wardrobes", parentCategoryId: "cat-hotel", status: "Active" },
  { id: "sub-10", name: "Bedside Tables", slug: "bedside-tables", parentCategoryId: "cat-hotel", status: "Active" },
  
  // Restaurant
  { id: "sub-11", name: "Dining Seating", slug: "seating", parentCategoryId: "cat-restaurant", status: "Active" },
  { id: "sub-12", name: "Dining Tables", slug: "tables", parentCategoryId: "cat-restaurant", status: "Active" },
  
  // Bar
  { id: "sub-13", name: "Bar Seating", slug: "seating", parentCategoryId: "cat-bar", status: "Active" },
  { id: "sub-14", name: "Bar Cabinets", slug: "cabinet", parentCategoryId: "cat-bar", status: "Active" },
  
  // Cane
  { id: "sub-15", name: "Lounge Loungers", slug: "lounge", parentCategoryId: "cat-cane", status: "Active" },
  { id: "sub-16", name: "Cane Tables", slug: "table", parentCategoryId: "cat-cane", status: "Active" },
  
  // Rope
  { id: "sub-17", name: "Daybeds & Benches", slug: "daybed", parentCategoryId: "cat-rope", status: "Active" },
  { id: "sub-18", name: "Dining Benches", slug: "bench", parentCategoryId: "cat-rope", status: "Active" },
  
  // Bone Inlay
  { id: "sub-19", name: "Cabinets & Storage", slug: "cabinet", parentCategoryId: "cat-bone-inlay", status: "Active" },
  { id: "sub-20", name: "Bistro & Accent Tables", slug: "table", parentCategoryId: "cat-bone-inlay", status: "Active" }
];

export default function AdminCategoriesPage() {
  // --- Persistent Storage State ---
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  // Toast systems
  const [toasts, setToasts] = useState<{ id: string; message: string; type?: "info" | "error" }[]>([]);

  const triggerToast = (message: string, type: "info" | "error" = "info") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const mapBackendCategory = (c: any): Category => {
    const staticCat = DEFAULT_CATEGORIES.find((sc) => sc.slug === c.slug);
    return {
      id: c.id.toString(),
      title: c.name,
      slug: c.slug,
      description: c.description || "",
      image: staticCat?.image || "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
      featured: staticCat?.featured || false,
      status: "Active"
    };
  };

  const mapBackendSubcategory = (s: any): Subcategory => {
    return {
      id: s.id.toString(),
      name: s.name,
      slug: s.slug,
      parentCategoryId: s.category_id.toString(),
      status: "Active"
    };
  };

  const fetchCategoriesAndSubs = async () => {
    try {
      const catRes = await fetch("http://localhost:5000/api/categories");
      const catJson = await catRes.json();
      if (catJson.success && Array.isArray(catJson.data)) {
        setCategories(catJson.data.map(mapBackendCategory));
      }

      const subRes = await fetch("http://localhost:5000/api/subcategories");
      const subJson = await subRes.json();
      if (subJson.success && Array.isArray(subJson.data)) {
        setSubcategories(subJson.data.map(mapBackendSubcategory));
      }
    } catch (err) {
      console.error("Failed to load categories/subcategories:", err);
    }
  };

  // Load from database
  useEffect(() => {
    fetchCategoriesAndSubs();
  }, []);

  // --- Search and Tabs states ---
  const [activeTab, setActiveTab] = useState<"categories" | "subcategories">("categories");
  const [searchQuery, setSearchQuery] = useState("");

  // --- Modals State Management ---
  const [categoryModal, setCategoryModal] = useState<{
    isOpen: boolean;
    mode: "add" | "edit";
    data?: Category;
  }>({ isOpen: false, mode: "add" });

  const [subcategoryModal, setSubcategoryModal] = useState<{
    isOpen: boolean;
    mode: "add" | "edit";
    data?: Subcategory;
  }>({ isOpen: false, mode: "add" });

  // --- Category Form Fields ---
  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [catImage, setCatImage] = useState("");
  const [catFeatured, setCatFeatured] = useState(false);
  const [catStatus, setCatStatus] = useState<Category["status"]>("Active");

  // --- Subcategory Form Fields ---
  const [subName, setSubName] = useState("");
  const [subSlug, setSubSlug] = useState("");
  const [subParentId, setSubParentId] = useState("");
  const [subStatus, setSubStatus] = useState<Subcategory["status"]>("Active");

  // --- Open Modal Handlers ---
  const openAddCategory = () => {
    setCatName("");
    setCatSlug("");
    setCatDesc("");
    setCatImage("");
    setCatFeatured(false);
    setCatStatus("Active");
    setCategoryModal({ isOpen: true, mode: "add" });
  };

  const openEditCategory = (cat: Category) => {
    setCatName(cat.title);
    setCatSlug(cat.slug);
    setCatDesc(cat.description);
    setCatImage(cat.image);
    setCatFeatured(cat.featured);
    setCatStatus(cat.status);
    setCategoryModal({ isOpen: true, mode: "edit", data: cat });
  };

  const openAddSubcategory = () => {
    setSubName("");
    setSubSlug("");
    setSubParentId(categories[0]?.id || "");
    setSubStatus("Active");
    setSubcategoryModal({ isOpen: true, mode: "add" });
  };

  const openEditSubcategory = (sub: Subcategory) => {
    setSubName(sub.name);
    setSubSlug(sub.slug);
    setSubParentId(sub.parentCategoryId);
    setSubStatus(sub.status);
    setSubcategoryModal({ isOpen: true, mode: "edit", data: sub });
  };

  // --- Dynamic calculations ---
  const counts = useMemo(() => {
    const productsCount: Record<string, number> = {};
    const subsCount: Record<string, number> = {};

    categories.forEach((cat) => {
      // Products count by matching product category with title
      productsCount[cat.id] = INDIAN_HOSPITALITY_PRODUCTS.filter((p) =>
        p.category.toLowerCase().includes(cat.title.split(" ")[0].toLowerCase())
      ).length;

      // Subcategories count
      subsCount[cat.id] = subcategories.filter((s) => s.parentCategoryId === cat.id).length;
    });

    return { productsCount, subsCount };
  }, [categories, subcategories]);

  // --- Form submission handlers ---
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    const generatedSlug = catSlug.trim()
      ? catSlug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : catName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const duplicate = categories.find(
      (c) =>
        c.slug === generatedSlug &&
        (categoryModal.mode === "add" || c.id !== categoryModal.data?.id)
    );
    if (duplicate) {
      triggerToast("Slug conflicts with an existing category.", "error");
      return;
    }

    try {
      const token = sessionStorage.getItem("sbartisan_admin_token");
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      if (categoryModal.mode === "add") {
        const res = await fetch("http://localhost:5000/api/categories", {
          method: "POST",
          headers,
          body: JSON.stringify({
            name: catName.trim(),
            slug: generatedSlug,
            description: catDesc.trim()
          })
        });
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        triggerToast(`Added category "${catName.trim()}"`);
      } else if (categoryModal.mode === "edit" && categoryModal.data) {
        const res = await fetch(`http://localhost:5000/api/categories/${categoryModal.data.id}`, {
          method: "PUT",
          headers,
          body: JSON.stringify({
            name: catName.trim(),
            slug: generatedSlug,
            description: catDesc.trim()
          })
        });
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        triggerToast(`Updated category "${catName.trim()}"`);
      }
      fetchCategoriesAndSubs();
    } catch (err) {
      console.error(err);
      triggerToast("Failed to save category in backend.", "error");
    }

    setCategoryModal({ isOpen: false, mode: "add" });
  };

  const handleSubcategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subName.trim() || !subParentId) return;

    const generatedSlug = subSlug.trim()
      ? subSlug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : subName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");

    try {
      const token = sessionStorage.getItem("sbartisan_admin_token");
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      if (subcategoryModal.mode === "add") {
        const res = await fetch("http://localhost:5000/api/subcategories", {
          method: "POST",
          headers,
          body: JSON.stringify({
            name: subName.trim(),
            slug: generatedSlug,
            category_id: parseInt(subParentId)
          })
        });
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        triggerToast(`Added subcategory "${subName.trim()}"`);
      } else if (subcategoryModal.mode === "edit" && subcategoryModal.data) {
        const res = await fetch(`http://localhost:5000/api/subcategories/${subcategoryModal.data.id}`, {
          method: "PUT",
          headers,
          body: JSON.stringify({
            name: subName.trim(),
            slug: generatedSlug,
            category_id: parseInt(subParentId)
          })
        });
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        triggerToast(`Updated subcategory "${subName.trim()}"`);
      }
      fetchCategoriesAndSubs();
    } catch (err) {
      console.error(err);
      triggerToast("Failed to save subcategory in backend.", "error");
    }

    setSubcategoryModal({ isOpen: false, mode: "add" });
  };

  // --- Deletion handlers ---
  const handleDeleteCategory = async (cat: Category) => {
    const hasSubs = subcategories.some((s) => s.parentCategoryId === cat.id);
    if (hasSubs) {
      triggerToast(`Cannot delete: "${cat.title}" has active subcategories assigned.`, "error");
      return;
    }

    const hasProds = counts.productsCount[cat.id] > 0;
    if (hasProds) {
      if (!window.confirm(`Warning: "${cat.title}" has cataloged items linked. Delete anyway?`)) {
        return;
      }
    } else {
      if (!window.confirm(`Confirm deleting category "${cat.title}"?`)) {
        return;
      }
    }

    try {
      const token = sessionStorage.getItem("sbartisan_admin_token");
      const res = await fetch(`http://localhost:5000/api/categories/${cat.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      triggerToast(`Deleted category "${cat.title}"`);
      fetchCategoriesAndSubs();
    } catch (err) {
      console.error(err);
      triggerToast("Failed to delete category in backend.", "error");
    }
  };

  const handleDeleteSubcategory = async (sub: Subcategory) => {
    if (!window.confirm(`Confirm deleting subcategory "${sub.name}"?`)) {
      return;
    }

    try {
      const token = sessionStorage.getItem("sbartisan_admin_token");
      const res = await fetch(`http://localhost:5000/api/subcategories/${sub.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      triggerToast(`Deleted subcategory "${sub.name}"`);
      fetchCategoriesAndSubs();
    } catch (err) {
      console.error(err);
      triggerToast("Failed to delete subcategory in backend.", "error");
    }
  };

  // --- Search Pipeline ---
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;
    const q = searchQuery.toLowerCase();
    return categories.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [categories, searchQuery]);

  const filteredSubcategories = useMemo(() => {
    if (!searchQuery) return subcategories;
    const q = searchQuery.toLowerCase();
    return subcategories.filter((s) => {
      const parent = categories.find((c) => c.id === s.parentCategoryId);
      return (
        s.name.toLowerCase().includes(q) ||
        s.slug.toLowerCase().includes(q) ||
        (parent && parent.title.toLowerCase().includes(q))
      );
    });
  }, [subcategories, categories, searchQuery]);

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-8 md:space-y-10 selection:bg-[#CBB593] selection:text-[#0B0A0A] relative">
      
      {/* 1. Header Layout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[#23211F] pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#8C8273] uppercase font-light">
            <span>ADMIN PANEL</span>
            <span>•</span>
            <span className="text-[#CBB593]">CATEGORIES REGISTRY</span>
          </div>
          <h2 className="font-serif text-3xl font-light text-white tracking-wide">
            Atelier Directory
          </h2>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={openAddCategory}
            className="py-2.5 px-4 bg-[#CBB593] hover:bg-[#DDC9AC] text-[#0B0A0A] text-[9px] uppercase tracking-[0.2em] font-sans font-semibold transition-all duration-300 rounded-none cursor-pointer border-none"
          >
            + Add Category
          </button>
          <button
            onClick={openAddSubcategory}
            className="py-2.5 px-4 bg-[#1E1D1C] hover:bg-[#2C2B29] border border-[#2C2B29] text-white text-[9px] uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 rounded-none cursor-pointer"
          >
            + Add Subcategory
          </button>
        </div>
      </div>

      {/* 2. Search & Tab controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Switcher Tabs */}
        <div className="flex border-b border-[#23211F] max-w-xs w-full select-none bg-transparent">
          <button
            onClick={() => {
              setActiveTab("categories");
              setSearchQuery("");
            }}
            className={`flex-1 pb-3 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 font-sans border-t-0 border-x-0 border-b-2 bg-transparent cursor-pointer ${
              activeTab === "categories"
                ? "text-white border-[#CBB593] font-medium"
                : "text-[#8C8273] border-transparent hover:text-white"
            }`}
          >
            Categories ({categories.length})
          </button>
          <button
            onClick={() => {
              setActiveTab("subcategories");
              setSearchQuery("");
            }}
            className={`flex-1 pb-3 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 font-sans border-t-0 border-x-0 border-b-2 bg-transparent cursor-pointer ${
              activeTab === "subcategories"
                ? "text-white border-[#CBB593] font-medium"
                : "text-[#8C8273] border-transparent hover:text-white"
            }`}
          >
            Subcategories ({subcategories.length})
          </button>
        </div>

        {/* Search Input Box */}
        <div className="max-w-md w-full relative border-b border-[#2C2B29] pb-1.5 flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-[#8C8273] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeTab === "categories"
                ? "Search by category name, slug or specs..."
                : "Search by subcategory or parent..."
            }
            className="bg-transparent text-xs text-[#EAE5D9] placeholder:text-[#6E6B64] focus:outline-none w-full font-sans font-light border-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-[#8C8273] hover:text-white text-[9px] uppercase tracking-wider bg-transparent border-none p-0 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

      </div>

      {/* 3. Render Table Slots */}
      <div className="bg-[#121110] border border-[#23211F] overflow-hidden">
        
        {/* --- Main Categories Table --- */}
        {activeTab === "categories" && (
          <div className="overflow-x-auto w-full">
            {filteredCategories.length > 0 ? (
              <table className="w-full text-left border-collapse text-xs font-light">
                <thead>
                  <tr className="border-b border-[#23211F] text-[9px] tracking-[0.25em] text-[#8C8273] uppercase font-sans bg-[#181716] select-none">
                    <th className="py-4 px-6 font-medium">Category Details</th>
                    <th className="py-4 px-6 font-medium">URL Slug</th>
                    <th className="py-4 px-6 font-medium text-center">Total Products</th>
                    <th className="py-4 px-6 font-medium text-center">Subcategories</th>
                    <th className="py-4 px-6 font-medium text-center">Featured</th>
                    <th className="py-4 px-6 font-medium text-center">Status</th>
                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#23211F]/60 text-[#EAE5D9]">
                  {filteredCategories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-[#181716]/40 transition-colors duration-200">
                      {/* Name Details */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 overflow-hidden bg-[#1E1D1C] border border-[#2C2B29] shrink-0 select-none">
                            <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="font-serif text-sm font-medium text-white tracking-wide block">
                              {cat.title}
                            </span>
                            <span className="text-[10px] text-[#8C8273] block max-w-xs truncate">
                              {cat.description}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="py-4 px-6 text-[#CBB593] font-mono text-[10px]">
                        /{cat.slug}
                      </td>

                      {/* Dynamic Products count */}
                      <td className="py-4 px-6 text-center text-white font-medium">
                        {counts.productsCount[cat.id]} items
                      </td>

                      {/* Dynamic subcategory count */}
                      <td className="py-4 px-6 text-center text-[#8C8273]">
                        {counts.subsCount[cat.id]} segments
                      </td>

                      {/* Featured */}
                      <td className="py-4 px-6 text-center">
                        {cat.featured ? (
                          <span className="py-0.5 px-2 bg-[#CBB593]/10 border border-[#CBB593]/20 text-[#CBB593] text-[8px] uppercase tracking-widest font-semibold rounded-sm">
                            Yes
                          </span>
                        ) : (
                          <span className="py-0.5 px-2 bg-neutral-800 border border-neutral-700 text-[#8C8273] text-[8px] uppercase tracking-widest font-light rounded-sm">
                            No
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 text-center">
                        {cat.status === "Active" ? (
                          <span className="py-0.5 px-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] uppercase tracking-widest rounded-sm font-semibold">
                            Active
                          </span>
                        ) : (
                          <span className="py-0.5 px-2 bg-neutral-800 border border-[#2C2B29] text-[#8C8273] text-[8px] uppercase tracking-widest rounded-sm">
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* Action Triggers */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-4">
                          <button
                            onClick={() => openEditCategory(cat)}
                            className="text-[#8C8273] hover:text-white transition-colors duration-300 uppercase text-[9px] tracking-wider bg-transparent border-none p-0 cursor-pointer"
                          >
                            Edit
                          </button>
                          <span className="text-[#23211F] select-none">|</span>
                          <button
                            onClick={() => handleDeleteCategory(cat)}
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
              <div className="py-16 text-center space-y-2">
                <p className="text-white text-xs font-serif italic">No categories found matching query</p>
                <p className="text-[10px] text-[#8C8273] font-sans font-light uppercase tracking-wider">Try clearing filters or search queries</p>
              </div>
            )}
          </div>
        )}

        {/* --- Subcategories Table --- */}
        {activeTab === "subcategories" && (
          <div className="overflow-x-auto w-full">
            {filteredSubcategories.length > 0 ? (
              <table className="w-full text-left border-collapse text-xs font-light">
                <thead>
                  <tr className="border-b border-[#23211F] text-[9px] tracking-[0.25em] text-[#8C8273] uppercase font-sans bg-[#181716] select-none">
                    <th className="py-4 px-6 font-medium">Subcategory</th>
                    <th className="py-4 px-6 font-medium">Slug</th>
                    <th className="py-4 px-6 font-medium">Parent Category</th>
                    <th className="py-4 px-6 font-medium text-center">Status</th>
                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#23211F]/60 text-[#EAE5D9]">
                  {filteredSubcategories.map((sub) => {
                    const parent = categories.find((c) => c.id === sub.parentCategoryId);
                    return (
                      <tr key={sub.id} className="hover:bg-[#181716]/40 transition-colors duration-200">
                        {/* Name */}
                        <td className="py-4 px-6 text-white font-serif text-sm tracking-wide font-medium">
                          {sub.name}
                        </td>

                        {/* Slug */}
                        <td className="py-4 px-6 text-[#8C8273] font-mono text-[10px]">
                          /{sub.slug}
                        </td>

                        {/* Parent Category mapping */}
                        <td className="py-4 px-6 text-[#DDC9AC]">
                          {parent ? parent.title : "Unassigned / General"}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-6 text-center">
                          {sub.status === "Active" ? (
                            <span className="py-0.5 px-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] uppercase tracking-widest rounded-sm font-semibold">
                              Active
                            </span>
                          ) : (
                            <span className="py-0.5 px-2 bg-neutral-800 border border-[#2C2B29] text-[#8C8273] text-[8px] uppercase tracking-widest rounded-sm">
                              Inactive
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-4">
                            <button
                              onClick={() => openEditSubcategory(sub)}
                              className="text-[#8C8273] hover:text-white transition-colors duration-300 uppercase text-[9px] tracking-wider bg-transparent border-none p-0 cursor-pointer"
                            >
                              Edit
                            </button>
                            <span className="text-[#23211F] select-none">|</span>
                            <button
                              onClick={() => handleDeleteSubcategory(sub)}
                              className="text-[#8C8273] hover:text-red-400 transition-colors duration-300 uppercase text-[9px] tracking-wider bg-transparent border-none p-0 cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="py-16 text-center space-y-2">
                <p className="text-white text-xs font-serif italic">No subcategories found matching query</p>
                <p className="text-[10px] text-[#8C8273] font-sans font-light uppercase tracking-wider">Try clearing filters or search queries</p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* 4. MODALS OVERLAYS */}
      <AnimatePresence>
        
        {/* --- Category Modal --- */}
        {categoryModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCategoryModal({ isOpen: false, mode: "add" })}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-[#121110] border border-[#23211F] p-8 shadow-2xl space-y-6 z-10 text-[#EAE5D9]"
            >
              <div>
                <span className="text-[9px] tracking-widest text-[#CBB593] uppercase font-semibold block">
                  {categoryModal.mode === "add" ? "Atelier Registry" : "Update Registry"}
                </span>
                <h3 className="font-serif text-2xl font-light text-white tracking-wide mt-1">
                  {categoryModal.mode === "add" ? "Add Main Category" : "Edit Category Specs"}
                </h3>
              </div>

              <form onSubmit={handleCategorySubmit} className="space-y-4 font-sans text-xs">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                    Category Name
                  </label>
                  <input
                    type="text"
                    required
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    placeholder="E.g., Outdoor Furniture"
                    className="w-full bg-[#1E1D1C] border border-[#2C2B29] focus:border-[#CBB593] p-3 text-xs text-white placeholder:text-[#6E6B64] focus:outline-none rounded-none"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                    URL Slug (Optional - Autogenerated if blank)
                  </label>
                  <input
                    type="text"
                    value={catSlug}
                    onChange={(e) => setCatSlug(e.target.value)}
                    placeholder="E.g., outdoor-furniture"
                    className="w-full bg-[#1E1D1C] border border-[#2C2B29] focus:border-[#CBB593] p-3 text-xs text-white placeholder:text-[#6E6B64] focus:outline-none rounded-none font-mono"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                    Editorial Description
                  </label>
                  <textarea
                    value={catDesc}
                    onChange={(e) => setCatDesc(e.target.value)}
                    placeholder="Describe material compositions, artisan techniques and usage scope..."
                    rows={3}
                    className="w-full bg-[#1E1D1C] border border-[#2C2B29] focus:border-[#CBB593] p-3 text-xs text-white placeholder:text-[#6E6B64] focus:outline-none resize-none rounded-none"
                  />
                </div>

                {/* Image */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                    Banner Image URL (Unsplash Link placeholder)
                  </label>
                  <input
                    type="text"
                    value={catImage}
                    onChange={(e) => setCatImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-[#1E1D1C] border border-[#2C2B29] focus:border-[#CBB593] p-3 text-xs text-white placeholder:text-[#6E6B64] focus:outline-none rounded-none font-mono"
                  />
                </div>

                {/* Featured / Status Grid */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Status */}
                  <div className="space-y-1.5">
                    <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                      Status State
                    </label>
                    <select
                      value={catStatus}
                      onChange={(e) => setCatStatus(e.target.value as Category["status"])}
                      className="w-full bg-[#1E1D1C] border border-[#2C2B29] focus:border-[#CBB593] p-3 text-xs text-white focus:outline-none rounded-none"
                    >
                      <option value="Active">Active Showroom</option>
                      <option value="Inactive">Inactive Archive</option>
                    </select>
                  </div>

                  {/* Featured */}
                  <div className="space-y-1.5 flex flex-col justify-end">
                    <label className="flex items-center gap-3 cursor-pointer py-3 select-none">
                      <input
                        type="checkbox"
                        checked={catFeatured}
                        onChange={(e) => setCatFeatured(e.target.checked)}
                        className="accent-[#CBB593] w-4 h-4"
                      />
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-[#EAE5D9]">
                        Featured Showcase
                      </span>
                    </label>
                  </div>

                </div>

                {/* Modal Footer buttons */}
                <div className="pt-4 border-t border-[#23211F] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setCategoryModal({ isOpen: false, mode: "add" })}
                    className="py-2.5 px-6 border border-[#2C2B29] hover:bg-[#1E1D1C] text-[#8C8273] hover:text-white text-[9px] uppercase tracking-[0.2em] font-sans font-medium transition-colors duration-300 rounded-none cursor-pointer bg-transparent"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-6 bg-[#CBB593] hover:bg-[#DDC9AC] text-[#0B0A0A] text-[9px] uppercase tracking-[0.2em] font-sans font-semibold transition-colors duration-300 rounded-none cursor-pointer border-none"
                  >
                    Save Changes
                  </button>
                </div>

              </form>
            </motion.div>

          </div>
        )}

        {/* --- Subcategory Modal --- */}
        {subcategoryModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSubcategoryModal({ isOpen: false, mode: "add" })}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-[#121110] border border-[#23211F] p-8 shadow-2xl space-y-6 z-10 text-[#EAE5D9]"
            >
              <div>
                <span className="text-[9px] tracking-widest text-[#CBB593] uppercase font-semibold block">
                  {subcategoryModal.mode === "add" ? "Atelier Registry" : "Update Registry"}
                </span>
                <h3 className="font-serif text-2xl font-light text-white tracking-wide mt-1">
                  {subcategoryModal.mode === "add" ? "Add Subcategory" : "Edit Subcategory Specs"}
                </h3>
              </div>

              <form onSubmit={handleSubcategorySubmit} className="space-y-4 font-sans text-xs">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                    Subcategory Name
                  </label>
                  <input
                    type="text"
                    required
                    value={subName}
                    onChange={(e) => setSubName(e.target.value)}
                    placeholder="E.g., Lounge Sofas"
                    className="w-full bg-[#1E1D1C] border border-[#2C2B29] focus:border-[#CBB593] p-3 text-xs text-white placeholder:text-[#6E6B64] focus:outline-none rounded-none"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                    URL Slug (Optional - Autogenerated if blank)
                  </label>
                  <input
                    type="text"
                    value={subSlug}
                    onChange={(e) => setSubSlug(e.target.value)}
                    placeholder="E.g., lounge-sofas"
                    className="w-full bg-[#1E1D1C] border border-[#2C2B29] focus:border-[#CBB593] p-3 text-xs text-white placeholder:text-[#6E6B64] focus:outline-none rounded-none font-mono"
                  />
                </div>

                {/* Assign Parent Category */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                    Assign Parent Category
                  </label>
                  <select
                    value={subParentId}
                    onChange={(e) => setSubParentId(e.target.value)}
                    className="w-full bg-[#1E1D1C] border border-[#2C2B29] focus:border-[#CBB593] p-3 text-xs text-white focus:outline-none rounded-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status state */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                    Status State
                  </label>
                  <select
                    value={subStatus}
                    onChange={(e) => setSubStatus(e.target.value as Subcategory["status"])}
                    className="w-full bg-[#1E1D1C] border border-[#2C2B29] focus:border-[#CBB593] p-3 text-xs text-white focus:outline-none rounded-none"
                  >
                    <option value="Active">Active Showroom</option>
                    <option value="Inactive">Inactive Archive</option>
                  </select>
                </div>

                {/* Modal Footer buttons */}
                <div className="pt-4 border-t border-[#23211F] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSubcategoryModal({ isOpen: false, mode: "add" })}
                    className="py-2.5 px-6 border border-[#2C2B29] hover:bg-[#1E1D1C] text-[#8C8273] hover:text-white text-[9px] uppercase tracking-[0.2em] font-sans font-medium transition-colors duration-300 rounded-none cursor-pointer bg-transparent"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-6 bg-[#CBB593] hover:bg-[#DDC9AC] text-[#0B0A0A] text-[9px] uppercase tracking-[0.2em] font-sans font-semibold transition-colors duration-300 rounded-none cursor-pointer border-none"
                  >
                    Save Changes
                  </button>
                </div>

              </form>
            </motion.div>

          </div>
        )}

      </AnimatePresence>

      {/* 5. TOAST NOTIFICATIONS */}
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
