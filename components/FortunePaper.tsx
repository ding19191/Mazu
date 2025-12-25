
import React from 'react';
import { FortunePoem } from '../types';

interface FortunePaperProps {
  fortune: FortunePoem;
}

const FortunePaper: React.FC<FortunePaperProps> = ({ fortune }) => {
  const DetailedItem = ({ label, content }: { label: string, content: string }) => (
    <div className="flex flex-col gap-2 p-4 bg-stone-50 border border-stone-200/60 rounded-sm">
      <span className="text-[10px] font-black text-red-900 tracking-[0.3em] border-b border-red-900/10 pb-1 mb-1">【 {label} 】</span>
      <span className="text-stone-800 text-base md:text-lg leading-relaxed ink-text">{content}</span>
    </div>
  );

  return (
    <div className="max-w-xl w-full bg-[#fdfaf2] text-[#1c1917] p-8 md:p-14 rounded-sm shadow-[0_40px_100px_rgba(0,0,0,0.9)] border-l-[15px] md:border-l-[25px] border-red-900 relative overflow-visible font-serif-tc paper-texture animate-fadeIn">
      
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <span className="text-[25rem] font-black leading-none">靈</span>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-12 border-b-2 border-red-900/20 pb-10">
          <div className="flex items-center gap-4 md:gap-8">
            <div className="vertical-text text-red-900 font-black text-5xl md:text-7xl ink-text leading-none tracking-tighter">
              第{fortune.stickNumber}籤
            </div>
            <div className="h-28 w-px bg-red-900/10"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-red-800 tracking-[0.5em] mb-2">【 靈 籤 典 故 】</span>
              <h2 className="text-2xl md:text-4xl font-black text-stone-900 ink-text tracking-tighter leading-tight max-w-[220px]">
                {fortune.title}
              </h2>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
             <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-red-900/30 flex items-center justify-center mb-2 shadow-inner bg-red-50/30">
                <span className="text-red-900 font-black text-2xl md:text-3xl">
                  {fortune.meaning.includes('大吉') || fortune.meaning.includes('上上') ? '極' : '吉'}
                </span>
             </div>
             <div className="mt-2 w-10 h-10 border-2 border-red-700/60 flex items-center justify-center rotate-3 seal-effect">
                <span className="text-red-700 font-black text-[10px] leading-tight text-center">天后<br/>聖印</span>
             </div>
          </div>
        </div>

        {/* Poem Section */}
        <div className="flex flex-col items-center gap-6 md:gap-10 mb-16 py-14 bg-stone-100/40 rounded-sm border-y border-stone-200/50">
          {fortune.poem.map((line, idx) => (
            <p key={idx} className="text-3xl md:text-4xl font-black text-stone-900 ink-text tracking-[0.3em] leading-none">
              {line}
            </p>
          ))}
        </div>

        {/* Analysis Content */}
        <div className="space-y-12">
          {/* 典故精髓 */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 bg-red-900"></div>
              <h3 className="text-xs font-black text-red-900 tracking-[0.4em]">【 典 故 精 髓 】</h3>
            </div>
            <div className="bg-stone-50 p-6 border-l-4 border-red-900/10 italic text-stone-700 leading-relaxed text-lg font-medium">
              {fortune.story}
            </div>
          </section>

          {/* 大師開示 */}
          <section className="bg-[#fefaf4] p-6 md:p-10 rounded-sm border border-red-900/5 relative shadow-sm">
            <h3 className="text-[11px] font-black text-red-800 tracking-[0.8em] mb-8 flex items-center justify-center border-b border-red-900/10 pb-4">
              大 師 詳 解 ‧ 悟 徹 天 機
            </h3>
            <div className="text-stone-900 font-medium leading-[2.2] whitespace-pre-wrap text-lg ink-text text-justify mb-10">
              {fortune.advice}
            </div>
            
            {/* 五大分類斷語 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <DetailedItem label="運 勢" content={fortune.luck} />
              <DetailedItem label="事 業" content={fortune.career} />
              <DetailedItem label="財 運" content={fortune.wealth} />
              <DetailedItem label="感 情" content={fortune.romance} />
              <DetailedItem label="學 業" content={fortune.education} />
            </div>

            <div className="mt-12 flex justify-end">
              <div className="w-14 h-14 border-2 border-red-800/80 p-1 flex items-center justify-center -rotate-12 seal-effect opacity-80">
                <span className="text-red-800 font-black text-[11px] text-center leading-none">大師<br/>之章</span>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-20 pt-10 border-t border-red-900/10 text-center">
          <p className="text-[10px] text-stone-400 font-black tracking-[0.6em] uppercase">
            Divine Decree ‧ Prosperity Follows Virtue
          </p>
        </div>
      </div>
    </div>
  );
};

export default FortunePaper;
