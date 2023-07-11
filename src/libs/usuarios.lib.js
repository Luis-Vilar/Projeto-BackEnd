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
module.exports = {
    validarBody
}