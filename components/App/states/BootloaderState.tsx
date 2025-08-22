import React from 'react';

interface BootloaderStateProps {
  progress?: number;
}

const BootloaderState: React.FC<BootloaderStateProps> = ({ progress = 0 }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Windoge XP</h1>
        <div className="w-64 h-2 bg-gray-700 rounded">
          <div 
            className="h-full bg-blue-600 rounded transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-400">Loading... {progress}%</p>
      </div>
    </div>
  );
};

export default BootloaderState;
