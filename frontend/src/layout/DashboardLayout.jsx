import Sidebar from "../components/SideBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#0b1220] text-white">

      <Sidebar />

      <main className="ml-64 flex-1 overflow-y-auto p-6">
        {children}
      </main>

    </div>
  );
}