import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { cadastrarArea, editarArea } from "../service/area";

export default function AreaModal({
  aberto,
  fecharModal,
  areaSelecionada,
  onSuccess,
}) {
  const editando = !!areaSelecionada;

  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (!aberto) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNome(areaSelecionada?.nome ?? "");
  }, [aberto, areaSelecionada]);

  async function handleSalvar() {
    try {
      setLoading(true);

      const payload = {
        nome: nome.trim(),
      };

      if (editando) {
        await editarArea(areaSelecionada.id, payload);
      } else {
        await cadastrarArea(payload);
      }

      await onSuccess?.();

      setNome("");

      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar área:", error.response?.data || error);

      alert(error.response?.data?.message || "Erro ao salvar área.");
    } finally {
      setLoading(false);
    }
  }

  function handleFechar() {
    if (loading) return;

    setNome("");
    fecharModal();
  }

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] border border-[#ece7e2] shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#ece7e2]">
          <div>
            <h2 className="text-3xl font-light text-[#3d2b1f]">
              {editando ? "Editar Área" : "Nova Área"}
            </h2>

            <p className="text-gray-500 mt-1">
              {editando
                ? "Atualize as informações da área"
                : "Cadastre uma nova área"}
            </p>
          </div>

          <button
            onClick={handleFechar}
            disabled={loading}
            className="
              w-12 h-12
              rounded-2xl
              bg-[#faf8f6]
              border border-[#ece7e2]
              flex items-center justify-center
              text-gray-500
              hover:bg-red-50
              hover:text-red-500
              transition-all
              disabled:opacity-50
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-8">
          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Nome da Área
            </label>

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Estética Facial"
              className="
                w-full
                border border-[#ece7e2]
                rounded-2xl
                px-5 py-4
                focus:outline-none
                focus:border-[#c9a46c]
              "
            />
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-4 mt-10">
            <button
              onClick={handleFechar}
              disabled={loading}
              className="
                px-6 py-3
                rounded-2xl
                border border-[#ece7e2]
                hover:bg-[#faf8f6]
                transition-all
                disabled:opacity-50
              "
            >
              Cancelar
            </button>

            <button
              onClick={handleSalvar}
              disabled={loading || !nome.trim()}
              className="
                bg-[#c9a46c]
                hover:bg-[#b89258]
                disabled:opacity-50
                disabled:cursor-not-allowed
                text-white
                px-8 py-4
                rounded-2xl
                transition-all
              "
            >
              {loading
                ? "Salvando..."
                : editando
                  ? "Salvar Alterações"
                  : "Salvar Área"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
