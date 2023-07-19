const { sign } = require("jsonwebtoken");
// const { config } = require("dotenv");
// config();
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
async function gerarToken(Usuarios, body, res) {
  //pegamos o usuario da base de dados
  const user = await Usuarios.findOne({
    where: {
      email: body.email,
    },
  });

  //validar se o usuario esta ativo na base de dados
  if (user.status === "inativo") {
    res.status(401);
    throw new Error("Seu usuario esta inativo");
  }
  //validar senha
  if (body.senha === user.senha) {
    //gerar payload
    const payload = { status: user.status, id: user.id };
    //gerar token
    const token = sign(payload, process.env.JWT_KEY, {
      expiresIn: "1d",
    });
    //devolver o token para o cliente
    return res.status(200).json({
      token,
    });
  } else {
    res.status(401);
    throw new Error("Falha na autenticação");
  }
}
module.exports = {
  validarBody,
  informoEmailESenha,
  gerarToken,
};
