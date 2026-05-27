import { Star, BookOpen, User, CalendarDays, Users } from "lucide-react";

import CursoCard from "./CursoCard";
import AvaliacaoForm from "./AvaliacaoForm";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { exibirCursoDetalheId } from "../service/cursos";

export default function CursoDetalhe() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [curso, setCurso] = useState(null);

  useEffect(() => {
    async function carregarCurso() {
      try {
        const data = await exibirCursoDetalheId(id);

        if (!data || Object.keys(data).length === 0) {
          setCurso({
            cursoId: 1,
            cursoNome: "Skin Care Profissional Avançado",
            cursoDescricao:
              "Aprenda técnicas modernas de limpeza de pele, hidratação profunda, protocolos de rejuvenescimento e tratamento facial profissional com foco em resultados reais e experiência premium para clientes.",

            cursoImagem:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop",

            professorNome: "Dra. Amanda Oliveira",

            professorRedesocial: "amanda.estetica",

            professorDescricao:
              "Especialista em estética facial há mais de 10 anos, com formação internacional e milhares de alunos certificados em todo o Brasil.",

            turmaCursoAtivo: true,

            turmaNome: "Turma Premium Maio 2026",

            turmaDataInicio: "15/05/2026",

            turmaDataEncerramento: "30/08/2026",

            turmaQtdVagas: 32,

            turmaPreco: 497.9,
          });
        } else {
          setCurso(data);
        }
      } catch (erro) {
        console.error("Erro ao buscar cursos", erro);

        setCurso({
          cursoId: 1,
          cursoNome: "Skin Care Profissional Avançado",

          cursoDescricao:
            "Aprenda técnicas modernas de limpeza de pele, hidratação profunda, protocolos de rejuvenescimento e tratamento facial profissional com foco em resultados reais e experiência premium para clientes.",

          cursoImagem:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop",

          professorNome: "Dra. Amanda Oliveira",

          professorRedesocial: "amanda.estetica",

          professorDescricao:
            "Especialista em estética facial há mais de 10 anos, com formação internacional e milhares de alunos certificados em todo o Brasil.",

          turmaCursoAtivo: true,

          turmaNome: "Turma Premium Maio 2026",

          turmaDataInicio: "15/05/2026",

          turmaDataEncerramento: "30/08/2026",

          turmaQtdVagas: 32,

          turmaPreco: 497.9,
        });
      }
    }

    carregarCurso();
  }, [id]);

  const precoFormatado = Number(curso?.turmaPreco || 0).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    },
  );

  return (
    <main className="min-h-screen bg-[#f5f5f5] py-36 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HERO */}
        <div
          className="
            bg-white
            border
            border-[#ece7e2]
            rounded-[2.5rem]
            overflow-hidden
            shadow-sm
            mb-10
          "
        >
          <div className="flex flex-col lg:flex-row">
            {/* IMAGEM */}
            <div
              className="
                relative
                w-full
                lg:w-[45%]
                h-96
                lg:h-auto
              "
            >
              <img
                src={curso?.cursoImagem}
                alt="curso"
                className="
                  w-full
                  max-h-135
                  object-cover
                "
              />
            </div>

            {/* INFO */}
            <div
              className="
                flex-1
                p-8
                lg:p-10
                flex
                flex-col
              "
            >
              <h1
                className="
                  text-3xl
                  lg:text-4xl
                  font-light
                  text-[#3d2b1f]
                  leading-tight
                  mb-6
                "
              >
                {curso?.cursoNome}
              </h1>

              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {curso?.cursoDescricao}
              </p>

              {/* AVALIAÇÃO */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex text-[#c9a46c]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="#c9a46c" />
                  ))}
                </div>

                <span className="text-gray-500">5.0 • 124 avaliações</span>
              </div>

              {/* PREÇO */}
              <div className="mb-8">
                <p className="text-gray-500 mb-2">Investimento</p>

                <h2 className="text-4xl font-semibold text-[#3d2b1f]">
                  {precoFormatado}
                </h2>

                <p className="text-gray-500 mt-2">ou 10x sem juros</p>
              </div>

              {/* BOTÕES */}
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={() => navigate(`/pagamentos/${curso?.cursoId}`)}
                  className="
                    bg-[#c9a46c]
                    hover:bg-[#b89258]
                    transition
                    text-white
                    px-10
                    py-4
                    rounded-full
                    font-medium
                    shadow-sm
                  "
                >
                  Comprar curso
                </button>

                <button
                  className="
                    border
                    border-[#ece7e2]
                    px-10
                    py-4
                    rounded-full
                    text-[#3d2b1f]
                    hover:bg-[#faf8f6]
                    transition
                  "
                >
                  Ver detalhes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CONTEÚDO */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
          {/* ESQUERDA */}
          <div className="space-y-10">
            {/* SOBRE */}
            <section
              className="
                bg-white
                border
                border-[#ece7e2]
                rounded-4xl
                p-8
              "
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-[#c9a46c]/15
                    flex
                    items-center
                    justify-center
                    text-[#c9a46c]
                  "
                >
                  <BookOpen size={26} />
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-[#3d2b1f]">
                    Sobre o curso
                  </h2>

                  <p className="text-gray-500">Tudo que você irá aprender</p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg">
                {curso?.cursoDescricao}
              </p>
            </section>

            {/* PROFESSOR */}
            <section
              className="
                bg-white
                border
                border-[#ece7e2]
                rounded-4xl
                p-8
              "
            >
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-[#c9a46c]/15
                    flex
                    items-center
                    justify-center
                    text-[#c9a46c]
                  "
                >
                  <User size={26} />
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-[#3d2b1f]">
                    Professor responsável
                  </h2>

                  <p className="text-gray-500">Conheça quem irá ensinar você</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop"
                  alt="professor"
                  className="
                    w-28
                    h-28
                    rounded-full
                    object-cover
                  "
                />

                <div>
                  <h3 className="text-2xl font-medium text-[#3d2b1f] mb-2">
                    {curso?.professorNome}
                  </h3>

                  <p className="text-[#c9a46c] mb-4">
                    @{curso?.professorRedesocial}
                  </p>

                  <p className="text-gray-600 leading-relaxed">
                    {curso?.professorDescricao}
                  </p>
                </div>
              </div>
            </section>

            {/* TURMA */}
            <section
              className="
                bg-white
                border
                border-[#ece7e2]
                rounded-4xl
                p-8
              "
            >
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-[#c9a46c]/15
                    flex
                    items-center
                    justify-center
                    text-[#c9a46c]
                  "
                >
                  <CalendarDays size={26} />
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-[#3d2b1f]">
                    Informações da turma
                  </h2>

                  <p className="text-gray-500">Dados importantes da formação</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard
                  titulo="Status da turma"
                  valor={curso?.turmaCursoAtivo ? "Turma ativa" : "Encerrada"}
                />

                <InfoCard titulo="Nome da turma" valor={curso?.turmaNome} />

                <InfoCard
                  titulo="Data de início"
                  valor={curso?.turmaDataInicio}
                />

                <InfoCard
                  titulo="Data de encerramento"
                  valor={curso?.turmaDataEncerramento}
                />

                <div
                  className="
                    bg-[#faf8f6]
                    rounded-2xl
                    p-5
                    border
                    border-[#ece7e2]
                  "
                >
                  <p className="text-sm text-gray-500 mb-2">
                    Quantidade de vagas
                  </p>

                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-[#c9a46c]" />

                    <p className="text-lg font-medium text-[#3d2b1f]">
                      {curso?.turmaQtdVagas} vagas
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* RELACIONADOS */}
            <section>
              <div className="mb-6">
                <h2 className="text-3xl font-light text-[#3d2b1f] mb-3">
                  Cursos relacionados
                </h2>

                <p className="text-gray-500">
                  Continue evoluindo com cursos similares.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CursoCard
                  imagem="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop"
                  titulo="Botox avançado"
                  preco={200}
                  avaliacao={4.8}
                />

                <CursoCard
                  imagem="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop"
                  titulo="Skin care"
                  preco={400}
                  avaliacao={3.8}
                />

                <CursoCard
                  imagem="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop"
                  titulo="Massoterapia"
                  preco={300}
                  avaliacao={4.8}
                />
              </div>
            </section>

            {/* NOVA AVALIAÇÃO */}
            <section
              className="
                bg-white
                border
                border-[#ece7e2]
                rounded-4xl
                p-2
              "
            >
              <AvaliacaoForm />
            </section>
          </div>

          {/* LATERAL */}
          <aside
            className="
              bg-white
              border
              border-[#ece7e2]
              rounded-4xl
              p-8
              h-fit
              sticky
              top-32
              shadow-sm
            "
          >
            <h3 className="text-2xl font-medium text-[#3d2b1f] mb-8">
              Resumo da compra
            </h3>

            <div className="space-y-6">
              <div
                className="
                  bg-[#faf8f6]
                  border
                  border-[#ece7e2]
                  rounded-2xl
                  p-5
                "
              >
                <p className="text-gray-500 text-sm mb-2">Curso selecionado</p>

                <p className="text-lg font-medium text-[#3d2b1f]">
                  {curso?.cursoNome}
                </p>
              </div>

              <div
                className="
                  bg-[#faf8f6]
                  border
                  border-[#ece7e2]
                  rounded-2xl
                  p-5
                "
              >
                <p className="text-gray-500 text-sm mb-2">Valor total</p>

                <p className="text-4xl font-semibold text-[#3d2b1f]">
                  {precoFormatado}
                </p>
              </div>

              <div className="flex justify-center text-[#c9a46c]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#c9a46c" />
                ))}
              </div>

              <button
                onClick={() => navigate(`/pagamentos/${curso?.cursoId}`)}
                className="
                  w-full
                  bg-[#c9a46c]
                  hover:bg-[#b89258]
                  transition
                  text-white
                  py-4
                  rounded-full
                  font-medium
                  shadow-sm
                "
              >
                Comprar curso
              </button>

              <p className="text-center text-sm text-gray-500">
                Pagamento 100% seguro
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function InfoCard({ titulo, valor }) {
  return (
    <div
      className="
        bg-[#faf8f6]
        rounded-2xl
        p-5
        border
        border-[#ece7e2]
      "
    >
      <p className="text-sm text-gray-500 mb-2">{titulo}</p>

      <p className="text-lg font-medium text-[#3d2b1f]">{valor}</p>
    </div>
  );
}
