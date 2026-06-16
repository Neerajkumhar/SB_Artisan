import React, { useEffect, useState, useMemo } from "react";
import { useParams, useOutletContext, Link, useSearchParams } from "react-router-dom";
import {
  fetchProducts,
  HospitalityProduct,
  CategoryBanner,
  SubCategoryGrid,
  ProductGrid,
  ProductFilter,
  ProductSort,
  Pagination,
  CatalogBreadcrumb,
} from "../product";
import { Container, SectionTitle, SEO, Heading, Paragraph } from "../ui";
import { cn } from "../../lib/utils";

// 1. CATEGORY CONFIGURATIONS & IMAGES FOR LATEST EDITORIAL SHOWCASE
interface CategoryConfig {
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  subcategories: { name: string; slug: string; image: string }[];
  seoTitle: string;
  seoKeywords: string;
}

const CATEGORY_CONFIGS: Record<string, CategoryConfig> = {
  "restaurant-furniture": {
    title: "Restaurant Furniture",
    eyebrow: "ARCHITECTURAL DINING SHOWCASE",
    description: "Explore our premium contract commercial restaurant furniture collection. SB Artisan is a wholesale exporter of solid wood restaurant dining chairs, teak dining tables, and serving casegoods custom-crafted in our Jodhpur factory.",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=90",
    subcategories: [
      { name: "Restaurant Chairs", slug: "restaurant-chairs", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=150&q=80" },
      { name: "Restaurant Tables", slug: "restaurant-tables", image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=150&q=80" },
      { name: "Restaurant Sofas", slug: "restaurant-sofas", image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=150&q=80" },
      { name: "Outdoor Restaurant Furniture", slug: "outdoor-restaurant-furniture", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=150&q=80" },
    ],
    seoTitle: "Commercial Restaurant Furniture Manufacturer & Exporter",
    seoKeywords: "commercial restaurant furniture manufacturer, wholesale teak dining tables, restaurant dining chairs exporter Jodhpur, contract hospitality tables India",
  },
  "cafe-furniture": {
    title: "Cafe Furniture",
    eyebrow: "BOUTIQUE BISTRO CONTRACTS",
    description: "Buy wholesale cafe and bistro furniture direct from our Jodhpur manufacturing plant. Weather-treated dining chairs, lightweight rattan cane café armchairs, and outdoor dining tables built for high-traffic cafes.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=90",
    subcategories: [
      { name: "Café Chairs", slug: "cafe-chairs", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=150&q=80" },
      { name: "Café Tables", slug: "cafe-tables", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=150&q=80" },
      { name: "Café Benches", slug: "cafe-benches", image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=150&q=80" },
      { name: "Outdoor Café Furniture", slug: "outdoor-cafe-furniture", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=150&q=80" },
    ],
    seoTitle: "Bespoke Cafe Bistro Chairs & Tables Exporter | Jodhpur Factory",
    seoKeywords: "bespoke cafe furniture exporter, wholesale outdoor cafe tables, rattan cafe seating supplier Jodhpur, commercial bistro table manufacturer",
  },
  "bar-furniture": {
    title: "Bar Furniture",
    eyebrow: "UPMARKET LOUNGE COCKTAILS",
    description: "Source Jodhpur bone inlay bar cabinets, custom wholesale barstools, and leather-wrapped cocktail bar counters. Hand-crafted contract bar furniture designed for luxury hotel lounges and upscale restaurants.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=90",
    subcategories: [
      { name: "Bar Chairs", slug: "bar-chairs", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=150&q=80" },
      { name: "Bar Stools", slug: "bar-stools", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=150&q=80" },
      { name: "Bar Tables", slug: "bar-tables", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=150&q=80" },
      { name: "Outdoor Bar Furniture", slug: "outdoor-bar-furniture", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=150&q=80" },
    ],
    seoTitle: "Bone Inlay Bar Cabinets & Contract Stools Supplier",
    seoKeywords: "bone inlay bar cabinet manufacturer Jodhpur, custom contract barstools supplier, hospitality bar furniture, luxury home bar cabinets India",
  },
  "hotel-furniture": {
    title: "Hotel Furniture",
    eyebrow: "PREMIUM LOBBY & SUITE OBJECTS",
    description: "Procure luxury hotel furniture, grand lobby tables, custom carved consoles, and guest suite reading loungers direct from India's contract furniture manufacturer. Generational Jodhpur woodwork tailored to FF&E specifications.",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=90",
    subcategories: [
      { name: "Hotel Dining Chairs", slug: "hotel-dining-chairs", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=150&q=80" },
      { name: "Hotel Dining Tables", slug: "hotel-dining-tables", image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=150&q=80" },
      { name: "Hotel Room Chairs", slug: "hotel-room-chairs", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=150&q=80" },
      { name: "Coffee Tables", slug: "coffee-tables", image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=150&q=80" },
      { name: "Bedside Tables", slug: "bedside-tables", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=150&q=80" },
    ],
    seoTitle: "Luxury Hotel & Resort Lobby Furniture Manufacturer India",
    seoKeywords: "hotel furniture manufacturer India, luxury resort lobby console supplier, hotel guest suite furniture Jodhpur, FF&E contract furniture contractor",
  },
  "cane-furniture": {
    title: "Cane Furniture",
    eyebrow: "WET-BENT RESORT WEAVINGS",
    description: "Premium handmade rattan cane resort furniture. We export organically steam-bent cane loungers, tropical rattan dining chairs, and cane accent tables direct from Jodhpur workshops to global boutique hotels.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=90",
    subcategories: [
      { name: "Cane Chairs", slug: "cane-chairs", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=150&q=80" },
      { name: "Cane Dining Chairs", slug: "cane-dining-chairs", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=150&q=80" },
      { name: "Cane Bar Stools", slug: "cane-bar-stools", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=150&q=80" },
      { name: "Cane Sofa Sets", slug: "cane-sofa-sets", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=150&q=80" },
      { name: "Cane Sideboards", slug: "cane-sideboards", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=150&q=80" },
      { name: "Cane Coffee Tables", slug: "cane-coffee-tables", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=150&q=80" },
      { name: "Cane Bedside Tables", slug: "cane-bedside-tables", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=150&q=80" },
      { name: "Cane Cabinets", slug: "cane-cabinets", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=150&q=80" },
    ],
    seoTitle: "Rattan Cane Resort Furniture Exporter | Jodhpur Hand-Woven",
    seoKeywords: "rattan cane resort furniture exporter, tropical cane armchairs, Jodhpur handmade cane loungers, wholesale rattan table supplier",
  },
  "bone-inlay-furniture": {
    title: "Bone Inlay Furniture",
    eyebrow: "ROYAL JODHPUR RESIN CASEGOODS",
    description: "Global Jodhpur bone inlay furniture exporter. Custom resin color inlay cabinets, geometric dresser casegoods, and floral mother of pearl accent tables manufactured for interior designers and wholesale importers.",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=90",
    subcategories: [
      { name: "Bone Inlay Storage Cabinets", slug: "bone-inlay-storage-cabinets", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=150&q=80" },
      { name: "Bone Inlay Sideboards", slug: "bone-inlay-sideboards", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=150&q=80" },
      { name: "Bone Inlay Bedside Tables", slug: "bone-inlay-bedside-tables", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=150&q=80" },
      { name: "Bone Inlay Coffee Tables", slug: "bone-inlay-coffee-tables", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=150&q=80" },
      { name: "Bone Inlay Side Tables", slug: "bone-inlay-side-tables", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=150&q=80" },
    ],
    seoTitle: "Jodhpur Bone Inlay Furniture Exporter & Supplier | Custom Resins",
    seoKeywords: "Jodhpur bone inlay furniture exporter, wholesale mother of pearl cabinets, custom resin inlay dressers, bone inlay accent tables India",
  },
  "rope-furniture": {
    title: "Rope Furniture",
    eyebrow: "ORGANIC COIR & JUTE BINDINGS",
    description: "Wholesale traditional Indian rope daybeds (charpai), wabi-sabi woven jute benches, and coir rope stools. Ideal for eco-resorts, wellness centers, and coastal hospitality projects.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=90",
    subcategories: [
      { name: "Rope Chairs", slug: "rope-chairs", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=150&q=80" },
      { name: "Rope Stools", slug: "rope-stools", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=150&q=80" },
      { name: "Rope Sofa Sets", slug: "rope-sofa-sets", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=150&q=80" },
      { name: "Rope Benches", slug: "rope-benches", image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=150&q=80" },
      { name: "Rope Outdoor Furniture", slug: "rope-outdoor-furniture", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=150&q=80" },
    ],
    seoTitle: "Indian Rope Daybeds & Benches Manufacturer | Woven Furniture",
    seoKeywords: "Indian rope daybed exporter, wholesale woven jute benches, traditional charpai daybeds Jodhpur, coir rope stools manufacturer",
  },
};

const CATEGORY_FAQS: Record<string, { q: string; a: string }[]> = {
  "restaurant-furniture": [
    { q: "What is your standard MOQ for restaurant projects?", a: "For restaurant tables and seating, we work on a minimum of 20 units per design for custom orders, or a mixed container order." },
    { q: "Are your restaurant chairs built for high-traffic contract use?", a: "Yes, all dining chairs feature commercial-grade mortise-and-tenon joinery and are load-tested to exceed international contract standards." },
    { q: "Can we request custom wood finishes to match our interior design palette?", a: "Absolutely. We provide custom color matching services and can seal timber with water-resistant commercial polyurethane or natural oils." },
    { q: "How long does manufacturing and delivery take?", a: "Our production cycle in Jodhpur takes 8-10 weeks, with ocean shipping adding another 3-4 weeks depending on the destination port." }
  ],
  "cafe-furniture": [
    { q: "Are your café tables suitable for outdoor use?", a: "Yes, our outdoor bistro tables are built with seasoned teak and weather-resistant cast-iron bases, finished in natural oils to resist rain and sunlight." },
    { q: "What is the warranty on cane cafe chairs?", a: "We provide a 2-year structural warranty on all cane and rattan cafe chairs under normal commercial usage conditions." },
    { q: "Do you offer wholesale bulk pricing for cafe openings?", a: "Yes, we structure tiered factory-direct discounts based on order volume. Request a quote below for details." },
    { q: "Can you adjust table heights for cafe seating configurations?", a: "We can customize table heights to bar, dining, or lounge specifications as needed." }
  ],
  "bar-furniture": [
    { q: "Do you customize bone inlay patterns for bar counters?", a: "Yes. Our Jodhpur bone inlay artisans can implement custom geometric or floral damask patterns on cabinets, counters, and table tops." },
    { q: "Are your barstools height-adjustable?", a: "Our standard barstools are built at fixed counter (65cm) or bar (75cm) heights for stability, but custom heights can be specified." },
    { q: "What is the structural material of the bar cabinets?", a: "We utilize solid mango wood cores paired with ethically-sourced bone tiles, set in water-resistant high-grade resins with solid brass frames." },
    { q: "What payment terms do you offer for custom bar designs?", a: "Typically 30% deposit to initiate technical shop drawings and 70% balance against scanning of the original Bill of Lading." }
  ],
  "hotel-furniture": [
    { q: "Do you supply complete FF&E bedroom packages for hotel projects?", a: "Yes, we collaborate with procurement agents to manufacture full guestroom fit-outs: bedside tables, bed frames, room chairs, and consoles." },
    { q: "How are hotel lobby consoles packed for shipping?", a: "We use heavy-gauge corrugated cartons with custom corner protectors, wrapped in humidity-absorbing sheets and secured in heat-treated wooden crates (ISPM-15)." },
    { q: "Can you manufacture based on our designer's custom shop drawings?", a: "Yes, we work directly from CAD/PDF drawings and prepare digital layouts for confirmation before raw sawmill cutting." },
    { q: "Are the wood species FSC-certified?", a: "Yes, we source certified plantation teak, mango, and Sheesham, fully compliant with Forest Stewardship Council and Vriksh regulations." }
  ],
  "cane-furniture": [
    { q: "Is your cane furniture suitable for coastal resort humidity?", a: "All rattan cane is treated with anti-fungal sealers and weather-resistant marine varnishes, making it highly durable for tropical resorts." },
    { q: "How do you achieve the curved profiles of cane furniture?", a: "Our master Jodhpur craftsmen use traditional steam-bending techniques, heating and bending natural rattan poles over custom steel templates." },
    { q: "Can we supply our own fabric for cane cushions?", a: "Yes, we support COM (Customer's Own Material) and can upholster cushions in your specified textile." },
    { q: "How do we maintain cane furniture in commercial spaces?", a: "Simply wipe down with a damp cloth and periodically apply light linseed oil to preserve flexibility and shine." }
  ],
  "bone-inlay-furniture": [
    { q: "Is the bone used in inlay ethically sourced?", a: "We strictly utilize ethically-sourced camel bone retrieved from naturally deceased farm and transport animals in Jodhpur." },
    { q: "Does the resin in bone inlay furniture crack under dry indoor heating?", a: "We use high-integrity, climate-stabilized resins and dry wood cores (8-12% moisture targets) to ensure no cracking occurs in heated environments." },
    { q: "Can we customize the resin color for our inlay cabinets?", a: "Yes, we can color-pigment the resin to match any custom Pantone shade or color swatch you provide." },
    { q: "How are inlay sideboards delivered safely?", a: "They are shipped in fully crated, reinforced wooden boxes with double-layered foam packaging to protect the resin surface." }
  ],
  "rope-furniture": [
    { q: "What type of rope cordage is used in your daybeds and benches?", a: "We utilize organic Keralite coconut coir cordage, dyed organic jute ropes, and high-tensile silk-blend cords." },
    { q: "Is the rope outdoor-resistant?", a: "Yes, our coir and synthetic rope collections are treated to resist water absorption and UV fading, perfect for resort terraces." },
    { q: "Do the ropes stretch or sag over time?", a: "We hand-tension all cordage in dense geometric grids. Jute and coir retain structural rigidity for years, and we include tension adjustments if needed." },
    { q: "Are the wood frames treated for termite protection?", a: "Yes, all rosewood, teak, and mango frames undergo chemical vacuum-impregnation against wood borers and termites." }
  ]
};

const PROJECTS_BY_CATEGORY: Record<string, { title: string; location: string; scope: string; image: string }[]> = {
  "restaurant-furniture": [
    { title: "Olive Bar & Kitchen Dining Salons", location: "Mumbai, India", scope: "120 custom dining chairs, 35 haveli-joinery tables.", image: "/images/restaurant_dining_tables.png" }
  ],
  "cafe-furniture": [
    { title: "Roastery Coffee House Custom Rattan Café", location: "Hyderabad, India", scope: "200 monsoon rattan easy chairs, 60 cast-iron bistro tables.", image: "/images/cafe_patio_chairs.png" }
  ],
  "bar-furniture": [
    { title: "Mehrangarh Royal Club Lounge", location: "Jodhpur, India", scope: "12 bone inlay bar cabinets, brass-repoussé counters.", image: "/images/bar_lounge_inlay.png" }
  ],
  "hotel-furniture": [
    { title: "Umaid Bhawan Palace Check-In Lobby", location: "Jodhpur, India", scope: "4 grand lobby consoles, custom fluted wooden casegoods.", image: "/images/hotel_lobby_furniture.png" },
    { title: "The Amanbagh Resort Suite Fit-Out", location: "Jaipur, India", scope: "80 coir daybeds, 40 teak side tables.", image: "/images/resort_bedroom_daybed.png" }
  ],
  "cane-furniture": [
    { title: "The Amanbagh Resort Suite Fit-Out", location: "Jaipur, India", scope: "80 coir daybeds, 40 teak side tables.", image: "/images/resort_bedroom_daybed.png" },
    { title: "Roastery Coffee House Custom Rattan Café", location: "Hyderabad, India", scope: "200 monsoon rattan easy chairs.", image: "/images/cafe_patio_chairs.png" }
  ],
  "bone-inlay-furniture": [
    { title: "Mehrangarh Royal Club Lounge", location: "Jodhpur, India", scope: "12 bone inlay bar cabinets.", image: "/images/bar_lounge_inlay.png" }
  ],
  "rope-furniture": [
    { title: "The Amanbagh Resort Suite Fit-Out", location: "Jaipur, India", scope: "80 coir daybeds.", image: "/images/resort_bedroom_daybed.png" },
    { title: "Goan Horizon Beachfront Private Villa", location: "Anjuna, Goa", scope: "40 teak lounges, coir benches, custom daybeds.", image: "/images/villa_lounge_furniture.png" }
  ]
};

const SWATCHES = [
  { name: "Natural Aged Teak Wax", type: "Wood Finish", color: "#8C6D4F", desc: "Traditional hand-rubbed wax highlighting mature teak grains." },
  { name: "Smoked Charcoal Oil", type: "Wood Finish", color: "#2E2B2A", desc: "Rich ebonized tone with visible wood pore patterns." },
  { name: "Honey Amber Polish", type: "Wood Finish", color: "#B68B5E", desc: "Warm golden finish reflecting classic Indian palace aesthetics." },
  { name: "Charcoal Onyx Resin", type: "Inlay Resin", color: "#1A1A1A", desc: "Deep black water-resistant resin holding bone tiles." },
  { name: "Indigo Royal Resin", type: "Inlay Resin", color: "#1E2A4A", desc: "Rich navy blue resin accentuating floral motifs." },
  { name: "Emerald Forest Resin", type: "Inlay Resin", color: "#1E3F2E", desc: "Deep forest green resin creating historic regal contrast." },
  { name: "Natural Rattan Cane", type: "Weave", color: "#E0CFAB", desc: "Traditional open star double-woven blonde rattan peel." },
  { name: "Coconut Coir Rope", type: "Weave", color: "#8C715A", desc: "Double-braided organic coconut fiber rope, highly durable." }
];

const ITEMS_PER_PAGE = 6;

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { openInquiry } = useOutletContext<{ openInquiry: (product: HospitalityProduct | null) => void }>();
  const [searchParams] = useSearchParams();
  const subQuery = searchParams.get("sub") || "all";

  // Resolve config or fallback
  const config = useMemo(() => {
    const key = slug?.toLowerCase() || "";
    return CATEGORY_CONFIGS[key] || CATEGORY_CONFIGS["restaurant-furniture"];
  }, [slug]);

  // Component states
  const [allProducts, setAllProducts] = useState<HospitalityProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubcategory, setActiveSubcategory] = useState(subQuery);
  const [activeMaterial, setActiveMaterial] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Bottom enquiry form state
  const [enquiryName, setEnquiryName] = useState("");
  const [enquiryEmail, setEnquiryEmail] = useState("");
  const [enquiryPhone, setEnquiryPhone] = useState("");
  const [enquiryFirm, setEnquiryFirm] = useState("");
  const [enquiryVolume, setEnquiryVolume] = useState("20ft Container (FCL)");
  const [enquiryMessage, setEnquiryMessage] = useState("");
  const [enquiryStatus, setEnquiryStatus] = useState<"idle" | "loading" | "success">("idle");
  const [isGmailWarning, setIsGmailWarning] = useState(false);

  // FAQS state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Selected swatch details display
  const [selectedSwatch, setSelectedSwatch] = useState<typeof SWATCHES[0] | null>(SWATCHES[0]);

  // Reset states when changing category slug or subquery
  useEffect(() => {
    setSearchQuery("");
    setActiveSubcategory(subQuery);
    setActiveMaterial("all");
    setSortBy("featured");
    setCurrentPage(1);
    setEnquiryStatus("idle");
    setEnquiryName("");
    setEnquiryEmail("");
    setEnquiryPhone("");
    setEnquiryFirm("");
    setEnquiryMessage("");
  }, [slug, subQuery]);

  // Load products database
  useEffect(() => {
    setIsLoading(true);
    fetchProducts().then((data) => {
      setAllProducts(data);
      setIsLoading(false);
    });
  }, []);

  // Extract unique materials for the active category
  const categoryMaterials = useMemo(() => {
    const catProducts = allProducts.filter((p) =>
      p.category.toLowerCase().includes(config.title.split(" ")[0].toLowerCase())
    );
    const mats = catProducts.flatMap((p) => p.materials);
    // Standardize to top material categories
    const commonMats = ["Teakwood", "Cane", "Bone", "Resin", "Rosewood", "Rope", "Brass", "Leather"];
    const matched = commonMats.filter((m) =>
      mats.some((pm) => pm.toLowerCase().includes(m.toLowerCase()))
    );
    return matched.length > 0 ? matched : ["Teakwood", "Cane", "Brass"];
  }, [allProducts, config]);

  // Filter, Search, and Sort Pipeline
  const filteredAndSorted = useMemo(() => {
    let result = allProducts.filter((p) => {
      // 1. Match primary category name (e.g. Restaurant Furniture matches "Restaurant")
      const catKeyword = config.title.split(" ")[0].toLowerCase();
      return p.category.toLowerCase().includes(catKeyword);
    });

    // 2. Filter by subcategory tab
    if (activeSubcategory !== "all") {
      result = result.filter((p) => {
        const sub = p.subcategory.toLowerCase();
        const targetSub = activeSubcategory.toLowerCase().replace(/-/g, " ");
        const tags = p.tags.map((t) => t.toLowerCase());
        
        return sub.includes(targetSub) || targetSub.includes(sub) || tags.includes(activeSubcategory.toLowerCase());
      });
    }

    // 3. Filter by Material
    if (activeMaterial !== "all") {
      result = result.filter((p) =>
        p.materials.some((m) => m.toLowerCase().includes(activeMaterial.toLowerCase()))
      );
    }

    // 4. Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.materials.some((m) => m.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // 5. Sort Execution
    if (sortBy === "price-asc") {
      result.sort((a, b) => {
        const valA = parseFloat(a.price?.replace(/[^0-9.]/g, "") || "0");
        const valB = parseFloat(b.price?.replace(/[^0-9.]/g, "") || "0");
        return valA - valB;
      });
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => {
        const valA = parseFloat(a.price?.replace(/[^0-9.]/g, "") || "0");
        const valB = parseFloat(b.price?.replace(/[^0-9.]/g, "") || "0");
        return valB - valA;
      });
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "name-desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      // Default: featured first, then new
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [allProducts, config, activeSubcategory, activeMaterial, searchQuery, sortBy]);

  // Pagination bounds
  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
  
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSorted.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSorted, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of product grid
    const target = document.getElementById("catalog-grid-anchor");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleClearAll = () => {
    setActiveMaterial("all");
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Corporate email warning check
  const handleEmailChange = (val: string) => {
    setEnquiryEmail(val);
    const personalDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com"];
    const domain = val.split("@")[1]?.toLowerCase();
    if (domain && personalDomains.includes(domain)) {
      setIsGmailWarning(true);
    } else {
      setIsGmailWarning(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryEmail || !enquiryMessage) return;

    setEnquiryStatus("loading");
    try {
      const payload = {
        name: enquiryName,
        company_name: enquiryFirm || "Independent Buyer",
        email: enquiryEmail,
        phone: enquiryPhone || "Not Provided",
        country: "India",
        message: `Volume Required: ${enquiryVolume} | Message: ${enquiryMessage}`,
        inquiry_type: `Category Sourcing: ${config.title}`
      };

      const res = await fetch("http://localhost:5000/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const json = await res.json();
      
      if (json.success) {
        setEnquiryStatus("success");
      } else {
        throw new Error(json.message || "Failed to log inquiry");
      }
    } catch (err) {
      console.error("Category inquiry error:", err);
      alert("We encountered an error submitting your trade inquiry. Please try again.");
      setEnquiryStatus("idle");
    }
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${config.title} - Sourcing & Custom Manufacturing Catalogue`,
    "description": config.description,
    "url": `https://www.sbartisan.com/category/${slug}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "SB Artisan Jodhpur",
      "image": "https://www.sbartisan.com/images/commercial_workshop_custom.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Phase II, Basni Industrial Area",
        "addressLocality": "Jodhpur",
        "addressRegion": "Rajasthan",
        "postalCode": "342005",
        "addressCountry": "IN"
      }
    }
  };

  const currentCategoryFaqs = CATEGORY_FAQS[slug || "restaurant-furniture"] || CATEGORY_FAQS["restaurant-furniture"];
  const currentCategoryProjects = PROJECTS_BY_CATEGORY[slug || "restaurant-furniture"] || PROJECTS_BY_CATEGORY["restaurant-furniture"];

  return (
    <div className="pt-28 pb-20 bg-[#FDFCF7]">
      <SEO 
        title={config.seoTitle}
        description={config.description}
        keywords={config.seoKeywords}
        canonical={`/category/${slug}`}
        schema={schemaMarkup}
      />
      <Container variant="default" className="space-y-12 md:space-y-16">
        
        {/* 1. Breadcrumbs */}
        <CatalogBreadcrumb
          items={[
            { label: "Showrooms", href: "/collections" },
            { label: config.title },
          ]}
        />

        {/* 2. Editorial Category Banner */}
        <CategoryBanner
          title={config.title}
          eyebrow={config.eyebrow}
          description={config.description}
          backgroundImage={config.image}
        />

        {/* 2.5 Category B2B Introduction */}
        <div className="max-w-4xl border-l-2 border-[#8C6D4F] pl-6 md:pl-8 py-2">
          <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#8C8273] font-semibold block mb-2">Atelier Introduction</span>
          <h3 className="font-serif text-lg md:text-xl font-light text-[#1A1A1A] leading-relaxed italic">
            SB Artisan is a leading supplier and exporter of contract-grade custom furniture for hotels, resorts, cafes, bars, and commercial projects worldwide. Every piece in our {config.title} collection is manufactured in Jodhpur, India, utilizing certified seasoned hardwoods, legal lumber sourcing, and strict multi-phase quality inspections.
          </h3>
        </div>

        {/* 3. Classification Subcategories */}
        {config.subcategories.length > 0 && (
          <SubCategoryGrid
            subcategories={config.subcategories}
            activeSubcategory={activeSubcategory}
            onSelect={(sub) => {
              setActiveSubcategory(sub);
              setCurrentPage(1);
            }}
            className="border-b border-[#F2EDE2] pb-6"
          />
        )}

        <div id="catalog-grid-anchor" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-4">
          
          {/* 4. LEFT COLUMN: Filter & Search Panel */}
          <div className="lg:col-span-3 space-y-8 lg:sticky lg:top-28">
            
            {/* Search Input */}
            <div className="space-y-3.5">
              <h4 className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8C8273] font-semibold">
                Registry Search
              </h4>
              <div className="relative border-b border-[#2C2B29] pb-1.5 flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#8C8273]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by wood, craft..."
                  className="bg-transparent text-xs text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none w-full font-sans font-light"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-[#8C8273] hover:text-[#1A1A1A] text-[9px] font-sans uppercase tracking-wider font-light"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Material Filters */}
            <ProductFilter
              materials={categoryMaterials}
              activeMaterial={activeMaterial}
              onMaterialChange={(mat) => {
                setActiveMaterial(mat);
                setCurrentPage(1);
              }}
              onClear={handleClearAll}
            />

            {/* Sorting dropdown */}
            <ProductSort
              sortBy={sortBy}
              onSortChange={(sort) => {
                setSortBy(sort);
                setCurrentPage(1);
              }}
            />

            {/* General Consultation Promo Card */}
            <div className="border border-[#EAE5D9] bg-[#FAF8F2] p-5 rounded-sm space-y-4 shadow-[0_2px_10px_rgba(0,0,0,0.01)] hidden lg:block">
              <span className="text-[8px] uppercase tracking-[0.25em] font-semibold text-[#8C8273] block">
                Trade Concierge Desk
              </span>
              <h5 className="font-serif text-sm font-light text-[#1A1A1A] leading-tight">
                Architect & Designer Account
              </h5>
              <p className="font-sans text-[10px] text-[#6E6B64] font-light leading-relaxed">
                Unlock wholesale export rates, customs brokerage support, and bespoke custom dimensions for hospitality commissions.
              </p>
              <button
                onClick={() => openInquiry(null)}
                className="w-full py-2.5 bg-[#1A1A1A] hover:bg-[#8C6D4F] text-white text-[9px] uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 rounded-sm"
              >
                Discuss Project
              </button>
            </div>

          </div>

          {/* 5. RIGHT COLUMN: Dynamic Showcase Grid */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Active filters status summary */}
            <div className="flex items-baseline justify-between select-none text-[10px] tracking-wider uppercase text-[#8C8273] font-sans border-b border-[#F2EDE2]/60 pb-3">
              <span>
                Displaying {filteredAndSorted.length} {filteredAndSorted.length === 1 ? "Object" : "Objects"}
              </span>
              <span>
                Page {currentPage} of {Math.max(1, totalPages)}
              </span>
            </div>

            {/* Product Grid component */}
            <ProductGrid
              products={paginatedProducts}
              variant="editorial"
              columns={3}
              isLoading={isLoading}
              wishlistedIds={[]}
              onInquire={(id) => {
                const prod = allProducts.find((p) => p.id === id);
                if (prod) openInquiry(prod);
              }}
            />

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

          </div>

        </div>

        {/* 6. Materials & Finishes swatch grid */}
        <div className="py-12 border-t border-[#F2EDE2]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#8C6D4F] block">Atelier Finishing swatches</span>
              <Heading variant="display" size="sm" weight="light" className="text-[#1A1A1A] leading-tight">
                Materials & Finishes Swatches
              </Heading>
              <Paragraph variant="md" className="text-[#6E6B64] font-light leading-relaxed">
                We provide a diverse palette of organic wood finishes, hand-laid resin colors, and traditional cordage weaves. Click any swatch on the right to read its description and material care specs.
              </Paragraph>
              
              {selectedSwatch && (
                <div className="p-5 border border-[#EAE5D9] bg-[#FAF8F2] rounded-sm space-y-3 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: selectedSwatch.color }} />
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-[#1A1A1A]">{selectedSwatch.name}</h4>
                      <span className="text-[9px] uppercase tracking-wider text-[#8C8273] font-mono">{selectedSwatch.type}</span>
                    </div>
                  </div>
                  <p className="font-sans text-[11px] text-[#6E6B64] font-light leading-relaxed">
                    {selectedSwatch.desc}
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {SWATCHES.map((swatch, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSwatch(swatch)}
                  className={cn(
                    "p-4 border text-left rounded-sm space-y-4 transition-all duration-300 flex flex-col justify-between hover:border-[#8C6D4F]",
                    selectedSwatch?.name === swatch.name ? "border-[#8C6D4F] bg-[#FAF8F2]" : "border-[#EAE5D9] bg-transparent"
                  )}
                >
                  <span className="w-10 h-10 rounded-full border border-black/5 block shadow-inner shrink-0" style={{ backgroundColor: swatch.color }} />
                  <div>
                    <h5 className="font-serif text-xs font-medium text-[#1A1A1A] leading-tight">{swatch.name}</h5>
                    <span className="text-[8px] uppercase tracking-wider text-[#8C8273] font-mono mt-1 block">{swatch.type}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 7. Customization options block */}
        <div className="py-12 border-t border-[#F2EDE2]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#8C6D4F] block">Customization capabilities</span>
              <Heading variant="display" size="sm" weight="light" className="text-[#1A1A1A]">
                Customization Options
              </Heading>
              <Paragraph variant="md" className="text-[#6E6B64] font-light leading-relaxed">
                As a direct manufacturer, we offer comprehensive bespoke adjustments. Whether you are an interior designer, hotel architect, or furniture importer, we adapt dimensions, material joints, and textile choices to your project specifications.
              </Paragraph>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-5 border border-[#EAE5D9] bg-[#FAF8F2]/60 rounded-sm space-y-2">
                <span className="text-[8px] font-mono text-[#8C6D4F] uppercase tracking-widest font-semibold block">01 / Custom Dimensions</span>
                <h4 className="font-serif text-sm font-medium text-[#1A1A1A]">CAD-Aligned Scaling</h4>
                <p className="font-sans text-[11px] text-[#6E6B64] font-light leading-relaxed">
                  We modify leg heights, table top depths, and seating curves to align perfectly with your client's architectural layout drawings.
                </p>
              </div>

              <div className="p-5 border border-[#EAE5D9] bg-[#FAF8F2]/60 rounded-sm space-y-2">
                <span className="text-[8px] font-mono text-[#8C6D4F] uppercase tracking-widest font-semibold block">02 / Lumber Seasoning</span>
                <h4 className="font-serif text-sm font-medium text-[#1A1A1A]">Stabilized Kiln Sourcing</h4>
                <p className="font-sans text-[11px] text-[#6E6B64] font-light leading-relaxed">
                  Select premium plantation teakwood, Sheesham, acacia, or mango. All logs are kiln-dried to 8-12% relative moisture targets.
                </p>
              </div>

              <div className="p-5 border border-[#EAE5D9] bg-[#FAF8F2]/60 rounded-sm space-y-2">
                <span className="text-[8px] font-mono text-[#8C6D4F] uppercase tracking-widest font-semibold block">03 / COM Upholstery</span>
                <h4 className="font-serif text-sm font-medium text-[#1A1A1A]">Customer's Own Material</h4>
                <p className="font-sans text-[11px] text-[#6E6B64] font-light leading-relaxed">
                  Supply your own fabrics, linens, or leather skins. We cut and sew padding layers exactly to hotel fire-resistance safety norms.
                </p>
              </div>

              <div className="p-5 border border-[#EAE5D9] bg-[#FAF8F2]/60 rounded-sm space-y-2">
                <span className="text-[8px] font-mono text-[#8C6D4F] uppercase tracking-widest font-semibold block">04 / Specialty Finishes</span>
                <h4 className="font-serif text-sm font-medium text-[#1A1A1A]">Resin Colors & Metals</h4>
                <p className="font-sans text-[11px] text-[#6E6B64] font-light leading-relaxed">
                  Request custom Pantone-matched resins for bone inlay cabinets, sheet brass wrap repoussé detailing, or ebonized charcoal matte wax oils.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 8. Featured Projects */}
        {currentCategoryProjects && currentCategoryProjects.length > 0 && (
          <div className="py-12 border-t border-[#F2EDE2]">
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#8C6D4F] block">Completed case studies</span>
                <Heading variant="display" size="sm" weight="light" className="text-[#1A1A1A]">
                  Featured Projects
                </Heading>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {currentCategoryProjects.map((project, idx) => (
                  <div key={idx} className="border border-[#EAE5D9] bg-[#FAF8F2]/60 rounded-sm overflow-hidden flex flex-col sm:flex-row shadow-[0_2px_15px_rgba(0,0,0,0.01)]">
                    <img src={project.image} alt={project.title} className="w-full sm:w-1/3 aspect-video sm:aspect-auto object-cover" />
                    <div className="p-6 space-y-3 flex-grow flex flex-col justify-center">
                      <div className="flex justify-between text-[9px] uppercase tracking-widest text-[#8C8273] font-mono">
                        <span>{project.location}</span>
                      </div>
                      <h4 className="font-serif text-base font-light text-[#1A1A1A] leading-snug">{project.title}</h4>
                      <p className="font-sans text-xs text-[#6E6B64] font-light leading-relaxed">{project.scope}</p>
                      <Link to="/projects" className="text-[9px] uppercase tracking-[0.2em] font-sans font-semibold text-[#8C6D4F] hover:text-[#1A1A1A] transition-colors mt-2 block">
                        View Project Gallery &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 9. Specialized category FAQs */}
        <div className="py-12 border-t border-[#F2EDE2]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#8C6D4F] block">B2B procurement questions</span>
              <Heading variant="display" size="sm" weight="light" className="text-[#1A1A1A]">
                Frequently Asked Questions
              </Heading>
              <Paragraph variant="md" className="text-[#6E6B64] font-light leading-relaxed">
                Need details regarding factory moisture controls, global logistics container options, customs clearances, or AutoCAD shop approvals? Browse answers to key B2B sourcing questions.
              </Paragraph>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {currentCategoryFaqs.map((faq, idx) => (
                <div key={idx} className="border border-[#EAE5D9] rounded-sm bg-[#FAF8F2]/60 overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 outline-none font-serif text-sm font-medium text-[#1A1A1A]"
                  >
                    <span>{faq.q}</span>
                    <svg
                      className={cn("w-3.5 h-3.5 text-[#8C8273] transition-transform duration-300 shrink-0", activeFaq === idx && "rotate-180")}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {activeFaq === idx && (
                    <div className="px-5 pb-5 pt-1 border-t border-[#F2EDE2]/60 font-sans text-xs text-[#6E6B64] font-light leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 10. Bottom B2B Enquiry Form */}
        <div id="category-enquiry-form" className="py-12 border-t border-[#F2EDE2] scroll-mt-28">
          <div className="max-w-3xl mx-auto border border-[#EAE5D9] bg-[#FAF8F2] p-8 md:p-12 rounded-sm shadow-xl relative">
            <div className="text-center space-y-3 mb-8">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#8C6D4F] font-semibold block">Direct factory rfq desk</span>
              <Heading variant="display" size="sm" weight="light" className="text-[#1A1A1A]">
                Request a Custom Quote
              </Heading>
              <Paragraph variant="sm" className="text-[#6E6B64] font-light max-w-md mx-auto">
                Submit your project volume and specifications. A B2B account manager will prepare a custom manufacturing bid and lead-time estimation.
              </Paragraph>
            </div>

            {enquiryStatus === "success" ? (
              <div className="p-8 bg-white border border-[#EAE5D9] rounded-sm text-center space-y-4">
                <svg className="w-12 h-12 text-[#8C6D4F] mx-auto" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="font-serif text-lg text-[#1A1A1A] font-light">Enquiry Registry Logged</h4>
                <p className="font-sans text-xs text-[#6E6B64] font-light leading-relaxed max-w-sm mx-auto">
                  Thank you. Your B2B request for {config.title} has been logged in the Jodhpur registry. A trade representative will contact you within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-sans font-semibold">Client Name</label>
                    <input
                      type="text" required value={enquiryName} onChange={(e) => setEnquiryName(e.target.value)} disabled={enquiryStatus === "loading"}
                      className="w-full bg-transparent border-b border-[#2C2B29]/60 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-light font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-sans font-semibold">Corporate Email</label>
                    <input
                      type="email" required value={enquiryEmail} onChange={(e) => handleEmailChange(e.target.value)} disabled={enquiryStatus === "loading"}
                      className="w-full bg-transparent border-b border-[#2C2B29]/60 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-light font-sans"
                    />
                    {isGmailWarning && (
                      <span className="text-[9px] text-[#A37B30] font-sans block pt-1">
                        * Note: Corporate email domains unlock faster RFQ priority tiers.
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-sans font-semibold">Company / Firm</label>
                    <input
                      type="text" value={enquiryFirm} onChange={(e) => setEnquiryFirm(e.target.value)} disabled={enquiryStatus === "loading"}
                      placeholder="e.g. Studio Kōyō"
                      className="w-full bg-transparent border-b border-[#2C2B29]/60 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-light font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-sans font-semibold">Phone / WhatsApp</label>
                    <input
                      type="text" value={enquiryPhone} onChange={(e) => setEnquiryPhone(e.target.value)} disabled={enquiryStatus === "loading"}
                      placeholder="e.g. +1 555-0199"
                      className="w-full bg-transparent border-b border-[#2C2B29]/60 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-light font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-sans font-semibold">Project Volume Target</label>
                  <select
                    value={enquiryVolume} onChange={(e) => setEnquiryVolume(e.target.value)} disabled={enquiryStatus === "loading"}
                    className="w-full bg-transparent border-b border-[#2C2B29]/60 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-sans font-light"
                  >
                    <option value="20ft Container (FCL)">20ft Container Load (approx. 28-33 CBM)</option>
                    <option value="40ft Container (FCL)">40ft High-Cube Container Load (approx. 68-76 CBM)</option>
                    <option value="Less than Container Load (LCL)">Less than Container Load (LCL Shared Pallet)</option>
                    <option value="Multi-Container Project">Multi-Container Sourcing Program</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-sans font-semibold">Message / Specifications</label>
                  <textarea
                    rows={4} required value={enquiryMessage} onChange={(e) => setEnquiryMessage(e.target.value)} disabled={enquiryStatus === "loading"}
                    placeholder="Describe custom dimensions, wood profiles, or custom resin inlay shades required..."
                    className="w-full bg-transparent border-b border-[#2C2B29]/60 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-sans font-light resize-none"
                  />
                </div>

                <button
                  type="submit" disabled={enquiryStatus === "loading"}
                  className="w-full py-4 bg-[#1A1A1A] hover:bg-[#8C6D4F] text-white text-xs uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 rounded-sm"
                >
                  {enquiryStatus === "loading" ? "Registering RFQ..." : "Submit Project Enquiry"}
                </button>
              </form>
            )}
          </div>
        </div>

      </Container>
    </div>
  );
}
