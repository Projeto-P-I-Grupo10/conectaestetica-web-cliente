import api from "./api";

export async function listarCurso(){
  const response = await api.get("/cursos");
  return response.data;
}

export async function exibirCursoId(id){
  const response = await api.get(`/cursos/${id}`);
  return response.data;
}