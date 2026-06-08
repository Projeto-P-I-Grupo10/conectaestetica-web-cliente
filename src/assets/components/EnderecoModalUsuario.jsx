import { useEffect, useState } from "react";
import { X, Plus, MapPin, Trash2, CheckCircle } from "lucide-react";
import {
  cadastrarEndereco,
  deletarEndereco,
  editarEndereco,
  listarEnderecosPorUsuario,
  selecionarEnderecoAtual,
} from "../service/enderecoUsuario";

export default function EnderecoModalUsuario({
  aberto,
  fecharModal,
  onSalvar,
  onExcluir,
}) {
  const [enderecos, setEnderecos] = useState([]);

  const [enderecoAtualId, setEnderecoAtualId] = useState(null);

  const [form, setForm] = useState({
    id: null,
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
  });
  const usuarioId = Number(sessionStorage.getItem("idUsuario"));
  console.log(
    "usuarioId do sessionStorage:",
    sessionStorage.getItem("idUsuario"),
  );

  useEffect(() => {
    if (aberto && usuarioId) {
      listarEnderecosPorUsuario(usuarioId).then((lista) => {
        setEnderecos(lista);

        const atual = lista.find((e) => e.enderecoAtual === true);
        if (atual) {
          setEnderecoAtualId(atual.id);
          setForm({
            id: atual.id,
            cep: atual.cep || "",
            rua: atual.rua || "",
            numero: atual.numero || "",
            complemento: atual.complemento || "",
            bairro: atual.bairro || "",
            cidade: atual.cidade || "",
            uf: atual.uf || "",
          });
        }
      });
    }
  }, [aberto, usuarioId]);

  function aplicarMascaraCep(valor) {
    const numeros = valor.replace(/\D/g, "").slice(0, 8);

    if (numeros.length <= 5) {
      return numeros;
    }

    return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
  }

  async function buscarCep(cep) {
    try {
      const cepLimpo = cep.replace(/\D/g, "");

      if (cepLimpo.length !== 8) return;

      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`,
      );

      const data = await response.json();

      if (data.erro) {
        return;
      }

      setForm((prev) => ({
        ...prev,
        rua: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        uf: data.uf || "",
      }));
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "cep") {
      const cepFormatado = aplicarMascaraCep(value);

      setForm((prev) => ({
        ...prev,
        cep: cepFormatado,
      }));

      const cepLimpo = cepFormatado.replace(/\D/g, "");

      if (cepLimpo.length === 8) {
        buscarCep(cepLimpo);
      }

      return;
    }

    if (name === "uf") {
      setForm((prev) => ({
        ...prev,
        uf: value.toUpperCase().slice(0, 2),
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      uf: "",
    });
  }

  async function selecionarEndereco(endereco) {
    const atualizado = await selecionarEnderecoAtual(endereco.id);

    setEnderecoAtualId(atualizado.id);

    listarEnderecosPorUsuario(usuarioId).then(setEnderecos);

    setForm({
      id: atualizado.id,
      cep: atualizado.cep || "",
      rua: atualizado.rua || "",
      numero: atualizado.numero || "",
      complemento: atualizado.complemento || "",
      bairro: atualizado.bairro || "",
      cidade: atualizado.cidade || "",
      uf: atualizado.uf || "",
    });

    if (onSalvar) {
      onSalvar(atualizado);
    }
  }

  async function handleSalvar() {
    if (
      !form.cep.replace(/\D/g, "") ||
      !form.rua ||
      !form.numero ||
      !form.bairro ||
      !form.cidade ||
      !form.uf
    ) {
      alert("Preencha os campos obrigatórios.");
      return;
    }

    if (form.id) {
      const atualizado = await editarEndereco(form.id, {
        ...form,
        cep: form.cep.replace(/\D/g, ""),
        usuarioId,
      });
      setEnderecos((prev) =>
        prev.map((endereco) =>
          endereco.id === form.id ? atualizado : endereco,
        ),
      );
    } else {
      const novo = await cadastrarEndereco({
        ...form,
        cep: form.cep.replace(/\D/g, ""),
        usuarioId,
      });
      setEnderecos((prev) => [...prev, novo]);
    }

    const cepLimpo = form.cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      alert("CEP inválido.");
      return;
    }

    if (onSalvar) {
      onSalvar(form);
    }

    limparFormulario();
  }

  async function handleExcluir(id) {
    await deletarEndereco(id);
    setEnderecos((prev) => prev.filter((endereco) => endereco.id !== id));
    if (form.id === id) limparFormulario();

    if (onExcluir) {
      onExcluir(id);
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
                label="Cidade"
                name="cidade"
                value={form.cidade}
                onChange={handleChange}
              />

              <Input
                label="uf"
                name="uf"
                value={form.uf}
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
              {enderecos.map((endereco, index) => (
                <div
                  key={endereco.id ?? index}
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
                        {endereco.cidade} - {endereco.uf}
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
