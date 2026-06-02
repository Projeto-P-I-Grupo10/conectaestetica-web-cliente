import { useState } from "react";
import { cadastrarUsuario } from "../service/usuarios";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CadastroStepper() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);

  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validations = {
    length: senha.length >= 8,
    upper: /[A-Z]/.test(senha),
    lower: /[a-z]/.test(senha),
    number: /[0-9]/.test(senha),
    special: /[^A-Za-z0-9]/.test(senha),
  };

  const allValid = Object.values(validations).every(Boolean);
  const validado = senha === confirmarSenha && confirmarSenha.length > 0;

  const step1Valid = nome && telefone && emailValido;
  const step2Valid = allValid && validado;
  const step3Valid = cep && cidade && estado && logradouro && numero;

  const handleNext = () => {
    if (step === 1 && !step1Valid) return;
    if (step === 2 && !step2Valid) return;
    if (step === 3 && !step3Valid) return;
    setStep(step + 1);
  };

  const handleCadastro = async () => {
    if (!step1Valid || !step2Valid || !step3Valid) {
      Swal.fire({
        title: "Campos inválidos",
        text: "Preencha todos os campos corretamente",
        icon: "warning",
      });
      return;
    }

    const telefoneLimpo = telefone.replace(/\D/g, "");

    const dados = {
      nome,
      telefone: telefoneLimpo,
      email,
      senha,
      cep,
      cidade,
      estado,
      logradouro,
      numero,
    };

    try {
      Swal.fire({
        title: "Cadastrando...",
        text: "Aguarde um momento",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await cadastrarUsuario(dados);

      await Swal.fire({
        title: "Cadastro realizado!",
        text: "Sua conta foi criada com sucesso 🎉",
        icon: "success",
        confirmButtonText: "Ir para login",
      });

      navigate("/login"); 
    } catch (e) {
      console.error(e);

      Swal.fire({
        title: "Erro ao cadastrar",
        text: "Tente novamente mais tarde",
        icon: "error",
      });
    }
  };

  const buscarCep = async (cepDigitado) => {
    try {
      const cepLimpo = cepDigitado.replace(/\D/g, "");

      if (cepLimpo.length !== 8) return;

      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`,
      );
      const data = await response.json();

      if (data.erro) {
        Swal.fire({
          title: "CEP não encontrado",
          text: "Verifique o número digitado",
          icon: "warning",
        });
        return;
      }

      setCidade(data.localidade);
      setEstado(data.uf);
      setLogradouro(data.logradouro);
    } catch (e) {
      console.error("Erro ao buscar CEP", e);

      Swal.fire({
        title: "Erro",
        text: "Não foi possível buscar o CEP",
        icon: "error",
      });
    }
  };

  function formatarTelefone(valor) {
    valor = valor.replace(/\D/g, "");
    valor = valor.slice(0, 11);

    if (valor.length <= 10) {
      return valor
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      return valor
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center from-[#f6f1eb] via-[#fdfbf8] to-[#f3ebe3]">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-[#eee] p-10">
        {/* HEADER */}
        <h1 className="text-3xl font-semibold text-center text-[#2c2c2c] mb-6">
          Cadastro
        </h1>

        {/* PROGRESS */}
        <div className="w-full h-2 bg-gray-200/70 rounded-full mb-8 overflow-hidden">
          <div
            className="h-2 bg-[#c9a46c] rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* CONTEÚDO */}
        <div className="space-y-6">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Nome</label>
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-200 bg-white/70 outline-none focus:border-[#c9a46c] focus:ring-2 focus:ring-[#c9a46c]/20"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Telefone</label>
                <input
                  value={telefone}
                  onChange={(e) =>
                    setTelefone(formatarTelefone(e.target.value))
                  }
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-200 bg-white/70 outline-none focus:border-[#c9a46c] focus:ring-2 focus:ring-[#c9a46c]/20"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full mt-1 px-4 py-2 rounded-xl border bg-white/70 outline-none
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
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Senha</label>

                <div className="relative mt-1">
                  <input
                    type={showSenha ? "text" : "password"}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className={`w-full px-4 py-2 rounded-xl border bg-white/70 outline-none pr-10
                    ${
                      senha.length > 0
                        ? allValid
                          ? "border-green-400"
                          : "border-red-400"
                        : "border-gray-200"
                    }
                    focus:border-[#c9a46c] focus:ring-2 focus:ring-[#c9a46c]/20
                  `}
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

              {/* REGRAS */}
              <div className="text-xs space-y-1">
                <p
                  className={
                    validations.length ? "text-green-600" : "text-gray-500"
                  }
                >
                  • 8 caracteres
                </p>
                <p
                  className={
                    validations.upper ? "text-green-600" : "text-gray-500"
                  }
                >
                  • 1 maiúscula
                </p>
                <p
                  className={
                    validations.lower ? "text-green-600" : "text-gray-500"
                  }
                >
                  • 1 minúscula
                </p>
                <p
                  className={
                    validations.number ? "text-green-600" : "text-gray-500"
                  }
                >
                  • 1 número
                </p>
                <p
                  className={
                    validations.special ? "text-green-600" : "text-gray-500"
                  }
                >
                  • 1 especial
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Confirmar Senha</label>

                <div className="relative mt-1">
                  <input
                    type={showConfirmar ? "text" : "password"}
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    className={`w-full px-4 py-2 rounded-xl border bg-white/70 outline-none pr-10
                    ${
                      confirmarSenha.length > 0
                        ? validado
                          ? "border-green-400"
                          : "border-red-400"
                        : "border-gray-200"
                    }
                    focus:border-[#c9a46c] focus:ring-2 focus:ring-[#c9a46c]/20
                  `}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmar(!showConfirmar)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c9a46c]"
                  >
                    {showConfirmar ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {confirmarSenha.length > 0 && !validado && (
                  <p className="text-xs text-red-500 mt-1">
                    Senhas não coincidem
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">CEP</label>
                <input
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  onBlur={() => buscarCep(cep)}
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-200 bg-white/70 outline-none focus:border-[#c9a46c] focus:ring-2 focus:ring-[#c9a46c]/20"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Cidade</label>
                <input
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-200 bg-white/70 outline-none focus:border-[#c9a46c] focus:ring-2 focus:ring-[#c9a46c]/20"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Estado</label>
                <input
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-200 bg-white/70 outline-none focus:border-[#c9a46c] focus:ring-2 focus:ring-[#c9a46c]/20"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Logradouro</label>
                <input
                  value={logradouro}
                  onChange={(e) => setLogradouro(e.target.value)}
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-200 bg-white/70 outline-none focus:border-[#c9a46c] focus:ring-2 focus:ring-[#c9a46c]/20"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Número</label>
                <input
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-200 bg-white/70 outline-none focus:border-[#c9a46c] focus:ring-2 focus:ring-[#c9a46c]/20"
                />
              </div>
            </div>
          )}
        </div>

        {/* BOTÕES */}
        <div className="flex justify-between mt-10">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className="px-5 py-2 rounded-xl border border-[#c9a46c] text-[#c9a46c] disabled:opacity-40"
          >
            Voltar
          </button>

          {step < 3 ? (
            <button
              onClick={handleNext}
              className={`px-6 py-2 rounded-xl text-white transition
              ${
                (step === 1 && !step1Valid) || (step === 2 && !step2Valid)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#c9a46c] hover:bg-[#b8935c]"
              }
            `}
            >
              Próximo
            </button>
          ) : (
            <button
              onClick={handleCadastro}
              disabled={!step3Valid}
              className={`px-6 py-2 rounded-xl text-white transition
              ${
                step3Valid
                  ? "bg-[#c9a46c] hover:bg-[#b8935c]"
                  : "bg-gray-300 cursor-not-allowed"
              }
            `}
            >
              Cadastrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
