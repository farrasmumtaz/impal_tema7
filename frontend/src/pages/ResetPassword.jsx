import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../api";
import "../auth.css";

export default function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage("Konfirmasi password tidak sama");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json();

      setMessage(data.message);
      if (res.ok) setSuccess(true);
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
            Buat password<br />baru
          </h1>
          <p className="auth-sub" style={{ marginBottom: 36 }}>
            Password baru harus berbeda dari password sebelumnya.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label>Password Baru</label>
              <input
                type="password"
                placeholder="Min. 8 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={success}
              />
            </div>

            <div className="auth-field">
              <label>Konfirmasi Password</label>
              <input
                type="password"
                placeholder="Ulangi password baru"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                disabled={success}
              />
            </div>

            {/* PASSWORD MATCH HINT */}
            {confirm && password !== confirm && (
              <p className="password-hint password-hint--error">
                Password tidak sama
              </p>
            )}
            {confirm && password === confirm && (
              <p className="password-hint password-hint--ok">
                Password cocok ✓
              </p>
            )}

            {!success && (
              <button
                type="submit"
                className="auth-btn"
                disabled={loading}
                style={{ marginTop: 8 }}
              >
                {loading ? "Loading..." : "Reset Password"}
              </button>
            )}

            {/* MESSAGE */}
            {message && (
              <div
                className={`auth-notice ${success ? "auth-notice--success" : ""}`}
                style={{ marginTop: 18 }}
              >
                {message}
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