import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import FiltroCursos from "../assets/components/FiltrosCursos";
import CursoCard from "../assets/components/CursoCard";

import { listarCurso } from "../assets/service/cursos";

export default function CursosPage() {
  const [cursos, setCursos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function carregarCursos() {
      try {
        const data = await listarCurso();

        console.log("Cursos recebidos:", data);

        setCursos(Array.isArray(data) ? data : []);
      } catch (erro) {
        console.error("Erro ao buscar cursos", erro);
        setCursos([]);
      }
    }

    carregarCursos();
  }, []);

  const cursosFiltrados = useMemo(() => {
    return cursos.filter((curso) =>
      curso?.cursoNome?.toLowerCase().includes(pesquisa.toLowerCase())
    );
  }, [cursos, pesquisa]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5]">
      <Navbar />

      <main className="flex-1 flex justify-center py-10 mt-32">
        <div className="w-full max-w-7xl px-6 flex flex-col lg:flex-row gap-10">
          <FiltroCursos />

          <div className="flex-1">
            <div className="mb-10">
              <h1 className="text-4xl font-light text-[#3d2b1f] mb-3">
                Explore cursos
              </h1>

              <p className="text-gray-600 mb-8">
                Descubra cursos de estética desenvolvidos pelos melhores
                profissionais da área.
              </p>

              <div
                className="
                  bg-white
                  border
                  border-[#ece7e2]
                  rounded-full
                  px-5
                  py-4
                  flex
                  items-center
                  gap-4
                  shadow-sm
                  focus-within:border-[#c9a46c]
                  transition
                "
              >
                <Search size={20} className="text-[#c9a46c]" />

                <input
                  type="text"
                  placeholder="Pesquisar cursos..."
                  value={pesquisa}
                  onChange={(e) => setPesquisa(e.target.value)}
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-[#3d2b1f]
                    placeholder:text-gray-400
                  "
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {cursosFiltrados.length > 0 ? (
                cursosFiltrados.map((curso) => (
                  <CursoCard
                    key={curso?.cursoId}
                    titulo={curso?.cursoNome}
                    preco={curso?.turmaPreco}
                    avaliacao={4.5}
                    imagem={`/img/${curso?.cursoImagem}`}
                    onClick={() =>
                      navigate(`/curso/${curso?.cursoId}`)
                    }
                  />
                ))
              ) : (
                <div
                  className="
                    col-span-full
                    bg-white
                    border
                    border-[#ece7e2]
                    rounded-3xl
                    p-10
                    text-center
                  "
                >
                  <h2 className="text-2xl text-[#3d2b1f] mb-2">
                    Nenhum curso encontrado
                  </h2>

                  <p className="text-gray-500">
                    Não existem cursos cadastrados ou sua pesquisa não encontrou resultados.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}