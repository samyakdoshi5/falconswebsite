import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TEAM_INFO } from "../data";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Flagships", path: "/flagships" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact Us", path: "/contact" },
];

const backdropVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.28 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const panelVariant = {
  hidden: { y: -12, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: { y: -8, opacity: 0, transition: { duration: 0.18 } },
};

const itemsVariant = {
  hidden: { opacity: 0, y: -6 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.04 * i, duration: 0.22 },
  }),
};

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const firstLinkRef = useRef(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // close on Escape and focus management
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      // focus first link (small a11y improvement)
      setTimeout(() => firstLinkRef.current?.focus?.(), 0);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    // header root: fixed and above page content; has its own semi-transparent bg + small blur
    <header
      className="
        fixed top-0 left-0 w-full z-50
        bg-slate-900/20 backdrop-blur-sm
        border-b border-slate-700 shadow-xl
      "
    >
      {/* Header inner wrapper — keep this above the backdrop when menu opens */}
      <div
        className={`w-full px-6 py-3 sm:py-4 flex justify-between items-center max-w-7xl mx-auto ${
          isOpen ? "relative z-[60]" : "relative z-50"
        }`}
      >
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-2xl font-bold text-white tracking-wider hover:text-tech-accent transition"
        >
          <img
            src={TEAM_INFO.logo}
            alt={`${TEAM_INFO.shortName} Logo`}
            className="h-8 sm:h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.path;
            return (
              // wrapper enables group-hover for the underline span
              <div key={link.name} className="relative group">
                <Link
                  to={link.path}
                  className={`
                    relative text-slate-300 font-medium transition-colors
                    hover:text-tech-gold
                    ${active ? "text-tech-gold" : ""}
                    px-0
                  `}
                >
                  {link.name}

                  {/* Underline: center-out animation on hover, full when active */}
                  <span
                    className={`
                      absolute left-1/2 -bottom-1 h-[2px] bg-tech-gold transition-all duration-300 ease-out
                      ${active ? "w-full -translate-x-1/2" : "w-0 -translate-x-1/2 group-hover:w-full"}
                    `}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Mobile Menu Button (in header wrapper so it stays above backdrop) */}
        <button
          className="md:hidden text-white hover:text-tech-gold transition p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tech-gold"
          onClick={() => setIsOpen((s) => !s)}
          aria-controls="mobile-nav"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --------------------------------------------
          Full-page backdrop (blurs the page content).
          This sits UNDER the menu panel, so it blurs the page
          but not the header/menu UI which are above it.
          Use framer-motion for a smooth fade.
          -------------------------------------------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariant}
            onClick={() => setIsOpen(false)}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "rgba(15, 23, 42, 0.36)",
                WebkitBackdropFilter: "blur(8px)",
                backdropFilter: "blur(8px)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- Mobile Menu Panel (above backdrop) ---------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            key="panel"
            className="md:hidden absolute top-full left-0 w-full z-[55] pointer-events-auto"
            role="dialog"
            aria-modal="true"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariant}
          >
            <nav
              className="
                flex flex-col py-4 px-6 space-y-2 max-w-6xl mx-auto
                bg-slate-800/80 backdrop-blur-md border-t border-slate-700
              "
            >
              {NAV_LINKS.map((link, idx) => {
                const active = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.name}
                    custom={idx}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={itemsVariant}
                  >
                    <Link
                      ref={idx === 0 ? firstLinkRef : undefined}
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`
                        block py-3 px-2 rounded-md transition-colors
                        ${active
                          ? "text-tech-gold font-semibold bg-white/5"
                          : "text-slate-200 hover:text-tech-gold hover:bg-white/10"
                        }
                      `}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
