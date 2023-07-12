const Usuarios = require("../models/Usuarios.js");
const { config } = require("dotenv");
const { estaNaBD } = require("../libs/validators.js");
const {
  validarBody,
  informoEmailESenha,
  gerarToken,
} = require("../libs/usuarios.lib.js");
const { sign } = require("jsonwebtoken");
config();
module.exports = {
  async store(req, res) {
    try {
      const body = req.body;
      //validar se o body esta completo
      if (!(await validarBody(body))) {
        res.status(400);
        throw new Error("Requisição com dados inválidos");
      }
      //validar se o cpf ja esta cadastrado
      if (await estaNaBD(Usuarios, "cpf", body.cpf)) {
        res.status(409);
        throw new Error("CPF já cadastrado");
      }
      // tentativa de criar um usuario
      const user = await Usuarios.create(body);
      // verificar se o usuario foi criado
      if (user) {
        return res.status(201).json({
          message: "Usuário cadastrado com sucesso",
          identificador: user.id,
          status: user.status,
        });
      }
      // caso algum erro ocorra devolvemos o erro para o cliente
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
  async login(req, res) {
    try {
      const body = req.body;
      //validar se o body contem email e senha
      if (!(await informoEmailESenha(body))) {
        res.status(400);
        throw new Error("Requisição com dados inválidos");
      }
      //esta na bd?
      if (!(await estaNaBD(Usuarios, "email", body.email))) {
        res.status(404);
        throw new Error("Usuário não encontrado");
      }
      //gerar token
      await gerarToken(Usuarios, body, res);
      // caso algum erro ocorra devolvemos o erro para o cliente
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
};
