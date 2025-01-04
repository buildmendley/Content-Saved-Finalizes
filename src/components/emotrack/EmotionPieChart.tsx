import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { commonOptions } from './chartConfig';

interface EmotionPieChartProps {
  data: Array<{
    name: string;
    intensity: number;
  }>;
  colors: Record<string, string>;
}

const EmotionPieChart = ({ data, colors }: EmotionPieChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data?.length) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.map(d => d.name),
        datasets: [{
          data: data.map(d => d.intensity),
          backgroundColor: data.map(d => colors[d.name] || '#ccc'),
          borderColor: 'white',
          borderWidth: 2
        }]
      },
      options: {
        ...commonOptions,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              generateLabels: (chart) => {
                const data = chart.data;
                if (data.labels?.length && data.datasets.length) {
                  return data.labels.map((label, i) => {
                    const value = data.datasets[0].data[i];
                    const emotion = label as string;
                    return {
                      text: `${getEmojiForEmotion(emotion)} ${emotion} (${value}%)`,
                      fillStyle: colors[emotion] || '#ccc',
                      strokeStyle: '#fff',
                      lineWidth: 2,
                      hidden: false,
                      index: i
                    };
                  });
                }
                return [];
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.formattedValue;
                return `${label}: ${value}%`;
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [data, colors]);

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

export default EmotionPieChart;