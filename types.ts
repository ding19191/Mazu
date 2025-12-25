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
  history: string;   // 完整的歷史故事
  story: string;     // 典故精髓/短評
  poem: string[];
  meaning: string;
  advice: string;
  wealth: string;
  career: string;
  romance: string;
  education: string;
  luck: string;
}
