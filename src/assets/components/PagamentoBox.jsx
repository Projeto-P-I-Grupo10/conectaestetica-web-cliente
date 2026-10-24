import { useEffect, useState } from "react";
import {
  consultarStatusPix,
  dispararPagamentoPix,
  aguardarQrCode,
} from "../service/pagamento";
import { exibirCursoDetalheId } from "../service/cursos";
import Swal from "sweetalert2";

export default function PagamentoBox({ id }) {
  const [metodo, setMetodo] = useState(null);
  const [curso, setCurso] = useState({});
  const [pagamento, setPagamento] =  useState(null);
  const [tempoRestante, setTempoRestante] = useState(null);
  const [gerandoPix, setGerandoPix] = useState(false);

  useEffect(() => {
    async function carregarCurso() {
      try {
        const data = await exibirCursoDetalheId(id);
        setCurso(data);
        console.log("data: " + data?.turmaPreco)
        console.log("curso: " +curso?.turmaPreco)
      } catch (erro) {
        console.error("Erro ao buscar cursos", erro);
      }
    }
    carregarCurso();
  }, []);

  function limitarTexto(texto, limite = 20) {
    if (!texto) return "";
    return texto.length > limite
      ? texto.slice(0, limite) + "..."
      : texto;
  }

  function copiarPix() {
    if (!pagamento?.qrCode) return;

    navigator.clipboard.writeText(pagamento?.qrCode)
      .then(() => {
        Swal.fire({
          title: "Copiado!",
          text: "Código PIX copiado com sucesso",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Erro",
          text: "Não foi possível copiar o código",
          icon: "error",
        });
      });
  }

  async function handlePagamento(tipo, cursoData) {
    if (tipo !== "pix") return;

    const idCurso = Number(id);
    const idUsuario = Number(sessionStorage.getItem("idUsuario"));

    const dadosPag = {
      metodoPagamento: tipo,
      idTurma: idCurso,
      idUsuario,
      email: sessionStorage.getItem("email"),
      valor: parseFloat(cursoData?.turmaPreco),
    };

    setGerandoPix(true);
    setPagamento(null);

    try {
      await dispararPagamentoPix(dadosPag);

      const data = await aguardarQrCode(idCurso, idUsuario);
      setPagamento(data);
      setGerandoPix(false);

      setTempoRestante(600);
      const countdown = setInterval(() => {
        setTempoRestante((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      const polling = setInterval(async () => {
        try {
          const statusResponse = await consultarStatusPix(idCurso, idUsuario);
          const status = statusResponse?.status?.toLowerCase();

          if (status === "approved") {
            clearInterval(polling);
            clearInterval(countdown);
            setTempoRestante(null);

            Swal.fire({
              title: "Pagamento aprovado!",
              text: "Seu curso foi liberado 🎉",
              icon: "success",
              confirmButtonText: "Continuar",
            });
          } else if (status === "expired" || status === "cancelled") {
            clearInterval(polling);
            clearInterval(countdown);
            setTempoRestante(null);
            setPagamento(null);

            Swal.fire({
              title: "Tempo esgotado",
              text: "O PIX expirou, gere outro pagamento",
              icon: "warning",
            });
          }
        } catch (error) {
          console.error("Erro ao consultar status:", error);
          clearInterval(polling);
          clearInterval(countdown);

          Swal.fire({
            title: "Erro",
            text: "Falha ao verificar pagamento",
            icon: "error",
          });
        }
      }, 5000);
    } catch (e) {
      setGerandoPix(false);

      if (e.response?.status === 409) {
        Swal.fire({
          title: "Atenção",
          text: "Já existe um pagamento PIX pendente para este curso.",
          icon: "info",
        });
      } else {
        console.error(e);

        Swal.fire({
          title: "Erro",
          text: "Não foi possível gerar o pagamento",
          icon: "error",
        });
      }
    }
  }

  function formatarTempo(segundos) {
    const min = String(Math.floor(segundos / 60)).padStart(2, "0");
    const sec = String(segundos % 60).padStart(2, "0");
    return `${min}:${sec}`;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-[320px] flex flex-col gap-4">

      {/* PIX */}
      <div
        onClick={() => {
          if (gerandoPix) return;
          const jaSelecionado = metodo === "pix";
          setMetodo("pix");
          // Só dispara um novo PIX se ainda não houver um QR ativo.
          if (!jaSelecionado && !pagamento?.qrCode) {
            handlePagamento("pix", curso);
          }
        }}
        className={`border rounded-md p-3 cursor-pointer ${
          metodo === "pix" ? "border-blue-500" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <input type="radio" checked={metodo === "pix"} readOnly />
          <span>Pix</span>
        </div>

        {metodo === "pix" && (
          <div className="mt-4 flex flex-col items-center gap-3">

            {gerandoPix && (
              <p className="text-gray-600 text-sm text-center">
                Gerando QR Code, aguarde...
              </p>
            )}

            {!gerandoPix && pagamento?.qrCodeImage && (
              <>
                <img
                  src={`data:image/png;base64,${pagamento.qrCodeImage}`}
                  alt="QR Code do PIX"
                />

                <div className="flex flex-col items-center gap-2">
                  <button className="bg-[#c49a6c] text-white px-4 py-2 rounded-md">
                    {limitarTexto(pagamento?.qrCode)}
                  </button>

                  <button
                    onClick={copiarPix}
                    className="text-sm text-blue-600 underline"
                  >
                    Copiar código PIX
                  </button>
                </div>

                {tempoRestante !== null && (
                  <p className="text-red-600 font-bold">
                    Expira em: {formatarTempo(tempoRestante)}
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* CARTÃO */}
      <div
        onClick={() => setMetodo("cartao")}
        className={`border rounded-md p-3 cursor-pointer ${
          metodo === "cartao" ? "border-blue-500" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <input type="radio" checked={metodo === "cartao"} readOnly />
          <span>Cartão de Crédito</span>
        </div>
      </div>

      <button className="bg-[#c49a6c] text-white py-2 rounded-md mt-4">
        Finalizar compra
      </button>

    </div>
  );
}