import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

import SidebarAdmin from "../assets/components-admin/SidebarAdmin";
import DeleteModal from "../assets/components-admin/DeleteModal";
import { listarUsuarios } from "../assets/service/usuarios";

function iniciais(nome = "") {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join("");
}

export default function AdminAlunos() {
  const [alunos, setAlunos] = useState([]);

  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const [deleteModalAberto, setDeleteModalAberto] = useState(false);
  const [alunoExcluir, setAlunoExcluir] = useState(null);

  useEffect(() => {
    async function carregarAlunos() {
      try {
        const response = await listarUsuarios(pagina, 20);

        const usuariosNaoAdmin = response.content.filter(
          (usuario) => usuario.tipoUsuario?.toUpperCase() !== "ADMIN",
        );

        setAlunos(usuariosNaoAdmin);
        setTotalPaginas(response.totalPages);
      } catch (error) {
        console.error("Erro ao carregar alunos:", error);
      }
    }

    carregarAlunos();
  }, [pagina]);

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
                  Gerenciar Alunos
                </h1>

                <p className="text-gray-500 text-lg">
                  Consulte e gerencie os alunos cadastrados na plataforma.
                </p>
              </div>
            </div>
          </div>

          {/* TABELA */}
          <div className="bg-white border border-[#ece7e2] rounded-4xl shadow-sm overflow-hidden">
            {/* HEADER */}
            <div className="grid grid-cols-[80px_1.5fr_1.5fr_180px_150px] gap-4 px-8 py-5 border-b border-[#ece7e2] bg-[#faf8f6]">
              <span className="text-sm text-gray-500 font-medium">Perfil</span>

              <span className="text-sm text-gray-500 font-medium">Nome</span>

              <span className="text-sm text-gray-500 font-medium">E-mail</span>

              <span className="text-sm text-gray-500 font-medium">
                Tipo de usuário
              </span>

              <span className="text-sm text-gray-500 font-medium">Ações</span>
            </div>

            {/* LINHAS */}
            <div>
              {alunos.length > 0 ? (
                alunos.map((aluno) => (
                  <div
                    key={aluno.id}
                    className="grid grid-cols-[80px_1.5fr_1.5fr_180px_150px] gap-4 items-center px-8 py-6 border-b border-[#f3efea] hover:bg-[#fcfbfa] transition"
                  >
                    {/* AVATAR */}
                    <div className="w-14 h-14 rounded-2xl bg-[#faf8f6] border border-[#ece7e2] flex items-center justify-center text-[#c9a46c] font-medium">
                      {iniciais(aluno.nome)}
                    </div>

                    {/* NOME */}
                    <div>
                      <h3 className="font-medium text-[#3d2b1f]">
                        {aluno.nome}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">Aluno</p>
                    </div>

                    {/* EMAIL */}
                    <span className="text-gray-600">{aluno.email}</span>

                    {/* TIPO */}
                    <span className="w-fit px-4 py-1.5 rounded-full text-sm bg-[#faf8f6] text-[#3d2b1f]">
                      {aluno.tipoUsuario}
                    </span>

                    {/* AÇÕES */}
                    <div className="flex items-center gap-3">
                      <button className="w-12 h-12 rounded-2xl bg-[#faf8f6] border border-[#ece7e2] flex items-center justify-center text-[#c9a46c] hover:bg-[#c9a46c] hover:text-white transition-all hover:scale-[1.05]">
                        <Pencil size={20} />
                      </button>

                      <button
                        onClick={() => {
                          setAlunoExcluir(aluno);
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
                  Nenhum aluno encontrado.
                </div>
              )}
            </div>

            {/* PAGINAÇÃO */}
            {totalPaginas > 0 && (
              <div className="flex items-center justify-between px-8 py-5">
                <button
                  onClick={() => setPagina(pagina - 1)}
                  disabled={pagina === 0}
                  className="px-5 py-2.5 rounded-xl bg-[#faf8f6] border border-[#ece7e2] text-[#3d2b1f] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f3efea] transition"
                >
                  Anterior
                </button>

                <span className="text-sm text-gray-500">
                  Página {pagina + 1} de {totalPaginas}
                </span>

                <button
                  onClick={() => setPagina(pagina + 1)}
                  disabled={pagina === totalPaginas - 1}
                  className="px-5 py-2.5 rounded-xl bg-[#c9a46c] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#b89258] transition"
                >
                  Próxima
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL EXCLUSÃO */}
      <DeleteModal
        aberto={deleteModalAberto}
        fecharModal={() => {
          setDeleteModalAberto(false);
          setAlunoExcluir(null);
        }}
        titulo="Excluir aluno"
        descricao={`Tem certeza que deseja excluir o aluno "${alunoExcluir?.nome}"?`}
        onConfirmar={() => {
          setAlunos((prev) =>
            prev.filter((aluno) => aluno.id !== alunoExcluir.id),
          );

          setAlunoExcluir(null);
          setDeleteModalAberto(false);

          Swal.fire({
            icon: "success",
            title: "Aluno excluído",
            text: "O aluno foi removido com sucesso.",
            timer: 1800,
            showConfirmButton: false,
          });
        }}
      />
    </main>
  );
}
