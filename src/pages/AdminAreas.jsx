import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

import SidebarAdmin from "../assets/components-admin/SidebarAdmin";
import AreaModal from "../assets/components-admin/AreaModal";
import DeleteModal from "../assets/components-admin/DeleteModal";

import { listarAreas, deletarArea } from "../assets/service/area";

function normalizeArea(area) {
  return {
    id: area.id || area.areaId,
    nome: area.nome || area.areaNome || "",
  };
}

export default function AdminAreas() {
  const [areas, setAreas] = useState([]);

  const [modalAberto, setModalAberto] = useState(false);
  const [areaSelecionada, setAreaSelecionada] = useState(null);

  const [deleteModalAberto, setDeleteModalAberto] = useState(false);
  const [areaExcluir, setAreaExcluir] = useState(null);

  useEffect(() => {
    carregarAreas();
  }, []);

  async function carregarAreas() {
    try {
      const data = await listarAreas();

      console.log("ÁREAS API:", data);

      const lista = Array.isArray(data) ? data : data?.areas || [];

      setAreas(lista.map(normalizeArea));
    } catch (error) {
      console.error("Erro ao buscar áreas:", error);

      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Não foi possível carregar as áreas.",
        confirmButtonColor: "#c9a46c",
      });

      setAreas([]);
    }
  }

  function abrirCriar() {
    setAreaSelecionada(null);
    setModalAberto(true);
  }

  function abrirEditar(area) {
    setAreaSelecionada(area);
    setModalAberto(true);
  }

  function abrirDelete(area) {
    setAreaExcluir(area);
    setDeleteModalAberto(true);
  }

  async function confirmarDelete() {
    try {
      await deletarArea(areaExcluir.id);

      setAreas((prev) => prev.filter((area) => area.id !== areaExcluir.id));

      Swal.fire({
        icon: "success",
        title: "Área excluída!",
        text: "A área foi removida com sucesso.",
        confirmButtonColor: "#c9a46c",
      });

      setAreaExcluir(null);
    } catch (error) {
      console.error("Erro ao excluir área:", error);

      const mensagem =
        error?.response?.data?.message ||
        error?.response?.data?.erro ||
        error?.response?.data?.error ||
        "";

      // Área vinculada a cursos
      if (
        mensagem.toLowerCase().includes("foreign key") ||
        mensagem.toLowerCase().includes("constraint") ||
        mensagem.toLowerCase().includes("curso") ||
        error?.response?.status === 409
      ) {
        Swal.fire({
          icon: "warning",
          title: "Área vinculada a cursos",
          text: "Esta área não pode ser excluída porque existem cursos cadastrados utilizando ela.",
          confirmButtonColor: "#c9a46c",
        });

        return;
      }

      Swal.fire({
        icon: "error",
        title: "Erro ao excluir",
        text: mensagem || "Não foi possível excluir a área. Tente novamente.",
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
                  Gerenciar Áreas
                </h1>

                <p className="text-gray-500 text-lg">
                  Controle todas as áreas da plataforma.
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
                  px-6 py-4
                  rounded-2xl
                  flex items-center gap-3
                  shadow-sm
                  w-fit
                "
              >
                <Plus size={22} />
                <span className="font-medium">Nova Área</span>
              </button>
            </div>
          </div>

          {/* TABELA */}
          <div className="bg-white border border-[#ece7e2] rounded-[2.5rem] shadow-sm overflow-hidden">
            {/* HEADER */}
            <div className="grid grid-cols-[1fr_150px] gap-4 px-8 py-5 border-b border-[#ece7e2] bg-[#faf8f6]">
              <span className="text-sm text-gray-500 font-medium">
                Nome da Área
              </span>

              <span className="text-sm text-gray-500 font-medium">Ações</span>
            </div>

            {/* LINHAS */}
            <div>
              {areas.length > 0 ? (
                areas.map((area) => (
                  <div
                    key={area.id}
                    className="
                      grid
                      grid-cols-[1fr_150px]
                      gap-4
                      items-center
                      px-8
                      py-6
                      border-b
                      border-[#f3efea]
                      hover:bg-[#fcfbfa]
                      transition
                    "
                  >
                    <span className="font-medium text-[#3d2b1f]">
                      {area.nome}
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => abrirEditar(area)}
                        className="
                          w-12 h-12
                          rounded-2xl
                          bg-[#faf8f6]
                          border border-[#ece7e2]
                          flex items-center justify-center
                          text-[#c9a46c]
                          hover:bg-[#c9a46c]
                          hover:text-white
                          transition-all
                          hover:scale-[1.05]
                        "
                      >
                        <Pencil size={20} />
                      </button>

                      <button
                        onClick={() => abrirDelete(area)}
                        className="
                          w-12 h-12
                          rounded-2xl
                          bg-[#faf8f6]
                          border border-[#ece7e2]
                          flex items-center justify-center
                          text-red-500
                          hover:bg-red-500
                          hover:text-white
                          transition-all
                          hover:scale-[1.05]
                        "
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-gray-500">
                  Nenhuma área encontrada.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL CRIAR / EDITAR */}
      <AreaModal
        aberto={modalAberto}
        fecharModal={() => setModalAberto(false)}
        areaSelecionada={areaSelecionada}
        onSuccess={carregarAreas}
      />

      {/* MODAL EXCLUIR */}
      <DeleteModal
        aberto={deleteModalAberto}
        fecharModal={() => setDeleteModalAberto(false)}
        titulo="Excluir área"
        descricao={`Tem certeza que deseja excluir a área "${areaExcluir?.nome}"?`}
        onConfirmar={confirmarDelete}
      />
    </main>
  );
}
