import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Vuelve al inicio cada vez que cambia la ruta
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}