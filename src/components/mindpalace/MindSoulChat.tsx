import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic } from 'lucide-react';
import OpenAI from 'openai';
import chatInteractions from '../../../data/chat_interaction_analysis.json';
import { 
  MIND_SOUL_CHAT_PROMPT,
  PATTERN_ANALYSIS_PROMPT,
  PROGRESS_TRACKING_PROMPT,
  EMOTIONAL_INSIGHT_PROMPT,
  RECOMMENDATION_PROMPT 
} from '../../prompts/mindSoulChat_prompts';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const conversationStarters = [
  { id: 'patterns', text: 'What patterns do you see in my emotional journey?', prompt: PATTERN_ANALYSIS_PROMPT },
  { id: 'insights', text: 'What insights can you share from my past interactions?', prompt: EMOTIONAL_INSIGHT_PROMPT },
  { id: 'progress', text: 'How have I progressed over time?', prompt: PROGRESS_TRACKING_PROMPT }
];

const MindSoulChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(MIND_SOUL_CHAT_PROMPT);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateSystemPrompt = () => {
    const context = {
      chatHistory: chatInteractions,
      currentConversation: messages,
      prompt: currentPrompt
    };

    return `${currentPrompt}\n\nContext:\n${JSON.stringify(context)}`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: generateSystemPrompt() },
          ...messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.content
          })),
          { role: "user", content: inputMessage }
        ],
        temperature: 0.7,
        max_tokens: 150
      });

      const aiResponse = response.choices[0]?.message?.content;
      if (aiResponse) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsLoading(false);
      setCurrentPrompt(MIND_SOUL_CHAT_PROMPT);
    }
  };

  const handleStarterClick = (text: string, prompt?: string) => {
    setInputMessage(text);
    if (prompt) {
      setCurrentPrompt(prompt);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto z-10 mt-24">
      <div className="bg-gradient-to-br from-teal-50/70 to-emerald-200/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/10">
        {/* Conversation Starters */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {conversationStarters.map((starter) => (
            <button
              key={starter.id}
              onClick={() => handleStarterClick(starter.text, starter.prompt)}
              className="px-6 py-3 bg-white/90 hover:bg-white/20 rounded-full text-teal-black/90 text-sm transition-all transform hover:scale-105 hover:shadow-lg"
            >
              {starter.text}
            </button>
          ))}
        </div>

        {/* Chat Messages Area */}
        <div className="min-h-[400px] max-h-[400px] mb-6 rounded-xl p-4 overflow-y-auto bg-gradient-to-b from-white/90 to-gray-50/50">
          {messages.length === 0 && (
            <div className="text-black/60 text-center mt-32">
            Start a Conversation to Navigate Your Emotional Journey
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block max-w-[80%] px-4 py-2 rounded-xl ${
                  message.sender === 'user'
                    ? 'bg-ocean-dark text-black rounded-br-none'
                    : 'bg-white/20 text-black/90 rounded-bl-none'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-teal-800/60 text-sm animate-pulse">Ana is thinking...</div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <button className="p-2 text-black/60 hover:text-black hover:bg-white/10 rounded-full transition">
              <Mic className="w-5 h-5" />
            </button>
          </div>
          
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="w-full bg-white/10 text-black placeholder-black px-16 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          />
          
          <button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-ocean-dark text-white hover:bg-ocean rounded-full transition disabled:opacity-50 disabled:hover:bg-ocean-dark"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MindSoulChat;