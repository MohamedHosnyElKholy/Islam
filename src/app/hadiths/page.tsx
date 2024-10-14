"use client";
import React, { useContext, useEffect, useState } from "react";
import { hadithsContext } from "../context/hadithsContext";
import { Spinner } from "flowbite-react"; // استيراد الأيقونة

export default function Page() {
  const { getAllhadiths } = useContext(hadithsContext);
  const [allProduct, setAllProduct] = useState([]);
  const [serch, setserch] = useState("");
  const [loading, setloading] = useState(false);



  useEffect(() => {
    const getProduct = async () => {
      try {
        setloading(true);
        const data = await getAllhadiths();
        setAllProduct(data);
      } catch (error) {
        console.error("فشل في جلب الأحاديث", error);
      } finally {
        setloading(false);
      }
    };
    getProduct();
  }, [getAllhadiths]);

  const filterHadith = allProduct?.data?.items?.filter((el) =>
    String(el.number).includes(serch)
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-[50px]">
      <h1 className="text-3xl font-bold text-center mb-6">الأحاديث النبوية</h1>
      <input
        type="number"
        value={serch}
        placeholder="ابحث عن رقم الحديث..."
        onChange={(e) => setserch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full text-center text-gray-500">
            <Spinner
              color="warning"
              aria-label="Warning spinner example"
              className="fs-3"
              style={{ width: "3rem", height: "3rem" }}
            />
          </div>
        ) : filterHadith?.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            لا توجد نتائج
          </div>
        ) : (
          filterHadith?.map((el) => (
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
