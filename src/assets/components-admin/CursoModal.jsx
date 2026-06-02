import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { listarProfessores } from "../service/professor";
import { cadastrarCursos, editarCursos } from "../service/cursos";

function normalizeCurso(curso) {
  return {
    id: curso.id || curso.cursoId,

    nome: curso.nome || curso.cursoNome,
    descricao: curso.descricao || curso.cursoDescricao,
    imagem: curso.imagem || curso.cursoImagem,

    professor: {
      id: curso.professor?.id || curso.professorId || "",
      nome: curso.professor?.nome || curso.professorNome || "",
    },

    area: {
      id: curso.area?.id || curso.areaId || "",
      nome: curso.area?.nome || curso.areaNome || "",
    },
  };
}

export default function CursoModal({
  aberto,
  fecharModal,
  cursoSelecionado,
  onSuccess,
}) {
  const editando = !!cursoSelecionado;

  const [form, setForm] = useState({
    nome: "",
    professor: "",
    descricao: "",
    imagem: "",
  });

  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setForm({
      nome: "",
      professor: "",
      descricao: "",
      imagem: "",
    });
  };

  useEffect(() => {
    if (cursoSelecionado) {
      const curso = normalizeCurso(cursoSelecionado);

      setForm({
        nome: curso.nome,
        professor: curso.professor.id,
        descricao: curso.descricao,
        imagem: curso.imagem,
      });
    } else {
      resetForm();
    }
  }, [cursoSelecionado]);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await listarProfessores();
        setProfessores(data);
      } catch (err) {
        console.error("Erro ao listar professores:", err);
      }
    }

    carregar();
  }, []);

  async function handleSalvarCurso() {
    try {
      setLoading(true);

      const payload = {
        nome: form.nome,
        descricao: form.descricao,
        imagem: form.imagem, 
        areaCursoId: 1,
        professorId: Number(form.professor),
      };

      const cursoId = cursoSelecionado
        ? normalizeCurso(cursoSelecionado).id
        : null;

      if (editando) {
        await editarCursos(cursoId, payload);
      } else {
        await cadastrarCursos(payload);
      }

      if (onSuccess) onSuccess();
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar curso:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  }

  if (!aberto) return null;

  console.log(normalizeCurso)

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="w-full max-w-5xl max-h-[92vh] bg-white rounded-[2.5rem] border border-[#ece7e2] shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#ece7e2]">
          <div>
            <h2 className="text-3xl font-light text-[#3d2b1f]">
              {editando ? "Editar Curso" : "Novo Curso"}
            </h2>

            <p className="text-gray-500 mt-1">
              {editando
                ? "Atualize as informações do curso"
                : "Preencha as informações do curso"}
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
              label="Nome do curso"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />

            {/* PROFESSOR */}
            <div>
              <label className="text-sm text-gray-500 mb-2 block">
                Professor
              </label>

              <select
                value={form.professor}
                onChange={(e) =>
                  setForm({ ...form, professor: e.target.value })
                }
                className="w-full bg-[#faf8f6] border border-[#ece7e2] rounded-2xl px-5 py-4"
              >
                <option value="">Selecione um professor</option>

                {professores.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* IMAGEM (SIMPLES) */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-500 mb-2 block">
                Imagem do curso (ex: botox.png)
              </label>

              <input
                value={form.imagem}
                onChange={(e) => setForm({ ...form, imagem: e.target.value })}
                className="w-full border border-[#ece7e2] rounded-2xl px-5 py-4"
                placeholder="ex: botox.png"
              />

              {/* preview simples */}
              {form.imagem && (
                <img
                  src={`/img/${form.imagem}`}
                  alt="preview"
                  className="mt-4 w-full h-64 object-cover rounded-2xl"
                />
              )}
            </div>

            {/* DESCRIÇÃO */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-500 mb-2 block">
                Descrição
              </label>

              <textarea
                value={form.descricao}
                onChange={(e) =>
                  setForm({ ...form, descricao: e.target.value })
                }
                className="w-full min-h-36 border rounded-2xl px-5 py-4"
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-4 mt-10">
            <button onClick={fecharModal}>Cancelar</button>

            <button
              onClick={handleSalvarCurso}
              disabled={loading}
              className="bg-[#c9a46c] text-white px-8 py-4 rounded-2xl"
            >
              {loading
                ? "Salvando..."
                : editando
                  ? "Salvar alterações"
                  : "Salvar curso"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-500 mb-2 block">{label}</label>

      <input
        value={value}
        onChange={onChange}
        className="w-full border rounded-2xl px-5 py-4"
      />
    </div>
  );
}
