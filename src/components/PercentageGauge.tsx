import React from 'react';
import { Battery } from 'lucide-react';

interface PercentageGaugeProps {
  percentage: number;
}

export const PercentageGauge: React.FC<PercentageGaugeProps> = ({ percentage }) => {
  const getColor = () => {
    if (percentage <= 20) return '#EF4444';
    if (percentage <= 50) return '#F59E0B';
    return '#10B981';
  };

  const radius = 100;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="relative">
        {/* Battery Icon */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <Battery 
            size={32}
            className={`${
              percentage <= 20 
                ? 'text-red-500' 
                : percentage <= 50 
                  ? 'text-yellow-500'
                  : 'text-green-500'
            }`}
          />
        </div>

        {/* Main Circular Gauge */}
        <div className="relative">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="transform -rotate-90"
          >
            {/* Background Circle */}
            <circle
              stroke="currentColor"
              fill="none"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className="text-gray-100 dark:text-gray-800"
            />
            
            {/* Progress Circle */}
            <circle
              stroke={getColor()}
              fill="none"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset,
                transition: 'stroke-dashoffset 0.5s ease-in-out',
              }}
            />
          </svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-medium" style={{ color: getColor() }}>
              {percentage}%
            </div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Remaining
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <span className={`text-sm font-medium ${
            percentage <= 20 
              ? 'text-red-500' 
              : percentage <= 50 
                ? 'text-yellow-500'
                : 'text-green-500'
          }`}>
            {percentage <= 20 ? 'Critical' : percentage <= 50 ? 'Warning' : 'Normal'}
          </span>
        </div>
      </div>
    </div>
  );
};