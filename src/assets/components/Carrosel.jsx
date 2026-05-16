import { useEffect, useState } from "react";

export default function Carrossel() {
  const slides = [
    {
      id: 1,
      imagem:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop",
      titulo: "Beleza que realça a alma",
      descricao: "Cuidados especiais para elevar sua autoestima.",
    },
    {
      id: 2,
      imagem:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1400&auto=format&fit=crop",
      titulo: "Sua beleza em destaque",
      descricao: "Tratamentos modernos e profissionais.",
    },
    {
      id: 3,
      imagem:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1400&auto=format&fit=crop",
      titulo: "Seu momento de autocuidado",
      descricao: "Experiências únicas para seu bem-estar.",
    },
  ];

  const [slideAtual, setSlideAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideAtual((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  function proximoSlide() {
    setSlideAtual((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  }

  function slideAnterior() {
    setSlideAtual((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === slideAtual
              ? "opacity-100 z-10"
              : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.imagem}
            alt={slide.titulo}
            className="w-full h-full object-cover"
          />

          {/* Overlay escuro */}
          <div className="absolute inset-0 bg-[#4b3425]/70" />

          {/* Conteúdo */}
          <div className="absolute top-1/2 left-8 md:left-24 -translate-y-1/2 text-white max-w-xl z-20">
            <h1 className="text-5xl md:text-7xl font-light leading-tight mb-6">
              {slide.titulo}
            </h1>

            <p className="text-lg text-zinc-200 mb-8">
              {slide.descricao}
            </p>

            <button className="bg-[#c9a46c] hover:bg-[#b89258] transition px-8 py-4 rounded-full font-medium">
              Conheça mais
            </button>
          </div>
        </div>
      ))}

      {/* Botão anterior */}
      <button
        onClick={slideAnterior}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-md w-12 h-12 rounded-full text-white text-xl hover:bg-white/30 transition"
      >
        ❮
      </button>

      {/* Botão próximo */}
      <button
        onClick={proximoSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-md w-12 h-12 rounded-full text-white text-xl hover:bg-white/30 transition"
      >
        ❯
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setSlideAtual(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === slideAtual
                ? "bg-white scale-110"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}