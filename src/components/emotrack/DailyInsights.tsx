import React from 'react';
import { format } from 'date-fns';

interface DailyInsightsProps {
  date: string;
  insights: {
    emotionalLandscape: string[];
    triggeringPoints: string[];
    actionableItems: Array<{
      title: string;
      description: string;
      priority: string;
    }>;
  };
}

const DailyInsights = ({ date, insights }: DailyInsightsProps) => {
  if (!insights) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      <h3 className="text-lg font-semibold">
        Insights for {format(new Date(date), 'MMMM d, yyyy')}
      </h3>
      
      {/* Emotional Landscape */}
      <div>
        <h4 className="font-medium text-gray-700 mb-2">Emotional Landscape</h4>
        <div className="flex flex-wrap gap-2">
          {insights.emotionalLandscape.map((emotion, index) => (
            <span key={index} className="bg-ocean-light/30 px-3 py-1 rounded-full text-ocean-dark">
              {emotion}
            </span>
          ))}
        </div>
      </div>

      {/* Triggering Points */}
      <div>
        <h4 className="font-medium text-gray-700 mb-2">Triggering Points</h4>
        <ul className="space-y-2">
          {insights.triggeringPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-600">
              <div className="w-1.5 h-1.5 bg-ocean-dark rounded-full mt-2 flex-shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Actionable Items */}
      <div>
        <h4 className="font-medium text-gray-700 mb-2">Actionable Items</h4>
        <div className="space-y-3">
          {insights.actionableItems.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-900">{item.title}</h5>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.priority === 'High' 
                    ? 'bg-red-100 text-red-800' 
                    : item.priority === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {item.priority}
                </span>
              </div>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyInsights;