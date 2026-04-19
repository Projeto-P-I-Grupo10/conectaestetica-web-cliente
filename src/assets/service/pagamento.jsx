import apiPag from "./apiPagamento";

export async function pagamentoPix(dados){
  const response = await apiPag.post("/pagamentos/pix", {
    idCurso: dados.idCurso,
    idUsuario: dados.idUsuario,
    email: dados.email,
    metodoPagamento: dados.metodo,
    status: "pendente",
    valor: dados.preco
  });
  return response.data;
}
