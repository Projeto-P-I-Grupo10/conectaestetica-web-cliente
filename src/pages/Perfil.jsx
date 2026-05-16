import { useState } from "react";
import { Pencil, BookOpen, User, Mail, Phone, Lock } from "lucide-react";

import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";

export default function PerfilUsuario() {
  const [usuario] = useState({
    nome: localStorage.getItem("nome") || "Usuário exemplo",
    email: localStorage.getItem("email") || "usuario@gmail.com",
    celular: "(11) 90000-0000",
  });

  const cursos = [
    {
      id: 1,
      titulo: "Curso - Skin care",
      imagem:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      titulo: "Curso - Botox",
      imagem:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <Navbar />

      <section className="pt-36 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Container principal */}
          <div className="bg-white rounded-4xl shadow-sm border border-[#ece7e2] p-6 md:p-10">
            {/* Título */}
            <div className="mb-10">
              <h1 className="text-4xl font-light text-[#3d2b1f] mb-3">
                Meu perfil
              </h1>

              <p className="text-gray-600">
                Gerencie seus dados pessoais e acompanhe seus cursos.
              </p>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
              {/* Cursos */}
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#c9a46c]/15 flex items-center justify-center text-[#c9a46c]">
                    <BookOpen size={24} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-medium text-[#3d2b1f]">
                      Meus cursos
                    </h2>

                    <p className="text-sm text-gray-500">
                      Cursos adquiridos recentemente
                    </p>
                  </div>
                </div>

                {/* Lista */}
                <div className="space-y-6">
                  {cursos.map((curso) => (
                    <div
                      key={curso.id}
                      className="
                        bg-[#faf8f6]
                        border
                        border-[#ece7e2]
                        rounded-3xl
                        overflow-hidden
                        flex
                        flex-col
                        md:flex-row
                        hover:shadow-lg
                        transition-all
                        duration-300
                      "
                    >
                      {/* Imagem */}
                      <img
                        src={curso.imagem}
                        alt={curso.titulo}
                        className="
                          w-full
                          md:w-64
                          h-52
                          object-cover
                        "
                      />

                      {/* Conteúdo */}
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-medium text-[#3d2b1f] mb-3">
                            {curso.titulo}
                          </h3>

                          <p className="text-gray-600 leading-relaxed">
                            Continue acompanhando suas aulas e desenvolvendo
                            suas habilidades na área da estética.
                          </p>
                        </div>

                        {/* Botão */}
                        <div className="mt-6">
                          <button
                            className="
                              bg-[#c9a46c]
                              hover:bg-[#b89258]
                              transition
                              text-white
                              px-8
                              py-3
                              rounded-full
                              font-medium
                              shadow-sm
                            "
                          >
                            Acessar curso
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perfil */}
              <div
                className="
                  bg-[#faf8f6]
                  border
                  border-[#ece7e2]
                  rounded-3xl
                  p-8
                  h-fit
                "
              >
                {/* Avatar */}
                <div className="flex flex-col items-center text-center mb-10">
                  <div className="relative">
                    <div
                      className="
                        w-32
                        h-32
                        rounded-full
                        bg-[#e7d8c9]
                        flex
                        items-center
                        justify-center
                        text-[#6B4A3A]
                      "
                    >
                      <User size={42} />
                    </div>

                    {/* Editar */}
                    <button
                      className="
                        absolute
                        bottom-1
                        right-1
                        w-10
                        h-10
                        rounded-full
                        bg-white
                        border
                        border-[#ece7e2]
                        flex
                        items-center
                        justify-center
                        shadow-sm
                        hover:bg-[#f5f5f5]
                        transition
                      "
                    >
                      <Pencil size={16} />
                    </button>
                  </div>

                  <h2 className="text-2xl font-medium text-[#3d2b1f] mt-5">
                    {usuario.nome}
                  </h2>

                  <p className="text-gray-500">Aluno da plataforma</p>
                </div>

                {/* Dados */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-medium text-[#3d2b1f]">
                      Dados pessoais
                    </h3>

                    <button
                      className="
                        text-[#c9a46c]
                        hover:text-[#b89258]
                        transition
                      "
                    >
                      <Pencil size={18} />
                    </button>
                  </div>

                  <div className="space-y-5">
                    {/* Nome */}
                    <div className="bg-white rounded-2xl p-4 border border-[#ece7e2]">
                      <div className="flex items-center gap-3 mb-2 text-[#c9a46c]">
                        <User size={18} />
                        <span className="text-sm font-medium">
                          Nome completo
                        </span>
                      </div>

                      <p className="text-[#3d2b1f]">{usuario.nome}</p>
                    </div>

                    {/* Email */}
                    <div className="bg-white rounded-2xl p-4 border border-[#ece7e2]">
                      <div className="flex items-center gap-3 mb-2 text-[#c9a46c]">
                        <Mail size={18} />
                        <span className="text-sm font-medium">E-mail</span>
                      </div>

                      <p className="text-[#3d2b1f]">{usuario.email}</p>
                    </div>

                    {/* Telefone */}
                    <div className="bg-white rounded-2xl p-4 border border-[#ece7e2]">
                      <div className="flex items-center gap-3 mb-2 text-[#c9a46c]">
                        <Phone size={18} />
                        <span className="text-sm font-medium">Celular</span>
                      </div>

                      <p className="text-[#3d2b1f]">{usuario.celular}</p>
                    </div>

                    {/* Senha */}
                    <div className="bg-white rounded-2xl p-4 border border-[#ece7e2]">
                      <div className="flex items-center gap-3 mb-2 text-[#c9a46c]">
                        <Lock size={18} />
                        <span className="text-sm font-medium">Senha</span>
                      </div>

                      <p className="text-[#3d2b1f]">••••••••</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
