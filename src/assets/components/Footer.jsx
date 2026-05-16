import logo from "../img/Logo-horizontal-branca.png";

import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

import { Mail, Phone, ChevronRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#5b3f31] text-white pt-28">
      <div className="max-w-7xl mx-auto px-8">
        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-20 pb-20">
          {/* Branding */}
          <div className="lg:col-span-2">
            <img src={logo} alt="Conecta Estética" className="w-72 mb-8" />

            <p className="text-[#f1e6de] leading-loose max-w-lg text-[15px]">
              A Conecta Estética conecta profissionais e alunos através de
              cursos especializados, criando uma experiência moderna e acessível
              para o universo da estética.
            </p>

            {/* Redes sociais */}
            <div className="flex items-center gap-5 mt-10">
              <a
                href="https://wa.me/5511987654321"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  hover:bg-[#c9a46c]
                  transition-all
                  duration-300
                "
              >
                <FaWhatsapp size={18} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  hover:bg-[#c9a46c]
                  transition-all
                  duration-300
                "
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="/"
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  hover:bg-[#c9a46c]
                  transition-all
                  duration-300
                "
              >
                <FaFacebookF size={16} />
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-2xl font-medium mb-8 text-[#e7c48f]">
              Navegação
            </h3>

            <ul className="space-y-6">
              <li>
                <button
                  onClick={() => navigate("/home")}
                  className="
                    flex
                    items-center
                    gap-3
                    text-[#f1e6de]
                    hover:text-[#c9a46c]
                    transition
                  "
                >
                  <ChevronRight size={18} />
                  Home
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("/cursos")}
                  className="
                    flex
                    items-center
                    gap-3
                    text-[#f1e6de]
                    hover:text-[#c9a46c]
                    transition
                  "
                >
                  <ChevronRight size={18} />
                  Cursos
                </button>
              </li>

              <li>
                <button
                  className="
                    flex
                    items-center
                    gap-3
                    text-[#f1e6de]
                    hover:text-[#c9a46c]
                    transition
                  "
                >
                  <ChevronRight size={18} />
                  Divulgue seu curso
                </button>
              </li>

              <li>
                <button
                  className="
                    flex
                    items-center
                    gap-3
                    text-[#f1e6de]
                    hover:text-[#c9a46c]
                    transition
                  "
                >
                  <ChevronRight size={18} />
                  Sobre nós
                </button>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-2xl font-medium mb-8 text-[#e7c48f]">
              Contato
            </h3>

            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div
                  className="
                    min-w-12
                    h-12
                    rounded-2xl
                    bg-white/10
                    flex
                    items-center
                    justify-center
                    text-[#c9a46c]
                  "
                >
                  <Mail size={20} />
                </div>

                <div>
                  <p className="text-sm text-white/50 mb-2">E-mail</p>

                  <span className="text-[#f1e6de] text-[15px]">
                    conectaestetica@gmail.com
                  </span>
                </div>
              </div>

              {/* Telefone */}
              <div className="flex items-start gap-4">
                <div
                  className="
                    min-w-12
                    h-12
                    rounded-2xl
                    bg-white/10
                    flex
                    items-center
                    justify-center
                    text-[#c9a46c]
                  "
                >
                  <Phone size={20} />
                </div>

                <div>
                  <p className="text-sm text-white/50 mb-2">Telefone</p>

                  <span className="text-[#f1e6de] text-[15px]">
                    (11) 98765-4321
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Linha inferior */}
        <div
          className="
            border-t
            border-white/10
            py-8
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-6
          "
        >
          <p className="text-sm text-[#f1e6de]">
            © 2026 Conecta Estética. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-8 text-sm text-[#f1e6de]">
            <button className="hover:text-[#c9a46c] transition">
              Privacidade
            </button>

            <button className="hover:text-[#c9a46c] transition">Termos</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
