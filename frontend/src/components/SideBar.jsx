import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen fixed bg-[#0f1a2e] p-5">

      <h1 className="text-xl font-bold mb-8 text-cyan-400">
        StudYuk
      </h1>

      <nav className="space-y-4 text-gray-300">

        <Link to="/dashboard" className="block hover:text-cyan-400">
          Dashboard
        </Link>

        <Link to="/courses" className="block hover:text-cyan-400">
          Jelajahi
        </Link>
        
        <Link to="/membership" className="block hover:text-cyan-400">
          Membership
        </Link>

      </nav>
    </aside>
  );
}