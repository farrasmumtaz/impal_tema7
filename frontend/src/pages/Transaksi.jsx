import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

export default function Transaksi() {
  const [params] = useSearchParams();
  const paketId = params.get("paket");

  const [transactions, setTransactions] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState("gopay");
  const [showConfirm, setShowConfirm] = useState(false);
  const [paket, setPaket] = useState(null);

  const methods = [
    { id: "gopay", name: "GOPAY", color: "bg-cyan-400" },
    { id: "dana", name: "DANA", color: "bg-yellow-400" },
    { id: "ovo", name: "OVO", color: "bg-blue-400" },
    { id: "bca", name: "BCA", color: "bg-green-400" },
    { id: "mandiri", name: "Mandiri", color: "bg-red-400" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🔥 ambil paket dari membership
    fetch("http://localhost:5000/membership/packages")
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.paket_id == paketId);
        setPaket(found);
      });

    // 🔥 ambil transaksi (riwayat)
    fetch("http://localhost:5000/membership/my-transactions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setTransactions);

  }, [paketId]);

  const handlePay = async () => {
    console.log("🔥 HANDLE PAY KEJALAN");
    try {
      const token = localStorage.getItem("token");

      // 1. create transaksi
      const res = await fetch(
        "http://localhost:5000/membership/create-transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ paketId }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      console.log("CREATE:", data);

      const subId = data.subskripsiId;

      if (!subId) {
        throw new Error("Subskripsi ID tidak ada");
      }

      // 2. langsung bayar pakai ID ini
      console.log("SUB ID:", subId);
      const res2 = await fetch(
        "http://localhost:5000/membership/pay",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            subskripsiId: subId,
          }),
        }
      );

      const payResult = await res2.json();

      if (!res2.ok) {
        throw new Error(payResult.message);
      }

      console.log("PAY:", payResult);

      alert("Pembayaran berhasil");
      window.location.href = "/dashboard";

    } catch (err) {
      console.error("ERROR:", err);
      alert(err.message || "Terjadi error saat pembayaran");
    }
  };

  if (!paket) return <p>Loading...</p>;

  return (
    <DashboardLayout>
      <div className="p-6 grid grid-cols-3 gap-6">

        {/* LEFT - METODE */}
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">
            Metode Pembayaran
          </h2>

          <p className="text-gray-400 mb-2">Dompet digital</p>

          {methods.map(m => (
            <div
              key={m.id}
              onClick={() => setSelectedMethod(m.id)}
              className={`flex items-center justify-between p-3 rounded-lg mb-2 cursor-pointer 
                ${selectedMethod === m.id ? "bg-[#243355]" : "bg-[#1e2a45]"}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded ${m.color}`} />
                <span>{m.name}</span>
              </div>

              <div
                className={`w-4 h-4 rounded-full border ${selectedMethod === m.id ? "bg-cyan-400" : ""
                  }`}
              />
            </div>
          ))}

          {/* RIWAYAT */}
          <h3 className="mt-6 mb-2">Riwayat Transaksi</h3>

          <div className="bg-[#1e2a45] p-4 rounded-lg">
            <table className="w-full text-sm">
              <thead className="text-gray-400">
                <tr>
                  <th>ID</th>
                  <th>Tanggal</th>
                  <th>Metode</th>
                  <th>Jumlah</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map(t => (
                  <tr key={t.transaksi_id} className="text-center">
                    <td>{t.transaksi_id}</td>
                    <td>{t.tanggal_transaksi?.slice(0, 10)}</td>
                    <td>{t.metode_pembayaran}</td>
                    <td>Rp {t.jumlah_bayar}</td>
                    <td>
                      <span
                        className={
                          t.status_pembayaran === "paid"
                            ? "text-green-400"
                            : "text-yellow-400"
                        }
                      >
                        {t.status_pembayaran}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT - SUMMARY (DINAMIS) */}
        <div className="bg-[#1e2a45] p-5 rounded-xl h-fit">
          <h3 className="font-semibold mb-3">
            Jumlah Pembayaran
          </h3>

          <p>{paket.nama_paket}</p>
          <p className="text-lg font-bold">Rp {paket.harga}</p>

          <p className="mt-2 text-sm text-gray-400">
            {paket.durasi_hari} hari
          </p>

          <button
            onClick={() => setShowConfirm(true)}
            className="mt-4 w-full bg-gray-300 text-black py-2 rounded-lg"
          >
            Bayar Sekarang
          </button>
        </div>

        {/* MODAL */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-[#16233a] p-6 rounded-xl text-center w-[300px]">

              <p className="mb-4">
                Apakah anda ingin melanjutkan pembayaran?
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handlePay}
                  className="bg-cyan-500 px-4 py-1 rounded text-black"
                >
                  Ya
                </button>

                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-gray-500 px-4 py-1 rounded text-white"
                >
                  Tidak
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}