import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { API_URL } from "../api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [limitData, setLimitData] = useState(null);

  // MEMBERSHIP LIMIT
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/membership/limit`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setLimitData)
      .catch(console.error);
  }, []);

  // COURSES
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/courses`)
      .then((res) => res.json())
      .then(setCourses);

    fetch(`${API_URL}/courses/my-courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMyCourses(data.data || []));
  }, []);

  // CHECK TAKEN
  const isTaken = (id) =>
    myCourses.some((c) => c.course_id === id);

  // LIMIT
  const isLimitReached = () => {
    if (!limitData) return false;

    if (limitData.limit === null)
      return false;

    return (
      limitData.total >= limitData.limit
    );
  };

  // ADD COURSE
  const handleAmbil = async (courseId) => {
    const token = localStorage.getItem("token");

    if (isLimitReached()) {
      alert("Limit paket kamu sudah habis");
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/courses/add-course`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseId,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMyCourses((prev) => [
          ...prev,
          { course_id: courseId },
        ]);

        if (
          limitData &&
          limitData.limit !== null
        ) {
          setLimitData({
            ...limitData,
            total: limitData.total + 1,
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

  const colors = [
    "bg-cyan-400/10 text-cyan-300",
    "bg-green-400/10 text-green-300",
    "bg-purple-400/10 text-purple-300",
    "bg-yellow-400/10 text-yellow-300",
  ];

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-8">

        <p className="text-[#64748B] text-sm">
          Daftar Course
        </p>

        <h1 className="text-2xl font-bold text-white mt-1">

          {limitData?.limit === null
            ? "Unlimited access"
            : "Mulai belajar"}

          <span className="text-[#64748B] font-medium">
            {" "}
            —
            {limitData?.limit === null
              ? " Premium plan aktif"
              : ` ${limitData?.total}/${limitData?.limit} course digunakan`}
          </span>

        </h1>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-4">

        {courses.map((c, index) => {
          const taken = isTaken(
            c.course_id
          );

          const limitReached =
            isLimitReached();

          return (
            <div
              key={c.course_id}
              className="
                bg-[#101C38]
                border border-white/5
                rounded-2xl
                p-5
                hover:border-cyan-400/20
                transition
              "
            >

              {/* TOP */}
              <div className="flex gap-4">

                {/* ICON */}
                <div
                  className={`
                    w-12 h-12 rounded-xl
                    flex items-center justify-center
                    shrink-0
                    ${colors[index % 4]}
                  `}
                >
                  <div className="w-3 h-3 border border-current" />
                </div>

                {/* CONTENT */}
                <div className="flex-1">

                  <div className="flex items-center gap-3 flex-wrap">

                    <h2 className="text-xl font-bold text-white leading-none">
                      {c.title}
                    </h2>

                    {taken && (
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
                        Diambil
                      </div>
                    )}

                  </div>

                  <p className="text-sm text-[#7C8DB5] mt-3 leading-relaxed">

                    {c.description ||
                      "Pelajari materi lengkap dan tingkatkan skillmu bersama course interaktif premium."}

                  </p>

                </div>

              </div>

              {/* BUTTON */}
              <button
                onClick={() =>
                  handleAmbil(c.course_id)
                }
                disabled={
                  taken || limitReached
                }
                className={`
                  mt-5
                  w-full
                  py-2.5
                  rounded-xl
                  border
                  text-base
                  font-semibold
                  transition

                  ${
                    taken
                      ? `
                        border-white/10
                        bg-white/5
                        text-white
                        cursor-not-allowed
                      `
                      : limitReached
                      ? `
                        border-red-400/20
                        bg-red-400/10
                        text-red-300
                        cursor-not-allowed
                      `
                      : `
                        border-white/10
                        hover:border-cyan-400/40
                        hover:bg-cyan-400
                        hover:text-black
                        text-white
                      `
                  }
                `}
              >

                {taken
                  ? "Sudah Diambil"
                  : limitReached
                  ? "Limit Tercapai"
                  : "Ambil Course"}

              </button>

            </div>
          );
        })}

      </div>

      {/* LIMIT WARNING */}
      {isLimitReached() && (

        <div
          className="
            mt-6
            bg-[#101C38]
            border border-red-400/10
            rounded-2xl
            p-5
          "
        >

          <h2 className="text-lg font-bold text-white">
            Limit paket tercapai
          </h2>

          <p className="text-sm text-[#7C8DB5] mt-2">
            Upgrade membership untuk
            mengambil lebih banyak course.
          </p>

          <a
            href="/membership"
            className="
              inline-flex
              mt-4
              px-5 py-2.5
              rounded-xl
              bg-cyan-400
              text-black
              text-sm
              font-semibold
              hover:opacity-90
              transition
            "
          >
            Upgrade Membership
          </a>

        </div>

      )}

    </DashboardLayout>
  );
}