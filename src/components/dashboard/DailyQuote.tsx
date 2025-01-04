import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { quotes } from '../../data/quotes';

const DailyQuote = () => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-24 mb-8 flex justify-center"
    >
      <div className="bg-gradient-to-br from-blue-50/90 to-purple-50/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 max-w-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gradient-to-br from-blue-400 to-purple-600 p-2 rounded-xl shadow-lg">
            <Quote className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-center font-semibold text-gray-900">Quote of the Day</h2>
        </div>
        
        <blockquote className="relative">
          <p className="text-lg text-gray-800 mb-3">
            {quote.text}
          </p>
          <footer className="text-right text-gray-600 font-medium">
            — {quote.author}
          </footer>
        </blockquote>
      </div>
    </motion.div>
  );
};

export default DailyQuote;