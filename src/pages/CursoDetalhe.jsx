import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import CursoDetalhe from "../assets/components/CursoDetalhe";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      {/* NAVBAR */}
      <Navbar />

      {/* CONTEÚDO */}
      <main className="flex-1 flex justify-center">
        <div className="px-6 mt-28">
          <CursoDetalhe />
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;