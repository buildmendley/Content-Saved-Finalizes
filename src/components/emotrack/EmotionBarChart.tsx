import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { format } from 'date-fns';
import { commonOptions } from './chartConfig';

interface EmotionBarChartProps {
  data: Array<{
    date: string;
    dominantEmotion: string;
    intensity: number;
  }>;
  colors: Record<string, string>;
  onDateSelect: (date: string) => void;
}

const EmotionBarChart = ({ data, colors, onDateSelect }: EmotionBarChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data.length) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(d => format(new Date(d.date), 'MMM d')),
        datasets: [{
          label: 'Emotion Intensity',
          data: data.map(d => d.intensity),
          backgroundColor: data.map(d => colors[d.dominantEmotion] || '#ccc'),
          borderColor: data.map(d => colors[d.dominantEmotion] || '#ccc'),
          borderWidth: 1
        }]
      },
      options: {
        ...commonOptions,
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
            title: {
              display: true,
              text: 'Intensity'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: (items) => {
                const index = items[0].dataIndex;
                return `${format(new Date(data[index].date), 'MMMM d, yyyy')}`;
              },
              label: (item) => {
                const emotion = data[item.dataIndex].dominantEmotion;
                return `${emotion}: ${item.formattedValue}`;
              }
            }
          }
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            onDateSelect(data[index].date);
          }
        }
      }
    });

    // Add emojis on top of bars
    const addEmojis = () => {
      if (!chartInstance.current) return;
      const chart = chartInstance.current;
      const ctx = chart.ctx;
      const meta = chart.getDatasetMeta(0);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.font = '16px Arial';

      meta.data.forEach((bar, index) => {
        const emotion = data[index].dominantEmotion;
        const emoji = getEmojiForEmotion(emotion);
        const x = bar.x;
        const y = bar.y - 10; // Position above the bar
        ctx.fillText(emoji, x, y);
      });
    };

    chartInstance.current.options.animation = {
      onComplete: addEmojis
    };

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [data, colors, onDateSelect]);

  return (
    <div className="h-[300px]">
      <canvas ref={chartRef} />
    </div>
  );
};

// Helper function to map emotions to emojis
const getEmojiForEmotion = (emotion: string): string => {
  const emojiMap: Record<string, string> = {
    'Joy': '😊',
    'Sadness': '😔',
    'Fear': '😨',
    'Contemplative': '🤔',
    'Loneliness': '🧍',
    'Stress': '😓',
    'Hope': '🌟'
  };
  return emojiMap[emotion] || '😐';
};

export default EmotionBarChart;