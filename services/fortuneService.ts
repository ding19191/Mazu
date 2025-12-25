
import { FortunePoem } from "../types";
import { getLocalFortune } from "../data/fortuneData";

/**
 * 專業離線求籤服務
 * 嚴格對應資料庫中的歷史故事、詩文與開示
 */
export const fetchFortunePoem = async (question: string, stickNumber: number): Promise<FortunePoem> => {
  // 模擬沉浸式的等待時間
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // 直接從校對後的本地庫獲取數據
  const localData = getLocalFortune(stickNumber);

  return {
    stickNumber: localData.id,
    title: localData.title,
    poem: localData.poem,
    history: localData.history,
    essence: localData.essence,
    advice: localData.advice,
    luck: localData.luck,
    career: localData.career,
    wealth: localData.wealth,
    romance: localData.romance,
    education: localData.education
  };
};
