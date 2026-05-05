import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Card from "../components/Card";
import { Link, } from "react-router-dom";

export default function LupaPassword() {
    const [email, setEmail] = useState("");
    const [btnText, setBtnText] = useState("Kirim Link Reset");
    const [resetLink, setResetLink] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            if (!email) {
                setBtnText("Email harus diisi");
                return;
            }

            const data = await res.json();
            if (!res.ok) {
                alert(data.message);
                return;
            }
            setResetLink(data.resetLink);
            setBtnText(data.message);
        } catch {
            setBtnText("Terjadi error");
        }
    };

    return (
        <div className="container">
            <Card>
                <h2>Lupa Password</h2>
                <hr />
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button type="submit" text={btnText} />
                    {resetLink && (
                        <div style={{ marginTop: "15px", color: "white" }}>
                            <p>Link reset:</p>
                            <a href={resetLink} target="_blank" style={{ color: "cyan" }}>
                                {resetLink}
                            </a>
                        </div>
                    )}
                </form>
            </Card>
        </div>
    )
}
