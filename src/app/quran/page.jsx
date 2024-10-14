"use client";
import React, { useContext, useState, useEffect } from "react";
import { QuranContext } from "../context/quranContext";
import Link from "next/link";
import { Spinner } from "flowbite-react"; // استيراد الـ Spinner

export default function Page() {
  const { getAllQuran } = useContext(QuranContext);
  const [allSuras, setAllSuras] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchQuran = async () => {
    setLoading(true); // بدء حالة التحميل
    try {
      const data = await getAllQuran();
      if (data) {
        setAllSuras(data.data); // تعيين مصفوفة السور
      }
    } catch (error) {
      console.error("فشل في جلب البيانات", error);
    } finally {
      setLoading(false); // إنهاء حالة التحميل
    }
  };

  useEffect(() => {
    fetchQuran();
  }, []);

  const filteredSuras = allSuras.filter(
    (el) => el.name.includes(search) || el.englishName.includes(search)
  );

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-6xl mx-auto mt-[100px]">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        سور القرآن الكريم
      </h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="ابحث عن سورة..."
        className="mb-4 p-2 border rounded w-full"
      />
      {loading ? (
        <div className="flex justify-center">
          <Spinner
            color="warning"
            aria-label="Loading spinner"
            style={{ width: "3rem", height: "3rem" }}
          />
        </div>
      ) : filteredSuras.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSuras.map((el) => (
            <Link
              key={el.number}
              href={`/tafsir/${el.number}`}
              className="bg-white rounded-lg p-4 shadow transition-transform transform hover:scale-105"
            >
              <h2 className="text-xl font-semibold text-blue-600">
                {el.name} ({el.englishName})
              </h2>
              <p className="text-gray-700">
                عدد الآيات: <span className="font-bold">{el.numberOfAyahs}</span>
              </p>
              <p className="text-gray-500">
                نوع الوحي: <span className="font-medium">{el.revelationType}</span>
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">لا توجد بيانات لعرضها</p>
      )}
    </div>
  );
}
