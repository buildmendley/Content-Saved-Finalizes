import React, { useState } from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import OpenMindSection from '../components/ana/OpenMindSection';
import HandholdStepsSection from '../components/ana/HandholdStepsSection';
import ChatContainer from '../components/mchat/layout/ChatContainer';
import ChatHeader from '../components/mchat/ChatHeader';
import MessageList from '../components/mchat/messages/MessageList';
import ChatInputArea from '../components/mchat/input/ChatInputArea';
import { useChat } from '../hooks/useChat';

const AnaPage = () => {
  const [showChat, setShowChat] = useState(false);
  const [chatMode, setChatMode] = useState('Friend Chat');
  const { messages, isLoading, sendMessage } = useChat(chatMode);

  const handleFriendChatClick = () => {
    setChatMode('Friend Chat');
    setShowChat(true);
  };

  const handleGuidedJourneyClick = (mode: string) => {
    setChatMode(mode);
    setShowChat(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-light via-ocean to-ocean-dark">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left side - Fixed width column */}
          <div className="w-1/3 space-y-6">
            <div onClick={handleFriendChatClick}>
              <OpenMindSection />
            </div>
            <div>
              {/* Neon Divider */}
              <div className="relative h-[2px] mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-75" 
                     style={{ boxShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff' }} />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">Guided Journey</h2>
              <div className="h-[calc(100vh-300px)] overflow-y-auto pr-4 custom-scrollbar">
                <HandholdStepsSection onModeSelect={handleGuidedJourneyClick} />
              </div>
            </div>
          </div>
          
          {/* Right side - Content area with background image */}
          <div className="w-2/3 relative">
            <div className="absolute inset-0">
              <img 
                src="https://cdn.dribbble.com/userupload/18274088/file/original-9e82b7daa2eaba7c884bede64478849b.jpg?resize=1200x675&vertical=center"
                alt="Background"
                className="w-full h-full object-cover rounded-2xl opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-ocean-dark/30 to-ocean/30 backdrop-blur-sm rounded-2xl" />
            </div>

            <div className="relative h-full rounded-2xl">
              {showChat ? (
                <div className="h-full p-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg h-full">
                    <ChatHeader mode={chatMode} />
                    <MessageList messages={messages} isLoading={isLoading} />
                    <ChatInputArea 
                      onSendMessage={sendMessage} 
                      isLoading={isLoading}
                      showEndSession={messages.length > 0}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-12">
                  {/* Welcome Content */}
                  <div className="text-center space-y-6 max-w-2xl mx-auto">
                    <h1 className="text-4xl font-bold text-white">Welcome to Ana</h1>
                    <p className="text-xl text-white/80 leading-relaxed">
                      Meet Ana, your friendly AI companion for emotional well-being. Whether you need someone to chat with or a bit of guidance on your journey, Ana is here to support you every step of the way, just like a trusted friend.
                    </p>
                    <div className="flex justify-center gap-4">
                      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                        <p className="text-white/90 text-sm">Active Listening</p>
                        <p className="text-white font-semibold">24/7 Support</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                        <p className="text-white/90 text-sm">Personalized</p>
                        <p className="text-white font-semibold">Guidance</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                        <p className="text-white/90 text-sm">Emotional</p>
                        <p className="text-white font-semibold">Support</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnaPage;