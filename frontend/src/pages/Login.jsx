import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      if (data.user.role === "admin") {

        window.location.href = "/admin";

      } else {

        window.location.href = "/dashboard";

      }
    } catch (err) {
      console.error(err);
      alert("Gagal connect ke server");
      console.log(import.meta.env.VITE_API_URL);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020817] text-white">

      {/* GRID BACKGROUND */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(0,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.04)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />

      {/* GLOW */}
      <div className="absolute top-[-120px] left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">

        <div
          className="
            w-full max-w-[540px]
            rounded-[32px]
            border border-white/10
            bg-[#08152E]/90
            backdrop-blur-xl
            p-10
            shadow-[0_0_50px_rgba(0,0,0,0.45)]
          "
        >

          {/* LOGO */}
          <h1 className="text-5xl font-extrabold tracking-tight text-[#00F5D4]">
            StudYuk
          </h1>

          {/* BADGE */}
          <div
            className="
              mt-6 inline-flex items-center
              rounded-full
              border border-cyan-400/20
              bg-cyan-400/10
              px-5 py-2
              text-sm font-semibold
              text-[#00F5D4]
            "
          >
            Secure Login
          </div>

          {/* HEADING */}
          <div className="mt-10">
            <h2 className="text-5xl font-bold leading-tight text-white">
              Selamat datang kembali
            </h2>

            <p className="mt-4 text-lg text-[#7C8DB5]">
              Masuk untuk melanjutkan perjalanan belajarmu
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-10 space-y-7">

            {/* EMAIL */}
            <div>
              <label className="mb-3 block text-sm font-bold tracking-wider text-[#7C8DB5]">
                EMAIL
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

            {/* PASSWORD */}
            <div>
              <label className="mb-3 block text-sm font-bold tracking-wider text-[#7C8DB5]">
                PASSWORD
              </label>

              <input
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

              <div className="mt-3 flex justify-end">
                <Link
                  to="/lupa-password"
                  className="
                    text-sm
                    text-[#7C8DB5]
                    transition
                    hover:text-[#00F5D4]
                  "
                >
                  Lupa password?
                </Link>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="
                mt-2
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
              Masuk ke akun
            </button>

            {/* SIGNUP */}
            <p className="pt-2 text-center text-base text-[#7C8DB5]">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="
                  font-semibold
                  text-[#00F5D4]
                  transition
                  hover:underline
                "
              >
                Daftar sekarang
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}