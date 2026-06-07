import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Swal from "sweetalert2";
import {
  criarAvaliacaoCurso,
  listarAvaliacoesCurso,
  atualizarAvaliacaoCurso,
  deletarAvaliacaoCurso,
} from "../service/avaliacaoCurso";

export default function AvaliacaoForm({ cursoId }) {
  const [nota, setNota] = useState(0);
  const [hover, setHover] = useState(0)
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [avaliacaoEditando, setAvaliacaoEditando] = useState(null);

  console.log("testeasfewfwrwefefe" + cursoId)
  useEffect(() => {
    async function carregarComentarios() {
      try {
        const data = await listarAvaliacoesCurso(cursoId);
        setComentarios(data);
        console.log(data)
      } catch (erro) {
        console.error("Erro ao buscar comentários", erro);
      }
    }

    if (cursoId) {
      carregarComentarios();
    }
  }, [cursoId]);

  function prepararEdicao(item) {
    setAvaliacaoEditando(item);
    setNota(Number(item.avaliacao));
    setComentario(item.comentario || "");
  }

  async function removerAvaliacao(id) {
    const confirmar = confirm("Deseja remover esta avaliação?");

    if (!confirmar) return;

    try {
      await deletarAvaliacaoCurso(id);
      await Swal.fire({
        title: "Avaliação removida com sucesso!",
        text: "Avaliação removida com sucesso!s",
        icon: "success",
      });
      window.location.reload();
    } catch (erro) {
      console.error("Erro ao remover avaliação", erro);
      alert("Erro ao remover avaliação.");
    }
  }

  async function enviarAvaliacao() {
    if (nota === 0) {
      Swal.fire({
        title: "Selecione uma nota!",
        text: "Avalie o curso!",
        icon: "warning",
      });
      return;
    }

    if (!comentario.trim()) {
      Swal.fire({
        title: "Escreva um comentário!",
        text: "Escreva algo",
        icon: "warning",
      });
      return;
    }

    if (!cursoId) {
      alert("Curso não identificado.");
      return;
    }

    try {
      setEnviando(true);

      const dados = {
        cursoId: Number(cursoId),
        usuarioId: Number(sessionStorage.getItem("idUsuario")),
        avaliacao: Number(nota),
        comentario: comentario.trim(),
      };

      if (avaliacaoEditando) {
        await atualizarAvaliacaoCurso(avaliacaoEditando.id, dados);
        await Swal.fire({
          title: "Avaliação atualizada com sucesso!",
          text: "Avaliação foi atualizada!",
          icon: "success",
        });
      } else {
        await criarAvaliacaoCurso(dados);
       await Swal.fire({
          title: "Avaliação adicionada com sucesso!",
          text: "Avaliação foi adicionada!",
          icon: "success",
        });
      }

      window.location.reload();


    } catch (erro) {
      console.error("Erro ao enviar avaliação", erro);
      console.log("Resposta do back:", erro.response?.data);
      console.log("Status:", erro.response?.status);
      alert(erro.response?.data?.message || erro.response?.data || "Erro ao enviar avaliação.");
    } finally {
      setEnviando(false);
    }
  }

  const comentariosVisiveis = mostrarTodos
    ? comentarios
    : comentarios.slice(0, 2);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-light text-[#3d2b1f] mb-3">
          Avaliações dos alunos
        </h2>

        <p className="text-gray-500">
          Compartilhe sua experiência sobre este curso.
        </p>
      </div>

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
                className="transition hover:scale-110"
              >
                <Star
                  size={34}
                  className={`
                    transition
                    ${estrela <= (hover || nota)
                      ? "fill-[#c9a46c] text-[#c9a46c]"
                      : "text-[#d6d3d1]"
                    }
                  `}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <p className="text-[#3d2b1f] text-lg mb-4 font-medium">Comentário</p>

          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Conte como foi sua experiência com o curso..."
            maxLength={500}
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

        <button
          type="button"
          onClick={enviarAvaliacao}
          disabled={enviando}
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
            disabled:opacity-60
          "
        >
          {enviando ? "Enviando..." : "Enviar avaliação"}
        </button>
      </div>

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
                  {item.usuario.nome || item.nomeUsuario || "Usuário"}
                </h3>

                <p className="text-sm text-gray-500">Aluno verificado</p>
              </div>

              <div className="flex gap-1">
                {[...Array(Math.round(Number(item.nota || item.avaliacao || 0)))].map(
                  (_, index) => (
                    <Star
                      key={index}
                      size={18}
                      className="fill-[#c9a46c] text-[#c9a46c]"
                    />
                  )
                )}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{item.comentario}</p>
            {Number(sessionStorage.getItem("idUsuario")) === item.usuario?.id && (
              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => prepararEdicao(item)}
                  className="text-sm text-[#c9a46c] font-medium"
                >
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!item.id) {
                      alert("Essa avaliação não possui ID retornado pelo back.");
                      return;
                    }

                    removerAvaliacao(item.id);
                  }}
                  className="text-sm text-red-500 font-medium"
                >
                  Remover
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

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