import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Password tidak sama");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          nama_depan: form.firstName,
          nama_belakang: form.lastName,
          email: form.email,
          password: form.password,
          no_telp: form.phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Register berhasil!");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Gagal connect ke server");
    } finally {
      setLoading(false);
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
      <div className="absolute left-1/2 top-[-120px] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">

        <div
          className="
            w-full max-w-[720px]
            rounded-[32px]
            border border-white/10
            bg-[#08152E]/90
            p-10
            backdrop-blur-xl
            shadow-[0_0_50px_rgba(0,0,0,0.45)]
          "
        >

          {/* LOGO */}
          <h1 className="text-5xl font-extrabold tracking-tight text-[#00F5D4]">
            StudYuk
          </h1>

          {/* STEP LINE */}
          <div className="mt-8 flex gap-3">
            <div className="h-[4px] flex-1 rounded-full bg-[#00F5D4]" />
            <div className="h-[4px] flex-1 rounded-full bg-white/10" />
            <div className="h-[4px] flex-1 rounded-full bg-white/10" />
          </div>

          {/* HEADING */}
          <div className="mt-8">
            <h2 className="text-5xl font-bold leading-tight text-white">
              Buat akun baru
            </h2>

            <p className="mt-4 text-lg text-[#7C8DB5]">
              Isi data dirimu untuk memulai belajar
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-10 space-y-7">

            {/* USERNAME */}
            <div>
              <label className="mb-3 block text-sm font-bold tracking-wider text-[#7C8DB5]">
                USERNAME
              </label>

              <input
                type="text"
                name="username"
                placeholder="username_kamu"
                value={form.username}
                onChange={handleChange}
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

            {/* NAMA */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label className="mb-3 block text-sm font-bold tracking-wider text-[#7C8DB5]">
                  NAMA DEPAN
                </label>

                <input
                  type="text"
                  name="firstName"
                  placeholder="Nama depan"
                  value={form.firstName}
                  onChange={handleChange}
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

              <div>
                <label className="mb-3 block text-sm font-bold tracking-wider text-[#7C8DB5]">
                  NAMA BELAKANG
                </label>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Nama belakang"
                  value={form.lastName}
                  onChange={handleChange}
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
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-3 block text-sm font-bold tracking-wider text-[#7C8DB5]">
                EMAIL
              </label>

              <input
                type="email"
                name="email"
                placeholder="nama@email.com"
                value={form.email}
                onChange={handleChange}
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
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label className="mb-3 block text-sm font-bold tracking-wider text-[#7C8DB5]">
                  PASSWORD
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Min. 8 karakter"
                  value={form.password}
                  onChange={handleChange}
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

              <div>
                <label className="mb-3 block text-sm font-bold tracking-wider text-[#7C8DB5]">
                  KONFIRMASI PASSWORD
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Ulangi password"
                  value={form.confirmPassword}
                  onChange={handleChange}
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
            </div>

            {/* PHONE */}
            <div>
              <label className="mb-3 block text-sm font-bold tracking-wider text-[#7C8DB5]">
                NOMOR TELEPON
              </label>

              <input
                type="text"
                name="phone"
                placeholder="+62 xxx xxxx xxxx"
                value={form.phone}
                onChange={handleChange}
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
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading ? "Loading..." : "Buat Akun"}
            </button>

            {/* LOGIN */}
            <p className="pt-2 text-center text-base text-[#7C8DB5]">
              Sudah punya akun?{" "}
              <Link
                to="/"
                className="
                  font-semibold
                  text-[#00F5D4]
                  transition
                  hover:underline
                "
              >
                Login sekarang
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}