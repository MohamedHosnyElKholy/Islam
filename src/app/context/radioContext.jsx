"use client";
import axios from "axios";
import { createContext, ReactNode, useContext } from "react";

// تعيين قيمة افتراضية للسياق
const defaultContextValue = {
  getAllRadio: async () => Promise.resolve(null),
};

export const RadioContext = createContext(defaultContextValue);

export default function RadioContextProvider({ children }) {
  const getAllRadio = async () => {
    try {
      const res = await axios.get("https://data-rosy.vercel.app/radio.json");
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
