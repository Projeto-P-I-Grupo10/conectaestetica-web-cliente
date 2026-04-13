import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/cadastro";
import CursosPage from "./pages/CursosPages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* Cadastro */}
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Página de cursos */}
        <Route path="/cursos" element={<CursosPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
