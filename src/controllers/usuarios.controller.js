const Usuarios = require("../models/Usuarios.js");
const { estaNaBD } = require("../libs/validators.js");
const {
  validarBody,
  informoEmailESenha,
  gerarToken,
  verificarToken,
} = require("../libs/usuarios.lib.js");

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
  async update(req, res) {
    try {
      const body = req.body;
      const paramsId = req.params.id;
      const token = req.headers.authorization;
      //verificar se esta o token na requisição
      if (!token) {
        res.status(401);
        throw new Error("Token não informado");
      }
      //verificar se o token da requisição  é valido
      const payload = await verificarToken(token);
      if (!payload) {
        res.status(401);
        throw new Error("Token inválido");
      }
      //verificar se o id do usuario é o mesmo do token
      if (payload.id !== Number(paramsId)) {
        res.status(401);
        throw new Error("Sem permissão para atualizar este usuário");
      }
      //apenas atualizar os dados que forem enviados e so permitir atualizar nome, sobrenome, genero e telefone
      const { nome, sobrenome, genero, telefone } = body;
      const novosDados = {};
      if (nome) novosDados.nome = nome;
      if (sobrenome) novosDados.sobrenome = sobrenome;
      if (genero) novosDados.genero = genero;
      if (telefone) novosDados.telefone = telefone;
      //verificar se  tem algum dado para atualizar
      if (Object.keys(novosDados).length === 0) {
        res.status(400);
        throw new Error("Nenhum dado para atualizar foi recebido");
      }
      //atualizar o usuario na base de dados
      const user = await Usuarios.update(novosDados, {
        where: {
          id: paramsId,
        },
      });
      //verificar se o usuario foi atualizado
      if (user) {
        return res.status(202).json({
          message: `Usuário ${paramsId} atualizado com sucesso`,
          updated: novosDados,
        });
      }
      // caso algum erro ocorra devolvemos o erro para o cliente
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
  async status(req, res) {
    const status = req.body.status;
    const paramsId = req.params.id;
    const token = req.headers.authorization;
    try {
      await verificarToken(token);
      if ((status !== "ativo" && status !== "inativo") || !status) {
        res.status(400);
        let msg = !status
          ? "Status não informado"
          : "Status informado inválido";
        throw new Error(msg);
      }
      //tem algum usuario com esse id na bd?
      if (!(await estaNaBD(Usuarios, "id", paramsId))) {
        res.status(404);
        throw new Error("Usuário não encontrado");
      }
      //atualizar o status do usuario na base de dados
      const user = await Usuarios.update(
        { status },
        {
          where: {
            id: paramsId,
          },
        }
      );

      if (user) {
        res.status(200).json({
          message: `Usuario com id ${paramsId} atualizado com o status : ${status}`,
        });
      }
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
};
