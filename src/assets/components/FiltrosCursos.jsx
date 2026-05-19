import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FiltroCursos() {
  const [aberto, setAberto] = useState({
    ordenar: true,
    pele: false,
    corporal: false,
    facial: false,
  });

  const toggle = (secao) => {
    setAberto((prev) => ({
      ...prev,
      [secao]: !prev[secao],
    }));
  };

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
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-light text-[#3d2b1f] mb-3">
          Explorar cursos
        </h2>

        <p className="text-sm text-gray-500 leading-relaxed">
          Encontre cursos ideais para desenvolver
          suas habilidades na área da estética.
        </p>
      </div>

      {/* Conteúdo */}
      <div className="space-y-4">
        
        {/* ORDENAR */}
        <div
          className="
            bg-white
            border
            border-[#ece7e2]
            rounded-2xl
            overflow-hidden
          "
        >
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
              className={`
                transition-transform duration-300
                ${aberto.ordenar ? "rotate-180" : ""}
              `}
            />
          </button>

          {aberto.ordenar && (
            <div className="px-5 pb-5 space-y-3 text-sm">
              <button className="block text-gray-600 hover:text-[#c9a46c] transition">
                Mais populares
              </button>

              <button className="block text-gray-600 hover:text-[#c9a46c] transition">
                Mais recentes
              </button>

              <button className="block text-gray-600 hover:text-[#c9a46c] transition">
                Menor preço
              </button>
            </div>
          )}
        </div>

        {/* PELE */}
        <div
          className="
            bg-white
            border
            border-[#ece7e2]
            rounded-2xl
            overflow-hidden
          "
        >
          <button
            onClick={() => toggle("pele")}
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
            Pele

            <ChevronDown
              size={18}
              className={`
                transition-transform duration-300
                ${aberto.pele ? "rotate-180" : ""}
              `}
            />
          </button>

          {aberto.pele && (
            <div className="px-5 pb-5 space-y-3 text-sm">
              <button className="block text-gray-600 hover:text-[#c9a46c] transition">
                Acne
              </button>

              <button className="block text-gray-600 hover:text-[#c9a46c] transition">
                Limpeza de pele
              </button>

              <button className="block text-gray-600 hover:text-[#c9a46c] transition">
                Tratamentos
              </button>
            </div>
          )}
        </div>

        {/* CORPORAL */}
        <div
          className="
            bg-white
            border
            border-[#ece7e2]
            rounded-2xl
            overflow-hidden
          "
        >
          <button
            onClick={() => toggle("corporal")}
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
            Corporal

            <ChevronDown
              size={18}
              className={`
                transition-transform duration-300
                ${aberto.corporal ? "rotate-180" : ""}
              `}
            />
          </button>

          {aberto.corporal && (
            <div className="px-5 pb-5 space-y-3 text-sm">
              <button className="block text-gray-600 hover:text-[#c9a46c] transition">
                Drenagem
              </button>

              <button className="block text-gray-600 hover:text-[#c9a46c] transition">
                Massagem
              </button>
            </div>
          )}
        </div>

        {/* FACIAL */}
        <div
          className="
            bg-white
            border
            border-[#ece7e2]
            rounded-2xl
            overflow-hidden
          "
        >
          <button
            onClick={() => toggle("facial")}
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
            Facial

            <ChevronDown
              size={18}
              className={`
                transition-transform duration-300
                ${aberto.facial ? "rotate-180" : ""}
              `}
            />
          </button>

          {aberto.facial && (
            <div className="px-5 pb-5 space-y-3 text-sm">
              <button className="block text-gray-600 hover:text-[#c9a46c] transition">
                Botox
              </button>

              <button className="block text-gray-600 hover:text-[#c9a46c] transition">
                Skin care
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}