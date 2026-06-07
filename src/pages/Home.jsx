import Navbar from "../assets/components/Navbar";
import Carrossel from "../assets/components/Carrosel";
import DivulgarCurso from "../assets/components/DivulgarCursos";
import CategoriasCursos from "../assets/components/CategoriasCursos";
import PorqueEscolher from "../assets/components/PorqueEscolher";
// import Depoimentos from "../assets/components/Depoimentos";
// import EstatisticasPlataforma from "../assets/components/EstatisticasPlataforma";
import FAQ from "../assets/components/FAQ";
import Footer from "../assets/components/Footer"

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Carrossel />
      <DivulgarCurso />
      <CategoriasCursos />
      <PorqueEscolher />
      {/* <Depoimentos />
      <EstatisticasPlataforma /> */}
      <FAQ />
      <Footer />
    </main>
  );
}
