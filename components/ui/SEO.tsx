import React, { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  schema?: Record<string, any>;
}

export default function SEO({ title, description, keywords, canonical, schema }: SEOProps) {
  useEffect(() => {
    // 1. Update document title
    const defaultSuffix = " | SB Artisan";
    document.title = title.includes(defaultSuffix) ? title : `${title}${defaultSuffix}`;

    // 2. Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // 3. Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords);
    }

    // 4. Update canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanonical);
      }
      const absoluteUrl = canonical.startsWith("http")
        ? canonical
        : `https://www.sbartisan.com${canonical}`;
      linkCanonical.setAttribute("href", absoluteUrl);
    } else if (linkCanonical) {
      // Use current path as fallback
      const currentPath = window.location.pathname;
      linkCanonical.setAttribute("href", `https://www.sbartisan.com${currentPath}`);
    }

    // 5. Update JSON-LD Schema markup
    let scriptSchema = document.getElementById("seo-schema-script");
    if (scriptSchema) {
      scriptSchema.remove();
    }
    if (schema) {
      scriptSchema = document.createElement("script");
      scriptSchema.id = "seo-schema-script";
      scriptSchema.setAttribute("type", "application/ld+json");
      scriptSchema.innerHTML = JSON.stringify(schema);
      document.head.appendChild(scriptSchema);
    }

    return () => {
      // Clean up dynamic schema block on component unmount
      const schemaScript = document.getElementById("seo-schema-script");
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [title, description, keywords, canonical, schema]);

  return null;
}
export type { SEOProps };
