import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { CarritoProvider } from "./pages/CarritoContext";

//components
import NavBar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Chat from "./components/Chat.jsx";

//pages
import Registro from "./pages/Registro.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import Carrito from "./pages/Carrito.jsx";

function App() {
  return (
    <BrowserRouter>
    <CarritoProvider>
      <NavBar/>
      <Routes>
        <Route path="/registro" element={<Registro />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto/>}/>
        <Route path="/carrito" element={<Carrito/>}/>
      </Routes>

      <Footer/>
      <Chat/>
    </CarritoProvider>
    </BrowserRouter>
  );
}


export default App;