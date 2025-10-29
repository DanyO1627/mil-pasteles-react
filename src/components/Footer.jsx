import FooterYear from "./FooterYear.jsx";

export default function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 16
        }}>
          <div>
            <h5>📍 Dirección</h5>
            <p>Av. Providencia 1900, Santiago, Chile</p>
          </div>
          <div>
            <h5>📞 Contacto</h5>
            <p>Tel: +56 986739543</p>
            <p>Email: contacto@mil-sabores.cl</p>
          </div>
          <div>
            <h5>🌐 Síguenos</h5>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>{" · "}
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>{" · "}
            <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
          </div>
        </div>
        <hr />
        <p className="text-center mb-0">
          &copy; <FooterYear /> Pastelería Mil Sabores
        </p>
      </div>
    </footer>
  );
}
