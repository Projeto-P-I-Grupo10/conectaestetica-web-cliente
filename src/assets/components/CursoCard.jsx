import { Star } from "lucide-react";

export default function CursoCard({
  imagem = "/placeholder.jpg",
  titulo = "Curso",
  preco = 0,
  avaliacao = 0,
  onClick = () => {},
}) {
  const precoFormatado = Number(preco).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div
      onClick={onClick}
      className="w-60 cursor-pointer transform hover:scale-105 transition duration-300"
    >
      {/* IMAGEM */}
      <div className="relative">
        <img
          src={imagem}
          alt={titulo}
          className="w-full h-64 object-cover rounded-2xl"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 from-black/70 to-transparent rounded-2xl flex items-end p-4">
          <p className="text-white text-lg font-light leading-tight">
            {titulo}
          </p>
        </div>
      </div>

      {/* INFO */}
      <div className="mt-2">
        <h2 className="text-lg font-medium">{titulo}</h2>

        <div className="flex items-center gap-2 text-gray-600">
          <span>{precoFormatado}</span>

          <div className="flex items-center gap-1">
            <Star
              size={16}
              className="text-[#c9a46c] fill-[#c9a46c]"
            />
            <span>{avaliacao}</span>
          </div>
        </div>
      </div>
    </div>
  );
}