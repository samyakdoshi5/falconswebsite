// Home.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Users, Target } from 'lucide-react';
import {
  HERO_DATA,
  ABOUT_DATA,
  DEPARTMENTS_DATA,
  STATS_DATA,
  SPONSORS_LOGOS,
} from '../data.js';

// === Reveal helper (unchanged behaviour) ===
const Reveal = ({ children, delay = 0, duration = 0.5, amount = 0.1 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount });

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration, delay } },
  };

  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
      {children}
    </motion.div>
  );
};

// === Constants ===
const HERO_VIDEO_ASPECT = 16 / 9; // adjust if you know the real aspect ratio
const posterHideDelayMs = 200; // slight delay after 'playing' event before starting fade
const posterFadeDurationMs = 700; // fade duration in ms
const VIMEO_SDK_SRC = 'https://player.vimeo.com/api/player.js';

// === Home component ===
const Home = () => {
  const heroRef = useRef(null);
  const iframeRef = useRef(null);
  const vimeoPlayerRef = useRef(null); // store Vimeo.Player instance
  const sdkScriptRef = useRef(null); // store script element so we can cleanup if needed

  const [videoLoaded, setVideoLoaded] = useState(false); // set when player reports playing
  const [posterVisible, setPosterVisible] = useState(true);

  // Compute and apply width so that the iframe's height exactly matches the hero height.
  const fitToHeight = () => {
    const hero = heroRef.current;
    const iframe = iframeRef.current;
    if (!hero || !iframe) return;

    const heroRect = hero.getBoundingClientRect();
    const heroHeight = heroRect.height;
    const containerWidth = heroRect.width;

    const requiredWidth = Math.ceil(heroHeight * HERO_VIDEO_ASPECT);
    const appliedWidth = Math.max(requiredWidth, containerWidth);

    iframe.style.height = `${heroHeight + 210}px`; //KEEP 210.
    iframe.style.width = `${appliedWidth}px`;
    iframe.style.position = 'absolute';
    iframe.style.top = '50%';
    iframe.style.left = '50%';
    iframe.style.transform = 'translate(-50%, -50%)';
    iframe.style.pointerEvents = 'none';
  };

  // Dynamically load the Vimeo SDK and create a player
  useEffect(() => {
    let cancelled = false;
    const iframeEl = iframeRef.current;

    // helper to attach the SDK and init player
    const attachPlayer = () => {
      if (!iframeEl) return;

      try {
        // eslint-disable-next-line no-undef
        const Player = window.Vimeo && window.Vimeo.Player ? window.Vimeo.Player : null;
        if (!Player) return;

        // create player if not already created
        if (!vimeoPlayerRef.current) {
          vimeoPlayerRef.current = new window.Vimeo.Player(iframeEl);

          // when playback truly starts
          vimeoPlayerRef.current.on('playing', () => {
            // mark loaded and fade the poster after a short delay for safety
            setVideoLoaded(true);
            setTimeout(() => {
              setPosterVisible(false);
            }, posterHideDelayMs);
          });

          // fallback: when video is loaded (metadata) but not playing, still fit and allow poster removal if necessary
          vimeoPlayerRef.current.on('loaded', () => {
            // ensure sizing is correct
            fitToHeight();
          });

          // optionally listen for 'error' to remove poster or show fallback
          vimeoPlayerRef.current.on('error', () => {
            // If player errors, we remove the poster so it doesn't block the UI
            setVideoLoaded(false);
            setPosterVisible(false);
          });
        }
      } catch (e) {
        // ignore — we'll still have the poster as fallback
        // console.warn('Vimeo Player init error', e);
      }
    };

    // If SDK already present, attach immediately
    if (window.Vimeo && window.Vimeo.Player) {
      attachPlayer();
    } else {
      // create script tag to load SDK
      const s = document.createElement('script');
      s.src = VIMEO_SDK_SRC;
      s.async = true;
      s.onload = () => {
        if (!cancelled) attachPlayer();
      };
      s.onerror = () => {
        // SDK failed to load — keep poster visible as fallback
        // console.error('Failed to load Vimeo SDK');
      };
      document.body.appendChild(s);
      sdkScriptRef.current = s;
    }

    return () => {
      cancelled = true;
      // cleanup player if created
      if (vimeoPlayerRef.current) {
        try {
          vimeoPlayerRef.current.unload && vimeoPlayerRef.current.unload();
          vimeoPlayerRef.current.off && vimeoPlayerRef.current.off('playing');
          vimeoPlayerRef.current.off && vimeoPlayerRef.current.off('loaded');
          vimeoPlayerRef.current = null;
        } catch (e) {
          // ignore cleanup errors
        }
      }
      // remove injected SDK script if we added it (optional)
      if (sdkScriptRef.current) {
        sdkScriptRef.current.remove();
        sdkScriptRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // initial sizing + listeners for resize/hero resize
  useEffect(() => {
    // initial fit (will be run again when player reports loaded)
    fitToHeight();

    const onResize = () => fitToHeight();
    window.addEventListener('resize', onResize);

    const ro = new ResizeObserver(() => fitToHeight());
    if (heroRef.current) ro.observe(heroRef.current);

    return () => {
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Also keep a safety fallback: if the iframe fires onLoad (player frame loaded),
  // ensure we fit the height and show 'videoLoaded' (but do not hide poster early).
  // This helps in environments where SDK events are delayed.
  useEffect(() => {
    const iframeEl = iframeRef.current;
    if (!iframeEl) return;

    const onIframeLoad = () => {
      // ensure sizing
      fitToHeight();
      // don't hide poster here—wait for the 'playing' event from the SDK.
    };

    iframeEl.addEventListener('load', onIframeLoad);
    return () => iframeEl.removeEventListener('load', onIframeLoad);
  }, []);

  // poster fade state effect: posterVisible toggles opacity via inline styles (transition)
  // keep videoLoaded for other UI reasons if needed

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section ref={heroRef} className="h-screen relative flex items-center justify-center overflow-hidden">
        {/* Poster image (visible until player reports 'playing') */}
        <div
          aria-hidden={posterVisible ? 'false' : 'true'}
          className={`absolute inset-0 z-30 pointer-events-none`}
          style={{
            backgroundImage: `url(${HERO_DATA.posterImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: posterVisible ? 1 : 0,
            transitionProperty: 'opacity',
            transitionDuration: `${posterFadeDurationMs}ms`,
            transitionTimingFunction: 'ease-out',
          }}
        />

        {/* iframe container (video will be absolutely centered; width set by fitToHeight) */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <iframe
            ref={iframeRef}
            title="showreel"
            src="https://player.vimeo.com/video/1138982710?background=1&autoplay=1&muted=1&loop=1&autopause=0&player_id=0"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            style={{
              width: '100%', // initial fallback; fitToHeight will override
              height: '100%', // initial fallback; fitToHeight will override
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* startup overlay to hide player's initial UI flash; fades when videoLoaded */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
            } z-20`}
        />

        {/* permanent dark overlay to keep text readable */}
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply pointer-events-none z-40" />

        {/* 🎨 New element: Gradient blur at the bottom for smooth scroll transition */}
        <div  
          className="absolute bottom-0 inset-x-0 h-12 z-[45] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to top, var(--global-background-color, #0f172a) 10%, transparent 100%)',
          }}s
        />  

        {/* Hero Content - moved *under* the header by lowering z-index and adding top padding */}
        <div className="relative z-[46] text-center px-4 max-w-4xl pt-20 md:pt-24">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            {HERO_DATA.titleStart}{' '}
            <span className="bg-gradient-to-r from-brand-highlight to-tech-accent bg-clip-text text-transparent">
              {HERO_DATA.titleHighlight}
            </span>
          </motion.h1>

          <p className="text-xl text-gray-300 mb-8 font-light">{HERO_DATA.subtitle}</p>

          <a
            href={HERO_DATA.brochureLink}
            download
            className="inline-flex items-center bg-gradient-to-r from-tech-accent to-brand-highlight text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-white/10"
          >
            <Download className="mr-2" size={20} /> {HERO_DATA.buttonText}
          </a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-10 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <Reveal duration={0.5} delay={0.1}>
            <div className="bg-card-gradient bg-opacity-80 border border-slate-700 p-8 rounded-2xl hover:border-tech-gold transition duration-300">
              <div className="flex items-center mb-4">
                <Users size={32} color="#E3AF64" />
                <h2 className="text-3xl font-bold ml-3 text-tech-gold">{ABOUT_DATA.teamTitle}</h2>
              </div>

              <p className="text-slate-300 leading-relaxed">{ABOUT_DATA.teamText}</p>
            </div>
          </Reveal>

          <Reveal duration={0.5} delay={0.1}>
            <div className="bg-card-gradient bg-opacity-80 border border-slate-700 p-8 rounded-2xl hover:border-tech-gold transition duration-300">
              <div className="flex items-center mb-4">
                <Target size={32} color="#E3AF64" />
                <h2 className="text-3xl font-bold ml-3 text-tech-gold">{ABOUT_DATA.missionTitle}</h2>
              </div>
              <p className="text-slate-300 leading-relaxed">{ABOUT_DATA.missionText}</p>
            </div>
          </Reveal>
        </div>
        {/* </Reveal> */}
      </section>

      {/* DEPARTMENTS SECTION */}
      <section className="py-10 relative">
        <div className="container mx-auto px-6">
          <Reveal duration={0.5} delay={0.15}>
            <h2 className="text-4xl font-bold text-center mb-12 text-tech-gold">Our Departments</h2>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-6">
            {DEPARTMENTS_DATA.map((dept, idx) => (
              <Reveal delay={0.1} duration={0.5} amount={0.2}>
                <div className="bg-card-gradient p-6 rounded-xl text-center hover:-translate-y-2 transition duration-300 shadow-lg border-t-4 border-transparent hover:border-tech-gold">
                  <dept.icon size={40} className="mx-auto mb-4 text-slate-400" color="#E3AF64" />
                  <h3 className="text-xl font-bold text-white mb-2">{dept.title}</h3>
                  <p className="text-md text-slate-400">{dept.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-10 container mx-auto px-6">
        <Reveal delay={0.15} duration={0.5}>
          <h2 className="text-4xl font-bold text-center mb-12 text-tech-gold">Team Statistics</h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {STATS_DATA.map((stat, idx) => (
            <Reveal key={idx} delay={0.1} duration={0.5}>
              <div className="bg-card-gradient bg-opacity-70 border border-slate-700 p-6 rounded-xl hover:border-tech-gold transition duration-300 shadow-lg">
                <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider text-tech-gold">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SPONSORS SECTION */}
      <section className="py-5 relative">
        <div className="container mx-auto px-6 mb-8 text-center">
          <Reveal delay={0.15} duration={0.5}>
            <h2 className="text-4xl font-bold text-center mb-12 text-tech-gold">Our Sponsors</h2>
          </Reveal>
        </div>

        <Reveal delay={0.15} duration={0.5}>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-8 max-w-8xl mx-auto px-6">
            {SPONSORS_LOGOS.map((sponsor, i) => (
              <Reveal key={i} delay={0.05} duration={0.5} once={false}>
                <a href={sponsor.websiteUrl} target="_blank" rel="noopener noreferrer" className="block transform transition hover:scale-105">
                  <img
                    src={sponsor.logoUrl}
                    alt={`Sponsor ${i + 1}`}
                    className="h-16 max-w-[250px] grayscale-0 opacity-70 hover:opacity-100 transition duration-300 rounded-lg"
                  />
                </a>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Home;