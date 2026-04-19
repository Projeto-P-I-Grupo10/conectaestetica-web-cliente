import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import CursoResumo from "../assets/components/CursoResumo";
import PagamentoBox from "../assets/components/PagamentoBox";
import { useParams } from "react-router-dom";

export default function Pagamento() {
    const { id } = useParams();
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">

      <Navbar />

      {/* CONTAINER PADRÃO */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 flex-1 pt-10 pb-6 mt-18">

        <div className="flex items-start justify-between gap-10">

          {/* ESQUERDA */}
          <div className="flex-1 max-w-xl">
            <h2 className="text-xl font-semibold mb-4">
              Finalizar compra
            </h2>

            <CursoResumo id={id}/>
          </div>

          {/* DIREITA */}
          <div className="w-[320px]">
            <PagamentoBox />
          </div>

        </div>

      </div>

      {/* ESPAÇO ANTES DO FOOTER */}
      <div className="mt-6">
        <Footer />
      </div>

    </div>
  );
}