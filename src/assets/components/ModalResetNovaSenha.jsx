import { Eye, EyeOff, Lock, X } from "lucide-react";
import { useState } from "react";
import { atualizarSenhaUsuario } from "../service/usuarios";

export default function ModalResetNovaSenha({
  open,
  onClose,
}) {
  
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const validations = {
    length: novaSenha.length >= 8,
    upper: /[A-Z]/.test(novaSenha),
    lower: /[a-z]/.test(novaSenha),
    number: /[0-9]/.test(novaSenha),
    special: /[^A-Za-z0-9]/.test(novaSenha),
  };

  const allValid = Object.values(validations).every(Boolean);
  const validado = novaSenha === confirmarSenha && confirmarSenha.length > 0;
   const id = localStorage.getItem("idUsuario");
  
  async function atualizarSenhaUsuarioModal() {
      try {
        if (!novaSenha) {
          console.error("Preencha a nova senha");
          return;
        }

        const data = await atualizarSenhaUsuario(novaSenha,id);

        if (data?.status === 200) {
          console.log(data?.mensagem);
          onClose();
          setNovaSenha("");
          setConfirmarSenha("");
        }
      } catch (erro) {
        console.error("Erro ao atualizar senha", erro);
      }
  }


  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-[999]
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-4xl
          p-8
          shadow-2xl
          relative
        "
      >
        {/* Fechar */}
        <button
          onClick={onClose}
          className="
            absolute
            top-5
            right-5
            text-gray-400
            hover:text-black
            transition
          "
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-[#c9a46c]/15
                flex
                items-center
                justify-center
                text-[#c9a46c]
              "
            >
              <Lock size={22} />
            </div>

            <h2 className="text-3xl font-light text-[#3d2b1f]">
              Resetar senha
            </h2>
          </div>

          <p className="text-gray-500">
            Atualize sua senha para manter sua conta segura.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          
         {/* Nova senha */}
          <div>
            <label className="block text-sm font-medium text-[#3d2b1f] mb-2">
              Nova senha
            </label>
            <div className="relative">
              <input
                type={showNovaSenha ? "text" : "password"}
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                className={`w-full border rounded-2xl px-5 py-3 outline-none focus:border-[#c9a46c] ${
                  novaSenha.length > 0
                    ? allValid
                      ? "border-green-500"
                      : "border-red-500"
                    : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowNovaSenha(!showNovaSenha)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showNovaSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Regras */}
          <div className="text-xs space-y-1">
            <p className={validations.length ? "text-green-600" : "text-gray-500"}>
              • Pelo menos 8 caracteres
            </p>
            <p className={validations.upper ? "text-green-600" : "text-gray-500"}>
              • 1 letra maiúscula
            </p>
            <p className={validations.lower ? "text-green-600" : "text-gray-500"}>
              • 1 letra minúscula
            </p>
            <p className={validations.number ? "text-green-600" : "text-gray-500"}>
              • 1 número
            </p>
            <p className={validations.special ? "text-green-600" : "text-gray-500"}>
              • 1 caractere especial
            </p>
          </div>

          {/* Confirmar senha */}
          <div>
            <label className="block text-sm font-medium text-[#3d2b1f] mb-2">
              Confirmar nova senha
            </label>
            <div className="relative">
              <input
                type={showConfirmarSenha ? "text" : "password"}
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className={`w-full border rounded-2xl px-5 py-3 outline-none focus:border-[#c9a46c] ${
                  confirmarSenha.length > 0
                    ? validado
                      ? "border-green-500"
                      : "border-red-500"
                    : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {confirmarSenha.length > 0 && !validado && (
            <p className="text-xs text-red-500">As senhas não coincidem</p>
          )}
          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="
                flex-1
                border
                border-[#ece7e2]
                py-3
                rounded-full
                hover:bg-gray-100
                transition
              "
            >
              Cancelar
            </button>

            <button
              className="
                flex-1
                bg-[#c9a46c]
                hover:bg-[#b89258]
                text-white
                py-3
                rounded-full
                transition
                font-medium
              "
              onClick={atualizarSenhaUsuarioModal}
            >
              Salvar senha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}