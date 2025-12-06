// src/components/LazyImage.jsx
import React, { useEffect, useRef, useState } from 'react';

export default function LazyImage({
    alt = '',
    className = '',
    style = {},
    variants = null,
    fallbackSrc = null,
    preferredSrc = null,
    fullSrc = null,
    sizes = '100vw',
    rootMargin = '200px',
    contain = false,
    viewerMode = false
}) {
    const wrapperRef = useRef(null);
    const imgRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [usingFull, setUsingFull] = useState(false);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;
        if ('IntersectionObserver' in window) {
            const obs = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setVisible(true);
                            obs.unobserve(entry.target);
                        }
                    });
                },
                { rootMargin }
            );
            obs.observe(el);
            return () => obs.disconnect();
        } else {
            setVisible(true);
        }
    }, [rootMargin]);

    const useVariants = variants && (variants.jpg_800 || variants.full);

    const buildSrcSet = (paths = [], descs = ['400w', '800w', '1600w']) => {
        const candidates = [];
        for (let i = 0; i < paths.length; i++) {
            const p = paths[i];
            if (!p) continue;
            const base = p.split(/(\?.*|#.*)/)[0];
            const extOk = /\.(jpe?g|png|webp|gif|svg)$/i.test(base);
            const fixed = extOk ? p : `${base}.jpg` + (p.slice(base.length) || '');
            candidates.push(`${encodeURI(fixed)} ${descs[i] || ''}`.trim());
        }
        return candidates.length ? candidates.join(', ') : null;
    };

    const webpSrcSet = useVariants ? buildSrcSet([variants.webp_400, variants.webp_800, variants.webp_1600]) : null;
    const jpgSrcSet = useVariants ? buildSrcSet([variants.jpg_400, variants.jpg_800, variants.jpg_1600]) : null;

    const defaultSrc = useVariants ? (variants.jpg_800 || variants.full) : (fallbackSrc || (variants && variants.full));
    const initialImgSrc = preferredSrc || defaultSrc;

    // Styles for viewer (force height-based sizing and override width if CSS leaks exist)
    const imgStyleViewer = {
        display: 'block',
        width: 'auto',             // IMPORTANT: do not stretch to 100% width
        height: 'auto',
        maxWidth: '90vw',
        maxHeight: '90vh',        // IMPORTANT: constrain by height so portraits get full height
        objectFit: 'contain',
        transition: 'filter 250ms ease, opacity 250ms ease',
        filter: loaded ? 'none' : 'blur(8px)',
        opacity: loaded ? 1 : 0.92
    };

    const imgStyleContain = {
        display: 'block',
        width: 'auto',
        height: 'auto',
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        transition: 'filter 250ms ease, opacity 250ms ease',
        filter: loaded ? 'none' : 'blur(8px)',
        opacity: loaded ? 1 : 0.92
    };

    const imgStyleCover = {
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'filter 250ms ease, opacity 250ms ease',
        filter: loaded ? 'none' : 'blur(8px)',
        opacity: loaded ? 1 : 0.92
    };

    const wrapperStyle = {
        position: 'relative',
        display: viewerMode ? 'flex' : 'block',
        alignItems: viewerMode ? 'center' : undefined,
        justifyContent: viewerMode ? 'center' : undefined,
        backgroundImage: variants && variants.thumb && !contain && !viewerMode ? `url(${variants.thumb})` : undefined,
        backgroundSize: !contain && !viewerMode ? 'cover' : undefined,
        backgroundPosition: 'center',
        ...style
    };

    // Background full-res swap logic (unchanged)
    useEffect(() => {
        if (!visible) return;
        const imgEl = imgRef.current;
        if (!imgEl) return;

        function onMainLoad() {
            setLoaded(true);
            if (fullSrc && !usingFull) {
                const encodedFull = encodeURI(fullSrc);
                if (encodedFull === imgEl.src) return;
                const bg = new Image();
                bg.onload = () => {
                    try {
                        imgEl.src = encodedFull;
                        setUsingFull(true);
                        setLoaded(true);
                    } catch (e) { /* ignore */ }
                };
                bg.src = encodedFull;
            }
        }

        if (imgEl.complete && imgEl.naturalWidth !== 0) {
            onMainLoad();
        } else {
            imgEl.addEventListener('load', onMainLoad, { once: true });
            imgEl.addEventListener('error', () => setLoaded(true), { once: true });
        }

        return () => {
            if (imgEl) imgEl.removeEventListener('load', onMainLoad);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible, fullSrc, usingFull]);

    // Strong override: if viewerMode is set, enforce final computed styles on the <img> element
    useEffect(() => {
        if (!viewerMode) return;
        const el = imgRef.current;
        if (!el) return;
        // set inline styles with highest priority (overrides most CSS)
        el.style.width = 'auto';
        el.style.height = 'auto';
        el.style.maxWidth = '90vw';
        el.style.maxHeight = '90vh';
        el.style.objectFit = 'contain';
        el.style.display = 'block';
        // Also remove any width/height attributes or classes that might force sizing
        el.removeAttribute('width');
        el.removeAttribute('height');
    }, [viewerMode, visible]); // run again when image becomes visible

    return (
        <div ref={wrapperRef} className={`lazy-image ${className}`} style={wrapperStyle}>
            {visible ? (
                <picture>
                    {webpSrcSet && <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />}
                    {jpgSrcSet && <source type="image/jpeg" srcSet={jpgSrcSet} sizes={sizes} />}
                    <img
                        ref={imgRef}
                        src={encodeURI(initialImgSrc)}
                        alt={alt}
                        sizes={sizes}
                        decoding="async"
                        loading="lazy"
                        style={viewerMode ? imgStyleViewer : (contain ? imgStyleContain : imgStyleCover)}
                    />
                </picture>
            ) : (
                <div aria-hidden style={{ width: '100%', height: '100%' }} />
            )}
        </div>
    );
}
