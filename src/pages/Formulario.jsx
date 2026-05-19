import { useState } from "react";
import { Send, BookOpen, User, Mail, Phone, FileText } from "lucide-react";

import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";

export default function DivulgarCursoPage() {
  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    telefone: "",
    curso: "",
    descricao: "",
  });

  function handleChange(e) {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // MOCK
    console.log("Dados enviados:", formulario);

    alert("Solicitação enviada com sucesso!");
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <Navbar />

      <section className="pt-36 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-16">
            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-[#c9a46c]/15
                flex
                items-center
                justify-center
                text-[#c9a46c]
                mx-auto
                mb-6
              "
            >
              <BookOpen size={38} />
            </div>

            <h1 className="text-5xl font-light text-[#3d2b1f] mb-5">
              Divulgue seu curso
            </h1>

            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
              Faça parte da Conecta Estética e compartilhe seus conhecimentos
              com milhares de alunos interessados na área da estética e
              bem-estar.
            </p>
          </div>

          {/* CONTAINER */}
          <div
            className="
              bg-white
              border
              border-[#ece7e2]
              rounded-[2rem]
              p-8
              md:p-12
              shadow-sm
            "
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
              {/* ESQUERDA */}
              <div>
                <h2 className="text-3xl font-light text-[#3d2b1f] mb-6">
                  Envie os dados do seu curso
                </h2>

                <p className="text-gray-600 leading-relaxed mb-10">
                  Nossa equipe irá analisar as informações enviadas e entrar em
                  contato para dar continuidade ao processo de publicação do
                  curso na plataforma.
                </p>

                {/* BENEFÍCIOS */}
                <div className="space-y-5">
                  <div
                    className="
                      bg-[#faf8f6]
                      border
                      border-[#ece7e2]
                      rounded-3xl
                      p-5
                    "
                  >
                    <h3 className="text-lg font-medium text-[#3d2b1f] mb-2">
                      Alcance mais alunos
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      Divulgue seus cursos para pessoas interessadas em
                      desenvolvimento profissional na estética.
                    </p>
                  </div>

                  <div
                    className="
                      bg-[#faf8f6]
                      border
                      border-[#ece7e2]
                      rounded-3xl
                      p-5
                    "
                  >
                    <h3 className="text-lg font-medium text-[#3d2b1f] mb-2">
                      Plataforma profissional
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      Tenha seu curso em um ambiente moderno, elegante e
                      preparado para conversão.
                    </p>
                  </div>

                  <div
                    className="
                      bg-[#faf8f6]
                      border
                      border-[#ece7e2]
                      rounded-3xl
                      p-5
                    "
                  >
                    <h3 className="text-lg font-medium text-[#3d2b1f] mb-2">
                      Suporte especializado
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      Nossa equipe acompanha todo o processo de publicação do
                      seu curso.
                    </p>
                  </div>
                </div>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div>
                  <label className="block text-[#3d2b1f] font-medium mb-3">
                    Nome completo
                  </label>

                  <div
                    className="
                      bg-[#faf8f6]
                      border
                      border-[#ece7e2]
                      rounded-2xl
                      px-5
                      py-4
                      flex
                      items-center
                      gap-4
                      focus-within:border-[#c9a46c]
                      transition
                    "
                  >
                    <User size={20} className="text-[#c9a46c]" />

                    <input
                      type="text"
                      name="nome"
                      placeholder="Digite seu nome"
                      value={formulario.nome}
                      onChange={handleChange}
                      className="
                        w-full
                        bg-transparent
                        outline-none
                        text-[#3d2b1f]
                      "
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[#3d2b1f] font-medium mb-3">
                    E-mail
                  </label>

                  <div
                    className="
                      bg-[#faf8f6]
                      border
                      border-[#ece7e2]
                      rounded-2xl
                      px-5
                      py-4
                      flex
                      items-center
                      gap-4
                      focus-within:border-[#c9a46c]
                      transition
                    "
                  >
                    <Mail size={20} className="text-[#c9a46c]" />

                    <input
                      type="email"
                      name="email"
                      placeholder="Digite seu e-mail"
                      value={formulario.email}
                      onChange={handleChange}
                      className="
                        w-full
                        bg-transparent
                        outline-none
                        text-[#3d2b1f]
                      "
                    />
                  </div>
                </div>

                {/* Telefone */}
                <div>
                  <label className="block text-[#3d2b1f] font-medium mb-3">
                    Telefone
                  </label>

                  <div
                    className="
                      bg-[#faf8f6]
                      border
                      border-[#ece7e2]
                      rounded-2xl
                      px-5
                      py-4
                      flex
                      items-center
                      gap-4
                      focus-within:border-[#c9a46c]
                      transition
                    "
                  >
                    <Phone size={20} className="text-[#c9a46c]" />

                    <input
                      type="text"
                      name="telefone"
                      placeholder="(11) 99999-9999"
                      value={formulario.telefone}
                      onChange={handleChange}
                      className="
                        w-full
                        bg-transparent
                        outline-none
                        text-[#3d2b1f]
                      "
                    />
                  </div>
                </div>

                {/* Nome Curso */}
                <div>
                  <label className="block text-[#3d2b1f] font-medium mb-3">
                    Nome do curso
                  </label>

                  <div
                    className="
                      bg-[#faf8f6]
                      border
                      border-[#ece7e2]
                      rounded-2xl
                      px-5
                      py-4
                      flex
                      items-center
                      gap-4
                      focus-within:border-[#c9a46c]
                      transition
                    "
                  >
                    <BookOpen size={20} className="text-[#c9a46c]" />

                    <input
                      type="text"
                      name="curso"
                      placeholder="Digite o nome do curso"
                      value={formulario.curso}
                      onChange={handleChange}
                      className="
                        w-full
                        bg-transparent
                        outline-none
                        text-[#3d2b1f]
                      "
                    />
                  </div>
                </div>

                {/* Descrição */}
                <div>
                  <label className="block text-[#3d2b1f] font-medium mb-3">
                    Descrição do curso
                  </label>

                  <div
                    className="
                      bg-[#faf8f6]
                      border
                      border-[#ece7e2]
                      rounded-2xl
                      px-5
                      py-4
                      flex
                      gap-4
                      focus-within:border-[#c9a46c]
                      transition
                    "
                  >
                    <FileText size={20} className="text-[#c9a46c] mt-1" />

                    <textarea
                      name="descricao"
                      rows={6}
                      placeholder="Conte um pouco sobre o curso..."
                      value={formulario.descricao}
                      onChange={handleChange}
                      className="
                        w-full
                        bg-transparent
                        outline-none
                        resize-none
                        text-[#3d2b1f]
                      "
                    />
                  </div>
                </div>

                {/* BOTÃO */}
                <button
                  type="submit"
                  className="
                    w-full
                    bg-[#c9a46c]
                    hover:bg-[#b89258]
                    transition
                    text-white
                    py-4
                    rounded-full
                    font-medium
                    flex
                    items-center
                    justify-center
                    gap-3
                    shadow-sm
                    mt-4
                  "
                >
                  <Send size={18} />
                  Enviar solicitação
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
