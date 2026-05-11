import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";

export default function Membership() {
  const [packages, setPackages] = useState([]);
  const [active, setActive] = useState(null);

  const navigate = useNavigate();

  // PACKAGES
  useEffect(() => {
    fetch(`${API_URL}/membership/packages`)
      .then((res) => res.json())
      .then(setPackages);
  }, []);

  // ACTIVE MEMBERSHIP
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/membership/active`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID").format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "id-ID",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-8">

        <p className="text-[#64748B] text-sm">
          Upgrade Membership
        </p>

        <h1 className="text-2xl font-bold text-white mt-1">
          Pilih paket terbaik
          <span className="text-[#64748B] font-medium">
            {" "}
            — sesuai kebutuhanmu
          </span>
        </h1>

      </div>

      {/* PACKAGES */}
      <div className="grid grid-cols-3 gap-4">

        {packages.map((p) => {
          const activePackage = isActive(
            p.paket_id
          );

          return (
            <div
              key={p.paket_id}
              className={`
                relative
                rounded-2xl
                border
                p-5
                transition

                ${
                  activePackage
                    ? `
                      bg-[#081926]
                      border-cyan-400/40
                    `
                    : `
                      bg-[#101C38]
                      border-white/5
                      hover:border-cyan-400/20
                    `
                }
              `}
            >

              {/* ACTIVE BADGE */}
              {activePackage && (
                <div
                  className="
                    absolute
                    top-4
                    right-4
                    px-3 py-1
                    rounded-full
                    bg-cyan-400/10
                    border border-cyan-400/20
                    text-cyan-400
                    text-xs
                    font-semibold
                  "
                >
                  Paket Aktif
                </div>
              )}

              {/* TITLE */}
              <h2 className="text-2xl font-bold text-white">
                {p.nama_paket}
              </h2>

              {/* PRICE */}
              <div className="mt-5">

                <div className="flex items-end gap-2">

                  <span className="text-4xl font-bold text-white">
                    Rp {formatPrice(p.harga)}
                  </span>

                  <span className="text-[#64748B] mb-1">
                    /bulan
                  </span>

                </div>

              </div>

              {/* INFO */}
              <div className="mt-6 space-y-4 text-sm">

                <div>
                  <p className="text-[#64748B]">
                    Durasi
                  </p>

                  <p className="text-white font-semibold mt-1">
                    {p.durasi_hari} hari
                  </p>
                </div>

                <div>
                  <p className="text-[#64748B]">
                    Batas Course
                  </p>

                  <p className="text-white font-semibold mt-1">
                    {p.batas_materi ??
                      "Unlimited"}
                  </p>
                </div>

              </div>

              {/* BUTTON */}
              <button
                disabled={activePackage}
                onClick={() =>
                  navigate(
                    `/transaksi?paket=${p.paket_id}`
                  )
                }
                className={`
                  mt-7
                  w-full
                  py-3
                  rounded-xl
                  border
                  font-semibold
                  text-base
                  transition

                  ${
                    activePackage
                      ? `
                        bg-cyan-400
                        text-black
                        border-cyan-400
                        cursor-not-allowed
                      `
                      : `
                        border-white/10
                        text-white
                        hover:bg-cyan-400
                        hover:text-black
                        hover:border-cyan-400
                      `
                  }
                `}
              >

                {activePackage
                  ? "Paket Aktif"
                  : "Pilih Paket"}

              </button>

            </div>
          );
        })}

      </div>

      {/* ACTIVE MEMBERSHIP */}
      {active && (

        <div
          className="
            mt-6
            bg-[#101C38]
            border border-cyan-400/10
            rounded-2xl
            p-6
          "
        >

          <p className="text-[#64748B] text-sm uppercase tracking-wide">
            Membership Aktif
          </p>

          <h2 className="text-3xl font-bold text-cyan-400 mt-2">
            {active.nama_paket}
          </h2>

          <div className="grid grid-cols-3 gap-8 mt-6">

            <div>
              <p className="text-[#64748B] text-sm">
                Mulai
              </p>

              <p className="text-white font-semibold mt-1">
                {formatDate(
                  active.tanggal_mulai
                )}
              </p>
            </div>

            <div>
              <p className="text-[#64748B] text-sm">
                Berakhir
              </p>

              <p className="text-white font-semibold mt-1">
                {formatDate(
                  active.tanggal_berakhir
                )}
              </p>
            </div>

            <div>
              <p className="text-[#64748B] text-sm">
                Status
              </p>

              <p className="text-green-400 font-semibold mt-1">
                Aktif
              </p>
            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={() =>
              navigate(
                `/transaksi?paket=${active.paket_id}`
              )
            }
            className="
              mt-6
              px-5 py-3
              rounded-xl
              border border-white/10
              text-white
              font-semibold
              hover:bg-cyan-400
              hover:text-black
              hover:border-cyan-400
              transition
            "
          >
            Perpanjang Membership
          </button>

        </div>

      )}

    </DashboardLayout>
  );
}