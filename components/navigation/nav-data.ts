export interface NavLinkItem {
  label: string;
  href: string;
}

export interface MegaMenuColumn {
  title: string;
  items: NavLinkItem[];
}

export interface MegaMenuPromo {
  image: string;
  title: string;
  href: string;
  linkText: string;
}

export interface MegaMenuConfig {
  columns: MegaMenuColumn[];
  promo?: MegaMenuPromo;
}

export interface NavItem {
  label: string;
  href?: string;
  megaMenu?: MegaMenuConfig;
}

// Professional B2B export navigation data registry
export const NAVIGATION_DATA: NavItem[] = [
  {
    label: "Hospitality Range",
    href: "/collections",
    megaMenu: {
      columns: [
        {
          title: "Restaurant Furniture",
          items: [
            { label: "All Restaurant Furniture", href: "/category/restaurant-furniture" },
            { label: "Dining Seating", href: "/category/restaurant-furniture?sub=seating" },
            { label: "Dining Tables", href: "/category/restaurant-furniture?sub=tables" },
          ],
        },
        {
          title: "Café Furniture",
          items: [
            { label: "All Café Furniture", href: "/category/cafe-furniture" },
            { label: "Cafe Seating", href: "/category/cafe-furniture?sub=seating" },
            { label: "Bistro Tables", href: "/category/cafe-furniture?sub=tables" },
          ],
        },
        {
          title: "Bar Furniture",
          items: [
            { label: "All Bar Furniture", href: "/category/bar-furniture" },
            { label: "Bar Seating", href: "/category/bar-furniture?sub=seating" },
            { label: "Bar Cabinets", href: "/category/bar-furniture?sub=cabinet" },
          ],
        },
        {
          title: "Hotel Furniture",
          items: [
            { label: "All Hotel Furniture", href: "/category/hotel-furniture" },
            { label: "Lobby Consoles", href: "/category/hotel-furniture?sub=cabinet" },
            { label: "Suite Sanctuary", href: "/category/hotel-furniture?sub=lounge" },
            { label: "Lobby Tables", href: "/category/hotel-furniture?sub=table" },
          ],
        },
      ],
      promo: {
        image: "/images/hotel_lobby_furniture.png",
        title: "Bespoke Hotel & Resort Volume Programs",
        href: "/bespoke-services",
        linkText: "Request Hospitality Catalog",
      },
    },
  },
  {
    label: "Material & Craft",
    href: "/collections",
    megaMenu: {
      columns: [
        {
          title: "Cane Furniture",
          items: [
            { label: "All Cane Furniture", href: "/category/cane-furniture" },
            { label: "Lounge Loungers", href: "/category/cane-furniture?sub=lounge" },
            { label: "Cane Tables", href: "/category/cane-furniture?sub=table" },
          ],
        },
        {
          title: "Bone Inlay Furniture",
          items: [
            { label: "All Bone Inlay Furniture", href: "/category/bone-inlay-furniture" },
            { label: "Cabinets & Storage", href: "/category/bone-inlay-furniture?sub=cabinet" },
            { label: "Bistro & Accent Tables", href: "/category/bone-inlay-furniture?sub=table" },
            { label: "Wall Mirror Frames", href: "/category/bone-inlay-furniture?sub=accessories" },
          ],
        },
        {
          title: "Rope Furniture",
          items: [
            { label: "All Rope Furniture", href: "/category/rope-furniture" },
            { label: "Daybeds & Benches", href: "/category/rope-furniture?sub=daybed" },
            { label: "Dining Benches", href: "/category/rope-furniture?sub=bench" },
          ],
        },
      ],
      promo: {
        image: "/images/commercial_workshop_custom.png",
        title: "Ethical Sourcing & Heritage Joinery Showcase",
        href: "/our-story",
        linkText: "Discover Our Story",
      },
    },
  },
  {
    label: "Bespoke Trade",
    href: "/bespoke-services",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Our Story",
    href: "/our-story",
  },
  {
    label: "Journal",
    href: "/journal",
  },
  {
    label: "Contact Desk",
    href: "/contact",
  },
  {
    label: "Admin Panel",
    href: "/admin",
  },
];
