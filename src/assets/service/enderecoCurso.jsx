import api from "./api";

export async function listarEnderecosCurso() {
  const response = await api.get("/enderecos-curso");
  return response.data;
}

export async function buscarEnderecoCursoPorId(id) {
  const response = await api.get(`/enderecos-curso/${id}`);
  return response.data;
}

export async function cadastrarEnderecoCurso(data) {
  const response = await api.post("/enderecos-curso", data);
  return response.data;
}

export async function editarEnderecoCurso(id, data) {
  const response = await api.put(`/enderecos-curso/${id}`, data);
  return response.data;
}

export async function deletarEnderecoCurso(id) {
  const response = await api.delete(`/enderecos-curso/${id}`);
  return response.data;
}
