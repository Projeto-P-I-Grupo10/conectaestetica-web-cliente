import api from "./api";

export async function listarAreas() {
  const response = await api.get("/area-cursos");
  return response.data;
}

export async function cadastrarArea(data) {
  const response = await api.post("/area-cursos", data);
  return response.data;
}

export async function editarArea(id, data) {
  const response = await api.put(`/area-cursos/${id}`, data);
  return response.data;
}

export async function deletarArea(id) {
  const response = await api.delete(`/area-cursos/${id}`);
  return response.data;
}
