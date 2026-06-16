import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BLOG_ARTICLES, BlogArticle } from "../sections/section-data";
import { cn } from "../../lib/utils";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogArticle | null>(null);
  
  // Form State
  const [formValues, setFormValues] = useState({
    title: "",
    category: "Hotel Furniture",
    author: "",
    readTime: "5 min read",
    date: "",
    image: "",
    description: "",
    content: "",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const mapBackendBlog = (b: any): BlogArticle => {
    let category = "Design Trends";
    const slugLower = (b.slug || "").toLowerCase();
    if (slugLower.includes("hotel")) category = "Hotel Furniture";
    else if (slugLower.includes("restaurant")) category = "Restaurant Furniture";
    else if (slugLower.includes("cane")) category = "Cane Furniture";
    else if (slugLower.includes("bone")) category = "Bone Inlay";
    else if (slugLower.includes("maintenance")) category = "Hotel Furniture";
    else if (slugLower.includes("export")) category = "Furniture Export";
    else if (slugLower.includes("design")) category = "Design Trends";
    else if (slugLower.includes("cafe")) category = "Cafe Furniture";

    const readTimeMinutes = Math.max(3, Math.ceil((b.content || "").split(" ").length / 200));

    let formattedDate = b.published_date;
    try {
      const d = new Date(b.published_date);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
      }
    } catch {}

    return {
      id: b.id.toString(),
      title: b.title,
      category,
      date: formattedDate,
      readTime: `${readTimeMinutes} min read`,
      image: b.featured_image || "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
      author: b.author || "Atelier Editor",
      href: "/journal",
      description: b.excerpt || "",
      content: b.content
    } as any;
  };

  const loadBlogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/blogs");
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setBlogs(json.data.map(mapBackendBlog));
      }
    } catch (err) {
      console.error("Failed to load blogs:", err);
      showToast("Failed to fetch articles from backend");
    }
  };

  // Load from backend
  useEffect(() => {
    loadBlogs();
  }, []);

  // Open Drawer for Add Blog
  const handleOpenAddDrawer = () => {
    setEditingBlog(null);
    setFormValues({
      title: "",
      category: "Hotel Furniture",
      author: "Atelier Editor",
      readTime: "5 min read",
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
      description: "",
      content: "",
    });
    setIsDrawerOpen(true);
  };

  // Open Drawer for Edit Blog
  const handleOpenEditDrawer = (blog: BlogArticle) => {
    setEditingBlog(blog);
    setFormValues({
      title: blog.title,
      category: blog.category,
      author: blog.author,
      readTime: blog.readTime,
      date: blog.date,
      image: blog.image,
      description: blog.description || "",
      content: (blog as any).content || "",
    });
    setIsDrawerOpen(true);
  };

  // Submit form (Create / Modify)
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.title.trim() || !formValues.author.trim() || !formValues.description.trim() || !formValues.content.trim()) {
      showToast("Please fill in all required fields (Title, Author, Excerpt, Content)");
      return;
    }

    const slug = formValues.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const payload = {
      title: formValues.title.trim(),
      slug,
      excerpt: formValues.description.trim(),
      content: formValues.content.trim(),
      featured_image: formValues.image.trim(),
      author: formValues.author.trim(),
      published_date: new Date().toISOString().slice(0, 10)
    };

    try {
      const token = sessionStorage.getItem("sbartisan_admin_token");
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      if (editingBlog) {
        // Edit PUT /api/blogs/:id
        const res = await fetch(`http://localhost:5000/api/blogs/${editingBlog.id}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          const errJson = await res.json();
          throw new Error(errJson.message || `HTTP Error: ${res.status}`);
        }
        showToast(`Updated article: "${formValues.title}"`);
      } else {
        // Create POST /api/blogs
        const res = await fetch("http://localhost:5000/api/blogs", {
          method: "POST",
          headers,
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          const errJson = await res.json();
          throw new Error(errJson.message || `HTTP Error: ${res.status}`);
        }
        showToast(`Created new article: "${formValues.title}"`);
      }

      setIsDrawerOpen(false);
      loadBlogs();
    } catch (err: any) {
      console.error("Error saving blog article:", err);
      showToast(err.message || "Failed to save blog article");
    }
  };

  // Delete Action
  const handleDeleteBlog = async (id: string) => {
    const target = blogs.find((b) => b.id === id);
    if (!target) return;
    if (window.confirm(`Are you sure you want to delete "${target.title}"?`)) {
      try {
        const token = sessionStorage.getItem("sbartisan_admin_token");
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (!res.ok) {
          const errJson = await res.json();
          throw new Error(errJson.message || `HTTP Error: ${res.status}`);
        }
        showToast(`Removed article: "${target.title}"`);
        loadBlogs();
      } catch (err: any) {
        console.error("Error deleting blog article:", err);
        showToast(err.message || "Failed to delete blog article");
      }
    }
  };

  // Filtering
  const filteredBlogs = blogs.filter((b) => {
    const matchesCategory = selectedCategory === "all" || b.category === selectedCategory;
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    "Hotel Furniture",
    "Restaurant Furniture",
    "Cafe Furniture",
    "Cane Furniture",
    "Bone Inlay",
    "Furniture Export",
    "Design Trends"
  ];

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-10 selection:bg-[#CBB593] selection:text-[#0B0A0A]">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#CBB593] text-[#0B0A0A] text-xs px-6 py-4 rounded-none shadow-2xl z-55 flex items-center gap-3 border border-[#8C6D4F]/30 font-sans tracking-wide"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#23211F] pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#8C8273] uppercase font-light">
            <span>ADMIN PANEL</span>
            <span>•</span>
            <span className="text-[#CBB593]">JOURNAL ARCHIVES LOG</span>
          </div>
          <h2 className="font-serif text-3xl font-light text-white tracking-wide">
            Atelier Chronicles
          </h2>
        </div>

        <button
          onClick={handleOpenAddDrawer}
          className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#CBB593] text-[#0B0A0A] hover:bg-[#DDC9AC] font-sans text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-none border-none shrink-0 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Article</span>
        </button>
      </div>

      {/* Table Controls */}
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
              placeholder="Search articles..."
              className="bg-transparent text-xs text-white placeholder:text-[#8C8273] focus:outline-none w-full font-sans font-light"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative w-full md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#1E1D1C] text-[10px] tracking-[0.18em] uppercase text-[#EAE5D9] border border-[#2C2B29] py-2 px-3 rounded-none focus:outline-none focus:border-[#CBB593]"
            >
              <option value="all">ALL CATEGORIES</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Blogs List Table */}
      <div className="bg-[#121110] border border-[#23211F] overflow-hidden">
        <div className="overflow-x-auto w-full">
          {filteredBlogs.length === 0 ? (
            <div className="py-24 text-center space-y-6">
              <svg className="w-12 h-12 text-[#8C8273] mx-auto opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <p className="font-serif text-lg text-white font-light">No articles cataloged</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs font-light">
              <thead>
                <tr className="border-b border-[#23211F] text-[9px] tracking-[0.25em] text-[#8C8273] uppercase font-sans bg-[#181716] select-none">
                  <th className="py-4 px-6 font-medium">Image</th>
                  <th className="py-4 px-6 font-medium">Essay Title</th>
                  <th className="py-4 px-6 font-medium">Category</th>
                  <th className="py-4 px-6 font-medium">Author</th>
                  <th className="py-4 px-6 font-medium">Read Time</th>
                  <th className="py-4 px-6 font-medium">Publish Date</th>
                  <th className="py-4 px-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#23211F]/60">
                {filteredBlogs.map((art) => (
                  <tr key={art.id} className="hover:bg-[#181716]/40 transition-colors duration-200">
                    {/* Image */}
                    <td className="py-4 px-6 shrink-0">
                      <div className="w-14 h-9 bg-[#1E1D1C] overflow-hidden border border-[#2C2B29] relative">
                        <img
                          src={art.image}
                          alt={art.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Title */}
                    <td className="py-4 px-6 max-w-sm">
                      <span className="font-serif text-sm font-medium text-white tracking-wide block">
                        {art.title}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6 text-[#DDC9AC]">
                      {art.category}
                    </td>

                    {/* Author */}
                    <td className="py-4 px-6 text-[#8C8273]">
                      {art.author}
                    </td>

                    {/* Read Time */}
                    <td className="py-4 px-6 text-[#8C8273]">
                      {art.readTime}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-[#8C8273]">
                      {art.date}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3.5">
                        <button
                          onClick={() => handleOpenEditDrawer(art)}
                          className="text-[#8C8273] hover:text-[#CBB593] hover:underline transition-colors duration-300 text-[10px] tracking-wider uppercase bg-transparent border-none p-0 cursor-pointer"
                        >
                          Edit
                        </button>
                        <span className="text-[#2C2B29] select-none">|</span>
                        <button
                          onClick={() => handleDeleteBlog(art.id)}
                          className="text-[#8C8273] hover:text-red-400 hover:underline transition-colors duration-300 text-[10px] tracking-wider uppercase bg-transparent border-none p-0 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Slide-in side drawer panel */}
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
                  <span className="text-[9px] tracking-[0.25em] text-[#CBB593] uppercase font-light">Archive Form</span>
                  <h3 className="font-serif text-xl font-light text-white tracking-wide">
                    {editingBlog ? `Modify: ${editingBlog.title}` : "New Insight Article"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 border border-[#2C2B29] text-[#8C8273] hover:text-white rounded-none bg-transparent focus:outline-none cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form Body Scroll area */}
              <form onSubmit={handleSubmitForm} className="p-6 space-y-6 flex-grow">
                {/* Article Title */}
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Title Name *</label>
                  <input
                    type="text"
                    required
                    value={formValues.title}
                    onChange={(e) => setFormValues(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Sourcing Commercial Grade Teakwood"
                    className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none"
                  />
                </div>

                {/* Author & Read Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Author *</label>
                    <input
                      type="text"
                      required
                      value={formValues.author}
                      onChange={(e) => setFormValues(prev => ({ ...prev, author: e.target.value }))}
                      placeholder="e.g. Atelier Project Desk"
                      className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Read Time</label>
                    <input
                      type="text"
                      value={formValues.readTime}
                      onChange={(e) => setFormValues(prev => ({ ...prev, readTime: e.target.value }))}
                      placeholder="e.g. 8 min read"
                      className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none"
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Category *</label>
                  <select
                    value={formValues.category}
                    onChange={(e) => setFormValues(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Date & Image URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Publish Date</label>
                    <input
                      type="text"
                      value={formValues.date}
                      onChange={(e) => setFormValues(prev => ({ ...prev, date: e.target.value }))}
                      placeholder="e.g. June 25, 2026"
                      className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light">Image URL Link</label>
                    <input
                      type="text"
                      value={formValues.image}
                      onChange={(e) => setFormValues(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none"
                    />
                  </div>
                </div>

                {/* Excerpt Description */}
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light block">Excerpt Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={formValues.description}
                    onChange={(e) => setFormValues(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Provide a search-engine optimized summary of the publication..."
                    className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-[#8C8273] uppercase font-light block">Full Article Content *</label>
                  <textarea
                    rows={6}
                    required
                    value={formValues.content}
                    onChange={(e) => setFormValues(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write the full body of the chronicle article..."
                    className="w-full bg-[#1E1D1C] text-xs text-white border border-[#2C2B29] focus:border-[#CBB593] p-3 rounded-none focus:outline-none resize-none"
                  />
                </div>

                {/* Action buttons */}
                <div className="pt-6 flex justify-end gap-3 border-t border-[#23211F] sticky bottom-0 bg-[#121110] z-15 p-2">
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="py-3 px-6 border border-[#2C2B29] text-[#8C8273] hover:text-white text-[10px] font-sans font-medium uppercase tracking-widest transition-all duration-300 rounded-none bg-transparent cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-3 px-6 bg-[#CBB593] text-[#0B0A0A] hover:bg-[#DDC9AC] text-[10px] font-sans font-medium uppercase tracking-widest transition-all duration-300 rounded-none border-none cursor-pointer"
                  >
                    {editingBlog ? "Save Changes" : "Create Post"}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
