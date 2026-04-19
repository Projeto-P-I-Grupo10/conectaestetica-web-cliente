import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FiltroCursos() {
  const [aberto, setAberto] = useState({
    ordenar: false,
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
    <div className="w-64 bg-gray-200 p-4 h-full overflow-y-auto">

      <h2 className="text-lg font-semibold mb-6">
        Explorar Cursos
      </h2>

      {/* ORDENAR */}
      <div className="border-t border-black py-3">
        <button
          onClick={() => toggle("ordenar")}
          className="flex justify-between w-full text-sm"
        >
          Ordenar por
          <ChevronDown size={16} />
        </button>

        {aberto.ordenar && (
          <div className="mt-2 text-xs space-y-1 text-gray-600">
            <p>Mais populares</p>
            <p>Mais recentes</p>
            <p>Menor preço</p>
          </div>
        )}
      </div>

      {/* PELE */}
      <div className="border-t border-black py-3">
        <button
          onClick={() => toggle("pele")}
          className="flex justify-between w-full text-sm"
        >
          Pele
          <ChevronDown size={16} />
        </button>

        {aberto.pele && (
          <div className="mt-2 text-xs space-y-1 text-gray-600">
            <p>Acne</p>
            <p>Limpeza de pele</p>
            <p>Tratamentos</p>
          </div>
        )}
      </div>

      {/* CORPORAL */}
      <div className="border-t border-black py-3">
        <button
          onClick={() => toggle("corporal")}
          className="flex justify-between w-full text-sm"
        >
          Corporal
          <ChevronDown size={16} />
        </button>

        {aberto.corporal && (
          <div className="mt-2 text-xs space-y-1 text-gray-600">
            <p>Drenagem</p>
            <p>Massagem</p>
          </div>
        )}
      </div>

      {/* FACIAL */}
      <div className="border-t border-black py-3 border-b">
        <button
          onClick={() => toggle("facial")}
          className="flex justify-between w-full text-sm"
        >
          Facial
          <ChevronDown size={16} />
        </button>

        {aberto.facial && (
          <div className="mt-2 text-xs space-y-1 text-gray-600">
            <p>Botox</p>
            <p>Skin care</p>
          </div>
        )}
      </div>

    </div>
  );
}