
import { FortunePoem } from "../types";
import { getLocalFortune } from "../data/fortuneData";

/**
 * 純淨離線求籤服務
 * 完全重新編程，確保資料獲取與顯示欄位一致
 */
export const fetchFortunePoem = async (question: string, stickNumber: number): Promise<FortunePoem> => {
  // 增加沉浸式的等待時間，模擬「大師參悟」過程
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // 嚴格從本地庫獲取數據
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
