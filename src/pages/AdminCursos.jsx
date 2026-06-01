import { useState } from "react";

import { Plus, Pencil, Trash2, Search } from "lucide-react";

import SidebarAdmin from "../assets/components-admin/SidebarAdmin";
import CursoModal from "../assets/components-admin/CursoModal";
import DeleteModal from "../assets/components-admin/DeleteModal";

export default function AdminCursos() {
  // MOCK
  const [cursos] = useState([
    {
      id: 1,
      nome: "Skin Care Premium",
      professor: "Amanda Oliveira",
      preco: "R$ 497",
      status: true,

      imagem:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 2,
      nome: "Botox Avançado",
      professor: "Marcos Lima",
      preco: "R$ 697",
      status: true,

      imagem:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 3,
      nome: "Massoterapia",
      professor: "Camila Souza",
      preco: "R$ 397",
      status: false,

      imagem:
        "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop",
    },
  ]);

  const [modalAberto, setModalAberto] = useState(false);

  const [cursoSelecionado, setCursoSelecionado] = useState(null);

  // MODAL EXCLUIR
  const [DeleteModalAberto, setDeleteModalAberto] = useState(false);

  const [cursoExcluir, setCursoExcluir] = useState(null);

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <SidebarAdmin />

      <div className="ml-72 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div
            className="
              bg-white
              border
              border-[#ece7e2]
              rounded-[2.5rem]
              p-8
              shadow-sm
              mb-10
            "
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1
                  className="
                    text-4xl
                    font-light
                    text-[#3d2b1f]
                    mb-3
                  "
                >
                  Gerenciar Cursos
                </h1>

                <p className="text-gray-500 text-lg">
                  Controle todos os cursos da plataforma.
                </p>
              </div>

              {/* BOTÃO NOVO CURSO */}
              <button
                onClick={() => {
                  setCursoSelecionado(null);

                  setModalAberto(true);
                }}
                className="
                  bg-[#c9a46c]
                  hover:bg-[#b89258]
                  transition-all
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  text-white
                  px-6
                  py-4
                  rounded-2xl
                  flex
                  items-center
                  gap-3
                  shadow-sm
                  w-fit
                "
              >
                <Plus size={22} />

                <span className="font-medium">Novo Curso</span>
              </button>
            </div>
          </div>

          {/* BUSCA */}
          <div
            className="
              bg-white
              border
              border-[#ece7e2]
              rounded-4xl
              p-5
              mb-8
              shadow-sm
            "
          >
            <div
              className="
                flex
                items-center
                gap-4
                bg-[#faf8f6]
                border
                border-[#ece7e2]
                rounded-2xl
                px-5
                py-4
              "
            >
              <Search className="text-[#c9a46c]" size={22} />

              <input
                type="text"
                placeholder="Buscar cursos..."
                className="
                  bg-transparent
                  outline-none
                  w-full
                  text-[#3d2b1f]
                  placeholder:text-gray-400
                "
              />
            </div>
          </div>

          {/* TABELA */}
          <div
            className="
              bg-white
              border
              border-[#ece7e2]
              rounded-4xl
              shadow-sm
              overflow-hidden
            "
          >
            {/* HEADER TABELA */}
            <div
              className="
                grid
                grid-cols-[120px_1.5fr_1fr_180px_150px_180px]
                gap-4
                px-8
                py-5
                border-b
                border-[#ece7e2]
                bg-[#faf8f6]
              "
            >
              <span className="text-sm text-gray-500 font-medium">Imagem</span>

              <span className="text-sm text-gray-500 font-medium">Curso</span>

              <span className="text-sm text-gray-500 font-medium">
                Professor
              </span>

              <span className="text-sm text-gray-500 font-medium">Preço</span>

              <span className="text-sm text-gray-500 font-medium">Status</span>

              <span className="text-sm text-gray-500 font-medium">Ações</span>
            </div>

            {/* LINHAS */}
            <div>
              {cursos.map((curso) => (
                <div
                  key={curso.id}
                  className="
                    grid
                    grid-cols-[120px_1.5fr_1fr_180px_150px_180px]
                    gap-4
                    items-center
                    px-8
                    py-6
                    border-b
                    border-[#f3efea]
                    hover:bg-[#fcfbfa]
                    transition
                  "
                >
                  {/* IMAGEM */}
                  <img
                    src={curso.imagem}
                    alt={curso.nome}
                    className="
                      w-24
                      h-16
                      rounded-2xl
                      object-cover
                    "
                  />

                  {/* NOME */}
                  <div>
                    <h3 className="font-medium text-[#3d2b1f]">{curso.nome}</h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Curso profissional
                    </p>
                  </div>

                  {/* PROFESSOR */}
                  <span className="text-gray-600">{curso.professor}</span>

                  {/* PREÇO */}
                  <span className="font-medium text-[#3d2b1f]">
                    {curso.preco}
                  </span>

                  {/* STATUS */}
                  <div>
                    {curso.status ? (
                      <span
                        className="
                          bg-green-100
                          text-green-700
                          px-4
                          py-2
                          rounded-full
                          text-sm
                          font-medium
                        "
                      >
                        Ativo
                      </span>
                    ) : (
                      <span
                        className="
                          bg-red-100
                          text-red-600
                          px-4
                          py-2
                          rounded-full
                          text-sm
                          font-medium
                        "
                      >
                        Inativo
                      </span>
                    )}
                  </div>

                  {/* AÇÕES */}
                  <div className="flex items-center gap-3">
                    {/* EDITAR */}
                    <button
                      onClick={() => {
                        setCursoSelecionado(curso);

                        setModalAberto(true);
                      }}
                      className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-[#faf8f6]
                        border
                        border-[#ece7e2]
                        flex
                        items-center
                        justify-center
                        text-[#c9a46c]
                        hover:bg-[#c9a46c]
                        hover:text-white
                        transition-all
                        hover:scale-[1.05]
                      "
                    >
                      <Pencil size={20} />
                    </button>

                    {/* EXCLUIR */}
                    <button
                      onClick={() => {
                        setCursoExcluir(curso);

                        setDeleteModalAberto(true);
                      }}
                      className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-[#faf8f6]
                        border
                        border-[#ece7e2]
                        flex
                        items-center
                        justify-center
                        text-red-500
                        hover:bg-red-500
                        hover:text-white
                        transition-all
                        hover:scale-[1.05]
                      "
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL CURSO */}
      <CursoModal
        aberto={modalAberto}
        fecharModal={() => setModalAberto(false)}
        cursoSelecionado={cursoSelecionado}
      />

      {/* MODAL EXCLUIR */}
      <DeleteModal
        aberto={DeleteModalAberto}
        fecharModal={() => setDeleteModalAberto(false)}
        titulo="Excluir curso"
        descricao={`Tem certeza que deseja excluir o curso "${cursoExcluir?.nome}"?`}
        onConfirmar={() => {
          console.log("Curso excluído");

          setDeleteModalAberto(false);
        }}
      />
    </main>
  );
}
