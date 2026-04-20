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

export async function consultarStatusPix(idCurso, idUsuario) {
  try {
    const response = await apiPag.get(`/pagamentos/status/${idCurso}/${idUsuario}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao consultar status do pagamento:", error);
    throw error;
  }
}