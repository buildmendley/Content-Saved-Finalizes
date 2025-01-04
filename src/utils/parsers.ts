// Helper functions for parsing chat analysis data
export const parseEmotions = (emotionsText: string) => {
  try {
    return emotionsText.split(',').map(emotion => {
      const [emoji, name] = emotion.trim().split(' ');
      return { emoji, name };
    });
  } catch (error) {
    console.error('Error parsing emotions:', error);
    return [];
  }
};

export const parseSuggestions = (suggestionsText: string) => {
  try {
    return suggestionsText
      .split('\n')
      .map(suggestion => suggestion.trim())
      .filter(suggestion => suggestion.length > 0 && suggestion !== '-')
      .map(suggestion => suggestion.startsWith('- ') ? suggestion.slice(2) : suggestion);
  } catch (error) {
    console.error('Error parsing suggestions:', error);
    return [];
  }
};

export const parseAnalysisResponse = (content: string) => {
  try {
    const sections = content.split('\n\n');
    return {
      headline: sections[0]?.replace('Headline:', '').trim() || 'Analysis Complete',
      analysis: sections[1]?.replace('Analysis:', '').trim() || 'No detailed analysis available.',
      keyInsight: sections[2]?.replace('Key Insight:', '').trim() || 'No key insight available.',
      emotions: parseEmotions(sections[3]?.replace('Emotional Landscape:', '').trim() || ''),
      suggestions: parseSuggestions(sections[4]?.replace('Suggestions:', '').trim() || '')
    };
  } catch (error) {
    console.error('Error parsing analysis response:', error);
    throw new Error('Failed to parse analysis response');
  }
};