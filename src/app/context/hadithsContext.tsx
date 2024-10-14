"use client";
import axios from "axios";
import { createContext, ReactNode } from "react";

// تحديد نوع البيانات في السياق
interface hadithsContextType {
  getAllTiems: () => Promise<any>; // يمكنك تحديد نوع البيانات التي تريد إرجاعها
}

// تعيين قيمة افتراضية للسياق
const defaultContextValue: hadithsContextType = {
  getAllTiems: async () => Promise.resolve(null), // قيمة افتراضية
};

export const hadithsContext = createContext<hadithsContextType>(defaultContextValue);

export default function HadithsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const getAllhadiths = async () => {
    try {
      const res = await axios.get(
        `https://hadis-api-id.vercel.app/hadith/abu-dawud?page=2&limit=300`
      );
      return res; // Assuming you want to return the data directly
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <hadithsContext.Provider value={{ getAllhadiths}}>
            {children}
    </hadithsContext.Provider>
  );
}
