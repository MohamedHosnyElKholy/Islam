"use client";
import axios from "axios";
import { createContext, ReactNode } from "react";

// تحديد نوع البيانات في السياق
interface AdkarContextType {
  getAllTiems: () => Promise<any>; // يمكنك تحديد نوع البيانات التي تريد إرجاعها
}

// تعيين قيمة افتراضية للسياق
const defaultContextValue: AdkarContextType = {
  getAllTiems: async () => Promise.resolve(null), // قيمة افتراضية
};

export const AdkarContext = createContext<AdkarContextType>(defaultContextValue);

export default function AdkarContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const getAllAdkar = async () => {
    try {
      const res = await axios.get(
        `https://www.hisnmuslim.com/api/ar/27.json`
      );
      return res; // Assuming you want to return the data directly
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdkarContext.Provider value={{ getAllAdkar }}>
            {children}
    </AdkarContext.Provider>
  );
}
