import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import SidebarAdmin from "../assets/components-admin/SidebarAdmin";
import TurmaModal from "../assets/components-admin/TurmaModal";
import DeleteModal from "../assets/components-admin/DeleteModal";

import { listarTurmas, deletarTurma } from "../assets/service/turmas";

/**
 * 🔥 NORMALIZER REAL (baseado na sua API)
 */
function normalizeTurma(t) {
  return {
    // ⚠️ não existe id confiável na API, usamos fallback
    id: t.turmaId || t.cursoId,

    nome: t.turmaNome,

    cursoAtivo: t.turmaCursoAtivo,

    dataInicio: t.turmaDataInicio,
    dataEncerramento: t.turmaDataEncerramento,

    preco: t.turmaPreco,
    qtdVagas: t.turmaQtdVagas,

    cursoNome: t.cursoNome,
    professorNome: t.professorNome,
    areaNome: t.areaNome,
  };
}

export default function AdminTurmas() {
  const [turmas, setTurmas] = useState([]);

  const [modalAberto, setModalAberto] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);

  const [deleteModalAberto, setDeleteModalAberto] = useState(false);
  const [turmaExcluir, setTurmaExcluir] = useState(null);

  useEffect(() => {
    carregarTurmas();
  }, []);

  async function carregarTurmas() {
    try {
      const data = await listarTurmas();

      console.log("API TURMAS:", data);

      const lista = Array.isArray(data) ? data : [];

      const normalizados = lista.map(normalizeTurma);

      setTurmas(normalizados);
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
      setTurmas([]);
    }
  }

  function abrirCriar() {
    setTurmaSelecionada(null);
    setModalAberto(true);
  }

  function abrirEditar(turma) {
    setTurmaSelecionada(turma);
    setModalAberto(true);
  }

  function abrirDelete(turma) {
    setTurmaExcluir(turma);
    setDeleteModalAberto(true);
  }

  async function confirmarDelete() {
    await deletarTurma(turmaExcluir.id);

    setTurmas((prev) => prev.filter((t) => t.id !== turmaExcluir.id));

    setTurmaExcluir(null);
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
                  Gerenciar Turmas
                </h1>
                <p className="text-gray-500 text-lg">
                  Controle todas as turmas da plataforma.
                </p>
              </div>

              <button
                onClick={abrirCriar}
                className="bg-[#c9a46c] hover:bg-[#b89258] transition-all hover:scale-[1.02] active:scale-[0.98] text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm w-fit"
              >
                <Plus size={22} />
                <span className="font-medium">Nova Turma</span>
              </button>
            </div>
          </div>

          {/* TABELA */}
          <div className="bg-white border border-[#ece7e2] rounded-[2.5rem] shadow-sm overflow-hidden">
            {/* HEADER DA TABELA */}
            <div className="grid grid-cols-[1fr_120px_160px_160px_120px_120px_150px] gap-4 px-8 py-5 border-b border-[#ece7e2] bg-[#faf8f6]">
              <span className="text-sm text-gray-500 font-medium">Nome</span>
              <span className="text-sm text-gray-500 font-medium">Status</span>
              <span className="text-sm text-gray-500 font-medium">Início</span>
              <span className="text-sm text-gray-500 font-medium">
                Encerramento
              </span>
              <span className="text-sm text-gray-500 font-medium">Preço</span>
              <span className="text-sm text-gray-500 font-medium">Vagas</span>
              <span className="text-sm text-gray-500 font-medium">Ações</span>
            </div>

            {/* LINHAS */}
            <div>
              {turmas.length > 0 ? (
                turmas.map((turma) => (
                  <div
                    key={turma.id}
                    className="grid grid-cols-[1fr_120px_160px_160px_120px_120px_150px] gap-4 items-center px-8 py-6 border-b border-[#f3efea] hover:bg-[#fcfbfa] transition"
                  >
                    {/* NOME */}
                    <div>
                      <p className="font-medium text-[#3d2b1f]">{turma.nome}</p>
                    </div>

                    {/* STATUS */}
                    <span
                      className={`font-medium ${
                        turma.cursoAtivo ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {turma.cursoAtivo ? "Ativo" : "Inativo"}
                    </span>

                    {/* INÍCIO */}
                    <span className="text-gray-600">
                      {turma.dataInicio
                        ? new Date(turma.dataInicio).toLocaleDateString("pt-BR")
                        : "-"}
                    </span>

                    {/* ENCERRAMENTO */}
                    <span className="text-gray-600">
                      {turma.dataEncerramento
                        ? new Date(turma.dataEncerramento).toLocaleDateString(
                            "pt-BR",
                          )
                        : "-"}
                    </span>

                    {/* PREÇO */}
                    <span className="text-gray-600">
                      R$ {Number(turma.preco).toFixed(2)}
                    </span>

                    {/* VAGAS */}
                    <span className="text-gray-600">{turma.qtdVagas}</span>

                    {/* AÇÕES */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => abrirEditar(turma)}
                        className="w-12 h-12 rounded-2xl bg-[#faf8f6] border border-[#ece7e2] flex items-center justify-center text-[#c9a46c] hover:bg-[#c9a46c] hover:text-white transition-all hover:scale-[1.05]"
                      >
                        <Pencil size={20} />
                      </button>

                      <button
                        onClick={() => abrirDelete(turma)}
                        className="w-12 h-12 rounded-2xl bg-[#faf8f6] border border-[#ece7e2] flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all hover:scale-[1.05]"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-gray-500">
                  Nenhuma turma encontrada.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAIS */}
      <TurmaModal
        aberto={modalAberto}
        fecharModal={() => setModalAberto(false)}
        turmaSelecionada={turmaSelecionada}
        onSuccess={carregarTurmas}
      />

      <DeleteModal
        aberto={deleteModalAberto}
        fecharModal={() => setDeleteModalAberto(false)}
        titulo="Excluir turma"
        descricao={`Tem certeza que deseja excluir a turma "${turmaExcluir?.nome}"?`}
        onConfirmar={async () => {
          await confirmarDelete();
          setDeleteModalAberto(false);
        }}
      />
    </main>
  );
}
