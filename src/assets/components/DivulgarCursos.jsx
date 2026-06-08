import { Phone, ClipboardCheck, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DivulgarCurso() {
  const etapas = [
    {
      id: 1,
      titulo: "Entra em contato",
      descricao:
        "Enviamos os dados diretamente de aprovação. Explicamos todas as limitações importantes já em seguida.",
      icon: <Phone size={18} />,
    },
    {
      id: 2,
      titulo: "Entra em análise",
      descricao:
        "Enviamos os dados diretamente de aprovação. Explicamos todas as limitações importantes já em seguida.",
      icon: <ClipboardCheck size={18} />,
    },
    {
      id: 3,
      titulo: "Curso é divulgado",
      descricao:
        "Enviamos os dados diretamente de aprovação. Explicamos todas as limitações importantes já em seguida.",
      icon: <BookOpen size={18} />,
    },
  ];

  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#6B4A3A] py-20 px-6 mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Deseja divulgar seu curso?
          </h2>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-[#f1e6de] leading-relaxed">
            Fale com nossa equipe e descubra como podemos impulsionar o futuro
            da análise de dados da sua empresa. Juntos, podemos transformar
            informação em decisões estratégicas e resultados reais.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mt-14">
          {etapas.map((etapa) => (
            <div
              key={etapa.id}
              className="bg-[#f5f5f5] rounded-2xl p-8 shadow-md min-w-2xs min-h-72 relative"
            >
              {/* Número */}
              <div className="absolute -top-5 left-5 w-12 h-12 rounded-full bg-[#c9a46c] text-[#3d2b1f] font-bold flex items-center justify-center shadow-md">
                {etapa.id}
              </div>

              {/* Conteúdo */}
              <div className="mt-8">
                <div className="flex items-center gap-2 text-[#3d2b1f] mb-4">
                  {etapa.icon}

                  <h3 className="font-medium text-3xl">{etapa.titulo}</h3>
                </div>

                <p className="text-8 text-gray-600 leading-relaxed">
                  {etapa.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Botão */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/formulario")}
            className="bg-[#c9a46c] hover:bg-[#b89258] transition text-[#3d2b1f] font-medium px-10 py-3 rounded-full shadow-md"
          >
            Fale conosco
          </button>
        </div>
      </div>
    </section>
  );
}
