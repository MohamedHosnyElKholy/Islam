'use client';
import React, { useContext, useEffect, useState } from 'react';
import { AdkarContext } from './../context/adhkarContect';

export default function Page() {
  const { getAllAdkar } = useContext(AdkarContext);
  const [allProduct, setAllProduct] = useState([]);

  const getQuran = async () => {
    try {
      const data = await getAllAdkar();
      setAllProduct(data);
    } catch (error) {
      console.error("فشل في جلب البيانات", error);
    }
  };

  useEffect(() => {
    getQuran();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-[50px]">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">أذكار الصباح والمساء</h1>
      {allProduct?.data?.['أذكار الصباح والمساء']?.map((el) => (
        <div key={el.ID} className="mb-6 p-6 border border-gray-300 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <p className="text-lg font-semibold text-gray-800">{el.ARABIC_TEXT}</p>
          {el.AUDIO ? (
            <div className="mt-4">
              <audio controls className="w-full">
                <source src={el.AUDIO} type="audio/mpeg" />
                متصفحك لا يدعم عنصر الصوت.
              </audio>
            </div>
          ) : (
            <p className="text-red-500 mt-2">رابط الصوت غير متوفر</p>
          )}
          <p className="text-gray-600 mt-2">عدد مرات التكرار: <span className="font-bold">{el.REPEAT}</span></p>
        </div>
      ))}
    </div>
  );
}
