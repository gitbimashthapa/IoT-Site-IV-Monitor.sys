import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatusCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  status: 'success' | 'warning' | 'error' | 'info';
}

const statusStyles = {
  success: 'text-green-500 dark:text-green-400',
  warning: 'text-yellow-500 dark:text-yellow-400',
  error: 'text-red-500 dark:text-red-400',
  info: 'text-blue-500 dark:text-blue-400',
};

export const StatusCard: React.FC<StatusCardProps> = ({ title, value, icon: Icon, status }) => {
  return (
    <div className="bg-white dark:bg-dark-100 rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl hover:scale-105 dark:shadow-dark-300/50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className={`text-2xl font-bold mt-2 ${statusStyles[status]}`}>{value}</p>
        </div>
        <Icon className={`w-8 h-8 ${statusStyles[status]}`} />
      </div>
    </div>
  );
};