import React, { useState, useEffect } from "react";
import { BLOG_ARTICLES, BlogArticle } from "../sections/section-data";
import { Container, Heading, SubHeading, Paragraph, SEO } from "../ui";
import { cn } from "../../lib/utils";

// Mock content databases for design readings
const JOURNAL_CONTENTS: Record<string, string> = {
  "blog-hotel-guide": "Procuring commercial-grade furniture for hotels requires a rigorous technical approach beyond aesthetic appeal. When buying from Jodhpur manufacturers, the primary specification is moisture content control. Timber must be kiln-dried to 8-12% relative humidity. This prevents warping, splitting, and joint failure when furniture is exposed to air conditioning or dry indoor heating in North American and European markets. Additionally, developers must prioritize timber legality, requiring FSC and Vriksh certifications. A successful hotel furniture program leverages standard container loads (FCL) to optimize freight budgets, utilizing robust double-wall corrugated cartons and wooden crate frames for safety in transit.",
  "blog-restaurant-trends": "Restaurant dining areas demand high durability under intensive traffic cycles. Today's fine-dining salons are moving away from ebonized synthetic finishes toward organic, reclaimed haveli teakwood which showcases natural grain character and historic scars. Visible mechanical joints, such as through-tenon and dowel pins, are highly favored as they emphasize structural honesty. Finished in organic, food-safe smoked matte oils rather than heavy chemical varnishes, these surfaces are highly resistant to wine and hot plate spills while allowing the wood to develop a rich, warm patina over time.",
  "blog-cane-ideas": "Incorporating natural cane into commercial spaces introduces tropical texture and visual lightness. In boutique resorts and hotels, cane easy chairs and partitions are utilized to construct airy lounge systems. Master craftsmen in Rajasthan workshops employ traditional steam-bending techniques to curve premium solid rattan poles. Woven cane mesh panels, especially double-woven star patterns, allow airflow and decrease overall furniture weight, creating comfortable, low-maintenance seating solutions for resort verandas and spa lobbies.",
  "blog-bone-guide": "Jodhpur bone inlay represents a royal legacy of hand-carved artistry. Ethically retrieved camel bone tiles are hand-split and carved into geometric chevron or floral damask motifs. These tiles are laid tile-by-tile onto solid mango wood cores and filled with pigmented organic resins. To ensure longevity, the cores must be stabilized using kiln-dried wood to prevent movement that could cause resin check-lines. Interior designers can specify custom Pantone resin shades to coordinate inlay sideboards and mirrors with their modern hospitality palettes.",
  "blog-maintenance": "To keep contract furniture in prime condition, commercial project developers must follow strict maintenance guidelines. Solid wood furniture should be polished periodically with organic beeswax or natural lemon oil rather than silicone sprays. Rattan and cane require light anti-fungal wiping and humidity-balancing with damp cloths to prevent cane fibers from turning brittle. Regular inspection of joint pins and re-tensioning rope grids ensures long-term structural integrity and safety.",
  "blog-export-guide": "Navigating the logistics of international furniture exports from India requires meticulous document handling and packaging standards. From Jodhpur's Inland Container Depot (ICD) dry port, containers are railed to Mundra or Kandla sea ports for loading onto cargo vessels. Solid wood cargo must be packed with humidity-absorbing gel sheets, wrapped in thick foam padding, and placed inside heavy corrugated export boxes secured on wooden pallets. Mandatory export documents include phytosanitary certificates, ISPM-15 wood fumigation records, and Vriksh legality certificates.",
  "blog-design-trends": "Modern commercial interior design is bridging clean geometric lines with traditional Rajasthani woodcarving proportions. This design direction, termed the Modern Haveli Edit, simplifies complex historic structures. It retains traditional mortise joinery and arched silhouettes but uses ebonized walnut or bleached teak finishes. By matching clean brass legs with detailed bone inlay cabinets or woven coir daybeds, designers create conversation statements that honor heritage craftsmanship within contemporary hotels.",
  "blog-cafe-guide": "Procuring commercial cafe furniture requires balancing outdoor weathering resistance with space-maximizing indoor footprints. Bistro tables are fabricated from seasoned solid acacia wood finished in poly-urethane weather-barriers, or reinforced steel frames paired with weather-stable stone tops. Rattan chairs are hand-woven with high-density polyethylene (HDPE) synthetic fibers over powder-coated aluminum cores to resist UV breakdown and monsoon rain. For indoor setups, banquette booths and space-saving nesting chairs allow restaurants and cafes to optimize guest density, ensuring durability under high daily turnover."
};

export default function JournalPage() {
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Articles");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogsData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/blogs");
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const mapped = json.data.map((b: any): BlogArticle => {
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
        });
        setBlogs(mapped);
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to retrieve blog publications.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchBlogsData();
  }, []);

  const categories = [
    "All Articles",
    "Hotel Furniture",
    "Restaurant Furniture",
    "Cafe Furniture",
    "Cane Furniture",
    "Bone Inlay",
    "Furniture Export",
    "Design Trends"
  ];

  const filteredArticles = blogs.filter((article) => {
    const matchesCategory = selectedCategory === "All Articles" || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const journalSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "SB Artisan Journal & Export Guides",
    "description": "Professional sourcing insights, technical lumber manuals, Jodhpur kiln methods, and export packing guidelines for hospitality developers and trade importers.",
    "publisher": {
      "@type": "Organization",
      "name": "SB Artisan",
      "logo": "https://www.sbartisan.com/images/commercial_workshop_custom.png"
    }
  };

  return (
    <div className="bg-[#FDFCF7] pt-28 pb-20 selection:bg-[#EAE5D9]">
      <SEO 
        title="Furniture Insights & Export Guides | SB Artisan Jodhpur"
        description="Explore SB Artisan's B2B knowledge base: technical specifications for commercial furniture seasoning, custom inlay commissions, and export container logistics coordinates."
        keywords="hospitality furniture procurement, furniture manufacturer Jodhpur, solid wood kiln seasoning, export coordinates India, hotel furniture supplier Jodhpur"
        canonical="/journal"
        schema={journalSchema}
      />
      
      {/* 1. HEADER SECTION */}
      <section className="py-12 border-b border-[#F2EDE2] bg-[#FAF8F2]/60">
        <Container variant="default">
          <div className="max-w-3xl space-y-4">
            <SubHeading variant="caps" size="sm" className="text-[#8C6D4F]">
              FURNITURE INSIGHTS & EXPORT GUIDES
            </SubHeading>
            <Heading variant="hero" weight="light" className="text-[#1A1A1A] leading-tight">
              SB Artisan Journal
            </Heading>
            <Paragraph variant="lg" className="text-[#5A5751] font-light leading-relaxed">
              Technical manuals, material specification protocols, and international shipping coordinates compiled by our Jodhpur production workshop and logistics desks. Designed for hotel developers, procurement teams, architects, and trade importers.
            </Paragraph>
          </div>
        </Container>
      </section>

      {/* 2. MAIN ARTICLES LAYOUT */}
      <section className="py-20">
        <Container variant="default">
          
          {/* Search & Category Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#F2EDE2] pb-8 mb-12">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-xs">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#8C8273]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search knowledge base..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white border border-[#EAE5D9] rounded-sm text-xs font-light placeholder-[#9E9B95] text-[#1A1A1A] focus:outline-none focus:border-[#8C6D4F] transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-3 flex items-center text-[#8C8273] hover:text-[#1A1A1A]"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>

            {/* Category Filter list */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-3 py-1.5 text-[9px] uppercase tracking-wider font-mono whitespace-nowrap rounded-xs transition-all duration-200 outline-none cursor-pointer border",
                    selectedCategory === cat
                      ? "bg-[#1A1A1A] border-[#1A1A1A] text-white"
                      : "bg-white border-[#EAE5D9] text-[#6E6B64] hover:border-[#8C6D4F] hover:text-[#1A1A1A]"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured and Grid Sections with States */}
          {isLoading ? (
            <div className="space-y-16">
              {/* Featured Skeleton */}
              {!searchQuery && selectedCategory === "All Articles" && (
                <div className="space-y-4">
                  <div className="h-4 bg-[#F5F2EA] w-48 rounded-xs animate-pulse" />
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-[#EAE5D9] bg-white rounded-sm overflow-hidden animate-pulse">
                    <div className="lg:col-span-7 aspect-[16/10] lg:h-[400px] bg-[#F5F2EA]" />
                    <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="h-6 bg-[#F5F2EA] w-24 rounded-xs" />
                        <div className="h-8 bg-[#F5F2EA] w-3/4 rounded-xs" />
                        <div className="h-16 bg-[#F5F2EA] w-full rounded-xs" />
                      </div>
                      <div className="h-10 bg-[#F5F2EA] w-full rounded-xs" />
                    </div>
                  </div>
                </div>
              )}
              {/* Grid Skeletons */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex flex-col justify-between bg-white border border-[#EAE5D9] p-5 rounded-sm animate-pulse space-y-4">
                    <div className="aspect-[16/10] w-full bg-[#F5F2EA] rounded-xs" />
                    <div className="space-y-3">
                      <div className="h-5 bg-[#F5F2EA] w-1/4 rounded-xs" />
                      <div className="h-6 bg-[#F5F2EA] w-3/4 rounded-xs" />
                      <div className="h-12 bg-[#F5F2EA] w-full rounded-xs" />
                    </div>
                    <div className="h-10 bg-[#F5F2EA] w-full rounded-xs pt-4" />
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="py-20 text-center space-y-6 max-w-md mx-auto select-none">
              <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-500 mx-auto">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-lg text-[#1A1A1A] font-light">Failed to load publications</h4>
                <p className="font-sans text-xs text-[#6E6B64] font-light leading-relaxed">{error}</p>
              </div>
              <button
                onClick={fetchBlogsData}
                className="px-5 py-2.5 bg-[#1A1A1A] text-white hover:bg-[#8C6D4F] font-sans text-[10px] uppercase tracking-widest font-medium transition-all duration-300 rounded-sm cursor-pointer"
              >
                Retry Connection
              </button>
            </div>
          ) : (
            <>
              {/* Featured Article Section */}
              {!searchQuery && selectedCategory === "All Articles" && blogs.length > 0 && (
                <div className="mb-16">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#8C6D4F] block mb-4">
                    Featured Technical Publication
                  </span>
                  <div 
                    onClick={() => setSelectedArticle(blogs[0])}
                    className="group grid grid-cols-1 lg:grid-cols-12 gap-8 border border-[#EAE5D9] bg-white rounded-sm overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:h-[400px] overflow-hidden bg-[#F5F2EA] relative">
                      <div className="absolute inset-0 bg-black/[0.02] z-10 pointer-events-none group-hover:bg-black/5 transition-colors duration-500" />
                      <img
                        src={blogs[0].image}
                        alt={blogs[0].title}
                        className="w-full h-full object-cover object-center transition-transform duration-[1500ms] ease-out group-hover:scale-102"
                      />
                    </div>
                    <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <span className="inline-block text-[9px] uppercase tracking-[0.2em] font-sans text-[#8C6D4F] border border-[#8C6D4F]/20 px-2.5 py-1 rounded-xs bg-[#FAF8F2]">
                          {blogs[0].category}
                        </span>
                        <h3 className="font-serif text-2xl lg:text-3xl font-light text-[#1A1A1A] leading-tight group-hover:text-[#8C6D4F] transition-colors duration-300">
                          {blogs[0].title}
                        </h3>
                        <p className="text-xs text-[#6E6B64] font-light leading-relaxed">
                          {blogs[0].description}
                        </p>
                      </div>
                      <div className="space-y-4 pt-4 border-t border-[#F2EDE2]">
                        <div className="flex justify-between items-center text-[10px] font-sans text-[#9E9B95] font-light">
                          <span>By {blogs[0].author}</span>
                          <span>{blogs[0].date} • {blogs[0].readTime}</span>
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.15em] font-sans font-medium text-[#1A1A1A] group-hover:text-[#8C6D4F] inline-flex items-center gap-1 transition-colors">
                          Read Technical Guide
                          <svg className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 8h14M10 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid Layout of Articles */}
              {filteredArticles.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-[#EAE5D9] rounded-sm bg-[#FAF8F2]/50">
                  <svg className="w-10 h-10 text-[#8C8273] mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm font-light text-[#5A5751]">No export guides or articles matches your query.</p>
                  <button 
                    onClick={() => { setSearchQuery(""); setSelectedCategory("All Articles"); }}
                    className="mt-4 text-[10px] uppercase tracking-widest text-[#8C6D4F] font-mono border-b border-[#8C6D4F] hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article) => {
                    const isFirstInAll = !searchQuery && selectedCategory === "All Articles" && blogs.length > 0 && article.id === blogs[0].id;
                    if (isFirstInAll) return null;

                    return (
                      <article
                        key={article.id}
                        className="group flex flex-col justify-between bg-white border border-[#EAE5D9] p-5 rounded-sm cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
                        onClick={() => setSelectedArticle(article)}
                      >
                        <div className="space-y-4">
                          {/* Image Container */}
                          <div className="aspect-[16/10] w-full overflow-hidden bg-[#F5F2EA] relative rounded-xs">
                            <div className="absolute inset-0 bg-black/[0.02] z-10 pointer-events-none group-hover:bg-black/5 transition-colors duration-500" />
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover object-center transition-transform duration-[1500ms] ease-out group-hover:scale-103"
                            />
                          </div>

                          {/* Info Metadata */}
                          <div className="space-y-3">
                            <span className="inline-block text-[9px] uppercase tracking-wider font-mono text-[#8C6D4F] bg-[#FAF8F2] border border-[#EAE5D9] px-2 py-0.5 rounded-xs">
                              {article.category}
                            </span>
                            
                            <h3 className="font-serif text-lg text-[#1A1A1A] font-light leading-snug group-hover:text-[#8C6D4F] transition-colors duration-300">
                              {article.title}
                            </h3>
                            
                            <p className="text-xs text-[#6E6B64] font-light leading-relaxed line-clamp-3">
                              {article.description}
                            </p>
                          </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-[#F2EDE2] space-y-3">
                          <div className="flex justify-between items-center text-[10px] font-mono text-[#9E9B95] font-light">
                            <span>By {article.author}</span>
                            <span>{article.date}</span>
                          </div>

                          <div className="flex justify-between items-center pt-1">
                            <span className="text-[9px] text-[#8C8273] font-mono">{article.readTime}</span>
                            <span className="text-[10px] uppercase tracking-[0.15em] font-sans font-medium text-[#1A1A1A] group-hover:text-[#8C6D4F] inline-flex items-center gap-1 transition-colors">
                              Read Guide
                              <svg className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 8h14M10 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          )}

        </Container>
      </section>

      {/* 3. READING POPUP MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F0E0D]/60 backdrop-blur-sm">
          <div
            className="w-full max-w-2xl bg-[#FDFCF7] border border-[#EAE5D9] rounded-sm max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div className="aspect-[2.2/1] w-full overflow-hidden bg-[#F5F2EA] relative">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover object-center"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#0F0E0D]/75 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-8 space-y-6">
              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-wider font-mono text-[#8C6D4F] bg-[#FAF8F2] border border-[#EAE5D9] px-2.5 py-0.5 rounded-xs">
                  {selectedArticle.category} • {selectedArticle.readTime}
                </span>
                <h2 className="font-serif text-2xl lg:text-3xl font-light text-[#1A1A1A] leading-tight">
                  {selectedArticle.title}
                </h2>
                <div className="text-xs font-sans text-[#9E9B95] font-light">
                  Published by {selectedArticle.author} on {selectedArticle.date}
                </div>
              </div>

              <div className="h-[1px] bg-[#F2EDE2]" />

              <div className="font-sans text-sm text-[#6E6B64] font-light leading-relaxed space-y-4 text-justify">
                <p className="font-semibold text-[#1A1A1A] italic">
                  {selectedArticle.description}
                </p>
                <p>
                  {(selectedArticle as any).content || JOURNAL_CONTENTS[selectedArticle.id] || "Dossier content matches catalog details..."}
                </p>
                <p>
                  As an export-oriented manufacturer, SB Artisan ensures all orders strictly align with destination coordinates. Every batch processed through our Jodhpur facility goes through seasoned checks, double-insulated structural finishes, and drop-tested cardboard packing configurations suitable for sea-freight container corridors.
                </p>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="font-sans text-[10px] uppercase tracking-[0.2em] font-medium py-3 px-6 bg-[#1A1A1A] text-white hover:bg-transparent hover:text-[#1A1A1A] border border-[#1A1A1A] transition-all duration-300 rounded-sm"
                >
                  Close Specification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
