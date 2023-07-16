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

module.exports = {
  validarBody,
  filtroStore,
};
