"use client";
import axios from "axios";
import { createContext, ReactNode } from "react";

// تعريف نوع البيانات للإجابة
interface TimingsResponse {
  data: {
    data: {
      timings: {
        [key: string]: string; // مواقيت الصلاة (مثل الفجر، الظهر، إلخ)
      };
    };
  };
}

interface TimeContextType {
  getAllTiems: () => Promise<TimingsResponse | null>; // تحديد نوع البيانات التي سيتم إرجاعها
}

// تعيين قيمة افتراضية للسياق
const defaultContextValue: TimeContextType = {
  getAllTiems: async () => Promise.resolve(null), // قيمة افتراضية
};

export const TimeContext = createContext<TimeContextType>(defaultContextValue);

export default function TimeContextProvider({ children }: { children: ReactNode }) {
  const getAllTiems = async (): Promise<TimingsResponse | null> => {
    try {
      const res = await axios.get<TimingsResponse>(
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
