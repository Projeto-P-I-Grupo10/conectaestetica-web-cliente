import { useEffect, useState } from "react";
import {
  Pencil,
  BookOpen,
  User,
  Mail,
  Phone,
  Lock,
  Check,
  X,
} from "lucide-react";

import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import ModalResetSenha from "../assets/components/ModalResetSenha";

import { atualizarUsuario, detalharUsuario } from "../assets/service/usuarios";
import ModalResetNovaSenha from "../assets/components/ModalResetNovaSenha";

export default function PerfilUsuario() {
  const id = sessionStorage.getItem("idUsuario");

  const [usuario, setUsuario] = useState({});
  const [editando, setEditando] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const [imagem, setImagem] = useState(null);

  // MODAL RESET SENHA
  const [modalSenhaOpen, setModalSenhaOpen] = useState(false);
  const [modalNovaSenhaOpen, setModalNovaSenhaOpen] = useState(false);


  useEffect(() => {
    async function carregarUsuario() {
      try {
        const data = await detalharUsuario(id);

        setUsuario(data);

        setNome(data.nome);
        setEmail(data.email);
        setTelefone(data.telefone);
      } catch (erro) {
        console.error("Erro ao buscar usuario", erro);
      }
    }

    carregarUsuario();
  }, [id]);

  async function salvarAlteracoes() {
    if (!nome || nome.trim() === "") {
      alert("O nome não pode ser vazio.");
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
      alert("E-mail inválido.");
      return;
    }

    const telefoneLimpo = telefone.replace(/\D/g, "");

    if (telefoneLimpo.length < 10) {
      alert("Telefone inválido. Informe pelo menos 10 dígitos.");
      return;
    }

    const dadosIguais =
      usuario.nome === nome &&
      usuario.email === email &&
      usuario.telefone.replace(/\D/g, "") === telefoneLimpo;

    if (dadosIguais) {
      alert("Nenhuma alteração detectada.");
      setEditando(false);
      return;
    }

    const usuarioAtualizado = {
      ...usuario,
      nome,
      email,
      telefone: telefoneLimpo,
    };

    try {
      const response = await atualizarUsuario(usuarioAtualizado, id);

      console.log("Usuário atualizado:", response);

      window.location.reload();
    } catch (erro) {
      console.error("Erro ao atualizar usuário", erro);
    }

    setEditando(false);
  }

  function cancelar() {
    setEditando(false);

    setNome(usuario.nome);
    setEmail(usuario.email);
    setTelefone(usuario.telefone);
  }

  function handleImagemChange(event) {
    const file = event.target.files[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);

      setImagem(previewUrl);

      // upload futuramente
    }
  }

  const cursos = [
    {
      id: 1,
      titulo: "Curso - Skin care",
      imagem:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      titulo: "Curso - Botox",
      imagem:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <Navbar />

      <section className="pt-36 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* CONTAINER */}
          <div
            className="
              bg-white
              rounded-4xl
              shadow-sm
              border
              border-[#ece7e2]
              p-6
              md:p-10
            "
          >
            {/* HEADER */}
            <div className="mb-12">
              <h1 className="text-4xl font-light text-[#3d2b1f] mb-3">
                Meu perfil
              </h1>

              <p className="text-gray-600">
                Gerencie seus dados pessoais e acompanhe seus cursos.
              </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
              {/* CURSOS */}
              <div>
                {/* HEADER CURSOS */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-[#c9a46c]/15
                      flex
                      items-center
                      justify-center
                      text-[#c9a46c]
                    "
                  >
                    <BookOpen size={26} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-medium text-[#3d2b1f]">
                      Meus cursos
                    </h2>

                    <p className="text-sm text-gray-500">
                      Cursos adquiridos recentemente
                    </p>
                  </div>
                </div>

                {/* LISTA */}
                <div className="space-y-6">
                  {cursos.map((curso) => (
                    <div
                      key={curso.id}
                      className="
                        bg-[#faf8f6]
                        border
                        border-[#ece7e2]
                        rounded-3xl
                        overflow-hidden
                        flex
                        flex-col
                        md:flex-row
                        hover:shadow-lg
                        transition-all
                        duration-300
                      "
                    >
                      {/* IMAGEM */}
                      <img
                        src={curso.imagem}
                        alt={curso.titulo}
                        className="
                          w-full
                          md:w-64
                          h-52
                          object-cover
                        "
                      />

                      {/* CONTEUDO */}
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-medium text-[#3d2b1f] mb-3">
                            {curso.titulo}
                          </h3>

                          <p className="text-gray-600 leading-relaxed">
                            Continue acompanhando suas aulas e desenvolvendo
                            suas habilidades na área da estética.
                          </p>
                        </div>

                        <div className="mt-6">
                          <button
                            className="
                              bg-[#c9a46c]
                              hover:bg-[#b89258]
                              transition
                              text-white
                              px-8
                              py-3
                              rounded-full
                              font-medium
                              shadow-sm
                            "
                          >
                            Acessar curso
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PERFIL */}
              <div
                className="
                  bg-[#faf8f6]
                  border
                  border-[#ece7e2]
                  rounded-3xl
                  p-8
                  h-fit
                "
              >
                {/* AVATAR */}
                <div className="flex flex-col items-center text-center mb-10">
                  <div className="relative">
                    <div
                      className="
                        w-32
                        h-32
                        rounded-full
                        overflow-hidden
                        bg-[#e7d8c9]
                        flex
                        items-center
                        justify-center
                        text-[#6B4A3A]
                      "
                    >
                      {imagem ? (
                        <img
                          src={imagem}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={42} />
                      )}
                    </div>

                    {/* BOTAO IMAGEM */}
                    <label
                      htmlFor="uploadImagem"
                      className="
                        absolute
                        bottom-1
                        right-1
                        w-10
                        h-10
                        rounded-full
                        bg-white
                        border
                        border-[#ece7e2]
                        flex
                        items-center
                        justify-center
                        shadow-sm
                        hover:bg-[#f5f5f5]
                        transition
                        cursor-pointer
                      "
                    >
                      <Pencil size={16} />
                    </label>

                    <input
                      id="uploadImagem"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImagemChange}
                    />
                  </div>

                  <h2 className="text-2xl font-medium text-[#3d2b1f] mt-5">
                    {usuario?.nome}
                  </h2>

                  <p className="text-gray-500">Aluno da plataforma</p>
                </div>

                {/* DADOS */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-medium text-[#3d2b1f]">
                      Dados pessoais
                    </h3>

                    {!editando ? (
                      <button
                        className="
                          text-[#c9a46c]
                          hover:text-[#b89258]
                          transition
                        "
                        onClick={() => setEditando(true)}
                      >
                        <Pencil size={18} />
                      </button>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          className="
                            text-green-600
                            hover:text-green-800
                            transition
                          "
                          onClick={salvarAlteracoes}
                        >
                          <Check size={20} />
                        </button>

                        <button
                          className="
                            text-red-600
                            hover:text-red-800
                            transition
                          "
                          onClick={cancelar}
                        >
                          <X size={20} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-5">
                    {/* NOME */}
                    <div className="bg-white rounded-2xl p-4 border border-[#ece7e2]">
                      <div className="flex items-center gap-3 mb-2 text-[#c9a46c]">
                        <User size={18} />

                        <span className="text-sm font-medium">
                          Nome completo
                        </span>
                      </div>

                      {editando ? (
                        <input
                          type="text"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          className="
                            w-full
                            border
                            border-[#ece7e2]
                            rounded-xl
                            px-4
                            py-3
                            outline-none
                            focus:border-[#c9a46c]
                          "
                        />
                      ) : (
                        <p className="text-[#3d2b1f]">{usuario?.nome}</p>
                      )}
                    </div>

                    {/* EMAIL */}
                    <div className="bg-white rounded-2xl p-4 border border-[#ece7e2]">
                      <div className="flex items-center gap-3 mb-2 text-[#c9a46c]">
                        <Mail size={18} />

                        <span className="text-sm font-medium">E-mail</span>
                      </div>

                      {editando ? (
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="
                            w-full
                            border
                            border-[#ece7e2]
                            rounded-xl
                            px-4
                            py-3
                            outline-none
                            focus:border-[#c9a46c]
                          "
                        />
                      ) : (
                        <p className="text-[#3d2b1f]">{usuario?.email}</p>
                      )}
                    </div>

                    {/* TELEFONE */}
                    <div className="bg-white rounded-2xl p-4 border border-[#ece7e2]">
                      <div className="flex items-center gap-3 mb-2 text-[#c9a46c]">
                        <Phone size={18} />

                        <span className="text-sm font-medium">Celular</span>
                      </div>

                      {editando ? (
                        <input
                          type="text"
                          value={telefone}
                          onChange={(e) => setTelefone(e.target.value)}
                          className="
                            w-full
                            border
                            border-[#ece7e2]
                            rounded-xl
                            px-4
                            py-3
                            outline-none
                            focus:border-[#c9a46c]
                          "
                        />
                      ) : (
                        <p className="text-[#3d2b1f]">{usuario?.telefone}</p>
                      )}
                    </div>

                    {/* SENHA */}
                    <div className="bg-white rounded-2xl p-4 border border-[#ece7e2]">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2 text-[#c9a46c]">
                            <Lock size={18} />

                            <span className="text-sm font-medium">Senha</span>
                          </div>

                          <p className="text-[#3d2b1f]">••••••••</p>
                        </div>

                        <button
                          onClick={() => setModalSenhaOpen(true)}
                          className="
                            px-4
                            py-2
                            rounded-full
                            bg-[#c9a46c]
                            hover:bg-[#b89258]
                            transition
                            text-white
                            text-sm
                            font-medium
                          "
                        >
                          Resetar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL RESET SENHA */}
      <ModalResetSenha
        open={modalSenhaOpen}
        onClose={() => setModalSenhaOpen(false)}
        onSuccess={() => {
          setModalSenhaOpen(false);
          setModalNovaSenhaOpen(true);
        }}
      />

      <ModalResetNovaSenha
        open={modalNovaSenhaOpen}
        onClose={() => setModalNovaSenhaOpen(false)}
      />

      <Footer />
    </main>
  );
}
