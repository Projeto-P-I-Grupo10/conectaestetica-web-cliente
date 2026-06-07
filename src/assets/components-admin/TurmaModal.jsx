import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { cadastrarTurma, editarTurma } from "../service/turmas";

/* =========================
   MÁSCARA DE MOEDA
========================= */

function formatarMoeda(valor) {
  if (!valor) return "";

  const numero = valor.toString().replace(/\D/g, "");

  return (Number(numero) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function limparMoeda(valor) {
  return Number(valor.toString().replace(/\D/g, "")) / 100;
}

/* =========================
   COMPONENTE
========================= */

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
    porcentagemLucro: "10",
    cursoId: "",
    enderecoId: "",
  });

  useEffect(() => {
    if (editando && turmaSelecionada) {
      const turma =
        typeof turmaSelecionada === "object"
          ? turmaSelecionada
          : null;

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        nome: turma?.nome || "",
        cursoAtivo: turma?.cursoAtivo ?? true,

        dataInicio: turma?.dataInicio
          ? turma.dataInicio.slice(0, 16)
          : "",

        dataEncerramento: turma?.dataEncerramento
          ? turma.dataEncerramento.slice(0, 16)
          : "",

        // 🔥 converte para centavos para máscara funcionar
        preco: turma?.preco
          ? String(Math.round(Number(turma.preco) * 100))
          : "",

        qtdVagas: turma?.qtdVagas
          ? String(turma.qtdVagas)
          : "",

        porcentagemLucro: turma?.porcentagemLucro
          ? String(Number(turma.porcentagemLucro) * 100)
          : "10",

        cursoId: turma?.cursoId
          ? String(turma.cursoId)
          : "",

        enderecoId: turma?.enderecoId
          ? String(turma.enderecoId)
          : "",
      });

      return;
    }

    setForm({
      nome: "",
      cursoAtivo: true,
      dataInicio: "",
      dataEncerramento: "",
      preco: "",
      qtdVagas: "",
      porcentagemLucro: "10",
      cursoId: "",
      enderecoId: "",
    });
  }, [turmaSelecionada, aberto, editando]);

  async function handleSalvar() {
    try {
      if (!form.nome.trim()) return alert("Informe o nome da turma.");
      if (!form.cursoId) return alert("Selecione um curso.");
      if (!editando && !form.enderecoId)
        return alert("Selecione um endereço.");
      if (!form.dataInicio)
        return alert("Informe a data de início.");
      if (!form.dataEncerramento)
        return alert("Informe a data de encerramento.");
      if (!form.porcentagemLucro)
        return alert("Informe a porcentagem de lucro.");

      setLoading(true);

      const payload = {
        nome: form.nome,
        dataInicio: form.dataInicio,
        dataEncerramento: form.dataEncerramento,

        preco: limparMoeda(form.preco),
        qtdVagas: Number(form.qtdVagas || 0),

        cursoAtivo: form.cursoAtivo,
        cursoId: Number(form.cursoId),
        enderecoId: Number(form.enderecoId),

        porcentagemLucro:
          Number(form.porcentagemLucro || 0) / 100,
      };

      if (editando) {
        await editarTurma(turmaSelecionada.id || turmaSelecionada, payload);
      } else {
        await cadastrarTurma(payload);
      }

      onSuccess?.();
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
              label="Nome da Turma"
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
                value={String(form.cursoAtivo)}
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
                {cursos.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    {curso.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* ENDEREÇO */}
            {!editando && (
              <div>
                <label className="text-sm text-gray-500 mb-2 block">
                  Endereço
                </label>

                <select
                  value={form.enderecoId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      enderecoId: e.target.value,
                    })
                  }
                  className="w-full border border-[#ece7e2] rounded-2xl px-5 py-4"
                >
                  <option value="">Selecione um endereço</option>
                  {enderecos.map((endereco) => (
                    <option key={endereco.id} value={endereco.id}>
                      {endereco.rua}, {endereco.numero} -{" "}
                      {endereco.cidade}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* DATA INICIO */}
            <Input
              type="datetime-local"
              label="Data de Início"
              value={form.dataInicio}
              onChange={(e) =>
                setForm({
                  ...form,
                  dataInicio: e.target.value,
                })
              }
            />

            {/* DATA FIM */}
            <Input
              type="datetime-local"
              label="Data de Encerramento"
              value={form.dataEncerramento}
              onChange={(e) =>
                setForm({
                  ...form,
                  dataEncerramento: e.target.value,
                })
              }
            />

            {/* PREÇO (COM MÁSCARA) */}
            <div>
              <label className="text-sm text-gray-500 mb-2 block">
                Preço
              </label>

              <input
                value={formatarMoeda(form.preco)}
                onChange={(e) => {
                  const apenasNumeros =
                    e.target.value.replace(/\D/g, "");

                  setForm({
                    ...form,
                    preco: apenasNumeros,
                  });
                }}
                className="w-full border border-[#ece7e2] rounded-2xl px-5 py-4"
              />
            </div>

            {/* VAGAS */}
            <Input
              type="number"
              label="Quantidade de Vagas"
              value={form.qtdVagas}
              onChange={(e) =>
                setForm({
                  ...form,
                  qtdVagas: e.target.value,
                })
              }
            />

            {/* LUCRO */}
            <Input
              type="number"
              label="Porcentagem de Lucro (%)"
              value={form.porcentagemLucro}
              onChange={(e) =>
                setForm({
                  ...form,
                  porcentagemLucro: e.target.value,
                })
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
                ? "Salvar Alterações"
                : "Salvar Turma"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* INPUT */
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