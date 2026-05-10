import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { exibirCursoDetalheId } from "../service/cursos";

export default function CursoResumo({ id }) {
  const [curso, setCurso] = useState([]);
  useEffect(() => {
    async function carregarCurso() {
      try {
        const data = await exibirCursoDetalheId(id);
        setCurso(data);
        console.log(data);
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

          <X className="cursor-pointer" size={18} />
        </div>

        <p className="text-lg font-bold">{precoFormatado}</p>

        <p className="text-sm text-gray-500">Parcele em até 10x sem juros</p>

        {/* ESTRELAS */}
        <div className="text-yellow-400">★★★★☆</div>
      </div>
    </div>
  );
}
