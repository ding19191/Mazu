
export enum AppPhase {
  INPUT = 'INPUT',
  DRAWING = 'DRAWING',
  STRICT_REVEALED = 'STRICT_REVEALED',
  DIVINATION = 'DIVINATION',
  RESULT = 'RESULT'
}

export enum DivinationResult {
  SHENG_JIAO = 'SHENG_JIAO', // 聖筊 (One flat, one round)
  XIAO_JIAO = 'XIAO_JIAO',   // 笑筊 (Two flat)
  YIN_JIAO = 'YIN_JIAO',     // 陰筊 (Two round)
  NONE = 'NONE'
}

export interface FortunePoem {
  stickNumber: number;
  title: string;
  story: string;
  poem: string[];
  meaning: string;
  advice: string;
  // 新增細項解析
  wealth: string;
  career: string;
  romance: string;
  education: string;
  luck: string;
}
