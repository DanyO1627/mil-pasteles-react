import React from "react";
import { useNavigate } from "react-router-dom";
import '../stylesAdmin/productosAdmin.css';

export default function AdminHome() {
  const navigate = useNavigate();
  return (
    <div className="admin-home">
      <h1 className="admin-home__titulo">Área de administración</h1>
      <p>Bienvenida/o — aquí puedes gestionar la tienda.</p>
      <button className="admin-home__btn" onClick={() => navigate('/admin/panel/productos')}>
        Ir a Panel de Productos
      </button>

      <button className="admin-home__btn" onClick={() => navigate('/admin/categorias')}>
        Administrar categorias
      </button>

    </div>
  );
}