import api from "./api";

export async function listarCurso(){
  const response = await api.get("/turmas/detalhes");
  return response.data;
}

export async function exibirCursoId(id){
  const response = await api.get(`/cursos/${id}`);
  return response.data;
}

export async function exibirCursoDetalheId(id){
  const response = await api.get(`/turmas/detalhes/${id}`);
  return response.data;
}