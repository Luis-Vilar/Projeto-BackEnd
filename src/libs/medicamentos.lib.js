const Medicamentos = require("../models/Medicamentos");
const MedicamentoDeposito = require("../models/MedicamentoDeposito");
const Depositos = require("../models/Depositos");
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
async function salvarMedicamento(body, quantidade, usuario_id, req, res) {
  //pegamos o deposito do usuario que esta fazendo a requisição
  const deposito_usuario = await Depositos.findOne({
    where: { usuario_id: usuario_id },
  });
  //verificamos se tem um deposito para o usuario
  if (!deposito_usuario) {
    throw new Error("Você não tem um deposito cadastrado");
  }

  var medicamento = null;
  //validar se o medicamento esta  na bd
  if (
    await estaNaBD(Medicamentos, "nome_medicamento", req.body.nome_medicamento)
  ) {
    //se o medicamento esta na bd pegamos ele
    medicamento = await Medicamentos.findOne({
      where: { nome_medicamento: req.body.nome_medicamento },
    });
    //antes atualizamos o medicamento
    await medicamento.update(await filtroStore(body));
  } else {
    //caso contrario criamos o medicamento
    const dados_medicamento = await filtroStore(body);
    medicamento = await Medicamentos.create(dados_medicamento);
  }

  // agora vamos criar a relação entre o medicamento e o deposito
  const dados = {
    quantidade: quantidade,
    medicamentoId: medicamento.id,
    depositoId: deposito_usuario.id,
  };

  //verificar se nao existe o medicamento no deposito para nao duplicar
  var atualizou = false;

  const medicamento_deposito_bd = await MedicamentoDeposito.findOne({
    where: { medicamentoId: dados.medicamentoId, depositoId: dados.depositoId },
  });

  var medicamento_novo = null;

  if (!medicamento_deposito_bd) {
    //se o medicamento nao esta no deposito criamos ele
    medicamento_novo = await MedicamentoDeposito.create(dados);
  } else {
    //se o medicamento ja esta no deposito atualizamos a quantidade
    dados.quantidade += medicamento_deposito_bd.quantidade;
    await medicamento_deposito_bd.update(dados);
    atualizou = true;
  }

  if (!medicamento) {
    //se o medicamento nao foi criado corretamente  criamos um erro para retornar
    throw new Error("Erro ao cadastrar medicamento");
  }

  if (medicamento && !atualizou) {
    res.status(201).json({
      message: "Medicamento cadastrado com sucesso",
      medicamento,
      medicamento_novo,
    });
  } else {
    res.status(201).json({
      message: "Medicamento atualizado com sucesso",
      medicamento,
      medicamento_deposito_bd,
    });
  }
}
module.exports = {
  validarBody,
  filtroStore,
  salvarMedicamento,
};
