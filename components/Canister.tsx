
import React from 'react';

interface CanisterProps {
  isShaking: boolean;
}

const Canister: React.FC<CanisterProps> = ({ isShaking }) => {
  return (
    <div className={`relative flex flex-col items-center ${isShaking ? 'animate-shake' : ''}`}>
      {/* Fortune Sticks */}
      <div className="flex justify-center -mb-8 gap-1 relative z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-32 bg-yellow-700/80 rounded-t-sm border-l border-yellow-800"
            style={{
              transform: `rotate(${(i - 5.5) * 4}deg) translateY(${Math.abs(i - 5.5) * 2}px)`,
              opacity: 0.8 + Math.random() * 0.2
            }}
          >
            <div className="h-4 bg-red-900/50 mt-2"></div>
          </div>
        ))}
      </div>
      
      {/* Bamboo Canister */}
      <div className="relative z-10 w-32 h-44 bg-gradient-to-br from-amber-900 via-amber-950 to-black rounded-b-xl rounded-t-lg border-2 border-amber-800 shadow-2xl flex items-center justify-center overflow-hidden">
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)' }}></div>
        <div className="text-amber-600 font-calligraphy text-4xl vertical-rl opacity-50 tracking-widest">
          靈籤
        </div>
        {/* Decorative Bands */}
        <div className="absolute top-4 left-0 w-full h-1 bg-amber-800/50"></div>
        <div className="absolute bottom-4 left-0 w-full h-1 bg-amber-800/50"></div>
      </div>
    </div>
  );
};

export default Canister;
