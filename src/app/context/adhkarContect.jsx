'use client';
import axios from "axios";
import { createContext, ReactNode } from "react";

// تعيين قيمة افتراضية للسياق
const defaultContextValue = {
  getAllAdkar: async () => Promise.resolve(null), // قيمة افتراضية
};

export const AdkarContext = createContext(defaultContextValue);

export default function AdkarContextProvider({ children }) {
  const getAllAdkar = async () => {
    try {
      const res = await axios.get(
        `https://www.hisnmuslim.com/api/ar/27.json`
      );
      return res; // إرجاع مصفوفة الأذكار
    } catch (err) {
      console.error("فشل في جلب الأذكار", err);
      return null; // تأكد من إرجاع null في حالة حدوث خطأ
    }
  };

  return (
    <AdkarContext.Provider value={{ getAllAdkar }}>
      {children}
    </AdkarContext.Provider>
  );
}
