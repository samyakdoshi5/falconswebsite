import React from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

const GlobalLoader = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-tech-900/95 backdrop-blur-sm flex items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="text-tech-accent"
            >
                {/* The size is large to draw attention */}
                <Loader size={64} />
            </motion.div>
            <p className="sr-only">Loading content...</p>
        </div>
    );
};

export default GlobalLoader;