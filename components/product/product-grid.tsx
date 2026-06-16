import React from "react";
import { cn } from "../../lib/utils";
import { Product } from "./product-data";
import ProductCard from "./product-card";

interface ProductGridProps {
  products: Product[];
  variant?: "editorial" | "minimal" | "landscape";
  columns?: 2 | 3 | 4;
  isLoading?: boolean;
  loadingCount?: number;
  wishlistedIds?: string[];
  onInquire?: (id: string) => void;
  onTearSheet?: (id: string) => void;
  onWishlistToggle?: (id: string) => void;
  aspectRatio?: "portrait" | "square" | "landscape";
  className?: string;
}

export default function ProductGrid({
  products,
  variant = "editorial",
  columns = 3,
  isLoading = false,
  loadingCount = 6,
  wishlistedIds = [],
  onInquire,
  onTearSheet,
  onWishlistToggle,
  aspectRatio = "portrait",
  className,
}: ProductGridProps) {
  
  // Responsive grid spacing classes tailored for high-end showcases
  const gridColsClass = {
    2: "grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12",
  }[columns];

  const layoutClass =
    variant === "landscape"
      ? "flex flex-col gap-12 lg:gap-16"
      : cn("grid", gridColsClass);

  // 1. SKELETON GRID STATE
  if (isLoading) {
    const dummyArray = Array.from({ length: loadingCount });
    return (
      <div className={cn(layoutClass, className)}>
        {dummyArray.map((_, index) => (
          <ProductCard
            key={`skeleton-${index}`}
            product={{} as Product}
            variant={variant}
            aspectRatio={aspectRatio}
            isLoading={true}
          />
        ))}
      </div>
    );
  }

  // 2. MOCK EMPTY STATE (RESTRAINED)
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <p className="font-serif text-lg font-light text-[#8C8273]">No Objects Found</p>
        <p className="font-sans text-xs text-[#9E9B95] font-light max-w-xs">
          Our current inventory is cataloged. Please check back for private exhibition changes.
        </p>
      </div>
    );
  }

  // 3. MAIN PRODUCT GRID RENDER
  return (
    <div className={cn(layoutClass, className)}>
      {products.map((product) => {
        const isWishlisted = wishlistedIds.includes(product.id);
        
        return (
          <ProductCard
            key={product.id}
            product={product}
            variant={variant}
            aspectRatio={aspectRatio}
            isWishlisted={isWishlisted}
            onInquire={onInquire}
            onTearSheet={onTearSheet}
            onWishlistToggle={onWishlistToggle}
          />
        );
      })}
    </div>
  );
}
export type { ProductGridProps };
