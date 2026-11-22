import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MailCheck } from "lucide-react";
import Swal from "sweetalert2";
import { solicitarRecuperacaoSenha } from "../service/usuarios";

export default function EsqueciSenhaForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // se veio da tela de login com o e-mail já digitado, aproveita
  const [email, setEmail] = useState(location.state?.email ?? "");
  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEnviar = async () => {
    if (!emailValido || carregando) return;

    setCarregando(true);
    try {
      await solicitarRecuperacaoSenha(email.trim());
      // a API responde 200 exista ou não o e-mail, então a mensagem é sempre a mesma
      setEnviado(true);
    } catch (e) {
      console.error(e);
      Swal.fire({
        title: "Erro",
        text: "Não foi possível enviar agora. Tente novamente em instantes.",
        icon: "error",
      });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-[#f6f1eb] via-[#fdfbf8] to-[#f3ebe3]">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-[#eee] p-10">
        {enviado ? (
          <div className="text-center">
            <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-[#c9a46c]/15 flex items-center justify-center text-[#c9a46c]">
              <MailCheck size={28} />
            </div>

            <h1 className="text-2xl font-semibold text-[#2c2c2c] mb-3">
              Verifique seu e-mail
            </h1>

            <p className="text-sm text-gray-500">
              Se o e-mail estiver cadastrado, você receberá as instruções para
              redefinir a senha. O link vale por 30 minutos.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="w-full mt-8 py-3 rounded-xl font-medium transition shadow-md bg-[#c9a46c] hover:bg-[#b8935c] text-white"
            >
              Voltar ao login
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-semibold text-center text-[#2c2c2c] mb-3">
              Esqueci minha senha
            </h1>

            <p className="text-sm text-center text-gray-500 mb-8">
              Informe o e-mail da sua conta e enviaremos um link para você criar
              uma nova senha.
            </p>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEnviar()}
                className={`w-full mt-1 px-4 py-2 rounded-xl border outline-none transition bg-white/70
                ${
                  email.length > 0
                    ? emailValido
                      ? "border-green-400"
                      : "border-red-400"
                    : "border-gray-200"
                }
                focus:border-[#c9a46c] focus:ring-2 focus:ring-[#c9a46c]/20
              `}
              />
              {email.length > 0 && !emailValido && (
                <p className="text-xs text-red-500 mt-1">Email inválido</p>
              )}
            </div>

            <div className="mt-7">
              <button
                onClick={handleEnviar}
                disabled={!emailValido || carregando}
                className={`w-full py-3 rounded-xl font-medium transition shadow-md
                ${
                  emailValido && !carregando
                    ? "bg-[#c9a46c] hover:bg-[#b8935c] text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
              >
                {carregando ? "Enviando..." : "Enviar link"}
              </button>
            </div>

            <p className="text-xs text-center mt-6 text-gray-500">
              Lembrou a senha?{" "}
              <span
                onClick={() => navigate("/login")}
                className="underline cursor-pointer text-[#c9a46c]"
              >
                Voltar ao login
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
