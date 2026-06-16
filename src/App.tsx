import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";
import Homepage from "../components/Homepage";
import CollectionsPage from "../components/pages/CollectionsPage";
import HospitalitySeatingPage from "../components/pages/HospitalitySeatingPage";
import AtelierCasegoodsPage from "../components/pages/AtelierCasegoodsPage";
import ProductDetailsPage from "../components/pages/ProductDetailsPage";
import AboutPage from "../components/pages/AboutPage";
import BespokePage from "../components/pages/BespokePage";
import JournalPage from "../components/pages/JournalPage";
import ProjectsPage from "../components/pages/ProjectsPage";
import AdminLayout from "../components/pages/AdminLayout";
import AdminDashboardPage from "../components/pages/AdminDashboardPage";
import AdminProductsPage from "../components/pages/AdminProductsPage";
import AdminCategoriesPage from "../components/pages/AdminCategoriesPage";
import AdminCollectionsPage from "../components/pages/AdminCollectionsPage";
import AdminInquiriesPage from "../components/pages/AdminInquiriesPage";
import AdminBlogsPage from "../components/pages/AdminBlogsPage";
import AdminSettingsPage from "../components/pages/AdminSettingsPage";
import CategoryPage from "../components/pages/CategoryPage";
import ContactPage from "../components/pages/ContactPage";
import CustomizePage from "../components/pages/CustomizePage";
import { InquiryModal, HospitalityProduct } from "../components/product";

// 1. MASTER ROUTING LAYOUT COMPONENT
function AppLayout() {
  const location = useLocation();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  // Global B2B Inquiry modal state
  const [inquiryProduct, setInquiryProduct] = useState<HospitalityProduct | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const openInquiry = (product: HospitalityProduct | null) => {
    setInquiryProduct(product);
    setIsInquiryOpen(true);
  };

  // Trigger top golden loader bar when changing page routes
  useEffect(() => {
    setShowProgress(true);
    setLoadingProgress(15);
    
    const t1 = setTimeout(() => setLoadingProgress(55), 150);
    const t2 = setTimeout(() => setLoadingProgress(90), 350);
    const t3 = setTimeout(() => {
      setLoadingProgress(100);
      setTimeout(() => {
        setShowProgress(false);
        setLoadingProgress(0);
      }, 300);
    }, 550);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCF7]">
      
      {/* Dynamic Golden Top Loading Progress Bar */}
      {showProgress && (
        <motion.div
          className="fixed top-0 left-0 h-[2px] bg-[#A3927B] z-[100] origin-left shadow-[0_1px_5px_rgba(163,146,123,0.3)]"
          initial={{ width: "0%" }}
          animate={{ width: `${loadingProgress}%` }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      )}

      {/* Shared Header Navigation with consultation trigger */}
      <Navbar onOpenInquiry={() => openInquiry(null)} />

      {/* Main Pages Outlet with animated Framer Motion transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <Outlet context={{ openInquiry }} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global B2B Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        product={inquiryProduct}
      />

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}

// 404 Luxury Fallback Panel
function PageNotFound() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="py-40 bg-[#FDFCF7]">
      <div className="max-w-md mx-auto text-center space-y-6 px-6">
        <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#8C8273] font-light">
          Error 404
        </span>
        <h2 className="font-serif text-3xl font-light text-[#1A1A1A]">
          Page Not Cataloged
        </h2>
        <p className="font-sans text-xs text-[#6E6B64] font-light leading-relaxed">
          The requested URL path does not map to any existing showroom registry coordinates. Please check your spelling or return to the main catalog.
        </p>
        <div className="pt-4">
          <a
            href="/"
            className="inline-block font-sans text-[10px] uppercase tracking-[0.2em] font-medium py-3.5 px-6 bg-[#1A1A1A] text-white hover:bg-transparent hover:text-[#1A1A1A] border border-[#1A1A1A] transition-all duration-300 rounded-sm"
          >
            Return to Atelier
          </a>
        </div>
      </div>
    </div>
  );
}

// 2. MAIN APP ROUTER COMPONENT
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Shared Layout Frame */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="collections" element={<CollectionsPage />} />
          <Route path="collections/:category" element={<CollectionsPage />} />
          <Route path="category/:slug" element={<CategoryPage />} />
          <Route path="hospitality-seating" element={<HospitalitySeatingPage />} />
          <Route path="atelier-casegoods" element={<AtelierCasegoodsPage />} />
          <Route path="product/:id" element={<ProductDetailsPage />} />
          <Route path="our-story" element={<AboutPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="bespoke-services" element={<BespokePage />} />
          <Route path="bespoke" element={<BespokePage />} />
          <Route path="journal" element={<JournalPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="customize" element={<CustomizePage />} />
          <Route path="custom-furniture" element={<CustomizePage />} />
          <Route path="custom" element={<CustomizePage />} />
          <Route path="contact-on-whatsapp" element={<CustomizePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* Dedicated Admin CMS Dashboard (No Public Header/Footer) */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="collections" element={<AdminCollectionsPage />} />
          <Route path="inquiries" element={<AdminInquiriesPage />} />
          <Route path="blogs" element={<AdminBlogsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
