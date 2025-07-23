import React from 'react';
import Aurora from './Aurora'; // You already have this

export default function DarkAuroraBackground({ children }) {
  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Aurora animation */}
      <div className="absolute inset-0 z-0">
        <Aurora
          amplitude={0.6}
          blend={0.5}
          colorStops={['#0f0c29', '#302b63', '#24243e']} // Dark, soft gradient
        />
      </div>

      {/* Glass blur overlay for contrast */}
      <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-sm" />

      {/* Main content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}

