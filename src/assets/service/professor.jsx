import api from "./api";

export async function listarProfessores() {
  const response = await api.get("/professores");
  return response.data;
}

export async function cadastrarProfessor(data) {
  const response = await api.post("/professores", data);
  return response.data;
}

export async function editarProfessor(id, data) {
  const response = await api.put(`/professores/${id}`, data);
  return response.data;
}

export async function deletarProfessor(id) {
  const response = await api.delete(`/professores/${id}`);
  return response.data;
}
