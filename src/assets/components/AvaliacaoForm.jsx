import { useState } from "react";
import { Star } from "lucide-react";

export default function AvaliacaoForm() {
  const [nota, setNota] = useState(0);
  const [hover, setHover] = useState(0);
  const [mostrarTodos, setMostrarTodos] = useState(false);

  const comentarios = [
    {
      id: 1,
      nome: "Mariana Costa",
      nota: 5,
      comentario:
        "Curso extremamente completo. A didática da professora é excelente e consegui aplicar as técnicas já nas primeiras semanas.",
    },

    {
      id: 2,
      nome: "Juliana Mendes",
      nota: 5,
      comentario:
        "Achei o conteúdo muito atualizado e bem explicado. Valeu cada centavo investido!",
    },

    {
      id: 3,
      nome: "Fernanda Lima",
      nota: 4,
      comentario:
        "Gostei bastante do curso, principalmente da parte prática. Super recomendo para quem quer começar na estética.",
    },

    {
      id: 4,
      nome: "Camila Rocha",
      nota: 5,
      comentario:
        "Uma experiência incrível! O suporte e os materiais complementares fizeram toda diferença no aprendizado.",
    },
  ];

  const comentariosVisiveis = mostrarTodos
    ? comentarios
    : comentarios.slice(0, 2);

  return (
    <div className="p-8">
      {/* TÍTULO */}
      <div className="mb-8">
        <h2 className="text-3xl font-light text-[#3d2b1f] mb-3">
          Avaliações dos alunos
        </h2>

        <p className="text-gray-500">
          Compartilhe sua experiência sobre este curso.
        </p>
      </div>

      {/* CARD AVALIAÇÃO */}
      <div
        className="
          bg-[#faf8f6]
          border
          border-[#ece7e2]
          rounded-4xl
          p-8
          mb-10
        "
      >
        {/* ESTRELAS */}
        <div className="mb-8">
          <p className="text-[#3d2b1f] text-lg mb-4 font-medium">
            Sua avaliação
          </p>

          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((estrela) => (
              <button
                key={estrela}
                type="button"
                onClick={() => setNota(estrela)}
                onMouseEnter={() => setHover(estrela)}
                onMouseLeave={() => setHover(0)}
                className="
                  transition
                  hover:scale-110
                "
              >
                <Star
                  size={34}
                  className={`
                    transition
                    ${
                      estrela <= (hover || nota)
                        ? "fill-[#c9a46c] text-[#c9a46c]"
                        : "text-[#d6d3d1]"
                    }
                  `}
                />
              </button>
            ))}
          </div>
        </div>

        {/* COMENTÁRIO */}
        <div className="mb-8">
          <p className="text-[#3d2b1f] text-lg mb-4 font-medium">Comentário</p>

          <textarea
            placeholder="Conte como foi sua experiência com o curso..."
            className="
              w-full
              min-h-44
              bg-white
              border
              border-[#ece7e2]
              rounded-3xl
              p-6
              resize-none
              outline-none
              text-gray-700
              placeholder:text-gray-400
              focus:border-[#c9a46c]
              transition
            "
          />
        </div>

        {/* BOTÃO */}
        <button
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
          Enviar avaliação
        </button>
      </div>

      {/* COMENTÁRIOS */}
      <div className="space-y-6">
        {comentariosVisiveis.map((item) => (
          <div
            key={item.id}
            className="
              bg-white
              border
              border-[#ece7e2]
              rounded-4xl
              p-6
            "
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-[#3d2b1f]">
                  {item.nome}
                </h3>

                <p className="text-sm text-gray-500">Aluna verificada</p>
              </div>

              <div className="flex gap-1">
                {[...Array(item.nota)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-[#c9a46c] text-[#c9a46c]"
                  />
                ))}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{item.comentario}</p>
          </div>
        ))}
      </div>

      {/* VER MAIS */}
      {!mostrarTodos && comentarios.length > 2 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setMostrarTodos(true)}
            className="
              border
              border-[#ece7e2]
              px-8
              py-3
              rounded-full
              text-[#3d2b1f]
              hover:bg-[#faf8f6]
              transition
              font-medium
            "
          >
            Ver mais avaliações
          </button>
        </div>
      )}
    </div>
  );
}
