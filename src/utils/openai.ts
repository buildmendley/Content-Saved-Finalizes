import OpenAI from 'openai';
import { ChatAnalysis } from '../types/chat';
import { ANALYSIS_PROMPT } from '../prompts/analysis-prompt';
import { CHAT_PROMPTS } from '../prompts/chat-prompts';

// Initialize OpenAI with proper error handling
const initializeOpenAI = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.warn('OpenAI API key is not configured. Chat features will be disabled.');
    return null;
  }

  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });
};

const openai = initializeOpenAI();

export const generateChatResponse = async (
  message: string,
  mode: string,
  conversationHistory: { role: 'user' | 'assistant', content: string }[] = []
) => {
  if (!openai) {
    return "I apologize, but I'm not able to respond right now due to configuration issues. Please try again later.";
  }

  try {
    const promptContent = CHAT_PROMPTS[mode];
    if (!promptContent) {
      throw new Error(`No prompt found for mode: ${mode}`);
    }

    const systemMessage = `${promptContent}\n\n
         CRITICAL: Structure your response in exactly three parts:
         1. Validation: Acknowledge the user's feelings (1 sentence)
         2. Advice/Insight: Provide practical suggestion (1 sentence)
         3. Question: Ask a targeted follow-up question (1 sentence)

        Each part should be on a new line. DO NOT include labels or bullet points.`;

    const messages = [
      { role: 'system', content: systemMessage },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages as any[],
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0.1
    });

    const content = response.choices[0].message.content;
    if (!content) return null;

    const parts = content
      .split(/\n(?=Validation:|Advice\/Insight:|Question:)/i)
      .map(section => section
        .replace(/^(Validation|Advice\/Insight|Question):\s*/i, '')
        .replace(/^[-•]\s+/gm, '')
        .trim()
      )
      .filter(Boolean);

    return parts.join('\n\n');

  } catch (error) {
    console.error('Error generating chat response:', error);
    return "I apologize, but I encountered an error. Please try again later.";
  }
};

export const generateAnalysis = async (conversationText: string): Promise<ChatAnalysis> => {
  if (!openai) {
    throw new Error('OpenAI is not properly configured');
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: ANALYSIS_PROMPT
        },
        {
          role: 'user',
          content: `Analyze this conversation and provide insights:\n\n${conversationText}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No analysis generated');
    }

    const sections = content.split('\n\n').filter(Boolean);
    
    return {
      headline: sections[0]?.trim() || 'Chat Analysis',
      analysis: sections[1]?.trim() || 'No detailed analysis available.',
      keyInsight: sections[2]?.replace(/^Key Insight:\s*/i, '').trim() || 'No key insight available.',
      emotions: parseEmotions(sections[3] || ''),
      suggestions: parseSuggestions(sections[4] || '')
    };
  } catch (error) {
    console.error('Error generating analysis:', error);
    throw new Error('Failed to analyze conversation. Please try again.');
  }
};

// Helper function to parse emotions from the response
const parseEmotions = (emotionsText: string): { emoji: string; name: string }[] => {
  const emotionMatches = emotionsText.match(/[😃💪😞😳🌟😨😓🧍🎯❤️🙏❓😡😤😩🤝🤔😌🔥]\s*\w+/g) || [];
  return emotionMatches.map(match => {
    const [emoji, ...nameParts] = match.split(/\s+/);
    return {
      emoji,
      name: nameParts.join(' ')
    };
  });
};

// Helper function to parse suggestions from the response
const parseSuggestions = (suggestionsText: string): string[] => {
  return suggestionsText
    .split('\n')
    .map(line => line.replace(/^[-•]\s*/, '').trim())
    .filter(Boolean);
};