const Medicamentos = require("../models/Medicamentos");
const MedicamentoDeposito = require("../models/MedicamentoDeposito");
const { estaNaBD } = require("../libs/validators");
async function validarBody(body) {
  const {
    nome_medicamento,
    nome_laboratorio,
    dosagem,
    unidade_dosagem,
    tipo,
    preco_unitario,
  } = body;
  if (
    !nome_medicamento ||
    !nome_laboratorio ||
    !dosagem ||
    !unidade_dosagem ||
    !tipo ||
    !preco_unitario
  ) {
    return false;
  }
  return true;
}
async function filtroStore(body) {
  // so destruturamos os campos que queremos permitir atualizar
  const {
    nome_medicamento,
    nome_laboratorio,
    dosagem,
    unidade_dosagem,
    tipo,
    preco_unitario,
    descricao,
  } = body;
  // criamos um objeto vazio
  const novos_dados = {};
  // verificamos se o campo existe no body e se existe adicionamos ao objeto
  if (nome_medicamento) {
    novos_dados.nome_medicamento = nome_medicamento;
  }
  if (nome_laboratorio) {
    novos_dados.nome_laboratorio = nome_laboratorio;
  }
  if (dosagem) {
    novos_dados.dosagem = dosagem;
  }
  if (unidade_dosagem) {
    novos_dados.unidade_dosagem = unidade_dosagem;
  }
  if (tipo) {
    novos_dados.tipo = tipo;
  }
  if (preco_unitario) {
    novos_dados.preco_unitario = preco_unitario;
  }
  if (descricao) {
    novos_dados.descricao = descricao;
  }
  return novos_dados;
}
async function salvarMedicamento(
  body,
  deposito_id,
  quantidade,
  req,
  res
) {
  var medicamento = null;
  //validar se o medicamento esta  na bd
  if (
    await estaNaBD(Medicamentos, "nome_medicamento", req.body.nome_medicamento)
  ) {
    //se o medicamento esta na bd pegamos ele para cadastrar no deposito
    medicamento = await Medicamentos.findOne({
      where: { nome_medicamento: req.body.nome_medicamento },
    });
    //antes atualizamos o medicamento
    await medicamento.update(await filtroStore(body));
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

  //verificar se nao existe o medicamento no deposito para nao duplicar
  let medicamento_deposito = null;

  const medicamento_deposito_bd = await MedicamentoDeposito.findOne({
    where: { medicamentoId: medicamento.id, depositoId: deposito_id },
  });

  if (!medicamento_deposito_bd) {
    //se o medicamento nao esta no deposito criamos ele
    medicamento_deposito = await MedicamentoDeposito.create(dados);
  } else {
    //se o medicamento ja esta no deposito atualizamos a quantidade
    dados.quantidade += medicamento_deposito_bd.quantidade;
    medicamento_deposito = await medicamento_deposito_bd.update(dados);
  }
  if (!medicamento) {
    //se o medicamento nao foi criado corretamente  criamos um erro para retornar
    throw new Error("Erro ao cadastrar medicamento");
  }
  if (!medicamento_deposito) {
    // se nao foi possivel cadastrar o medicamento no deposito deletamos o medicamento da
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
}
module.exports = {
  validarBody,
  filtroStore,
  salvarMedicamento,
};
