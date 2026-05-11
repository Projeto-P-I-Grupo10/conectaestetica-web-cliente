import {
  BookOpen,
  Users,
  GraduationCap,
  Star,
} from "lucide-react";

export default function EstatisticasPlataforma() {
  const estatisticas = [
    {
      id: 1,
      titulo: "+500",
      subtitulo: "Cursos disponíveis",
      icon: <BookOpen size={32} />,
    },
    {
      id: 2,
      titulo: "+10 mil",
      subtitulo: "Alunos conectados",
      icon: <Users size={32} />,
    },
    {
      id: 3,
      titulo: "+120",
      subtitulo: "Professores especializados",
      icon: <GraduationCap size={32} />,
    },
    {
      id: 4,
      titulo: "4.9",
      subtitulo: "Avaliação média",
      icon: <Star size={32} />,
    },
  ];

  return (
    <section className="w-full py-24 px-6 bg-[#6B4A3A]">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="text-center text-white mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-5">
            Nossa plataforma em números
          </h2>

          <p className="max-w-2xl mx-auto text-[#f1e6de] leading-relaxed">
            Estamos conectando profissionais, alunos e oportunidades
            através de uma experiência moderna e especializada no
            universo da estética.
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {estatisticas.map((item) => (
            <div
              key={item.id}
              className="
                bg-white/10
                backdrop-blur-md
                rounded-3xl
                p-8
                border
                border-white/10
                hover:bg-white/15
                transition-all
                duration-300
                hover:-translate-y-2
              "
            >
              {/* Ícone */}
              <div className="w-16 h-16 rounded-2xl bg-[#c9a46c]/20 text-[#e7c48f] flex items-center justify-center mb-6">
                {item.icon}
              </div>

              {/* Número */}
              <h3 className="text-4xl font-semibold text-white mb-3">
                {item.titulo}
              </h3>

              {/* Texto */}
              <p className="text-[#f1e6de]">
                {item.subtitulo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}