import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LupaPassword from "./pages/LupaPassword";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import Courses from "./pages/Courses";
import Membership from "./pages/Membership";
import Transaksi from "./pages/Transaksi";
import CourseDetail from "./pages/CourseDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lupa-password" element={<LupaPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/courses" element={<Courses />}/>
        <Route path="/membership" element={<Membership />}/>
        <Route path="/transaksi" element={<Transaksi />}/>
        <Route path="/course/:id" element={<CourseDetail />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;