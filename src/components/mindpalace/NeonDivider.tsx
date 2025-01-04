import React from 'react';
import { motion } from 'framer-motion';

const NeonDivider = () => {
  return (
    <div className="relative w-[2px] h-[900px]">
      {/* Main glow line */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/90 to-transparent"
        style={{
          boxShadow: '0 0 15px #3b82f6, 0 0 300px #3b82f6, 0 0 45px #3b82f6',
        }}
      />
      
      
    </div>
  );
};

export default NeonDivider;