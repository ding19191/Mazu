
import { FortunePoem } from "../types";
import { getLocalFortune } from "../data/fortuneData";

/**
 * 純淨離線求籤服務
 * 接收已抽出的籤號，從本地資料庫提取對應的 60 首深度詳解
 */
export const fetchFortunePoem = async (question: string, stickNumber: number): Promise<FortunePoem> => {
  // 增加沉浸式的等待時間，模擬「大師參悟」過程
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // 嚴格從本地庫獲取「該號碼」的數據，不再自行生成隨機數
  const localData = getLocalFortune(stickNumber);

  return {
    stickNumber: localData.id,
    title: localData.title,
    story: localData.story,
    poem: localData.poem,
    meaning: `此籤為「${localData.level}」。`,
    advice: localData.advice // 使用資料庫中對應的詳盡解析
  };
};
