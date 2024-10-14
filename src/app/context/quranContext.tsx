"use client";
import axios from "axios";
import { createContext, ReactNode, useContext } from "react";

// تحديد نوع البيانات في السياق
interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface QuranResponse {
  data: Surah[];
}

interface QuranContextType {
  getAllQuran: () => Promise<QuranResponse | null>;
}

// تعيين قيمة افتراضية للسياق
const defaultContextValue: QuranContextType = {
  getAllQuran: async () => Promise.resolve(null),
};

export const QuranContext = createContext<QuranContextType>(defaultContextValue);

export default function QuranContextProvider({ children }: { children: ReactNode }) {
  const getAllQuran = async (): Promise<QuranResponse | null> => {
    try {
      const res = await axios.get<QuranResponse>('https://api.alquran.cloud/v1/surah');
      return res.data; // Return the data directly
    } catch (err) {
      console.error(err);
      return null; // Return null on error
    }
  };

  return (
    <QuranContext.Provider value={{ getAllQuran }}>
      {children}
    </QuranContext.Provider>
  );
}

// يمكنك إضافة دالة لاستخدام السياق
export const useQuranContext = () => useContext(QuranContext);
