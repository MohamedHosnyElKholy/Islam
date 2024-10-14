"use client";
import axios from "axios";
import { createContext, ReactNode } from "react";

// تحديد نوع البيانات في السياق
interface TimeContextType {
  getAllTiems: () => Promise<any>; // يمكنك تحديد نوع البيانات التي تريد إرجاعها
}

// تعيين قيمة افتراضية للسياق
const defaultContextValue: TimeContextType = {
  getAllTiems: async () => Promise.resolve(null), // قيمة افتراضية
};

export const TimeContext = createContext<TimeContextType>(defaultContextValue);

export default function TimeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const getAllTiems = async () => {
    try {
      const res = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity/13-10-2024?city=cairo&country=egypt&method=8`
      );
      return res; // Assuming you want to return the data directly
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TimeContext.Provider value={{ getAllTiems }}>
            {children}   {" "}
    </TimeContext.Provider>
  );
}
