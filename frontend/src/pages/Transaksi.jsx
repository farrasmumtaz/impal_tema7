import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { API_URL } from "../api";

export default function Transaksi() {
  const [params] = useSearchParams();
  const paketId = params.get("paket");

  const [transactions, setTransactions] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState("gopay");
  const [showConfirm, setShowConfirm] = useState(false);
  const [paket, setPaket] = useState(null);

  const methods = [
    {
      id: "gopay",
      name: "GOPAY",
      color: "bg-cyan-400",
    },
    {
      id: "dana",
      name: "DANA",
      color: "bg-blue-400",
    },
    {
      id: "ovo",
      name: "OVO",
      color: "bg-violet-400",
    },
    {
      id: "bca",
      name: "BCA",
      color: "bg-sky-400",
    },
    {
      id: "mandiri",
      name: "Mandiri",
      color: "bg-yellow-400",
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");

    // AMBIL PAKET
    fetch(`${API_URL}/membership/packages`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find(
          (p) => p.paket_id == paketId
        );

        setPaket(found);
      });

    // AMBIL RIWAYAT
    fetch(
      `${API_URL}/membership/my-transactions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then(setTransactions);

  }, [paketId]);

  const handlePay = async () => {
    try {
      const token = localStorage.getItem("token");

      // CREATE TRANSACTION
      const res = await fetch(
        `${API_URL}/membership/create-transaction`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            paketId,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      const subId = data.subskripsiId;

      // PAY
      const res2 = await fetch(
        `${API_URL}/membership/pay`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            subskripsiId: subId,
          }),
        }
      );

      const payResult = await res2.json();

      if (!res2.ok) {
        throw new Error(
          payResult.message
        );
      }

      alert("Pembayaran berhasil");

      window.location.href =
        "/dashboard";

    } catch (err) {
      console.error(err);

      alert(
        err.message ||
          "Terjadi error saat pembayaran"
      );
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat(
      "id-ID"
    ).format(price);
  };

  if (!paket) {
    return (
      <DashboardLayout>
        <p className="text-white">
          Loading...
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-7">

        <p className="text-[#64748B] text-sm">
          Pembayaran Membership
        </p>

        <h1 className="text-2xl font-bold text-white mt-1">
          Selesaikan transaksi
          <span className="text-[#64748B] font-medium">
            {" "}
            — aman & cepat
          </span>
        </h1>

      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-3 gap-5">

        {/* LEFT */}
        <div className="col-span-2">

          {/* PAYMENT METHOD */}
          <div
            className="
              bg-[#101C38]
              border border-white/5
              rounded-2xl
              p-5
            "
          >

            <h2 className="text-lg font-semibold text-white mb-5">
              Metode Pembayaran
            </h2>

            <div className="space-y-3">

              {methods.map((m) => (

                <div
                  key={m.id}
                  onClick={() =>
                    setSelectedMethod(
                      m.id
                    )
                  }
                  className={`
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    px-4 py-3
                    cursor-pointer
                    transition

                    ${
                      selectedMethod ===
                      m.id
                        ? `
                          border-cyan-400/40
                          bg-cyan-400/10
                        `
                        : `
                          border-white/5
                          hover:border-cyan-400/20
                        `
                    }
                  `}
                >

                  <div className="flex items-center gap-3">

                    <div
                      className={`
                        w-3 h-3 rounded-full
                        ${m.color}
                      `}
                    />

                    <span className="text-white font-medium">
                      {m.name}
                    </span>

                  </div>

                  <div
                    className={`
                      w-4 h-4
                      rounded-full
                      border

                      ${
                        selectedMethod ===
                        m.id
                          ? `
                            bg-cyan-400
                            border-cyan-400
                          `
                          : `
                            border-white/20
                          `
                      }
                    `}
                  />

                </div>

              ))}

            </div>

          </div>

          {/* HISTORY */}
          <div
            className="
              mt-5
              bg-[#101C38]
              border border-white/5
              rounded-2xl
              p-5
            "
          >

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-lg font-semibold text-white">
                Riwayat Transaksi
              </h2>

              <div
                className="
                  px-3 py-1
                  rounded-full
                  bg-[#16213D]
                  text-[#94A3B8]
                  text-xs
                "
              >
                {transactions.length} transaksi
              </div>

            </div>

            {transactions.length === 0 ? (

              <p className="text-[#64748B] text-sm">
                Belum ada transaksi
              </p>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full text-sm">

                  <thead>

                    <tr className="text-left text-[#64748B] border-b border-white/5">

                      <th className="pb-3">
                        ID
                      </th>

                      <th className="pb-3">
                        Tanggal
                      </th>

                      <th className="pb-3">
                        Metode
                      </th>

                      <th className="pb-3">
                        Total
                      </th>

                      <th className="pb-3">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {transactions.map(
                      (t) => (

                        <tr
                          key={
                            t.transaksi_id
                          }
                          className="
                            border-b
                            border-white/5
                            text-white
                          "
                        >

                          <td className="py-4">
                            #
                            {
                              t.transaksi_id
                            }
                          </td>

                          <td className="py-4 text-[#94A3B8]">
                            {t.tanggal_transaksi?.slice(
                              0,
                              10
                            )}
                          </td>

                          <td className="py-4">
                            {
                              t.metode_pembayaran
                            }
                          </td>

                          <td className="py-4">
                            Rp{" "}
                            {formatPrice(
                              t.jumlah_bayar
                            )}
                          </td>

                          <td className="py-4">

                            <span
                              className={`
                                px-3 py-1
                                rounded-full
                                text-xs
                                font-semibold

                                ${
                                  t.status_pembayaran ===
                                  "paid"
                                    ? `
                                      bg-green-400/10
                                      text-green-400
                                    `
                                    : `
                                      bg-yellow-400/10
                                      text-yellow-400
                                    `
                                }
                              `}
                            >
                              {
                                t.status_pembayaran
                              }
                            </span>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

        {/* RIGHT */}
        <div
          className="
            bg-[#101C38]
            border border-cyan-400/10
            rounded-2xl
            p-5
            h-fit
            sticky top-6
          "
        >

          <p className="text-[#64748B] text-sm">
            Ringkasan Pembayaran
          </p>

          <h2 className="text-2xl font-bold text-white mt-2">
            {paket.nama_paket}
          </h2>

          <div className="mt-5">

            <p className="text-[#64748B] text-sm">
              Total Pembayaran
            </p>

            <h1 className="text-4xl font-bold text-cyan-400 mt-1">
              Rp{" "}
              {formatPrice(
                paket.harga
              )}
            </h1>

          </div>

          <div className="mt-6 space-y-4">

            <div className="flex justify-between text-sm">

              <span className="text-[#64748B]">
                Durasi
              </span>

              <span className="text-white font-medium">
                {paket.durasi_hari} hari
              </span>

            </div>

            <div className="flex justify-between text-sm">

              <span className="text-[#64748B]">
                Metode
              </span>

              <span className="text-white font-medium uppercase">
                {selectedMethod}
              </span>

            </div>

          </div>

          <button
            onClick={() =>
              setShowConfirm(true)
            }
            className="
              mt-7
              w-full
              py-3
              rounded-xl
              bg-cyan-400
              text-black
              font-semibold
              hover:opacity-90
              transition
            "
          >
            Bayar Sekarang
          </button>

        </div>

      </div>

      {/* MODAL */}
      {showConfirm && (

        <div
          className="
            fixed inset-0
            bg-black/60
            backdrop-blur-sm
            flex items-center justify-center
            z-50
          "
        >

          <div
            className="
              w-[360px]
              bg-[#101C38]
              border border-white/5
              rounded-2xl
              p-6
            "
          >

            <h2 className="text-xl font-bold text-white">
              Konfirmasi Pembayaran
            </h2>

            <p className="text-[#94A3B8] text-sm mt-3 leading-relaxed">
              Apakah kamu yakin ingin
              melanjutkan pembayaran
              membership ini?
            </p>

            <div className="flex gap-3 mt-6">

              <button
                onClick={() =>
                  setShowConfirm(
                    false
                  )
                }
                className="
                  flex-1
                  py-3
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

              <button
                onClick={handlePay}
                className="
                  flex-1
                  py-3
                  rounded-xl
                  bg-cyan-400
                  text-black
                  font-semibold
                  hover:opacity-90
                  transition
                "
              >
                Lanjutkan
              </button>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}