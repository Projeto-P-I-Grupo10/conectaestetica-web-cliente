import {
  LayoutDashboard,
  BookOpen,
  Users,
  LogOut,
  GraduationCap,
  Layers,
  MapPin,
  BookMarked,
  ChevronDown,
} from "lucide-react";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cursosAberto, setCursosAberto] = useState(true);
  const [usuariosAberto, setUsuariosAberto] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  const cursos = [
    {
      nome: "Endereço",
      icon: <MapPin size={20} />,
      path: "/admin/endereco",
    },
    {
      nome: "Professores",
      icon: <GraduationCap size={20} />,
      path: "/admin/professor",
    },
    {
      nome: "Turmas",
      icon: <Layers size={20} />,
      path: "/admin/turmas",
    },
    {
      nome: "Áreas",
      icon: <BookMarked size={20} />,
      path: "/admin/areas",
    },
    {
      nome: "Cursos",
      icon: <BookOpen size={20} />,
      path: "/admin/cursos",
    },
  ];

  const usuarios = [
    {
      nome: "Alunos",
      icon: <Users size={20} />,
      path: "/admin/alunos",
    },

    {
      nome: "Administradores",
      icon: <Users size={20} />,
      path: "/admin/Usuariosadmin",
    },
  ];

  return (
    <aside
      className="
        fixed left-0 top-0 h-screen w-2xs
        bg-white border-r border-[#ece7e2]
        px-6 py-8 flex flex-col shadow-sm z-50
      "
    >
      {/* LOGO */}
      <div className="mb-10">
        <h1 className="text-3xl font-light text-[#3d2b1f] tracking-wide">
          Conecta
        </h1>

        <p className="text-gray-500 mt-1">Painel administrativo</p>
      </div>

      {/* DASHBOARD */}
      <button
        onClick={() => navigate("/admin/dashboard")}
        className={`
          w-full flex items-center gap-4 px-5 py-4 rounded-2xl
          transition-all duration-300
          ${
            location.pathname === "/admin/dashboard"
              ? "bg-[#c9a46c] text-white"
              : "text-[#3d2b1f] hover:bg-[#faf8f6]"
          }
        `}
      >
        <LayoutDashboard size={22} />
        <span className="font-medium">Dashboard</span>
      </button>

      {/* USUÁRIOS */}
      <div className="mt-4">
        <button
          onClick={() => setUsuariosAberto(!usuariosAberto)}
          className="
            w-full flex items-center justify-between
            px-5 py-4 rounded-2xl
            text-[#3d2b1f]
            hover:bg-[#faf8f6]
          "
        >
          <span className="font-semibold">Usuários</span>

          <ChevronDown
            size={20}
            className={`
              transition-transform
              ${usuariosAberto ? "rotate-180" : ""}
            `}
          />
        </button>

        {usuariosAberto && (
          <div className="mt-2 flex flex-col gap-1">
            {usuarios.map((item, index) => {
              const ativo = location.pathname === item.path;

              return (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`
                    w-full flex items-center gap-4
                    px-5 py-3 rounded-2xl
                    transition-all duration-300
                    ${
                      ativo
                        ? "bg-[#c9a46c] text-white"
                        : "text-[#3d2b1f] hover:bg-[#faf8f6]"
                    }
                  `}
                >
                  {item.icon}

                  <span className="font-medium">{item.nome}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* CURSOS */}
      <div className="mt-6">
        <button
          onClick={() => setCursosAberto(!cursosAberto)}
          className="
            w-full flex items-center justify-between
            px-5 py-4 rounded-2xl
            text-[#3d2b1f]
            hover:bg-[#faf8f6]
          "
        >
          <span className="font-semibold">Cursos</span>

          <ChevronDown
            size={20}
            className={`
              transition-transform
              ${cursosAberto ? "rotate-180" : ""}
            `}
          />
        </button>

        {cursosAberto && (
          <div className="mt-2 flex flex-col gap-1">
            {cursos.map((item, index) => {
              const ativo = location.pathname === item.path;

              return (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`
                    w-full flex items-center gap-4
                    px-5 py-3 rounded-2xl
                    transition-all duration-300
                    ${
                      ativo
                        ? "bg-[#c9a46c] text-white"
                        : "text-[#3d2b1f] hover:bg-[#faf8f6]"
                    }
                  `}
                >
                  {item.icon}

                  <span className="font-medium">{item.nome}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="mt-auto">
        <button
          onClick={logout}
          className="
            w-full flex items-center justify-center gap-3
            border border-[#ece7e2] text-[#3d2b1f]
            py-4 rounded-2xl transition-all duration-300
            hover:bg-red-50 hover:border-red-200
            hover:text-red-500
          "
        >
          <LogOut size={20} />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
}
