import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface EmotionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  bgGradient: string;
}

const EmotionCard = ({ title, description, icon: Icon, gradient, bgGradient }: EmotionCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`
        bg-gradient-to-br ${bgGradient}
        rounded-xl p-6 backdrop-blur-sm
        border border-white/20 shadow-lg
        hover:shadow-xl transition-all duration-300
        cursor-pointer h-[120px] flex items-center
      `}
    >
      <div className="flex items-center gap-4">
        <div className={`
          bg-gradient-to-br ${gradient}
          w-12 h-12 rounded-xl
          flex items-center justify-center
          shadow-lg flex-shrink-0
        `}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default EmotionCard;