import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

import SidebarAdmin from "../assets/components-admin/SidebarAdmin";
import DeleteModal from "../assets/components-admin/DeleteModal";
import UsuariosAdminModal from "../assets/components-admin/usuariosAdminModal";

/* DADOS ESTÁTICOS (trocar pela chamada ao back-end depois) */
const ADMINS_MOCK = [
  {
    id: 1,
    nome: "Ana Souza",
    email: "ana.souza@email.com",
    role: "ADMIN",
    ativo: true,
  },
  {
    id: 2,
    nome: "Carlos Almeida",
    email: "carlos.almeida@email.com",
    role: "ADMIN",
    ativo: true,
  },
  {
    id: 3,
    nome: "Beatriz Lima",
    email: "beatriz.lima@email.com",
    role: "ADMIN",
    ativo: false,
  },
  {
    id: 4,
    nome: "Rafael Costa",
    email: "rafael.costa@email.com",
    role: "ADMIN",
    ativo: true,
  },
];

function iniciais(nome = "") {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join("");
}

export default function AdminAdministradores() {
  const [admins, setAdmins] = useState(ADMINS_MOCK);

  const [modalAberto, setModalAberto] = useState(false);
  const [adminSelecionado, setAdminSelecionado] = useState(null);

  const [deleteModalAberto, setDeleteModalAberto] = useState(false);
  const [adminExcluir, setAdminExcluir] = useState(null);

  // Estático por enquanto: atualiza apenas a lista local
  function salvarAdmin(dados) {
    // a senha nunca fica na lista; ela só seria enviada ao back-end
    // eslint-disable-next-line no-unused-vars
    const { senha, ...semSenha } = dados;

    if (adminSelecionado) {
      setAdmins((prev) =>
        prev.map((a) =>
          a.id === adminSelecionado.id ? { ...a, ...semSenha } : a,
        ),
      );
    } else {
      setAdmins((prev) => [...prev, { id: Date.now(), ...semSenha }]);
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
                  Gerenciar Administradores
                </h1>

                <p className="text-gray-500 text-lg">
                  Controle os usuários com acesso administrativo à plataforma.
                </p>
              </div>

              <button
                onClick={() => {
                  setAdminSelecionado(null);
                  setModalAberto(true);
                }}
                className="bg-[#c9a46c] hover:bg-[#b89258] transition-all hover:scale-[1.02] active:scale-[0.98] text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm w-fit"
              >
                <Plus size={22} />
                <span className="font-medium">Novo Administrador</span>
              </button>
            </div>
          </div>

          {/* TABELA */}
          <div className="bg-white border border-[#ece7e2] rounded-4xl shadow-sm overflow-hidden">
            {/* HEADER */}
            <div className="grid grid-cols-[80px_1.5fr_1.5fr_140px_150px] gap-4 px-8 py-5 border-b border-[#ece7e2] bg-[#faf8f6]">
              <span className="text-sm text-gray-500 font-medium">Perfil</span>

              <span className="text-sm text-gray-500 font-medium">Nome</span>

              <span className="text-sm text-gray-500 font-medium">E-mail</span>

              <span className="text-sm text-gray-500 font-medium">Status</span>

              <span className="text-sm text-gray-500 font-medium">Ações</span>
            </div>

            {/* LINHAS */}
            <div>
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <div
                    key={admin.id}
                    className="grid grid-cols-[80px_1.5fr_1.5fr_140px_150px] gap-4 items-center px-8 py-6 border-b border-[#f3efea] hover:bg-[#fcfbfa] transition"
                  >
                    {/* AVATAR */}
                    <div className="w-14 h-14 rounded-2xl bg-[#faf8f6] border border-[#ece7e2] flex items-center justify-center text-[#c9a46c] font-medium">
                      {iniciais(admin.nome)}
                    </div>

                    {/* NOME */}
                    <div>
                      <h3 className="font-medium text-[#3d2b1f]">
                        {admin.nome}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">{admin.role}</p>
                    </div>

                    {/* EMAIL */}
                    <span className="text-gray-600">{admin.email}</span>

                    {/* STATUS */}
                    <span
                      className={`w-fit px-4 py-1.5 rounded-full text-sm ${
                        admin.ativo
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-500"
                      }`}
                    >
                      {admin.ativo ? "Ativo" : "Inativo"}
                    </span>

                    {/* AÇÕES */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setAdminSelecionado(admin);
                          setModalAberto(true);
                        }}
                        className="w-12 h-12 rounded-2xl bg-[#faf8f6] border border-[#ece7e2] flex items-center justify-center text-[#c9a46c] hover:bg-[#c9a46c] hover:text-white transition-all hover:scale-[1.05]"
                      >
                        <Pencil size={20} />
                      </button>

                      <button
                        onClick={() => {
                          setAdminExcluir(admin);
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
                  Nenhum administrador encontrado.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL ADMIN (dados + permissões) */}
      <UsuariosAdminModal
        aberto={modalAberto}
        fecharModal={() => setModalAberto(false)}
        adminSelecionado={adminSelecionado}
        onSalvar={salvarAdmin}
      />

      {/* MODAL EXCLUSÃO */}
      <DeleteModal
        aberto={deleteModalAberto}
        fecharModal={() => setDeleteModalAberto(false)}
        titulo="Excluir administrador"
        descricao={`Tem certeza que deseja excluir o administrador "${adminExcluir?.nome}"?`}
        onConfirmar={() => {
          // Estático por enquanto: remove apenas da lista local
          setAdmins((prev) => prev.filter((a) => a.id !== adminExcluir.id));

          setAdminExcluir(null);
          setDeleteModalAberto(false);

          Swal.fire({
            icon: "success",
            title: "Administrador excluído",
            text: "O administrador foi removido com sucesso.",
            timer: 1800,
            showConfirmButton: false,
          });
        }}
      />
    </main>
  );
}