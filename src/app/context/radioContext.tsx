"use client";
import axios from "axios";
import { createContext, ReactNode } from "react";

// تحديد نوع البيانات في السياق
interface RadioContextType {
  getAllTiems: () => Promise<any>; // يمكنك تحديد نوع البيانات التي تريد إرجاعها
}

// تعيين قيمة افتراضية للسياق
const defaultContextValue: RadioContextType = {
  getAllTiems: async () => Promise.resolve(null), // قيمة افتراضية
};

export const RadioContext = createContext<RadioContextType>(defaultContextValue);

export default function RadioContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const getAllRadio = async () => {
    try {
      const res = await axios.get(
        `https://data-rosy.vercel.app/radio.json`
      );
      return res; // Assuming you want to return the data directly
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <RadioContext.Provider value={{ getAllRadio }}>
            {children}
    </RadioContext.Provider>
  );
}
