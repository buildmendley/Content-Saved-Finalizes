export interface ChatInteractionAnalysis {
  date: string;
  headline: string;
  analysis: string;
  key_insight: string;
  emotional_landscape: string[];
  suggested_next_steps: string[];
  chat_history: Array<{
    user: string;
    ai: string;
  }>;
}

export interface ActionableItem {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  timeframe: 'Daily' | 'Weekly' | 'Monthly';
}

export interface WeeklyReport {
  headline: string;
  analysis_points: string[];
  key_insights: string[];
  emotional_landscape: Array<{
    emoji: string;
    name: string;
    percentage: string;
  }>;
  themes: string[];
  weekly_wins: string[];
  actionable_items: ActionableItem[];
}