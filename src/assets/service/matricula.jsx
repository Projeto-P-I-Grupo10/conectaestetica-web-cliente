import api from "./api";

export async function listarMatriculas() {
    const response = await api.get(`/matriculas`);
    return response.data;
}

export async function listarMatriculaPorId(id) {
    const response = await api.get(`/matriculas/${id}`);
    return response.data;
}

export async function criarMatricula(data) {
    const response = await api.post(`/matriculas`, data);
    return response.data;
}

export async function atualizarMatricula(id, data) {
    const response = await api.put(`/matriculas/${id}`, data);
    return response.data;
}
export async function atualizarStatus(id, data) {
    const response = await api.put(`/matriculas/${id}/status`, data);
    return response.data;
}

export async function deleatMatricula(id) {
    const response = await api.put(`/matriculas/${id}`, data);
    return response.data;
}