import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import { listarAreas } from "../service/area";

export default function FiltroCursos({
  areaSelecionada,
  setAreaSelecionada,
  ordenacao,
  setOrdenacao,
}) {
  const [areas, setAreas] = useState([]);

  const [aberto, setAberto] = useState({
    ordenar: true,
    areas: true,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    carregarAreas();
  }, []);

  async function carregarAreas() {
    try {
      const data = await listarAreas();

      const lista = Array.isArray(data)
        ? data
        : data?.areas || data?.areaCursos || [];

      setAreas(lista);
    } catch (error) {
      console.error("Erro ao carregar áreas:", error);
      setAreas([]);
    }
  }

  function toggle(secao) {
    setAberto((prev) => ({
      ...prev,
      [secao]: !prev[secao],
    }));
  }

  return (
    <aside
      className="
        w-full
        md:w-80
        h-fit
        bg-[#faf8f6]
        border
        border-[#ece7e2]
        rounded-4xl
        p-7
        shadow-sm
      "
    >
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-3xl font-light text-[#3d2b1f] mb-3">
          Explorar cursos
        </h2>

        <p className="text-sm text-gray-500 leading-relaxed">
          Encontre cursos ideais para desenvolver suas habilidades na área da
          estética.
        </p>
      </div>

      <div className="space-y-4">
        {/* ORDENAÇÃO */}
        <div className="bg-white border border-[#ece7e2] rounded-2xl overflow-hidden">
          <button
            onClick={() => toggle("ordenar")}
            className="
              w-full
              flex
              items-center
              justify-between
              px-5
              py-4
              text-[#3d2b1f]
              font-medium
            "
          >
            Ordenar por
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${
                aberto.ordenar ? "rotate-180" : ""
              }`}
            />
          </button>

          {aberto.ordenar && (
            <div className="px-5 pb-5 space-y-3">
              <button
                onClick={() => setOrdenacao("")}
                className={`block text-left w-full ${
                  ordenacao === ""
                    ? "text-[#c9a46c] font-medium"
                    : "text-gray-600"
                }`}
              >
                Todos
              </button>

              <button
                onClick={() => setOrdenacao("avaliacao")}
                className={`block text-left w-full ${
                  ordenacao === "avaliacao"
                    ? "text-[#c9a46c] font-medium"
                    : "text-gray-600"
                }`}
              >
                Melhor avaliação
              </button>

              <button
                onClick={() => setOrdenacao("recentes")}
                className={`block text-left w-full ${
                  ordenacao === "recentes"
                    ? "text-[#c9a46c] font-medium"
                    : "text-gray-600"
                }`}
              >
                Mais recentes
              </button>

              <button
                onClick={() => setOrdenacao("preco")}
                className={`block text-left w-full ${
                  ordenacao === "preco"
                    ? "text-[#c9a46c] font-medium"
                    : "text-gray-600"
                }`}
              >
                Menor preço
              </button>
            </div>
          )}
        </div>

        {/* ÁREAS */}
        <div className="bg-white border border-[#ece7e2] rounded-2xl overflow-hidden">
          <button
            onClick={() => toggle("areas")}
            className="
              w-full
              flex
              items-center
              justify-between
              px-5
              py-4
              text-[#3d2b1f]
              font-medium
            "
          >
            Áreas
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${
                aberto.areas ? "rotate-180" : ""
              }`}
            />
          </button>

          {aberto.areas && (
            <div className="px-5 pb-5 space-y-3">
              <button
                onClick={() => setAreaSelecionada("")}
                className={`block text-left w-full ${
                  areaSelecionada === ""
                    ? "text-[#c9a46c] font-medium"
                    : "text-gray-600"
                }`}
              >
                Todas as áreas
              </button>

              {areas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setAreaSelecionada(area.nome)}
                  className={`block text-left w-full ${
                    areaSelecionada === area.nome
                      ? "text-[#c9a46c] font-medium"
                      : "text-gray-600"
                  }`}
                >
                  {area.nome}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
