import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import FiltroCursos from "../assets/components/FiltrosCursos";
import CursoCard from "../assets/components/CursoCard";
import { listarCurso } from "../assets/service/cursos";

export default function CursosPage() {
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarCursos() {
      try {
        const data = await listarCurso();
        setCursos(data);
      } catch (erro) {
        console.error("Erro ao buscar cursos", erro);
      }
    }

    carregarCursos();
  }, []);

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
                  titulo={curso.nome}
                  preco={curso.preco}
                  avaliacao={4.5}
                  imagem="/placeholder.jpg"
                  onClick={() => navigate(`/curso/${curso.id}`)}
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