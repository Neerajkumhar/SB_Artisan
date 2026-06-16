import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { Product } from "./product-data";
import ProductImage from "./product-image";
import ProductInfo from "./product-info";
import ProductActions from "./product-actions";

interface ProductCardProps {
  product: Product;
  variant?: "editorial" | "minimal" | "landscape";
  aspectRatio?: "portrait" | "square" | "landscape";
  isLoading?: boolean;
  isWishlisted?: boolean;
  onInquire?: (id: string) => void;
  onWhatsApp?: (id: string) => void;
  onTearSheet?: (id: string) => void;
  onWishlistToggle?: (id: string) => void;
  className?: string;
}

export default function ProductCard({
  product,
  variant = "editorial",
  aspectRatio = "portrait",
  isLoading = false,
  isWishlisted = false,
  onInquire,
  onWhatsApp,
  onTearSheet,
  onWishlistToggle,
  className,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Wrap callbacks to pass the product ID back up
  const handleInquire = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onInquire) onInquire(product.id);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onWhatsApp) {
      onWhatsApp(product.id);
    } else {
      const text = encodeURIComponent(
        `Hello SB Artisan, I would like to seek a trade pricing quote for the "${product.name}" (${product.category}) for an upcoming hospitality project.`
      );
      window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
    }
  };

  const handleTearSheet = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onTearSheet) onTearSheet(product.id);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onWishlistToggle) onWishlistToggle(product.id);
  };

  // 1. SKELETON LOADER CONTAINER
  if (isLoading) {
    return (
      <div
        className={cn(
          "space-y-6",
          variant === "landscape" && "grid grid-cols-1 md:grid-cols-12 gap-8 items-center space-y-0",
          className
        )}
      >
        <div className={cn(variant === "landscape" && "md:col-span-5")}>
          <ProductImage
            src=""
            alt=""
            aspectRatio={aspectRatio}
            isLoading={true}
          />
        </div>
        <div className={cn(variant === "landscape" && "md:col-span-7")}>
          <ProductInfo
            title=""
            category=""
            isLoading={true}
          />
          <ProductActions isLoading={true} className="mt-4" />
        </div>
      </div>
    );
  }

  // 2. LANDSCAPE VARIANT (HORIZONTAL ROW)
  if (variant === "landscape") {
    return (
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center group/card py-6 border-b border-[#F2EDE2]/60 last:border-b-0",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="md:col-span-5 overflow-hidden">
          <ProductImage
            src={product.image}
            alt={product.name}
            aspectRatio={aspectRatio}
            isNew={product.isNew}
            isFeatured={product.isFeatured}
            isWishlisted={isWishlisted}
            onWishlistToggle={onWishlistToggle ? handleWishlistToggle : undefined}
            isHovered={isHovered}
          />
        </div>
        
        <div className="md:col-span-7 space-y-4 lg:space-y-6">
          <ProductInfo
            title={product.name}
            category={product.category}
            designer={product.designer}
            description={product.description}
            price={product.price}
          />
          
          <ProductActions
            onInquire={onInquire ? handleInquire : undefined}
            onWhatsApp={handleWhatsApp}
            onTearSheet={onTearSheet ? handleTearSheet : undefined}
          />
        </div>
      </div>
    );
  }

  // 3. EDITORIAL VARIANT (STANDARD VERTICAL PORTRAIT STACK)
  if (variant === "editorial") {
    return (
      <div
        className={cn("space-y-5 md:space-y-6 group/card", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ProductImage
          src={product.image}
          alt={product.name}
          aspectRatio={aspectRatio}
          isNew={product.isNew}
          isFeatured={product.isFeatured}
          isWishlisted={isWishlisted}
          onWishlistToggle={onWishlistToggle ? handleWishlistToggle : undefined}
          isHovered={isHovered}
        />

        <div className="space-y-4">
          <ProductInfo
            title={product.name}
            category={product.category}
            designer={product.designer}
            description={product.description}
            price={product.price}
          />

          <ProductActions
            onInquire={onInquire ? handleInquire : undefined}
            onWhatsApp={handleWhatsApp}
            onTearSheet={onTearSheet ? handleTearSheet : undefined}
          />
        </div>
      </div>
    );
  }

  // 4. MINIMAL VARIANT (ESSENTIAL METADATA WITH HOVER REVEALS)
  return (
    <div
      className={cn("relative group/card", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ProductImage
        src={product.image}
        alt={product.name}
        aspectRatio={aspectRatio}
        isNew={product.isNew}
        isFeatured={product.isFeatured}
        isWishlisted={isWishlisted}
        onWishlistToggle={onWishlistToggle ? handleWishlistToggle : undefined}
        isHovered={isHovered}
      />

      <div className="mt-4 flex justify-between items-start gap-4">
        <div className="space-y-1">
          <span className="block text-[9px] tracking-[0.2em] font-sans text-[#8C8273] uppercase font-light">
            {product.category}
          </span>
          <h3 className="font-serif text-base font-light text-[#1A1A1A]">
            {product.name}
          </h3>
        </div>
        {product.price && (
          <div className="font-sans text-right shrink-0 select-none">
            <span className="block text-[8px] uppercase tracking-widest text-[#8C8273] font-semibold leading-none">Est. Trade Rate</span>
            <span className="text-xs text-[#1A1A1A] font-light block mt-1">{product.price}</span>
          </div>
        )}
      </div>

      {/* Slide-out details drawer showing actions and info on hover */}
      <div className="overflow-hidden hidden lg:block">
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="pt-3 border-t border-[#F2EDE2] mt-3 space-y-3">
            <p className="font-sans text-[11px] text-[#6E6B64] font-light leading-relaxed">
              {product.description}
            </p>
            <ProductActions
              onInquire={onInquire ? handleInquire : undefined}
              onWhatsApp={handleWhatsApp}
              onTearSheet={onTearSheet ? handleTearSheet : undefined}
            />
          </div>
        </motion.div>
      </div>

      <div className="block lg:hidden mt-3 pt-3 border-t border-[#F2EDE2]">
        <ProductActions
          onInquire={onInquire ? handleInquire : undefined}
          onWhatsApp={handleWhatsApp}
          onTearSheet={onTearSheet ? handleTearSheet : undefined}
        />
      </div>
    </div>
  );
}
