# Premium Luxury UI Component Suite

A reusable, highly-customizable layout, typography, buttons, and navigation system crafted specifically for luxury, high-end e-commerce and editorial interfaces. Designed using **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **Framer Motion** to support dynamic and polymorphic semantics with clean visual spacing.

---

## Design Systems

### 1. Typography & Spacing System
Luxury design relies on scale, breathing room, and asymmetry.
- **Headings (Playfair Display Serif Style)**: Serifs (`font-serif`) that use light weights, tight tracking in display/hero modes, and generous line-heights.
- **Body Copy (Inter Sans Style)**: High-legibility sans-serifs (`font-sans`) featuring generous line-heights (`leading-loose` or `leading-relaxed`) and light weights.
- **Micro-Copy**: Small uppercase layouts with heavy letter-spacing (`tracking-[0.25em]`).
- **Airy Gutters**: Mobile layouts begin at `px-6` (24px). Desktop layouts scale up to `xl:px-32` (128px) margins.

### 2. Reusable Button System
Minimalist interactive controls free of startup gradients and heavy shadows:
- **PrimaryButton**: Deep solid charcoal layout (`#1A1A1A`) transitioning to lighter warm charcoal.
- **SecondaryButton**: Outlined layout (`#C5BFB2`) with an elegant full background fade into charcoal on hover.
- **TextButton**: Inline link styling with a custom bottom underline expansion sliding from left-to-right on hover.
- **IconButton**: Outlined circular layout for centering fine-line iconography.

### 3. Navigation System (App Router Compatible)
An interactive fixed header navigation system integrating Framer Motion for smooth transitions:
- **Navbar**: Sticky header featuring transparency at scroll Y=0 and sliding transition to bone white background (`bg-[#FDFCF7]`) with bottom borders on scroll. Uses hover delays (200ms grace period) to prevent flickering.
- **MegaMenu**: Generous full-width menu columns with promo banner cards. Uses custom cubic-bezier entry transitions.
- **MobileMenu**: Full-screen slide-out panel with smooth accordion submenus.
- **SearchButton**: Expanding search input expanding with custom slide width indicators.

---

## File Structure

```text
luxury-furniture-container/
├── components/
│   ├── ui/
│   │   ├── Container.tsx      # Polymorphic responsive container
│   │   ├── Heading.tsx        # Polymorphic Heading component (serif)
│   │   ├── SubHeading.tsx     # Polymorphic SubHeading component (caps/editorial)
│   │   ├── Paragraph.tsx      # Polymorphic Paragraph component (sans)
│   │   ├── SectionTitle.tsx   # Composite Section Title layout
│   │   ├── PrimaryButton.tsx  # Solid luxury action button
│   │   ├── SecondaryButton.tsx# Outlined luxury action button
│   │   ├── TextButton.tsx     # Custom underline sliding link button
│   │   ├── IconButton.tsx     # Circular icon button
│   │   └── index.ts           # UI exports
│   ├── navigation/
│   │   ├── navbar.tsx         # Sticky fixed navigation bar
│   │   ├── mega-menu.tsx      # Framer Motion mega menu columns overlay
│   │   ├── mobile-menu.tsx    # Slide-out drawer menu with accordions
│   │   ├── nav-link.tsx       # Navigation link with Framer Motion underline
│   │   ├── nav-data.ts        # Typed category lists & promo data configs
│   │   ├── search-button.tsx  # Expanding search action
│   │   └── index.ts           # Navigation exports
│   └── ExampleUsage.tsx       # Demo showcasing all elements in action
├── lib/
│   └── utils.ts               # cn() class utility using clsx + tailwind-merge
├── package.json               # Workspace metadata and dependencies
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Documentation (this file)
```

---

## API Specifications (Navigation System)

### 1. Navigation Data Schema (`components/navigation/nav-data.ts`)
```typescript
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
```

---

## Integration Guide

Import the `Navbar` component and mount it at the top of your layout structure:

```tsx
import { Navbar } from "@/components/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {/* Add top padding offsets to clear the fixed navbar height */}
        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}
```
