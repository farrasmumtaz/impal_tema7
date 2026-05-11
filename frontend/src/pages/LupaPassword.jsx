import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api";

export default function LupaPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Email harus diisi");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      setMessage(data.message);
      setResetLink(data.resetLink);

    } catch (err) {
      console.error(err);
      setMessage("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020817] text-white">

      {/* GRID */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(0,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.04)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />

      {/* GLOW */}
      <div className="absolute left-1/2 top-[-120px] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">

        <div
          className="
            w-full max-w-[620px]
            rounded-[32px]
            border border-white/10
            bg-[#08152E]/90
            p-10
            backdrop-blur-xl
            shadow-[0_0_50px_rgba(0,0,0,0.45)]
          "
        >

          {/* LOGO */}
          <h1 className="text-5xl font-extrabold text-[#00F5D4]">
            StudYuk
          </h1>

          {/* TITLE */}
          <div className="mt-10">
            <h2 className="text-5xl font-bold leading-tight">
              Reset password
            </h2>

            <p className="mt-4 text-lg text-[#7C8DB5] leading-relaxed">
              Masukkan emailmu dan kami akan mengirimkan link untuk reset password
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-10">

            <div>
              <label className="mb-3 block text-sm font-bold tracking-wider text-[#7C8DB5]">
                EMAIL TERDAFTAR
              </label>

              <input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
                  h-[64px] w-full
                  rounded-2xl
                  border border-white/10
                  bg-[#132347]
                  px-5
                  text-lg
                  text-white
                  outline-none
                  transition-all
                  placeholder:text-white/25
                  focus:border-cyan-400
                  focus:shadow-[0_0_20px_rgba(0,245,212,0.15)]
                "
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                mt-8
                h-[68px] w-full
                rounded-2xl
                border border-white/15
                bg-transparent
                text-xl font-bold
                text-white
                transition-all duration-300
                hover:border-cyan-400
                hover:bg-[#00F5D4]
                hover:text-[#02111F]
                hover:shadow-[0_0_30px_rgba(0,245,212,0.25)]
              "
            >
              {loading ? "Loading..." : "Kirim Link Reset"}
            </button>

            {/* MESSAGE */}
            {message && (
              <div
                className="
                  mt-6
                  rounded-2xl
                  border border-cyan-400/20
                  bg-cyan-400/5
                  p-4
                  text-sm
                  text-cyan-300
                "
              >
                {message}
              </div>
            )}

            {/* RESET LINK */}
            {resetLink && (
              <div
                className="
                  mt-4
                  rounded-2xl
                  border border-white/10
                  bg-[#132347]
                  p-4
                "
              >
                <p className="mb-2 text-sm text-[#7C8DB5]">
                  Link reset password:
                </p>

                <a
                  href={resetLink}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    break-all
                    text-[#00F5D4]
                    hover:underline
                  "
                >
                  {resetLink}
                </a>
              </div>
            )}

            {/* LOGIN */}
            <p className="mt-8 text-center text-base text-[#7C8DB5]">
              Ingat passwordmu?{" "}
              <Link
                to="/"
                className="
                  font-semibold
                  text-[#00F5D4]
                  hover:underline
                "
              >
                Kembali ke login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}