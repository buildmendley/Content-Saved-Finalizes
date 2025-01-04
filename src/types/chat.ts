export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ChatHistory {
  mode: string;
  messages: ChatMessage[];
  timestamp?: string;
  isDraft?: boolean;
}

export interface Emotion {
  emoji: string;
  name: string;
}

export interface ChatAnalysis {
  headline: string;
  analysis: string;
  keyInsight: string;
  emotions: Emotion[];
  suggestions: string[];
}