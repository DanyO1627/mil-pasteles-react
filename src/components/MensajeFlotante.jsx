import React from "react";
import "../styles/mensaje.css";

export default function Toast({ mensaje, visible }) {
  if (!visible) return null;
  return (
    <div className="toast-noti">
      {mensaje}
    </div>
  );
}