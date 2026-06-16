import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Product } from "../product/product-data";
import ProductGrid from "../product/product-grid";
import { Container, SectionTitle } from "../ui";
import TextButton from "../ui/TextButton";

interface BestSellersProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
  wishlistedIds?: string[];
  onInquire?: (id: string) => void;
  onTearSheet?: (id: string) => void;
  onWishlistToggle?: (id: string) => void;
  className?: string;
}

export default function BestSellers({
  products,
  title = "Acclaimed Objects",
  subtitle = "Our Best Sellers",
  isLoading = false,
  wishlistedIds = [],
  onInquire,
  onTearSheet,
  onWishlistToggle,
  className,
}: BestSellersProps) {
  
  // Custom spring arrow for catalog redirection links
  const ArrowRight = () => (
    <svg className="w-3.5 h-3.5 transition-transform duration-300" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 8h14M10 3l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // Take the first 3 products to showcase on the home layout by default if products is list
  const showcaseProducts = products.slice(0, 3);

  return (
    <section className={cn("py-28 bg-[#FDFCF7] border-t border-[#F2EDE2]", className)}>
      <Container variant="default" className="space-y-16">
        
        {/* Header containing a redirection link */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-4 border-b border-[#F2EDE2]">
          <SectionTitle
            eyebrow={subtitle}
            title={title}
            description="Our most sought-after furniture commissions, crafted by master artisans."
            spacing="compact"
            titleProps={{ variant: "xl", weight: "light" }}
            descriptionProps={{ variant: "sm" }}
            className="md:max-w-xl"
          />

          <div className="shrink-0 pt-2">
            <TextButton
              as={Link}
              to="/collections"
              size="sm"
              rightIcon={<ArrowRight />}
            >
              View Full Collection
            </TextButton>
          </div>
        </div>

        {/* Product Grid implementation */}
        <ProductGrid
          products={showcaseProducts}
          variant="editorial"
          columns={3}
          isLoading={isLoading}
          wishlistedIds={wishlistedIds}
          onInquire={onInquire}
          onTearSheet={onTearSheet}
          onWishlistToggle={onWishlistToggle}
        />

      </Container>
    </section>
  );
}
export type { BestSellersProps };
