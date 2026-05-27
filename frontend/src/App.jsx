import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import LupaPassword from "./pages/LupaPassword";
import ResetPassword from "./pages/ResetPassword";

import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Membership from "./pages/Membership";
import Transaksi from "./pages/Transaksi";
import CourseDetail from "./pages/CourseDetail";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lupa-password" element={<LupaPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* PRIVATE */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/membership"
          element={
            <ProtectedRoute>
              <Membership />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transaksi"
          element={
            <ProtectedRoute>
              <Transaksi />
            </ProtectedRoute>
          }
        />

        <Route
          path="/course/:id"
          element={
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;