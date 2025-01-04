import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WeeklyReport = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate('/weekly-report')}
      whileHover={{ scale: 1.02 }}
      className="relative w-full h-[300px] overflow-hidden rounded-2xl bg-gradient-to-br from-rose-100/20 to-pink-200 backdrop-blur-sm border border-white/10 flex items-center justify-center"
    >
      <div className="text-center">
        <div className="flex flex-col items-center gap-4">
          <Calendar className="w-12 h-12 text-rose-800" />
          <div>
            <h3 className="font-bold text-rose-800 text-2xl mb-2">Weekly Progress Tracker</h3>
            <p className="text-rose-800 text-lg">View your weekly insights</p>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default WeeklyReport;