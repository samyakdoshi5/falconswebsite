import React from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const PhotoViewer = ({ photos, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  const nextPhoto = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-red-500">
        <X size={40} />
      </button>
      <button onClick={prevPhoto} className="absolute left-4 text-white hover:text-tech-accent p-2">
        <ChevronLeft size={48} />
      </button>
      <img 
        src={photos[currentIndex]} 
        alt="Full View" 
        className="max-h-[90vh] max-w-[90vw] object-contain rounded shadow-2xl shadow-tech-accent/20"
        onClick={(e) => e.stopPropagation()} 
      />
      <button onClick={nextPhoto} className="absolute right-4 text-white hover:text-tech-accent p-2">
        <ChevronRight size={48} />
      </button>
    </motion.div>
  );
};
export default PhotoViewer;