
import { FortunePoem } from "../types";
import { getLocalFortune } from "../data/fortuneData";

/**
 * 純淨離線求籤服務
 * 100% 依賴本地資料庫，確保 60 首籤詩皆有深度詳解
 */
export const fetchFortunePoem = async (question: string): Promise<FortunePoem> => {
  // 增加一點點沉浸式的等待時間，模擬「參悟」過程
  await new Promise(resolve => setTimeout(resolve, 1800));

  // 隨機抽取 1-60 號碼
  const stickNumber = Math.floor(Math.random() * 60) + 1;
  
  // 從本地庫獲取數據
  const localData = getLocalFortune(stickNumber);

  return {
    stickNumber: localData.id,
    title: localData.title,
    story: localData.story,
    poem: localData.poem,
    meaning: `此籤為「${localData.level}」。`,
    advice: localData.advice // 使用本地庫中預設的深度解析
  };
};
