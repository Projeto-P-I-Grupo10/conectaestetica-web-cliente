import api from "./api";
import apiPag from "./apiPagamento";


export async function dispararPagamentoPix(dados) {
  const response = await api.post("/pagamentos", {
    idTurma: dados.idTurma,
    idUsuario: dados.idUsuario,
    email: dados.email,
    metodoPagamento: dados.metodoPagamento,
    status: "pendente",
    valor: dados.valor,
  });
  return response.data;
}


export async function aguardarQrCode(
  idCurso,
  idUsuario,
  { intervaloMs = 2000, tentativas = 15 } = {}
) {
  for (let i = 0; i < tentativas; i++) {
    try {
      const { data } = await apiPag.get(
        `/pagamentos/${idCurso}/${idUsuario}/qrcode`
      );
      if (data?.qrCode) {
        return data; // { qrCodeImage, qrCode }
      }
    } catch (error) {
      console.warn("QR Code ainda não disponível, tentando novamente...", error?.message);
    }
    await new Promise((r) => setTimeout(r, intervaloMs));
  }
  throw new Error("QR Code não ficou pronto a tempo");
}

export async function carregarQrCodeAtivo(idCurso, idUsuario) {
  try {
    const { data } = await apiPag.get(
      `/pagamentos/${idCurso}/${idUsuario}/qrcode`
    );
    const expira = data?.dataExpiracao ? new Date(data.dataExpiracao) : null;
    if (data?.qrCode && expira && expira > new Date()) {
      return data; // QR ainda válido → reexibir
    }
  } catch (error) {
    // 404/500 "Pagamento não encontrado" → ainda não há QR ativo
    console.warn("Nenhum QR Code ativo encontrado:", error?.message);
  }
  return null; // precisa gerar um novo
}

export async function consultarStatusPix(idCurso, idUsuario) {
  try {
    const response = await apiPag.get(
      `/pagamentos/status/${idCurso}/${idUsuario}`
    );
    return response.data; // { status }
  } catch (error) {
    console.error("Erro ao consultar status do pagamento:", error);
    throw error;
  }
}

export async function pagamentoPix(dados) {
  await dispararPagamentoPix(dados);
  return aguardarQrCode(dados.idTurma, dados.idUsuario);
}