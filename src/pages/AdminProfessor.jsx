import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import SidebarAdmin from "../assets/components-admin/SidebarAdmin";
import ProfessorModal from "../assets/components-admin/ProfessorModal";
import DeleteModal from "../assets/components-admin/DeleteModal";

import {
  listarProfessores,
  deletarProfessor,
} from "../assets/service/professor";

function normalizeProfessor(prof) {
  return {
    id: prof.id || prof.professorId,
    nome: prof.nome || prof.professorNome,
    descricao: prof.descricao || prof.professorDescricao,
    email: prof.email || prof.professorEmail,
    foto: prof.foto || prof.professorFoto,
    redesocial: prof.redesocial || prof.professorRedeSocial,
  };
}

export default function AdminProfessores() {
  const [professores, setProfessores] = useState([]);

  const [modalAberto, setModalAberto] = useState(false);
  const [professorSelecionado, setProfessorSelecionado] = useState(null);

  const [deleteModalAberto, setDeleteModalAberto] = useState(false);
  const [professorExcluir, setProfessorExcluir] = useState(null);

  useEffect(() => {
    carregarProfessores();
  }, []);

  async function carregarProfessores() {
    try {
      const data = await listarProfessores();

      const lista = Array.isArray(data) ? data : data?.professores || [];

      const normalizados = lista.map(normalizeProfessor);

      setProfessores(normalizados);
    } catch (erro) {
      console.error("Erro ao buscar professores:", erro);
      setProfessores([]);
    }
  }

  function abrirCriar() {
    setProfessorSelecionado(null);
    setModalAberto(true);
  }

  function abrirEditar(prof) {
    setProfessorSelecionado(prof);
    setModalAberto(true);
  }

  function abrirDelete(prof) {
    setProfessorExcluir(prof);
    setDeleteModalAberto(true);
  }

  async function confirmarDelete() {
    await deletarProfessor(professorExcluir.id);

    setProfessores((prev) => prev.filter((p) => p.id !== professorExcluir.id));

    setProfessorExcluir(null);
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
                  Gerenciar Professores
                </h1>
                <p className="text-gray-500 text-lg">
                  Controle todos os professores da plataforma.
                </p>
              </div>

              <button
                onClick={abrirCriar}
                className="bg-[#c9a46c] hover:bg-[#b89258] transition-all hover:scale-[1.02] active:scale-[0.98] text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm w-fit"
              >
                <Plus size={22} />
                <span className="font-medium">Novo Professor</span>
              </button>
            </div>
          </div>

          {/* TABELA */}
          <div className="bg-white border border-[#ece7e2] rounded-4xl shadow-sm overflow-hidden">
            {/* HEADER */}
            <div className="grid grid-cols-[120px_1fr_1fr_1fr_1fr_150px] gap-4 px-8 py-5 border-b border-[#ece7e2] bg-[#faf8f6]">
              <span className="text-sm text-gray-500 font-medium">Foto</span>
              <span className="text-sm text-gray-500 font-medium">Nome</span>
              <span className="text-sm text-gray-500 font-medium">Email</span>
              <span className="text-sm text-gray-500 font-medium">
                Descrição
              </span>
              <span className="text-sm text-gray-500 font-medium">
                Rede Social
              </span>
              <span className="text-sm text-gray-500 font-medium">Ações</span>
            </div>

            {/* LINHAS */}
            <div>
              {professores.length > 0 ? (
                professores.map((prof) => (
                  <div
                    key={prof.id}
                    className="grid grid-cols-[120px_1fr_1fr_1fr_1fr_150px] gap-4 items-center px-8 py-6 border-b border-[#f3efea] hover:bg-[#fcfbfa] transition"
                  >
                    <img
                      src={prof.foto}
                      alt={prof.nome}
                      className="w-16 h-16 rounded-2xl object-cover"
                    />

                    <span className="font-medium text-[#3d2b1f]">
                      {prof.nome}
                    </span>

                    <span className="text-gray-600">{prof.email}</span>

                    <span className="text-gray-600 truncate max-w-52">
                      {prof.descricao}
                    </span>

                    <span className="text-gray-600">{prof.redesocial}</span>

                    {/* AÇÕES */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => abrirEditar(prof)}
                        className="w-12 h-12 rounded-2xl bg-[#faf8f6] border border-[#ece7e2] flex items-center justify-center text-[#c9a46c] hover:bg-[#c9a46c] hover:text-white transition-all hover:scale-[1.05]"
                      >
                        <Pencil size={20} />
                      </button>

                      <button
                        onClick={() => abrirDelete(prof)}
                        className="w-12 h-12 rounded-2xl bg-[#faf8f6] border border-[#ece7e2] flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all hover:scale-[1.05]"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-gray-500">
                  Nenhum professor encontrado.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL CRIAR/EDITAR */}
      <ProfessorModal
        aberto={modalAberto}
        fecharModal={() => setModalAberto(false)}
        professorSelecionado={professorSelecionado}
        onSuccess={carregarProfessores}
      />

      {/* MODAL DELETE GENÉRICO */}
      <DeleteModal
        aberto={deleteModalAberto}
        fecharModal={() => setDeleteModalAberto(false)}
        titulo="Excluir professor"
        descricao={`Tem certeza que deseja excluir o professor "${professorExcluir?.nome}"?`}
        onConfirmar={async () => {
          await confirmarDelete();
          setDeleteModalAberto(false);
        }}
      />
    </main>
  );
}
