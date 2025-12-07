// src/pages/ContactUs.jsx
import React from 'react';
import { motion } from 'framer-motion'; // <-- Import motion
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { TEAM_INFO, CONTACT_CONFIG } from '../data';

const ContactUs = () => {
  // Define initial/animate properties for immediate visibility animation (matches Flagships.jsx)
  const immediateVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 container mx-auto">
      
      {/* HEADER WITH DRAMATIC GOLD GLOW - Apply animation */}
      <motion.div 
        className="mb-12 text-center relative py-6"
        initial="initial"
        animate="animate"
        variants={immediateVariants}
        transition={{ duration: 0.6, delay: 0.1 }} // Slightly delayed fade-in
      >
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-tech-gold blur-[110px] opacity-20 pointer-events-none"></div>

        <h1 className="text-4xl md:text-5xl font-bold text-tech-gold relative z-10">
          Get In Touch
        </h1>
        <p className="text-slate-400 mt-2">{CONTACT_CONFIG.introText}</p>
      </motion.div>

      {/* CONTENT PANEL - Apply animation to the main container */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={immediateVariants}
        transition={{ duration: 0.5, delay: 0.3 }} // Delay after header
        className="
          flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto 
          bg-card-gradient bg-opacity-80 rounded-2xl p-10
          border border-slate-700 shadow-2xl backdrop-blur
        "
      >

        {/* LEFT: CONTACT DETAILS */}
        <div className="lg:w-1/3 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Contact Us
            </h3>
            <div className="space-y-6">

              {/* Email Link with whileHover animation */}
              <motion.a 
                href={`mailto:${TEAM_INFO.email}`} 
                whileHover={{ x: 5 }} // Slight move on hover
                className="flex items-start space-x-4 text-slate-300 group transition duration-200 cursor-pointer"
              >
                <Mail className="text-tech-gold mt-1 group-hover:scale-[1.1] transition" />
                <div>
                  <p className="font-bold text-white group-hover:text-tech-gold transition">Email</p>
                  <p>{TEAM_INFO.email}</p>
                </div>
              </motion.a>

              {/* Phone Link with whileHover animation */}
              <motion.a 
                href={`tel:${TEAM_INFO.phone}`}
                whileHover={{ x: 5 }} // Slight move on hover
                className="flex items-start space-x-4 text-slate-300 group transition duration-200 cursor-pointer"
              >
                <Phone className="text-tech-gold mt-1 group-hover:scale-[1.1] transition" />
                <div>
                  <p className="font-bold text-white group-hover:text-tech-gold transition">Phone</p>
                  <p>{TEAM_INFO.phone}</p>
                </div>
              </motion.a>

              {/* Address with whileHover effect (for visual consistency) */}
              <motion.div 
                whileHover={{ x: 5 }} // Slight move on hover
                className="flex items-start space-x-4 text-slate-300 group transition duration-200"
              >
                <MapPin className="text-tech-gold mt-1 group-hover:scale-[1.1] transition" />
                <div>
                  <p className="font-bold text-white">Address</p>
                  <p className="whitespace-pre-line">{TEAM_INFO.address}</p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* RIGHT: CONTACT FORM */}
        <div className="lg:w-2/3">
          <form 
            action="https://formspree.io/f/mvglqqne"
            method="POST"
            className="space-y-6"
          >

            {/* Form Fields (no motion on inputs, but on the button) */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-tech-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-tech-gold outline-none transition"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full bg-tech-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-tech-gold outline-none transition"
                  placeholder="+91 00000 00000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-tech-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-tech-gold outline-none transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                className="w-full bg-tech-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-tech-gold outline-none transition"
                placeholder="Your Subject"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
              <textarea
                name="message"
                rows="4"
                required
                className="w-full bg-tech-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-tech-gold outline-none transition"
                placeholder="Your message..."
              ></textarea>
            </div>

            {/* BUTTON — Apply whileHover animation */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }} // Framer Motion hover effect
              whileTap={{ scale: 0.98 }} // Framer Motion tap/click effect
              className="w-full bg-tech-gold hover:bg-tech-gold/80 text-black font-bold py-3 px-6 rounded-lg flex items-center justify-center transition transform shadow-[0_8px_25px_-6px_rgba(227,175,100,0.45)]"
            >
              <Send size={18} className="mr-2" /> Send Message
            </motion.button>

          </form>
        </div>

      </motion.div>
    </div>
  );
};

export default ContactUs;