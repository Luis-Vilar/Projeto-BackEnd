const Usuarios = require("../models/Usuarios.js");
const { estaNaBD } = require("../libs/validators.js");
const { validarBody } = require("../libs/usuarios.lib.js");

module.exports = {
  async store(req, res) {
    try {
      //validar se o body esta completo
      if (!(await validarBody(req.body))) {
        res.status(400);
        throw new Error("Requisição com dados inválidos");
      }
      const body = req.body;
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
};
