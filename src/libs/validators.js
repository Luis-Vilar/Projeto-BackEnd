//função para validar senha
async function validaSenha(senha) {
  const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*\W)[a-zA-Z0-9\W]{8,}$/;
  if (!regex.test(senha)) {
    throw new Error(
      "A senha deve ter no mínimo 8 caracteres, mínimo 1 letra maiúscula, mínimo 1 número e mínimo 1 caracteres"
    );
  }
  return regex.test(senha);
}
//funçao para validar email
async function validaEmail(email) {
  // este regex e para validar email com domínio .com, .br, .net, etc
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!regex.test(email)) {
    throw new Error(
      "Email incorreto, verificar se e um e-mail valido, ex: name@example.com"
    );
  }
  return regex.test(email);
}
// funçao para verificar se o valor esta no banco de dados
async function estaNaBD(modelo, columna, valor) {
  const achado = await modelo.findOne({
    where: {
      [columna]: valor,
    },
  });
  return achado ? true : false;
}
async function usuarioEstaAtivo(usuario_id, res) {
  const Usuarios = require("../models/Usuarios");
  const usuario = await Usuarios.findByPk(usuario_id);
  if (usuario.status !== "ativo") {
    res.status(401);
    throw new Error("Usuário não autorizado");
  }
  return true;
}

module.exports = {
  validaSenha,
  validaEmail,
  estaNaBD,
  usuarioEstaAtivo
};
