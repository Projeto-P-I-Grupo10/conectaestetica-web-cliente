import { Star } from "lucide-react";

export default function CursoCard({
  imagem = "/placeholder.jpg",
  titulo = "Curso",
  preco = 0,
  avaliacao = 0,
  distancia = null,
  onClick = () => {},
}) {
  const precoFormatado = preco != null
    ? Number(preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    : null;

  return (
    <div
      onClick={onClick}
      className="w-60 cursor-pointer transform hover:scale-105 transition duration-300"
    >
      {/* IMAGEM */}
      <div className="relative">
        <img
          src={imagem || "/placeholder.jpg"}
          alt={titulo}
          className="w-full h-64 object-cover rounded-2xl"
        />

        <div className="absolute inset-0 from-black/70 to-transparent rounded-2xl flex items-end p-4">
          <p className="text-white text-lg font-light leading-tight">{titulo}</p>
        </div>
      </div>

      {/* INFO */}
      <div className="mt-2">
        <h2 className="text-lg font-medium">{titulo}</h2>

        <div className="flex items-center gap-2 text-gray-600">
          {precoFormatado && <span>{precoFormatado}</span>}

          <div className="flex items-center gap-1">
            <Star size={16} className="text-[#c9a46c] fill-[#c9a46c]" />
            <span>{avaliacao}</span>
          </div>

          {distancia != null && (
            <span className="text-[#c9a46c] font-medium">
              · {distancia.toFixed(2)} km
            </span>
          )}
        </div>
      </div>
    </div>
  );
}