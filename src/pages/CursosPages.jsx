import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";

import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import FiltroCursos from "../assets/components/FiltrosCursos";
import CursoCard from "../assets/components/CursoCard";

import { listarAvaliacoesCurso } from "../assets/service/avaliacaoCurso";
import { listarCurso } from "../assets/service/cursos";
import api from "../assets/service/api"; // ajusta o caminho conforme o projeto

export default function CursosPage() {
  const [cursos, setCursos] = useState([]);
  const [avaliacoesPorCurso, setAvaliacoesPorCurso] = useState({});
  const [pesquisa, setPesquisa] = useState("");
  const [cursosProximos, setCursosProximos] = useState(null);
  const [loadingProximos, setLoadingProximos] = useState(false);
  const [erroProximos, setErroProximos] = useState(null);

  const navigate = useNavigate();

  async function carregarAvaliacoesDosCursos(listaCursos) {
    const avaliacoesMap = {};

    for (const curso of listaCursos) {
      try {
        const avaliacoes = await listarAvaliacoesCurso(curso.cursoId);

        const quantidade = avaliacoes.length;

        const media =
          quantidade > 0
            ? avaliacoes.reduce(
              (soma, item) => soma + Number(item.avaliacao),
              0
            ) / quantidade
            : 0;

        avaliacoesMap[curso.cursoId] = {
          media: media.toFixed(1),
          quantidade,
        };
      } catch (erro) {
        console.error(`Erro ao buscar avaliações do curso ${curso.cursoId}`, erro);

        avaliacoesMap[curso.cursoId] = {
          media: 0,
          quantidade: 0,
        };
      }
    }

    setAvaliacoesPorCurso(avaliacoesMap);
  }

  useEffect(() => {
    async function carregarCursos() {
      try {
        const data = await listarCurso();
        if (Array.isArray(data) && data.length > 0) {
          setCursos(data);
          console.log(data);
          carregarAvaliacoesDosCursos(data);
        } else {
          setCursos([
            { cursoId: 1, cursoNome: "Skin Care Profissional", turmaPreco: 299.9, cursoImagem: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop" },
            { cursoId: 2, cursoNome: "Botox Avançado", turmaPreco: 499.9, cursoImagem: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop" },
            { cursoId: 3, cursoNome: "Massoterapia Relaxante", turmaPreco: 199.9, cursoImagem: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop" },
            { cursoId: 4, cursoNome: "Harmonização Facial", turmaPreco: 799.9, cursoImagem: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop" },
            { cursoId: 5, cursoNome: "Limpeza de Pele", turmaPreco: 149.9, cursoImagem: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop" },
            { cursoId: 6, cursoNome: "Estética Corporal", turmaPreco: 349.9, cursoImagem: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200&auto=format&fit=crop" },
          ]);
        }
      } catch (erro) {
        console.error("Erro ao buscar cursos", erro);
        setCursos([
          { cursoId: 1, cursoNome: "Skin Care Profissional", turmaPreco: 299.9, cursoImagem: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop" },
          { cursoId: 2, cursoNome: "Botox Avançado", turmaPreco: 499.9, cursoImagem: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop" },
          { cursoId: 3, cursoNome: "Massoterapia Relaxante", turmaPreco: 199.9, cursoImagem: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop" },
        ]);
      }
    }
    carregarCursos();
  }, []);

  async function buscarCursosProximos() {
    setErroProximos(null);
    setLoadingProximos(true);
    setCursosProximos(null);

    try {
      const idUsuario = Number(sessionStorage.getItem("idUsuario"));

      // busca endereços do usuário na plataforma
      const resEnderecos = await api.get(`/historicos-endereco/usuario/${idUsuario}`);
      const enderecos = resEnderecos.data;
      console.log("ENDEREÇOS RETORNADOS:", enderecos);

      // pega o endereço atual
      const enderecoAtual = enderecos.find((e) => e.enderecoAtual === true);

      if (!enderecoAtual) {
        setErroProximos("Você não possui um endereço atual cadastrado.");
        return;
      }

      const enderecoFormatado = `${enderecoAtual.rua}, ${enderecoAtual.numero}, ${enderecoAtual.cidade}`;

      // chama o microserviço de geolocalização
      const resProximos = await fetch(
        `http://localhost:8082/cursos-proximos?endereco=${encodeURIComponent(enderecoFormatado)}`
      );
      const data = await resProximos.json();

      if (data.erro) {
        setErroProximos(data.erro);
        return;
      }

      setCursosProximos(data);

    } catch (erro) {
      console.error("Erro ao buscar cursos próximos", erro);
      setErroProximos("Erro ao buscar cursos próximos. Tente novamente.");
    } finally {
      setLoadingProximos(false);
    }
  }

  function limparCursosProximos() {
    setCursosProximos(null);
    setErroProximos(null);
  }

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
                Descubra cursos de estética desenvolvidos pelos melhores profissionais da área.
              </p>

              {/* BARRA PESQUISA + BOTÃO */}
              <div className="flex gap-3 items-center mb-4">
                <div className="flex-1 bg-white border border-[#ece7e2] rounded-full px-5 py-4 flex items-center gap-4 shadow-sm focus-within:border-[#c9a46c] transition">
                  <Search size={20} className="text-[#c9a46c]" />
                  <input
                    type="text"
                    placeholder="Pesquisar cursos..."
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                    className="w-full bg-transparent outline-none text-[#3d2b1f] placeholder:text-gray-400"
                  />
                </div>

                <button
                  onClick={cursosProximos ? limparCursosProximos : buscarCursosProximos}
                  disabled={loadingProximos}
                  className="flex items-center gap-2 bg-[#c9a46c] hover:bg-[#b8935b] text-white rounded-full px-5 py-4 shadow-sm transition whitespace-nowrap disabled:opacity-50"
                >
                  <MapPin size={18} />
                  {loadingProximos
                    ? "Buscando..."
                    : cursosProximos
                      ? "Ver todos"
                      : "Cursos próximos"}
                </button>
              </div>

              {/* ERRO */}
              {erroProximos && (
                <p className="text-red-500 text-sm mt-2">{erroProximos}</p>
              )}
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {cursosProximos ? (
                // mostra cursos próximos
                cursosProximos.length > 0 ? (
                  cursosProximos.map((curso, index) => (
                    <CursoCard
                      key={`proximo-${index}`}
                      titulo={curso.nome}
                      preco={null}
                      avaliacao={4.5}
                      imagem={null}
                      distancia={curso.distancia}
                      onClick={() => navigate(`/curso/${curso.cursoId}`)}
                    />
                  ))
                ) : (
                  <div className="col-span-full bg-white border border-[#ece7e2] rounded-3xl p-10 text-center">
                    <h2 className="text-2xl text-[#3d2b1f] mb-2">Nenhum curso próximo encontrado</h2>
                    <p className="text-gray-500">Não encontramos cursos perto do seu endereço.</p>
                  </div>
                )
              ) : (
                // mostra todos os cursos normalmente
                Array.isArray(cursosFiltrados) && cursosFiltrados.length > 0 ? (
                  cursosFiltrados.map((curso) => (
                    <CursoCard
                      key={curso?.cursoId}
                      titulo={curso?.cursoNome}
                      preco={curso?.turmaPreco}
                      avaliacao={avaliacoesPorCurso[curso?.cursoId]?.media || 0}
                      imagem={curso?.cursoImagem}
                      onClick={() => navigate(`/curso/${curso?.cursoId}`)}
                    />
                  ))
                ) : (
                  <div className="col-span-full bg-white border border-[#ece7e2] rounded-3xl p-10 text-center">
                    <h2 className="text-2xl text-[#3d2b1f] mb-2">Nenhum curso encontrado</h2>
                    <p className="text-gray-500">Tente pesquisar outro nome de curso.</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}