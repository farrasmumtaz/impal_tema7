export default function Sidebar() {
  return (
    <aside className="w-64 h-screen fixed bg-[#0f1a2e] p-5">

      <h1 className="text-xl font-bold mb-8 text-cyan-400">
        StudYuk
      </h1>

      <nav className="space-y-4 text-gray-300">
        <p className="hover:text-cyan-400 cursor-pointer">Dashboard</p>
        <p className="hover:text-cyan-400 cursor-pointer">Pembelajaran</p>
        <p className="hover:text-cyan-400 cursor-pointer">Jelajahi</p>
        <p className="hover:text-cyan-400 cursor-pointer">Transaksi</p>
        <p className="hover:text-cyan-400 cursor-pointer">Membership</p>
      </nav>

    </aside>
  );
}