import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const perguntas = [
    {
      id: 1,
      pergunta: "Como funciona a plataforma?",
      resposta:
        "A Conecta Estética conecta alunos e profissionais através de cursos especializados na área da estética, oferecendo uma experiência moderna e acessível.",
    },
    {
      id: 2,
      pergunta: "Os cursos possuem certificado?",
      resposta:
        "Sim. Os cursos divulgados na plataforma podem oferecer certificados conforme as informações disponibilizadas pelos profissionais responsáveis.",
    },
    {
      id: 3,
      pergunta: "Como posso divulgar meu curso?",
      resposta:
        "Você pode entrar em contato com nossa equipe através da seção de divulgação para que seu curso passe pelo processo de análise.",
    },
    {
      id: 4,
      pergunta: "Os cursos são presenciais ou online?",
      resposta:
        "A plataforma pode disponibilizar cursos presenciais, online ou híbridos, dependendo da proposta do profissional responsável.",
    },
    {
      id: 5,
      pergunta: "Como entro em contato com o suporte?",
      resposta:
        "Você poderá falar com nossa equipe através dos canais oficiais disponibilizados no rodapé da plataforma.",
    },
  ];

  const [aberto, setAberto] = useState(null);

  function toggleFAQ(id) {
    setAberto(aberto === id ? null : id);
  }

  return (
    <section className="w-full py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-[#3d2b1f] mb-5">
            Perguntas frequentes
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Tire suas principais dúvidas sobre a plataforma,
            funcionamento dos cursos e divulgação profissional.
          </p>
        </div>

        {/* Lista */}
        <div className="flex flex-col gap-5">
          {perguntas.map((item) => {
            const ativo = aberto === item.id;

            return (
              <div
                key={item.id}
                className="
                  border
                  border-[#e7d8c9]
                  rounded-3xl
                  overflow-hidden
                  transition-all
                  duration-300
                "
              >
                {/* Pergunta */}
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    text-left
                    p-6
                    bg-[#f8f5f2]
                    hover:bg-[#f1ebe5]
                    transition
                  "
                >
                  <span className="text-[#3d2b1f] font-medium text-lg">
                    {item.pergunta}
                  </span>

                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      ativo ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Resposta */}
                <div
                  className={`
                    grid
                    transition-all
                    duration-300
                    ${
                      ativo
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <p className="p-6 text-gray-600 leading-relaxed bg-white">
                      {item.resposta}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}