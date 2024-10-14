"use client";
import axios from "axios";
import { createContext } from "react";

// تعيين قيمة افتراضية للسياق
const defaultContextValue = {
  getAllTiems: async () => Promise.resolve(null), // قيمة افتراضية
};

export const TimeContext = createContext(defaultContextValue);

export default function TimeContextProvider({ children }) {
  const getAllTiems = async () => {
    try {
      const res = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity/13-10-2024?city=cairo&country=egypt&method=8`
      );
      return res.data; // إرجاع البيانات
    } catch (err) {
      console.error("Error fetching timings:", err);
      return null; // إعادة null في حال حدوث خطأ
    }
  };

  return (
    <TimeContext.Provider value={{ getAllTiems }}>
      {children}
    </TimeContext.Provider>
  );
}
