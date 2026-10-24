import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Swal from "sweetalert2";

/* RECURSOS QUE O ADMIN PODE ACESSAR */
const RECURSOS = [
  {
    chave: "administradores",
    titulo: "Administradores",
    descricao: "Usuários com acesso administrativo à plataforma.",
  },
  {
    chave: "cursos",
    titulo: "Cursos",
    descricao: "Cursos cadastrados na plataforma.",
  },
];

/* PERMISSÕES DO CRUD */
const ACOES = [
  { chave: "criar", label: "Criar" },
  { chave: "ler", label: "Visualizar" },
  { chave: "editar", label: "Editar" },
  { chave: "excluir", label: "Excluir" },
];

function permissoesVazias() {
  const permissoes = {};

  RECURSOS.forEach((recurso) => {
    permissoes[recurso.chave] = {};

    ACOES.forEach((acao) => {
      permissoes[recurso.chave][acao.chave] = false;
    });
  });

  return permissoes;
}

function formVazio() {
  return {
    nome: "",
    email: "",
    senha: "",
    ativo: true,
    permissoes: permissoesVazias(),
  };
}

export default function AdminModal({
  aberto,
  fecharModal,
  adminSelecionado,
  onSalvar,
}) {
  const editando = !!adminSelecionado;

  const [etapa, setEtapa] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(formVazio());

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEtapa(1);

    if (editando && adminSelecionado) {
      const base = permissoesVazias();

      // junta as permissões salvas com o modelo vazio (evita campos faltando)
      RECURSOS.forEach((recurso) => {
        base[recurso.chave] = {
          ...base[recurso.chave],
          ...(adminSelecionado.permissoes?.[recurso.chave] || {}),
        };
      });

      setForm({
        nome: adminSelecionado.nome || "",
        email: adminSelecionado.email || "",
        senha: "",
        ativo: adminSelecionado.ativo ?? true,
        permissoes: base,
      });

      return;
    }

    /* RESET CRIAÇÃO */
    setForm(formVazio());
  }, [adminSelecionado, aberto, editando]);

  function alternarPermissao(recurso, acao) {
    setForm((atual) => ({
      ...atual,
      permissoes: {
        ...atual.permissoes,
        [recurso]: {
          ...atual.permissoes[recurso],
          [acao]: !atual.permissoes[recurso][acao],
        },
      },
    }));
  }

  function avancar() {
    if (!form.nome.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Nome obrigatório",
        text: "Informe o nome do administrador.",
        confirmButtonColor: "#c9a46c",
      });
    }

    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      return Swal.fire({
        icon: "warning",
        title: "E-mail inválido",
        text: "Informe um e-mail válido.",
        confirmButtonColor: "#c9a46c",
      });
    }

    if (!editando && !form.senha) {
      return Swal.fire({
        icon: "warning",
        title: "Senha obrigatória",
        text: "Informe uma senha para o novo administrador.",
        confirmButtonColor: "#c9a46c",
      });
    }

    setEtapa(2);
  }

  async function handleSalvar() {
    try {
      setLoading(true);

      // TODO: trocar por chamada ao back-end (cadastrarAdmin / editarAdmin)
      onSalvar?.({
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        ativo: form.ativo,
        role: "ADMIN",
        permissoes: form.permissoes,
      });

      Swal.fire({
        icon: "success",
        title: editando ? "Administrador atualizado" : "Administrador cadastrado",
        text: editando
          ? "As alterações foram salvas com sucesso."
          : "O administrador foi cadastrado com sucesso.",
        timer: 1800,
        showConfirmButton: false,
      });

      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar administrador:", error?.response?.data || error);

      const erros = error?.response?.data;

      const mensagens =
        erros && typeof erros === "object"
          ? Object.values(erros)
          : ["Não foi possível salvar o administrador."];

      Swal.fire({
        icon: "error",
        title: "Erro ao salvar",
        html: mensagens.join("<br>"),
        confirmButtonColor: "#c9a46c",
      });
    } finally {
      setLoading(false);
    }
  }

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="w-full max-w-3xl max-h-[92vh] bg-white rounded-[2.5rem] border border-[#ece7e2] shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#ece7e2]">
          <div>
            <h2 className="text-3xl font-light text-[#3d2b1f]">
              {editando ? "Editar Administrador" : "Novo Administrador"}
            </h2>

            <p className="text-gray-500 mt-1">
              Etapa {etapa} de 2 —{" "}
              {etapa === 1 ? "Dados do administrador" : "Permissões de acesso"}
            </p>
          </div>

          <button
            onClick={fecharModal}
            className="w-12 h-12 rounded-2xl bg-[#faf8f6] border border-[#ece7e2] flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500"
          >
            <X size={22} />
          </button>
        </div>

        {/* INDICADOR DE ETAPAS */}
        <div className="flex gap-2 px-8 pt-6">
          <div className="h-1.5 flex-1 rounded-full bg-[#c9a46c]" />
          <div
            className={`h-1.5 flex-1 rounded-full ${
              etapa === 2 ? "bg-[#c9a46c]" : "bg-[#ece7e2]"
            }`}
          />
        </div>

        {/* BODY */}
        <div className="p-8 overflow-y-auto max-h-[65vh]">
          {/* ETAPA 1 - DADOS */}
          {etapa === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nome"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />

              <Input
                type="email"
                label="E-mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <Input
                type="password"
                label={editando ? "Nova senha (opcional)" : "Senha"}
                value={form.senha}
                onChange={(e) => setForm({ ...form, senha: e.target.value })}
              />

              <div>
                <label className="text-sm text-gray-500 mb-2 block">
                  Status
                </label>

                <select
                  value={String(form.ativo)}
                  onChange={(e) =>
                    setForm({ ...form, ativo: e.target.value === "true" })
                  }
                  className="w-full border border-[#ece7e2] rounded-2xl px-5 py-4"
                >
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              </div>
            </div>
          )}

          {/* ETAPA 2 - PERMISSÕES */}
          {etapa === 2 && (
            <div className="space-y-6">
              {RECURSOS.map((recurso) => (
                <div
                  key={recurso.chave}
                  className="border border-[#ece7e2] rounded-3xl p-6 bg-[#faf8f6]"
                >
                  <h3 className="text-lg font-medium text-[#3d2b1f]">
                    {recurso.titulo}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1 mb-5">
                    {recurso.descricao}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {ACOES.map((acao) => (
                      <label
                        key={acao.chave}
                        className="flex items-center gap-3 bg-white border border-[#ece7e2] rounded-2xl px-4 py-3 cursor-pointer hover:border-[#c9a46c] transition"
                      >
                        <input
                          type="checkbox"
                          checked={form.permissoes[recurso.chave][acao.chave]}
                          onChange={() =>
                            alternarPermissao(recurso.chave, acao.chave)
                          }
                          className="w-5 h-5 accent-[#c9a46c]"
                        />

                        <span className="text-[#3d2b1f]">{acao.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FOOTER */}
          <div className="flex justify-between gap-4 mt-10">
            {etapa === 1 ? (
              <button
                onClick={fecharModal}
                className="px-6 py-3 rounded-2xl border border-[#ece7e2]"
              >
                Cancelar
              </button>
            ) : (
              <button
                onClick={() => setEtapa(1)}
                className="px-6 py-3 rounded-2xl border border-[#ece7e2]"
              >
                Voltar
              </button>
            )}

            {etapa === 1 ? (
              <button
                onClick={avancar}
                className="bg-[#c9a46c] text-white px-8 py-4 rounded-2xl"
              >
                Próximo
              </button>
            ) : (
              <button
                onClick={handleSalvar}
                disabled={loading}
                className="bg-[#c9a46c] text-white px-8 py-4 rounded-2xl"
              >
                {loading
                  ? "Salvando..."
                  : editando
                    ? "Salvar Alterações"
                    : "Salvar Administrador"}
              </button>
            )}
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
      <label className="text-sm text-gray-500 mb-2 block">{label}</label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border border-[#ece7e2] rounded-2xl px-5 py-4"
      />
    </div>
  );
}