
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const features = [
  {
    id: 'ana',
    title: "Ana",
    description: "Your AI companion for emotional support and guidance",
    icon: "/icons/ana-icon.svg",
    gradient: "from-rose-400 to-pink-600",
    bgGradient: "from-rose-500/70 to-pink-100/70",
    hoverGradient: "from-rose-100/90 to-pink-200/90",
    textColor: "text-rose-900",
    textColorSecondary: "text-rose-800",
    delay: 0,
    path: "/ana"
  },
  {
    id: 'mind-palace',
    title: "Mind Palace",
    description: "Your personal sanctuary for mindfulness and reflection",
    icon: "/icons/mind-palace-icon.svg",
    gradient: "from-violet-700 to-purple-200",
    bgGradient: "from-violet-700/70 to-purple-100/70",
    hoverGradient: "from-violet-100/90 to-purple-200/90",
    textColor: "text-violet-900",
    textColorSecondary: "text-violet-800",
    delay: 0.1,
    path: "/mind-palace"
  },
  {
    id: 'journal',
    title: "Journal",
    description: "AI-powered journaling for emotional growth",
    icon: "/icons/journal-icon.svg",
    gradient: "from-teal-400 to-emerald-600",
    bgGradient: "from-teal-500/70 to-emerald-100/70",
    hoverGradient: "from-teal-100/90 to-emerald-200/90",
    textColor: "text-teal-900",
    textColorSecondary: "text-teal-800",
    delay: 0.2,
    path: "/journal"
  }
];

const HeroFeatures = () => {
  return (
    <div className="py-8">
      <div className="grid grid-cols-3 gap-8">
        {features.map((feature) => (
          <Link key={feature.id} to={feature.path}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className={`
                group cursor-pointer h-[400px]
                bg-gradient-to-br ${feature.bgGradient}
                hover:bg-gradient-to-br hover:${feature.hoverGradient}
                backdrop-blur-sm rounded-2xl
                border border-white/20
                shadow-lg hover:shadow-xl
                transition-all duration-300
                relative overflow-hidden
                flex flex-col items-center justify-center
                p-8
              `}
            >
              <div className="absolute inset-0 opacity-5">
                <img 
                  src={feature.icon} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className={`
                bg-gradient-to-br ${feature.gradient}
                w-24 h-24 rounded-2xl
                flex items-center justify-center mb-8
                shadow-lg group-hover:scale-110 
                transition-transform duration-300
                relative z-10
              `}>
                <img src={feature.icon} alt="" className="w-12 h-12" />
              </div>
              
              <h2 className={`
                text-3xl font-bold mb-4
                ${feature.textColor}
                text-center relative z-10
                group-hover:translate-y-[-2px]
                transition-transform duration-300
              `}>
                {feature.title}
              </h2>
              
              <p className={`
                ${feature.textColorSecondary}
                text-center text-lg
                relative z-10
                group-hover:translate-y-[-2px]
                transition-transform duration-300
                max-w-xs
              `}>
                {feature.description}
              </p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroFeatures;