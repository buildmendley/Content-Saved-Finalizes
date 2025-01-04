import React, { useState } from 'react';
import { MessageCircle, Brain } from 'lucide-react';
import MindSoulChat from './MindSoulChat';

const ChatSection = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'speak'>('chat');

  return (
    <div className="space-y-2">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-violet-400/20  to-violet-400/20 p-8 rounded-2xl backdrop-blur-sm border border-white/10 opacity-100 ">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-gradient-to-br from-violet-400 to-purple-600 p-4 rounded-xl shadow-lg">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Reflect Within</h2>
          <p className="text-white/80">Uncover Your Thoughts and Emotions</p>
        </div>
      </div>

      {/* Tabs with different gradients */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab('chat')}
          className={`
            px-8 py-3 rounded-xl font-medium transition-all duration-300
            ${activeTab === 'chat'
              ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg scale-105'
              : 'bg-white/10 text-white/80 hover:bg-white/20'
            }
          `}
        >
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Chat
          </div>
        </button>
        <button
          onClick={() => setActiveTab('speak')}
          className={`
            px-8 py-3 rounded-xl font-medium transition-all duration-300
            ${activeTab === 'speak'
              ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg scale-105'
              : 'bg-white/10 text-white/80 hover:bg-white/20'
            }
          `}
        >
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Speak
          </div>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'chat' ? (
        <MindSoulChat />
      ) : (
        <div className="relative max-w-2xl mx-auto z-10 mt-24">
          <div className="bg-gradient-to-br from-rose-100/20 via-pink-200/20 to-rose-100/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/10">
            <div className="min-h-[400px] flex items-center justify-center">
              <p className="text-white/80 text-lg">Voice chat coming soon...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSection;