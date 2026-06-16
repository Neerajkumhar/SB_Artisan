export interface Product {
  id: string;
  name: string;
  designer: string;
  category: string;
  description: string;
  price?: string;
  image: string;
  isNew?: boolean;
  isFeatured?: boolean;
  materials?: string[];
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Jodhpur Sandstone Console",
    designer: "SB Artisan Atelier",
    category: "Stone Surfaces",
    description: "Monolithic console meticulously hand-carved from seasoned Thar desert sandstone, showcasing traditional arch motifs and raw, hand-finished detailing.",
    price: "₹88,500",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    materials: ["Jodhpur Sandstone", "Brushed Brass Dowels"],
  },
  {
    id: "prod-2",
    name: "Khadi Weave Lounge Chair",
    designer: "SB Artisan Atelier",
    category: "Lounge Seating",
    description: "Organic, sculptural silhouette upholstered in premium hand-loomed organic cotton Khadi weave. Exceptional structural comfort meets heritage craftsmanship.",
    price: "₹58,000",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80",
    isNew: true,
    materials: ["Khadi Cotton Weave", "Solid Sheesham Wood Legs"],
  },
  {
    id: "prod-3",
    name: "Jaipur Hammered Brass Pendant",
    designer: "SB Artisan Atelier",
    category: "Atelier Lighting",
    description: "Hand-hammered Indian brass dome suspended by a fine-gauge wire. Offers a warm, diffused golden glow with unique hammer marks in every piece.",
    price: "₹35,500",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    isNew: true,
    materials: ["Jaipur Hammered Brass", "Brushed Brass Hardware"],
  },
  {
    id: "prod-4",
    name: "Malabar Cotton Sanctuary Daybed",
    designer: "SB Artisan Atelier",
    category: "Seating",
    description: "Low-slung solid Sheesham frame carrying a double-layered mattress upholstered in custom weave unbleached organic Malabar cotton.",
    price: "₹1,12,000",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    materials: ["Solid Sheesham Wood", "Malabar Cotton Canvas"],
  },
  {
    id: "prod-5",
    name: "Kuro Charcoal Mango Sideboard",
    designer: "SB Artisan Atelier",
    category: "Surfaces",
    description: "Minimalist mango wood credenza finished in a deep matte charcoal oil. Features hand-planed sliding panel doors and concealed brass joints.",
    price: "₹98,000",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    materials: ["Solid Mango Wood", "Brass Hinges"],
  },
  {
    id: "prod-6",
    name: "Hammered Brass Wall Sconce",
    designer: "SB Artisan Atelier",
    category: "Atelier Lighting",
    description: "A half-cylinder of hand-beaten brass backed by warm LED elements, producing a sophisticated architectural wash on masonry surfaces.",
    price: "₹22,500",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    materials: ["Jaipur Hammered Brass", "Aged Bronze Support"],
  },
];
