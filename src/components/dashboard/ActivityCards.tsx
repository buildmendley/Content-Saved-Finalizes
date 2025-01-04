import React from 'react';
import { Wind, Music, Gamepad, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const activities = [
  {
    icon: <Wind className="w-5 h-5 text-white" />,
    title: 'Quick Relax',
    description: 'Simple breathing exercises',
    duration: '3-5 min',
    iconBg: 'bg-gradient-to-br from-purple-400 to-purple-600',
    cardBg: 'bg-gradient-to-br from-purple-50/90 to-purple-100/90',
    path: '/activities/quick-relax'
  },
  {
    icon: <Music className="w-5 h-5 text-white" />,
    title: 'Calming Songs',
    description: 'Peaceful melodies',
    duration: '∞ mins',
    iconBg: 'bg-gradient-to-br from-teal-400 to-teal-600',
    cardBg: 'bg-gradient-to-br from-teal-50/90 to-teal-100/90',
    path: '/activities/calming-songs'
  },
  {
    icon: <Gamepad className="w-5 h-5 text-white" />,
    title: 'Mindful Games',
    description: 'Stress-relief activities',
    duration: '5-15 min',
    iconBg: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
    cardBg: 'bg-gradient-to-br from-indigo-50/90 to-indigo-100/90',
    path: '/activities/mindful-games'
  },
  {
    icon: <Sparkles className="w-5 h-5 text-white" />,
    title: 'Mood Twisters',
    description: 'Mindset exercises',
    duration: '2-5 min',
    iconBg: 'bg-gradient-to-br from-rose-400 to-rose-600',
    cardBg: 'bg-gradient-to-br from-rose-50/90 to-rose-100/90',
    path: '/activities/mood-twisters'
  }
];

const ActivityCards = () => {
  return (
    <div className="mt-32"> {/* Increased top margin */}
      <h2 className="text-lg font-semibold text-text-primary mb-2">Serene Sanctuary</h2>
      <p className="text-text-secondary text-sm mb-4">Discover Your Moment of Serenity</p>
      <div className="grid grid-cols-4 gap-4">
        {activities.map((activity, index) => (
          <Link
            key={index}
            to={activity.path}
            className={`${activity.cardBg} backdrop-blur-sm rounded-xl p-4 shadow hover:scale-[1.02] transition-all duration-300 border border-white/50`}
          >
            <div className={`${activity.iconBg} w-8 h-8 rounded-lg flex items-center justify-center mb-3 shadow-lg`}>
              {activity.icon}
            </div>
            <h3 className="text-text-primary text-sm font-semibold mb-1">{activity.title}</h3>
            <p className="text-text-secondary text-xs mb-2">{activity.description}</p>
            <span className="text-text-muted text-xs">{activity.duration}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ActivityCards;