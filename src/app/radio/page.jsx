'use client';
import React, { useContext, useEffect, useState } from 'react';
import { RadioContext } from './../context/radioContext';
import { Spinner } from 'flowbite-react'; // استيراد Spinner

export default function Page() {
    const { getAllRadio } = useContext(RadioContext);
    const [allProduct, setAllProduct] = useState([]);
    const [loading, setLoading] = useState(true); // حالة التحميل

    const getRadio = async () => {
        try {
            const data = await getAllRadio();
            setAllProduct(data);
        } catch (error) {
            console.error("فشل في جلب البيانات", error);
        } finally {
            setLoading(false); // إنهاء حالة التحميل
        }
    };

    useEffect(() => {
        getRadio();
    }, []);

    return (
        <div className="p-6 bg-gray-50 mt-[50px]">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">قائمة الإذاعات</h2>
            {loading ? (
                <div className="flex justify-center">
                    <Spinner
                        color="warning"
                        aria-label="Loading spinner"
                        style={{ width: "3rem", height: "3rem" }} // تعديل الحجم
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allProduct?.data?.radios?.map((el) => (
                        <div key={el.id} className="flex flex-col items-center mb-4 p-4 border border-gray-300 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img 
                                src={el.img} 
                                alt={el.name} 
                                className="w-24 h-24 rounded-full mb-2 object-cover"
                            />
                            <h3 className="text-lg font-semibold text-gray-800 text-center">{el.name}</h3>
                            <a 
                                href={el.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="mt-2 text-blue-600 hover:underline"
                            >
                                استمع الآن
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
