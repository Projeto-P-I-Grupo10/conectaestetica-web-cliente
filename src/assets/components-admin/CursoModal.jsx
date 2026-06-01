import { useEffect, useState } from "react";

import { X, UploadCloud } from "lucide-react";

export default function CursoModal({ aberto, fecharModal, cursoSelecionado }) {
  const editando = !!cursoSelecionado;

  const [nome, setNome] = useState("");

  const [professor, setProfessor] = useState("");

  const [preco, setPreco] = useState("");

  const [vagas, setVagas] = useState("");

  const [descricao, setDescricao] = useState("");

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (cursoSelecionado) {
        
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNome(cursoSelecionado.nome || "");

      setProfessor(cursoSelecionado.professor || "");

      setPreco(cursoSelecionado.preco || "");

      setVagas(cursoSelecionado.vagas || "");

      setDescricao(cursoSelecionado.descricao || "");

      setPreview(cursoSelecionado.imagem || null);
    } else {
      setNome("");

      setProfessor("");

      setPreco("");

      setVagas("");

      setDescricao("");

      setPreview(null);
    }
  }, [cursoSelecionado]);

  function formatarPreco(valor) {
    valor = valor.replace(/\D/g, "");

    valor = (Number(valor) / 100).toFixed(2) + "";

    valor = valor.replace(".", ",");

    valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return "R$ " + valor;
  }

  function handlePreco(e) {
    setPreco(formatarPreco(e.target.value));
  }

  function handleImagem(file) {
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  }

  function handleDrop(e) {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    handleImagem(file);
  }

  if (!aberto) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/40
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-50
        p-6
      "
    >
      {/* MODAL */}
      <div
        className="
          w-full
          max-w-5xl
          max-h-[92vh]
          bg-white
          rounded-[2.5rem]
          border
          border-[#ece7e2]
          shadow-xl
          overflow-hidden
        "
      >
        {/* HEADER */}
        <div
          className="
            flex
            items-center
            justify-between
            px-8
            py-6
            border-b
            border-[#ece7e2]
          "
        >
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

          {/* FECHAR */}
          <button
            onClick={fecharModal}
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
        <div className="p-8 overflow-y-auto max-h-[75vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NOME */}
            <Input
              label="Nome do curso"
              placeholder="Digite o nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            {/* PROFESSOR */}
            <Input
              label="Professor"
              placeholder="Nome do professor"
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
            />

            {/* PREÇO */}
            <div>
              <label className="text-sm text-gray-500 mb-2 block">Preço</label>

              <input
                type="text"
                value={preco}
                onChange={handlePreco}
                placeholder="R$ 0,00"
                className="
                  w-full
                  bg-[#faf8f6]
                  border
                  border-[#ece7e2]
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  text-[#3d2b1f]
                  placeholder:text-gray-400
                  focus:border-[#c9a46c]
                  transition
                "
              />
            </div>

            {/* VAGAS */}
            <Input
              label="Quantidade de vagas"
              placeholder="Ex: 30"
              value={vagas}
              onChange={(e) => setVagas(e.target.value)}
            />

            {/* DRAG AND DROP */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-500 mb-2 block">
                Imagem do curso
              </label>

              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="
                  relative
                  border-2
                  border-dashed
                  border-[#d8c2a0]
                  rounded-3xl
                  bg-[#faf8f6]
                  p-8
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  transition
                  hover:bg-[#f8f3ec]
                "
              >
                {/* INPUT FILE */}
                <input
                  type="file"
                  accept="image/*"
                  className="
                    absolute
                    inset-0
                    opacity-0
                    cursor-pointer
                  "
                  onChange={(e) => handleImagem(e.target.files[0])}
                />

                {preview ? (
                  <div className="w-full">
                    <img
                      src={preview}
                      alt="preview"
                      className="
                        w-full
                        h-64
                        object-cover
                        rounded-2xl
                      "
                    />
                  </div>
                ) : (
                  <>
                    <div
                      className="
                        w-20
                        h-20
                        rounded-3xl
                        bg-[#c9a46c]/15
                        flex
                        items-center
                        justify-center
                        text-[#c9a46c]
                        mb-5
                      "
                    >
                      <UploadCloud size={36} />
                    </div>

                    <h3 className="text-xl text-[#3d2b1f] font-medium mb-2">
                      Arraste sua imagem aqui
                    </h3>

                    <p className="text-gray-500 mb-4">
                      ou clique para selecionar
                    </p>

                    <div
                      className="
                        bg-[#c9a46c]
                        text-white
                        px-6
                        py-3
                        rounded-2xl
                        text-sm
                        shadow-sm
                      "
                    >
                      Escolher imagem
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* DESCRIÇÃO */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-500 mb-2 block">
                Descrição
              </label>

              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Digite a descrição do curso..."
                className="
                  w-full
                  min-h-36
                  bg-[#faf8f6]
                  border
                  border-[#ece7e2]
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  resize-none
                  text-[#3d2b1f]
                  placeholder:text-gray-400
                  focus:border-[#c9a46c]
                  transition
                "
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-end gap-4 mt-10">
            {/* CANCELAR */}
            <button
              onClick={fecharModal}
              className="
                px-6
                py-4
                rounded-2xl
                border
                border-[#ece7e2]
                text-[#3d2b1f]
                hover:bg-[#faf8f6]
                transition
              "
            >
              Cancelar
            </button>

            {/* SALVAR */}
            <button
              className="
                bg-[#c9a46c]
                hover:bg-[#b89258]
                transition-all
                text-white
                px-8
                py-4
                rounded-2xl
                shadow-sm
                hover:scale-[1.02]
                active:scale-[0.98]
              "
            >
              {editando ? "Salvar alterações" : "Salvar curso"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, placeholder, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-500 mb-2 block">{label}</label>

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          bg-[#faf8f6]
          border
          border-[#ece7e2]
          rounded-2xl
          px-5
          py-4
          outline-none
          text-[#3d2b1f]
          placeholder:text-gray-400
          focus:border-[#c9a46c]
          transition
        "
      />
    </div>
  );
}
