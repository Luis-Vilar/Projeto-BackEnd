const Depositos = require("../models/Depositos");
const { validarBody } = require("../libs/depositos.lib");
const { estaNaBD } = require("../libs/validators");

module.exports = {
  async store(req, res) {
    try {
      const body = req.body;
      // Validar se o body da requisição contem os campos necessários para criar um novo depósito
      if (!(await validarBody(body))) {
        res.status(400);
        throw new Error("Requisição com dados inválidos");
      }
      //cnpj esta na db ?
      if (await estaNaBD(Depositos, "cnpj", body.cnpj)) {
        res.status(409);
        throw new Error("CNPJ já cadastrado");
      }
      // razao social esta na db ?
      if (await estaNaBD(Depositos, "razao_social", body.razao_social)) {
        res.status(409);
        throw new Error("Razão Social já cadastrada");
      }
      //criar novo deposito na db
      const deposito = await Depositos.create(body);
      res.json(deposito);
    } catch (error) {
      // Se algum erro ocorrer, enviar o erro como resposta
      res.json({ message: error.message });
    }
  },
};
