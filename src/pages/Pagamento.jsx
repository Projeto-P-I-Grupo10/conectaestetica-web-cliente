import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import CursoResumo from "../assets/components/CursoResumo";
import PagamentoBox from "../assets/components/PagamentoBox";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { listarAvaliacoesCurso } from "../assets/service/avaliacaoCurso";

export default function Pagamento() {
  const { id } = useParams();

  const [avaliacaoCurso, setAvaliacaoCurso] = useState({
    media: 0,
    quantidade: 0,
  });

  useEffect(() => {
  async function carregarAvaliacoes() {
    try {
      const avaliacoesDoCurso = await listarAvaliacoesCurso(id);

      const quantidade = avaliacoesDoCurso.length;

      const media =
        quantidade > 0
          ? avaliacoesDoCurso.reduce(
              (soma, item) => soma + Number(item.avaliacao),
              0
            ) / quantidade
          : 0;

      setAvaliacaoCurso({
        media: media.toFixed(1),
        quantidade,
      });
    } catch (erro) {
      console.error("Erro ao buscar avaliações", erro);
    }
  }

  if (id) {
    carregarAvaliacoes();
  }
}, [id]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <Navbar />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 flex-1 pt-10 pb-6 mt-18">
        <div className="flex items-start justify-between gap-10">

          <div className="flex-1 max-w-xl">
            <h2 className="text-xl font-semibold mb-4">
              Finalizar compra
            </h2>

            <CursoResumo
              id={id}
              avaliacaoCurso={avaliacaoCurso}
            />
          </div>

          <div className="w-[320px]">
            <PagamentoBox />
          </div>

        </div>
      </div>

      <div className="mt-6">
        <Footer />
      </div>
    </div>
  );
}