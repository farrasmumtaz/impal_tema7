import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api";
import "../auth.css";

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

      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

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
    <div className="auth-page">
      <div className="auth-center">
        <div style={{ width: "100%", maxWidth: 420 }}>


          <h1 className="auth-title">
            Lupa<br />password?
          </h1>
          <p className="auth-sub" style={{ marginBottom: 36 }}>
            Masukkan email yang terdaftar — kami akan kirimkan link reset
            password ke inbox-mu.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label>Email Terdaftar</label>
              <input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Loading..." : "Kirim Link Reset"}
            </button>

            {/* NOTICE */}
            {!message && (
              <div className="auth-notice">
                Link reset berlaku selama 30 menit. Cek folder spam jika tidak
                masuk inbox.
              </div>
            )}

            {/* SUCCESS / ERROR MESSAGE */}
            {message && (
              <div className="auth-notice auth-notice--success">
                {message}
              </div>
            )}

            {/* RESET LINK (dev/testing) */}
            {resetLink && (
              <div className="reset-link-box">
                <p>Link reset password:</p>
                <a href={resetLink} target="_blank" rel="noreferrer">
                  {resetLink}
                </a>
              </div>
            )}
          </form>

          <Link to="/" className="auth-back-link">
            ← Kembali ke login
          </Link>

        </div>
      </div>
    </div>
  );
}