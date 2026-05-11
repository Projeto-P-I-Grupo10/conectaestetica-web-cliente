import {
  ShieldCheck,
  GraduationCap,
  Users,
  BadgeCheck,
} from "lucide-react";

export default function PorqueEscolher() {
  const beneficios = [
    {
      id: 1,
      titulo: "Cursos certificados",
      descricao:
        "Conteúdos desenvolvidos por profissionais qualificados e preparados para o mercado.",
      icon: <BadgeCheck size={34} />,
    },
    {
      id: 2,
      titulo: "Professores especializados",
      descricao:
        "Aprenda com especialistas experientes das principais áreas da estética.",
      icon: <GraduationCap size={34} />,
    },
    {
      id: 3,
      titulo: "Comunidade profissional",
      descricao:
        "Conecte-se com alunos, profissionais e novas oportunidades da área.",
      icon: <Users size={34} />,
    },
    {
      id: 4,
      titulo: "Plataforma segura",
      descricao:
        "Experiência moderna, intuitiva e segura para estudar e divulgar cursos.",
      icon: <ShieldCheck size={34} />,
    },
  ];

  return (
    <section className="w-full py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-[#3d2b1f] mb-5">
            Por que escolher a Conecta Estética?
          </h2>

          <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
            Nossa plataforma conecta alunos e profissionais da
            estética através de cursos modernos, experiências
            qualificadas e uma comunidade preparada para o futuro
            do mercado da beleza.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {beneficios.map((beneficio) => (
            <div
              key={beneficio.id}
              className="
                bg-[#f8f5f2]
                rounded-3xl
                p-8
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
                border
                border-transparent
                hover:border-[#c9a46c]
                group
              "
            >
              {/* Ícone */}
              <div className="w-16 h-16 rounded-2xl bg-[#c9a46c]/15 flex items-center justify-center text-[#c9a46c] mb-6 group-hover:scale-110 transition">
                {beneficio.icon}
              </div>

              {/* Título */}
              <h3 className="text-xl font-medium text-[#3d2b1f] mb-4">
                {beneficio.titulo}
              </h3>

              {/* Descrição */}
              <p className="text-gray-600 leading-relaxed text-sm">
                {beneficio.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}