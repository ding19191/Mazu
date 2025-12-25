
import React from 'react';
import { DivinationResult } from '../types';

interface MoonBlocksProps {
  result: DivinationResult;
  isAnimating: boolean;
}

const MoonBlocks: React.FC<MoonBlocksProps> = ({ result, isAnimating }) => {
  const CrescentSVG = ({ isRound, className }: { isRound: boolean; className?: string }) => {
    const outerPath = "M 15,50 C 60,30 95,65 90,110 C 85,155 45,175 10,155 C 40,145 60,110 15,50";

    return (
      <div className={`relative w-16 h-28 md:w-28 md:h-44 drop-shadow-[0_10px_15px_rgba(0,0,0,0.7)] transition-all ${className}`}>
        <svg viewBox="0 0 100 200" className="w-full h-full">
          <defs>
            <linearGradient id="roundGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d32f2f" />
              <stop offset="50%" stopColor="#7f1d1d" />
              <stop offset="100%" stopColor="#450a0a" />
            </linearGradient>
            <linearGradient id="flatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
          </defs>

          <path d={outerPath} fill="#2c0a0a" transform="translate(4, 6)" />
          <path
            d={outerPath}
            fill={isRound ? "url(#roundGrad)" : "url(#flatGrad)"}
            stroke={isRound ? "#3e0a0a" : "#7f1d1d"}
            strokeWidth="2"
          />

          {isRound && (
            <path
              d="M 25,75 Q 45,55 55,90 Q 60,120 30,145 Q 45,120 25,75"
              fill="rgba(255,255,255,0.15)"
              className="pointer-events-none"
            />
          )}
        </svg>
      </div>
    );
  };

  const renderBlocks = () => {
    if (isAnimating) {
      return (
        <div className="flex gap-4 items-center animate-toss">
          <CrescentSVG isRound={true} className="rotate-[45deg]" />
          <CrescentSVG isRound={false} className="rotate-[-135deg]" />
        </div>
      );
    }

    switch (result) {
      case DivinationResult.SHENG_JIAO:
        return (
          <div className="flex gap-2 items-center animate-fadeIn">
            <CrescentSVG isRound={false} className="rotate-[-165deg] -translate-x-1" />
            <CrescentSVG isRound={true} className="rotate-[15deg] translate-x-1 translate-y-3" />
          </div>
        );
      case DivinationResult.XIAO_JIAO:
        return (
          <div className="flex gap-2 items-center animate-fadeIn">
            <CrescentSVG isRound={false} className="rotate-[-40deg] translate-x-1" />
            <CrescentSVG isRound={false} className="rotate-[-140deg] -translate-x-1" />
          </div>
        );
      case DivinationResult.YIN_JIAO:
        return (
          <div className="flex gap-2 items-center animate-fadeIn">
            <CrescentSVG isRound={true} className="rotate-[30deg] translate-x-1" />
            <CrescentSVG isRound={true} className="rotate-[150deg] -translate-x-1" />
          </div>
        );
      default:
        return <div className="h-28 md:h-40" />; 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 md:gap-8 min-h-[160px] md:min-h-[300px]">
      <div className="relative">
        {renderBlocks()}
      </div>
      
      {result !== DivinationResult.NONE && !isAnimating && (
        <div className="relative transform animate-bounce-in">
          <div className="bg-[#e9dcc5] px-6 py-1 md:px-14 md:py-4 rounded-lg shadow-[0_4px_0_#b89b72] border-2 border-[#b89b72] flex flex-col items-center justify-center">
            <span className="text-xl md:text-3xl font-bold font-calligraphy text-[#4a2c1d] tracking-[0.2em]">
              {result === DivinationResult.SHENG_JIAO && "聖 筊"}
              {result === DivinationResult.XIAO_JIAO && "笑 筊"}
              {result === DivinationResult.YIN_JIAO && "陰 筊"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoonBlocks;
