import api from "./api";

export async function listarAvaliacoesCurso(cursoId) {
  const response = await api.get(`/avaliacaoCurso/${cursoId}`);
  return response.data;
}

export async function criarAvaliacaoCurso(dados) {
  const response = await api.post("/avaliacaoCurso", dados);
  return response.data;
}

export async function atualizarAvaliacaoCurso(id, dados) {
  const response = await api.put(`/avaliacaoCurso/${id}`, dados);
  return response.data;
}

export async function deletarAvaliacaoCurso(id) {
  await api.delete(`/avaliacaoCurso/${id}`);
}