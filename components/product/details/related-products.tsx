import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../product-card";
import { HospitalityProduct } from "../hospitality-data";

interface RelatedProductsProps {
  products: HospitalityProduct[];
  onInquire?: (id: string) => void;
}

export default function RelatedProducts({ products, onInquire }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="space-y-8">
      <h3 className="font-serif text-xl font-light text-[#1A1A1A] tracking-wide text-center md:text-left border-b border-[#F2EDE2] pb-3">
        Complementary Showroom Objects
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} className="block">
            <ProductCard
              product={p}
              variant="editorial"
              aspectRatio="portrait"
              onInquire={onInquire}
              onWishlistToggle={() => {}}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
