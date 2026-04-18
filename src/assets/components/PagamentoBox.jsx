import { useEffect, useState } from "react";

export default function PagamentoBox() {
  const [metodo, setMetodo] = useState(null);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-[320px] flex flex-col gap-4">

      {/* PIX */}
      <div
        onClick={() => setMetodo("pix")}
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
              src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=pagamento"
              alt="qr"
            />
            <button className="bg-[#c49a6c] text-white px-4 py-2 rounded-md">
              Copiar código pix
            </button>
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