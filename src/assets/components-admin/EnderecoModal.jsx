import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Swal from "sweetalert2";

export default function EnderecoModal({
  aberto,
  fecharModal,
  enderecoSelecionado,
  onSuccess,
}) {
  const editando = !!enderecoSelecionado;

  const [form, setForm] = useState({
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    complemento: "",
  });

  useEffect(() => {
    if (enderecoSelecionado) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        rua: enderecoSelecionado.rua || "",
        numero: enderecoSelecionado.numero || "",
        bairro: enderecoSelecionado.bairro || "",
        cidade: enderecoSelecionado.cidade || "",
        estado: enderecoSelecionado.estado || "",
        cep: enderecoSelecionado.cep
          ? // eslint-disable-next-line react-hooks/immutability
            formatarCEP(enderecoSelecionado.cep)
          : "",
        complemento: enderecoSelecionado.complemento || "",
      });
    } else {
      setForm({
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
        complemento: "",
      });
    }
  }, [enderecoSelecionado]);

  function formatarCEP(valor) {
    const cep = valor.replace(/\D/g, "").slice(0, 8);

    if (cep.length <= 5) return cep;

    return cep.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");
  }

  async function buscarCEP(cep) {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) return;

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`,
      );

      const data = await response.json();

      if (data.erro) {
        return Swal.fire({
          icon: "warning",
          title: "CEP não encontrado",
          text: "Verifique o CEP informado.",
          confirmButtonColor: "#c9a46c",
        });
      }

      setForm((prev) => ({
        ...prev,
        rua: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
      }));
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Erro ao consultar CEP",
        text: "Não foi possível consultar o ViaCEP.",
        confirmButtonColor: "#c9a46c",
      });
    }
  }

  async function handleSalvar() {
    try {
      if (
        !form.rua.trim() ||
        !form.numero.trim() ||
        !form.bairro.trim() ||
        !form.cidade.trim() ||
        !form.estado.trim() ||
        !form.cep.trim()
      ) {
        return Swal.fire({
          icon: "warning",
          title: "Campos obrigatórios",
          text: "Preencha todos os campos obrigatórios.",
          confirmButtonColor: "#c9a46c",
        });
      }

      const cepLimpo = form.cep.replace(/\D/g, "");

      if (!/^\d{8}$/.test(cepLimpo)) {
        return Swal.fire({
          icon: "warning",
          title: "CEP inválido",
          text: "O CEP deve conter 8 dígitos numéricos.",
          confirmButtonColor: "#c9a46c",
        });
      }

      if (form.estado.trim().length !== 2) {
        return Swal.fire({
          icon: "warning",
          title: "Estado inválido",
          text: "Informe a sigla do estado com 2 letras (Ex: SP).",
          confirmButtonColor: "#c9a46c",
        });
      }

      if (onSuccess) {
        await onSuccess({
          ...form,
          cep: cepLimpo,
          estado: form.estado.toUpperCase(),
        });
      }

      Swal.fire({
        icon: "success",
        title: editando ? "Endereço atualizado" : "Endereço cadastrado",
        text: editando
          ? "As alterações foram salvas com sucesso."
          : "O endereço foi cadastrado com sucesso.",
        timer: 1800,
        showConfirmButton: false,
      });

      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar endereço:", error?.response?.data || error);

      Swal.fire({
        icon: "error",
        title: "Erro ao salvar",
        text:
          error?.response?.data?.message ||
          error?.response?.data?.erro ||
          "Não foi possível salvar o endereço.",
        confirmButtonColor: "#c9a46c",
      });
    }
  }

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] border border-[#ece7e2] shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#ece7e2]">
          <div>
            <h2 className="text-3xl font-light text-[#3d2b1f]">
              {editando ? "Editar Endereço" : "Novo Endereço"}
            </h2>

            <p className="text-gray-500 mt-1">
              {editando
                ? "Atualize os dados do endereço"
                : "Preencha os dados do novo endereço"}
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
              transition
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-8 overflow-y-auto max-h-[75vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="CEP"
              value={form.cep}
              onChange={(e) => {
                let valor = e.target.value.replace(/\D/g, "");

                valor = valor.slice(0, 8);

                if (valor.length > 5) {
                  valor = valor.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");
                }

                setForm({
                  ...form,
                  cep: valor,
                });
              }}
              onBlur={() => buscarCEP(form.cep)}
            />

            <Input
              label="Rua"
              value={form.rua}
              onChange={(e) => setForm({ ...form, rua: e.target.value })}
            />

            <Input
              label="Número"
              value={form.numero}
              onChange={(e) => setForm({ ...form, numero: e.target.value })}
            />

            <Input
              label="Bairro"
              value={form.bairro}
              onChange={(e) => setForm({ ...form, bairro: e.target.value })}
            />

            <Input
              label="Cidade"
              value={form.cidade}
              onChange={(e) => setForm({ ...form, cidade: e.target.value })}
            />

            <Input
              label="Estado"
              value={form.estado}
              onChange={(e) =>
                setForm({
                  ...form,
                  estado: e.target.value
                    .toUpperCase()
                    .replace(/[^A-Z]/g, "")
                    .slice(0, 2),
                })
              }
            />

            <div className="md:col-span-2">
              <Input
                label="Complemento"
                value={form.complemento}
                onChange={(e) =>
                  setForm({
                    ...form,
                    complemento: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-4 mt-10">
            <button
              onClick={fecharModal}
              className="
                px-6 py-3
                rounded-2xl
                border border-[#ece7e2]
                text-gray-600
                hover:bg-gray-50
                transition
              "
            >
              Cancelar
            </button>

            <button
              onClick={handleSalvar}
              className="
                bg-[#c9a46c]
                hover:bg-[#b89258]
                text-white
                px-8 py-4
                rounded-2xl
                transition-all
                hover:scale-[1.02]
                active:scale-[0.98]
              "
            >
              {editando ? "Salvar alterações" : "Cadastrar endereço"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* INPUT PADRÃO */
function Input({ label, value, onChange, onBlur, type = "text" }) {
  return (
    <div>
      <label className="text-sm text-gray-500 mb-2 block">{label}</label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="
          w-full
          border border-[#ece7e2]
          rounded-2xl
          px-5 py-4
          focus:outline-none
          focus:ring-2
          focus:ring-[#c9a46c]
          focus:border-transparent
        "
      />
    </div>
  );
}
