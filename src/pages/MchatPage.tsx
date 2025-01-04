import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatContainer from '../components/mchat/layout/ChatContainer';
import ChatHeader from '../components/mchat/ChatHeader';
import MessageList from '../components/mchat/messages/MessageList';
import ChatInputArea from '../components/mchat/input/ChatInputArea';
import { useChat } from '../hooks/useChat';
import { Mic } from 'lucide-react';

const MchatPage = () => {
  const location = useLocation();
  const initialMode = location.state?.mode || 'Friend Chat';
  const [mode, setMode] = useState(initialMode);
  const [activeTab, setActiveTab] = useState<'chat' | 'speak'>('chat');
  const { messages, isLoading, sendMessage, startConversation } = useChat(mode);

  useEffect(() => {
    if (messages.length === 0) {
      startConversation();
    }
  }, [mode, startConversation]);

  return (
    <ChatContainer>
      <ChatHeader mode={mode} />
      
      {/* Tabs */}
      <div className="bg-ocean-dark/50 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('chat')}
              className={`
                px-6 py-3 font-medium transition-colors relative
                ${activeTab === 'chat' 
                  ? 'text-white' 
                  : 'text-white/60 hover:text-white/80'
                }
              `}
            >
              Chat
              {activeTab === 'chat' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('speak')}
              className={`
                px-6 py-3 font-medium transition-colors relative
                ${activeTab === 'speak' 
                  ? 'text-white' 
                  : 'text-white/60 hover:text-white/80'
                }
              `}
            >
              Speak
              {activeTab === 'speak' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'chat' ? (
        <>
          <MessageList messages={messages} isLoading={isLoading} />
          <ChatInputArea 
            onSendMessage={sendMessage} 
            isLoading={isLoading}
            showEndSession={messages.length > 0}
          />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-ocean-light/10 to-ocean-dark/10">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-ocean-dark/20 rounded-full flex items-center justify-center mx-auto">
              <Mic className="w-8 h-8 text-white/60" />
            </div>
            <p className="text-white/60">Voice chat coming soon...</p>
          </div>
        </div>
      )}
    </ChatContainer>
  );
};

export default MchatPage;