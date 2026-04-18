import api from "./api";

export async function listarCurso(){
  const response = await api.get("/cursos");
  return response.data;
}