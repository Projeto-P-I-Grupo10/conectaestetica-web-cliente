import { useState } from "react";
import { cadastrarUsuario } from "../service/usuarios";
import { Eye, EyeOff } from "lucide-react";

export default function CadastroStepper() {
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
    alert("Preencha todos os campos corretamente");
    return;
  }

  const dados = {
    nome,
    telefone,
    email,
    senha,
    cep,
    cidade,
    estado,
    logradouro,
    numero
  };

  try {
    await cadastrarUsuario(dados);
    alert("Cadastrado!");

  } catch (e) {
    console.error(e);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-xl">
        <h1 className="text-2xl font-semibold text-center underline mb-4">
          Cadastro
        </h1>

        <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
          <div
            className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm">Nome:</label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full border rounded-md p-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm">Telefone:</label>
              <input
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full border rounded-md p-2 mt-1"
              />
            </div>

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
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm">Senha:</label>
              <div className="relative">
                <input
                  type={showSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className={`w-full border rounded-md p-2 mt-1 pr-10 ${
                    senha.length > 0
                      ? allValid
                        ? "border-green-500"
                        : "border-red-500"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowSenha(!showSenha)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="text-xs space-y-1">
              <p
                className={
                  validations.length ? "text-green-600" : "text-gray-500"
                }
              >
                • Pelo menos 8 caracteres
              </p>
              <p
                className={
                  validations.upper ? "text-green-600" : "text-gray-500"
                }
              >
                • 1 letra maiúscula
              </p>
              <p
                className={
                  validations.lower ? "text-green-600" : "text-gray-500"
                }
              >
                • 1 letra minúscula
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
                • 1 caractere especial
              </p>
            </div>

            <div>
              <label className="text-sm">Confirmar Senha:</label>
              <div className="relative">
                <input
                  type={showConfirmar ? "text" : "password"}
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className={`w-full border rounded-md p-2 mt-1 pr-10 ${
                    confirmarSenha.length > 0
                      ? validado
                        ? "border-green-500"
                        : "border-red-500"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmar(!showConfirmar)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showConfirmar ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {confirmarSenha.length > 0 && !validado && (
              <p className="text-xs text-red-500">As senhas não coincidem</p>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm">CEP:</label>
              <input
                value={cep}
                maxLength={9}
                onChange={(e) => {
                  let value = e.target.value;

                  value = value.replace(/\D/g, ""); // só números
                  value = value.slice(0, 8); // máximo 8 dígitos

                  if (value.length > 5) {
                    value = value.replace(/(\d{5})(\d+)/, "$1-$2");
                  }

                  setCep(value);
                }}
                className="w-full border rounded-md p-1 "
              />
            </div>

            <div>
              <label className="text-sm">Cidade:</label>
              <input
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full border rounded-md p-1 "
              />
            </div>

            <div>
              <label className="text-sm">Estado:</label>
              <input
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full border rounded-md p-1 "
              />
            </div>

            <div>
              <label className="text-sm">Logradouro:</label>
              <input
                value={logradouro}
                onChange={(e) => setLogradouro(e.target.value)}
                className="w-full border rounded-md p-1 "
              />
            </div>

            <div>
              <label className="text-">Número:</label>
              <input
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="w-full border rounded-md p-1"
              />
            </div>
          </div>
        )}

        {/* BOTÕES */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className="px-4 py-2 border border-yellow-600 text-yellow-600 rounded-full disabled:opacity-50"
          >
            Voltar
          </button>

          {step < 3 ? (
            <button
              onClick={handleNext}
              className={`px-6 py-2 rounded-full text-white ${
                (step === 1 && !step1Valid) || (step === 2 && !step2Valid)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-600"
              }`}
            >
              Próximo
            </button>
          ) : (
            <button
              onClick={handleCadastro}
              disabled={!step3Valid}
              className={`px-6 py-2 rounded-full text-white ${
                step3Valid ? "bg-yellow-600" : "bg-gray-400"
              }`}
            >
              Cadastrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
