import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format, startOfWeek, addDays, isToday } from 'date-fns';
import { getUser } from '../../utils/auth';

const DateSelector = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const user = getUser();
  const userName = user?.name || 'Friend';

  const getWeekDays = (date: Date) => {
    const start = startOfWeek(date);
    return Array.from({ length: 7 }, (_, i) => {
      const day = addDays(start, i);
      return {
        date: day,
        day: format(day, 'd'),
        label: format(day, 'EEEEE'),
        active: format(day, 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd'),
        isToday: isToday(day)
      };
    });
  };

  const [weekDays, setWeekDays] = useState(getWeekDays(currentDate));

  const handlePrevWeek = () => {
    const newDate = addDays(currentDate, -7);
    setCurrentDate(newDate);
    setWeekDays(getWeekDays(newDate));
  };

  const handleNextWeek = () => {
    const newDate = addDays(currentDate, 7);
    setCurrentDate(newDate);
    setWeekDays(getWeekDays(newDate));
  };

  const handleDateClick = (date: Date) => {
    setCurrentDate(date);
    setWeekDays(getWeekDays(date));
  };

  return (
    <div className="flex justify-between items-start gap-8 mb-6">
      {/* Daily Star Section - Left Side */}
      <div className="w-1/4">
        <button
          onClick={() => navigate('/daily-star')}
          className="w-full bg-gradient-to-br from-indigo-500 to-purple-600 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-lg hover:shadow-xl transition transform hover:scale-[1.02]"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-white">Daily Star</h2>
            <div className="relative">
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-indigo-600 text-xs rounded-full flex items-center justify-center font-bold">
                7
              </span>
              <span className="text-yellow-300 text-xl">⭐</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-white/90">
              <span>Current streak</span>
              <span className="font-medium">7 days 🎉</span>
            </div>
            
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"
                style={{ width: '70%' }}
              />
            </div>
          </div>
        </button>
      </div>

      {/* Welcome Message - Middle */}
      <div className="w-2/4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Welcome back, {userName}!
        </h1>
        <p className="text-text-secondary text-center">
         Your Emotional Journey is Important. Let's Make Today Meaningful.
        </p>
      </div>

      {/* Calendar Section - Right Side */}
      <div className="w-1/4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-gray-800">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={handlePrevWeek}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button 
              onClick={handleNextWeek}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="flex justify-between">
          {weekDays.map(({ date, day, label, active, isToday }) => (
            <div
              key={day}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleDateClick(date)}
            >
              <span className="text-xs font-medium text-gray-500 mb-1">{label}</span>
              <div className={`
                w-8 h-8 flex items-center justify-center rounded-full text-sm
                transition-all duration-300
                ${active 
                  ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium shadow-lg' 
                  : isToday
                    ? 'bg-gradient-to-r from-ocean-light to-ocean text-white font-medium shadow-md ring-2 ring-ocean animate-pulse'
                    : 'text-gray-700 hover:bg-gray-100'
                }
              `}>
                {day}
                {isToday && (
                  <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-ocean"></span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateSelector;