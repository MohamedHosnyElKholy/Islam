"use client";
import axios from "axios";
import { createContext, ReactNode } from "react";

interface Hadith {
  id: number;
  number: number;
  arab: string;
}

interface HadithsContextType {
  getAllHadiths: () => Promise<Hadith[] | null>;
}

const defaultContextValue: HadithsContextType = {
  getAllHadiths: async () => Promise.resolve(null),
};

export const hadithsContext = createContext<HadithsContextType>(defaultContextValue);

export default function HadithsContextProvider({ children }: { children: ReactNode }) {
  const getAllHadiths = async (): Promise<Hadith[] | null> => {
    try {
      const res = await axios.get<{ data: Hadith[] }>(
        `https://hadis-api-id.vercel.app/hadith/abu-dawud?page=2&limit=300`
      );
      return res.data; // إرجاع البيانات
    } catch (err) {
      console.error("فشل في جلب الأحاديث", err);
      return null; 
    }
  };

  return (
    <hadithsContext.Provider value={{ getAllHadiths }}>
      {children}
    </hadithsContext.Provider>
  );
}
