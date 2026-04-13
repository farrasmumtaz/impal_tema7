import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LupaPassword from "./pages/LupaPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lupa-password" element={<LupaPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;