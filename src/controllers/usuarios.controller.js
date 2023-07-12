const Usuarios = require("../models/Usuarios.js");
const { config } = require("dotenv");
const { estaNaBD } = require("../libs/validators.js");
const { validarBody, informoEmailESenha } = require("../libs/usuarios.lib.js");
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
      //existe cadastro com o email e senha informados?
      const user = await Usuarios.findOne({
        where: {
          email: body.email,
        },
      });
      //validar se o usuario existe
      if (!user) {
        res.status(404);
        throw new Error("Usuário não encontrado");
      }
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
        //retornar token
        return res.status(200).json({
          token,
        });
      } else {
        res.status(401);
        throw new Error("Falha na autenticação");
      }
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
};
