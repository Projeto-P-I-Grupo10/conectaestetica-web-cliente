import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/cadastro";
import CursosPage from "./pages/CursosPages";
import CursoDetalhe from "./pages/CursoDetalhe";
import Pagamento from "./pages/Pagamento"

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

        {/* Página de detalhes do cursos */}
        <Route path="/curso/:id" element={<CursoDetalhe />} />

        {/* Página de Pagamento */}
        <Route path="/pagamentos/:idcurso" element={<Pagamento />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
