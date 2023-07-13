const Depositos = require("../models/Depositos");
const { validarBody, filtroUpdate } = require("../libs/depositos.lib");
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
  async update(req, res) {
    const id = req.params.id;

    try {
      // Verificar se o depósito existe na base de dados
      const deposito = await Depositos.findByPk(id);
      if (!deposito) {
        res.status(404);
        throw new Error("Depósito não encontrado");
      }
      //verificar se o deposito esta ativo
      if (deposito.status !== "ativo") {
        res.status(403);
        throw new Error("Depósito esta inativo");
      }
      //filtrar dados do body
      const novos_dados = await filtroUpdate(req, res);
      //verificar se o usuario que esta requisitando  esta com status ativo
      if (req.payload.status !== "ativo") {
        res.status(403);
        throw new Error("Usuário não autorizado");
      }
      // Atualizar o depósito caso exista novos dados
      novos_dados && (await deposito.update(novos_dados));
      res.sendStatus(204);
    } catch (error) {
      // Se algum erro ocorrer, enviar o erro como resposta
      res.json({ message: error.message });
    }
  },
};
