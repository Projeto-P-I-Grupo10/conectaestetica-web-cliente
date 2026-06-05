import api from "./api";

export async function listarTurmas() {
  const response = await api.get("/turmas/detalhes");
  return response.data;
}

export async function cadastrarTurma(data) {
  const response = await api.post("/turmas", data);
  return response.data;
}

export async function editarTurma(id, data) {
  const response = await api.put(`/turma/${id}`, data);
  return response.data;
}

export async function deletarTurma(id) {
  const response = await api.delete(`/turma/${id}`);
  return response.data;
}
