import React from 'react';
import { Activity, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  connected: boolean;
}

export const Header: React.FC<HeaderProps> = ({ connected }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg backdrop-blur-lg bg-opacity-90 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Activity className={`w-8 h-8 ${connected ? 'text-green-500' : 'text-red-500'} transition-colors duration-200`} />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              IV Monitor System
            </h1>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};