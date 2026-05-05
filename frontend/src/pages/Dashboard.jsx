import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [setMembership] = useState(null);
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

    // 🔹 PROFILE
    fetch("http://localhost:5000/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });

    // 🔹 COURSES
    fetch("http://localhost:5000/courses/my-courses", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setCourses(data.data || []));

    // 🔹 MEMBERSHIP
    fetch("http://localhost:5000/user/membership", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setMembership);

  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/membership/active", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async res => {
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch {
          return null;
        }
      })
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
        courses.reduce((acc, c) => acc + (c.progress || 0), 0) /
        courses.length
      );

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">{getToday()}</p>
            <p className="text-gray-400 text-sm">
              {user
                ? `Halo ${user.username}, lanjutkan belajarmu 🚀`
                : "Loading..."}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg text-white"
          >
            Logout
          </button>
        </div>

        {/* STAT */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard title="Total Course" value={courses.length} />
          <StatCard title="Progress" value={`${avgProgress}%`} />
          <StatCard
            title="Membership"
            value={active ? active.nama_paket : "Free"}
          />
          <StatCard title="Waktu Belajar" value="0j" />
        </div>

        {/* COURSES */}
        <div className="bg-[#16233a] p-5 rounded-xl">
          <h2 className="font-semibold mb-4">
            My Courses ({courses.length})
          </h2>

          {courses.length === 0 ? (
            <p className="text-gray-400">Belum ada course</p>
          ) : (
            courses.map((course) => (
              <div
                key={course.course_id}
                className="mb-4 p-4 bg-[#1e2a45] rounded-lg cursor-pointer hover:bg-[#243355] transition"
                onClick={() =>
                  navigate(`/course/${course.course_id}`)
                }
              >
                <h3 className="font-semibold">{course.title}</h3>

                {/* PROGRESS */}
                <div className="mt-2">
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div
                      className="bg-cyan-400 h-2 rounded"
                      style={{
                        width: `${course.progress || 0}%`,
                      }}
                    ></div>
                  </div>

                  <p className="text-xs text-gray-400 mt-1">
                    {course.progress || 0}% selesai
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-[#16233a] p-4 rounded-xl">
      <p className="text-sm text-gray-400">{title}</p>
      <h3 className="text-xl font-bold mt-1">{value}</h3>
    </div>
  );
}