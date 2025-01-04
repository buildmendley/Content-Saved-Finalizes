import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: string;
  timestamp: number;
  images?: Array<{ src: string; timestamp: Date }>;
}

interface JournalGridProps {
  entries: JournalEntry[];
}

const colors = [
  'from-rose-100 to-pink-200',
  'from-blue-100 to-indigo-200',
  'from-green-100 to-emerald-200',
  'from-amber-100 to-yellow-200',
  'from-purple-100 to-violet-200'
];

const JournalGrid = ({ entries }: JournalGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {entries.map((entry, index) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-gradient-to-br ${colors[index % colors.length]} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-rotate-1 hover:scale-[1.02] cursor-pointer`}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {format(entry.timestamp, 'MMM d, yyyy')}
              </span>
            </div>
            <span className="text-2xl">{entry.mood}</span>
          </div>

          {/* Content */}
          <h3 className="font-bold text-gray-800 mb-2">{entry.title}</h3>
          <p className="text-gray-700 line-clamp-3 mb-4">{entry.content}</p>

          {/* Images */}
          {entry.images && entry.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {entry.images.slice(0, 2).map((image, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={image.src}
                    alt="Journal attachment"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default JournalGrid;