import { Eye, EyeOff, Lock, X } from "lucide-react";
import { useState } from "react";
import { verificarSenhaUsuario } from "../service/usuarios";
import ModalResetNovaSenha from "./ModalResetNovaSenha";

export default function ModalResetSenha({
  open,
  onClose,
  onSuccess
}) {
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showSenhaNova, setShowSenhaNova] = useState(false);
  const id = localStorage.getItem("idUsuario");
  const [senha, setSenha] = useState("");

      async function verificarSenhaUsuarioModal() {
        try {
          const data = await verificarSenhaUsuario(senha,id);
           if (data?.status === 200) {
            console.log(data?.mensagem)
            console.log(data?.status)
                 onSuccess();
                  setShowSenhaNova(true);
                  setSenha("");
            }
          
        } catch (erro) {
          console.error("Senha Digitada está incorreta", erro);
        }
      }

  if (!open) return null;

  return (<>
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
            Digite sua senha atual, para validarmos sua credencial.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          
          {/* Senha atual */}
          <div>
            <label className="block text-sm font-medium text-[#3d2b1f] mb-2">
              Senha atual
            </label>

            <div className="relative">
              <input
                type={showSenhaAtual ? "text" : "password"}
                className="
                  w-full
                  border
                  border-[#ece7e2]
                  rounded-2xl
                  px-5
                  py-3
                  outline-none
                  focus:border-[#c9a46c]
                "
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

              <button
                type="button"
                onClick={() =>
                  setShowSenhaAtual(!showSenhaAtual)
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              >
                {showSenhaAtual ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

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
              onClick={verificarSenhaUsuarioModal}
            >
              Verificar senha
            </button>
          </div>
        </div>
      </div>
    </div>
   {showSenhaNova && (
    <ModalResetNovaSenha
      open={showSenhaNova}
      onClose={() => setShowSenhaNova(false)}
      />
    )}

              </>
  );
}