const Depositos = require("../models/Depositos");
const {
  validarBody,
  filtroUpdate,
  filtroStatus,
  filtroStore,
} = require("../libs/depositos.lib");
const { estaNaBD, usuarioEstaAtivo } = require("../libs/validators");

module.exports = {
  async store(req, res) {
    const usuario_id = req.payload.id;
    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id, res);
      const body = req.body;
      //verificar que o usuario não tenha um deposito ya cadastrado
      if (await estaNaBD(Depositos, "usuario_id", usuario_id)) {
        res.status(409);
        throw new Error("Usuário já possui um depósito cadastrado");
      }
      // Validar se o body da requisição contem os campos necessários para criar um novo depósito
      if (!(await validarBody(body, usuario_id))) {
        res.status(400);
        throw new Error("Requisição com dados inválidos");
      }
      //cnpj esta na db ?
      if (await estaNaBD(Depositos, "cnpj", body.cnpj)) {
        res.status(409);
        throw new Error("CNPJ já cadastrado");
      }
      //email esta na db ?
      if (await estaNaBD(Depositos, "email", body.email)) {
        res.status(409);
        throw new Error("Email já cadastrado");
      }
      // razao social esta na db ?
      if (await estaNaBD(Depositos, "razao_social", body.razao_social)) {
        res.status(409);
        throw new Error("Razão Social já cadastrada");
      }
      //nome fantasia esta na db ?
      if (await estaNaBD(Depositos, "nome_fantasia", body.nome_fantasia)) {
        res.status(409);
        throw new Error("Nome Fantasia já cadastrado");
      }


      //criar novo deposito na db
      const deposito = await Depositos.create(await filtroStore(body, usuario_id));
      res.json(deposito);
    } catch (error) {
      // Se algum erro ocorrer, enviar o erro como resposta
      return res.json(error.message);
    }
  },
  async update(req, res) {
    const id = req.params.id;
    const usuario_id = req.payload.id;
    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id, res);
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
      //verificar as unique da tabela deposito antes de tentar atualizar 
      if (novos_dados.nome_fantasia && await estaNaBD(Depositos, "nome_fantasia", novos_dados.nome_fantasia)) {
        res.status(409);
        throw new Error("nome_fantasia ja cadastrado")
      }
      // Atualizar o depósito caso exista novos dados
      novos_dados && (await deposito.update(novos_dados));
      res.sendStatus(204);
    } catch (error) {
      // Se algum erro ocorrer, enviar o erro como resposta
      return res.json(error.message);
    }
  },
  async status(req, res) {
    const usuario_id = req.payload.id;
    const id = req.params.id;

    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id, res);

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
      return res.json(error.message);
    }
  },
  async index(req, res) {
    const status = req.query.status;
    const usuario_id = req.payload.id;
    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id, res);
      //verificar se o status passado por parâmetro  e válido
      if (status && !["ativo", "inativo"].includes(status.toLowerCase())) {
        res.status(400);
        throw new Error("Status na query params inválido ");

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
      //  verifica se o status foi passado por query params, caso sim,
      //  retorna um objeto com o status passado por parâmetro e setea o nome 
      //  do objeto com o status [exemplo : depósitos_ativos ] caso contrário, 
      //  retorna um objeto com o nome depositos e o array de todos os depositos
      status
        ? res.json({
          ["depositos_" + String(status).toLocaleLowerCase()]: depositos,
        })
        : res.json({ depositos });
    } catch (error) {
      return res.json(error.message);
    }
  },
  async indexId(req, res) {
    const id = req.params.id;
    const usuario_id = req.payload.id;
    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id, res);
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
      return res.json(error.message);
    }
  },
  async deleteId(req, res) {
    const id = req.params.id;
    const usuario_id = req.payload.id;
    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id, res);
      //verificar se o id passado por parâmetro  e numérico
      if (isNaN(id)) {
        res.status(400);
        throw new Error(
          "Id passado por parâmetro obrigatoriamente deve ser numérico"
        );
      }
      // Verificar se o depósito existe na base de dados
      const deposito = await Depositos.findByPk(id, {
        include: {
          association: "medicamentos",
        },
      });
      if (!deposito) {
        res.status(404);
        throw new Error("Depósito não encontrado");
      }
      //verificar se o deposito esta ativo
      if (deposito.status !== "inativo") {
        res.status(403);
        throw new Error("Depósito esta ativo, não pode ser deletado");
      }
      //verificar se o deposito esta vinculado a algum medicamento
      if (deposito.medicamentos.length > 0) {
        res.status(403);
        throw new Error(
          "Depósito esta vinculado a algum medicamento, não pode ser deletado"
        );
      }
      //deletar deposito
      await deposito.destroy();
      res.sendStatus(204);
    } catch (error) {
      return res.json(error.message);
    }
  },
};
