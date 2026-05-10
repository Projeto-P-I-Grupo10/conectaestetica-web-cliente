import { createBrowserRouter } from "react-router-dom";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";
import CursosPage from "../pages/CursosPages";
import CursoDetalhe from "../pages/CursoDetalhe";
import Pagamento from "../pages/Pagamento";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Cadastro />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cursos",
    element: <CursosPage />,
  },
  {
    path: "/curso/:id",
    element: <CursoDetalhe />,
  },
  {
    path: "/pagamentos/:id",
    element: <Pagamento />,
  },
  {
    path: "*",
    element: <div>Página não encontrada</div>,
  },
]);
