import axios from "axios";
// import api from "./api";

//exemplo com api config token
// export function cadastrarUsuario(dados) {
//   return api.post("usuarios", {
//     nome: dados.nome,
//     email: dados.email,
//     senha: dados.senha,
//     telefone: dados.telefone,
//     tipoUsuario: "CLIENTE",
//     endereco: [{
//       cep: dados.cep,
//       cidade: dados.cidade,
//       numero: dados.numero,
//       uf: "SP",
//       rua: "Feliciano de Mendonça",
//       complemento: "São paulo",
//     }]
//   });
// }

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

export function loginService({email, senha}){
    return axios.post("http://localhost:8080/usuarios/login", {
    email: email,
    senha: senha,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
    console.error("Erro:", error.response?.data || error.message);
    });
}