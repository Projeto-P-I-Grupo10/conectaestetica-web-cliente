import api from "./api";

export async function listarAreas() {
  const response = await api.get("/areaCursos");
  return response.data;
}

export async function cadastrarArea(data) {
  const response = await api.post("/areaCursos", data);
  return response.data;
}

export async function editarArea(id, data) {
  const response = await api.put(`/areaCursos/${id}`, data);
  return response.data;
}

export async function deletarArea(id) {
  const response = await api.delete(`/areaCursos/${id}`);
  return response.data;
}
