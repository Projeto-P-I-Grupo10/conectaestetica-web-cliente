import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Swal from "sweetalert2";

import { cadastrarProfessor, editarProfessor } from "../service/professor";

function normalizeProfessor(prof) {
  return {
    id: prof.id || prof.professorId,

    nome: prof.nome || prof.professorNome,
    descricao: prof.descricao || prof.professorDescricao,
    email: prof.email || prof.professorEmail,
    foto: prof.foto || prof.professorFoto,
    redesocial: prof.redesocial || prof.professorRedeSocial,
  };
}

export default function ProfessorModal({
  aberto,
  fecharModal,
  professorSelecionado,
  onSuccess,
}) {
  const editando = !!professorSelecionado;

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    email: "",
    foto: "",
    redesocial: "",
  });

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setForm({
      nome: "",
      descricao: "",
      email: "",
      foto: "",
      redesocial: "",
    });
  };

  useEffect(() => {
    if (professorSelecionado) {
      const prof = normalizeProfessor(professorSelecionado);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        nome: prof.nome,
        descricao: prof.descricao,
        email: prof.email,
        foto: prof.foto,
        redesocial: prof.redesocial,
      });
    } else {
      resetForm();
    }
  }, [professorSelecionado]);

  async function handleSalvarProfessor() {
    try {
      if (!form.nome.trim()) {
        return Swal.fire({
          icon: "warning",
          title: "Nome obrigatório",
          text: "Informe o nome do professor.",
          confirmButtonColor: "#c9a46c",
        });
      }

      if (!form.email.trim()) {
        return Swal.fire({
          icon: "warning",
          title: "Email obrigatório",
          text: "Informe o email do professor.",
          confirmButtonColor: "#c9a46c",
        });
      }

      if (!form.descricao.trim()) {
        return Swal.fire({
          icon: "warning",
          title: "Descrição obrigatória",
          text: "Informe uma descrição para o professor.",
          confirmButtonColor: "#c9a46c",
        });
      }

      setLoading(true);

      const payload = {
        nome: form.nome,
        descricao: form.descricao,
        email: form.email,
        foto: form.foto,
        redesocial: form.redesocial,
      };

      const professorId = professorSelecionado
        ? normalizeProfessor(professorSelecionado).id
        : null;

      if (editando) {
        await editarProfessor(professorId, payload);
      } else {
        await cadastrarProfessor(payload);
      }

      Swal.fire({
        icon: "success",
        title: editando ? "Professor atualizado" : "Professor cadastrado",
        text: editando
          ? "As alterações foram salvas com sucesso."
          : "O professor foi cadastrado com sucesso.",
        timer: 1800,
        showConfirmButton: false,
      });

      if (onSuccess) {
        await onSuccess();
      }

      fecharModal();
    } catch (error) {
      console.error(
        "Erro ao salvar professor:",
        error?.response?.data || error,
      );

      Swal.fire({
        icon: "error",
        title: "Erro ao salvar",
        text:
          error?.response?.data?.message ||
          error?.response?.data?.erro ||
          "Não foi possível salvar o professor.",
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
              {editando ? "Editar Professor" : "Novo Professor"}
            </h2>

            <p className="text-gray-500 mt-1">
              {editando
                ? "Atualize as informações do professor"
                : "Preencha as informações do professor"}
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
              label="Nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />

            {/* EMAIL */}
            <Input
              label="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            {/* FOTO */}
            <Input
              label="Foto (URL ou nome do arquivo)"
              value={form.foto}
              onChange={(e) => setForm({ ...form, foto: e.target.value })}
            />

            {/* REDESOCIAL */}
            <Input
              label="Rede Social"
              value={form.redesocial}
              onChange={(e) => setForm({ ...form, redesocial: e.target.value })}
            />

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
                className="w-full min-h-36 border border-[#ece7e2] rounded-2xl px-5 py-4"
              />
            </div>
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
              onClick={handleSalvarProfessor}
              disabled={loading}
              className="bg-[#c9a46c] text-white px-8 py-4 rounded-2xl"
            >
              {loading
                ? "Salvando..."
                : editando
                  ? "Salvar alterações"
                  : "Salvar professor"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* INPUT PADRÃO */
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
