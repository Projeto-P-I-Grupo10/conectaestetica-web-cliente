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

      // 👇 ALERTA + ESPERA
      await Swal.fire({
        title: "Login realizado!",
        text: `Bem-vindo, ${data.nome} 👋`,
        icon: "success",
        confirmButtonText: "Continuar",
      });

      // 👇 REDIRECIONA DEPOIS
      navigate("/cursos");

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-xl">
        <h1 className="text-2xl font-semibold text-center underline mb-6">
          Login
        </h1>

        <div className="space-y-4">
          {/* EMAIL */}
          <div>
            <label className="text-sm">Email:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border rounded-md p-2 mt-1 ${
                email.length > 0
                  ? emailValido
                    ? "border-green-500"
                    : "border-red-500"
                  : ""
              }`}
            />
            {email.length > 0 && !emailValido && (
              <p className="text-xs text-red-500">Email inválido</p>
            )}
          </div>

          {/* SENHA */}
          <div>
            <label className="text-sm">Senha:</label>
            <div className="relative">
              <input
                type={showSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full border rounded-md p-2 mt-1 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowSenha(!showSenha)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#c9a46c]"
              >
                {showSenha ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* BOTÃO */}
        <div className="mt-6">
          <button
            onClick={handleLogin}
            disabled={!formValido}
            className={`w-full py-2 rounded-full text-white ${
              formValido
                ? "bg-[#c9a46c] hover:bg-[#b8935c]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Entrar
          </button>
        </div>

        {/* LINK */}
        <p className="text-xs text-center mt-4 text-gray-500">
          Não tem conta?{" "}
          <span className="underline cursor-pointer text-[#c9a46c]">
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
}