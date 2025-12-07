// src/pages/Gallery.jsx (updated with Framer Motion animations)
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { X } from 'lucide-react';
import PhotoViewer from '../components/PhotoViewer';
import { GALLERY_CATEGORIES } from '../data';
import LazyImage from '../components/LazyImage';
import { deriveVariants } from '../utils/imageVariants';

// === Reveal helper (Copied from Home.jsx for consistent animation) ===
const Reveal = ({ children, delay = 0, duration = 0.5, amount = 0.1 }) => {
  const ref = React.useRef(null);
  // const isInView = useInView(ref, { once: true, amount });

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration, delay } },
  };

  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={'visible'}>
      {children}
    </motion.div>
  );
};

// Gallery page
const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewerData, setViewerData] = useState(null);

  useEffect(() => {
    const isModalOpen = selectedCategory || viewerData;
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedCategory, viewerData]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 container mx-auto">
      {/* Header - Now animates immediately on mount */}
      <div className="mb-12 text-center py-6 relative">
        <Reveal
          delay={0.1}
          duration={0.6}
        >
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-64 h-64 pointer-events-none" />
          <h1 className="text-4xl md:text-5xl font-bold text-tech-gold">Team Gallery</h1>
          <p className="text-slate-400 mt-2">Moments captured on our journey.</p>
        </Reveal>
      </div>

      {/* Grid of gallery categories - Animates immediately on mount with staggering delay */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GALLERY_CATEGORIES.map((cat, idx) => {
          const coverVars = deriveVariants(cat.coverImage);
          return (
            <Reveal key={idx} duration={0.5} delay={0.1 * idx} amount={0.2}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative rounded-xl overflow-hidden cursor-pointer group aspect-[16/9]"
              onClick={() => setSelectedCategory(cat)}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Cover image now lazy-loaded */}
              <LazyImage
                variants={coverVars}
                alt={cat.name}
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ width: '100%', height: '100%' }}
                className="transition duration-500 group-hover:blur-sm"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white border-b-2 border-tech-gold/60 pb-1">
                  <span className="inline-block px-3 py-1 bg-black/40 rounded-md backdrop-blur-sm">
                    {cat.name}
                  </span>
                </h3>
              </div>

              <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-tech-gold to-transparent opacity-90" />
            </motion.div>
            </Reveal>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur flex items-center justify-center p-4"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-6xl h-[80vh] bg-card-gradient bg-opacity-80 rounded-xl overflow-hidden flex flex-col relative border border-slate-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="p-6 border-b border-slate-700 flex justify-between items-center relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(20,20,20,0.5) 40%, rgba(227,175,100,0.06) 100%)",
                }}
              >
                <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-tech-gold blur-[110px] opacity-30 pointer-events-none" />
                <h2 className="text-2xl font-bold text-white z-10">{selectedCategory.name}</h2>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="relative hover:bg-red-600 text-white p-2 rounded focus:outline-none focus:ring-4 focus:ring-tech-gold/40 z-10"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 min-h-0">
                <div className="h-full overflow-y-auto p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start">
                    {selectedCategory.photos.map((img, i) => {
                      const vars = deriveVariants(img);
                      return (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.05 }} // Added hover animation for gallery images
                          onClick={() =>
                            setViewerData({
                              photos: selectedCategory.photos, // original string paths
                              index: i
                            })
                          }
                          className="relative group cursor-pointer aspect-video overflow-hidden rounded-lg shadow-md bg-tech-800 transform transition hover:-translate-y-1"
                          style={{ aspectRatio: '16/9', width: '100%' }}
                        >
                          {/* Thumbnail in grid (loads small file only) */}
                          <LazyImage
                            variants={vars}
                            alt={`${selectedCategory.name}-${i}`}
                            sizes="(max-width: 640px) 100vw, 200px"
                            style={{ width: '100%', height: '100%' }}
                          />

                          <div className="absolute inset-0 pointer-events-none rounded-lg opacity-0 group-hover:opacity-100 transition">
                            <div className="absolute inset-0 border-2 rounded-lg border-tech-gold/30 shadow-[0_8px_30px_-10px_rgba(227,175,100,0.25)]" />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {viewerData && (
          <PhotoViewer
            photos={viewerData.photos}
            initialIndex={viewerData.index}
            onClose={() => setViewerData(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;