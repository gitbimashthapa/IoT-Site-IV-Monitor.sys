import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { IVData } from '../types';

interface HistoryChartProps {
  data: IVData[];
}

export const HistoryChart: React.FC<HistoryChartProps> = ({ data }) => {
  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-2">{formatTime(label)}</p>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              className="flex items-center space-x-2"
              style={{ color: entry.color }}
            >
              <span className="font-medium">{entry.name}:</span>
              <span>{entry.value} {entry.name === 'Volume' ? 'mL' : '%'}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Memoize the chart data to prevent unnecessary re-renders
  const chartData = useMemo(() => {
    return data.map(item => ({
      ...item,
      time: new Date(item.timestamp).getTime(),
    }));
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="percentageGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="#374151" 
          opacity={0.1} 
          vertical={false}
        />
        
        <XAxis
          dataKey="timestamp"
          tickFormatter={formatTime}
          stroke="#6B7280"
          tick={{ fill: '#6B7280' }}
          axisLine={{ stroke: '#E5E7EB' }}
        />
        
        <YAxis
          yAxisId="volume"
          stroke="#3B82F6"
          tick={{ fill: '#6B7280' }}
          axisLine={{ stroke: '#E5E7EB' }}
          label={{ 
            value: 'Volume (mL)', 
            angle: -90, 
            position: 'insideLeft',
            fill: '#3B82F6'
          }}
        />
        
        <YAxis
          yAxisId="percentage"
          orientation="right"
          stroke="#10B981"
          tick={{ fill: '#6B7280' }}
          axisLine={{ stroke: '#E5E7EB' }}
          label={{ 
            value: 'Percentage (%)', 
            angle: 90, 
            position: 'insideRight',
            fill: '#10B981'
          }}
        />
        
        <Tooltip content={<CustomTooltip />} />
        
        <Area
          yAxisId="volume"
          type="monotone"
          dataKey="volumeInMl"
          name="Volume"
          stroke="#3B82F6"
          strokeWidth={2}
          fill="url(#volumeGradient)"
          dot={false}
          activeDot={{ r: 6, fill: '#3B82F6' }}
        />
        
        <Line
          yAxisId="percentage"
          type="monotone"
          dataKey="percentage"
          name="Percentage"
          stroke="#10B981"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: '#10B981' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};