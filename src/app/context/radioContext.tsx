"use client";
import axios from "axios";
import { createContext, ReactNode, useContext } from "react";

// تحديد نوع البيانات في السياق
interface RadioItem {
  id: number;
  name: string;
  frequency: string;
  img: string; // إضافة حقل للصورة
  url: string; // إضافة حقل لرابط الاستماع
}

interface RadioResponse {
  radios: RadioItem[]; // تغيير نوع البيانات لتتوافق مع الهيكل
}

interface RadioContextType {
  getAllRadio: () => Promise<RadioResponse | null>;
}

// تعيين قيمة افتراضية للسياق
const defaultContextValue: RadioContextType = {
  getAllRadio: async () => Promise.resolve(null),
};

export const RadioContext = createContext<RadioContextType>(defaultContextValue);

export default function RadioContextProvider({ children }: { children: ReactNode }) {
  const getAllRadio = async (): Promise<RadioResponse | null> => {
    try {
      const res = await axios.get<RadioResponse>("https://data-rosy.vercel.app/radio.json");
      return res.data;
    } catch (err) {
      console.error("Error fetching radio data:", err);
      return null;
    }
  };

  return (
    <RadioContext.Provider value={{ getAllRadio }}>
      {children}
    </RadioContext.Provider>
  );
}

// استخدام السياق
export const useRadioContext = () => useContext(RadioContext);
