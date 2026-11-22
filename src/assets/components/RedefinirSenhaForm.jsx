import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import Swal from "sweetalert2";
import { redefinirSenhaComToken } from "../service/usuarios";

export default function RedefinirSenhaForm() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token");

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  // mesmas regras do modal de "Resetar senha" do perfil
  const validations = {
    length: novaSenha.length >= 8,
    upper: /[A-Z]/.test(novaSenha),
    lower: /[a-z]/.test(novaSenha),
    number: /[0-9]/.test(novaSenha),
    special: /[^A-Za-z0-9]/.test(novaSenha),
  };
  const allValid = Object.values(validations).every(Boolean);
  const confere = novaSenha === confirmarSenha && confirmarSenha.length > 0;
  const formValido = allValid && confere;

  const handleRedefinir = async () => {
    if (!formValido || carregando) return;

    setCarregando(true);
    try {
      await redefinirSenhaComToken(token, novaSenha);

      await Swal.fire({
        title: "Senha redefinida!",
        text: "Agora você já pode entrar com a nova senha.",
        icon: "success",
        confirmButtonText: "Ir para o login",
      });

      navigate("/login");
    } catch (e) {
      console.error(e);

      if (e.response?.status === 400) {
        const result = await Swal.fire({
          title: "Link inválido ou expirado",
          text: "Peça um novo link para redefinir sua senha.",
          icon: "error",
          confirmButtonText: "Pedir novo link",
        });
        if (result.isConfirmed) navigate("/esqueci-senha");
      } else {
        Swal.fire({
          title: "Erro",
          text: "Não foi possível redefinir agora. Tente novamente em instantes.",
          icon: "error",
        });
      }
    } finally {
      setCarregando(false);
    }
  };

  // abriu /redefinir-senha sem o ?token=
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center from-[#f6f1eb] via-[#fdfbf8] to-[#f3ebe3]">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-[#eee] p-10 text-center">
          <h1 className="text-2xl font-semibold text-[#2c2c2c] mb-3">
            Link inválido
          </h1>
          <p className="text-sm text-gray-500">
            Esse link de recuperação está incompleto. Peça um novo para continuar.
          </p>
          <button
            onClick={() => navigate("/esqueci-senha")}
            className="w-full mt-8 py-3 rounded-xl font-medium transition shadow-md bg-[#c9a46c] hover:bg-[#b8935c] text-white"
          >
            Pedir novo link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center from-[#f6f1eb] via-[#fdfbf8] to-[#f3ebe3]">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-[#eee] p-10">
        <div className="flex items-center gap-3 mb-3 justify-center">
          <div className="w-12 h-12 rounded-2xl bg-[#c9a46c]/15 flex items-center justify-center text-[#c9a46c]">
            <Lock size={22} />
          </div>
          <h1 className="text-3xl font-semibold text-[#2c2c2c]">Nova senha</h1>
        </div>

        <p className="text-sm text-center text-gray-500 mb-8">
          Crie uma nova senha para a sua conta.
        </p>

        <div className="space-y-5">
          {/* NOVA SENHA */}
          <div>
            <label className="text-sm text-gray-600">Nova senha</label>
            <div className="relative mt-1">
              <input
                type={showNovaSenha ? "text" : "password"}
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                className={`w-full px-4 py-2 rounded-xl border outline-none transition bg-white/70 pr-10 focus:border-[#c9a46c] focus:ring-2 focus:ring-[#c9a46c]/20 ${
                  novaSenha.length > 0
                    ? allValid
                      ? "border-green-400"
                      : "border-red-400"
                    : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowNovaSenha(!showNovaSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c9a46c]"
              >
                {showNovaSenha ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* REGRAS */}
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

          {/* CONFIRMAR */}
          <div>
            <label className="text-sm text-gray-600">Confirmar nova senha</label>
            <div className="relative mt-1">
              <input
                type={showConfirmarSenha ? "text" : "password"}
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRedefinir()}
                className={`w-full px-4 py-2 rounded-xl border outline-none transition bg-white/70 pr-10 focus:border-[#c9a46c] focus:ring-2 focus:ring-[#c9a46c]/20 ${
                  confirmarSenha.length > 0
                    ? confere
                      ? "border-green-400"
                      : "border-red-400"
                    : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c9a46c]"
              >
                {showConfirmarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {confirmarSenha.length > 0 && !confere && (
              <p className="text-xs text-red-500 mt-1">As senhas não coincidem</p>
            )}
          </div>
        </div>

        <div className="mt-7">
          <button
            onClick={handleRedefinir}
            disabled={!formValido || carregando}
            className={`w-full py-3 rounded-xl font-medium transition shadow-md
            ${
              formValido && !carregando
                ? "bg-[#c9a46c] hover:bg-[#b8935c] text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
          >
            {carregando ? "Salvando..." : "Redefinir senha"}
          </button>
        </div>
      </div>
    </div>
  );
}
