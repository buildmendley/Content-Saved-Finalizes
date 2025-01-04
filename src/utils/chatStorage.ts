import { ChatMessage } from '../types/chat';

export interface ChatHistory {
  mode: string;
  messages: ChatMessage[];
  timestamp?: string;
  isDraft?: boolean;
}

const CHAT_STORAGE_KEY = 'mendley_chat';
const DRAFTS_KEY = 'chat_drafts';

// Load chat history
export const loadChatHistory = (): ChatHistory | null => {
  try {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading chat history:', error);
    return null;
  }
};

// Save chat history
export const saveChatHistory = (mode: string, messages: ChatMessage[]): void => {
  try {
    const history: ChatHistory = { mode, messages };
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
};

// Clear chat history
export const clearChatHistory = (): void => {
  try {
    localStorage.removeItem(CHAT_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing chat history:', error);
  }
};

// Save chat draft
export const saveChatDraft = (): boolean => {
  try {
    const chatHistory = loadChatHistory();
    if (!chatHistory) return false;

    const draft: ChatHistory = {
      ...chatHistory,
      timestamp: new Date().toISOString(),
      isDraft: true
    };

    // Get existing drafts
    const existingDrafts: ChatHistory[] = JSON.parse(localStorage.getItem(DRAFTS_KEY) || '[]');
    
    // Add new draft at the beginning
    existingDrafts.unshift(draft);
    
    // Keep only last 10 drafts
    const trimmedDrafts = existingDrafts.slice(0, 10);
    
    // Save drafts
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(trimmedDrafts));
    
    return true;
  } catch (error) {
    console.error('Error saving chat draft:', error);
    return false;
  }
};

// Load chat drafts
export const loadChatDrafts = (): ChatHistory[] => {
  try {
    const drafts = localStorage.getItem(DRAFTS_KEY);
    return drafts ? JSON.parse(drafts) : [];
  } catch (error) {
    console.error('Error loading chat drafts:', error);
    return [];
  }
};