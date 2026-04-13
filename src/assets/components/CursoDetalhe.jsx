import { Star } from "lucide-react";
import CursoCard from "./CursoCard";

export default function CursoDetalhe() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-[900px] bg-white rounded-xl shadow-md p-6 space-y-6">

        {/* HEADER */}
        <div className="flex gap-6">
          <img
            src="/pele.jpg"
            alt="curso"
            className="w-60 h-52 object-cover rounded-lg"
          />

          <div className="space-y-2">
            <h1 className="text-xl font-semibold">
              Curso - Revitalização Facial
            </h1>

            <p className="text-sm text-gray-600 max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum vitae lectus ut velit fermentum varius integer posuere,
              metus at facilisis efficitur, nunc
            </p>

            <p className="text-lg font-semibold">R$ 200,00</p>
            <p className="text-xs text-gray-500">
              Parcele em até 10x sem juros
            </p>
          </div>
        </div>

        {/* CONTEÚDO */}
        <div className="grid grid-cols-3 gap-6">

          {/* ESQUERDA */}
          <div className="col-span-2 space-y-6">

            {/* INFORMAÇÕES */}
            <div>
              <h2 className="font-semibold mb-2">
                Informações do Curso
              </h2>

              <h3 className="text-sm font-medium">Descrição</h3>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum vitae lectus ut velit fermentum varius.
                Integer posuere, metus at facilisis efficitur, nunc
              </p>

              <p className="text-xs text-gray-400 mt-1 cursor-pointer">
                Saiba mais
              </p>
            </div>

            {/* AUTOR */}
            <div>
              <h3 className="text-sm font-semibold mb-2">
                Saiba mais sobre quem criou esse curso
              </h3>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />

                <div>
                  <p className="text-sm font-medium">Nome</p>
                  <p className="text-xs text-gray-500 max-w-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum vitae lectus ut velit fermentum varius.
                  </p>

                  <p className="text-xs text-gray-400 mt-1 cursor-pointer">
                    Saiba mais
                  </p>
                </div>
              </div>
            </div>

            {/* AVALIAÇÕES */}
            <div>
              <h3 className="font-semibold mb-2">Avaliações</h3>

              <div className="flex gap-6 items-center">
                <div>
                  <p className="text-4xl font-bold">5.0</p>
                  <p className="text-xs text-gray-500">X avaliações</p>
                </div>

                <div className="space-y-1">
                  {[5, 4, 3, 2, 1].map((n) => (
                    <div key={n} className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(n)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className="text-[#c9a46c] fill-[#c9a46c]"
                          />
                        ))}
                      </div>

                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div className="w-20 h-2 bg-[#c9a46c] rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RELACIONADOS */}
            <div>
              <h3 className="font-semibold mb-2">
                Cursos Relacionados
              </h3>

              <div className="flex gap-4">
                <CursoCard
                  imagem="/botox.jpg"
                  titulo="Botox avançado"
                  preco={200}
                  avaliacao={4.8}
                />

                <CursoCard
                  imagem="/skincare.jpg"
                  titulo="Skin care"
                  preco={400}
                  avaliacao={3.8}
                />

                <CursoCard
                  imagem="/massoterapia.jpg"
                  titulo="Massoterapia"
                  preco={300}
                  avaliacao={4.8}
                />
              </div>
            </div>
          </div>

          {/* DIREITA (CARD COMPRA) */}
          <div className="border rounded-xl p-4 space-y-4 h-fit">
            <h3 className="font-semibold">Curso 1</h3>

            <p className="text-sm text-gray-600">
              R$ 200,00
              <br />
              <span className="text-xs">
                Parcele em até 10x sem juros
              </span>
            </p>

            <div className="flex text-[#c9a46c]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#c9a46c" />
              ))}
            </div>

            <button className="w-full bg-[#c9a46c] text-white py-2 rounded-md hover:bg-[#b8935c] transition">
              Começar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}