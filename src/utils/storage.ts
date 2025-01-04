// Storage utility functions
import { ChatHistory } from '../types/chat';

const CHAT_STORAGE_KEY = 'mendley_chat';
const MEMORY_STORAGE_KEY = 'mendley_memories';
const DRAFTS_KEY = 'chat_drafts';

// Chat history functions
export const saveChatHistory = (mode: string, messages: any[]) => {
  try {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify({ mode, messages }));
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
};

export const loadChatHistory = (): ChatHistory | null => {
  try {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading chat history:', error);
    return null;
  }
};

export const clearChatHistory = () => {
  try {
    localStorage.removeItem(CHAT_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing chat history:', error);
  }
};

// Draft functions
export const saveChatDraft = (): boolean => {
  try {
    const chatHistory = loadChatHistory();
    if (!chatHistory) return false;

    const draft = {
      ...chatHistory,
      timestamp: new Date().toISOString(),
      isDraft: true
    };

    // Get existing drafts
    const existingDrafts = JSON.parse(localStorage.getItem(DRAFTS_KEY) || '[]');
    existingDrafts.unshift(draft);
    
    // Keep only last 10 drafts
    const trimmedDrafts = existingDrafts.slice(0, 10);
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(trimmedDrafts));
    
    return true;
  } catch (error) {
    console.error('Error saving chat draft:', error);
    return false;
  }
};

export const loadChatDrafts = (): ChatHistory[] => {
  try {
    const drafts = localStorage.getItem(DRAFTS_KEY);
    return drafts ? JSON.parse(drafts) : [];
  } catch (error) {
    console.error('Error loading chat drafts:', error);
    return [];
  }
};

// Memory functions
export const saveMemory = (mode: string, messages: any[], analysis: any) => {
  try {
    const memories = loadAllMemories();
    const newMemory = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      mode,
      messages,
      analysis
    };

    memories.unshift(newMemory);
    localStorage.setItem(MEMORY_STORAGE_KEY, JSON.stringify(memories));
    return newMemory;
  } catch (error) {
    console.error('Error saving memory:', error);
    return null;
  }
};

export const loadAllMemories = () => {
  try {
    const stored = localStorage.getItem(MEMORY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading memories:', error);
    return [];
  }
};

export const loadMemory = (id: string) => {
  try {
    const memories = loadAllMemories();
    return memories.find(memory => memory.id === id) || null;
  } catch (error) {
    console.error('Error loading memory:', error);
    return null;
  }
};