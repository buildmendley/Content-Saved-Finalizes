import React from 'react';
import { Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const EmoTrack = () => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="relative h-[300px] overflow-hidden rounded-2xl bg-gradient-to-br from-violet-200/40 to-purple-400 backdrop-blur-sm border border-white/10 flex items-center justify-center"
    >
      <div className="text-center">
        <div className="flex flex-col items-center gap-4">
          <Brain className="w-12 h-12 text-white/90" />
          <div>
            <h3 className="font-bold text-white/90 text-2xl mb-2">Emotion Track</h3>
            <p className="text-white/90 text-lg">Track your emotional journey</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmoTrack;
