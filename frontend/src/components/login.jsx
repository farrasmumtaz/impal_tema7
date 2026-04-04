import { useState } from "react";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnText, setBtnText] = useState("Konfirmasi");
  const [btnStyle, setBtnStyle] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDASI INPUT
    if (!email || !password) {
      setBtnText("Isi semua dulu!");
      setBtnStyle({ background: "#ff5f7e" });

      setTimeout(() => {
        setBtnText("Konfirmasi");
        setBtnStyle({});
      }, 2000);

      return;
    }

    try {
      setBtnText("Loading...");

      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setBtnText("Berhasil!");
        setBtnStyle({ background: "#2EC4B6", color: "#000" });

        alert("Login berhasil");

        // RESET FORM
        setEmail("");
        setPassword("");

      } else {
        setBtnText("Gagal!");
        setBtnStyle({ background: "#ff5f7e" });

        alert(data.message || "Login gagal");

        setTimeout(() => {
          setBtnText("Konfirmasi");
          setBtnStyle({});
        }, 2000);
      }

    } catch (error) {
      console.error(error);

      setBtnText("Error!");
      setBtnStyle({ background: "#ff5f7e" });

      alert("Server error (cek backend kamu)");

      setTimeout(() => {
        setBtnText("Konfirmasi");
        setBtnStyle({});
      }, 2000);
    }
  };

  return (
    <div className="container">
      <h1 className="logo">
        Stud<span>Yuk</span>
      </h1>

      <div className="card">
        <div className="card-inner">
          <h2>Masuk ke akun</h2>
          <p className="sub">
            Selamat datang kembali, <span>Member</span>.
          </p>

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="forgot">Lupa Password?</div>

            {/* BUTTON */}
            <button type="submit" className="btn" style={btnStyle}>
              {btnText}
            </button>

            <div className="divider">
              <span></span>
              <p>Atau</p>
              <span></span>
            </div>

            <button type="button" className="google-btn">
              Continue with Google
            </button>

            <p className="signup">
              Belum Punya Akun? <span>Daftar sekarang</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}