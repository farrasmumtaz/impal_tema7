import { useState } from "react";
import "../styles/register.css";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Card from "../components/Card";
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

    const [btnText, setBtnText] = useState("Konfirmasi");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setBtnText("Password beda!");
            return;
        }

        try {
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

        } catch (err) {
            console.error(err);
            alert("Gagal connect ke server");
        }
    };

    return (
        <div className="container">
            <Card>
                <h2>Registrasi</h2>
                <hr />

                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Username"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                        name="username"
                    />
                    <div style={{ display: "flex", gap: "10px" }}>
                        <InputField
                            label="Nama Depan"
                            type="text"
                            value={form.firstName}
                            onChange={handleChange}
                            name="firstName"
                        />

                        <InputField
                            label="Nama Belakang"
                            type="text"
                            value={form.lastName}
                            onChange={handleChange}
                            name="lastName"
                        />
                    </div>

                    <InputField
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        name="email"
                    />

                    <InputField
                        label="Password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        name="password"
                    />

                    <InputField
                        label="Konfirmasi Password"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        name="confirmPassword"
                    />
                    
                    <InputField
                        label="Nomor Telepon"
                        type="text"
                        value={form.phone}
                        onChange={handleChange}
                        name="phone"
                    />

                    <br />

                    <Button text={btnText} />
                </form>

                <div className="divider">
                    <span></span>
                    <p>Atau</p>
                    <span></span>
                </div>

                <p className="login">
                    Sudah Punya Akun? <Link to="/">Login sekarang</Link>
                </p>
            </Card>
        </div>
    );
}