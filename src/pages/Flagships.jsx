// src/pages/Flagships.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react'; // Import React for the Reveal component
import { X } from 'lucide-react';
import PhotoViewer from '../components/PhotoViewer';
import { AIRCRAFT_DATA } from '../data';
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

// Flagships page: lists aircraft cards, opens a detail modal, and a fullscreen PhotoViewer
const Flagships = () => {
  const [selectedCraft, setSelectedCraft] = useState(null);
  const [viewerData, setViewerData] = useState(null);

  useEffect(() => {
    const isModalOpen = selectedCraft || viewerData;
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedCraft, viewerData]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 container mx-auto">
      {/* Header - Animated with Reveal */}
      <div className="mb-12 py-6 text-center">
        <Reveal duration={0.6} delay={0.1}>
          <h1 className="text-5xl font-bold text-tech-gold">
            Meet The Aircraft
          </h1>
          <p className="text-slate-400 mt-2">Engineering marvels from the past seasons.</p>
        </Reveal>
      </div>

      {/* Grid of aircraft cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {AIRCRAFT_DATA.map((craft, index) => {
          const coverVars = deriveVariants(craft.coverImage);
          return (
            <Reveal key={craft.id} duration={0.5} delay={0.1 * index} amount={0.2}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="relative rounded-xl overflow-hidden cursor-pointer group aspect-[16/9]"
                onClick={() => setSelectedCraft(craft)}
                // Add explicit transition to avoid conflicts with whileHover when combined with Reveal's transition
                transition={{ type: 'spring', stiffness: 300, damping: 20 }} 
              >
                {/* Lazy-loaded cover */}
                <LazyImage
                  variants={coverVars}
                  alt={craft.name}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover transition duration-500 group-hover:blur-sm"
                  style={{ width: '100%', height: '100%' }}
                />

                {/* Gradient overlay + centered label */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white border-b-2 border-tech-gold/60 pb-1">
                    <span className="inline-block px-3 py-1 bg-black/40 rounded-md backdrop-blur-sm">
                      {craft.name} <span className="text-2xl text-slate-300 font-medium">({craft.year})</span>
                    </span>
                  </h3>
                </div>

                {/* gold accent stripe at bottom */}
                <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-tech-gold to-transparent opacity-90" />
              </motion.div>
            </Reveal>
          );
        })}
      </div>

      {/* Detail modal for selected craft - Animation already present, using the existing AnimatePresence for the modal */}
      <AnimatePresence>
        {selectedCraft && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur flex items-center justify-center p-4"
            onClick={() => setSelectedCraft(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-5xl h-[80vh] bg-card-gradient bg-opacity-80 rounded-xl overflow-hidden flex flex-col relative border border-slate-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="p-6 border-b border-slate-700 flex justify-between items-center relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(20,20,20,0.5) 40%, rgba(227,175,100,0.12) 100%)",
                }}
              >
                <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-tech-gold blur-[110px] opacity-30 pointer-events-none"></div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white">
                    {selectedCraft.name} <span className="text-slate-400 font-medium">({selectedCraft.year})</span>
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedCraft(null)}
                  className="relative hover:bg-red-600 text-white p-2 rounded focus:outline-none focus:ring-4 focus:ring-tech-gold/40 z-10"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Single scrollable area containing the cover + all content */}
              <div className="flex-grow overflow-y-auto hide-scrollbar">
                {/* Cover */}
                <div className="w-full h-96 flex-shrink-0 bg-gray-700 flex items-center justify-center text-white text-3xl font-bold uppercase overflow-hidden relative">
                  {selectedCraft.coverImage ? (
                    <>
                      <LazyImage
                        variants={deriveVariants(selectedCraft.coverImage)}
                        alt={selectedCraft.name}
                        sizes="(max-width: 900px) 100vw, 900px"
                        style={{ width: '100%', height: '100%' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-tech-gold/10 mix-blend-overlay pointer-events-none" />
                      <div className="absolute -top-8 -left-8 w-48 h-48 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-tech-gold/60 to-transparent pointer-events-none" />
                    </>
                  ) : (
                    <span>{selectedCraft.name} {selectedCraft.year} AIRCRAFT</span>
                  )}
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-white text-xl font-bold mb-2">
                      <span className="text-tech-gold mr-2">◉</span> Overview
                    </h3>
                    <hr className="border-slate-700 mb-4" />
                    <p className="text-slate-300 text-base">
                      {selectedCraft.description ?? 'No description provided.'}
                    </p>
                  </div>

                  {selectedCraft.rank?.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-white text-xl font-bold mb-2">
                        <span className="text-tech-gold mr-2">◉</span> Key Rankings (SAE AeroDesign)
                      </h3>
                      <hr className="border-slate-700 mb-4" />
                      <ul className="list-disc list-inside text-slate-300 text-base space-y-2">
                        {selectedCraft.rank.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Additional photos / gallery - Adding an animation to the button on hover similar to the cards */}
                  {selectedCraft.gallery?.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-white text-xl font-bold mb-4">
                        <span className="text-tech-gold mr-2">◉</span> Additional Photos
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {selectedCraft.gallery.map((photo, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="relative group cursor-pointer aspect-video overflow-hidden rounded-lg shadow-md bg-tech-800 transform transition hover:-translate-y-1"
                            style={{ aspectRatio: '16/9', width: '100%' }}
                            onClick={() => setViewerData({ photos: selectedCraft.gallery, index: idx })}
                          >
                            <LazyImage
                              variants={deriveVariants(photo)}
                              alt={`Gallery Thumbnail ${idx + 1}`}
                              sizes="(max-width: 640px) 100vw, 200px"
                              style={{ width: '100%', height: '100%' }}
                            />
                            <div className="absolute inset-0 pointer-events-none rounded-lg opacity-0 group-hover:opacity-100 transition">
                              <div className="absolute inset-0 border-2 rounded-lg border-tech-gold/30 shadow-[0_8px_30px_-10px_rgba(227,175,100,0.25)]" />
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div> {/* End content area */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen PhotoViewer */}
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

export default Flagships;