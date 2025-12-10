import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />; // si es diferente a admin, entonces se va al home
  }

  return children;
}

// para que bloquee a los demás  las rutas que son solo para admin