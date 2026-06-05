import { useState } from "react";
import { X, Plus, MapPin, Trash2, CheckCircle } from "lucide-react";

export default function EnderecoModalUsuario({
  aberto,
  fecharModal,
  onSalvar,
  onExcluir,
}) {
  const [enderecos, setEnderecos] = useState([
    {
      id: 1,
      cep: "01310-100",
      rua: "Av. Paulista",
      numero: "1500",
      complemento: "Andar 8",
      bairro: "Bela Vista",
      cidade: "São Paulo",
      estado: "SP",
    },
    {
      id: 2,
      cep: "01000-000",
      rua: "Rua das Flores",
      numero: "123",
      complemento: "Sala 5",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
    },
    {
      id: 3,
      cep: "01305-000",
      rua: "Rua Augusta",
      numero: "450",
      complemento: "",
      bairro: "Consolação",
      cidade: "São Paulo",
      estado: "SP",
    },
  ]);

  const [enderecoAtualId, setEnderecoAtualId] = useState(1);

  const [form, setForm] = useState({
    id: null,
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function limparFormulario() {
    setForm({
      id: null,
      cep: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
    });
  }

  function selecionarEndereco(endereco) {
    setEnderecoAtualId(endereco.id);

    setForm({
      id: endereco.id,
      cep: endereco.cep || "",
      rua: endereco.rua || "",
      numero: endereco.numero || "",
      complemento: endereco.complemento || "",
      bairro: endereco.bairro || "",
      cidade: endereco.cidade || "",
      estado: endereco.estado || "",
    });
  }

  function handleSalvar() {
    if (
      !form.cep ||
      !form.rua ||
      !form.numero ||
      !form.bairro ||
      !form.cidade ||
      !form.estado
    ) {
      alert("Preencha os campos obrigatórios.");
      return;
    }

    if (form.id) {
      setEnderecos((prev) =>
        prev.map((endereco) =>
          endereco.id === form.id ? { ...form } : endereco,
        ),
      );
    } else {
      const novoEndereco = {
        ...form,
        id: Date.now(),
      };

      setEnderecos((prev) => [...prev, novoEndereco]);
    }

    if (onSalvar) {
      onSalvar(form);
    }

    limparFormulario();
  }

  function handleExcluir(id) {
    if (id === enderecoAtualId) {
      alert("Você não pode excluir o endereço atualmente selecionado.");
      return;
    }

    setEnderecos((prev) => prev.filter((endereco) => endereco.id !== id));

    if (onExcluir) {
      onExcluir(id);
    }

    if (form.id === id) {
      limparFormulario();
    }
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
              transition-all
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="grid lg:grid-cols-[380px_1fr] h-[calc(85vh-90px)]">
          {/* FORMULÁRIO */}
          <div className="border-r border-[#ece7e2] p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-medium text-[#3d2b1f]">
                {form.id ? "Editar Endereço" : "Novo Endereço"}
              </h3>

              <button
                onClick={limparFormulario}
                className="
                  w-10 h-10
                  rounded-xl
                  bg-[#c9a46c]
                  text-white
                  flex items-center justify-center
                  hover:bg-[#b89258]
                  transition-all
                "
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <Input
                label="CEP"
                name="cep"
                value={form.cep}
                onChange={handleChange}
              />

              <Input
                label="Rua"
                name="rua"
                value={form.rua}
                onChange={handleChange}
              />

              <Input
                label="Número"
                name="numero"
                value={form.numero}
                onChange={handleChange}
              />

              <Input
                label="Complemento"
                name="complemento"
                value={form.complemento}
                onChange={handleChange}
              />

              <Input
                label="Bairro"
                name="bairro"
                value={form.bairro}
                onChange={handleChange}
              />

              <Input
                label="Cidade"
                name="cidade"
                value={form.cidade}
                onChange={handleChange}
              />

              <Input
                label="Estado"
                name="estado"
                value={form.estado}
                onChange={handleChange}
              />

              <button
                onClick={handleSalvar}
                className="
                  w-full
                  mt-6
                  bg-[#c9a46c]
                  hover:bg-[#b89258]
                  text-white
                  py-4
                  rounded-2xl
                  transition-all
                  font-medium
                "
              >
                {form.id ? "Salvar Alterações" : "Adicionar Endereço"}
              </button>
            </div>
          </div>

          {/* CARDS */}
          <div className="p-8 overflow-y-auto">
            <h3 className="text-xl font-medium text-[#3d2b1f] mb-6">
              Endereços Cadastrados
            </h3>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {enderecos.map((endereco) => (
                <div
                  key={endereco.id}
                  className="
                    bg-[#faf8f6]
                    border border-[#ece7e2]
                    rounded-3xl
                    p-5
                    hover:shadow-md
                    transition-all
                    flex flex-col
                    min-h-52
                  "
                >
                  <div className="flex items-start gap-3 flex-1">
                    <MapPin size={20} className="text-[#c9a46c] mt-1" />

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-[#3d2b1f]">
                          {endereco.rua}, {endereco.numero}
                        </h4>

                        {enderecoAtualId === endereco.id && (
                          <span
                            className="
                              flex items-center gap-1
                              text-xs
                              bg-green-100
                              text-green-700
                              px-2 py-1
                              rounded-full
                            "
                          >
                            <CheckCircle size={12} />
                            Atual
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-500 mt-3">
                        {endereco.bairro}
                      </p>

                      <p className="text-sm text-gray-500">
                        {endereco.cidade} - {endereco.estado}
                      </p>

                      <p className="text-sm text-gray-500">
                        CEP {endereco.cep}
                      </p>

                      {endereco.complemento && (
                        <p className="text-sm text-gray-500 mt-2">
                          {endereco.complemento}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-auto pt-5">
                    {enderecoAtualId === endereco.id ? (
                      <button
                        disabled
                        className="
                          flex-1
                          py-3
                          rounded-xl
                          bg-green-50
                          border border-green-200
                          text-green-700
                          font-medium
                        "
                      >
                        Selecionado
                      </button>
                    ) : (
                      <button
                        onClick={() => selecionarEndereco(endereco)}
                        className="
                          flex-1
                          py-3
                          rounded-xl
                          border border-[#c9a46c]
                          text-[#c9a46c]
                          font-medium
                          hover:bg-[#c9a46c]
                          hover:text-white
                          transition-all
                        "
                      >
                        Selecionar
                      </button>
                    )}

                    <button
                      onClick={() => handleExcluir(endereco.id)}
                      disabled={enderecoAtualId === endereco.id}
                      className={`
                        w-12 h-12
                        rounded-xl
                        flex items-center justify-center
                        transition-all

                        ${
                          enderecoAtualId === endereco.id
                            ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                            : "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white"
                        }
                      `}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {enderecos.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                Nenhum endereço cadastrado.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm text-gray-500 mb-2">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="
          w-full
          border border-[#ece7e2]
          rounded-2xl
          px-4 py-3
          focus:outline-none
          focus:border-[#c9a46c]
        "
      />
    </div>
  );
}
