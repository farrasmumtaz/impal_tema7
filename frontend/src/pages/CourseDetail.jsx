import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

export default function CourseDetail() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [confirmDelete, setConfirmDelete] =
    useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(
      `http://localhost:5000/courses/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then(setCourse);
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/courses/remove-course/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    window.location.href = "/dashboard";
  };

  if (!course) {
    return (
      <DashboardLayout>

        <div className="text-white">
          Loading...
        </div>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <p className="text-[#64748B] text-sm">
            Course Detail
          </p>

          <h1 className="text-3xl font-bold text-white mt-1 leading-tight">
            {course.title}
          </h1>

          <p className="text-[#64748B] mt-3">
            Materi pembelajaran interaktif
          </p>

        </div>

        {/* CONTENT */}
        <div
          className="
            bg-[#101C38]
            border border-white/5
            rounded-2xl
            p-7
          "
        >

          {/* TOP INFO */}
          <div
            className="
              flex items-center justify-between
              border-b border-white/5
              pb-5 mb-6
            "
          >

            <div className="flex items-center gap-4">

              {/* ICON */}
              <div
                className="
                  w-12 h-12
                  rounded-xl
                  bg-cyan-400/10
                  text-cyan-300
                  flex items-center justify-center
                "
              >
                <div className="w-3 h-3 border border-current" />
              </div>

              {/* INFO */}
              <div>

                <h2 className="text-lg font-semibold text-white">
                  {course.title}
                </h2>

                <p className="text-sm text-[#64748B] mt-1">
                  Materi pembelajaran
                </p>

              </div>

            </div>

            {/* STATUS */}
            <div
              className="
                px-3 py-1
                rounded-full
                bg-cyan-400/10
                border border-cyan-400/20
                text-cyan-400
                text-xs
                font-semibold
              "
            >
              Active
            </div>

          </div>

          {/* COURSE CONTENT */}
          <div
            className="
              text-[#D6E1FF]
              leading-8
              whitespace-pre-wrap
              text-[15px]
            "
          >
            {course.content}
          </div>

        </div>

        {/* ACTION */}
        <div className="flex justify-between mt-6">

          {/* BACK */}
          <button
            onClick={() =>
              window.history.back()
            }
            className="
              px-5 py-2.5
              rounded-xl
              border border-white/10
              text-white
              font-medium
              hover:bg-white/5
              transition
            "
          >
            Kembali
          </button>

          {/* DELETE */}
          {!confirmDelete ? (

            <button
              onClick={() =>
                setConfirmDelete(true)
              }
              className="
                px-5 py-2.5
                rounded-xl
                bg-red-500
                text-white
                font-medium
                hover:bg-red-600
                transition
              "
            >
              Hapus Course
            </button>

          ) : (

            <div className="flex gap-3">

              <button
                onClick={handleDelete}
                className="
                  px-5 py-2.5
                  rounded-xl
                  bg-red-600
                  text-white
                  font-medium
                  hover:bg-red-700
                  transition
                "
              >
                Yakin Hapus
              </button>

              <button
                onClick={() =>
                  setConfirmDelete(false)
                }
                className="
                  px-5 py-2.5
                  rounded-xl
                  border border-white/10
                  text-white
                  font-medium
                  hover:bg-white/5
                  transition
                "
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