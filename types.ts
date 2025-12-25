
export enum AppPhase {
  INPUT = 'INPUT',
  DRAWING = 'DRAWING',
  STRICT_REVEALED = 'STRICT_REVEALED',
  DIVINATION = 'DIVINATION',
  RESULT = 'RESULT'
}

export enum DivinationResult {
  SHENG_JIAO = 'SHENG_JIAO', 
  XIAO_JIAO = 'XIAO_JIAO',   
  YIN_JIAO = 'YIN_JIAO',     
  NONE = 'NONE'
}

export interface FortunePoem {
  stickNumber: number;
  title: string;
  poem: string[];
  history: string;   // 1. 歷史故事
  essence: string;   // 2. 典故精髓
  advice: string;    // 3. 大師開示詳解
  luck: string;      // 4. 五大維度：運勢
  career: string;    // 4. 五大維度：事業
  wealth: string;    // 4. 五大維度：財運
  romance: string;   // 4. 五大維度：感情
  education: string; // 4. 五大維度：學業
}
