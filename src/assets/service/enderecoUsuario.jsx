import api from "./api";


export async function listarEnderecosPorUsuario(usuarioId) {
  const response = await api.get(`/historicos-endereco/usuario/${usuarioId}`);
  return response.data;
}


export async function buscarEndereco(id) {
  const response = await api.get(`/historicos-endereco/${id}`);
  return response.data;
}


export async function cadastrarEndereco(data) {
  const response = await api.post("/historicos-endereco", data);
  return response.data;
}


export async function editarEndereco(id, data) {
  const response = await api.put(`/historicos-endereco/${id}`, data);
  return response.data;
}


export async function deletarEndereco(id) {
  const response = await api.delete(`/historicos-endereco/${id}`);
  return response.data;
}

export async function selecionarEnderecoAtual(id) {
  const response = await api.put(`/historicos-endereco/${id}/selecionar`);
  return response.data;
}
