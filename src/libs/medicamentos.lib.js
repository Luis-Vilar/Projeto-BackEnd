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
  //verificamos se tem um deposito vinculado ao usuario
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

  var medicamento_deposito_novo = null;

  if (!medicamento_deposito_bd) {
    //se o medicamento nao esta no deposito criamos ele
    medicamento_deposito_novo = await MedicamentoDeposito.create(dados);
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
  // se o medicamento e a relaçao com o deposito foram criados corretamente retornamos uma mensagem de sucesso
  res.status(201);
  if (medicamento && !atualizou) {
    res.json({
      message: "Medicamento cadastrado com sucesso",
      medicamento,
      medicamento_deposito_novo,
    });
  } else {
    res.json({
      message: "Medicamento atualizado com sucesso",
      medicamento,
      medicamento_deposito_bd,
    });
  }
}
async function filtroUpdate(body) {

  const {
    descricao, preco_unitario
  } = body;

  const novos_dados = {};

  if (preco_unitario) {
    novos_dados.preco_unitario = preco_unitario;
  }

  if (descricao) {
    novos_dados.descricao = descricao;
  }
  console.log(novos_dados)
  return novos_dados;

}
async function atualizarMedicamento(usuario_id, medicamento_id, quantidade, req, res) {
  const dados_medicamento = await filtroUpdate(req.body);

  const medicamento = await Medicamentos.findOne({
    where: { id: medicamento_id },
  });

  const deposito_usuario = await Depositos.findOne({
    where: { usuario_id: usuario_id },
  });

  const medicamento_deposito_bd = await MedicamentoDeposito.findOne({
    where: { medicamentoId: medicamento_id, depositoId: deposito_usuario.id },
  });

  if (medicamento && medicamento_deposito_bd) {
    medicamento.update(dados_medicamento);
    medicamento_deposito_bd.update({ quantidade: quantidade });
  } else {
    res.status(404);
    throw new Error("Não existe esse medicamento no seu deposito");
  }

  res.json({ msg: `Medicamento atualizado no deposito Nº ${deposito_usuario.id} - ${deposito_usuario.nome_fantasia}`, ...medicamento.dataValues, quantidade: medicamento_deposito_bd.quantidade })

}
async function listarMedicamentos(req, res) {
  var medicamentos = null;
  const tipo_params = req.query.tipo;
  //se nao vem o tipo de medicamento na query listamos todos os medicamentos
  if (!tipo_params) {
    medicamentos = await Medicamentos.findAll(
      {
        include: {
          model: MedicamentoDeposito,
          attributes: ["quantidade"],
          include: {
            model: Depositos,
            attributes: ["nome_fantasia", "logradouro", "numero", "bairro", "cidade", "estado", "cep"],
          },

        },
      }
    )
    return res.json(medicamentos)
  }
  //se vem o tipo de medicamento na query listamos os medicamentos de acordo com o tipo
  const buscar = tipo_params.toLowerCase();
  //verificamos se o tipo de medicamento é valido
  if (buscar != "controlado" && buscar != "naocontrolado") {
    throw new Error("Tipo de medicamento invalido, tente controlado ou naocontrolado");
  }
  //se o tipo de medicamento for controlado listamos os medicamentos controlados
  if (buscar == "controlado") {
    medicamentos = await Medicamentos.findAll({
      where: { tipo: "Controlado" },
      include: {
        model: MedicamentoDeposito,
        attributes: ["quantidade"],
        include: {
          model: Depositos,
          attributes: ["nome_fantasia", "logradouro", "numero", "bairro", "cidade", "estado", "cep"],
        },

      },
    });
    return res.json(medicamentos);
  }
  //se o tipo de medicamento for naocontrolado listamos os medicamentos naocontrolados
  if (buscar == "naocontrolado") {
    medicamentos = await Medicamentos.findAll({
      where: { tipo: "Não controlado" },
      include: {
        model: MedicamentoDeposito,
        attributes: ["quantidade"],
        include: {
          model: Depositos,
          attributes: ["nome_fantasia", "logradouro", "numero", "bairro", "cidade", "estado", "cep"],
        },

      },
    });
  }
  //se existir medicamentos retornamos eles
  if (medicamentos) {
    return res.json(medicamentos);
  } else {
    //se nao existir medicamentos retornamos um erro
    throw new Error("Não existe medicamentos cadastrados");
  }
}
async function listarMedicamentosId(req, res) {
  // pegamos o id do medicamento na url
  const medicamento_id = req.params.id;
  //buscamos o medicamento no banco de dados com o id passado na url
  const medicamento = await Medicamentos.findOne({
    where: { id: medicamento_id },
    include: {
      model: MedicamentoDeposito,
      attributes: ["quantidade"],
      include: {
        model: Depositos,
        attributes: ["nome_fantasia", "logradouro", "numero", "bairro", "cidade", "estado", "cep"],
      },
    },
  });
  //se o medicamento existir retornamos ele
  if (medicamento) {
    return res.json(medicamento);
  } else {
    //se o medicamento nao existir retornamos um erro
    res.status(404);
    throw new Error("Medicamento não encontrado");
  }
}
async function deletarMedicamento(req, res) {
  //pegamos o id do medicamento na url
  const medicamento_id = req.params.id;
  //buscamos o medicamento no banco de dados com o id passado na url
  const medicamento = await Medicamentos.findOne({
    where: { id: medicamento_id },
    include: {
      model: MedicamentoDeposito,
      attributes: ["quantidade"],
      include: {
        model: Depositos,
        attributes: ["nome_fantasia", "logradouro", "numero", "bairro", "cidade", "estado", "cep"],
      },
    },

  });
  //se o medicamento nao existir retornamos um erro
  if (!medicamento) {
    res.status(404);
    throw new Error("Medicamento não encontrado");
  }
  //se o medicamento nao estiver asociado a nenhum deposito podemos deletar ele caso contrario retornamos um erro
  if (medicamento) {
    if (medicamento.medicamento_depositos.length == 0) {
      medicamento.destroy();
      return res.sendStatus(204);
    } else {
      res.status(401)
      throw new Error(`Não é possivel deletar o medicamento pois ele esta associado a ${medicamento.medicamento_depositos.length} deposito(s)`);
    }
  } else {
    res.status(404);
    throw new Error("Medicamento não encontrado");
  }
}

module.exports = {
  validarBody,
  filtroStore,
  salvarMedicamento,
  filtroUpdate,
  atualizarMedicamento,
  listarMedicamentos,
  listarMedicamentosId,
  deletarMedicamento
};
