import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ChatContainer from '../components/mchat/layout/ChatContainer';
import ChatHeader from '../components/mchat/ChatHeader';
import MessageList from '../components/mchat/messages/MessageList';
import ChatInputArea from '../components/mchat/input/ChatInputArea';
import { useChat } from '../hooks/useChat';
import EveningReflection from '../components/dailystar/EveningReflection';

const DailyStarPage = () => {
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');
  const { messages, isLoading, sendMessage } = useChat('Morning Intention');

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-light via-ocean to-ocean-dark">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link 
          to="/dashboard" 
          className="inline-flex items-center text-white mb-8 hover:opacity-80 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        {/* Tabs */}
        <div className=" bg-gradient-to-br from-blue-500 to-purple-200 backdrop-blur-sm rounded-xl p-2 flex gap-2 mb-8 w-fit">
          <button
            onClick={() => setActiveTab('morning')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm
              ${activeTab === 'morning' 
                ? 'bg-white text-ocean-dark' 
                : 'text-white hover:bg-white/10'
              }
            `}
          >
            <Sun className="w-4 h-4" />
            Morning Intention
          </button>
          <button
            onClick={() => setActiveTab('evening')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm
              ${activeTab === 'evening' 
                ? 'bg-white text-ocean-dark' 
                : 'text-white hover:bg-white/10'
              }
            `}
          >
            <Moon className="w-4 h-4" />
            Evening Reflection
          </button>
        </div>

        {/* Content */}
        {activeTab === 'morning' ? (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg h-[600px]">
            <ChatHeader mode="Morning Intention" />
            <MessageList messages={messages} isLoading={isLoading} />
            <ChatInputArea 
              onSendMessage={sendMessage} 
              isLoading={isLoading}
              showEndSession={messages.length > 0}
            />
          </div>
        ) : (
          <EveningReflection />
        )}
      </main>
    </div>
  );
};

export default DailyStarPage;