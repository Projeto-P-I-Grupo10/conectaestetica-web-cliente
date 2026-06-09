import api from "./api";

export async function listarAvaliacoesCurso(cursoId) {
  const response = await api.get(`/avaliacao-curso/${cursoId}`);
  return response.data;
}

export async function criarAvaliacaoCurso(dados) {
  const response = await api.post("/avaliacao-curso", dados);
  return response.data;
}

export async function atualizarAvaliacaoCurso(id, dados) {
  const response = await api.put(`/avaliacao-curso/${id}`, dados);
  return response.data;
}

export async function deletarAvaliacaoCurso(id) {
  await api.delete(`/avaliacao-curso/${id}`);
}