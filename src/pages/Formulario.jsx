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

  const [erros, setErros] = useState({});

  function mascaraTelefone(valor) {
    valor = valor.replace(/\D/g, "");
    valor = valor.slice(0, 11);

    if (valor.length <= 10) {
      return valor
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return valor
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: name === "telefone" ? mascaraTelefone(value) : value,
    });

    setErros({
      ...erros,
      [name]: "",
    });
  }

  function validarCampos() {
    const novosErros = {};

    if (!formulario.nome.trim()) {
      novosErros.nome = "Informe seu nome.";
    }

    if (!formulario.email.trim()) {
      novosErros.email = "Informe seu e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email)) {
      novosErros.email = "Informe um e-mail válido.";
    }

    const telefoneNumeros = formulario.telefone.replace(/\D/g, "");

    if (!telefoneNumeros) {
      novosErros.telefone = "Informe seu telefone.";
    } else if (telefoneNumeros.length < 10) {
      novosErros.telefone = "Informe um telefone válido.";
    }

    if (!formulario.curso.trim()) {
      novosErros.curso = "Informe o nome do curso.";
    }

    if (!formulario.descricao.trim()) {
      novosErros.descricao = "Informe a descrição do curso.";
    } else if (formulario.descricao.trim().length < 200) {
      novosErros.descricao = "A descrição precisa ter pelo menos 200 caracteres.";
    }

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validarCampos()) {
      return;
    }

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/heneygamer12@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: "Nova solicitação para divulgar curso",
            _captcha: "false",

            Nome: formulario.nome,
            Email: formulario.email,
            Telefone: formulario.telefone,
            Curso: formulario.curso,
            Descricao: formulario.descricao,
          }),
        }
      );

      if (response.ok) {
        alert("Solicitação enviada com sucesso!");

        setFormulario({
          nome: "",
          email: "",
          telefone: "",
          curso: "",
          descricao: "",
        });

        setErros({});
      } else {
        alert("Erro ao enviar solicitação.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar solicitação.");
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <Navbar />

      <section className="pt-36 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-20 h-20 rounded-3xl bg-[#c9a46c]/15 flex items-center justify-center text-[#c9a46c] mx-auto mb-6">
              <BookOpen size={38} />
            </div>

            <h1 className="text-5xl font-light text-[#3d2b1f] mb-5">
              Divulgue seu curso
            </h1>

            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
              Faça parte da Conecta Estética e compartilhe seus conhecimentos
              com milhares de alunos interessados na área da estética e bem-estar.
            </p>
          </div>

          <div className="bg-white border border-[#ece7e2] rounded-[2rem] p-8 md:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
              <div>
                <h2 className="text-3xl font-light text-[#3d2b1f] mb-6">
                  Envie os dados do seu curso
                </h2>

                <p className="text-gray-600 leading-relaxed mb-10">
                  Nossa equipe irá analisar as informações enviadas e entrar em
                  contato para dar continuidade ao processo de publicação do
                  curso na plataforma.
                </p>

                <div className="space-y-5">
                  <div className="bg-[#faf8f6] border border-[#ece7e2] rounded-3xl p-5">
                    <h3 className="text-lg font-medium text-[#3d2b1f] mb-2">
                      Alcance mais alunos
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Divulgue seus cursos para pessoas interessadas em
                      desenvolvimento profissional na estética.
                    </p>
                  </div>

                  <div className="bg-[#faf8f6] border border-[#ece7e2] rounded-3xl p-5">
                    <h3 className="text-lg font-medium text-[#3d2b1f] mb-2">
                      Plataforma profissional
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Tenha seu curso em um ambiente moderno, elegante e preparado
                      para conversão.
                    </p>
                  </div>

                  <div className="bg-[#faf8f6] border border-[#ece7e2] rounded-3xl p-5">
                    <h3 className="text-lg font-medium text-[#3d2b1f] mb-2">
                      Suporte especializado
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Nossa equipe acompanha todo o processo de publicação do seu curso.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Campo
                  label="Nome completo"
                  icon={<User size={20} className="text-[#c9a46c]" />}
                  erro={erros.nome}
                >
                  <input
                    type="text"
                    name="nome"
                    placeholder="Digite seu nome"
                    value={formulario.nome}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none text-[#3d2b1f]"
                  />
                </Campo>

                <Campo
                  label="E-mail"
                  icon={<Mail size={20} className="text-[#c9a46c]" />}
                  erro={erros.email}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    value={formulario.email}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none text-[#3d2b1f]"
                  />
                </Campo>

                <Campo
                  label="Telefone"
                  icon={<Phone size={20} className="text-[#c9a46c]" />}
                  erro={erros.telefone}
                >
                  <input
                    type="tel"
                    name="telefone"
                    placeholder="(11) 99999-9999"
                    value={formulario.telefone}
                    onChange={handleChange}
                    maxLength={15}
                    className="w-full bg-transparent outline-none text-[#3d2b1f]"
                  />
                </Campo>

                <Campo
                  label="Nome do curso"
                  icon={<BookOpen size={20} className="text-[#c9a46c]" />}
                  erro={erros.curso}
                >
                  <input
                    type="text"
                    name="curso"
                    placeholder="Digite o nome do curso"
                    value={formulario.curso}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none text-[#3d2b1f]"
                  />
                </Campo>

                <div>
                  <label className="block text-[#3d2b1f] font-medium mb-3">
                    Descrição do curso
                  </label>

                  <div
                    className={`bg-[#faf8f6] border ${
                      erros.descricao ? "border-red-500" : "border-[#ece7e2]"
                    } rounded-2xl px-5 py-4 flex gap-4 focus-within:border-[#c9a46c] transition`}
                  >
                    <FileText size={20} className="text-[#c9a46c] mt-1" />

                    <textarea
                      name="descricao"
                      rows={6}
                      placeholder="Conte um pouco sobre o curso..."
                      value={formulario.descricao}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none resize-none text-[#3d2b1f]"
                    />
                  </div>

                  {erros.descricao && (
                    <p className="text-red-500 text-sm mt-2">
                      {erros.descricao}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#c9a46c] hover:bg-[#b89258] transition text-white py-4 rounded-full font-medium flex items-center justify-center gap-3 shadow-sm mt-4"
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

function Campo({ label, icon, children, erro }) {
  return (
    <div>
      <label className="block text-[#3d2b1f] font-medium mb-3">{label}</label>

      <div
        className={`bg-[#faf8f6] border ${
          erro ? "border-red-500" : "border-[#ece7e2]"
        } rounded-2xl px-5 py-4 flex items-center gap-4 focus-within:border-[#c9a46c] transition`}
      >
        {icon}
        {children}
      </div>

      {erro && <p className="text-red-500 text-sm mt-2">{erro}</p>}
    </div>
  );
}