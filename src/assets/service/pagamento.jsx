import api from "./api";

export async function pagamentoPix(){
  const response = await api.get("/pagamentos");
  return response.data;
}
