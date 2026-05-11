import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // kalau belum login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // kalau sudah login
  return children;
}