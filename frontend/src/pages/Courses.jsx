import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [limitData, setLimitData] = useState(null);

  // 🔥 Ambil limit dari backend
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/membership/limit", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setLimitData)
      .catch(console.error);
  }, []);

  // 🔥 Ambil semua course + course user
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/courses")
      .then(res => res.json())
      .then(setCourses);

    fetch("http://localhost:5000/courses/my-courses", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setMyCourses(data.data || []));
  }, []);

  // 🔹 cek apakah course sudah diambil
  const isTaken = (id) =>
    myCourses.some(c => c.course_id === id);

  // 🔥 cek limit membership
  const isLimitReached = () => {
    if (!limitData) return false;
    if (limitData.limit === null) return false; // unlimited

    return limitData.total >= limitData.limit;
  };

  // 🔥 ambil course
  const handleAmbil = async (courseId) => {
    const token = localStorage.getItem("token");

    // guard frontend
    if (isLimitReached()) {
      alert("Limit paket kamu sudah habis");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/courses/add-course",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ courseId }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // update UI langsung (optimistic update)
        setMyCourses(prev => [...prev, { course_id: courseId }]);

        // update limit
        if (limitData && limitData.limit !== null) {
          setLimitData({
            ...limitData,
            total: limitData.total + 1
          });
        }

      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Terjadi error");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">

        <h2 className="text-xl font-semibold mb-4">
          📚 Daftar Course
        </h2>

        {/* 🔥 INFO LIMIT */}
        {limitData && (
          <p className="text-sm text-gray-400 mb-4">
            {limitData.limit === null
              ? "Unlimited access 🚀"
              : `Dipakai: ${limitData.total} / ${limitData.limit}`}
          </p>
        )}

        {/* 🔥 GRID COURSE */}
        <div className="grid grid-cols-4 gap-4">

          {courses.map((c) => (
            <div
              key={c.course_id}
              className="bg-[#1e2a45] p-4 rounded-lg hover:scale-105 transition"
            >
              <h3 className="font-semibold">{c.title}</h3>

              {/* STATUS */}
              <p className="text-xs mt-2 text-gray-400">
                {isTaken(c.course_id)
                  ? "Sudah Diambil"
                  : isLimitReached()
                    ? "Limit Habis"
                    : "Tersedia"}
              </p>

              {/* BUTTON */}
              <button
                onClick={() => handleAmbil(c.course_id)}
                disabled={isTaken(c.course_id) || isLimitReached()}
                className={`mt-3 w-full py-2 rounded ${
                  isTaken(c.course_id) || isLimitReached()
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-cyan-500 text-black"
                }`}
              >
                {isTaken(c.course_id)
                  ? "Sudah Diambil"
                  : isLimitReached()
                    ? "Limit Tercapai"
                    : "Ambil Course"}
              </button>

            </div>
          ))}

        </div>

        {/* 🔥 UPGRADE PROMPT */}
        {isLimitReached() && (
          <div className="mt-6 bg-[#16233a] p-4 rounded text-center">
            <p className="mb-2">
              Kamu sudah mencapai batas paket 🚫
            </p>
            <a
              href="/membership"
              className="bg-cyan-500 px-4 py-2 rounded text-black"
            >
              Upgrade Membership
            </a>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}