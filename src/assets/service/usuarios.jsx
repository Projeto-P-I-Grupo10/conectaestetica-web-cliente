import axios from "axios";

export function cadastrarUsuario(dados) {
  return axios.post("http://localhost:8080/usuarios", {
    nome: dados.nome,
    email: dados.email,
    senha: dados.senha,
    telefone: dados.telefone,
    tipoUsuario: "CLIENTE",
    endereco: [{
      cep: dados.cep,
      cidade: dados.cidade,
      numero: dados.numero,
      uf: "SP",
      rua: "Feliciano de Mendonça",
      complemento: "São paulo",
    }]
  });
}

export function LoginService({email, senha}){
    axios.post("http://localhost:8080/usuarios/login", {
    email: email,
    senha: senha,
    })
    .then(response => {
    console.log("Sucesso:", response.data);
    })
    .catch(error => {
    console.error("Erro:", error.response?.data || error.message);
    });
}