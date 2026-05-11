import { Star } from "lucide-react";

export default function Depoimentos() {
  const depoimentos = [
    {
      id: 1,
      nome: "Mariana Costa",
      profissao: "Esteticista Facial",
      imagem:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
      comentario:
        "A plataforma me ajudou a encontrar cursos atualizados e elevar meu nível profissional. A experiência foi incrível.",
    },
    {
      id: 2,
      nome: "Juliana Alves",
      profissao: "Especialista em SkinCare",
      imagem:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop",
      comentario:
        "Os conteúdos são modernos e os professores extremamente preparados. Recomendo para qualquer profissional da área.",
    },
    {
      id: 3,
      nome: "Camila Rocha",
      profissao: "Massoterapeuta",
      imagem:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
      comentario:
        "Além dos cursos excelentes, consegui me conectar com outros profissionais e ampliar minhas oportunidades.",
    },
  ];

  return (
    <section className="w-full py-24 px-6 bg-[#f8f5f2]">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-[#3d2b1f] mb-5">
            O que nossos alunos dizem
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
            Histórias reais de profissionais que evoluíram suas
            carreiras através da Conecta Estética.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {depoimentos.map((depoimento) => (
            <div
              key={depoimento.id}
              className="
                bg-white
                rounded-3xl
                p-8
                shadow-sm
                hover:shadow-xl
                transition-all
                duration-300
                hover:-translate-y-2
              "
            >
              {/* Estrelas */}
              <div className="flex items-center gap-1 text-[#c9a46c] mb-6">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Comentário */}
              <p className="text-gray-600 leading-relaxed mb-8">
                "{depoimento.comentario}"
              </p>

              {/* Usuário */}
              <div className="flex items-center gap-4">
                <img
                  src={depoimento.imagem}
                  alt={depoimento.nome}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-medium text-[#3d2b1f]">
                    {depoimento.nome}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {depoimento.profissao}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}