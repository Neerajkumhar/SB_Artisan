import React, { useEffect, useState } from "react";
import { fetchProducts, INDIAN_HOSPITALITY_PRODUCTS, HospitalityProduct } from "../product";
import ProductGrid from "../product/product-grid";
import { Container, SectionTitle, SEO } from "../ui";
import { cn } from "../../lib/utils";

const SEATING_TABS = [
  { label: "All Seating", slug: "all" },
  { label: "Dining Chairs", slug: "dining" },
  { label: "Lounge Chairs", slug: "lounge" },
  { label: "Daybeds & Lounges", slug: "daybed" },
  { label: "Barstools", slug: "barstool" },
];

export default function HospitalitySeatingPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [products, setProducts] = useState<HospitalityProduct[]>([]);
  const [wishlistedIds, setWishlistedIds] = useState<string[]>(["ind-haveli-chair"]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    // Fetch and filter seating items
    fetchProducts().then((data) => {
      // Seating categories / tags filter
      const seatingData = data.filter((p) =>
        p.category.includes("Restaurant") ||
        p.category.includes("Cafe") ||
        p.category.includes("Bar") ||
        p.category.includes("Cane") ||
        p.category.includes("Rope")
      );

      if (activeTab === "all") {
        setProducts(seatingData);
      } else {
        const filtered = seatingData.filter((p) => {
          const sub = p.subcategory.toLowerCase();
          const tags = p.tags.map(t => t.toLowerCase());
          
          if (activeTab === "dining") return sub.includes("dining") || tags.includes("dining");
          if (activeTab === "lounge") return sub.includes("lounge") || tags.includes("lounge");
          if (activeTab === "daybed") return sub.includes("daybed") || tags.includes("daybed");
          if (activeTab === "barstool") return sub.includes("bar") || tags.includes("barstool");
          return true;
        });
        setProducts(filtered);
      }
      setIsLoading(false);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  const handleWishlistToggle = (id: string) => {
    setWishlistedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleInquire = (id: string) => {
    const prod = INDIAN_HOSPITALITY_PRODUCTS.find((p) => p.id === id);
    alert(`Acquisition Desk Inquiry Registered:\n\nObject: ${prod?.title}\nAtelier: ${prod?.designer}\n\nOur private concierge desk will contact you shortly regarding contract pricing.`);
  };

  const handleTearSheet = (id: string) => {
    const prod = INDIAN_HOSPITALITY_PRODUCTS.find((p) => p.id === id);
    alert(`Atelier Tear Sheet Compiled:\n\nA dynamic PDF catalog dossier for "${prod?.title}" has been sent.`);
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Atelier B2B Hospitality Seating",
    "description": "Explore our collection of dining chairs, loungers, and daybeds handcrafted from aged teak, hand-woven cane, and natural coir ropes direct from Jodhpur.",
    "url": "https://www.sbartisan.com/hospitality-seating"
  };

  return (
    <div className="pt-28 pb-20 bg-[#FDFCF7]">
      <SEO 
        title="Hospitality Seating Manufacturer & Exporter | Jodhpur"
        description="Source wholesale contract dining chairs, resort lounge seats, daybeds, and hand-woven barstools manufactured in Jodhpur to global commercial standards."
        keywords="hospitality seating manufacturer, contract dining chairs, resort loungers exporter, Jodhpur barstools supplier"
        canonical="/hospitality-seating"
        schema={schemaMarkup}
      />
      <Container variant="default" className="space-y-10">
        {/* Page Header */}
        <SectionTitle
          eyebrow="CONTRACT CATALOG"
          title="Hospitality Seating"
          description="Explore our collection of dining chairs, loungers, and daybeds handcrafted from aged teak, hand-woven cane, and natural coir ropes."
          spacing="compact"
          titleProps={{ variant: "xl", weight: "light" }}
          descriptionProps={{ variant: "sm" }}
        />

        {/* Dynamic Category Filtering Tabs */}
        <div className="flex items-center border-b border-[#F2EDE2] pb-4 overflow-x-auto scrollbar-none gap-2 md:gap-4">
          {SEATING_TABS.map((tab) => {
            const isActive = activeTab === tab.slug;
            return (
              <button
                key={tab.slug}
                onClick={() => setActiveTab(tab.slug)}
                className={cn(
                  "text-[10px] tracking-[0.22em] uppercase font-sans py-2.5 px-4 transition-all duration-300 relative font-medium whitespace-nowrap",
                  isActive ? "text-[#1A1A1A]" : "text-[#8C8273] hover:text-[#1A1A1A]"
                )}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-[-17px] left-0 w-full h-[1.5px] bg-[#1A1A1A]" />
                )}
              </button>
            );
          })}
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
          ) : products.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <p className="font-serif text-lg text-[#8C8273] font-light">No items found matching the filter criteria.</p>
              <p className="font-sans text-xs text-[#9E9B95] font-light">Try selecting a different subcategory tab.</p>
            </div>
          ) : (
            <ProductGrid
              products={products}
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
