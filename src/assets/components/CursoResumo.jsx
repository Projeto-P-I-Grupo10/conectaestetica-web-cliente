import { X } from "lucide-react";

export default function CursoResumo() {
  return (
    <div className="bg-white rounded-xl shadow-md flex w-180 h-42 overflow-hidden">
      
      {/* IMAGEM */}
      <img
        src="https://via.placeholder.com/150"
        alt="curso"
        className="w-40 object-cover"
      />

      {/* INFO */}
      <div className="p-4 flex flex-col justify-between w-full">
        
        <div className="flex justify-between">
          <h3 className="font-semibold">
            Curso - Skin care
          </h3>

          <X className="cursor-pointer" size={18} />
        </div>

        <p className="text-lg font-bold">
          R$ 400,00
        </p>

        <p className="text-sm text-gray-500">
          Parcele em até 10x sem juros
        </p>

        {/* ESTRELAS */}
        <div className="text-yellow-400">
          ★★★★☆
        </div>

      </div>
    </div>
  );
}