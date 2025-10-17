import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Registro from "./pages/Registro.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

