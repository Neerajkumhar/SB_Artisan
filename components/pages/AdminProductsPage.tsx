import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { 
  INDIAN_HOSPITALITY_PRODUCTS, 
  HospitalityProduct, 
  fetchProducts, 
  MOCK_COLLECTIONS 
} from "../product/hospitality-data";

// Toast Interface
interface Toast {
  id: string;
  message: string;
  type: "success" | "info" | "error";
}

export default function AdminProductsPage() {
  const navigate = useNavigate();

  // State Management
  const [products, setProducts] = useState<HospitalityProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [featuredFilter, setFeaturedFilter] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  
  // Categories and Subcategories from Backend
  const [categories, setCategories] = useState<{ id: number; name: string; slug: string }[]>([]);
  const [subcategories, setSubcategories] = useState<{ id: number; name: string; slug: string; category_id: number }[]>([]);

  // Drawer & Modal States
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<HospitalityProduct | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Form State
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState({
    title: "",
    slug: "",
    category_id: "",
    subcategory_id: "",
    description: "",
    story: "",
    designer: "SB Artisan",
    materials: "",
    dimensionsHeight: "",
    dimensionsWidth: "",
    dimensionsDepth: "",
    dimensionsUnit: "cm" as "cm" | "in",
    finishes: "",
    price: "",
    image: "",
    hospitalityUsage: "",
    featured: false,
    tags: "",
    collectionId: "coll-haveli"
  });

  // Database Load
  const loadInitialData = async () => {
    setLoading(true);
    try {
      // Fetch categories
      const catRes = await fetch("http://localhost:5000/api/categories");
      const catJson = await catRes.json();
      if (catJson.success) {
        setCategories(catJson.data);
      }

      // Fetch subcategories
      const subRes = await fetch("http://localhost:5000/api/subcategories");
      const subJson = await subRes.json();
      if (subJson.success) {
        setSubcategories(subJson.data);
      }

      // Fetch products
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load initial data for admin products page:", err);
      showToast("Failed to fetch data from backend", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Toast Trigger Helper
  const showToast = (message: string, type: "success" | "info" | "error" = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Filtered Products Calculation
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.materials.some(m => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = 
      selectedCategory === "all" || 
      product.category_id?.toString() === selectedCategory;
      
    const matchesFeatured = !featuredFilter || product.featured;

    return matchesSearch && matchesCategory && matchesFeatured;
  });

  // Pagination Calculation
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    // Reset page if filters change
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, featuredFilter, pageSize]);

  // Slugifier Helper
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormValues((prev) => ({
      ...prev,
      title: val,
      slug: generateSlug(val)
    }));
  };

  // Open Drawer for Add Product
  const handleOpenAddDrawer = () => {
    setEditingProduct(null);
    setFormErrors({});
    setFormValues({
      title: "",
      slug: "",
      category_id: categories[0]?.id.toString() || "",
      subcategory_id: "",
      description: "",
      story: "",
      designer: "SB Artisan",
      materials: "",
      dimensionsHeight: "",
      dimensionsWidth: "",
      dimensionsDepth: "",
      dimensionsUnit: "cm",
      finishes: "",
      price: "",
      image: "",
      hospitalityUsage: "",
      featured: false,
      tags: "",
      collectionId: "coll-haveli"
    });
    setIsDrawerOpen(true);
  };

  // Open Drawer for Edit Product
  const handleOpenEditDrawer = (product: HospitalityProduct) => {
    setEditingProduct(product);
    setFormErrors({});
    setFormValues({
      title: product.title,
      slug: product.slug,
      category_id: product.category_id?.toString() || "",
      subcategory_id: product.subcategory_id?.toString() || "",
      description: product.description,
      story: product.story,
      designer: product.designer,
      materials: product.materials.join(", "),
      dimensionsHeight: product.dimensions?.height?.toString() || "",
      dimensionsWidth: product.dimensions?.width?.toString() || "",
      dimensionsDepth: product.dimensions?.depth?.toString() || "",
      dimensionsUnit: product.dimensions?.unit || "cm",
      finishes: product.finishes.join(", "),
      price: product.price ? product.price.replace(/[^\d.]/g, "") : "",
      image: product.image,
      hospitalityUsage: product.hospitalityUsage || "",
      featured: product.featured,
      tags: product.tags.join(", "),
      collectionId: product.tags.includes("haveli") ? "coll-haveli" : product.tags.includes("cane") ? "coll-nilgiri" : "coll-raj"
    });
    setIsDrawerOpen(true);
  };

  // Submit Drawer Form
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formValues.title.trim()) errors.title = "Commission title is required";
    if (!formValues.slug.trim()) errors.slug = "URL identifier slug is required";
    if (!formValues.category_id) errors.category_id = "Category selection is required";
    if (!formValues.subcategory_id) errors.subcategory_id = "Subcategory selection is required";
    if (!formValues.materials.trim()) errors.materials = "Materials specs are required";
    if (!formValues.image.trim()) errors.image = "Preview image URL is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast("Please review form validation warnings", "error");
      return;
    }

    const priceNum = parseFloat(formValues.price.replace(/[^\d.]/g, "")) || 0;
    const materialStr = formValues.materials.split(",").map((m) => m.trim()).filter(Boolean).join(", ");
    const dimensionsStr = `${formValues.dimensionsHeight || 0} x ${formValues.dimensionsWidth || 0} x ${formValues.dimensionsDepth || 0} ${formValues.dimensionsUnit}`;

    const payload = {
      category_id: parseInt(formValues.category_id),
      subcategory_id: parseInt(formValues.subcategory_id),
      name: formValues.title.trim(),
      slug: formValues.slug.trim(),
      description: formValues.description.trim(),
      material: materialStr,
      dimensions: dimensionsStr,
      price: priceNum,
      featured: formValues.featured,
      images: [
        { url: formValues.image.trim(), is_primary: true }
      ]
    };

    try {
      const token = sessionStorage.getItem("sbartisan_admin_token");
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      if (editingProduct) {
        // PUT request to /api/products/:id
        const res = await fetch(`http://localhost:5000/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || `HTTP Error: ${res.status}`);
        }
        
        showToast(`Successfully modified "${formValues.title}"`);
      } else {
        // POST request to /api/products
        const res = await fetch("http://localhost:5000/api/products", {
          method: "POST",
          headers,
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || `HTTP Error: ${res.status}`);
        }
        
        showToast(`Successfully registered new commission "${formValues.title}"`);
      }

      setIsDrawerOpen(false);
      // Reload products list from backend to reflect database state
      const data = await fetchProducts();
      setProducts(data);
    } catch (err: any) {
      console.error("Error submitting product form:", err);
      showToast(err.message || "Failed to save product registry record", "error");
    }
  };

  // Delete Action
  const handleDeleteProduct = async () => {
    if (!deletingProductId) return;
    try {
      const token = sessionStorage.getItem("sbartisan_admin_token");
      const res = await fetch(`http://localhost:5000/api/products/${deletingProductId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || `HTTP Error: ${res.status}`);
      }

      showToast(`Removed "${products.find(p => p.id === deletingProductId)?.title || 'product'}" from catalog registry`, "info");
      setDeletingProductId(null);
      
      // Reload products
      const data = await fetchProducts();
      setProducts(data);
    } catch (err: any) {
      console.error("Error deleting product:", err);
      showToast(err.message || "Failed to remove product from registry", "error");
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-10 selection:bg-[#CBB593] selection:text-[#0B0A0A]">
        
        {/* Top Navbar & Header bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#23211F] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#8C8273] uppercase font-light">
              <span>ADMIN PANEL</span>
              <span>•</span>
              <span className="text-[#CBB593]">COMMISSIONS MANAGEMENT</span>
            </div>
            <h2 className="font-serif text-3xl font-light text-white tracking-wide">
              Product Registry
            </h2>
          </div>

          <button
            onClick={handleOpenAddDrawer}
            className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#CBB593] text-[#0B0A0A] hover:bg-[#DDC9AC] font-sans text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-none border-none shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Commission</span>
          </button>
        </div>

        {/* 3. STATISTICS PANEL PANEL */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#121110] border border-[#23211F] p-6 space-y-2">
            <p className="text-[10px] tracking-[0.2em] text-[#8C8273] uppercase font-light">Total Commissions</p>
            <p className="text-3xl font-serif text-white font-light">{products.length}</p>
          </div>
          <div className="bg-[#121110] border border-[#23211F] p-6 space-y-2">
            <p className="text-[10px] tracking-[0.2em] text-[#8C8273] uppercase font-light">Featured Objects</p>
            <p className="text-3xl font-serif text-[#CBB593] font-light">{products.filter((p) => p.featured).length}</p>
          </div>
          <div className="bg-[#121110] border border-[#23211F] p-6 space-y-2">
            <p className="text-[10px] tracking-[0.2em] text-[#8C8273] uppercase font-light">Categories Registered</p>
            <p className="text-3xl font-serif text-white font-light">6</p>
          </div>
          <div className="bg-[#121110] border border-[#23211F] p-6 space-y-2">
            <p className="text-[10px] tracking-[0.2em] text-[#8C8273] uppercase font-light">Atelier Staff Active</p>
            <p className="text-3xl font-serif text-white font-light">12</p>
          </div>
        </div>

        {/* 4. TABLE CONTROLS BAR */}
        <div className="bg-[#121110] border border-[#23211F] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 flex-grow">
            
            {/* Search Input */}
            <div className="relative w-full md:w-64 border-b border-[#2C2B29] pb-1 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#8C8273]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog registry..."
                className="bg-transparent text-xs text-white placeholder:text-[#8C8273] focus:outline-none w-full font-sans font-light"
              />
            </div>

            {/* Category Select Dropdown */}
            <div className="relative w-full md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#1E1D1C] text-[10px] tracking-[0.18em] uppercase text-[#EAE5D9] border border-[#2C2B29] py-2 px-3 rounded-none focus:outline-none focus:border-[#CBB593]"
              >
                <option value="all">ALL CATEGORIES</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Featured filter toggle */}
            <button
              onClick={() => setFeaturedFilter((prev) => !prev)}
              className={cn(
                "py-2 px-4 border text-[9px] tracking-[0.2em] uppercase font-sans font-medium transition-all duration-300 rounded-none",
                featuredFilter 
                  ? "bg-[#CBB593] border-[#CBB593] text-[#0B0A0A]" 
                  : "bg-transparent border-[#2C2B29] text-[#8C8273] hover:border-[#8C8273] hover:text-white"
              )}
            >
              Featured Only
            </button>
          </div>

          {/* Page size dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[9px] tracking-wider text-[#8C8273] uppercase">Page Size:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="bg-[#1E1D1C] text-xs text-[#EAE5D9] border border-[#2C2B29] py-1 px-2 rounded-none focus:outline-none"
            >
              <option value={5}>5 Rows</option>
              <option value={10}>10 Rows</option>
              <option value={20}>20 Rows</option>
            </select>
          </div>
        </div>

        {/* 5. DATA TABLE SECTION */}
        <div className="bg-[#121110] border border-[#23211F] overflow-hidden">
          <div className="overflow-x-auto w-full">
            {loading ? (
              // Loading skeletons
              <div className="p-8 space-y-4">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className="flex items-center gap-6 animate-pulse border-b border-[#23211F] pb-4">
                    <div className="w-12 h-12 bg-[#1E1D1C] shrink-0" />
                    <div className="space-y-2 flex-grow">
                      <div className="h-4 bg-[#1E1D1C] w-1/4" />
                      <div className="h-3 bg-[#1E1D1C] w-1/3" />
                    </div>
                    <div className="h-4 bg-[#1E1D1C] w-20" />
                    <div className="h-4 bg-[#1E1D1C] w-24" />
                    <div className="h-8 bg-[#1E1D1C] w-32 shrink-0" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              // Empty State
              <div className="py-24 text-center space-y-6">
                <svg className="w-12 h-12 text-[#8C8273] mx-auto opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <div className="space-y-2">
                  <p className="font-serif text-lg text-white font-light">No records cataloged</p>
                  <p className="font-sans text-xs text-[#8C8273] font-light max-w-sm mx-auto">
                    We could not retrieve any furniture commission records matching your active filters. Try searching for other tags or clear current filters.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setFeaturedFilter(false);
                  }}
                  className="py-2.5 px-6 border border-[#CBB593] text-[9px] tracking-[0.2em] uppercase font-sans font-medium text-[#CBB593] hover:bg-[#CBB593] hover:text-[#0B0A0A] transition-all duration-300 rounded-none bg-transparent"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              // Table Rows
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#23211F] text-[9px] tracking-[0.25em] text-[#8C8273] uppercase font-sans bg-[#181716] select-none">
                    <th className="py-4 px-6 font-medium">Image</th>
                    <th className="py-4 px-6 font-medium">Commission Details</th>
                    <th className="py-4 px-6 font-medium">Category</th>
                    <th className="py-4 px-6 font-medium">Collection</th>
                    <th className="py-4 px-6 font-medium">Materials Spec</th>
                    <th className="py-4 px-6 font-medium text-center">Featured</th>
                    <th className="py-4 px-6 font-medium">Last Updated</th>
                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#23211F]/60 text-xs font-light">
                  {paginatedProducts.map((product) => (
                    <motion.tr 
                      key={product.id}
                      className="hover:bg-[#181716]/40 transition-colors duration-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Image Thumbnail with Modal trigger */}
                      <td className="py-4 px-6 shrink-0">
                        <div className="w-12 h-12 bg-[#1E1D1C] overflow-hidden border border-[#2C2B29] relative group cursor-pointer">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </td>

                      {/* Name & Subheading */}
                      <td className="py-4 px-6 max-w-xs">
                        <div className="space-y-1">
                          <span className="font-serif text-sm font-medium text-white tracking-wide hover:text-[#CBB593] transition-colors block cursor-pointer" onClick={() => handleOpenEditDrawer(product)}>
                            {product.title}
                          </span>
                          <span className="text-[10px] text-[#8C8273] font-sans tracking-wide block truncate">
                            {product.designer}
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6 whitespace-nowrap text-[#DDC9AC]">
                        {product.category}
                      </td>

                      {/* Collection */}
                      <td className="py-4 px-6 whitespace-nowrap text-[#8C8273]">
                        {product.tags.includes("haveli") 
                          ? "Shekhawati Haveli" 
                          : product.tags.includes("cane") 
                            ? "Nilgiri Canopy" 
                            : "Raj Gharana Inlay"}
                      </td>

                      {/* Materials List Chips */}
                      <td className="py-4 px-6 max-w-xs">
                        <div className="flex flex-wrap gap-1.5">
                          {product.materials.slice(0, 2).map((m, i) => (
                            <span key={i} className="text-[9px] px-2 py-0.5 bg-[#1E1D1C] border border-[#2C2B29] text-[#8C8273] rounded-sm select-none">
                              {m}
                            </span>
                          ))}
                          {product.materials.length > 2 && (
                            <span className="text-[9px] px-1.5 py-0.5 bg-[#1E1D1C] text-[#8C8273]/80 italic">
                              +{product.materials.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Featured Status Badge */}
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        {product.featured ? (
                          <span className="inline-flex items-center gap-1.5 py-1 px-3 bg-[#CBB593]/10 border border-[#CBB593]/20 text-[#CBB593] text-[9px] tracking-widest uppercase font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#CBB593] animate-pulse" />
                            Featured
                          </span>
                        ) : (
                          <span className="inline-flex items-center py-1 px-3 bg-[#1E1D1C] border border-[#2C2B29] text-[#8C8273] text-[9px] tracking-widest uppercase">
                            Standard
                          </span>
                        )}
                      </td>

                      {/* Last Updated */}
                      <td className="py-4 px-6 text-[#8C8273] whitespace-nowrap">
                        June 03, 2026
                      </td>

                      {/* CRUD Row Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-3.5">
                          <button
                            onClick={() => handleOpenEditDrawer(product)}
                            className="text-[#8C8273] hover:text-[#CBB593] hover:underline transition-all duration-300 text-[10px] tracking-wider uppercase bg-transparent border-none p-0"
                          >
                            Edit
                          </button>
                          <span className="text-[#2C2B29] select-none">|</span>
                          <button
                            onClick={() => setDeletingProductId(product.id)}
                            className="text-[#8C8273] hover:text-red-400 hover:underline transition-all duration-300 text-[10px] tracking-wider uppercase bg-transparent border-none p-0"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* 6. PAGINATION INTERACTION CONTROLS */}
          {filteredProducts.length > 0 && (
            <div className="bg-[#181716] border-t border-[#23211F] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
              <span className="text-[10px] tracking-wide text-[#8C8273] uppercase">
                Showing {Math.min((currentPage - 1) * pageSize + 1, filteredProducts.length)} to {Math.min(currentPage * pageSize, filteredProducts.length)} of {filteredProducts.length} Entries
              </span>
              
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 border border-[#2C2B29] text-[#8C8273] hover:text-white disabled:opacity-30 disabled:hover:text-[#8C8273] rounded-none bg-transparent"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pNum = idx + 1;
                  const isActive = currentPage === pNum;
                  return (
                    <button
                      key={pNum}
                      onClick={() => setCurrentPage(pNum)}
                      className={cn(
                        "w-8 h-8 flex items-center justify-center text-[10px] tracking-wide font-medium rounded-none transition-all duration-300",
                        isActive 
                          ? "bg-[#CBB593] text-[#0B0A0A] border border-[#CBB593]" 
                          : "border border-[#2C2B29] text-[#8C8273] hover:text-white hover:border-[#8C8273] bg-transparent"
                      )}
                    >
                      {pNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 border border-[#2C2B29] text-[#8C8273] hover:text-white disabled:opacity-30 disabled:hover:text-[#8C8273] rounded-none bg-transparent"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>



      {/* 7. INTERACTIVE SIDE DRAWER FORM (ADD / EDIT) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Dark blur backdrop */}
            <motion.div
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Slide-in side drawer panel */}
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-[#121110] border-l border-[#23211F] z-50 flex flex-col justify-between shadow-2xl overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#23211F] flex items-center justify-between sticky top-0 bg-[#121110] z-15">
                <div className="space-y-1">
                  <span className="text-[9px] tracking-[0.25em] text-[#CBB593] uppercase font-light">Commission Form</span>
                  <h3 className="font-serif text-xl font-light text-white tracking-wide">
                    {editingProduct ? `Modify: ${editingProduct.title}` : "New Furniture Commission"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 border border-[#2C2B29] text-[#8C8273] hover:text-white rounded-none bg-transparent focus:outline-none"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form Body Scroll area */}
              <form onSubmit={handleSubmitForm} className="p-6 space-y-6 flex-grow">
                {/* Product Title */}
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Title Name *</label>
                  <input
                    type="text"
                    required
                    value={formValues.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. Haveli Reclaimed Teak Cabinet"
                    className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none"
                  />
                  {formErrors.title && <p className="text-[10px] text-red-400 font-light">{formErrors.title}</p>}
                </div>

                {/* Slug & Designer Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">URL Slug Identifier *</label>
                    <input
                      type="text"
                      required
                      value={formValues.slug}
                      onChange={(e) => setFormValues(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="e.g. haveli-reclaimed-teak-cabinet"
                      className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none"
                    />
                    {formErrors.slug && <p className="text-[10px] text-red-400 font-light">{formErrors.slug}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Designer/Atelier</label>
                    <input
                      type="text"
                      value={formValues.designer}
                      onChange={(e) => setFormValues(prev => ({ ...prev, designer: e.target.value }))}
                      placeholder="e.g. Jodhpur Woodworking Atelier"
                      className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none"
                    />
                  </div>
                </div>

                {/* Category & Subcategory Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Category Selection *</label>
                    <select
                      value={formValues.category_id}
                      onChange={(e) => {
                        const catId = e.target.value;
                        setFormValues(prev => ({ 
                          ...prev, 
                          category_id: catId,
                          subcategory_id: "" 
                        }));
                      }}
                      className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>
                      ))}
                    </select>
                    {formErrors.category_id && <p className="text-[10px] text-red-400 font-light">{formErrors.category_id}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Subcategory Selection *</label>
                    <select
                      value={formValues.subcategory_id}
                      onChange={(e) => setFormValues(prev => ({ ...prev, subcategory_id: e.target.value }))}
                      className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none"
                    >
                      <option value="">Select Subcategory</option>
                      {subcategories
                        .filter(sub => !formValues.category_id || sub.category_id.toString() === formValues.category_id)
                        .map(sub => (
                          <option key={sub.id} value={sub.id.toString()}>{sub.name}</option>
                        ))
                      }
                    </select>
                    {formErrors.subcategory_id && <p className="text-[10px] text-red-400 font-light">{formErrors.subcategory_id}</p>}
                  </div>
                </div>

                {/* Price & Image Path */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2 md:col-span-1">
                    <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Price Value</label>
                    <input
                      type="text"
                      value={formValues.price}
                      onChange={(e) => setFormValues(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="e.g. 24,500"
                      className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Image URL Link *</label>
                    <input
                      type="text"
                      required
                      value={formValues.image}
                      onChange={(e) => setFormValues(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none"
                    />
                    {formErrors.image && <p className="text-[10px] text-red-400 font-light">{formErrors.image}</p>}
                  </div>
                </div>

                {/* Image Live Preview */}
                {formValues.image && (
                  <div className="p-3 border border-[#2C2B29] bg-[#1E1D1C] flex items-center gap-4">
                    <img 
                      src={formValues.image} 
                      alt="Form Preview" 
                      className="w-14 h-14 object-cover border border-[#2C2B29] shrink-0"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <div className="space-y-0.5">
                      <span className="text-[9px] tracking-wider text-[#CBB593] uppercase font-medium">Image Live Preview</span>
                      <p className="text-[10px] text-[#8C8273] font-light max-w-sm truncate">{formValues.image}</p>
                    </div>
                  </div>
                )}

                {/* Materials & Finishes (Comma-separated) */}
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Materials List * (Comma-separated)</label>
                  <input
                    type="text"
                    required
                    value={formValues.materials}
                    onChange={(e) => setFormValues(prev => ({ ...prev, materials: e.target.value }))}
                    placeholder="e.g. Reclaimed Teakwood, Rattan Cane, Brass Dowels"
                    className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none"
                  />
                  {formErrors.materials && <p className="text-[10px] text-red-400 font-light">{formErrors.materials}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Available Finishes (Comma-separated)</label>
                  <input
                    type="text"
                    value={formValues.finishes}
                    onChange={(e) => setFormValues(prev => ({ ...prev, finishes: e.target.value }))}
                    placeholder="e.g. Natural Teak Wax, Ebonized Charcoal Oil"
                    className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none"
                  />
                </div>

                {/* Dimensions (Height x Width x Depth) */}
                <div className="space-y-3">
                  <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light block">Dimensions Specs</label>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <span className="text-[9px] text-[#8C8273] uppercase">H (Height)</span>
                      <input
                        type="text"
                        value={formValues.dimensionsHeight}
                        onChange={(e) => setFormValues(prev => ({ ...prev, dimensionsHeight: e.target.value }))}
                        placeholder="82"
                        className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-2.5 rounded-none focus:outline-none text-center"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-[#8C8273] uppercase">W (Width)</span>
                      <input
                        type="text"
                        value={formValues.dimensionsWidth}
                        onChange={(e) => setFormValues(prev => ({ ...prev, dimensionsWidth: e.target.value }))}
                        placeholder="54"
                        className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-2.5 rounded-none focus:outline-none text-center"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-[#8C8273] uppercase">D (Depth)</span>
                      <input
                        type="text"
                        value={formValues.dimensionsDepth}
                        onChange={(e) => setFormValues(prev => ({ ...prev, dimensionsDepth: e.target.value }))}
                        placeholder="56"
                        className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-2.5 rounded-none focus:outline-none text-center"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-[#8C8273] uppercase">Unit</span>
                      <select
                        value={formValues.dimensionsUnit}
                        onChange={(e) => setFormValues(prev => ({ ...prev, dimensionsUnit: e.target.value as "cm" | "in" }))}
                        className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-2.5 rounded-none focus:outline-none"
                      >
                        <option value="cm">cm</option>
                        <option value="in">in</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Tags & Collection Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Tags (Comma-separated)</label>
                    <input
                      type="text"
                      value={formValues.tags}
                      onChange={(e) => setFormValues(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="e.g. dining, teak, haveli"
                      className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Active Collection</label>
                    <select
                      value={formValues.collectionId}
                      onChange={(e) => setFormValues(prev => ({ ...prev, collectionId: e.target.value }))}
                      className="w-full bg-[#1E1D1C] text-xs text-[#EAE5D9] border border-[#2C2B29] p-3 rounded-none focus:outline-none"
                    >
                      {MOCK_COLLECTIONS.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Editorial Description */}
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Editorial Description</label>
                  <textarea
                    rows={2}
                    value={formValues.description}
                    onChange={(e) => setFormValues(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Short, evocative single sentence catalog description..."
                    className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none font-sans font-light resize-none"
                  />
                </div>

                {/* Craftsmanship storytelling */}
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Artisan Storytelling</label>
                  <textarea
                    rows={4}
                    value={formValues.story}
                    onChange={(e) => setFormValues(prev => ({ ...prev, story: e.target.value }))}
                    placeholder="Full, descriptive craftsmanship narrative detailing the master woodworker guild, techniques used, and structural provenance..."
                    className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none font-sans font-light resize-none"
                  />
                </div>

                {/* Hospitality Placement Usage */}
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Hospitality Placement Usage</label>
                  <input
                    type="text"
                    value={formValues.hospitalityUsage}
                    onChange={(e) => setFormValues(prev => ({ ...prev, hospitalityUsage: e.target.value }))}
                    placeholder="e.g. Fine dining salons, boutique resort lobbies"
                    className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none"
                  />
                </div>

                {/* Featured Status Toggle */}
                <div className="flex items-center justify-between p-4 border border-[#23211F] bg-[#181716] select-none">
                  <div className="space-y-0.5">
                    <span className="text-[10px] tracking-widest text-white uppercase font-light block">Featured Status</span>
                    <span className="text-[9px] text-[#8C8273] font-sans font-light block">Promote commission onto public best-sellers list</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormValues(prev => ({ ...prev, featured: !prev.featured }))}
                    className={cn(
                      "w-12 h-6 flex items-center p-1 cursor-pointer transition-colors duration-300 rounded-full border-none focus:outline-none",
                      formValues.featured ? "bg-[#CBB593]" : "bg-[#2C2B29]"
                    )}
                  >
                    <motion.div 
                      className="bg-[#0B0A0A] w-4 h-4 rounded-full"
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      style={{ marginLeft: formValues.featured ? "24px" : "0px" }}
                    />
                  </button>
                </div>
              </form>

              {/* Drawer Sticky Footer Actions */}
              <div className="p-6 border-t border-[#23211F] flex items-center justify-end gap-4 sticky bottom-0 bg-[#121110] z-15">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="py-3 px-6 bg-transparent text-[#8C8273] hover:text-white border border-[#2C2B29] hover:border-[#8C8273] font-sans text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitForm}
                  className="py-3 px-8 bg-[#CBB593] text-[#0B0A0A] hover:bg-[#DDC9AC] font-sans text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-none border-none cursor-pointer"
                >
                  {editingProduct ? "Save Changes" : "Register Object"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 8. DELETE CONFIRMATION MODAL OVERLAY */}
      <AnimatePresence>
        {deletingProductId && (
          <>
            <motion.div
              onClick={() => setDeletingProductId(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-xs z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <div className="fixed inset-0 flex items-center justify-center p-6 z-50 pointer-events-none select-none">
              <motion.div
                className="bg-[#121110] border border-[#23211F] p-8 max-w-md w-full shadow-2xl space-y-6 pointer-events-auto"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-2">
                  <span className="text-[9px] tracking-[0.25em] text-red-400 uppercase font-light">Warning: Action Destructive</span>
                  <h4 className="font-serif text-lg font-light text-white tracking-wide">
                    Remove Commission Record?
                  </h4>
                  <p className="font-sans text-xs text-[#8C8273] font-light leading-relaxed">
                    This action will purge the product commission record from the active catalog registry. This can not be undone in the current session.
                  </p>
                </div>
                
                <div className="flex items-center justify-end gap-4 pt-2">
                  <button
                    onClick={() => setDeletingProductId(null)}
                    className="py-3 px-6 bg-transparent text-[#8C8273] hover:text-white border border-[#2C2B29] hover:border-[#8C8273] font-sans text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-none cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteProduct}
                    className="py-3 px-6 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 hover:border-red-500 font-sans text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-none cursor-pointer"
                  >
                    Purge Record
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* 9. GLOBAL TOAST NOTIFICATION OVERLAY */}
      <div className="fixed bottom-6 right-6 z-[100] space-y-3 pointer-events-none select-none max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              className={cn(
                "p-4 border shadow-2xl flex items-start gap-3 pointer-events-auto bg-[#121110]",
                toast.type === "success" && "border-[#CBB593]/30 text-[#EAE5D9]",
                toast.type === "info" && "border-[#2C2B29] text-[#8C8273]",
                toast.type === "error" && "border-red-500/30 text-red-400"
              )}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              layout
            >
              {/* Type icon indicator */}
              <div className="shrink-0 pt-0.5">
                {toast.type === "success" && (
                  <svg className="w-4 h-4 text-[#CBB593]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {toast.type === "info" && (
                  <svg className="w-4 h-4 text-[#8C8273]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {toast.type === "error" && (
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
              </div>

              {/* Toast Message */}
              <div className="flex-grow space-y-1">
                <span className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light block">System Notification</span>
                <p className="text-[11px] font-sans font-light leading-normal">{toast.message}</p>
              </div>

              {/* Dismiss Toast Button */}
              <button 
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="text-[#8C8273] hover:text-white shrink-0 bg-transparent border-none p-0 focus:outline-none cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
