"use client";
import axios from "axios";
import { createContext, ReactNode } from "react";

// تحديد نوع البيانات في السياق
interface tafsirContextType {
  getAllTiems: () => Promise<any>; // يمكنك تحديد نوع البيانات التي تريد إرجاعها
}

// تعيين قيمة افتراضية للسياق
const defaultContextValue: tafsirContextType = {
  getAllTiems: async () => Promise.resolve(null), // قيمة افتراضية
};

export const tafsirContext = createContext<tafsirContextType>(defaultContextValue);

export default function TafsirContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const getAllTafsir = async (id) => {
    try {
      const res = await axios.get(
        `https://quranenc.com/api/v1/translation/sura/arabic_moyassar/${id}`
      );
      return res; // Assuming you want to return the data directly
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <tafsirContext.Provider value={{ getAllTafsir }}>
       {children}
    </tafsirContext.Provider>
  );
}
