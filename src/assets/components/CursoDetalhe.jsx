import { Star, BookOpen, User, CalendarDays, Users } from "lucide-react";
import CursoCard from "./CursoCard";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { exibirCursoDetalheId } from "../service/cursos";

export default function CursoDetalhe() {
  const { id } = useParams();

  const [curso, setCurso] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarCurso() {
      try {
        const data = await exibirCursoDetalheId(id);
        setCurso(data);
      } catch (erro) {
        console.error("Erro ao buscar cursos", erro);
      }
    }

    carregarCurso();
  }, []);

  const precoFormatado = Number(curso?.turmaPreco).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <main className="min-h-screen bg-[#f5f5f5] py-36 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div
          className="
            bg-white
            border
            border-[#ece7e2]
            rounded-b-4xl
            overflow-hidden
            shadow-sm
            mb-6
          "
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* IMAGEM */}
            <div className="h-full">
              <img
                src={curso?.cursoImagem}
                alt="curso"
                className="
                  w-full
                  h-96
                  object-cover
                "
              />
            </div>

            {/* INFO */}
            <div className="p-10 flex flex-col justify-center">
              <div
                className="
                  bg-[#c9a46c]/15
                  text-[#c9a46c]
                  w-fit
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-medium
                  mb-6
                "
              >
                Curso Profissional
              </div>

              <h1 className="text-5xl font-light text-[#3d2b1f] leading-tight mb-5">
                {curso?.cursoNome}
              </h1>

              <p className="text-gray-600 leading-relaxed mb-8">
                {curso?.cursoDescricao}
              </p>

              {/* Avaliação */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex text-[#c9a46c]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#c9a46c" />
                  ))}
                </div>

                <span className="text-gray-500">5.0 (124 avaliações)</span>
              </div>

              {/* Preço */}
              <div className="mb-8">
                <h2 className="text-4xl font-semibold text-[#3d2b1f]">
                  {precoFormatado}
                </h2>

                <p className="text-gray-500 mt-2">
                  Parcele em até 10x sem juros
                </p>
              </div>

              {/* Botão */}
              <button
                onClick={() => navigate(`/pagamentos/${curso?.cursoId}`)}
                className="
                  w-full
                  md:w-fit
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
                Começar agora
              </button>
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
                rounded-b-4xl
                p-8
              "
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-[#c9a46c]/15
                    flex
                    items-center
                    justify-center
                    text-[#c9a46c]
                  "
                >
                  <BookOpen size={24} />
                </div>

                <h2 className="text-2xl font-medium text-[#3d2b1f]">
                  Sobre o curso
                </h2>
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
                rounded-b-4xl
                p-8
              "
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-[#c9a46c]/15
                    flex
                    items-center
                    justify-center
                    text-[#c9a46c]
                  "
                >
                  <User size={24} />
                </div>

                <h2 className="text-2xl font-medium text-[#3d2b1f]">
                  Professor responsável
                </h2>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div
                  className="
                    w-24
                    h-24
                    rounded-full
                    bg-[#e7d8c9]
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
                rounded-b-4xl
                p-8
              "
            >
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-[#c9a46c]/15
                    flex
                    items-center
                    justify-center
                    text-[#c9a46c]
                  "
                >
                  <CalendarDays size={24} />
                </div>

                <h2 className="text-2xl font-medium text-[#3d2b1f]">
                  Informações da turma
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#faf8f6] rounded-2xl p-5 border border-[#ece7e2]">
                  <p className="text-sm text-gray-500 mb-2">Status da turma</p>

                  <p className="text-lg font-medium text-[#3d2b1f]">
                    {curso?.turmaCursoAtivo ? "Ativa" : "Encerrada"}
                  </p>
                </div>

                <div className="bg-[#faf8f6] rounded-2xl p-5 border border-[#ece7e2]">
                  <p className="text-sm text-gray-500 mb-2">Nome da turma</p>

                  <p className="text-lg font-medium text-[#3d2b1f]">
                    {curso?.turmaNome}
                  </p>
                </div>

                <div className="bg-[#faf8f6] rounded-2xl p-5 border border-[#ece7e2]">
                  <p className="text-sm text-gray-500 mb-2">Data de início</p>

                  <p className="text-lg font-medium text-[#3d2b1f]">
                    {curso?.turmaDataInicio}
                  </p>
                </div>

                <div className="bg-[#faf8f6] rounded-2xl p-5 border border-[#ece7e2]">
                  <p className="text-sm text-gray-500 mb-2">
                    Data de encerramento
                  </p>

                  <p className="text-lg font-medium text-[#3d2b1f]">
                    {curso?.turmaDataEncerramento}
                  </p>
                </div>

                <div className="bg-[#faf8f6] rounded-2xl p-5 border border-[#ece7e2]">
                  <p className="text-sm text-gray-500 mb-2">
                    Quantidade de vagas
                  </p>

                  <div className="flex items-center gap-2 text-[#3d2b1f]">
                    <Users size={18} />

                    <p className="text-lg font-medium">
                      {curso?.turmaQtdVagas}
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
                  imagem="/botox.jpg"
                  titulo="Botox avançado"
                  preco={200}
                  avaliacao={4.8}
                />

                <CursoCard
                  imagem="/skincare.jpg"
                  titulo="Skin care"
                  preco={400}
                  avaliacao={3.8}
                />

                <CursoCard
                  imagem="/massoterapia.jpg"
                  titulo="Massoterapia"
                  preco={300}
                  avaliacao={4.8}
                />
              </div>
            </section>
          </div>

          {/* CARD LATERAL */}
          <aside
            className="
              bg-white
              border
              border-[#ece7e2]
              rounded-b-4xl
              p-8
              h-fit
              sticky
              top-32
              shadow-sm
            "
          >
            <h3 className="text-2xl font-medium text-[#3d2b1f] mb-6">
              Resumo da compra
            </h3>

            <div className="space-y-5">
              <div>
                <p className="text-gray-500 text-sm mb-2">Curso</p>

                <p className="text-lg font-medium text-[#3d2b1f]">
                  {curso?.cursoNome}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm mb-2">Valor</p>

                <p className="text-3xl font-semibold text-[#3d2b1f]">
                  {precoFormatado}
                </p>
              </div>

              <div className="flex text-[#c9a46c]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#c9a46c" />
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
                  mt-4
                "
              >
                Comprar curso
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
