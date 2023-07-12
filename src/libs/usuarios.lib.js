async function validarBody(body) {
  const {
    genero,
    email,
    nome,
    data_nascimento,
    cpf,
    senha,
    telefone,
    sobrenome,
  } = body;
  if (
    !genero ||
    !email ||
    !nome ||
    !data_nascimento ||
    !cpf ||
    !senha ||
    !telefone ||
    !sobrenome
  ) {
    return false;
  }
  return true;
}
async function informoEmailESenha(body) {
  const { email, senha } = body;
  if (!email || !senha) {
    return false;
  }
  return true;
}
module.exports = {
  validarBody,
  informoEmailESenha,
};
