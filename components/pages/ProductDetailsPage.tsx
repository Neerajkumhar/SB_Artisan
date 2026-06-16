import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  fetchProductById,
  fetchProducts,
  HospitalityProduct,
  ProductGallery,
  ImageLightbox,
  ProductOverview,
  MaterialsSection,
  DimensionsTable,
  FinishSelector,
  CraftsmanshipStory,
  HospitalityUsage,
  RelatedProducts,
  InquirySidebar,
  StickyActions,
  CatalogBreadcrumb,
} from "../product";
import { Container, SubHeading, Heading, Paragraph, SEO } from "../ui";
import { Link, useOutletContext } from "react-router-dom";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  
  const [product, setProduct] = useState<HospitalityProduct | undefined>(undefined);
  const [selectedFinish, setSelectedFinish] = useState<string>("");
  const [relatedProducts, setRelatedProducts] = useState<HospitalityProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const inquiryFormRef = useRef<HTMLDivElement>(null);

  const { openInquiry } = useOutletContext<{ openInquiry: (product: HospitalityProduct | null) => void }>();

  useEffect(() => {
    setIsLoading(true);
    let isMounted = true;
    
    fetchProductById(id || "").then((foundProduct) => {
      if (!isMounted) return;
      setProduct(foundProduct);

      if (foundProduct) {
        // Set default finish
        if (foundProduct.finishes && foundProduct.finishes.length > 0) {
          setSelectedFinish(foundProduct.finishes[0]);
        } else if (foundProduct.materials && foundProduct.materials.length > 0) {
          setSelectedFinish(foundProduct.materials[0]);
        }

        // Fetch related products (complementary items in same category)
        fetchProducts({ category: foundProduct.category }).then((list) => {
          if (isMounted) {
            const filtered = list.filter((p) => p.id !== foundProduct.id).slice(0, 3);
            setRelatedProducts(filtered);
            setIsLoading(false);
          }
        });
      } else {
        setIsLoading(false);
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handlePrevLightbox = () => {
    if (!product) return;
    setLightboxIndex((prev) => (prev === 0 ? product.imageGallery.length - 1 : prev - 1));
  };

  const handleNextLightbox = () => {
    if (!product) return;
    setLightboxIndex((prev) => (prev === product.imageGallery.length - 1 ? 0 : prev + 1));
  };

  const handleScrollToInquiry = () => {
    inquiryFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (isLoading) {
    return (
      <div className="py-40 bg-[#FDFCF7]">
        <Container variant="default" className="space-y-8 animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 aspect-[4/3] bg-[#F5F2EA] w-full" />
            <div className="lg:col-span-5 space-y-6">
              <div className="h-6 bg-[#F5F2EA] w-1/4" />
              <div className="h-10 bg-[#F5F2EA] w-3/4" />
              <div className="h-32 bg-[#F5F2EA] w-full" />
              <div className="h-12 bg-[#F5F2EA] w-full" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-40 bg-[#FDFCF7]">
        <Container variant="narrow" className="text-center space-y-6">
          <SubHeading variant="caps" size="sm" className="text-[#8C8273]">
            Exhibition Error
          </SubHeading>
          <Heading variant="display" weight="light" className="text-[#1A1A1A]">
            Object Not Found
          </Heading>
          <Paragraph variant="md" className="text-[#6E6B64] font-light max-w-sm mx-auto">
            The design archive does not contain the requested registry ID. It may have been cataloged under private collections.
          </Paragraph>
          <div className="pt-4">
            <Link
              to="/collections"
              className="font-sans text-xs uppercase tracking-[0.2em] px-5 py-3 border border-[#1A1A1A] text-white bg-[#1A1A1A] hover:bg-transparent hover:text-[#1A1A1A] transition-all duration-300"
            >
              Return to Catalog
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const categorySlug = product.category.toLowerCase().replace(/\s+/g, "-");
  
  const getSubcategoryQueryVal = (sub: string) => {
    const s = sub.toLowerCase();
    if (s.includes("seating") || s.includes("chair")) return "seating";
    if (s.includes("table")) return "tables";
    if (s.includes("lounge") || s.includes("daybed")) return "lounge";
    if (s.includes("cabinet") || s.includes("storage") || s.includes("credenza")) return "cabinet";
    if (s.includes("bench")) return "bench";
    if (s.includes("accessories")) return "accessories";
    return "all";
  };

  const getProductCollection = (prod: HospitalityProduct) => {
    const title = prod.title.toLowerCase();
    if (title.includes("haveli")) return "Shekhawati Haveli Collection";
    if (title.includes("dune") || title.includes("cane") || title.includes("bent-cane")) return "Nilgiri Canopy Collection";
    if (title.includes("inlay") || title.includes("bone")) return "Raj Gharana Collection";
    if (title.includes("keralite") || title.includes("coir") || title.includes("rope")) return "Malabar Weaving Conservatories";
    if (title.includes("varanasi") || title.includes("silk")) return "Varanasi Silk-Rope Series";
    return "SB Artisan Custom Collection";
  };

  const cleanPrice = product.price ? product.price.replace(/[₹$,]/g, "") : "0.00";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": product.imageGallery.map((img) => img.startsWith("http") ? img : `https://www.sbartisan.com${img}`),
    "description": product.description,
    "sku": product.id,
    "mpn": product.id,
    "brand": {
      "@type": "Brand",
      "name": "SB Artisan"
    },
    "designer": {
      "@type": "Organization",
      "name": product.designer || "SB Artisan Jodhpur Woodworking Atelier"
    },
    "material": product.materials,
    "color": product.finishes,
    "offers": {
      "@type": "Offer",
      "url": `https://www.sbartisan.com/product/${product.id}`,
      "priceCurrency": "INR",
      "price": cleanPrice,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/PreOrder",
      "seller": {
        "@type": "Organization",
        "name": "SB Artisan",
        "url": "https://www.sbartisan.com"
      }
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Category",
        "value": product.category
      },
      {
        "@type": "PropertyValue",
        "name": "Subcategory",
        "value": product.subcategory
      },
      {
        "@type": "PropertyValue",
        "name": "Dimensions",
        "value": `${product.dimensions.width} x ${product.dimensions.depth} x ${product.dimensions.height} ${product.dimensions.unit}`
      },
      {
        "@type": "PropertyValue",
        "name": "Hospitality Usage",
        "value": product.hospitalityUsage
      }
    ]
  };

  const seoDescription = `${product.title}: A premium contract grade ${product.subcategory.toLowerCase()} crafted from ${product.materials.join(", ")} by ${product.designer}. Suitable for ${product.hospitalityUsage.toLowerCase()}`;
  const seoKeywords = [
    product.title.toLowerCase(),
    product.category.toLowerCase(),
    product.subcategory.toLowerCase(),
    "wholesale exporter",
    "contract furniture oem",
    "jodhpur furniture factory",
    "indian hospitality furniture",
    "custom commercial furniture",
    ...product.tags
  ].join(", ");

  return (
    <div className="bg-[#FDFCF7] pt-28 pb-20 selection:bg-[#EAE5D9]">
      <SEO
        title={`${product.title} - Wholesale & Contract OEM`}
        description={seoDescription.length > 155 ? seoDescription.substring(0, 155) + "..." : seoDescription}
        keywords={seoKeywords}
        canonical={`/product/${product.id}`}
        schema={productSchema}
      />
      <Container variant="default" className="py-8 md:py-12">
        {/* Dynamic Breadcrumb Navigation */}
        <CatalogBreadcrumb
          items={[
            { 
              label: product.category, 
              href: `/category/${categorySlug}` 
            },
            { 
              label: product.subcategory, 
              href: `/category/${categorySlug}?sub=${getSubcategoryQueryVal(product.subcategory)}` 
            },
            { 
              label: product.title 
            }
          ]}
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Main Scrollable Content */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* Interactive Image Gallery */}
            <ProductGallery
              images={product.imageGallery}
              title={product.title}
              onOpenLightbox={handleOpenLightbox}
            />

            {/* Materials and Sourcing Details */}
            <MaterialsSection materials={product.materials} />

            {/* Handcrafted Storytelling Narrative */}
            <CraftsmanshipStory
              designer={product.designer}
              story={product.story}
            />

            {/* Spec Table (Metric/Imperial Toggle) */}
            <DimensionsTable
              dimensions={product.dimensions}
              tags={product.tags}
              materials={product.materials}
              finishes={product.finishes}
              usage={product.hospitalityUsage}
              collection={getProductCollection(product)}
            />

            {/* Durability Specifications */}
            <HospitalityUsage
              usageText={product.hospitalityUsage}
              category={product.category}
            />

          </div>

          {/* RIGHT COLUMN: Sticky Rail */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            
            {/* Overview / Header Meta */}
            <ProductOverview
              title={product.title}
              category={product.category}
              subcategory={product.subcategory}
              designer={product.designer}
              price={product.price}
              description={product.description}
            />

            {/* Artisanal Finishes Color Dots */}
            {product.finishes && product.finishes.length > 0 && (
              <FinishSelector
                finishes={product.finishes}
                selectedFinish={selectedFinish}
                onChange={setSelectedFinish}
              />
            )}

            {/* Spec Form Sidebar Container */}
            <div ref={inquiryFormRef}>
              <InquirySidebar
                product={product}
                selectedFinish={selectedFinish}
              />
            </div>

          </div>

        </div>
      </Container>

      {/* Related Products Grid */}
      <Container variant="default" className="py-20 border-t border-[#F2EDE2] mt-20">
        <RelatedProducts
          products={relatedProducts}
          onInquire={(prodId) => {
            const found = relatedProducts.find((rp) => rp.id === prodId);
            if (found) openInquiry(found);
          }}
        />
      </Container>

      {/* Full screen Lightbox overlay */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={product.imageGallery}
        activeIndex={lightboxIndex}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
        title={product.title}
      />

      {/* Sticky Bottom Bar on Scroll */}
      <StickyActions
        image={product.imageGallery[0]}
        title={product.title}
        price={product.price}
        selectedFinish={selectedFinish}
        onInquireClick={handleScrollToInquiry}
      />
    </div>
  );
}
