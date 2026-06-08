import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api";
import "../auth.css";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 1. Tambahkan state untuk mengontrol visibilitas password
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error(err);
      alert("Gagal connect ke server");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-center">
        <div className="auth-card" style={{ maxWidth: 440 }}>

          {/* LOGO */}
          <div className="auth-logo">
            Stud<span>Yuk</span>
          </div>

          {/* HEADING */}
          <h1 className="auth-title">
            Selamat<br />datang kembali
          </h1>
          <p className="auth-sub">Masuk untuk melanjutkan belajarmu</p>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label>Password</label>
              
              {/* 2. Bungkus input dengan div relatif agar posisi tombol bisa diatur dengan absolut */}
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  // 3. Tipe berubah dinamis tergantung state showPassword
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingRight: "45px", width: "100%" }} // Beri ruang di kanan agar teks tidak tertutup tombol
                />
                
                {/* 4. Tombol toggle pengintip password */}
                <button
                  type="button" // Wajib agar tombol tidak men-submit form saat diklik
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "15px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    padding: 0,
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <Link to="/lupa-password" className="auth-forgot-link">
                Lupa password?
              </Link>
            </div>

            <button type="submit" className="auth-btn">
              Masuk ke akun
            </button>

            <div className="auth-divider">
              <span>atau</span>
            </div>

            <p className="auth-link-text">
              Belum punya akun?{" "}
              <Link to="/register">Daftar sekarang</Link>
            </p>
          </form>

          {/* COLOR DOTS */}
          <div className="auth-dots">
            <span className="dot" style={{ background: "#3ED9A0" }} />
            <span className="dot" style={{ background: "#F5B731" }} />
            <span className="dot" style={{ background: "#F47A7A" }} />
            <span className="dot" style={{ background: "#5BC8F5" }} />
            <span className="dot" style={{ background: "#F5931E" }} />
          </div>

        </div>
      </div>
    </div>
  );
}