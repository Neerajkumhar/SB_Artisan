import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CatalogBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function CatalogBreadcrumb({ items, className }: CatalogBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("select-none font-sans text-[9px] uppercase tracking-[0.25em] text-[#8C8273] font-light", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
        <li>
          <Link to="/" className="hover:text-black transition-colors duration-300">
            Home
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <React.Fragment key={index}>
              <li className="text-[#8C8273]/40 text-[8px] select-none">•</li>
              <li>
                {isLast || !item.href ? (
                  <span className="text-[#1A1A1A] font-normal" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.href} className="hover:text-black transition-colors duration-300">
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
