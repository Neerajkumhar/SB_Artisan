import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { INDIAN_HOSPITALITY_PRODUCTS, fetchProducts, HospitalityProduct } from "../product";
import ProductGrid from "../product/product-grid";
import { Container, SectionTitle, SEO } from "../ui";
import { cn } from "../../lib/utils";

const FILTER_TABS = [
  { label: "All Objects", slug: "all" },
  { label: "Restaurant", slug: "restaurant" },
  { label: "Cafe & Bistro", slug: "cafe" },
  { label: "Bar Seating", slug: "bar" },
  { label: "Hotel & Lobby", slug: "hotel" },
  { label: "Cane & Rattan", slug: "cane" },
  { label: "Rope Weaving", slug: "rope" },
  { label: "Bone Inlay", slug: "bone" },
];

export default function CollectionsPage() {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQueryParam = searchParams.get("search") || "";
  
  const [activeSlug, setActiveSlug] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(searchQueryParam);
  const [filteredProducts, setFilteredProducts] = useState<HospitalityProduct[]>([]);
  const [wishlistedIds, setWishlistedIds] = useState<string[]>(["ind-haveli-chair", "ind-shekhawati-bar"]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { openInquiry } = useOutletContext<{ openInquiry: (product: HospitalityProduct | null) => void }>();

  // Synchronize searchQuery with search query param
  useEffect(() => {
    setSearchQuery(searchQueryParam);
  }, [searchQueryParam]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (val) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("search", val);
        return next;
      });
    } else {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete("search");
        return next;
      });
    }
  };

  // Synchronize URL path with local filter tab state
  useEffect(() => {
    if (category) {
      setActiveSlug(category.toLowerCase());
    } else {
      setActiveSlug("all");
    }
  }, [category]);

  // Execute filtering & searching logic via API
  useEffect(() => {
    setIsLoading(true);
    const delayDebounce = setTimeout(() => {
      fetchProducts({
        category: activeSlug === "all" ? undefined : activeSlug,
        query: searchQuery || undefined
      }).then((data) => {
        setFilteredProducts(data);
        setIsLoading(false);
      });
    }, 150); // slight debounce for search input

    return () => clearTimeout(delayDebounce);
  }, [activeSlug, searchQuery]);

  const handleTabClick = (slug: string) => {
    if (slug === "all") {
      navigate("/collections");
    } else {
      navigate(`/collections/${slug}`);
    }
  };

  const handleWishlistToggle = (id: string) => {
    setWishlistedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleInquire = (id: string) => {
    const prod = filteredProducts.find((p) => p.id === id);
    if (prod) {
      openInquiry(prod);
    }
  };

  const handleTearSheet = (id: string) => {
    const prod = filteredProducts.find((p) => p.id === id);
    alert(`Atelier Tear Sheet Compiled:\n\nA dynamic PDF catalog dossier containing dimensions, wood options, and material specifications for "${prod?.title}" has been sent.`);
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "SB Artisan Curated B2B Collections",
    "description": "Browse our curated Jodhpur solid wood, cane, and bone inlay furniture collections crafted for international commercial contract projects.",
    "url": "https://www.sbartisan.com/collections"
  };

  return (
    <div className="pt-28 pb-20 bg-[#FDFCF7]">
      <SEO 
        title="Curated Furniture Export Showrooms & Collections"
        description="Browse our contract furniture collections. SB Artisan manufactures restaurant, café, hotel lobby, and bar furniture from premium Indian timber."
        keywords="furniture collections showroom, Jodhpur export furniture, contract furniture catalog, commercial teak furniture wholesale"
        canonical="/collections"
        schema={schemaMarkup}
      />
      <Container variant="default" className="space-y-10">
        {/* Page Header */}
        <SectionTitle
          eyebrow="ATELIER DIRECTORY"
          title="The Curated Catalog"
          description="Browse hand-carved bone inlay, reclaimed teakwood, and organic cane and rope weaving collections crafted for premium hospitality."
          spacing="compact"
          titleProps={{ variant: "xl", weight: "light" }}
          descriptionProps={{ variant: "sm" }}
        />

        {/* Dynamic Category Filtering Tabs & Search Panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#F2EDE2] pb-4">
          <div className="flex items-center overflow-x-auto scrollbar-none gap-1 md:gap-2 max-w-full">
            {FILTER_TABS.map((tab) => {
              const isActive = activeSlug === tab.slug;
              return (
                <button
                  key={tab.slug}
                  onClick={() => handleTabClick(tab.slug)}
                  className={cn(
                    "text-[10px] tracking-[0.22em] uppercase font-sans py-2.5 px-3.5 transition-all duration-300 relative font-medium whitespace-nowrap",
                    isActive ? "text-[#1A1A1A]" : "text-[#8C8273] hover:text-[#1A1A1A]"
                  )}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-[-5px] left-0 w-full h-[1.5px] bg-[#1A1A1A]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Minimalist Search Input */}
          <div className="relative w-full md:w-72 border-b border-[#2C2B29] pb-1.5 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-[#8C8273]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by wood, craft, name..."
              className="bg-transparent text-xs text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none w-full font-sans font-light"
            />
            {searchQuery && (
              <button 
                onClick={() => handleSearchChange("")} 
                className="text-[#8C8273] hover:text-[#1A1A1A] text-[9px] font-sans uppercase tracking-wider font-light"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Catalog Grid */}
        <div className="pt-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="space-y-4 animate-pulse">
                  <div className="aspect-[3/4] bg-[#F5F2EA] w-full" />
                  <div className="h-4 bg-[#F5F2EA] w-1/3" />
                  <div className="h-5 bg-[#F5F2EA] w-2/3" />
                  <div className="h-4 bg-[#F5F2EA] w-full" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <p className="font-serif text-lg text-[#8C8273] font-light">No items found matching the filter criteria.</p>
              <p className="font-sans text-xs text-[#9E9B95] font-light">Try searching for other terms or selecting a different category tab.</p>
            </div>
          ) : (
            <ProductGrid
              products={filteredProducts}
              variant="editorial"
              columns={3}
              wishlistedIds={wishlistedIds}
              onInquire={handleInquire}
              onTearSheet={handleTearSheet}
              onWishlistToggle={handleWishlistToggle}
            />
          )}
        </div>
      </Container>
    </div>
  );
}

