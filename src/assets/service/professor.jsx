import api from "./api";

export async function listarProfessores() {
  const response = await api.get("/professores");
  return response.data;
}