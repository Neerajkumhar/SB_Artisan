export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  primaryLink: string;
  primaryText: string;
  secondaryLink: string;
  secondaryText: string;
}

export interface CategoryCard {
  id: string;
  title: string;
  meta: string;
  description: string;
  image: string;
  href: string;
  ctaText: string;
}

export interface FeaturedCollection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
  linkText: string;
  meta: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  href: string;
  description: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "hero-export",
    title: "Premium Handcrafted Furniture\nSupplier & Exporter from India",
    subtitle: "Atelier Sourcing Program",
    description: "Supplying Hotels, Restaurants, Cafés, Bars, Resorts, and Interior Projects with Custom-Made Furniture Worldwide.",
    image: "/images/hotel_lobby_furniture.png",
    primaryLink: "/contact?tab=catalogue",
    primaryText: "Request Catalogue",
    secondaryLink: "/bespoke-services",
    secondaryText: "Bespoke Sourcing",
  },
  {
    id: "hero-resorts",
    title: "Bespoke Resort & Hotel\nSanctuary Collections",
    subtitle: "Luxury Hospitality Series",
    description: "Handcrafted low-slung coir beds, grand teak cabinet systems, and bent-cane lounge setups custom-spec'd for boutique guest suites and resort lobbies.",
    image: "/images/resort_bedroom_daybed.png",
    primaryLink: "/category/hotel-furniture",
    primaryText: "Hotel Series",
    secondaryLink: "/bespoke-services",
    secondaryText: "Request Quote",
  },
  {
    id: "hero-restaurants",
    title: "Contract-Grade Fine Dining\n& Restaurant Tables",
    subtitle: "Upscale Culinary Projects",
    description: "Beautifully aged reclaimed teak dining sets, premium dining armchairs, and Rajasthani bone-inlay cocktail bars engineered for high-traffic hospitality settings.",
    image: "/images/restaurant_dining_tables.png",
    primaryLink: "/category/restaurant-furniture",
    primaryText: "Dining Catalog",
    secondaryLink: "/bespoke-services",
    secondaryText: "Trade Inquiry",
  },
  {
    id: "hero-cafes",
    title: "Weather-Treated Café\n& Bistro Seating",
    subtitle: "Outdoor & Indoor Dining",
    description: "Steam-bent rattan armchairs, outdoor bistro tables, and custom lounge setups finished in weatherproof natural oils to withstand intensive commercial use.",
    image: "/images/cafe_patio_chairs.png",
    primaryLink: "/category/cafe-furniture",
    primaryText: "Bistro Series",
    secondaryLink: "/bespoke-services",
    secondaryText: "Submit RFP",
  },
  {
    id: "hero-commercial",
    title: "Bespoke Custom Furniture\nFor Commercial Projects",
    subtitle: "Trade & Architect Partners",
    description: "Submit your CAD layouts, material specifications, and volume requirements. We partner directly with hotel developers and architects to fabricate statement projects.",
    image: "/images/commercial_workshop_custom.png",
    primaryLink: "/bespoke-services",
    primaryText: "Bespoke Concierge",
    secondaryLink: "/contact",
    secondaryText: "Contact Export Desk",
  },
];

export const CATEGORIES_DATA: CategoryCard[] = [
  {
    id: "cat-restaurant",
    title: "Restaurant Furniture",
    meta: "Fine Dining Salons",
    description: "Settle guests into bespoke chairs and dining tables sculpted from seasoned reclaimed teakwood, merging heritage joinery with modern culinary spaces.",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
    href: "/category/restaurant-furniture",
    ctaText: "Explore Dining",
  },
  {
    id: "cat-cafe",
    title: "Cafe Furniture",
    meta: "Monsoon Rattan & Teak",
    description: "Sunlit chairs, bistro tables, and lounge chairs featuring hand-woven rattan, finished in natural oils to withstand high-traffic outdoor and indoor cafes.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1000&q=80",
    href: "/category/cafe-furniture",
    ctaText: "Explore Bistro",
  },
  {
    id: "cat-bar",
    title: "Bar Furniture",
    meta: "Royal Lounge Cocktail Series",
    description: "Source Jodhpur bone inlay bar cabinets, custom wholesale barstools, and leather-wrapped cocktail bar counters engineered for luxury lounges and upscale clubs.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    href: "/category/bar-furniture",
    ctaText: "Explore Bar",
  },
  {
    id: "cat-hotel",
    title: "Hotel Furniture",
    meta: "Resort Lobby Systems",
    description: "Grand credenzas, loungers, and vanity desks carved for boutique hotels. Merging brass accents and structural stability for signature spaces.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    href: "/category/hotel-furniture",
    ctaText: "Explore Hospitality",
  },
  {
    id: "cat-cane",
    title: "Cane Furniture",
    meta: "Canopy Resort Series",
    description: "Classic Indian lounge seating steam-bent by master craftsmen, weaving airy rattan frames with modern silhouettes to evoke tropical luxury.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
    href: "/category/cane-furniture",
    ctaText: "Explore Cane",
  },
  {
    id: "cat-bone-inlay",
    title: "Bone Inlay Furniture",
    meta: "Jodhpur Royal Credenzas",
    description: "Striking casegoods adorned with hand-carved ethically sourced bone tiles set in custom colored resins. Architectural accent statements.",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80",
    href: "/category/bone-inlay-furniture",
    ctaText: "Explore Inlay",
  },
  {
    id: "cat-rope",
    title: "Rope Furniture",
    meta: "Keralite Coir & Silk",
    description: "High-tensile, hand-tensioned coir and organic silk rope beds and benches, combining ancient Keralite weave layouts with clean geometric frames.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
    href: "/category/rope-furniture",
    ctaText: "Explore Rope",
  },
];

export const COLLECTIONS_DATA: FeaturedCollection[] = [
  {
    id: "coll-desert-cane",
    title: "Desert Cane Collection",
    subtitle: "Steam-Bent Rattan & Teak Lounge Systems",
    meta: "Thar Desert Workshop",
    description: "Formed using century-old steam-bending techniques in Rajasthan workshops, this collection marries the flexibility of premium cane with seasoned plantation teak, creating an airy, comfortable seating experience for sunlit terraces and resort lounges.",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=90",
    href: "/category/cane-furniture",
    linkText: "Explore Desert Cane",
  },
  {
    id: "coll-boutique-resort",
    title: "Boutique Resort Series",
    subtitle: "Integrated Lounge and Lobby Systems",
    meta: "Signature Hospitality Placements",
    description: "Designed for premium boutique guest rooms and tropical spas. This collection features grand low-slung daybeds, side tables, and lounge chairs crafted with organic textures and minimalist brass hardware to invoke slow luxury.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90",
    href: "/category/hotel-furniture",
    linkText: "Request Spec Sheets",
  },
  {
    id: "coll-jodhpur-bone",
    title: "Jodhpur Bone Inlay",
    subtitle: "Hand-Carved Floral Casegoods",
    meta: "Artisan Guild Curation",
    description: "Masterpieces of Rajasthani craftsmanship. Ethically sourced bone tiles are hand-carved into intricate floral and geometric motifs, then laid in warm custom resins over mango wood frames to form striking credenzas and bar cabinets.",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=90",
    href: "/category/bone-inlay-furniture",
    linkText: "Discover Inlay Commissions",
  },
  {
    id: "coll-coastal-rope",
    title: "Coastal Rope Living",
    subtitle: "Hand-Tensioned Silk and Coir Cordage",
    meta: "Malabar Guild Weaving",
    description: "Inspired by the shipping trade of the Malabar Coast. Heavy-gauge coir and soft silk rope are hand-tensioned over solid rosewood frames, offering weather-resistant structural seating that breathes with the ocean wind.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=90",
    href: "/category/rope-furniture",
    linkText: "Explore Cordage Chairs",
  },
  {
    id: "coll-heritage-teak",
    title: "Heritage Teak Dining",
    subtitle: "Reclaimed Wood and Solid Joinery Tables",
    meta: "Century-Old Architectural Timber",
    description: "Dining tables and dining benches reconstructed from architectural columns salvaged from historic havelis. Each piece showcases mortise-and-tenon joints, historic scars, and rich grains seasoned over generations.",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=90",
    href: "/category/restaurant-furniture",
    linkText: "Request Catalog Dossier",
  },
  {
    id: "coll-modern-haveli",
    title: "Modern Haveli Edit",
    subtitle: "Traditional Proportions with Clean Silhouettes",
    meta: "Atelier Custom Commissions",
    description: "A bridging of ancient courtly furniture dimensions with clean, geometric modern frame lines. Minimalist styling meets detailed Indian woodwork, creating conversation statements for upscale hotel suites.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=90",
    href: "/category/restaurant-furniture",
    linkText: "View Bespoke Series",
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "blog-hotel-guide",
    title: "Hotel Furniture Sourcing & Sizing Guide",
    category: "Hotel Furniture",
    date: "May 10, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
    author: "Atelier Project Desk",
    href: "/journal",
    description: "A technical guide to hotel furniture procurement. Learn about wood seasoning kilns, timber legality certificates, moisture targets, and container logistics optimization."
  },
  {
    id: "blog-restaurant-trends",
    title: "Commercial Restaurant Furniture Trends",
    category: "Restaurant Furniture",
    date: "May 24, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
    author: "Fine Dining Guild",
    href: "/journal",
    description: "Explore the shift towards reclaimed haveli teakwood, visible mechanical joinery, and organic food-safe matte finishes in high-traffic restaurant spaces."
  },
  {
    id: "blog-cane-ideas",
    title: "Cane Furniture Design for Resort Spaces",
    category: "Cane Furniture",
    date: "June 01, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    author: "Rattan Craft Master",
    href: "/journal",
    description: "How to incorporate steam-bent rattan easy chairs, double-woven star pattern mesh panels, and natural textures in resort and spa lounges."
  },
  {
    id: "blog-bone-guide",
    title: "Jodhpur Bone Inlay Furniture Specification",
    category: "Bone Inlay",
    date: "June 05, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    author: "Jodhpur Guild Masters",
    href: "/journal",
    description: "Understand Jodhpur bone inlay casegoods production: chevron and floral damask motif tile carvings, Mango wood cores, and custom Pantone resin settings."
  },
  {
    id: "blog-maintenance",
    title: "Contract Furniture Maintenance Manual",
    category: "Hotel Furniture",
    date: "June 12, 2026",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    author: "QC Workshop Head",
    href: "/journal",
    description: "Best practices for solid wood furniture care, beeswax polishing, rattan and cane humidity balance, and joint pin maintenance programs in commercial buildings."
  },
  {
    id: "blog-export-guide",
    title: "Logistics Coordinates & Export Packaging Standards",
    category: "Furniture Export",
    date: "June 19, 2026",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    author: "Logistics Export Desk",
    href: "/journal",
    description: "A comprehensive manual on international furniture shipping logistics from Jodhpur Inland Container Depot (ICD) to major global ports."
  },
  {
    id: "blog-design-trends",
    title: "Bespoke Design Trends: Modern Haveli Edit",
    category: "Design Trends",
    date: "June 25, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    author: "Atelier Editor",
    href: "/journal",
    description: "Bridging traditional Rajasthani woodcarving silhouettes with clean modern geometric shapes under the Modern Haveli Edit."
  },
  {
    id: "blog-cafe-guide",
    title: "Commercial Cafe & Bistro Furniture Sourcing",
    category: "Cafe Furniture",
    date: "June 28, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80",
    author: "Bistro Design Lead",
    href: "/journal",
    description: "Technical guidelines for selecting outdoor bistro chairs, commercial-grade cafe tables, and space-maximizing booth setups."
  }
];

