import { useEffect, useState } from "react";
import { pagamentoPix } from "../service/pagamento";
import { useParams } from "react-router-dom";
import { exibirCursoId } from "../service/cursos";

export default function PagamentoBox() {
  const { id } = useParams()
  const [metodo, setMetodo] = useState(null);
  const [curso, setCurso] = useState(null);
  const [pagamento, setPagamento] =  useState(null);

    useEffect(() => {
      console.log("ID DA URL:", id);
          async function carregarCurso() {
            try {
              const data = await exibirCursoId(id);
              setCurso(data);
              console.log(data);
            } catch (erro) {
              console.error("Erro ao buscar cursos", erro);
            }
          }
          carregarCurso();
    }, []);
  

 async function handlePagamento(tipo) {
  if (tipo === "pix") {
    const dadosPag = {
      metodo: tipo,
      idCurso: id,
      idUsuario: Number(localStorage.getItem("idUsuario")),
      email: localStorage.getItem("email"),
      preco: curso?.preco
    };

    try {
      console.log("DADOS ENVIADOS:", dadosPag);
      const data = await pagamentoPix(dadosPag);
      setPagamento(data);
    } catch (e) {
      console.log(e);
    }
  }
}

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-[320px] flex flex-col gap-4">

      {/* PIX */}
      <div
        onClick={() => {
          setMetodo("pix");
          handlePagamento("pix");
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
            <img
              src={`data:image/png;base64,${pagamento?.qr_code_base64}`}
              alt="qr"
            />
            <button className="bg-[#c49a6c] text-white px-4 py-2 rounded-md">
              {pagamento?.qr_code}
            </button>
          </div>
        )}
      </div>

      {/* CARTÃO */}
      <div
        onClick={() => {
          setMetodo("cartao")
          handlePagamento
        }}
        className={`border rounded-md p-3 cursor-pointer ${
          metodo === "cartao" ? "border-blue-500" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <input type="radio" checked={metodo === "cartao"} readOnly />
          <span>Cartão de Crédito</span>
        </div>

        {metodo === "cartao" && (
          <div className="mt-4 flex flex-col gap-2 text-sm">

            <input
              type="text"
              placeholder="Número do cartão"
              className="border rounded p-2"
            />

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Validade"
                className="border rounded p-2 w-full"
              />
              <input
                type="text"
                placeholder="CVV"
                className="border rounded p-2 w-full"
              />
            </div>

            <input
              type="text"
              placeholder="Titular do cartão"
              className="border rounded p-2"
            />

            <select className="border rounded p-2">
              <option>12x de 999,99</option>
            </select>

          </div>
        )}
      </div>

      {/* BOTÃO */}
      <button className="bg-[#c49a6c] text-white py-2 rounded-md mt-4">
        Finalizar compra
      </button>

    </div>
  );
}