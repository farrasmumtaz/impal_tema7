import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function Membership() {
  const [packages, setPackages] = useState([]);
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  // GET PACKAGES
  useEffect(() => {
    fetch("http://localhost:5000/membership/packages")
      .then(res => res.json())
      .then(setPackages);
  }, []);

  // GET ACTIVE MEMBERSHIP
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

  const isActive = (id) => {
    return active && active.paket_id === id;
  };

  return (
    <DashboardLayout>
      <div className="p-6">

        <h2 className="text-xl font-semibold mb-4">
          Upgrade Membership
        </h2>

        {/* LIST PAKET */}
        <div className="grid grid-cols-3 gap-4">
          {packages.map(p => (
            <div key={p.paket_id} className="bg-[#16233a] p-5 rounded-xl">

              <h3 className="text-lg font-semibold">{p.nama_paket}</h3>

              <p className="text-sm text-gray-400">
                Harga: Rp {p.harga}
              </p>

              <p className="text-sm text-gray-400">
                Durasi: {p.durasi_hari} hari
              </p>

              <p className="text-sm text-gray-400">
                Batas Course: {p.batas_materi ?? "Unlimited"}
              </p>

              <button
                disabled={isActive(p.paket_id)}
                onClick={() => navigate(`/transaksi?paket=${p.paket_id}`)}
                className={`mt-3 w-full py-2 rounded 
                ${isActive(p.paket_id)
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-cyan-500 text-black"
                  }`}
              >
                {isActive(p.paket_id) ? "Paket Aktif" : "Pilih Paket"}
              </button>

            </div>
          ))}
        </div>

        {/* MEMBERSHIP AKTIF */}
        {active && (
          <div className="mt-6 bg-[#1e2a45] p-5 rounded-xl">
            <h3 className="text-lg mb-2">Paket Aktif</h3>

            <p className="font-semibold text-cyan-400">
              {active.nama_paket}
            </p>

            <div className="flex justify-between mt-3 text-sm text-gray-400">
              <div>
                <p>Mulai</p>
                <p>{active.tanggal_mulai}</p>
              </div>

              <div>
                <p>Berakhir</p>
                <p>{active.tanggal_berakhir}</p>
              </div>

              <div>
                <p>Status</p>
                <p className="text-green-400">Aktif</p>
              </div>
            </div>

            <button
              onClick={() => navigate(`/transaksi?paket=${active.paket_id}`)}
              className="mt-4 bg-cyan-500 px-4 py-2 rounded text-black"
            >
              Perpanjang
            </button>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}