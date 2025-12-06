import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { TEAM_INFO, CONTACT_CONFIG } from '../data';

const ContactUs = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 container mx-auto">
      
      {/* HEADER WITH DRAMATIC GOLD GLOW */}
      <div className="mb-12 text-center relative py-6">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 pointer-events-none"></div>

        <h1 className="text-4xl md:text-5xl font-bold text-tech-gold relative z-10">
          Get In Touch
        </h1>
        <p className="text-slate-400 mt-2">{CONTACT_CONFIG.introText}</p>
      </div>

      {/* CONTENT PANEL WITH FLAGSHIPS GRADIENT BACKGROUND */}
      <div className="
        flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto 
        bg-card-gradient bg-opacity-80 rounded-2xl p-10
        border border-slate-700 shadow-2xl backdrop-blur
      ">

        {/* LEFT: CONTACT DETAILS */}
        <div className="lg:w-1/3 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Contact Us
            </h3>
            <div className="space-y-6">

              <div className="flex items-start space-x-4 text-slate-300">
                <Mail className="text-tech-gold mt-1" />
                <div>
                  <p className="font-bold text-white">Email</p>
                  <p>{TEAM_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 text-slate-300">
                <Phone className="text-tech-gold mt-1" />
                <div>
                  <p className="font-bold text-white">Phone</p>
                  <p>{TEAM_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 text-slate-300">
                <MapPin className="text-tech-gold mt-1" />
                <div>
                  <p className="font-bold text-white">Address</p>
                  <p className="whitespace-pre-line">{TEAM_INFO.address}</p>
                </div>
              </div>

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

            {/* NAME + PHONE */}
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

            {/* EMAIL */}
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

            {/* SUBJECT */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                className="w-full bg-tech-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-tech-gold outline-none transition"
                placeholder="Your Subject"
              />
            </div>

            {/* MESSAGE */}
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

            {/* BUTTON — GOLD ACCENT LIKE FLAGSHIPS */}
            <button
              type="submit"
              className="w-full bg-tech-gold hover:bg-tech-gold/80 text-black font-bold py-3 px-6 rounded-lg flex items-center justify-center transition transform hover:scale-[1.02] shadow-[0_8px_25px_-6px_rgba(227,175,100,0.45)]"
            >
              <Send size={18} className="mr-2" /> Send Message
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
