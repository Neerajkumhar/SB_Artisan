import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Heading, SubHeading, Paragraph, SEO } from "../ui";

interface CaseStudy {
  id: string;
  title: string;
  category: string; // Hotels, Restaurants, Cafés, Bars, Resorts, Villas, Interior Design
  location: string;
  scope: string;
  story: string;
  image: string;
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filterCategories = [
    "All",
    "Hotels",
    "Restaurants",
    "Cafés",
    "Bars",
    "Resorts",
    "Villas",
    "Interior Design",
  ];

  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjectsData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/projects");
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const mapped = json.data.map((p: any): CaseStudy => ({
          id: p.id.toString(),
          title: p.title,
          category: p.project_type,
          location: p.location,
          scope: p.client_name ? `${p.client_name} — Completed ${p.completion_year}` : "Contract custom furniture package",
          story: p.description,
          image: p.image_url || "/images/resort_bedroom_daybed.png"
        }));
        setCaseStudies(mapped);
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to retrieve case studies registry.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsData();
  }, []);

  // Filtering pipeline
  const filteredCaseStudies = useMemo(() => {
    if (activeFilter === "All") return caseStudies;
    return caseStudies.filter(
      (project) => project.category.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [activeFilter, caseStudies]);

  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "B2B Furniture Export Projects & Case Studies",
    "description": "View SB Artisan's completed global contract furniture installations. Portfolios include teakwood daybeds, restaurant dining sets, and bone inlay cabinets.",
    "url": "https://www.sbartisan.com/projects"
  };

  return (
    <div className="bg-[#FDFCF7] pt-28 pb-20 text-[#1A1A1A]">
      <SEO 
        title="Commercial FF&E Furniture Project Portfolios"
        description="View our contract furniture project portfolios. SB Artisan supplies custom handcrafted teak, cane, and bone inlay furniture to global hospitality developments."
        keywords="hospitality furniture installations, commercial FF&E projects, hotel furniture case studies, Jodhpur contract furniture exporter"
        canonical="/projects"
        schema={projectsSchema}
      />
      {/* 1. HEADER SECTION */}
      <Container variant="default" className="py-12 border-b border-[#F2EDE2]">
        <div className="max-w-3xl space-y-4">
          <SubHeading variant="caps" size="sm" className="text-[#8C8273]">
            Global Contract Showcase
          </SubHeading>
          <Heading variant="hero" weight="light" className="text-[#1A1A1A] leading-tight">
            Completed Projects & Case Studies
          </Heading>
          <Paragraph variant="md" className="text-[#6E6B64] font-light max-w-xl">
            Explore our contract portfolio detailing solid teakwood, bone inlay, and custom rattan installations inside luxury resorts, boutique cafes, and commercial spaces globally.
          </Paragraph>
        </div>
      </Container>

      {/* 2. FILTER TABS */}
      <Container variant="default" className="py-8">
        <div className="flex flex-wrap items-center gap-2 md:gap-3 border-b border-[#F2EDE2] pb-6">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 text-[10px] md:text-xs uppercase tracking-widest font-sans transition-all duration-300 border rounded-sm ${
                activeFilter === category
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                  : "bg-transparent text-[#6E6B64] border-[#EAE5D9] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </Container>

      {/* 3. CASE STUDIES GRID */}
      <Container variant="default" className="pb-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-[#FAF8F2] border border-[#EAE5D9] rounded-sm overflow-hidden flex flex-col justify-between animate-pulse">
                <div className="aspect-[4/3] w-full bg-[#F5F2EA]" />
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <div className="h-2.5 bg-[#F5F2EA] w-1/4 rounded-xs" />
                    <div className="h-2.5 bg-[#F5F2EA] w-1/4 rounded-xs" />
                  </div>
                  <div className="h-4 bg-[#F5F2EA] w-3/4 rounded-xs" />
                  <div className="space-y-2">
                    <div className="h-3 bg-[#F5F2EA] w-full rounded-xs" />
                    <div className="h-3 bg-[#F5F2EA] w-5/6 rounded-xs" />
                  </div>
                  <div className="h-3.5 bg-[#F5F2EA] w-1/3 rounded-xs pt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="py-20 text-center space-y-6 max-w-md mx-auto select-none">
            <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-500 mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-lg text-[#1A1A1A] font-light">Failed to load project registry</h4>
              <p className="font-sans text-xs text-[#6E6B64] font-light leading-relaxed">{error}</p>
            </div>
            <button
              onClick={fetchProjectsData}
              className="px-5 py-2.5 bg-[#1A1A1A] text-white hover:bg-[#8C6D4F] font-sans text-[10px] uppercase tracking-widest font-medium transition-all duration-300 rounded-sm cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        ) : filteredCaseStudies.length === 0 ? (
          <div className="py-20 text-center space-y-4 border border-dashed border-[#EAE5D9] rounded-sm bg-[#FAF8F2]/50 select-none">
            <svg className="w-10 h-10 text-[#8C8273] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18" />
            </svg>
            <p className="font-serif text-base text-[#8C8273] font-light">No case studies found matching this sector.</p>
            <p className="font-sans text-xs text-[#9E9B95] font-light">Try selecting a different filter category tab above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCaseStudies.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer bg-[#FAF8F2] border border-[#EAE5D9] rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-[0_15px_30px_rgba(0,0,0,0.03)] transition-all duration-500"
                >
                  {/* Image Block */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#F5F2EA] relative">
                    <div className="absolute inset-0 bg-black/5 z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-104 transition-transform duration-[1200ms] ease-out select-none"
                    />
                  </div>

                  {/* Content Block */}
                  <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-[#8C8273]">
                        <span>{project.category}</span>
                        <span>{project.location.split(",")[0]}</span>
                      </div>
                      <h3 className="font-serif text-lg font-light text-[#1A1A1A] group-hover:text-[#8C6D4F] transition-colors duration-300 leading-snug">
                        {project.title}
                      </h3>
                    </div>
                    <p className="font-sans text-xs font-light text-[#6E6B64] line-clamp-2 leading-relaxed">
                      {project.story}
                    </p>
                    <div className="pt-2 flex items-center gap-1.5 text-[9px] font-sans font-semibold uppercase tracking-widest text-[#1A1A1A] group-hover:text-[#8C6D4F] transition-colors duration-300">
                      <span>View Case Study</span>
                      <svg className="w-3 h-3 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </Container>

      {/* 4. DETAILS LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 select-none">
            {/* Backdrop Mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-[#FDFCF7] border border-[#EAE5D9] shadow-2xl rounded-sm overflow-hidden z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[85vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white rounded-full transition-all focus:outline-none"
                aria-label="Close Case Study"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Left Column: Image Block */}
              <div className="md:col-span-6 bg-black relative aspect-[4/3] md:aspect-auto md:h-full">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Right Column: Narrative Block */}
              <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[85vh] space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-[#8C8273] font-semibold block">
                      {selectedProject.category} Case Study
                    </span>
                    <h2 className="font-serif text-xl md:text-2xl font-light text-[#1A1A1A] leading-tight">
                      {selectedProject.title}
                    </h2>
                  </div>

                  {/* Highlights Box */}
                  <div className="bg-[#FAF8F2] border border-[#F2EDE2] p-4 rounded-sm space-y-2 text-xs font-sans">
                    <div className="flex gap-2">
                      <span className="font-medium text-[#1A1A1A] shrink-0">Location:</span>
                      <span className="text-[#6E6B64] font-light">{selectedProject.location}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-[#1A1A1A] shrink-0">Scope:</span>
                      <span className="text-[#6E6B64] font-light">{selectedProject.scope}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A] font-semibold block">
                      Case Narrative
                    </span>
                    <p className="font-sans text-xs text-[#6E6B64] font-light leading-relaxed text-justify">
                      {selectedProject.story}
                    </p>
                  </div>
                </div>

                {/* WhatsApp Call to Action */}
                <div className="pt-4 border-t border-[#F2EDE2]">
                  <a
                    href={`https://wa.me/919999999999?text=Hello%20SB%20Artisan%2C%20I%20would%20like%20to%20discuss%20a%20commercial%20furniture%20inquiry%20modeled%20after%20your%20${encodeURIComponent(
                      selectedProject.title
                    )}%20project.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#1A1A1A] hover:bg-[#8C6D4F] text-white text-[10px] uppercase tracking-[0.25em] font-sans font-medium transition-all duration-300 rounded-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.116-2.887-6.98C16.584 1.897 14.11 1.867 11.47 1.867c-5.436 0-9.86 4.42-9.864 9.864 0 1.685.443 3.329 1.288 4.776L1.879 21.08l4.768-1.256c.001 0 .001 0 0 0zm11.758-5.321c-.266-.134-1.579-.78-1.823-.867-.243-.088-.42-.132-.596.133-.176.265-.681.861-.836 1.039-.153.176-.308.199-.575.066-.267-.134-1.129-.417-2.15-1.328-.793-.708-1.329-1.582-1.485-1.848-.156-.266-.017-.409.117-.541.12-.12.267-.309.4-.464.133-.155.177-.265.267-.442.089-.176.044-.331-.022-.464-.066-.133-.596-1.436-.816-1.966-.215-.518-.453-.448-.623-.456-.16-.008-.344-.01-.528-.01-.184 0-.485.069-.739.344-.254.275-.97.949-.97 2.314 0 1.365.992 2.68 1.114 2.846.122.166 1.953 2.983 4.73 4.181.661.285 1.176.455 1.579.583.664.211 1.269.181 1.747.11.533-.08 1.579-.646 1.8-.1237.221-.592.221-1.101.155-1.192-.066-.091-.243-.135-.508-.269z" />
                    </svg>
                    WhatsApp Spec Inquiry
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
