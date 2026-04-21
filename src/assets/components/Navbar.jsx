import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../img/Logo-horizontal-preta.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [usuario] = useState(() => {
    return localStorage.getItem("nome") || "";
  });

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="absolute w-full flex justify-center z-50 mt-4">
        <nav className="w-full max-w-7xl max-h-20 bg-[#ffffff] flex items-center justify-between px-6 md:px-8 py-3 rounded-4xl shadow-md">
          
          {/* Logo */}
          <img src={logo} alt="Logo Conecta Estética" />

          {/* Links (desktop) */}
          <ul className="hidden md:flex items-center gap-8 text-gray-800 font-medium">
            <li className="cursor-pointer hover:text-black transition">Home</li>
            <li className="cursor-pointer hover:text-black transition">
              Cursos
            </li>
            <li className="cursor-pointer hover:text-black transition">
              Divulgue seu curso
            </li>
          </ul>

          {/* Botões (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {usuario ? (
              <>
                <span className="text-[#6B4A3A] font-medium">
                  Olá, {usuario}
                </span>

                <button
                  onClick={handleLogout}
                  className="cursor-pointer text-sm text-red-500 hover:underline"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <button className="cursor-pointer px-5 py-1.5 border border-[#c9a46c] rounded-full hover:bg-gray-100 transition">
                  Login
                </button>

                <button className="cursor-pointer px-5 py-1.5 bg-[#c9a46c] text-white rounded-full hover:opacity-90 transition">
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
          
          <span onClick={() => setMenuOpen(false)}>Home</span>
          <span onClick={() => setMenuOpen(false)}>Cursos</span>
          <span onClick={() => setMenuOpen(false)}>
            Divulgue seu curso
          </span>

          <hr />

          {usuario ? (
            <>
              <span className="font-medium text-[#6B4A3A]">
                Olá, {usuario}
              </span>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-red-500"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setMenuOpen(false)}
                className="border border-[#c9a46c] rounded-full py-2 hover:bg-gray-100 transition"
              >
                Login
              </button>

              <button
                onClick={() => setMenuOpen(false)}
                className="bg-[#c9a46c] text-white rounded-full py-2 hover:opacity-90 transition"
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