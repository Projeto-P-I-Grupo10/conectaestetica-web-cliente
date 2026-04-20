import logo from "../img/Logo-horizontal-branca.png";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#6B4A3A] text-white px-10 py-10">
      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* ESQUERDA */}
        <div className="max-w-sm">
          <img src={logo} alt="ConectaEstética" className="w-60" />
          <div className="flex gap-4 mt-4 text-xl">
            <a
              href="https://wa.me/5511987654321"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://instagram.com/seuusuario"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* DIREITA */}
        <div className="flex gap-16">
          {/* LINKS */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-[#c9a46c]">Links</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>Home</li>
              <li>Cursos</li>
              <li>Divulgue o seu curso</li>
            </ul>
          </div>

          {/* CONTATO */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-[#c9a46c]">Contato</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>Telefone: 11 98765-4321</li>
              <li>Email: conectaestetica@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* LINHA */}
      <div className="border-t border-white/20 mt-8 pt-4 text-center text-xs text-gray-300">
        © 2026 Conecta Estética. All rights reserved
      </div>
    </footer>
  );
}
