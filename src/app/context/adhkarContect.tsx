"use client";
import axios, { AxiosResponse } from "axios";
import { createContext, ReactNode } from "react";

// تحديد نوع البيانات في السياق
interface Adkar {
  ID: number;
  ARABIC_TEXT: string;
  AUDIO?: string; // يمكن أن تكون فارغة
  REPEAT: number;
  // أضف أي حقول أخرى حسب الحاجة
}

interface AdkarResponse {
  adkar: Adkar[]; // الهيكل المتوقع للبيانات
}

interface AdkarContextType {
  getAllAdkar: () => Promise<Adkar[] | null>; // تحديد نوع البيانات التي تريد إرجاعها
}

// تعيين قيمة افتراضية للسياق
const defaultContextValue: AdkarContextType = {
  getAllAdkar: async () => Promise.resolve(null), // قيمة افتراضية
};

export const AdkarContext = createContext<AdkarContextType>(defaultContextValue);

export default function AdkarContextProvider({ children }: { children: ReactNode }) {
  const getAllAdkar = async (): Promise<Adkar[] | null> => {
    try {
      const res: AxiosResponse<AdkarResponse> = await axios.get(
        `https://www.hisnmuslim.com/api/ar/27.json`
      );
      return res.data.adkar; // إرجاع مصفوفة الأذكار
    } catch (err) {
      console.error("فشل في جلب الأذكار", err);
      return null; // تأكد من إرجاع null في حالة حدوث خطأ
    }
  };

  return (
    <AdkarContext.Provider value={{ getAllAdkar }}>
      {children}
    </AdkarContext.Provider>
  );
}
