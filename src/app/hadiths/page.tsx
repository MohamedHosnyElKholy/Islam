"use client";
import React, { useContext, useEffect, useState } from "react";
import { hadithsContext } from "../context/hadithsContext";
import { Spinner } from "flowbite-react";

export default function Page() {
  const { getAllHadiths } = useContext(hadithsContext);
  const [allHadiths, setAllHadiths] = useState<Hadith[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchHadiths = async () => {
      try {
        setLoading(true);
        const data = await getAllHadiths();
        if (data) {
          setAllHadiths(data);
        }
      } catch (error) {
        console.error("فشل في جلب الأحاديث", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHadiths();
  }, [getAllHadiths]);

  console.log(allHadiths)

  const filteredHadiths  = allHadiths?.items?.filter((el) =>
    String(el.number).includes(search)
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-[50px]">
      <h1 className="text-3xl font-bold text-center mb-6">الأحاديث النبوية</h1>
      <input
        type="number"
        value={search}
        placeholder="ابحث عن رقم الحديث..."
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full text-center text-gray-500">
            <Spinner
              color="warning"
              aria-label="Loading spinner"
              className="fs-3"
              style={{ width: "3rem", height: "3rem" }}
            />
          </div>
        ) : filteredHadiths?.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            لا توجد نتائج
          </div>
        ) : (
          filteredHadiths?.map((el) => (
            <div
              key={el.id}
              className="bg-white rounded-lg shadow p-4 transition-transform transform hover:scale-105"
            >
              <h2 className="text-lg font-semibold mb-2">
                رقم الحديث: {el.number}
              </h2>
              <p className="text-gray-700 mb-4">{el.arab}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
