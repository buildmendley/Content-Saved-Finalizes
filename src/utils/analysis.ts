import OpenAI from 'openai';
import { ChatMessage, ChatAnalysis } from '../types/chat';
import { ANALYSIS_PROMPT } from '../prompts/analysis-prompt';
import { parseAnalysisResponse } from './parsers';
import { ChatInteractionAnalysis, WeeklyReport } from '../types/analysis';
import { WEEKLY_REPORT_PROMPT } from '../prompts/weekly_report';



const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const analyzeChatSession = async (messages: ChatMessage[]): Promise<ChatAnalysis> => {
  if (!messages || messages.length === 0) {
    throw new Error('No messages provided for analysis');
  }

  try {
    // Format conversation for analysis
    const conversation = messages
      .map(m => `${m.sender.toUpperCase()}: ${m.content}`)
      .join('\n');

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: ANALYSIS_PROMPT 
        },
        { 
          role: "user", 
          content: `Analyze this conversation and provide insights:\n\n${conversation}` 
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const analysisText = response.choices[0]?.message?.content;
    if (!analysisText) {
      throw new Error('No analysis generated');
    }

    return parseAnalysisResponse(analysisText);
  } catch (error) {
    console.error('Error analyzing conversation:', error);
    throw new Error('Failed to analyze conversation. Please try again.');
  }
};

export const generateWeeklyReport = async (
  interactions: ChatInteractionAnalysis[]
): Promise<WeeklyReport> => {
  if (!interactions || interactions.length === 0) {
    throw new Error('No interactions provided for analysis');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: WEEKLY_REPORT_PROMPT 
        },
        { 
          role: "user", 
          content: `Generate a weekly report based on these chat interactions: ${JSON.stringify(interactions)}` 
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No report generated');
    }

    return JSON.parse(content) as WeeklyReport;
  } catch (error) {
    console.error('Error generating weekly report:', error);
    throw new Error('Failed to generate weekly report. Please try again.');
  }
};

export const getLastSevenDaysInteractions = (
  interactions: ChatInteractionAnalysis[]
): ChatInteractionAnalysis[] => {
  if (!interactions || interactions.length === 0) {
    return [];
  }

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return interactions
    .filter(interaction => new Date(interaction.date) >= sevenDaysAgo)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};


// ... existing functions ...
//Analyze Emotion
export const analyzeEmotionalData = async (interactions: ChatInteractionAnalysis[]) => {
  if (!interactions || interactions.length === 0) {
    return {
      dailyEmotions: [],
      overallEmotions: {},
      emotionColors: {
        'Joy': '#FFD93D',
        'Sadness': '#6C9BCF',
        'Fear': '#4F709C',
        'Contemplative': '#98EECC',
        'Loneliness': '#FF6B6B',
        'Stress': '#4F709C',
        'Hope': '#98EECC'
      },
      dailyInsights: {}
    };
  }

  // Process daily emotions
  const dailyEmotions = interactions.map(interaction => ({
    date: interaction.date,
    dominantEmotion: interaction.emotional_landscape[0]?.split(' ')[1] || 'Neutral',
    intensity: Math.floor(Math.random() * 3) + 7 // Simulated intensity 7-10
  }));

  // Calculate overall emotion distribution
  const emotionCounts: Record<string, number> = {};
  interactions.forEach(interaction => {
    interaction.emotional_landscape.forEach(emotion => {
      const emotionName = emotion.split(' ')[1];
      emotionCounts[emotionName] = (emotionCounts[emotionName] || 0) + 1;
    });
  });

  // Convert counts to percentages
  const totalEmotions = Object.values(emotionCounts).reduce((a, b) => a + b, 0);
  const overallEmotions = Object.entries(emotionCounts).map(([name, count]) => ({
    name,
    intensity: Math.round((count / totalEmotions) * 100)
  }));

  // Generate daily insights
  const dailyInsights: Record<string, any> = {};
  interactions.forEach(interaction => {
    dailyInsights[interaction.date] = {
      emotionalLandscape: interaction.emotional_landscape.map(e => e.split(' ')[1]),
      triggeringPoints: [
        interaction.key_insight,
        ...interaction.analysis.split('. ').slice(0, 2)
      ],
      actionableItems: interaction.suggested_next_steps.map((step, index) => ({
        title: `Action ${index + 1}`,
        description: step,
        priority: index === 0 ? 'High' : 'Medium'
      }))
    };
  });

  return {
    dailyEmotions,
    overallEmotions,
    emotionColors: {
      'Joy': '#FFD93D',
      'Sadness': '#6C9BCF',
      'Fear': '#4F709C',
      'Contemplative': '#98EECC',
      'Loneliness': '#FF6B6B',
      'Stress': '#4F709C',
      'Hope': '#98EECC'
    },
    dailyInsights
  };
};
