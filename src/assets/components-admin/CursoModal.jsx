import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Swal from "sweetalert2";

import { listarProfessores } from "../service/professor";
import { listarAreas } from "../service/area";
import { cadastrarCursos, editarCursos } from "../service/cursos";

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
    area: "",
    descricao: "",
    imagem: "",
  });

  const [professores, setProfessores] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);

  function resetForm() {
    setForm({
      nome: "",
      professor: "",
      area: "",
      descricao: "",
      imagem: "",
    });
  }

  useEffect(() => {
    if (cursoSelecionado) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        nome: cursoSelecionado.nome || "",
        professor: String(cursoSelecionado.professorId || ""),
        area: String(cursoSelecionado.areaId || ""),
        descricao: cursoSelecionado.descricao || "",
        imagem: cursoSelecionado.imagem || "",
      });
    } else {
      resetForm();
    }
  }, [cursoSelecionado]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [professoresData, areasData] = await Promise.all([
          listarProfessores(),
          listarAreas(),
        ]);

        setProfessores(
          Array.isArray(professoresData)
            ? professoresData
            : professoresData?.professores || [],
        );

        setAreas(Array.isArray(areasData) ? areasData : areasData?.areas || []);
      } catch (error) {
        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Erro ao carregar dados",
          text: "Não foi possível carregar professores e áreas.",
          confirmButtonColor: "#c9a46c",
        });
      }
    }

    carregarDados();
  }, []);

  async function handleSalvarCurso() {
    try {
      if (!form.nome.trim()) {
        return Swal.fire({
          icon: "warning",
          title: "Nome obrigatório",
          text: "Informe o nome do curso.",
          confirmButtonColor: "#c9a46c",
        });
      }

      if (!form.professor) {
        return Swal.fire({
          icon: "warning",
          title: "Professor obrigatório",
          text: "Selecione um professor.",
          confirmButtonColor: "#c9a46c",
        });
      }

      if (!form.area) {
        return Swal.fire({
          icon: "warning",
          title: "Área obrigatória",
          text: "Selecione uma área.",
          confirmButtonColor: "#c9a46c",
        });
      }

      setLoading(true);

      const payload = {
        nome: form.nome,
        descricao: form.descricao,
        imagem: form.imagem,
        areaCursoId: Number(form.area),
        professorId: Number(form.professor),
      };

      if (editando) {
        await editarCursos(cursoSelecionado.id, payload);
      } else {
        await cadastrarCursos(payload);
      }

      Swal.fire({
        icon: "success",
        title: editando ? "Curso atualizado" : "Curso cadastrado",
        text: editando
          ? "As alterações foram salvas com sucesso."
          : "Curso cadastrado com sucesso.",
        timer: 1800,
        showConfirmButton: false,
      });

      onSuccess?.();
      fecharModal();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Erro ao salvar",
        text:
          error?.response?.data?.message ||
          error?.response?.data?.erro ||
          "Não foi possível salvar o curso.",
        confirmButtonColor: "#c9a46c",
      });
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
            <Input
              label="Nome do curso"
              value={form.nome}
              onChange={(e) =>
                setForm({
                  ...form,
                  nome: e.target.value,
                })
              }
            />

            <div>
              <label className="text-sm text-gray-500 mb-2 block">
                Professor
              </label>

              <select
                value={form.professor}
                onChange={(e) =>
                  setForm({
                    ...form,
                    professor: e.target.value,
                  })
                }
                className="w-full bg-[#faf8f6] border border-[#ece7e2] rounded-2xl px-5 py-4"
              >
                <option value="">Selecione um professor</option>

                {professores.map((professor) => (
                  <option key={professor.id} value={professor.id}>
                    {professor.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-500 mb-2 block">Área</label>

              <select
                value={form.area}
                onChange={(e) =>
                  setForm({
                    ...form,
                    area: e.target.value,
                  })
                }
                className="w-full bg-[#faf8f6] border border-[#ece7e2] rounded-2xl px-5 py-4"
              >
                <option value="">Selecione uma área</option>

                {areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-500 mb-2 block">
                Imagem do curso
              </label>

              <input
                value={form.imagem}
                onChange={(e) =>
                  setForm({
                    ...form,
                    imagem: e.target.value,
                  })
                }
                className="w-full border border-[#ece7e2] rounded-2xl px-5 py-4"
                placeholder="ex: botox.png"
              />

              {form.imagem && (
                <img
                  src={`/img/${form.imagem}`}
                  alt="preview"
                  className="mt-4 w-full h-64 object-cover rounded-2xl"
                />
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-500 mb-2 block">
                Descrição
              </label>

              <textarea
                value={form.descricao}
                onChange={(e) =>
                  setForm({
                    ...form,
                    descricao: e.target.value,
                  })
                }
                className="w-full min-h-36 border border-[#ece7e2] rounded-2xl px-5 py-4"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-10">
            <button
              onClick={fecharModal}
              className="px-6 py-3 rounded-2xl border border-[#ece7e2]"
            >
              Cancelar
            </button>

            <button
              onClick={handleSalvarCurso}
              disabled={loading}
              className="bg-[#c9a46c] hover:bg-[#b89258] text-white px-8 py-4 rounded-2xl transition"
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
        className="w-full border border-[#ece7e2] rounded-2xl px-5 py-4"
      />
    </div>
  );
}
