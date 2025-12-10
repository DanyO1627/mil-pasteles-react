import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  return children;
}

// esto para usarlo en las rutas que requieren que uno esté logeado (como la de perfil)