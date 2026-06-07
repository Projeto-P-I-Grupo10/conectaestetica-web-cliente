import { X, Trash2 } from "lucide-react";
import { useState } from "react";

export default function DeleteModal({
  aberto,
  fecharModal,
  titulo = "Excluir item",
  descricao = "Tem certeza que deseja excluir este item?",
  onConfirmar,
}) {
  const [loading, setLoading] = useState(false);

  if (!aberto) return null;

  async function handleConfirmar() {
    try {
      setLoading(true);
      await onConfirmar(); 
      fecharModal();
    } catch (error) {
      console.error("Erro ao excluir:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
      
      {/* MODAL */}
      <div className="w-full max-w-lg bg-white rounded-[2.5rem] border border-[#ece7e2] shadow-xl overflow-hidden animate-in fade-in zoom-in-95">

        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#ece7e2]">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-red-500">
              <Trash2 size={28} />
            </div>

            <div>
              <h2 className="text-2xl font-light text-[#3d2b1f]">
                {titulo}
              </h2>
              <p className="text-gray-500 mt-1">
                Essa ação não poderá ser desfeita.
              </p>
            </div>
          </div>

          {/* FECHAR */}
          <button
            onClick={fecharModal}
            disabled={loading}
            className="w-12 h-12 rounded-2xl bg-[#faf8f6] border border-[#ece7e2] flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="px-8 py-8">
          <div className="bg-[#faf8f6] border border-[#ece7e2] rounded-3xl p-6">
            <p className="text-gray-600 leading-relaxed">
              {descricao}
            </p>
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-end gap-4 mt-8">

            {/* CANCELAR */}
            <button
              onClick={fecharModal}
              disabled={loading}
              className="px-6 py-4 rounded-2xl border border-[#ece7e2] text-[#3d2b1f] hover:bg-[#faf8f6] transition disabled:opacity-50"
            >
              Cancelar
            </button>

            {/* EXCLUIR */}
            <button
              onClick={handleConfirmar}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 transition-all text-white px-8 py-4 rounded-2xl shadow-sm hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Trash2 size={20} />

              {loading ? "Excluindo..." : "Excluir"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}