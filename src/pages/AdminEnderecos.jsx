import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

import SidebarAdmin from "../assets/components-admin/SidebarAdmin";
import EnderecoModal from "../assets/components-admin/EnderecoModal";
import DeleteModal from "../assets/components-admin/DeleteModal";

import {
  listarEnderecosCurso,
  cadastrarEnderecoCurso,
  editarEnderecoCurso,
  deletarEnderecoCurso,
} from "../assets/service/enderecoCurso";

function normalizeEndereco(endereco) {
  return {
    id: endereco.id || endereco.enderecoId,

    rua: endereco.rua || "",
    numero: endereco.numero || "",
    bairro: endereco.bairro || "",
    cidade: endereco.cidade || "",
    estado: endereco.estado || "",
    cep: endereco.cep || "",
    complemento: endereco.complemento || "",
  };
}

export default function AdminEnderecos() {
  const [enderecos, setEnderecos] = useState([]);

  const [modalAberto, setModalAberto] = useState(false);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);

  const [deleteModalAberto, setDeleteModalAberto] = useState(false);
  const [enderecoExcluir, setEnderecoExcluir] = useState(null);

  useEffect(() => {
    carregarEnderecos();
  }, []);

  async function carregarEnderecos() {
    try {
      const lista = await listarEnderecosCurso();

      setEnderecos((lista || []).map(normalizeEndereco));
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Erro ao carregar",
        text:
          error?.response?.data?.message ||
          "Não foi possível carregar os endereços.",
        confirmButtonColor: "#c9a46c",
      });

      setEnderecos([]);
    }
  }

  function abrirCriar() {
    setEnderecoSelecionado(null);
    setModalAberto(true);
  }

  function abrirEditar(endereco) {
    setEnderecoSelecionado(endereco);
    setModalAberto(true);
  }

  function abrirDelete(endereco) {
    setEnderecoExcluir(endereco);
    setDeleteModalAberto(true);
  }

  async function confirmarDelete() {
    try {
      await deletarEnderecoCurso(enderecoExcluir.id);

      await carregarEnderecos();

      setDeleteModalAberto(false);
      setEnderecoExcluir(null);

      Swal.fire({
        icon: "success",
        title: "Endereço excluído",
        text: "O endereço foi removido com sucesso.",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Erro ao excluir",
        text:
          error?.response?.data?.message ||
          "Não foi possível excluir o endereço.",
        confirmButtonColor: "#c9a46c",
      });
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
                  Gerenciar Endereços
                </h1>

                <p className="text-gray-500 text-lg">
                  Controle todos os endereços da plataforma.
                </p>
              </div>

              <button
                onClick={abrirCriar}
                className="bg-[#c9a46c] hover:bg-[#b89258] transition-all hover:scale-[1.02] active:scale-[0.98] text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm w-fit"
              >
                <Plus size={22} />
                <span className="font-medium">Novo Endereço</span>
              </button>
            </div>
          </div>

          {/* TABELA */}
          <div className="bg-white border border-[#ece7e2] rounded-[2.5rem] shadow-sm overflow-hidden">
            <div className="grid grid-cols-[2fr_120px_1fr_1fr_120px_140px_150px] gap-4 px-8 py-5 border-b border-[#ece7e2] bg-[#faf8f6]">
              <span className="text-sm text-gray-500 font-medium">Rua</span>
              <span className="text-sm text-gray-500 font-medium">Número</span>
              <span className="text-sm text-gray-500 font-medium">Bairro</span>
              <span className="text-sm text-gray-500 font-medium">Cidade</span>
              <span className="text-sm text-gray-500 font-medium">Estado</span>
              <span className="text-sm text-gray-500 font-medium">CEP</span>
              <span className="text-sm text-gray-500 font-medium">Ações</span>
            </div>

            <div>
              {enderecos.length > 0 ? (
                enderecos.map((endereco) => (
                  <div
                    key={endereco.id}
                    className="grid grid-cols-[2fr_120px_1fr_1fr_120px_140px_150px] gap-4 items-center px-8 py-6 border-b border-[#f3efea] hover:bg-[#fcfbfa] transition"
                  >
                    <div>
                      <h3 className="font-medium text-[#3d2b1f]">
                        {endereco.rua}
                      </h3>

                      {endereco.complemento && (
                        <p className="text-sm text-gray-500 mt-1">
                          {endereco.complemento}
                        </p>
                      )}
                    </div>

                    <span className="text-gray-600">{endereco.numero}</span>

                    <span className="text-gray-600">{endereco.bairro}</span>

                    <span className="text-gray-600">{endereco.cidade}</span>

                    <span className="text-gray-600">{endereco.estado}</span>

                    <span className="text-gray-600">{endereco.cep}</span>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => abrirEditar(endereco)}
                        className="w-12 h-12 rounded-2xl bg-[#faf8f6] border border-[#ece7e2] flex items-center justify-center text-[#c9a46c] hover:bg-[#c9a46c] hover:text-white transition-all hover:scale-[1.05]"
                      >
                        <Pencil size={20} />
                      </button>

                      <button
                        onClick={() => abrirDelete(endereco)}
                        className="w-12 h-12 rounded-2xl bg-[#faf8f6] border border-[#ece7e2] flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all hover:scale-[1.05]"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-gray-500">
                  Nenhum endereço encontrado.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <EnderecoModal
        aberto={modalAberto}
        fecharModal={() => {
          setModalAberto(false);
          setEnderecoSelecionado(null);
        }}
        enderecoSelecionado={enderecoSelecionado}
        onSuccess={async (data) => {
          try {
            if (enderecoSelecionado?.id) {
              await editarEnderecoCurso(enderecoSelecionado.id, data);

              Swal.fire({
                icon: "success",
                title: "Endereço atualizado",
                text: "As alterações foram salvas com sucesso.",
                timer: 1800,
                showConfirmButton: false,
              });
            } else {
              await cadastrarEnderecoCurso(data);

              Swal.fire({
                icon: "success",
                title: "Endereço cadastrado",
                text: "O endereço foi cadastrado com sucesso.",
                timer: 1800,
                showConfirmButton: false,
              });
            }

            await carregarEnderecos();

            setModalAberto(false);
            setEnderecoSelecionado(null);
          } catch (error) {
            console.error(error);

            Swal.fire({
              icon: "error",
              title: "Erro ao salvar",
              text:
                error?.response?.data?.message ||
                "Não foi possível salvar o endereço.",
              confirmButtonColor: "#c9a46c",
            });

            throw error;
          }
        }}
      />

      <DeleteModal
        aberto={deleteModalAberto}
        fecharModal={() => setDeleteModalAberto(false)}
        titulo="Excluir endereço"
        descricao={`Tem certeza que deseja excluir o endereço "${enderecoExcluir?.rua}"?`}
        onConfirmar={confirmarDelete}
      />
    </main>
  );
}
