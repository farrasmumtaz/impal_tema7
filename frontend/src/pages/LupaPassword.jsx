import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Card from "../components/Card";
import { Link } from "react-router-dom";

export default function LupaPassword() {
    const[email, setEmail] = useState("");
    const [btnText, setBtnText] = useState("Kirim Link Reset");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            setBtnText("Email harus diisi!");
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
                </form>
            </Card>
        </div>
    )
}
