import api from "./api";

export async function listarTurmas() {
  const response = await api.get("/turmas/detalhes");
  return response.data;
}

export async function buscarTurmaPorId(id) {
  const response = await api.get(`/turmas/detalhes/${id}`);
  return response.data;
}

export async function listarTurmasRecentes() {
  const response = await api.get("/turmas/detalhes-recentes");
  return response.data;
}

export async function listarTurmasPorPreco() {
  const response = await api.get("/turmas/detalhes-preco");
  return response.data;
}

export async function listarTurmasPorAvaliacao() {
  const response = await api.get("/turmas/detalhes-avaliacao");
  return response.data;
}

export async function listarTurmasPorArea() {
  const response = await api.get("/turmas/detalhes-area");
  return response.data;
}

export async function cadastrarTurma(data) {
  const response = await api.post("/turmas", data);
  return response.data;
}

export async function editarTurma(id, data) {
  const response = await api.put(`/turmas/${id}`, data);
  return response.data;
}

export async function deletarTurma(id) {
  const response = await api.delete(`/turmas/${id}`);
  return response.data;
}