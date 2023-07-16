const { usuarioEstaAtivo } = require("../libs/validators");
const { validarBody, salvarMedicamento } = require("../libs/medicamentos.lib");

async function store(req, res) {
  const body = req.body;
  const usuario_id = req.payload.id;
  const deposito_id = body.deposito_id;
  const quantidade = body.quantidade;

  try {
    if (deposito_id == null || quantidade == null || usuario_id == null) {
      throw new Error("Requisição incompleta");
    }
    // validar que usuario este ativo na bd
    await usuarioEstaAtivo(usuario_id);
    // validar que o body tenha os campos necessarios
    if (!(await validarBody(body))) {
      res.status(400);
      throw new Error("Requisição com dados inválidos");
    }
    salvarMedicamento(body, deposito_id, quantidade, req, res);
  } catch (error) {
    res.json({ error: error.message });
  }
}

module.exports = {
  store,
};
