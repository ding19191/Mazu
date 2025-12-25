
import React, { useState, useCallback } from 'react';
import { AppPhase, DivinationResult, FortunePoem } from './types';
import { fetchFortunePoem } from './services/fortuneService'; 
import Canister from './components/Canister';
import MoonBlocks from './components/MoonBlocks';
import FortunePaper from './components/FortunePaper';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>(AppPhase.INPUT);
  const [question, setQuestion] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stickNumber, setStickNumber] = useState<number | null>(null);
  const [divinationResult, setDivinationResult] = useState<DivinationResult>(DivinationResult.NONE);
  const [fortune, setFortune] = useState<FortunePoem | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrawingStick = useCallback(() => {
    setPhase(AppPhase.DRAWING);
    setIsProcessing(true);
    setStickNumber(null);
    setDivinationResult(DivinationResult.NONE);
    
    setTimeout(() => {
      setStickNumber(Math.floor(Math.random() * 60) + 1);
      setPhase(AppPhase.STRICT_REVEALED);
      setIsProcessing(false);
    }, 1500);
  }, []);

  const startDrawing = () => {
    if (!question.trim()) return;
    setError(null);
    handleDrawingStick();
  };

  const throwBlocks = useCallback(async () => {
    setIsProcessing(true);
    setDivinationResult(DivinationResult.NONE);
    
    setTimeout(async () => {
      const rand = Math.random();
      let result: DivinationResult;
      
      if (rand < 0.45) { 
        result = DivinationResult.SHENG_JIAO;
      } else if (rand < 0.75) {
        result = DivinationResult.XIAO_JIAO;
      } else {
        result = DivinationResult.YIN_JIAO;
      }

      setDivinationResult(result);
      setIsProcessing(false);

      if (result === DivinationResult.SHENG_JIAO) {
        setIsAnalyzing(true);
        try {
          const data = await fetchFortunePoem(question);
          setFortune(data);
          setTimeout(() => {
            setPhase(AppPhase.RESULT);
            setIsAnalyzing(false);
          }, 1000);
        } catch (err) {
          setError("系統感應異常。");
          setIsAnalyzing(false);
        }
      } else {
        setTimeout(() => {
          handleDrawingStick(); 
        }, 2000);
      }
    }, 800);
  }, [question, handleDrawingStick]);

  const reset = () => {
    setPhase(AppPhase.INPUT);
    setQuestion('');
    setStickNumber(null);
    setDivinationResult(DivinationResult.NONE);
    setFortune(null);
    setError(null);
  };

  const isResultPhase = phase === AppPhase.RESULT;

  return (
    <div className={`min-h-screen flex flex-col items-center p-4 bg-[url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-fixed bg-center ${isResultPhase ? 'overflow-y-auto' : 'overflow-hidden max-h-screen'}`}>
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-0 pointer-events-none"></div>

      <div className={`relative z-10 w-full max-w-2xl flex flex-col items-center ${isResultPhase ? 'py-8' : 'h-full justify-center'}`}>
        
        {phase !== AppPhase.STRICT_REVEALED && phase !== AppPhase.DRAWING && !isAnalyzing && (
          <header className="mb-8 md:mb-12 text-center animate-fadeIn">
            <h1 className="text-5xl md:text-7xl font-calligraphy text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">
              天后靈籤
            </h1>
            <p className="text-amber-200/40 font-serif-tc tracking-[0.5em] text-[10px] uppercase mt-2">
              Heavenly Guidance & Divine Insight
            </p>
          </header>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-950/80 border border-red-500/50 rounded-lg text-red-100 text-xs animate-pulse z-50">
            {error}
          </div>
        )}

        {phase === AppPhase.INPUT && (
          <div className="w-full flex flex-col items-center space-y-6 animate-fadeIn">
            <div className="w-full max-w-md bg-stone-900/95 p-6 md:p-10 rounded-[40px] border-2 border-amber-900/40 shadow-[0_0_80px_rgba(0,0,0,1)] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-900/20 rounded-full blur-3xl"></div>
              
              <label className="block text-amber-100/60 mb-6 text-center font-serif-tc text-lg md:text-xl tracking-[0.4em]">
                弟子焚香祈請
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="請虔誠輸入求問之事（如：事業轉機、婚姻緣分、考試考運...）"
                className="w-full h-32 md:h-40 bg-black/40 border-amber-900/20 border-2 p-5 text-amber-50 placeholder-stone-700 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-red-900 transition-all font-serif-tc text-base md:text-lg leading-relaxed shadow-inner"
              />
              <button
                onClick={startDrawing}
                disabled={!question.trim()}
                className="w-full mt-8 py-5 md:py-6 bg-gradient-to-b from-red-700 to-red-950 hover:from-red-600 hover:to-red-900 disabled:from-stone-900 disabled:to-stone-950 disabled:text-stone-700 text-white font-bold rounded-full transition-all shadow-2xl tracking-[1em] text-xl md:text-2xl font-calligraphy border-b-4 md:border-b-8 border-red-950 active:translate-y-1 active:border-b-0"
              >
                誠 心 求 籤
              </button>
              <p className="text-center text-amber-900/40 text-[10px] mt-6 tracking-widest font-serif-tc">
                心誠則靈 ‧ 萬事如意
              </p>
            </div>
          </div>
        )}

        {(phase === AppPhase.DRAWING || phase === AppPhase.STRICT_REVEALED) && !isAnalyzing && (
          <div className="flex flex-col items-center w-full animate-fadeIn justify-center">
            <div className={`transition-all duration-700 ${phase === AppPhase.STRICT_REVEALED ? 'scale-[0.3] -mt-16 -mb-24 opacity-20 rotate-12' : 'scale-110 my-4'}`}>
              <Canister isShaking={phase === AppPhase.DRAWING} />
            </div>

            {phase === AppPhase.DRAWING && (
              <div className="text-center mt-12">
                <p className="text-amber-100 font-calligraphy text-4xl md:text-6xl animate-pulse tracking-[0.8em]">
                  感 應 中
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-red-700 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
                  ))}
                </div>
              </div>
            )}
            
            {phase === AppPhase.STRICT_REVEALED && (
              <div className="flex flex-col items-center w-full animate-fadeIn">
                <div className="bg-[#fffbeb] text-amber-950 px-10 py-4 rounded-2xl shadow-2xl border-2 border-amber-200 flex flex-col items-center z-20 mb-4 transform hover:scale-105 transition-transform">
                  <span className="text-4xl md:text-5xl font-bold font-serif-tc mb-1">第 {stickNumber} 籤</span>
                  <span className="text-[10px] text-amber-800/80 font-serif-tc tracking-[0.4em] font-black uppercase">Oracle Received</span>
                </div>
                
                <div className="w-full flex flex-col items-center">
                  <MoonBlocks result={divinationResult} isAnimating={isProcessing} />
                  
                  <div className="mt-4 flex flex-col items-center justify-center w-full">
                    {divinationResult === DivinationResult.NONE && !isProcessing && (
                      <button
                        onClick={throwBlocks}
                        className="px-20 py-4 bg-red-800 hover:bg-red-700 text-white font-bold rounded-full transition-all shadow-lg font-serif-tc tracking-[0.6em] text-2xl border-b-4 border-red-950 active:translate-y-1 active:border-b-0"
                      >
                        擲 筊 請 示
                      </button>
                    )}

                    {(divinationResult === DivinationResult.XIAO_JIAO || divinationResult === DivinationResult.YIN_JIAO) && !isProcessing && (
                      <div className="flex flex-col items-center gap-3 text-center py-4 px-10 rounded-3xl bg-black/60 border border-red-900/30 backdrop-blur-md">
                        <p className="text-red-500 font-calligraphy text-3xl animate-pulse">
                          {divinationResult === DivinationResult.XIAO_JIAO ? "神明微笑 ‧ 非此靈籤" : "神明不允 ‧ 請再祈求"}
                        </p>
                        <p className="text-amber-200/40 text-xs font-serif-tc tracking-[0.4em] uppercase">自動重抽中...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {isAnalyzing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl">
            <div className="text-center px-6">
              <div className="relative w-40 h-40 mx-auto mb-10">
                <div className="absolute inset-0 border-4 border-red-600/10 rounded-full scale-110"></div>
                <div className="absolute inset-0 border-t-4 border-red-700 rounded-full animate-spin"></div>
                <div className="absolute inset-4 border-2 border-amber-900/20 rounded-full flex items-center justify-center">
                   <span className="text-red-900 font-brush text-5xl">靈</span>
                </div>
              </div>
              <h2 className="text-amber-100 font-calligraphy text-5xl md:text-6xl tracking-[0.4em] mb-4 animate-pulse">
                聖 筊 已 現
              </h2>
              <p className="text-amber-200/60 font-serif-tc text-lg tracking-[0.2em]">
                大師正在為您參悟籤意，請稍候...
              </p>
              <div className="mt-8 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-red-900/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {phase === AppPhase.RESULT && fortune && (
          <div className="flex flex-col items-center space-y-10 animate-fadeIn w-full">
            <FortunePaper fortune={fortune} />
            <button
              onClick={reset}
              className="px-16 py-5 bg-stone-900/90 text-amber-100 font-bold rounded-full transition-all shadow-2xl font-serif-tc tracking-[1em] border-2 border-amber-900/30 text-lg hover:bg-black hover:border-amber-600/50"
            >
              謝 謝 神 恩
            </button>
            <div className="pb-12 text-stone-600 text-[10px] tracking-[0.4em] font-serif-tc uppercase">
              Heavenly Palace Digital Archive
            </div>
          </div>
        )}
      </div>

      {!isResultPhase && (
        <footer className="fixed bottom-6 text-stone-800 text-[9px] tracking-[1.2em] font-serif-tc uppercase bg-black/30 px-6 py-2 rounded-full border border-white/5 pointer-events-none backdrop-blur-sm">
          Aesthetically Divine ‧ Precision Oracle
        </footer>
      )}
    </div>
  );
};

export default App;
