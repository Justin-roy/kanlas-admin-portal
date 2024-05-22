import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const adminID = localStorage.getItem("ADMIN-ID");

  useEffect(() => {
    if (!adminID) {
      navigate("/");
    }
  }, [navigate, adminID]);

  return children;
}
