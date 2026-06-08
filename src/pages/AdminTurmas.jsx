import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import SidebarAdmin from "../assets/components-admin/SidebarAdmin";
import TurmaModal from "../assets/components-admin/TurmaModal";
import DeleteModal from "../assets/components-admin/DeleteModal";

import { listarTurmas, deletarTurma } from "../assets/service/turmas";
import { tabelaCursos } from "../assets/service/cursos";
import { listarEnderecosCurso } from "../assets/service/enderecoCurso";

/* =========================
   NORMALIZER
========================= */

function normalizeTurma(t) {
  return {
    id: t.turmaId,
    turmaId: t.turmaId,
    cursoId: t.cursoId,
    enderecoId: t.enderecoId,

    nome: t.turmaNome,
    cursoAtivo: t.turmaCursoAtivo,

    dataInicio: t.turmaDataInicio,
    dataEncerramento: t.turmaDataEncerramento,

    preco: t.turmaPreco,
    qtdVagas: t.turmaQtdVagas,

    cursoNome: t.cursoNome,
    areaNome: t.areaNome,

    enderecoRua: t.enderecoRua,
    enderecoNumero: t.enderecoNumero,
    enderecoCidade: t.enderecoCidade,
  };
}

/* =========================
   FORMATADORES
========================= */

function formatarData(data) {
  if (!data) return "-";
  return new Date(data).toLocaleDateString("pt-BR");
}

function formatarPreco(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/* =========================
   COMPONENTE
========================= */

export default function AdminTurmas() {
  const [turmas, setTurmas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [enderecos, setEnderecos] = useState([]);

  const [loading, setLoading] = useState(true);

  const [modalAberto, setModalAberto] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);

  const [deleteModalAberto, setDeleteModalAberto] = useState(false);
  const [turmaExcluir, setTurmaExcluir] = useState(null);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      setLoading(true);

      const [turmasData, cursosData, enderecosData] = await Promise.all([
        listarTurmas(),
        tabelaCursos(),
        listarEnderecosCurso(),
      ]);

      setTurmas((turmasData || []).map(normalizeTurma));
      setCursos(cursosData || []);
      setEnderecos(enderecosData || []);
    } finally {
      setLoading(false);
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
    if (!turmaExcluir?.id) return;

    await deletarTurma(turmaExcluir.id);
    await carregarDados();

    setTurmaExcluir(null);
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <SidebarAdmin />

      <div className="ml-72 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* HEADER (ESTILO MODAL) */}
          <div className="bg-white border border-[#ece7e2] rounded-[2.5rem] p-8 shadow-sm mb-10">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-light text-[#3d2b1f]">
                  Gerenciar Turmas
                </h1>
                <p className="text-gray-500 mt-2">
                  Controle todas as turmas da plataforma
                </p>
              </div>

              <button
                onClick={abrirCriar}
                className="
                  bg-[#c9a46c]
                  hover:bg-[#b89258]
                  transition-all
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  text-white
                  px-6
                  py-4
                  rounded-2xl
                  flex
                  items-center
                  gap-3
                  shadow-sm
                "
              >
                <Plus size={20} />
                Nova Turma
              </button>
            </div>
          </div>

          {/* TABELA (ESTILO MODAL) */}
          <div className="bg-white border border-[#ece7e2] rounded-[2.5rem] shadow-sm overflow-hidden">
            {/* HEADER */}
            <div className="grid grid-cols-[2fr_1.2fr_1.5fr_120px_120px_120px_150px] px-8 py-5 bg-[#faf8f6] border-b border-[#ece7e2]">
              <span className="text-sm text-gray-500">Turma</span>
              <span className="text-sm text-gray-500">Curso</span>
              <span className="text-sm text-gray-500">Endereço</span>
              <span className="text-sm text-gray-500">Status</span>
              <span className="text-sm text-gray-500">Preço</span>
              <span className="text-sm text-gray-500">Vagas</span>
              <span className="text-sm text-gray-500">Ações</span>
            </div>

            {/* BODY */}
            {loading ? (
              <div className="p-10 text-center text-gray-500">
                Carregando turmas...
              </div>
            ) : turmas.length > 0 ? (
              turmas.map((turma) => (
                <div
                  key={turma.id}
                  className="
                    grid
                    grid-cols-[2fr_1.2fr_1.5fr_120px_120px_120px_150px]
                    px-8
                    py-6
                    border-b
                    border-[#f3efea]
                    hover:bg-[#fcfbfa]
                    transition
                  "
                >
                  {/* TURMA */}
                  <div>
                    <p className="font-medium text-[#3d2b1f]">{turma.nome}</p>
                    <p className="text-sm text-gray-500">
                      {formatarData(turma.dataInicio)} •{" "}
                      {formatarData(turma.dataEncerramento)}
                    </p>
                  </div>

                  {/* CURSO */}
                  <div>
                    <p className="font-medium">{turma.cursoNome}</p>
                    <p className="text-xs text-gray-500">{turma.areaNome}</p>
                  </div>

                  {/* ENDEREÇO */}
                  <div>
                    <p className="text-sm text-gray-700">
                      {turma.enderecoRua}, {turma.enderecoNumero}
                    </p>
                    <p className="text-xs text-gray-500">
                      {turma.enderecoCidade}
                    </p>
                  </div>

                  {/* STATUS */}
                  <span
                    className={
                      turma.cursoAtivo ? "text-green-600" : "text-red-500"
                    }
                  >
                    {turma.cursoAtivo ? "Ativo" : "Inativo"}
                  </span>

                  {/* PREÇO */}
                  <span className="text-gray-700">
                    {formatarPreco(turma.preco)}
                  </span>

                  {/* VAGAS */}
                  <span className="text-gray-700">{turma.qtdVagas}</span>

                  {/* AÇÕES */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => abrirEditar(turma)}
                      className="
                        w-10 h-10
                        rounded-2xl
                        bg-[#faf8f6]
                        border border-[#ece7e2]
                        flex items-center justify-center
                        text-[#c9a46c]
                        hover:bg-[#c9a46c]
                        hover:text-white
                        transition
                      "
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => abrirDelete(turma)}
                      className="
                        w-10 h-10
                        rounded-2xl
                        bg-[#faf8f6]
                        border border-[#ece7e2]
                        flex items-center justify-center
                        text-red-500
                        hover:bg-red-500
                        hover:text-white
                        transition
                      "
                    >
                      <Trash2 size={18} />
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

      {/* MODAL */}
      <TurmaModal
        aberto={modalAberto}
        fecharModal={() => {
          setModalAberto(false);
          setTurmaSelecionada(null);
        }}
        turmaSelecionada={turmaSelecionada}
        cursos={cursos}
        enderecos={enderecos}
        onSuccess={carregarDados}
      />

      {/* DELETE */}
      <DeleteModal
        aberto={deleteModalAberto}
        fecharModal={() => setDeleteModalAberto(false)}
        titulo="Excluir turma"
        descricao={`Tem certeza que deseja excluir "${turmaExcluir?.nome}"?`}
        onConfirmar={confirmarDelete}
      />
    </main>
  );
}
