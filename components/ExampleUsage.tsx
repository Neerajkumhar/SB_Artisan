import React, { useState } from "react";
import { Container, Heading, SubHeading, Paragraph, SectionTitle, PrimaryButton, SecondaryButton, TextButton, IconButton } from "./ui";
import { Navbar, Footer } from "./navigation";
import { INDIAN_HOSPITALITY_PRODUCTS } from "./product";
import { cn } from "../lib/utils";
import {
  HeroSection,
  FeaturedCategories,
  FeaturedCollections,
  BestSellers,
  LuxuryBanner,
  CraftsmanshipSection,
  BlogPreview,
  InquiryCTA,
  CATEGORIES_DATA,
  COLLECTIONS_DATA,
  BLOG_ARTICLES,
  HERO_SLIDES,
} from "./sections";

// Inline vector components representing premium, fine-line luxury iconography
const ArrowRight = () => (
  <svg className="w-3.5 h-3.5 transition-transform duration-300" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 8h14M10 3l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1"/>
    <path d="M10.5 10.5l4.5 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const BagIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 5V3.5a4 4 0 018 0V5m-9.5 1.5h11l1 8.5H1.5l1-8.5z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function LuxuryFurnitureShowcase() {
  const [isGridLoading, setIsGridLoading] = useState(false);
  const [wishlistedIds, setWishlistedIds] = useState<string[]>(["ind-haveli-chair", "ind-shekhawati-bar"]);

  const handleWishlistToggle = (id: string) => {
    setWishlistedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleInquire = (id: string) => {
    const prod = INDIAN_HOSPITALITY_PRODUCTS.find((p) => p.id === id);
    alert(`Acquisition Desk Inquiry Registered:\n\nObject: ${prod?.title}\nAtelier: ${prod?.designer}\n\nOur private concierge desk will contact you shortly regarding custom finishes.`);
  };

  const handleTearSheet = (id: string) => {
    const prod = INDIAN_HOSPITALITY_PRODUCTS.find((p) => p.id === id);
    alert(`Atelier Tear Sheet Compiled:\n\nA dynamic PDF dossier containing structural dimensions, finishes, and wood care instructions for "${prod?.title}" has been sent.`);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF7] text-[#1A1A1A] antialiased selection:bg-[#EAE5D9]">
      
      {/* 1. SEMANTIC NAVIGATION BAR */}
      <Navbar />

      {/* 2. CINEMATIC HERO SECTION */}
      <HeroSection {...HERO_SLIDES[0]} />

      {/* 3. FEATURING CATEGORIES */}
      <FeaturedCategories categories={CATEGORIES_DATA} />

      {/* 4. PHILOSOPHY INTERSTITIAL BANNER */}
      <LuxuryBanner />

      {/* 5. DYNAMIC BEST SELLERS SHOWCASE */}
      <div className="relative">
        {/* Shimmer simulation controller for demonstration */}
        <div className="absolute top-28 right-4 md:right-12 z-20">
          <button
            onClick={() => setIsGridLoading((prev) => !prev)}
            className="text-[9px] tracking-[0.25em] uppercase font-sans px-3.5 py-2 border border-[#EAE5D9] bg-[#FDFCF7] hover:border-[#8C8273] transition-colors rounded-sm font-medium"
          >
            {isGridLoading ? "Showroom Live" : "Simulate Loading Grid"}
          </button>
        </div>
        
        <BestSellers
          products={INDIAN_HOSPITALITY_PRODUCTS}
          isLoading={isGridLoading}
          wishlistedIds={wishlistedIds}
          onInquire={handleInquire}
          onTearSheet={handleTearSheet}
          onWishlistToggle={handleWishlistToggle}
        />
      </div>

      {/* 6. DETAILED COLLECTIONS */}
      <FeaturedCollections collections={COLLECTIONS_DATA} />

      {/* 7. DETAILED CRAFTSMANSHIP NARRATIVE */}
      <CraftsmanshipSection />

      {/* 8. JOURNAL & ARTICLES PREVIEW */}
      <BlogPreview articles={BLOG_ARTICLES} />

      {/* 9. PRIVATE INQUIRY CALL-TO-ACTION */}
      <InquiryCTA />

      {/* 10. PREMIUM LUXURY FOOTER SYSTEM */}
      <Footer />
    </div>
  );
}

