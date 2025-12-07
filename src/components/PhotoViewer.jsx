import React from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { deriveVariants } from '../utils/imageVariants';

const makeVariants = (photo) => {
  if (!photo) return null;
  if (typeof photo === 'string') return deriveVariants(photo);
  if (photo.variants) return photo.variants;
  return photo;
};

const buildSrcSet = (variants, pref = 'webp') => {
  if (!variants) return null;
  if (pref === 'webp') {
    const list = [variants.webp_400, variants.webp_800, variants.webp_1600].filter(Boolean)
      .map((u, i) => `${encodeURI(u)} ${[400, 800, 1600][i]}w`);
    return list.length ? list.join(', ') : null;
  } else {
    const list = [variants.jpg_400, variants.jpg_800, variants.jpg_1600].filter(Boolean)
      .map((u, i) => `${encodeURI(u)} ${[400, 800, 1600][i]}w`);
    return list.length ? list.join(', ') : null;
  }
};

const choose1600 = (variants) => {
  if (!variants) return null;
  // prefer webp_1600 then jpg_1600, then fallbacks to 800 if needed
  return variants.webp_1600 || variants.jpg_1600 || variants.webp_800 || variants.jpg_800 || variants.full || null;
};

const chooseFull = (variants) => {
  if (!variants) return null;
  // full is the original image; if absent, fallback to best available
  return variants.full || variants.jpg_1600 || variants.webp_1600 || variants.jpg_800 || variants.webp_800 || null;
};

const PhotoViewer = ({ photos = [], initialIndex = 0, onClose, sizes = '100vw' }) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const [fullLoadedSrc, setFullLoadedSrc] = React.useState(null); // encoded URL of full when loaded
  const len = photos.length;

  // sync with parent initialIndex
  React.useEffect(() => setCurrentIndex(initialIndex), [initialIndex]);

  // reset fullLoadedSrc when index or photos change (so we show 1600 again)
  React.useEffect(() => {
    setFullLoadedSrc(null);
  }, [currentIndex, photos]);

  // Start background load of full-res for the current image and set state on load.
  React.useEffect(() => {
    if (!photos || len === 0) return;
    const variants = makeVariants(photos[currentIndex]);
    const initialSrc = choose1600(variants); // what we display immediately via picture
    const fullSrc = chooseFull(variants); // what we want to swap to once ready

    // if no full or identical to initial, set fullLoadedSrc to initial (no bg load)
    if (!fullSrc || fullSrc === initialSrc) {
      setFullLoadedSrc(fullSrc ? encodeURI(fullSrc) : null);
      return;
    }

    let bg = new Image();
    let mounted = true;
    bg.onload = () => {
      if (!mounted) return;
      // set to encoded full url so rendered <img> uses exactly that string
      setFullLoadedSrc(encodeURI(fullSrc));
    };
    bg.onerror = () => {
      // fail silently and keep showing 1600
    };
    bg.src = encodeURI(fullSrc);

    return () => {
      mounted = false;
      if (bg) {
        try { bg.onload = null; bg.onerror = null; bg.src = ''; } catch (e) {}
      }
    };
  }, [currentIndex, photos, len]);

  // Preload LEFT & RIGHT 1600p ONLY (webp_1600 -> jpg_1600 -> 800 fallbacks). Do NOT preload neighbor full-res.
  React.useEffect(() => {
    if (!photos || len === 0) return;

    const prev = (currentIndex - 1 + len) % len;
    const next = (currentIndex + 1) % len;
    const indices = [prev, next];

    const loaders = indices.map((i) => {
      const v = makeVariants(photos[i]);
      const url =
        v?.webp_1600 ||
        v?.jpg_1600 ||
        v?.webp_800 ||
        v?.jpg_800 ||
        null;

      if (!url) return null;
      const img = new Image();
      img.src = encodeURI(url);
      return img;
    }).filter(Boolean);

    return () =>
      loaders.forEach((img) => {
        try { img.src = ''; } catch (e) {}
      });
  }, [currentIndex, photos, len]);

  // keyboard navigation
  React.useEffect(() => {
    const onKey = (ev) => {
      if (ev.key === 'Escape') return onClose?.();
      if (ev.key === 'ArrowRight') return setCurrentIndex((p) => (p + 1) % len);
      if (ev.key === 'ArrowLeft') return setCurrentIndex((p) => (p - 1 + len) % len);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [len, onClose]);

  if (len === 0) return null;

  const prevPhoto = (e) => { e.stopPropagation(); setCurrentIndex((p) => (p - 1 + len) % len); };
  const nextPhoto = (e) => { e.stopPropagation(); setCurrentIndex((p) => (p + 1) % len); };

  const currentVars = makeVariants(photos[currentIndex]);
  const webpSrcSet = buildSrcSet(currentVars, 'webp');
  const jpgSrcSet = buildSrcSet(currentVars, 'jpg');
  const initialDisplay = choose1600(currentVars) || chooseFull(currentVars) || '';

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer, image ${currentIndex + 1} of ${len}`}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose?.(); }}
        className="absolute top-6 right-6 text-white hover:text-red-500"
        aria-label="Close"
        style={{ zIndex: 60 }}
      >
        <X size={40} />
      </button>

      <button
        onClick={prevPhoto}
        className="absolute left-4 text-white hover:text-tech-accent p-2"
        aria-label="Previous image"
        style={{ zIndex: 50 }}
      >
        <ChevronLeft size={48} />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Base layer: 1600 via <picture>. Visible while fullLoadedSrc is null; fades out when full is ready */}
        <div
          style={{
            transition: 'opacity 500ms ease',
            opacity: fullLoadedSrc ? 0 : 1,
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // IMPORTANT: don't let the hidden base layer capture pointer events once the full image is ready
            pointerEvents: fullLoadedSrc ? 'none' : 'auto',
          }}
          aria-hidden={!!fullLoadedSrc}
        >
          <picture>
            {webpSrcSet && <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />}
            {jpgSrcSet && <source type="image/jpeg" srcSet={jpgSrcSet} sizes={sizes} />}
            <img
              src={encodeURI(initialDisplay)}
              alt={`View ${currentIndex + 1} of ${len}`} 
              style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', display: 'block' }}
              loading="eager"
              decoding="async"
              // keep fetchpriority lowercase
              fetchpriority="high"
            />
          </picture>
        </div>

        {/* Top layer: full image — only rendered when available; crossfades in */}
        {fullLoadedSrc && (
          <img
            src={fullLoadedSrc}
            alt={`View ${currentIndex + 1} (full)`}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              display: 'block',
              transition: 'opacity 500ms ease',
              opacity: 1,
              position: 'relative',
              zIndex: 20,              // image sits below controls
              pointerEvents: 'auto',   // image can still be interacted with if needed
            }}
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        )}
      </div>

      <button
        onClick={nextPhoto}
        className="absolute right-4 text-white hover:text-tech-accent p-2"
        aria-label="Next image"
        style={{ zIndex: 50 }}
      >
        <ChevronRight size={48} />
      </button>
    </motion.div>
  );
};

export default PhotoViewer;
