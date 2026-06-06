import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  LogOut,
  GraduationCap,
  Layers,
  MapPin,
  BookMarked,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

export default function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  const menus = [
    {
      nome: "Dashboard",
      icon: <LayoutDashboard size={22} />,
      path: "/admin/dashboard",
    },
    {
      nome: "Endereço",
      icon: <MapPin size={22} />,
      path: "/admin/endereco",
    },
    {
      nome: "Professores",
      icon: <GraduationCap size={22} />,
      path: "/admin/professor",
    },
    {
      nome: "Turmas",
      icon: <Layers size={22} />,
      path: "/admin/turmas",
    },
    // {
    //   nome: "Alunos",
    //   icon: <Users size={22} />,
    //   path: "/admin/alunos",
    // },
    {
      nome: "Areas",
      icon: <BookMarked size={22} />,
      path: "/admin/areas",
    },
    {
      nome: "Cursos",
      icon: <BookOpen size={22} />,
      path: "/admin/cursos",
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
      <div className="mb-12">
        <h1 className="text-3xl font-light text-[#3d2b1f] tracking-wide">
          Conecta
        </h1>
        <p className="text-gray-500 mt-1">Painel administrativo</p>
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-3">
        {menus.map((item, index) => {
          const ativo = location.pathname === item.path;

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`
                flex items-center gap-4 px-5 py-4 rounded-2xl
                transition-all duration-300
                hover:scale-[1.02] active:scale-[0.98]

                ${
                  ativo
                    ? "bg-[#c9a46c] text-white shadow-sm"
                    : "text-[#3d2b1f] hover:bg-[#faf8f6]"
                }
              `}
            >
              {item.icon}
              <span className="font-medium">{item.nome}</span>
            </button>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="mt-auto space-y-4">
        <button
          onClick={logout}
          className="
            w-full flex items-center justify-center gap-3
            border border-[#ece7e2] text-[#3d2b1f]
            py-4 rounded-2xl transition-all duration-300
            hover:bg-red-50 hover:border-red-200
            hover:text-red-500 hover:scale-[1.02]
            active:scale-[0.98]
          "
        >
          <LogOut size={20} />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
}
