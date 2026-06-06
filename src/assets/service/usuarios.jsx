import api from "./api";

export async function cadastrarUsuario(dados) {
  return await api.post("/usuarios", {
    nome: dados.nome,
    email: dados.email,
    senha: dados.senha,
    telefone: dados.telefone,
    tipoUsuario: "CLIENTE",
    endereco: [{
      cep: dados.cep,
      cidade: dados.cidade,
      numero: dados.numero,
      uf: dados.uf,
      rua: dados.rua,
      complemento: dados.complemento,
    }]
  });
}

export async function loginService({ email, senha }) {
  try {
    const response = await api.post("/usuarios/login", {
      email,
      senha,
    });
    return response.data;
  } catch (error) {
    console.error("Erro:", error.response?.data || error.message);
    throw error;
  }
}

export async function detalharUsuario(id)
{
     return await api.get(`/usuarios/${id}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
    console.error("Erro:", error.response?.data || error.message);
    });
}

export async function atualizarUsuario(usuario,id)
{
    return await api.put(`/usuarios/${id}`, {
    nome: usuario?.nome,
    email: usuario?.email,
    telefone: usuario?.telefone,
  })
    .then(response => {
      return response;
    })
    .catch(error => {
    console.error("Erro:", error.response?.data || error.message);
    });
}

export async function verificarSenhaUsuario(senhaAtual,id)
{
    return await api.post(`/usuarios/${id}/verificar-senha`, {
    senhaAtual: senhaAtual,
  })
    .then(response => {
      return response;
    })
    .catch(error => {
    console.error("Erro:", error.response?.data || error.message);
    });
}

export async function atualizarSenhaUsuario(novaSenha,id)
{
    return await api.patch(`/usuarios/${id}/senha`, {
    novaSenha: novaSenha,
  })
    .then(response => {
      return response;
    })
    .catch(error => {
    console.error("Erro:", error.response?.data || error.message);
    });
}