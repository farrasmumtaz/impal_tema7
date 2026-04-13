import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Card from "../components/Card";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnText] = useState("Konfirmasi");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password,}),});

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }
    localStorage.setItem("token", data.token);

    alert("Login berhasil!");

  } catch (err) {
    console.error(err);
    alert("Gagal connect ke server");
  }
};
  return (
    <div className="container">
      <Card>
        <h2>Masuk ke akun</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="forgot"> <Link to="/lupa-password">Lupa Password?</Link></div>

          <Button text={btnText} />

          <div className="divider">
            <span></span>
            <p>Atau</p>
            <span></span>
          </div>

          <p className="signup">
            Belum Punya Akun? <Link to="/register">Daftar sekarang</Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
