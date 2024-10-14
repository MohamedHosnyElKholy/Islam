"use client";
import axios from "axios";
import { createContext } from "react";

// تعيين قيمة افتراضية للسياق
const defaultContextValue = {
  getAllHadiths: async () => Promise.resolve(null),
};

export const hadithsContext = createContext(defaultContextValue);

export default function HadithsContextProvider({ children }) {
  const getAllHadiths = async () => {
    try {
      const res = await axios.get(
        `https://hadis-api-id.vercel.app/hadith/abu-dawud?page=2&limit=300`
      );
      return res.data; // إرجاع البيانات
    } catch (err) {
      console.error("فشل في جلب الأحاديث", err);
      return null; 
    }
  };

  return (
    <hadithsContext.Provider value={{ getAllHadiths }}>
      {children}
    </hadithsContext.Provider>
  );
}
