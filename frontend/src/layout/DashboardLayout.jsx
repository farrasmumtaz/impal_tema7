import Sidebar from "../components/SideBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#020817] text-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <main
        className="
          ml-[260px]
          min-h-screen
          p-6
          relative
          z-0
        "
      >
        {children}
      </main>

    </div>
  );
}