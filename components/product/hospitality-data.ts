export interface ProductDimensions {
  height: number;
  width: number;
  depth: number;
  unit: "cm" | "in";
}

export interface HospitalityProduct {
  // Core Identifiers
  id: string;
  title: string; // Indian luxury title
  name: string; // Duplicate of title for backward compatibility
  slug: string; // URL-safe slug
  
  // Categorization
  category: string; // E.g. "Restaurant Furniture"
  subcategory: string; // E.g. "Dining Seating"
  category_id?: number;
  subcategory_id?: number;
  
  // Branding & Storytelling
  description: string; // Short editorial description
  story: string; // Handmade Indian luxury storytelling
  designer: string; // E.g. "Jodhpur Atelier", "Studio Kōyō"
  
  // Specifications
  materials: string[];
  dimensions: ProductDimensions;
  finishes: string[];
  price?: string;
  
  // Galleries and Media
  image: string; // First image for backward compatibility
  imageGallery: string[];
  
  // Hospitality Details
  hospitalityUsage: string;
  
  // Metadata status
  featured: boolean;
  isFeatured: boolean; // Duplicate for backward compatibility
  isNew?: boolean;
  tags: string[];
}

export interface HospitalityCollection {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  featured: boolean;
}

export interface ProductFilters {
  category?: string;
  query?: string;
  featuredOnly?: boolean;
  material?: string;
  tag?: string;
}

// ----------------------------------------------------
// 1. MOCK PRODUCT DATABASE
// ----------------------------------------------------
export const INDIAN_HOSPITALITY_PRODUCTS: HospitalityProduct[] = [
  {
    id: "ind-haveli-chair",
    title: "Haveli Reclaimed Teak Dining Chair",
    name: "Haveli Reclaimed Teak Dining Chair",
    slug: "haveli-reclaimed-teak-dining-chair",
    category: "Restaurant Furniture",
    subcategory: "Restaurant Chairs",
    description: "Monolithic, hand-planed dining chair sculpted from century-old Shekhawati haveli timbers.",
    story: "Meticulously crafted from reclaimed structural teak retrieved from 19th-century havelis in Shekhawati. Its backrest features a subtly curved modern interpretation of the classical archway (Jharokha), hand-planed by local woodworkers. The seat features organic, double-woven rattan cane, ensuring breathability and timeless style for high-end dining environments.",
    designer: "Jodhpur Woodworking Atelier",
    materials: ["Reclaimed Teakwood", "Natural Rattan Cane", "Brushed Brass Dowels"],
    dimensions: { height: 82, width: 54, depth: 56, unit: "cm" },
    finishes: ["Smoked Charcoal Matte Oil", "Natural Aged Teak Wax", "Honey Amber Polish"],
    price: "₹24,500",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80"
    ],
    hospitalityUsage: "High-traffic fine dining rooms, private dining salons, and upscale hotel breakfast terraces.",
    featured: true,
    isFeatured: true,
    isNew: true,
    tags: ["haveli", "dining", "teak", "restaurant", "seating", "heritage", "cane"]
  },
  {
    id: "ind-dune-lounge",
    title: "Dune Sand Wet-Bent Cane Lounge",
    name: "Dune Sand Wet-Bent Cane Lounge",
    slug: "dune-sand-wet-bent-cane-lounge",
    category: "Cane Furniture",
    subcategory: "Cane Chairs",
    description: "An organically curved lounge chair showcasing steam-bent cane wrapped in rich rattan peel.",
    story: "Evoking the gentle sand formations of the Thar Desert, this sculptural lounger features organic curves formed through slow-steamed, wet-bending cane. Hand-woven panels of raw rattan peel wrap the frame, while the seat is upholstered in a premium Belgian linen-blend bouclé. Perfect for slow hospitality spaces that bridge indoors and outdoors.",
    designer: "SB Artisan & local craftsmen",
    materials: ["Natural Wet-Bent Cane", "Premium Linen Bouclé", "Satin Brass Fittings"],
    dimensions: { height: 74, width: 82, depth: 80, unit: "cm" },
    finishes: ["Bleached Raw Cane", "Sun-baked Amber", "Toasted Ochre"],
    price: "₹48,000",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80"
    ],
    hospitalityUsage: "Hotel lobby lounge spaces, covered resort verandas, luxury suite reading corners, and wellness spas.",
    featured: true,
    isFeatured: true,
    isNew: true,
    tags: ["lounge", "cane", "seating", "lobby", "resort", "desert", "rattan"]
  },
  {
    id: "ind-shekhawati-bar",
    title: "Shekhawati Floral Bone Inlay Bar Cabinet",
    name: "Shekhawati Floral Bone Inlay Bar Cabinet",
    slug: "shekhawati-floral-bone-inlay-bar-cabinet",
    category: "Bone Inlay Furniture",
    subcategory: "Bone Inlay Storage Cabinets",
    description: "An ornate bar cabinet featuring hand-cut camel bone tiles set in deep charcoal resin.",
    story: "A masterpiece of heritage craftsmanship. Over three weeks, Jodhpur artisans carve and lay individual tiles of ethically-sourced camel bone in an intricate floral damask pattern. Set against a deep, hand-pigmented charcoal resin and supported by a solid brushed brass frame. Inside, it features tempered glass stemware racks and velvet-lined cocktail drawers.",
    designer: "Jodhpur Bone Inlay Atelier",
    materials: ["Ethically Sourced Camel Bone", "Water-resistant Resin Inlay", "Brushed Brass Hardware", "Solid Mango Wood Frame"],
    dimensions: { height: 142, width: 92, depth: 46, unit: "cm" },
    finishes: ["Charcoal Onyx Resin", "Emerald Forest Resin", "Sandstone Beige Resin"],
    price: "₹1,25,000",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80"
    ],
    hospitalityUsage: "Boutique hotel guest rooms as a signature minibar, private wine tasting rooms, and high-end cocktail club lounges.",
    featured: true,
    isFeatured: true,
    isNew: false,
    tags: ["inlay", "bar", "cabinet", "liquor", "jodhpur", "luxury", "bone"]
  },
  {
    id: "ind-keralite-daybed",
    title: "Keralite Coir Rope Daybed",
    name: "Keralite Coir Rope Daybed",
    slug: "keralite-coir-rope-daybed",
    category: "Rope Furniture",
    subcategory: "Rope Benches",
    description: "A low-profile daybed crafted from solid Indian rosewood and hand-tensioned coir ropes.",
    story: "Inspired by the classical Charpai used for centuries in rural India, this low-slung daybed features double-braided organic coir ropes hand-tensioned in a geometric grid. The primary frame is crafted from premium Indian rosewood (Sheesham) with rounded mortise-and-tenon joints, carrying a soft, unbleached organic cotton daybed bolster.",
    designer: "Kerala Craft Conservatory",
    materials: ["Solid Indian Rosewood", "Organic Coconut Coir Ropes", "Unbleached Cotton Cushioning"],
    dimensions: { height: 45, width: 200, depth: 95, unit: "cm" },
    finishes: ["Natural Matte Rosewood Wax", "Ebonized Walnut Polish"],
    price: "₹62,000",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
    ],
    hospitalityUsage: "Wellness resort spas, outdoor covered balconies, hotel poolside cabanas, and boutique hotel guest room bedsides.",
    featured: false,
    isFeatured: false,
    isNew: false,
    tags: ["rope", "daybed", "charpai", "resort", "wellness", "lounge", "rosewood"]
  },
  {
    id: "ind-monsoon-armchair",
    title: "Monsoon Rattan Dining Armchair",
    name: "Monsoon Rattan Dining Armchair",
    slug: "monsoon-rattan-dining-armchair",
    category: "Cafe Furniture",
    subcategory: "Cafe Chairs",
    description: "A weather-treated rattan dining armchair designed for breezy, coastal hospitality spaces.",
    story: "Designed specifically to withstand coastal humidity with structural elegance. The Monsoon Armchair is built from heavy-gauge, steam-bent rattan frames hand-wrapped in weather-treated peel rattan weave. The seat is cushioned in outdoor-grade, water-repellent performance canvas.",
    designer: "SB Artisan Atelier",
    materials: ["Heavy-Gauge Cane", "Weather-treated Rattan Peel", "Water-repellent Performance Canvas"],
    dimensions: { height: 80, width: 58, depth: 56, unit: "cm" },
    finishes: ["Antique Warm Amber", "Weathered Driftwood Bark", "Muted Olive Stain"],
    price: "₹16,500",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80"
    ],
    hospitalityUsage: "Boutique bistro cafes, outdoor patio dining, resort juice bars, and covered pool terraces.",
    featured: false,
    isFeatured: false,
    isNew: false,
    tags: ["cafe", "armchair", "rattan", "dining", "patio", "coastal", "cane"]
  },
  {
    id: "ind-jaipur-bistro",
    title: "Jaipur Arch Bone Inlay Bistro Table",
    name: "Jaipur Arch Bone Inlay Bistro Table",
    slug: "jaipur-arch-bone-inlay-bistro-table",
    category: "Bone Inlay Furniture",
    subcategory: "Bone Inlay Coffee Tables",
    description: "An octagonal bistro table with chevron bone inlay and an architectural stepped base.",
    story: "A stunning, octagonal bistro table featuring geometric chevron-patterned bone inlay. The solid base, formed of repeating stepped arches, is inspired by the astronomical architecture of Jaipur's Jantar Mantar. It serves as a striking centerpiece for intimate meals or morning coffee.",
    designer: "Jaipur Crafts Guild",
    materials: ["Ethically Sourced Bone", "Black Resin Pigment", "Solid Mango Wood Core", "Weighted Steel Sub-base"],
    dimensions: { height: 76, width: 80, depth: 80, unit: "cm" },
    finishes: ["Jet Black Inlay", "Royal Indigo Inlay", "Terracotta Coral Inlay"],
    price: "₹38,000",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ],
    hospitalityUsage: "Boutique cafe dining tables, hotel lobby conversation spots, private suite dining alcoves.",
    featured: false,
    isFeatured: false,
    isNew: false,
    tags: ["table", "bistro", "cafe", "inlay", "dining", "jaipur", "bone"]
  },
  {
    id: "ind-varanasi-stool",
    title: "Varanasi Silk-Rope Barstool",
    name: "Varanasi Silk-Rope Barstool",
    slug: "varanasi-silk-rope-barstool",
    category: "Bar Furniture",
    subcategory: "Bar Stools",
    description: "A sleek barstool weaving high-tensile silk-blend cords with full-grain Indian leather.",
    story: "Weaving modern industrial design with local craft. High-tensile, silk-blend cords are hand-woven in an interlocking lattice pattern around a slender steel profile. Offers a supportive, ergonomic seat with subtle elasticity. Complete with a padded saddle in full-grain, oil-tanned Indian leather.",
    designer: "Margot Lhomme & Varanasi Weavers",
    materials: ["High-tensile Silk-blend Cord", "Powder-coated Stainless Steel Frame", "Full-grain Indian Saddle Leather"],
    dimensions: { height: 96, width: 46, depth: 46, unit: "cm" },
    finishes: ["Aged Brass PVD Base", "Matte Gunmetal Base", "Polished Stainless Steel"],
    price: "₹19,500",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
    ],
    hospitalityUsage: "Luxury hotel cocktail bars, rooftop lounge counters, and high-end hospitality cocktail clubs.",
    featured: false,
    isFeatured: false,
    isNew: false,
    tags: ["barstool", "bar", "seating", "rope", "leather", "modern", "silk"]
  },
  {
    id: "ind-thar-table",
    title: "Thar Teakwood Monolithic Coffee Table",
    name: "Thar Teakwood Monolithic Coffee Table",
    slug: "thar-teakwood-monolithic-coffee-table",
    category: "Hotel Furniture",
    subcategory: "Coffee Tables",
    description: "A grounding, monolithic coffee table carved from a single slab of desert teakwood.",
    story: "A heavy, grounding centerpiece carved from a single slab of seasoned desert teakwood. The table celebrates organic imperfections, showcasing deep cracks, wild grain contours, and hand-chiseled raw edges that embody the spirit of wabi-sabi. It stands on heavy solid teak columns with traditional wooden joinery.",
    designer: "Jodhpur Woodworking Atelier",
    materials: ["Aged Solid Teakwood Wood", "Traditional Wooden Joinery"],
    dimensions: { height: 36, width: 120, depth: 120, unit: "cm" },
    finishes: ["Smoked Shou Sugi Ban Charcoal", "Raw Honey Matte Lacquer", "Ancient Bleached Grey Wax"],
    price: "₹82,000",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80"
    ],
    hospitalityUsage: "Luxury hotel lobby centerpieces, executive resort lounges, VIP suite lounge areas.",
    featured: true,
    isFeatured: true,
    isNew: false,
    tags: ["table", "coffee table", "teak", "hotel", "lobby", "wabi sabi"]
  },
  {
    id: "ind-jodhpur-credenza",
    title: "Jodhpur Starry Night Bone Inlay Credenza",
    name: "Jodhpur Starry Night Bone Inlay Credenza",
    slug: "jodhpur-starry-night-bone-inlay-credenza",
    category: "Bone Inlay Furniture",
    subcategory: "Bone Inlay Sideboards",
    description: "A celestial-themed credenza featuring bone inlay motifs set in midnight indigo resin.",
    story: "An exceptional geometric credenza inspired by the clear night sky above Jodhpur's Mehrangarh Fort. Artisans inlay thousands of hand-cut bone stars and diamond shapes into deep indigo-tinted resin. Features slow-closing walnut wood doors and four solid brass legs.",
    designer: "Jodhpur Bone Inlay Atelier",
    materials: ["Ethically Sourced Bone", "Indigo Blue Resin", "Aged Walnut Cabinetry", "Solid Brass Legs"],
    dimensions: { height: 78, width: 160, depth: 45, unit: "cm" },
    finishes: ["Deep Indigo Royal Resin", "Jet Black Space Resin"],
    price: "₹1,45,000",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80"
    ],
    hospitalityUsage: "Hotel guest rooms, executive suite boardrooms, luxury lounge focal storage.",
    featured: true,
    isFeatured: true,
    isNew: false,
    tags: ["credenza", "cabinet", "bone inlay", "indigo", "jodhpur", "hotel", "bone"]
  },
  {
    id: "ind-nilgiri-table",
    title: "Nilgiri Forest Cane Coffee Table",
    name: "Nilgiri Forest Cane Coffee Table",
    slug: "nilgiri-forest-cane-coffee-table",
    category: "Cane Furniture",
    subcategory: "Cane Coffee Tables",
    description: "A double-tiered circular table combining green Indian marble, cane weave, and teak.",
    story: "A two-tiered circular coffee table showing organic texture. Constructed with a steam-bent plantation teak rim framing a tight hand-woven cane mesh shelf, beneath a circular plate of green-veined Indian marble. Designed to mimic the layered forest canopy of the Nilgiri hills.",
    designer: "SB Artisan Atelier",
    materials: ["Plantation Teakwood Frame", "Woven Cane Mesh", "Forest Green Indian Marble"],
    dimensions: { height: 40, width: 90, depth: 90, unit: "cm" },
    finishes: ["Natural Teak Finish", "Smoked Walnut Finish"],
    price: "₹34,000",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80"
    ],
    hospitalityUsage: "Resort tea lounges, boutique cafe waiting rooms, hotel guest room sitting spaces.",
    featured: false,
    isFeatured: false,
    isNew: false,
    tags: ["table", "coffee table", "cane", "marble", "resort", "nilgiri"]
  },
  {
    id: "ind-maharaja-dining",
    title: "Maharaja Oval Sheesham Dining Table",
    name: "Maharaja Oval Sheesham Dining Table",
    slug: "maharaja-oval-sheesham-dining-table",
    category: "Restaurant Furniture",
    subcategory: "Restaurant Tables",
    description: "An expansive oval dining table sculpted from solid Indian Rosewood with elegant brass inlay strips.",
    story: "Taking inspiration from the banqueting halls of Udaipur palaces, this grand dining table is crafted from sustainably harvested solid Indian Rosewood (Sheesham). Its top showcases deep, interlocking grains accented by thin hand-beaten brass strip details, supported by two sculptural fluted wood columns. A grounding centerpiece for upscale hotel private dining rooms.",
    designer: "Udaipur Woodworking Atelier",
    materials: ["Solid Sheesham Wood", "Brushed Brass Inlays", "Weighted Iron Core"],
    dimensions: { height: 76, width: 240, depth: 110, unit: "cm" },
    finishes: ["Warm Walnut Wax", "Deep Honey Lacquer", "Ebonized Matte Oil"],
    price: "₹95,000",
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80"
    ],
    hospitalityUsage: "Boutique hotel private dining suites, luxury vineyard tasting halls, and executive boardrooms.",
    featured: true,
    isFeatured: true,
    isNew: true,
    tags: ["table", "dining table", "sheesham", "brass", "restaurant", "palace"]
  },
  {
    id: "ind-breeze-armchair",
    title: "Malabar Coastal Cane Easy Chair",
    name: "Malabar Coastal Cane Easy Chair",
    slug: "malabar-coastal-cane-easy-chair",
    category: "Cane Furniture",
    subcategory: "Cane Chairs",
    description: "A low-slung, reclining lounge chair weaving blonde Malabar cane onto a plantation teak frame.",
    story: "Designed for breezy coastal luxury, the Malabar Easy Chair features a low-profile reclining angle. Artisans hand-split blonde cane into fine strips and weave them in a traditional open star pattern across the seat and back, providing cool ventilation. The frame is sculpted from weather-resistant plantation teak with soft rounded armrests.",
    designer: "SB Artisan Atelier",
    materials: ["Plantation Teakwood", "Natural Malabar Cane", "Brass Pivot Screws"],
    dimensions: { height: 70, width: 68, depth: 78, unit: "cm" },
    finishes: ["Natural Blonde Finish", "Sun-bleached Driftwood", "Warm Teak Oil"],
    price: "₹26,500",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80"
    ],
    hospitalityUsage: "Boutique resort room balconies, coastal verandas, and luxury hotel spa waiting rooms.",
    featured: false,
    isFeatured: false,
    isNew: true,
    tags: ["lounge", "chair", "cane", "teak", "coastal", "resort"]
  },
  {
    id: "ind-coromandel-bench",
    title: "Coromandel Hand-woven Rope Bench",
    name: "Coromandel Hand-woven Rope Bench",
    slug: "coromandel-hand-woven-rope-bench",
    category: "Rope Furniture",
    subcategory: "Rope Benches",
    description: "An elegant dining bench featuring organic jute cords hand-tensioned in a basket-weave grid.",
    story: "Handcrafted along the Coromandel coast, this bench features high-tensile, organic jute cords dyed in warm earth tones and hand-tensioned over a solid rosewood frame. The geometric basket-weave grid provides flexible structural support, making it a comfortable dining or hallway option for modern rustic hospitality interiors.",
    designer: "Kerala Craft Conservatory",
    materials: ["Solid Indian Rosewood", "Dyed Organic Jute Rope", "Brass Joinery Pins"],
    dimensions: { height: 46, width: 140, depth: 40, unit: "cm" },
    finishes: ["Natural Rosewood Matte Wax", "Ebonized Polish"],
    price: "₹29,500",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80"
    ],
    hospitalityUsage: "Bistro cafe group dining, boutique hotel entryways, and resort room bed ends.",
    featured: false,
    isFeatured: false,
    isNew: false,
    tags: ["bench", "rope", "jute", "dining", "seating", "coromandel", "rosewood"]
  },
  {
    id: "ind-monsoon-cafe-table",
    title: "Artisan Reclaimed Teak Cafe Table",
    name: "Artisan Reclaimed Teak Cafe Table",
    slug: "artisan-reclaimed-teak-cafe-table",
    category: "Cafe Furniture",
    subcategory: "Cafe Tables",
    description: "A compact square bistro table crafted from seasoned reclaimed teakwood with a fluted cast-iron base.",
    story: "Designed for intimate hospitality dining, this square cafe table is crafted from rustic planks of century-old reclaimed teakwood. The wood is hand-scrubbed to expose the seasoned charcoal and golden grains, then finished with a food-safe matte wax. Supported by a heavy, traditional fluted cast-iron pedestal base.",
    designer: "Jodhpur Woodworking Atelier",
    materials: ["Reclaimed Teakwood", "Cast-Iron Base", "Brass Edge Brackets"],
    dimensions: { height: 75, width: 75, depth: 75, unit: "cm" },
    finishes: ["Seasoned Natural Wax", "Smoked Shou Sugi Ban"],
    price: "₹21,000",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ],
    hospitalityUsage: "Boutique cafe dining, hotel bar terraces, and resort cocktail verandas.",
    featured: true,
    isFeatured: true,
    isNew: false,
    tags: ["table", "cafe", "bistro", "teak", "reclaimed", "cast iron"]
  },
  {
    id: "ind-palace-cabinet",
    title: "Heritage Brass-Repoussé Bar Cabinet",
    name: "Heritage Brass-Repoussé Bar Cabinet",
    slug: "heritage-brass-repousse-bar-cabinet",
    category: "Bar Furniture",
    subcategory: "Bar Tables",
    description: "An opulent bar cabinet clad in hand-beaten repoussé brass sheets over solid teak.",
    story: "A show-stopping heritage design statement. Jodhpur metal-smiths spend weeks hand-hammering intricate paisley and leaf motifs into sheets of solid brass. These sheets are then wrapped and pinned with brass studs over a heavy teakwood cabinet core. Inside, the bar features mirrored backing panels, warm LED lighting, glass racks, and velvet drawers.",
    designer: "Jodhpur Metal-Smith Atelier",
    materials: ["Solid Brass Sheets", "Solid Teakwood Core", "Tempered Mirrored Glass", "Velvet Lining"],
    dimensions: { height: 135, width: 85, depth: 45, unit: "cm" },
    finishes: ["Antiqued Burnished Brass", "Polished Gold Brass", "Aged Silver-Plated Nickel"],
    price: "₹1,35,000",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80"
    ],
    hospitalityUsage: "Boutique hotel suites as a signature minibar, private wine tasting rooms, and hotel lounges.",
    featured: true,
    isFeatured: true,
    isNew: true,
    tags: ["cabinet", "bar", "brass", "repousse", "luxury", "teak", "heritage"]
  },
  {
    id: "ind-mehrangarh-console",
    title: "Mehrangarh Carved Teak Lobby Console",
    name: "Mehrangarh Carved Teak Lobby Console",
    slug: "mehrangarh-carved-teak-lobby-console",
    category: "Hotel Furniture",
    subcategory: "Bedside Tables",
    description: "A grand carved teakwood console featuring intricate Mughal arch lattice work.",
    story: "Perfect for hotel lobbies and entry corridors, this grand console is hand-carved by master woodworkers in Rajasthan. The front panel features a repeating series of fluted Mughal arches with open lattice carvings (Jali), providing structural shadow details. Supported by four heavy carved cabriole legs from seasoned plantation teak.",
    designer: "Jaipur Crafts Guild",
    materials: ["Plantation Teakwood", "Brass Handle Accents"],
    dimensions: { height: 85, width: 180, depth: 50, unit: "cm" },
    finishes: ["Natural Teak Matte Wax", "Honey Amber Polish", "Ebonized Charcoal Matte"],
    price: "₹88,000",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80"
    ],
    hospitalityUsage: "Hotel lobby check-in backdrops, resort corridors, and luxury suite entry foyers.",
    featured: false,
    isFeatured: false,
    isNew: false,
    tags: ["console", "table", "lobby", "carved", "teak", "jaipur", "heritage"]
  },
  {
    id: "ind-mughal-side",
    title: "Mughal Octagonal Floral Bone Inlay Table",
    name: "Mughal Octagonal Floral Bone Inlay Table",
    slug: "mughal-octagonal-floral-bone-inlay-table",
    category: "Bone Inlay Furniture",
    subcategory: "Bone Inlay Side Tables",
    description: "An octagonal accent table featuring floral bone inlay detailing set in olive green resin.",
    story: "A delicate, octagonal side table showcasing the zenith of floral bone inlay craft. Jodhpur artisans carve leaf and petal bone tiles, setting them in custom hand-tinted olive green resin. The table stands on an octagonal pillar with matching geometric chevron columns, creating an elegant bedside or seating companion.",
    designer: "Jodhpur Bone Inlay Atelier",
    materials: ["Ethically Sourced Camel Bone", "Olive Green Resin", "Solid Mango Wood Core"],
    dimensions: { height: 50, width: 45, depth: 45, unit: "cm" },
    finishes: ["Olive Green Resin", "Emerald Resin", "Blush Pink Resin", "Jet Black Resin"],
    price: "₹24,500",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80"
    ],
    hospitalityUsage: "Hotel guest room bedside tables, resort lounge seating side tables, spa relaxing alcoves.",
    featured: false,
    isFeatured: false,
    isNew: true,
    tags: ["table", "side table", "inlay", "bone", "olive", "mughal", "jodhpur"]
  },
  {
    id: "ind-royal-mirror",
    title: "Rajputana Chevron Bone Inlay Wall Mirror",
    name: "Rajputana Chevron Bone Inlay Wall Mirror",
    slug: "rajputana-chevron-bone-inlay-wall-mirror",
    category: "Bone Inlay Furniture",
    subcategory: "Bone Inlay Storage Cabinets",
    description: "A wide, rectangular wall mirror with a hand-laid geometric bone inlay frame.",
    story: "Designed to reflect light and heritage luxury, this mirror features a wide solid mango wood frame wrapped in a hand-laid chevron pattern of ethically-sourced bone tiles. The contrast of bone against natural dyed black resin frame creates a majestic architectural depth on masonry surfaces.",
    designer: "Jaipur Crafts Guild",
    materials: ["Ethically Sourced Bone", "Black Resin Pigment", "Premium Mirrored Glass", "Mango Wood Frame"],
    dimensions: { height: 120, width: 80, depth: 4, unit: "cm" },
    finishes: ["Jet Black Resin", "Onyx Charcoal Resin", "Deep Indigo Resin"],
    price: "₹16,500",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
    ],
    hospitalityUsage: "Hotel guest room dressers, resort spa bathroom vanities, and restaurant lobby restrooms.",
    featured: false,
    isFeatured: false,
    isNew: false,
    tags: ["mirror", "inlay", "bone", "chevron", "accessories", "jaipur"]
  }
];

// ----------------------------------------------------
// 2. MOCK COLLECTIONS
// ----------------------------------------------------
export const MOCK_COLLECTIONS: HospitalityCollection[] = [
  {
    id: "coll-haveli",
    name: "The Shekhawati Haveli Series",
    slug: "shekhawati-haveli-series",
    tagline: "Heritage Reclaimed Teakwood Dining",
    description: "Reconstructed dining and lounge seating crafted from reclaimed architectural timbers from Rajasthan's historic havelis.",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=90",
    featured: true
  },
  {
    id: "coll-nilgiri",
    name: "The Nilgiri Canopy Collection",
    slug: "nilgiri-canopy-collection",
    tagline: "Resort-Inspired Wet-Bent Cane & Rope Work",
    description: "Breezy, lightweight, and incredibly durable lounge statements combining green Indian marbles and wet-bent cane weaves.",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=90",
    featured: true
  },
  {
    id: "coll-raj",
    name: "The Raj Gharana Suites",
    slug: "raj-gharana-suites",
    tagline: "Royal Jodhpur Bone Inlay Casegoods",
    description: "Intricately detailed bar cabinets, credenzas, and bistro tables handcrafted tile-by-tile in custom organic resin colors.",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=90",
    featured: false
  }
];

// ----------------------------------------------------
// 3. REAL API CONNECTION & MAPPER
// ----------------------------------------------------
const API_BASE = "http://localhost:5000/api";

export function mapBackendProductToHospitality(p: any): HospitalityProduct {
  const staticProd = INDIAN_HOSPITALITY_PRODUCTS.find((sp) => sp.slug === p.slug);
  const materials = p.material ? p.material.split(", ") : (staticProd?.materials || []);
  
  let dimensions = staticProd?.dimensions || { height: 0, width: 0, depth: 0, unit: "cm" };
  if (p.dimensions && !staticProd) {
    const match = p.dimensions.match(/(\d+)\s*x\s*(\d+)\s*x\s*(\d+)\s*(cm|in)/i);
    if (match) {
      dimensions = {
        height: parseFloat(match[1]),
        width: parseFloat(match[2]),
        depth: parseFloat(match[3]),
        unit: match[4].toLowerCase() === "in" ? "in" : "cm"
      };
    }
  }

  let imageGallery: string[] = [];
  if (p.images && p.images.length > 0) {
    imageGallery = p.images.map((img: any) => img.image_url);
  } else if (staticProd?.imageGallery) {
    imageGallery = staticProd.imageGallery;
  } else if (p.primary_image) {
    imageGallery = [p.primary_image];
  }

  return {
    id: p.id.toString(),
    title: p.name,
    name: p.name,
    slug: p.slug,
    category: p.category_name || staticProd?.category || "",
    subcategory: p.subcategory_name || staticProd?.subcategory || "",
    category_id: p.category_id,
    subcategory_id: p.subcategory_id,
    description: p.description,
    story: staticProd?.story || p.description,
    designer: staticProd?.designer || "Jodhpur Atelier",
    materials,
    dimensions,
    finishes: staticProd?.finishes || ["Natural Aged Teak Wax", "Smoked Charcoal Matte Oil"],
    price: p.price ? `₹${parseFloat(p.price).toLocaleString("en-IN")}` : staticProd?.price,
    image: p.primary_image || staticProd?.image || imageGallery[0] || "",
    imageGallery,
    hospitalityUsage: staticProd?.hospitalityUsage || "High-end hospitality spaces.",
    featured: !!p.featured,
    isFeatured: !!p.featured,
    isNew: staticProd?.isNew || false,
    tags: staticProd?.tags || [p.slug]
  };
}

export async function fetchProducts(filters?: ProductFilters): Promise<HospitalityProduct[]> {
  try {
    const url = new URL(`${API_BASE}/products`);
    if (filters) {
      if (filters.category && filters.category.toLowerCase() !== "all") {
        url.searchParams.append("category", filters.category);
      }
      if (filters.query) {
        url.searchParams.append("search", filters.query);
      }
      if (filters.featuredOnly) {
        url.searchParams.append("featured", "true");
      }
    }

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data.map(mapBackendProductToHospitality);
    }
    return [];
  } catch (error) {
    console.error("fetchProducts error:", error);
    throw error;
  }
}

export async function fetchProductById(id: string): Promise<HospitalityProduct | undefined> {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) {
      if (res.status === 404) return undefined;
      throw new Error(`HTTP Error: ${res.status}`);
    }
    const json = await res.json();
    if (json.success && json.data) {
      return mapBackendProductToHospitality(json.data);
    }
    return undefined;
  } catch (error) {
    console.error(`fetchProductById(${id}) error:`, error);
    throw error;
  }
}

export async function fetchProductBySlug(slug: string): Promise<HospitalityProduct | undefined> {
  return fetchProductById(slug); // backend controller routes both slug and ID through the same endpoint /api/products/:slugOrId
}

export async function fetchFeaturedProducts(): Promise<HospitalityProduct[]> {
  return fetchProducts({ featuredOnly: true });
}

export async function fetchCollections(): Promise<HospitalityCollection[]> {
  try {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data.map((c: any) => {
        // Merge with static collections details if matching slug
        const staticColl = MOCK_COLLECTIONS.find((mc) => mc.slug === c.slug);
        return {
          id: c.id.toString(),
          name: c.name,
          slug: c.slug,
          tagline: staticColl?.tagline || `${c.name} Sourcing`,
          description: c.description,
          image: staticColl?.image || "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
          featured: staticColl?.featured || false
        };
      });
    }
    return MOCK_COLLECTIONS;
  } catch (error) {
    console.error("fetchCollections error:", error);
    return MOCK_COLLECTIONS;
  }
}


// ----------------------------------------------------
// 4. CLIENT SIDE FILTERING AND UTILITIES
// ----------------------------------------------------
export function getUniqueCategories(products: HospitalityProduct[] = INDIAN_HOSPITALITY_PRODUCTS): string[] {
  const categories = products.map((p) => p.category);
  return Array.from(new Set(categories));
}

export function getUniqueTags(products: HospitalityProduct[] = INDIAN_HOSPITALITY_PRODUCTS): string[] {
  const tags = products.flatMap((p) => p.tags);
  return Array.from(new Set(tags));
}

export function getUniqueMaterials(products: HospitalityProduct[] = INDIAN_HOSPITALITY_PRODUCTS): string[] {
  const materials = products.flatMap((p) => p.materials);
  return Array.from(new Set(materials));
}
