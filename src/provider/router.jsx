import { createBrowserRouter } from "react-router-dom";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";
import CursosPage from "../pages/CursosPages";
import CursoDetalhe from "../pages/CursoDetalhe";
import Pagamento from "../pages/Pagamento";
import Home from "../pages/Home";
import Perfil from "../pages/Perfil";
import Matricula from "../pages/Matricula";
import Formulario from "../pages/Formulario";

// Admin
import AdminDashboard from "../pages/AdminDashboard";
import AdminCursos from "../pages/AdminCursos";
import AdminProfessor from "../pages/AdminProfessor";
import AdminTurmas from "../pages/AdminTurmas";
import AdminEnderecos from "../pages/AdminEnderecos";
import AdminAreas from "../pages/AdminAreas"

export const router = createBrowserRouter([
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
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
    path: "/perfil",
    element: <Perfil />,
  },
  {
    path: "/matricula",
    element: <Matricula />,
  },
  {
    path: "/formulario",
    element: <Formulario />,
  },

  // Area de admin

  {
    path: "Admin/Dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "Admin/Cursos",
    element: <AdminCursos />,
  },
  {
    path: "Admin/Professor",
    element: <AdminProfessor />,
  },
  {
    path: "Admin/Turmas",
    element: <AdminTurmas />,
  },
  {
    path: "Admin/Endereco",
    element: <AdminEnderecos />,
  },
  {
    path: "Admin/Areas",
    element: <AdminAreas />,
  },

  {
    // Caso o caminho esteja errado

    path: "*",
    element: <div>Página não encontrada</div>,
  },
]);
