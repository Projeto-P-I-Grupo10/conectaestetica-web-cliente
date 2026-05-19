import { useState } from "react";
import { Upload, FileCheck, BadgeCheck } from "lucide-react";

import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";

export default function MatriculaPage() {
  const [certificado, setCertificado] = useState(null);
  const [documento, setDocumento] = useState(null);

  const handleCertificado = (e) => {
    setCertificado(e.target.files[0]);
  };

  const handleDocumento = (e) => {
    setDocumento(e.target.files[0]);
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <Navbar />

      <section className="pt-36 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Container */}
          <div
            className="
              bg-white
              border
              border-[#ece7e2]
              rounded-4xl
              shadow-sm
              p-8
              md:p-12
            "
          >
            {/* Header */}
            <div className="text-center mb-14">
              <div
                className="
                  w-20
                  h-20
                  rounded-full
                  bg-[#c9a46c]/15
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-6
                  text-[#c9a46c]
                "
              >
                <BadgeCheck size={38} />
              </div>

              <h1 className="text-5xl font-light text-[#3d2b1f] mb-4">
                Finalizar matrícula
              </h1>

              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Para concluir sua matrícula no curso, envie os documentos
                solicitados abaixo para validação da sua inscrição.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Certificado */}
              <div
                className="
                  bg-[#faf8f6]
                  border
                  border-[#ece7e2]
                  rounded-3xl
                  p-8
                "
              >
                <div className="mb-8">
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
                      mb-5
                    "
                  >
                    <FileCheck size={26} />
                  </div>

                  <h2 className="text-2xl font-medium text-[#3d2b1f] mb-3">
                    Certificado profissional
                  </h2>

                  <p className="text-gray-500 leading-relaxed">
                    Envie um comprovante ou certificado relacionado à sua
                    formação na área.
                  </p>
                </div>

                {/* Upload */}
                <label
                  className="
                    border-2
                    border-dashed
                    border-[#d8c4a2]
                    rounded-3xl
                    bg-white
                    p-10
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    cursor-pointer
                    hover:border-[#c9a46c]
                    hover:bg-[#fdfaf6]
                    transition
                  "
                >
                  <Upload size={34} className="text-[#c9a46c] mb-4" />

                  <span className="text-[#3d2b1f] font-medium mb-2">
                    Clique para enviar
                  </span>

                  <span className="text-sm text-gray-500">PDF, JPG ou PNG</span>

                  <input
                    type="file"
                    className="hidden"
                    onChange={handleCertificado}
                  />
                </label>

                {certificado && (
                  <p className="mt-4 text-sm text-[#3d2b1f]">
                    Arquivo enviado:{" "}
                    <span className="font-medium">{certificado.name}</span>
                  </p>
                )}
              </div>

              {/* Documento */}
              <div
                className="
                  bg-[#faf8f6]
                  border
                  border-[#ece7e2]
                  rounded-3xl
                  p-8
                "
              >
                <div className="mb-8">
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
                      mb-5
                    "
                  >
                    <FileCheck size={26} />
                  </div>

                  <h2 className="text-2xl font-medium text-[#3d2b1f] mb-3">
                    Documento com foto
                  </h2>

                  <p className="text-gray-500 leading-relaxed">
                    Envie um documento oficial com foto para validação da
                    identidade.
                  </p>
                </div>

                {/* Upload */}
                <label
                  className="
                    border-2
                    border-dashed
                    border-[#d8c4a2]
                    rounded-3xl
                    bg-white
                    p-10
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    cursor-pointer
                    hover:border-[#c9a46c]
                    hover:bg-[#fdfaf6]
                    transition
                  "
                >
                  <Upload size={34} className="text-[#c9a46c] mb-4" />

                  <span className="text-[#3d2b1f] font-medium mb-2">
                    Clique para enviar
                  </span>

                  <span className="text-sm text-gray-500">PDF, JPG ou PNG</span>

                  <input
                    type="file"
                    className="hidden"
                    onChange={handleDocumento}
                  />
                </label>

                {documento && (
                  <p className="mt-4 text-sm text-[#3d2b1f]">
                    Arquivo enviado:{" "}
                    <span className="font-medium">{documento.name}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-14 flex flex-col md:flex-row gap-4 justify-between items-center">
              <p className="text-sm text-gray-500">
                Seus documentos serão analisados pela equipe.
              </p>

              <button
                className="
                  bg-[#c9a46c]
                  hover:bg-[#b89258]
                  transition
                  text-white
                  px-10
                  py-4
                  rounded-full
                  font-medium
                  shadow-sm
                "
              >
                Finalizar matrícula
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
