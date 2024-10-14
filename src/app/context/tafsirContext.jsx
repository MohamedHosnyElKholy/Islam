"use client";
import axios from "axios";
import { createContext } from "react";

// تعيين قيمة افتراضية للسياق
const defaultContextValue = {
  getAllTafsir: async () => Promise.resolve(null), // قيمة افتراضية
};

export const tafsirContext = createContext(defaultContextValue);

export default function TafsirContextProvider({ children }) {
  const getAllTafsir = async (id) => {
    try {
      const res = await axios.get(
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
