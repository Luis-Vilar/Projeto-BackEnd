const Depositos = require("../models/Depositos");
const {
  validarBody,
  filtroUpdate,
  filtroStatus,
} = require("../libs/depositos.lib");
const { estaNaBD, usuarioEstaAtivo } = require("../libs/validators");

module.exports = {
  async store(req, res) {
    const usuario_id = req.payload.id;
    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id);
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
    const usuario_id = req.payload.id;
    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id);
      //verificar se o id passado por parâmetro  e numérico
      if (isNaN(id)) {
        res.status(400);
        throw new Error(
          "Id passado por parâmetro obrigatoriamente deve ser numérico"
        );
      }
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
  async status(req, res) {
    const usuario_id = req.payload.id;
    const id = req.params.id;

    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id);

      if (isNaN(id)) {
        //verificar se o id passado por parâmetro  e numérico
        res.status(400);
        throw new Error(
          "Id passado por parâmetro obrigatoriamente deve ser numérico"
        );
      }
      // Verificar se o depósito existe na base de dados
      const deposito = await Depositos.findByPk(id);
      if (!deposito) {
        res.status(404);
        throw new Error("Depósito não encontrado");
      }
      // filtrar dados do body
      const novo_status = await filtroStatus(req, res);
      // Atualizar o depósito caso exista novos dados
      novo_status && (await deposito.update(novo_status));
      res.sendStatus(204);
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  async index(req, res) {
    const status = req.query.status;
    const usuario_id = req.payload.id;
    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id);
      //verificar se o status passado por parâmetro  e válido
      if (status && !["ativo", "inativo"].includes(status.toLowerCase())) {
        res.status(400);
        throw new Error("Status na query params inválido");
      }
      // garantir que o status seja passado em minúsculo
      const status_pesquisado = status ? { status: status.toLowerCase() } : {};
      // Listar todos os depósitos ativos ou inativos segundo o status seja passado por query params
      const depositos = await Depositos.findAll({
        where: status_pesquisado,
        attributes: [
          "id",
          "razao_social",
          "cnpj",
          "telefone",
          "email",
          "celular",
          "cep",
          "logradouro",
          "numero",
          "cidade",
          "estado",
        ],
        include: {
          association: "usuario",
          attributes: ["nome", "email", "status"],
        },
      });
      //  e se não listar todos os depósitos
      status
        ? res.json({
            ["depositos_" + String(status).toLocaleLowerCase()]: depositos,
          })
        : res.json({ todos_os_depositos: depositos });
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  async indexId(req, res) {
    const id = req.params.id;
    const usuario_id = req.payload.id;
    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id);
      //verificar se o id passado por parâmetro  e numérico
      if (isNaN(id)) {
        res.status(400);
        throw new Error(
          "Id passado por parâmetro obrigatoriamente deve ser numérico"
        );
      }
      // Verificar se o depósito existe na base de dados
      const deposito = await Depositos.findByPk(id, {
        attributes: [
          "id",
          "status",
          "razao_social",
          "nome_fantasia",
          "cnpj",
          "email",
          "celular",
          "telefone",
          "cep",
          "estado",
          "cidade",
          "bairro",
          "logradouro",
          "numero",
          "complemento",
          "latitude",
          "longitude",
        ],
        include: {
          association: "usuario",
          attributes: ["nome", "email", "status"],
        },
      });
      if (!deposito) {
        res.status(404);
        throw new Error("Depósito não encontrado");
      }
      res.json(deposito);
    } catch (error) {
      res.json({ message: error.message });
    }
  },
};
