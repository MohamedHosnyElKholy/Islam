"use client";

import React, { useContext, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { tafsirContext } from "../../context/tafsirContext";
import { Spinner } from "flowbite-react"; // استيراد Spinner

export default function Page() {
  const { id } = useParams(); // تحديد نوع id
  const { getAllTafsir } = useContext(tafsirContext);
  const [allProduct, setAllProduct] = useState([]); // استخدام النوع المناسب
  const [loading, setLoading] = useState(true); // حالة التحميل

  const handleGetTafsir = async (id) => {
    try {
      const data = await getAllTafsir(id);
      if (data) {
        setAllProduct(data.result); // استخدام data.result مباشرة
      }
    } catch (error) {
      console.error("فشل في جلب البيانات", error);
    } finally {
      setLoading(false); // إنهاء حالة التحميل
    }
  };

  useEffect(() => {
    handleGetTafsir(parseInt(id)); // تحويل id إلى عدد صحيح
  }, [id]);

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg mt-[100px]">
      {loading ? (
        <div className="flex justify-center">
          <Spinner
            color="warning"
            aria-label="Loading spinner"
            style={{ width: "3rem", height: "3rem" }} // تعديل الحجم
          />
        </div>
      ) : (
        allProduct.map((el) => (
          <div
            key={el.id}
            className="mb-6 p-6 border border-blue-300 rounded-lg bg-white shadow-md transition-transform transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-gray-800">{`الآية: ${el.aya}`}</h3>
            <p className="mt-2 text-xl text-gray-900 font-bold">
              <strong>النص:</strong> {el.arabic_text}
            </p>
            <p className="mt-2 text-gray-700">
              <strong>التفسير:</strong> {el.translation}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
