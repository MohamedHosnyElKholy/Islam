"use client";
import axios from "axios";
import { createContext, ReactNode } from "react";

// تحديد نوع البيانات في السياق
interface QuranContextType {
  getAllTiems: () => Promise<any>; // يمكنك تحديد نوع البيانات التي تريد إرجاعها
}

// تعيين قيمة افتراضية للسياق
const defaultContextValue: QuranContextType = {
  getAllTiems: async () => Promise.resolve(null), // قيمة افتراضية
};

export const QuranContext = createContext<QuranContextType>(defaultContextValue);

export default function QuranContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const getAllQuran = async () => {
    try {
      const res = await axios.get(
        `https://api.alquran.cloud/v1/surah`
      );
      return res; // Assuming you want to return the data directly
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <QuranContext.Provider value={{ getAllQuran }}>
            {children}   {" "}
    </QuranContext.Provider>
  );
}
