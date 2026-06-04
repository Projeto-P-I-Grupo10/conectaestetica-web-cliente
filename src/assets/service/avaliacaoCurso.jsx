import api from "./api";

export async function listarAvaliacoesCurso() {
  const response = await api.get("/avaliacaoCurso");
  return response.data;
}

export async function criarAvaliacaoCurso(dados) {
  const response = await api.post("/avaliacaoCurso", dados);
  return response.data;
}