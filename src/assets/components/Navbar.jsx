import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../img/Logo-horizontal-preta.png";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [usuario] = useState(() => {
    return sessionStorage.getItem("nome") || "";
  });

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="absolute w-full flex justify-center z-50 mt-4">
        <nav className="w-full max-w-7xl max-h-20 bg-[#ffffff] flex items-center justify-between px-6 md:px-8 py-3 rounded-4xl shadow-md">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo Conecta Estética"
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />

          {/* Links Desktop */}
          <ul className="hidden md:flex items-center gap-8 text-gray-800 font-medium">
            <li
              className="cursor-pointer hover:text-black transition"
              onClick={() => navigate("/")}
            >
              Home
            </li>

            <li
              className="cursor-pointer hover:text-black transition"
              onClick={() => navigate("/cursos")}
            >
              Cursos
            </li>

            <li
              className="cursor-pointer hover:text-black transition"
              onClick={() => navigate("/formulario")}
            >
              Divulgue seu curso
            </li>
          </ul>

          {/* Botões Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {usuario ? (
              <>
                <span className="text-[#6B4A3A] font-medium">
                  Olá, {usuario}
                </span>

                {/* Perfil */}
                <button
                  onClick={() => navigate("/perfil")}
                  className="
                    cursor-pointer
                    px-5
                    py-1.5
                    border
                    border-[#c9a46c]
                    text-[#6B4A3A]
                    rounded-full
                    hover:bg-[#f8f5f2]
                    transition
                  "
                >
                  Perfil
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="
                    cursor-pointer
                    px-5
                    py-1.5
                    bg-red-500
                    text-white
                    rounded-full
                    hover:bg-red-600
                    transition
                  "
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <button
                  onClick={() => navigate("/login")}
                  className="
                    cursor-pointer
                    px-5
                    py-1.5
                    border
                    border-[#c9a46c]
                    rounded-full
                    hover:bg-gray-100
                    transition
                  "
                >
                  Login
                </button>

                {/* Cadastro */}
                <button
                  onClick={() => navigate("/cadastro")}
                  className="
                    cursor-pointer
                    px-5
                    py-1.5
                    bg-[#c9a46c]
                    text-white
                    rounded-full
                    hover:opacity-90
                    transition
                  "
                >
                  Cadastro
                </button>
              </>
            )}
          </div>

          {/* Botão Mobile */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </div>

      {/* MENU MOBILE */}
      <div
        className={`absolute top-24 left-0 flex justify-center w-full transition-all duration-300 z-50 ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <div className="mt-4 w-[95%] max-w-6xl bg-[#d9d9d9] rounded-2xl p-5 flex flex-col gap-4 md:hidden shadow-md">
          {/* Links */}
          <span
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
          >
            Home
          </span>

          <span
            onClick={() => {
              navigate("/cursos");
              setMenuOpen(false);
            }}
          >
            Cursos
          </span>

          <span onClick={() => setMenuOpen(false)}>Divulgue seu curso</span>

          <hr />

          {usuario ? (
            <>
              <span className="font-medium text-[#6B4A3A]">Olá, {usuario}</span>

              {/* Perfil */}
              <button
                onClick={() => {
                  navigate("/perfil");
                  setMenuOpen(false);
                }}
                className="
                  border
                  border-[#c9a46c]
                  rounded-full
                  py-2
                  text-[#6B4A3A]
                  hover:bg-[#f8f5f2]
                  transition
                "
              >
                Perfil
              </button>

              {/* Logout */}
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="
                  bg-red-500
                  text-white
                  rounded-full
                  py-2
                  hover:bg-red-600
                  transition
                "
              >
                Sair
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="
                  border
                  border-[#c9a46c]
                  rounded-full
                  py-2
                  hover:bg-gray-100
                  transition
                "
              >
                Login
              </button>

              {/* Cadastro */}
              <button
                onClick={() => {
                  navigate("/cadastro");
                  setMenuOpen(false);
                }}
                className="
                  bg-[#c9a46c]
                  text-white
                  rounded-full
                  py-2
                  hover:opacity-90
                  transition
                "
              >
                Cadastro
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
