import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { cadastrarTurma, editarTurma } from "../service/turmas";

export default function TurmaModal({
  aberto,
  fecharModal,
  turmaSelecionada,
  onSuccess,
  cursos = [],
  enderecos = [],
}) {
  const editando = !!turmaSelecionada;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    cursoAtivo: true,
    dataInicio: "",
    dataEncerramento: "",
    preco: "",
    qtdVagas: "",
    cursoId: "",
    enderecoId: "",
  });

  useEffect(() => {
    if (turmaSelecionada) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        nome: turmaSelecionada.nome || "",
        cursoAtivo: turmaSelecionada.cursoAtivo ?? true,
        dataInicio: turmaSelecionada.dataInicio || "",
        dataEncerramento: turmaSelecionada.dataEncerramento || "",
        preco: turmaSelecionada.preco || "",
        qtdVagas: turmaSelecionada.qtdVagas || "",
        cursoId: turmaSelecionada.cursoId || "",
        enderecoId: turmaSelecionada.enderecoId || "",
      });
    } else {
      setForm({
        nome: "",
        cursoAtivo: true,
        dataInicio: "",
        dataEncerramento: "",
        preco: "",
        qtdVagas: "",
        cursoId: "",
        enderecoId: "",
      });
    }
  }, [turmaSelecionada]);

  async function handleSalvar() {
    try {
      setLoading(true);

      const payload = {
        nome: form.nome,
        curso_ativo: form.cursoAtivo,
        data_inicio: form.dataInicio,
        data_encerramento: form.dataEncerramento,
        preco: Number(form.preco),
        qtd_vagas: Number(form.qtdVagas),
        curso_id: Number(form.cursoId),
        endereco_id: Number(form.enderecoId),
      };

      const id = turmaSelecionada?.id || turmaSelecionada?.turmaId;

      if (editando) {
        await editarTurma(id, payload);
      } else {
        await cadastrarTurma(payload);
      }

      if (onSuccess) onSuccess();
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar turma:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  }

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">

      <div className="w-full max-w-5xl max-h-[92vh] bg-white rounded-[2.5rem] border border-[#ece7e2] shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#ece7e2]">

          <div>
            <h2 className="text-3xl font-light text-[#3d2b1f]">
              {editando ? "Editar Turma" : "Nova Turma"}
            </h2>

            <p className="text-gray-500 mt-1">
              {editando
                ? "Atualize as informações da turma"
                : "Preencha os dados da turma"}
            </p>
          </div>

          <button
            onClick={fecharModal}
            className="w-12 h-12 rounded-2xl bg-[#faf8f6] border border-[#ece7e2] flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500"
          >
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-8 overflow-y-auto max-h-[75vh]">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* NOME */}
            <Input
              label="Nome da turma"
              value={form.nome}
              onChange={(e) =>
                setForm({ ...form, nome: e.target.value })
              }
            />

            {/* STATUS */}
            <div>
              <label className="text-sm text-gray-500 mb-2 block">
                Status
              </label>

              <select
                value={form.cursoAtivo}
                onChange={(e) =>
                  setForm({
                    ...form,
                    cursoAtivo: e.target.value === "true",
                  })
                }
                className="w-full border border-[#ece7e2] rounded-2xl px-5 py-4"
              >
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </select>
            </div>

            {/* CURSO */}
            <div>
              <label className="text-sm text-gray-500 mb-2 block">
                Curso
              </label>

              <select
                value={form.cursoId}
                onChange={(e) =>
                  setForm({ ...form, cursoId: e.target.value })
                }
                className="w-full border border-[#ece7e2] rounded-2xl px-5 py-4"
              >
                <option value="">Selecione um curso</option>

                {cursos.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* ENDEREÇO */}
            <div>
              <label className="text-sm text-gray-500 mb-2 block">
                Endereço
              </label>

              <select
                value={form.enderecoId}
                onChange={(e) =>
                  setForm({ ...form, enderecoId: e.target.value })
                }
                className="w-full border border-[#ece7e2] rounded-2xl px-5 py-4"
              >
                <option value="">Selecione um endereço</option>

                {enderecos.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nome || e.rua || `Endereço ${e.id}`}
                  </option>
                ))}
              </select>
            </div>

            {/* DATA INÍCIO */}
            <Input
              type="date"
              label="Data de início"
              value={form.dataInicio}
              onChange={(e) =>
                setForm({ ...form, dataInicio: e.target.value })
              }
            />

            {/* DATA ENCERRAMENTO */}
            <Input
              type="date"
              label="Data de encerramento"
              value={form.dataEncerramento}
              onChange={(e) =>
                setForm({
                  ...form,
                  dataEncerramento: e.target.value,
                })
              }
            />

            {/* PREÇO */}
            <Input
              label="Preço"
              value={form.preco}
              onChange={(e) =>
                setForm({ ...form, preco: e.target.value })
              }
            />

            {/* VAGAS */}
            <Input
              label="Quantidade de vagas"
              value={form.qtdVagas}
              onChange={(e) =>
                setForm({ ...form, qtdVagas: e.target.value })
              }
            />
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-4 mt-10">

            <button
              onClick={fecharModal}
              className="px-6 py-3 rounded-2xl border border-[#ece7e2]"
            >
              Cancelar
            </button>

            <button
              onClick={handleSalvar}
              disabled={loading}
              className="bg-[#c9a46c] text-white px-8 py-4 rounded-2xl"
            >
              {loading
                ? "Salvando..."
                : editando
                ? "Salvar alterações"
                : "Salvar turma"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

/* INPUT PADRÃO */
function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-sm text-gray-500 mb-2 block">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border border-[#ece7e2] rounded-2xl px-5 py-4"
      />
    </div>
  );
}