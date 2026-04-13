import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import FiltroCursos from "../assets/components/FiltrosCursos";
import CursoCard from "../assets/components/CursoCard";

export default function CursosPage() {
  const cursos = [
    {
      id: 1,
      titulo: "Limpeza de Pele Profunda",
      preco: 120,
      avaliacao: 4.8,
      imagem: "/curso1.jpg",
    },
    {
      id: 2,
      titulo: "Drenagem Linfática",
      preco: 200,
      avaliacao: 4.7,
      imagem: "/curso2.jpg",
    },
    {
      id: 3,
      titulo: "Botox Avançado",
      preco: 450,
      avaliacao: 5.0,
      imagem: "/curso3.jpg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      <Navbar />

      <main className="flex-1 flex justify-center py-10 mt-32">
        <div className="w-full max-w-6xl px-6 flex gap-8">
          
          <FiltroCursos />

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {cursos.map((curso) => (
                <CursoCard
                  key={curso.id}
                  {...curso}
                  onClick={() => console.log("Curso:", curso.id)}
                />
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}