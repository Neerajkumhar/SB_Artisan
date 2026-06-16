import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  title: string;
}

export default function ImageLightbox({
  isOpen,
  onClose,
  images,
  activeIndex,
  onPrev,
  onNext,
  title,
}: ImageLightboxProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[200] flex flex-col justify-between bg-[#11100F] text-[#FAF8F2] font-sans"
      >
        {/* Lightbox Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#FAF8F2]/10">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase font-light text-[#FAF8F2]/55">
              Cinematic Lightbox / Archive Spec
            </span>
            <h3 className="font-serif text-sm font-light text-[#FAF8F2] tracking-wide">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 text-[#FAF8F2]/60 hover:text-[#FAF8F2] transition-colors duration-300 flex items-center gap-2 text-xs uppercase tracking-widest font-light"
          >
            Close
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Lightbox Center Image */}
        <div className="relative flex-grow flex items-center justify-center px-4 md:px-12">
          {/* Previous Arrow */}
          {images.length > 1 && (
            <button
              onClick={onPrev}
              className="absolute left-6 z-10 p-3 bg-black/40 hover:bg-black/70 border border-[#FAF8F2]/10 rounded-full transition-all duration-300 hover:scale-105"
            >
              <svg className="w-6 h-6 text-[#FAF8F2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image Container with slow fade-in transition */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-h-[75vh] max-w-[90vw] md:max-w-[70vw] aspect-[4/3] md:aspect-auto overflow-hidden flex items-center justify-center bg-[#1C1A18]/50"
          >
            <img
              src={images[activeIndex]}
              alt={`${title} - detail view ${activeIndex + 1}`}
              className="max-h-[75vh] w-auto object-contain select-none"
            />
          </motion.div>

          {/* Next Arrow */}
          {images.length > 1 && (
            <button
              onClick={onNext}
              className="absolute right-6 z-10 p-3 bg-black/40 hover:bg-black/70 border border-[#FAF8F2]/10 rounded-full transition-all duration-300 hover:scale-105"
            >
              <svg className="w-6 h-6 text-[#FAF8F2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Lightbox Footer */}
        <div className="flex flex-col items-center gap-4 py-6 border-t border-[#FAF8F2]/10 bg-[#141312]">
          {/* Thumbnails row */}
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {}}
                  className={`w-12 h-12 overflow-hidden border transition-all ${
                    idx === activeIndex ? "border-[#C5A880] scale-105 opacity-100" : "border-transparent opacity-40 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          <span className="text-[10px] tracking-[0.2em] font-light text-[#FAF8F2]/40 uppercase">
            Object {activeIndex + 1} of {images.length}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
