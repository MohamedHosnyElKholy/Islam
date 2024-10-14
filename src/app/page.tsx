import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">مرحبًا بكم في التطبيق الإسلامي</h1>
        <p className="mt-2 text-lg text-gray-600">احصل على مواقيت الصلاة، قراءة القرآن، واستمع إلى الأحاديث.</p>
      </header>

      <section className="mb-8 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800">استكشف الأقسام</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Link href="/prayer-times">
            <div className="p-6 bg-blue-500 text-white rounded-lg shadow-md text-center hover:bg-blue-600 transition">
              <h3 className="text-xl font-semibold">مواقيت الصلاة</h3>
            </div>
          </Link>
          <Link href="/quran">
            <div className="p-6 bg-green-500 text-white rounded-lg shadow-md text-center hover:bg-green-600 transition">
              <h3 className="text-xl font-semibold">القرآن الكريم</h3>
            </div>
          </Link>
          <Link href="/hadiths">
            <div className="p-6 bg-red-500 text-white rounded-lg shadow-md text-center hover:bg-red-600 transition">
              <h3 className="text-xl font-semibold">الأحاديث</h3>
            </div>
          </Link>
          <Link href="/adhkar">
            <div className="p-6 bg-purple-500 text-white rounded-lg shadow-md text-center hover:bg-purple-600 transition">
              <h3 className="text-xl font-semibold">الأذكار</h3>
            </div>
          </Link>
          <div className="col-span-1 md:col-span-2 text-center">
            <Link href="/radio">
              <div className="p-6 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition">
                <h3 className="text-xl font-semibold">راديو القرآن</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
