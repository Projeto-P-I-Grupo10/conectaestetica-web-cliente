import api from "./api";

// End-points para a visualização dos cursos do usuário

export async function listarCurso() {
  const response = await api.get("/turmas/detalhes");
  return response.data;
}

export async function exibirCursoId(id) {
  const response = await api.get(`/cursos/${id}`);
  return response.data;
}

export async function exibirCursoDetalheId(id) {
  const response = await api.get(`/turmas/detalhes/${id}`);
  return response.data;
}

export async function filtroRecentes() {
  const response = await api.get(`/turmas/detalhes-recentes`);
  return response.data;
}

export async function filtroPreco() {
  const response = await api.get(`/turmas/detalhes-preco`);
  return response.data;
}


export async function filtroAvaliacao() {
  const response = await api.get(`/turmas/detalhes-avaliacao`);
  return response.data;
}

// End-points dos cursos em si ]

export async function deletarCurso(id) {
  const response = await api.delete(`/cursos/${id}`);
  return response.data;
}

export async function cadastrarCursos(data) {
  const response = await api.post(`/cursos`, data);
  return response.data;
}

export async function editarCursos(id, data) {
  const response = await api.put(`/cursos/${id}`, data);
  return response.data;
}

export async function tabelaCursos() {
  const response = await api.get("/cursos");
  return response.data;
}