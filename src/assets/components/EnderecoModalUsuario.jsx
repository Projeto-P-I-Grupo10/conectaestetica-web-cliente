import { useEffect, useState } from "react";
import { X, Plus, MapPin, Trash2, Home } from "lucide-react";

export default function EnderecoModalUsuario({
  aberto,
  fecharModal,
  enderecos = [],
  onSalvar,
  onExcluir,
}) {
  const enderecosMock =
    enderecos.length > 0
      ? enderecos
      : [
          {
            id: 1,
            cep: "01310-100",
            rua: "Av. Paulista",
            numero: "1578",
            complemento: "Sala 5",
            bairro: "Bela Vista",
            cidade: "São Paulo",
            estado: "SP",
          },
          {
            id: 2,
            cep: "01305-000",
            rua: "Rua Augusta",
            numero: "450",
            complemento: "",
            bairro: "Consolação",
            cidade: "São Paulo",
            estado: "SP",
          },
          {
            id: 3,
            cep: "01000-000",
            rua: "Rua das Flores",
            numero: "123",
            complemento: "Andar 2",
            bairro: "Centro",
            cidade: "São Paulo",
            estado: "SP",
          },
        ];

  const [idSelecionado, setIdSelecionado] = useState(null);

  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  useEffect(() => {
    if (enderecosMock.length > 0) {
      carregarEndereco(enderecosMock[0]);
    }
  }, []);

  function carregarEndereco(endereco) {
    setIdSelecionado(endereco.id);

    setCep(endereco.cep || "");
    setRua(endereco.rua || "");
    setNumero(endereco.numero || "");
    setComplemento(endereco.complemento || "");
    setBairro(endereco.bairro || "");
    setCidade(endereco.cidade || "");
    setEstado(endereco.estado || "");
  }

  function limparFormulario() {
    setIdSelecionado(null);

    setCep("");
    setRua("");
    setNumero("");
    setComplemento("");
    setBairro("");
    setCidade("");
    setEstado("");
  }

  function handleSalvar() {
    const payload = {
      id: idSelecionado,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
    };

    onSalvar?.(payload);
  }

  function handleExcluir() {
    if (!idSelecionado) return;

    onExcluir?.(idSelecionado);

    limparFormulario();
  }

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="w-full max-w-7xl h-[85vh] bg-white rounded-[2.5rem] shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#ece7e2]">
          <div>
            <h2 className="text-3xl font-light text-[#3d2b1f]">
              Meus Endereços
            </h2>

            <p className="text-gray-500 mt-1">
              Gerencie seus endereços cadastrados.
            </p>
          </div>

          <button
            onClick={fecharModal}
            className="
              w-12 h-12
              rounded-2xl
              bg-[#faf8f6]
              border border-[#ece7e2]
              flex items-center justify-center
              text-gray-500
              hover:bg-red-50
              hover:text-red-500
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="grid lg:grid-cols-[380px_1fr] h-[calc(85vh-90px)]">
          {/* FORMULÁRIO */}
          <div className="border-r border-[#ece7e2] p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-medium text-[#3d2b1f]">
                  {idSelecionado ? "Editar Endereço" : "Novo Endereço"}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Preencha os dados abaixo.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                label="CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />

              <Input
                label="Rua"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Número"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />

                <Input
                  label="Estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                />
              </div>

              <Input
                label="Complemento"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />

              <Input
                label="Bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />

              <Input
                label="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-3 mt-8">
              <button
                onClick={handleSalvar}
                className="
                  bg-[#c9a46c]
                  hover:bg-[#b89258]
                  text-white
                  py-4
                  rounded-2xl
                  font-medium
                "
              >
                Salvar Endereço
              </button>

              {idSelecionado && (
                <button
                  onClick={handleExcluir}
                  className="
                    border border-red-200
                    text-red-500
                    py-4
                    rounded-2xl
                    font-medium
                  "
                >
                  Excluir Endereço
                </button>
              )}
            </div>
          </div>

          {/* CARDS */}
          <div className="p-8 bg-[#faf8f6] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-light text-[#3d2b1f]">
                  Endereços Cadastrados
                </h3>

                <p className="text-gray-500 mt-1">
                  Clique em um endereço para editar.
                </p>
              </div>

              <div className="bg-white border border-[#ece7e2] rounded-xl px-4 py-2 text-sm">
                {enderecosMock.length} endereços
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {enderecosMock.map((endereco) => (
                <button
                  key={endereco.id}
                  onClick={() => carregarEndereco(endereco)}
                  className={`
                    text-left
                    bg-white
                    rounded-4xl
                    p-5
                    border
                    transition-all
                    hover:shadow-md

                    ${
                      idSelecionado === endereco.id
                        ? "border-[#c9a46c] ring-2 ring-[#c9a46c]/20"
                        : "border-[#ece7e2]"
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="
                        w-14 h-14
                        rounded-2xl
                        bg-[#f8f3eb]
                        flex items-center justify-center
                      "
                    >
                      <Home size={24} className="text-[#c9a46c]" />
                    </div>

                    <div>
                      <h4 className="font-medium text-[#3d2b1f]">
                        {endereco.rua}, {endereco.numero}
                      </h4>

                      <p className="text-gray-500 text-sm mt-1">
                        {endereco.bairro}
                      </p>

                      <p className="text-gray-500 text-sm">
                        {endereco.cidade} - {endereco.estado}
                      </p>

                      <div className="flex items-center gap-2 mt-4">
                        <MapPin size={14} className="text-[#c9a46c]" />

                        <span className="text-xs text-gray-400">
                          CEP {endereco.cep}
                        </span>
                      </div>

                      {endereco.complemento && (
                        <p className="text-xs text-gray-400 mt-2">
                          {endereco.complemento}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm text-gray-500 mb-2">{label}</label>

      <input
        type={type}
        value={value}
        onChange={onChange}
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
  );
}
