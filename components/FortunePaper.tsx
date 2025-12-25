
import React from 'react';
import { FortunePoem } from '../types';

interface FortunePaperProps {
  fortune: FortunePoem;
}

const FortunePaper: React.FC<FortunePaperProps> = ({ fortune }) => {
  const DetailedItem = ({ label, content }: { label: string, content: string }) => (
    <div className="flex flex-col gap-2 p-4 bg-stone-50 border border-stone-200/60 rounded-sm hover:bg-stone-100 transition-colors shadow-sm">
      <span className="text-[10px] font-black text-red-900 tracking-[0.3em] border-b border-red-900/10 pb-1 mb-1">【 {label} 】</span>
      <span className="text-stone-800 text-base md:text-lg leading-relaxed ink-text">{content}</span>
    </div>
  );

  return (
    <div className="max-w-2xl w-full bg-[#fdfaf2] text-[#1c1917] p-8 md:p-16 rounded-sm shadow-[0_40px_100px_rgba(0,0,0,0.9)] border-l-[15px] md:border-l-[30px] border-red-900 relative overflow-visible font-serif-tc paper-texture animate-fadeIn">
      
      {/* 背景紋理 */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
      
      <div className="relative z-10">
        {/* 1. 籤頭區域 */}
        <div className="flex justify-between items-start mb-12 border-b-2 border-red-900/20 pb-10">
          <div className="flex items-center gap-6 md:gap-10">
            <div className="vertical-text text-red-900 font-black text-6xl md:text-8xl ink-text leading-none tracking-tighter">
              第{fortune.stickNumber}籤
            </div>
            <div className="h-32 w-px bg-red-900/10"></div>
            <div className="flex flex-col">
              <span className="text-[12px] font-black text-red-800 tracking-[0.5em] mb-3">【 靈 籤 標 題 】</span>
              <h2 className="text-3xl md:text-5xl font-black text-stone-900 ink-text tracking-tighter leading-tight">
                {fortune.title}
              </h2>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
             <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-red-900/30 flex items-center justify-center mb-2 shadow-inner bg-red-50/30">
                <span className="text-red-900 font-black text-3xl md:text-4xl">吉</span>
             </div>
             <div className="mt-2 w-12 h-12 border-2 border-red-700/60 flex items-center justify-center rotate-3 seal-effect">
                <span className="text-red-700 font-black text-[11px] leading-tight text-center">天后<br/>聖印</span>
             </div>
          </div>
        </div>

        {/* 2. 【 靈 籤 詩 文 】 - 絕對優先第一位 */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-red-900 rotate-45"></div>
            <h3 className="text-lg font-black text-red-900 tracking-[0.4em]">【 靈 籤 詩 文 】</h3>
          </div>
          <div className="flex flex-col items-center gap-8 md:gap-12 py-16 bg-stone-100/40 rounded-sm border-y border-stone-200/50 shadow-inner">
            {fortune.poem.map((line, idx) => (
              <p key={idx} className="text-3xl md:text-5xl font-black text-stone-900 ink-text tracking-[0.4em] leading-none">
                {line}
              </p>
            ))}
          </div>
        </section>

        {/* 3. 【 歷 史 故 事 】 - 順序二 */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-red-900 rotate-45"></div>
            <h3 className="text-lg font-black text-red-900 tracking-[0.4em]">【 歷 史 故 事 】</h3>
          </div>
          <div className="bg-stone-50 p-8 border-l-8 border-red-900/20 shadow-sm rounded-r-lg">
            <p className="text-stone-800 leading-[2.2] text-xl font-medium ink-text text-justify">
              {fortune.history}
            </p>
          </div>
        </section>

        {/* 4. 【 典 故 精 髓 】 - 順序三 */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-red-900 rotate-45"></div>
            <h3 className="text-lg font-black text-red-900 tracking-[0.4em]">【 典 故 精 髓 】</h3>
          </div>
          <div className="p-8 border border-stone-200/50 rounded-sm italic text-stone-600 leading-relaxed text-xl bg-white/60 shadow-inner">
            {fortune.essence}
          </div>
        </section>

        {/* 5. 【 大 師 詳 解 】 - 順序四 */}
        <section className="bg-[#fefaf4] p-8 md:p-12 rounded-sm border border-red-900/5 relative shadow-xl mb-14">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-900/20 to-transparent"></div>
          <h3 className="text-[13px] font-black text-red-800 tracking-[1em] mb-10 flex items-center justify-center border-b border-red-900/10 pb-6">
            大 師 詳 解 ‧ 悟 徹 天 機
          </h3>
          <div className="text-stone-900 font-medium leading-[2.4] whitespace-pre-wrap text-xl ink-text text-justify mb-4">
            {fortune.advice}
          </div>
        </section>

        {/* 6. 【 命 途 詳 析 】 - 順序五 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-red-900 rotate-45"></div>
            <h3 className="text-lg font-black text-red-900 tracking-[0.4em]">【 命 途 詳 析 】</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <DetailedItem label="運 勢" content={fortune.luck} />
            <DetailedItem label="事 業" content={fortune.career} />
            <DetailedItem label="財 運" content={fortune.wealth} />
            <DetailedItem label="感 情" content={fortune.romance} />
            <DetailedItem label="學 業" content={fortune.education} />
          </div>

          <div className="mt-16 flex justify-end items-center gap-4">
            <p className="text-stone-400 font-black tracking-widest text-xs italic">Authentic Decree ‧ Ancient Wisdom</p>
            <div className="w-16 h-16 border-2 border-red-800/80 p-1 flex items-center justify-center -rotate-12 seal-effect opacity-80 shadow-md">
              <span className="text-red-800 font-black text-[12px] text-center leading-none">聖意<br/>圓滿</span>
            </div>
          </div>
        </section>

        <div className="mt-20 pt-10 border-t border-red-900/10 text-center">
          <p className="text-[10px] text-stone-300 font-black tracking-[0.8em] uppercase">
            Faith Moves Mountains ‧ Virtue Guides The Way
          </p>
        </div>
      </div>
    </div>
  );
};

export default FortunePaper;
