import React from 'react';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { useWebSocket } from './hooks/useWebSocket';
import { AlertTriangle } from 'lucide-react';

export default function App() {
  const { connected, currentData, history } = useWebSocket();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-200 dark:to-dark transition-colors duration-200">
      <Header connected={connected} />

      {!connected && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800/50 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90 transition-all duration-200" role="alert">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 animate-pulse" />
              <span className="block sm:inline font-medium">Unable to connect to the IV monitoring device. Please check the connection.</span>
            </div>
          </div>
        </div>
      )}

      <main className="py-6 px-4 sm:px-6 lg:px-8">
        <Dashboard data={currentData} history={history} />
      </main>
    </div>
  );
}