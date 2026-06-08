import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../api";
import { Eye, EyeOff } from "lucide-react"; 
import "../auth.css";

export default function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  // Gaya standar tombol ikon agar posisinya pas di dalam input field
  // Gaya standar tombol ikon agar posisinya pas di dalam input field
  const toggleButtonStyle = {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    color: "#9ca3af",
    padding: 0,
    zIndex: 10,
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

            {/* PASSWORD BARU */}
            <div className="auth-field">
              <label>Password Baru</label>
              <div style={{ position: "relative" }}> {/* Cukup gunakan position: "relative" */}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={success}
                  style={{ paddingRight: "45px", width: "100%" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={toggleButtonStyle}
                  disabled={success}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* KONFIRMASI PASSWORD */}
            <div className="auth-field">
              <label>Konfirmasi Password</label>
              <div style={{ position: "relative" }}> {/* Cukup gunakan position: "relative" */}
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Ulangi password baru"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  disabled={success}
                  style={{ paddingRight: "45px", width: "100%" }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={toggleButtonStyle}
                  disabled={success}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
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