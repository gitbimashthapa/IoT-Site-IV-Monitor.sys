import React from 'react';
import { Droplet } from 'lucide-react';

interface VolumeGaugeProps {
  value: number;
  maxValue: number;
}

export const VolumeGauge: React.FC<VolumeGaugeProps> = ({ value, maxValue }) => {
  const percentage = (value / maxValue) * 100;
  
  const getColor = () => {
    if (percentage <= 20) return '#EF4444';
    if (percentage <= 50) return '#F59E0B';
    return '#10B981';
  };

  return (
    <div className="relative h-full flex items-center justify-center">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg opacity-50"></div>
      
      {/* Main Content */}
      <div className="relative flex flex-col items-center">
        {/* Animated Droplet Icon */}
        <div className="mb-4">
          <div className={`p-6 rounded-full bg-gradient-to-br ${
            percentage <= 20 
              ? 'from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30' 
              : percentage <= 50 
                ? 'from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30'
                : 'from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30'
          }`}>
            <Droplet 
              size={48} 
              className={`${
                percentage <= 20 
                  ? 'text-red-500 dark:text-red-400' 
                  : percentage <= 50 
                    ? 'text-yellow-500 dark:text-yellow-400'
                    : 'text-green-500 dark:text-green-400'
              } animate-pulse`}
            />
          </div>
        </div>

        {/* Volume Display */}
        <div className="text-center">
          <div className="flex items-baseline justify-center">
            <span className="text-5xl font-bold" style={{ color: getColor() }}>
              {value}
            </span>
            <span className="text-xl text-gray-500 dark:text-gray-400 ml-2">mL</span>
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            of {maxValue} mL total
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-3 bg-gray-200 dark:bg-gray-700 rounded-full mt-6 overflow-hidden">
          <div 
            className="h-full transition-all duration-500 ease-out rounded-full"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: getColor()
            }}
          />
        </div>

        {/* Status Label */}
        <div className={`mt-4 px-4 py-1 rounded-full text-sm font-medium ${
          percentage <= 20
            ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
            : percentage <= 50
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200'
              : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
        }`}>
          {percentage <= 20 
            ? 'Critical Level' 
            : percentage <= 50 
              ? 'Warning Level' 
              : 'Normal Level'}
        </div>
      </div>
    </div>
  );
};