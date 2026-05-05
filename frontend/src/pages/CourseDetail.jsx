import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setCourse);
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/courses/remove-course/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    window.location.href = "/dashboard";
  };

  if (!course) return <p>Loading...</p>;

  return (
    <DashboardLayout>
      <div className="p-8 max-w-3xl mx-auto">

        {/* JUDUL */}
        <h1 className="text-2xl font-bold mb-2">
          {course.title}
        </h1>

        <p className="text-gray-400 mb-6">
          Materi pembelajaran
        </p>

        {/* 📖 ISI COURSE (KAYAK BUKU) */}
        <div className="bg-[#1e2a45] p-6 rounded-lg leading-relaxed">
          {course.content}
        </div>

        {/* ACTION */}
        <div className="mt-6 flex justify-between">

          <button
            onClick={() => window.history.back()}
            className="bg-gray-500 px-4 py-2 rounded text-white"
          >
            Kembali
          </button>

          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="bg-red-500 px-4 py-2 rounded text-white"
            >
              Hapus Course
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                className="bg-red-600 px-4 py-2 rounded text-white"
              >
                Yakin
              </button>

              <button
                onClick={() => setConfirmDelete(false)}
                className="bg-gray-500 px-4 py-2 rounded text-white"
              >
                Batal
              </button>
            </div>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
}