"use client";
import axios from "axios";
import { createContext, ReactNode } from "react";

// تعريف نوع البيانات للإجابة
interface TafsirResponse {
  result: TafsirItem[];
}

interface TafsirItem {
  id: number;
  aya: string;
  arabic_text: string;
  translation: string;
}

interface TafsirContextType {
  getAllTafsir: (id: number) => Promise<TafsirResponse | null>; // تحديد نوع البيانات التي سيتم إرجاعها
}

// تعيين قيمة افتراضية للسياق
const defaultContextValue: TafsirContextType = {
  getAllTafsir: async () => Promise.resolve(null), // قيمة افتراضية
};

export const tafsirContext = createContext<TafsirContextType>(defaultContextValue);

export default function TafsirContextProvider({ children }: { children: ReactNode }) {
  const getAllTafsir = async (id: number): Promise<TafsirResponse | null> => {
    try {
      const res = await axios.get<TafsirResponse>(
        `https://quranenc.com/api/v1/translation/sura/arabic_moyassar/${id}`
      );
      return res.data; // إرجاع البيانات
    } catch (err) {
      console.error("Error fetching tafsir:", err);
      return null; // إعادة null في حال حدوث خطأ
    }
  };

  return (
    <tafsirContext.Provider value={{ getAllTafsir }}>
      {children}
    </tafsirContext.Provider>
  );
}
