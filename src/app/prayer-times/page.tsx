"use client";
import { useContext, useEffect, useState } from "react";
import { TimeContext } from "../context/tiemContext";
import { Spinner } from "flowbite-react"; // استيراد الـ Spinner

// تعريف نوع البيانات التي سيتم استرجاعها
interface TimingData {
  [key: string]: string; // المفتاح هو نص والقيمة هي نص
}

const DataComponent = () => {
  const { getAllTiems } = useContext(TimeContext);
  const [allProduct, setAllProduct] = useState<TimingData | null>(null); // تحديد النوع
  const [loading, setLoading] = useState<boolean>(true); // حالة التحميل

  const getProduct = async () => {
    try {
      const data = await getAllTiems();
      setAllProduct(data ? data.data.timings : null); // تحديث حالة المنتج
    } catch (error) {
      console.error("فشل في جلب المواقيت", error);
    } finally {
      setLoading(false); // إنهاء حالة التحميل
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const allTiiems = Object.entries(allProduct || {}); // الحصول على المدخلات

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-[100px]">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">مواقيت الصلاة</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner
            color="warning"
            aria-label="Loading spinner"
            style={{ width: "3rem", height: "3rem" }} // تعديل الحجم
          />
        </div>
      ) : allTiiems.length > 0 ? (
        allTiiems.map((el) => (
          <div key={el[0]} className="flex justify-between items-center border-b border-gray-300 py-3">
            <p className="text-lg font-semibold text-gray-700">{el[0]}</p>
            <p className="text-lg text-gray-500">{el[1]}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-4">لا توجد بيانات لعرضها</p>
      )}
    </div>
  );
};

export default DataComponent;
