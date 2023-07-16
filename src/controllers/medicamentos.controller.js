const Medicamentos = require("../models/Medicamentos");
const MedicamentoDeposito = require("../models/MedicamentoDeposito");
const { usuarioEstaAtivo, estaNaBD } = require("../libs/validators");
const { validarBody, filtroStore } = require("../libs/medicamentos.lib");

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
    var medicamento = null;
    //validar se o medicamento esta  na bd
    if (
      await estaNaBD(
        Medicamentos,
        "nome_medicamento",
        req.body.nome_medicamento
      )
    ) {
      //se o medicamento esta na bd pegamos ele para cadastrar no deposito
      medicamento = await Medicamentos.findOne({
        where: { nome_medicamento: req.body.nome_medicamento },
      });
    } else {
      //caso contrario criamos o medicamento e pegamos ele para cadastrar no deposito
      const dados_medicamento = await filtroStore(body);
      medicamento = await Medicamentos.create(dados_medicamento);
    }

    // Guardar en la tabla medicamento_deposito
    const dados = {};

    dados.quantidade = quantidade;
    dados.medicamentoId = medicamento.id;
    dados.depositoId = deposito_id;

    const medicamento_deposito = await MedicamentoDeposito.create(dados);

    if (!medicamento) {
      throw new Error("Erro ao cadastrar medicamento");
    }
    if (!medicamento_deposito) {
      medicamento && (await medicamento.destroy());
      throw new Error("Erro ao cadastrar medicamento no deposito");
    }

    if (medicamento && medicamento_deposito) {
      res.status(201).json({
        message: "Medicamento cadastrado com sucesso",
        medicamento,
        medicamento_deposito,
      });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
}

module.exports = {
  store,
};
