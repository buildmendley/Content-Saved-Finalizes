import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import TimeRangeSelector from '../components/emotrack/TimeRangeSelector';
import EmotionBarChart from '../components/emotrack/EmotionBarChart';
import EmotionPieChart from '../components/emotrack/EmotionPieChart';
import DailyInsights from '../components/emotrack/DailyInsights';
import chatInteractions from '../../data/chat_interaction_analysis.json';
import { analyzeEmotionalData } from '../utils/analysis';
import { ChatInteractionAnalysis } from '../types/analysis';

interface DateRange {
  start: Date;
  end: Date;
}

const EmoTrackPage = ({ onClose }: { onClose: () => void }) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date()
  });
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [emotionalData, setEmotionalData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const filteredData = chatInteractions.filter((interaction: ChatInteractionAnalysis) => {
          const interactionDate = new Date(interaction.date);
          return interactionDate >= dateRange.start && interactionDate <= dateRange.end;
        });

        const analysis = await analyzeEmotionalData(filteredData);
        setEmotionalData(analysis);
        
        if (!selectedDate && filteredData.length > 0) {
          setSelectedDate(filteredData[0].date);
        }
      } catch (error) {
        console.error('Error analyzing emotional data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    setSelectedDate('');
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex justify-center items-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-dark"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 max-h-[80vh] overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Emotion Tracking</h2>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Date Range Selector */}
      <div className="mb-8">
        <TimeRangeSelector 
          value={dateRange} 
          onChange={handleDateRangeChange}
          presets={[
            { label: '7 Days', days: 7 },
            { label: '15 Days', days: 15 },
            { label: '30 Days', days: 30 }
          ]}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Emotional Journey</h3>
          <EmotionBarChart 
            data={emotionalData?.dailyEmotions || []}
            colors={emotionalData?.emotionColors || {}}
            onDateSelect={setSelectedDate}
          />
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            Overall Emotional Distribution
          </h3>
          <EmotionPieChart 
            data={emotionalData?.overallEmotions}
            colors={emotionalData?.emotionColors}
          />
        </div>
      </div>

      {/* Daily Insights */}
      {selectedDate && (
        <DailyInsights
          date={selectedDate}
          insights={emotionalData?.dailyInsights?.[selectedDate]}
        />
      )}
    </motion.div>
  );
};

export default EmoTrackPage;