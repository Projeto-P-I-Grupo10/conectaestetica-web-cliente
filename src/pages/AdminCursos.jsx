import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import SidebarAdmin from "../assets/components-admin/SidebarAdmin";
import CursoModal from "../assets/components-admin/CursoModal";
import DeleteModal from "../assets/components-admin/DeleteModal";

import { tabelaCursos, deletarCurso } from "../assets/service/cursos";

/**
 * 🔥 NORMALIZER (resolve qualquer formato da API)
 */
function normalizeCurso(curso) {
  return {
    id: curso.id || curso.cursoId,

    nome: curso.nome || curso.cursoNome,
    descricao: curso.descricao || curso.cursoDescricao,

    imagem: curso.imagem || curso.cursoImagem,

    professorNome: curso.professor?.nome || curso.professorNome || "-",

    areaNome: curso.area?.nome || curso.areaNome || "-",
  };
}

export default function AdminCursos() {
  const [cursos, setCursos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);

  const [deleteModalAberto, setDeleteModalAberto] = useState(false);
  const [cursoExcluir, setCursoExcluir] = useState(null);

  useEffect(() => {
    carregarCursos();
  }, []);

  async function carregarCursos() {
    try {
      const data = await tabelaCursos();

      const normalizados = Array.isArray(data) ? data.map(normalizeCurso) : [];

      console.log("Cursos normalizados:", normalizados);

      setCursos(normalizados);
    } catch (erro) {
      console.error("Erro ao buscar cursos:", erro);
      setCursos([]);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <SidebarAdmin />

      <div className="ml-72 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="bg-white border border-[#ece7e2] rounded-[2.5rem] p-8 shadow-sm mb-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-4xl font-light text-[#3d2b1f] mb-3">
                  Gerenciar Cursos
                </h1>
                <p className="text-gray-500 text-lg">
                  Controle todos os cursos da plataforma.
                </p>
              </div>

              <button
                onClick={() => {
                  setCursoSelecionado(null);
                  setModalAberto(true);
                }}
                className="bg-[#c9a46c] hover:bg-[#b89258] transition-all hover:scale-[1.02] active:scale-[0.98] text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm w-fit"
              >
                <Plus size={22} />
                <span className="font-medium">Novo Curso</span>
              </button>
            </div>
          </div>

          {/* TABELA */}
          <div className="bg-white border border-[#ece7e2] rounded-4xl shadow-sm overflow-hidden">
            {/* HEADER */}
            <div className="grid grid-cols-[120px_1.5fr_1fr_180px_150px] gap-4 px-8 py-5 border-b border-[#ece7e2] bg-[#faf8f6]">
              <span className="text-sm text-gray-500 font-medium">Imagem</span>
              <span className="text-sm text-gray-500 font-medium">Curso</span>
              <span className="text-sm text-gray-500 font-medium">
                Professor
              </span>
              <span className="text-sm text-gray-500 font-medium">Área</span>
              <span className="text-sm text-gray-500 font-medium">Ações</span>
            </div>

            {/* LINHAS */}
            <div>
              {cursos.length > 0 ? (
                cursos.map((curso) => (
                  <div
                    key={curso.id}
                    className="grid grid-cols-[120px_1.5fr_1fr_180px_150px] gap-4 items-center px-8 py-6 border-b border-[#f3efea] hover:bg-[#fcfbfa] transition"
                  >
                    {/* IMAGEM */}
                    <img
                      src={`/img/${curso.imagem}`}
                      alt={curso.nome}
                      className="w-24 h-16 rounded-2xl object-cover"
                    />

                    {/* CURSO */}
                    <div>
                      <h3 className="font-medium text-[#3d2b1f]">
                        {curso.nome}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {curso.descricao}
                      </p>
                    </div>

                    {/* PROFESSOR */}
                    <span className="text-gray-600">{curso.professorNome}</span>

                    {/* ÁREA */}
                    <span className="text-gray-600">{curso.areaNome}</span>

                    {/* AÇÕES */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setCursoSelecionado(curso);
                          setModalAberto(true);
                        }}
                        className="w-12 h-12 rounded-2xl bg-[#faf8f6] border border-[#ece7e2] flex items-center justify-center text-[#c9a46c] hover:bg-[#c9a46c] hover:text-white transition-all hover:scale-[1.05]"
                      >
                        <Pencil size={20} />
                      </button>

                      <button
                        onClick={() => {
                          setCursoExcluir(curso);
                          setDeleteModalAberto(true);
                        }}
                        className="w-12 h-12 rounded-2xl bg-[#faf8f6] border border-[#ece7e2] flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all hover:scale-[1.05]"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-gray-500">
                  Nenhum curso encontrado.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <CursoModal
        aberto={modalAberto}
        fecharModal={() => setModalAberto(false)}
        cursoSelecionado={cursoSelecionado}
        onSuccess={carregarCursos}
      />

      {/* DELETE */}
      <DeleteModal
        aberto={deleteModalAberto}
        fecharModal={() => setDeleteModalAberto(false)}
        titulo="Excluir curso"
        descricao={`Tem certeza que deseja excluir o curso "${cursoExcluir?.nome}"?`}
        onConfirmar={async () => {
          try {
            await deletarCurso(cursoExcluir.id);

            setCursos((prev) => prev.filter((c) => c.id !== cursoExcluir.id));

            setCursoExcluir(null);
            setDeleteModalAberto(false);
          } catch (error) {
            console.error(error);
            alert("Erro ao excluir curso.");
          }
        }}
      />
    </main>
  );
}
