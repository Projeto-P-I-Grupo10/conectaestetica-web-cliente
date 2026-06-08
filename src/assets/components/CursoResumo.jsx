import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { exibirCursoDetalheId } from "../service/cursos";

export default function CursoResumo({ id, avaliacaoCurso }) {
  const [curso, setCurso] = useState(null);

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
  }, [id]);

  const precoFormatado = Number(curso?.turmaPreco || 0).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );

  return (
    <div className="bg-white rounded-xl shadow-md flex w-180 h-42 overflow-hidden">
      {/* IMAGEM */}
      <img
        src={`/img/${curso?.cursoImagem}`}
        alt="curso"
        className="w-40 object-cover"
      />

      {/* INFO */}
      <div className="p-4 flex flex-col justify-between w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold">{curso?.cursoNome}</h3>

        </div>

        <p className="text-lg font-bold">{precoFormatado}</p>

        <p className="text-sm text-gray-500">
          Parcele em até 10x sem juros
        </p>

        {/* ESTRELAS */}
        <div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((estrela) => (
              <Star
                key={estrela}
                size={18}
                className={
                  estrela <= Math.round(avaliacaoCurso?.media || 0)
                    ? "fill-[#c9a46c] text-[#c9a46c]"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-1">
            {avaliacaoCurso?.media || 0} •{" "}
            {avaliacaoCurso?.quantidade || 0} avaliações
          </p>
        </div>
      </div>
    </div>
  );
}