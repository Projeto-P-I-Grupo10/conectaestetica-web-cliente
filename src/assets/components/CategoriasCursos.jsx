import {
  Sparkles,
  HeartHandshake,
  Flower2,
  Syringe,
  Hand,
  ScanFace,
} from "lucide-react";

export default function CategoriasCursos() {
  const categorias = [
    {
      id: 1,
      nome: "SkinCare",
      icon: <Sparkles size={30} />,
    },
    {
      id: 2,
      nome: "Massoterapia",
      icon: <Hand size={30} />,
    },
    {
      id: 3,
      nome: "Estética Facial",
      icon: <ScanFace size={30} />,
    },
    {
      id: 4,
      nome: "Botox",
      icon: <Syringe size={30} />,
    },
    {
      id: 5,
      nome: "Bem-estar",
      icon: <HeartHandshake size={30} />,
    },
    {
      id: 6,
      nome: "Harmonização",
      icon: <Flower2 size={30} />,
    },
  ];

  return (
    <section className="w-full py-20 px-6 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto">
        
        {/* Título */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-light text-[#3d2b1f] mb-3">
            Categorias de cursos
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore as principais áreas da estética e encontre
            cursos ideais para desenvolver suas habilidades.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              className="
                bg-white
                rounded-3xl
                p-8
                flex
                flex-col
                items-center
                justify-center
                gap-4
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
                border
                border-transparent
                hover:border-[#c9a46c]
                group
              "
            >
              {/* Ícone */}
              <div className="text-[#c9a46c] group-hover:scale-110 transition">
                {categoria.icon}
              </div>

              {/* Nome */}
              <span className="text-[#3d2b1f] font-medium text-center">
                {categoria.nome}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}