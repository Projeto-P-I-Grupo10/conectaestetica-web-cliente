import apiPag from "./apiPagamento";

export async function pagamentoPix(dados){
  const response = await apiPag.post("/pagamentos/pix", {
    idTurma: dados.idTurma,
    idUsuario: dados.idUsuario,
    email: dados.email,
    metodoPagamento: dados.metodo,
    status: "pendente",
    valor: dados.valor
  });
  return response.data;
}

export async function consultarStatusPix(idTurma, idUsuario) {
  try {
    const response = await apiPag.get(`/pagamentos/status/${idTurma}/${idUsuario}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao consultar status do pagamento:", error);
    throw error;
  }
}