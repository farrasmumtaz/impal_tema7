import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { API_URL } from "../api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [active, setActive] = useState(null);

  const navigate = useNavigate();

  const getToday = () => {
    return new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    // PROFILE
    fetch(`${API_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });

    // MY COURSES
    fetch(`${API_URL}/courses/my-courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data.data || []));

    // MEMBERSHIP
    fetch(`${API_URL}/membership/active`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setActive);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const avgProgress =
    courses.length === 0
      ? 0
      : Math.round(
          courses.reduce(
            (acc, c) => acc + (c.progress || 0),
            0
          ) / courses.length
        );

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <p className="text-sm text-[#64748B]">
            {getToday()}
          </p>

          <h1 className="text-2xl font-bold text-white mt-1">
            Halo,{" "}
            <span className="text-cyan-400">
              {user?.username || "User"}
            </span>
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="
            border border-white/10
            px-5 py-2.5
            rounded-xl
            text-white
            hover:border-red-400
            hover:bg-red-500
            transition
          "
        >
          Logout
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <StatCard
          title="TOTAL COURSE"
          value={courses.length}
        />

        <StatCard
          title="PROGRESS"
          value={`${avgProgress}%`}
          active
        />

        <StatCard
          title="MEMBERSHIP"
          value={active?.nama_paket || "Free"}
        />

        <StatCard
          title="WAKTU BELAJAR"
          value="0j"
        />

      </div>

      {/* COURSES */}
      <div>

        <div className="flex items-center gap-3 mb-4">

          <h2 className="text-xl font-bold text-white">
            My Courses
          </h2>

          <div
            className="
              bg-white/5
              border border-white/10
              rounded-full
              px-3 py-1
              text-sm text-[#94A3B8]
            "
          >
            {courses.length}
          </div>

        </div>

        <div className="space-y-4">

          {courses.length === 0 ? (

            <div
              className="
                bg-[#101C38]
                border border-white/5
                rounded-2xl
                p-5
                text-[#64748B]
              "
            >
              Belum ada course yang diambil
            </div>

          ) : (

            courses.map((course, index) => (

              <div
                key={course.course_id}
                onClick={() =>
                  navigate(`/course/${course.course_id}`)
                }
                className="
                  bg-[#101C38]
                  border border-white/5
                  rounded-2xl
                  p-4
                  cursor-pointer
                  hover:border-cyan-400/20
                  hover:bg-[#132347]
                  transition
                "
              >

                <div className="flex items-center gap-4">

                  {/* ICON */}
                  <div
                    className={`
                      w-12 h-12 rounded-xl
                      flex items-center justify-center
                      ${
                        index % 4 === 0
                          ? "bg-cyan-400/10 text-cyan-300"
                          : index % 4 === 1
                          ? "bg-green-400/10 text-green-300"
                          : index % 4 === 2
                          ? "bg-purple-400/10 text-purple-300"
                          : "bg-yellow-400/10 text-yellow-300"
                      }
                    `}
                  >
                    <div className="w-3 h-3 border border-current" />
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">

                    <div className="flex items-center justify-between">

                      <div>

                        <h3 className="text-lg font-bold text-white">
                          {course.title}
                        </h3>

                        <p className="text-sm text-[#64748B] mt-1">
                          {course.progress || 0}% selesai
                        </p>

                      </div>

                      <div className="text-[#64748B]">
                        →
                      </div>

                    </div>

                    {/* PROGRESS */}
                    <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">

                      <div
                        className="
                          h-full
                          bg-gradient-to-r
                          from-cyan-400
                          to-cyan-300
                        "
                        style={{
                          width: `${course.progress || 0}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </DashboardLayout>
  );
}

function StatCard({ title, value, active }) {
  return (
    <div
      className="
        bg-[#101C38]
        border border-white/5
        rounded-2xl
        p-4
      "
    >

      <p className="text-sm font-semibold text-[#64748B]">
        {title}
      </p>

      <h2
        className={`
          mt-3 text-3xl font-bold
          ${active ? "text-cyan-400" : "text-white"}
        `}
      >
        {value}
      </h2>

    </div>
  );
}