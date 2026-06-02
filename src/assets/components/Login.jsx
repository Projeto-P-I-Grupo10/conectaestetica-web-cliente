import { useState } from "react";
import { loginService } from "../service/usuarios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const formValido = emailValido && senha.length > 0;

  const handleLogin = async () => {
    if (!formValido) {
      Swal.fire({
        title: "Campos inválidos",
        text: "Preencha todos os campos corretamente",
        icon: "warning",
      });
      return;
    }

    try {
      const data = await loginService({ email, senha });

      localStorage.setItem("token", data.token);
      localStorage.setItem("idUsuario", data.id);
      localStorage.setItem("email", data.email);
      localStorage.setItem("nome", data.nome);

      await Swal.fire({
        title: "Login realizado!",
        text: `Bem-vindo, ${data.nome} 👋`,
        icon: "success",
        confirmButtonText: "Continuar",
      });

      navigate("/home");
    } catch (e) {
      console.error(e);

      Swal.fire({
        title: "Erro no login",
        text: "Email ou senha inválidos",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-[#f6f1eb] via-[#fdfbf8] to-[#f3ebe3]">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-[#eee] p-10">
        {/* TÍTULO */}
        <h1 className="text-3xl font-semibold text-center text-[#2c2c2c] mb-8">
          Login
        </h1>

        <div className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          {/* SENHA */}
          <div>
            <label className="text-sm text-gray-600">Senha</label>

            <div className="relative mt-1">
              <input
                type={showSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none transition bg-white/70 pr-10 focus:border-[#c9a46c] focus:ring-2 focus:ring-[#c9a46c]/20"
              />

              <button
                type="button"
                onClick={() => setShowSenha(!showSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c9a46c]"
              >
                {showSenha ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* BOTÃO */}
        <div className="mt-7">
          <button
            onClick={handleLogin}
            disabled={!formValido}
            className={`w-full py-3 rounded-xl font-medium transition shadow-md
            ${
              formValido
                ? "bg-[#c9a46c] hover:bg-[#b8935c] text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
          >
            Entrar
          </button>
        </div>

        {/* LINK */}
        <p className="text-xs text-center mt-6 text-gray-500">
          Não tem conta?{" "}
          <span className="underline cursor-pointer text-[#c9a46c]">
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
}
