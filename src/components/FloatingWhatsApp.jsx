import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

const WHATSAPP = 'https://wa.me/919110372978?text=Hi%2C%20I%20would%20like%20to%20book%20a%20bike%20service.';

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white text-[#36454F] text-sm font-semibold px-4 py-2 rounded-xl shadow-xl border border-gray-100 whitespace-nowrap"
          >
            💬 Book a Service on WhatsApp
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        id="floating-whatsapp-btn"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-green-400/40 hover:scale-110 transition-all active:scale-95"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-20" />
        <MessageCircle className="w-7 h-7 relative z-10" />
      </a>
    </div>
  );
}
