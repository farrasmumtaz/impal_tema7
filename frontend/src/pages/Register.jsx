import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api";
import { Eye, EyeOff } from "lucide-react"; // 1. Import ikon Lucide
import "../auth.css";

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

  // 2. Tambahkan state untuk visibilitas masing-masing kolom password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Password tidak sama");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  // Gaya standar tombol ikon agar posisinya pas di dalam input field
  const toggleButtonStyle = {
    position: "absolute",
    right: "15px",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    color: "#9ca3af", // Warna abu-abu elegan (slate-400)
    padding: 0,
  };

  return (
    <div className="auth-page">
      <div className="auth-center" style={{ padding: "48px 24px" }}>
        <div className="auth-card" style={{ maxWidth: 580 }}>

          {/* HEADER ROW */}
          <div className="reg-header">
            <div className="auth-logo" style={{ marginBottom: 0 }}>
              Stud<span>Yuk</span>
            </div>
            <div className="step-pills">
              <span className="step-pill step-pill--done" />
              <span className="step-pill step-pill--active" />
              <span className="step-pill step-pill--inactive" />
            </div>
          </div>

          <h1 className="auth-title">Buat akun baru</h1>
          <p className="auth-sub">Isi data dirimu untuk memulai belajar</p>

          <form onSubmit={handleSubmit}>
            {/* USERNAME */}
            <div className="auth-field">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="username_kamu"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* NAMA */}
            <div className="auth-grid-2">
              <div className="auth-field">
                <label>Nama Depan</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Nama depan"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="auth-field">
                <label>Nama Belakang</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Nama belakang"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="nama@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD GRID */}
            <div className="auth-grid-2">
              
              {/* KOLOM PASSWORD UTAMA */}
              <div className="auth-field">
                <label>Password</label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Min. 8 karakter"
                    value={form.password}
                    onChange={handleChange}
                    required
                    style={{ paddingRight: "45px", width: "100%" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={toggleButtonStyle}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* KOLOM KONFIRMASI PASSWORD */}
              <div className="auth-field">
                <label>Konfirmasi Password</label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Ulangi password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    style={{ paddingRight: "45px", width: "100%" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={toggleButtonStyle}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

            </div>

            {/* PHONE */}
            <div className="auth-field">
              <label>Nomor Telepon</label>
              <div className="phone-row">
                <span className="phone-prefix">+62</span>
                <input
                  type="text"
                  name="phone"
                  placeholder="8xx xxxx xxxx"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="phone-input"
                />
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Loading..." : "Buat Akun"}
            </button>

            <p className="auth-link-text" style={{ marginTop: 20 }}>
              Sudah punya akun?{" "}
              <Link to="/">Login sekarang</Link>
            </p>
          </form>

        </div>
      </div>
    </div>
  );
}