"use client";
import axios from "axios";
import { createContext, useContext } from "react";

// تعيين قيمة افتراضية للسياق
const defaultContextValue = {
  getAllQuran: async () => Promise.resolve(null),
};

export const QuranContext = createContext(defaultContextValue);

export default function QuranContextProvider({ children }) {
  const getAllQuran = async () => {
    try {
      const res = await axios.get('https://api.alquran.cloud/v1/surah');
      return res.data; // إرجاع البيانات مباشرة
    } catch (err) {
      console.error(err);
      return null; // إرجاع null في حالة الخطأ
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
