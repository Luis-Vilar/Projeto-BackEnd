
async function validarBody(body, usuario_id) {
  const {
    razao_social,
    cnpj,
    nome_fantasia,
    email,
    celular,
    cep,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
  } = body;
  if (
    !usuario_id ||
    !razao_social ||
    !cnpj ||
    !nome_fantasia ||
    !email ||
    !celular ||
    !cep ||
    !logradouro ||
    !numero ||
    !bairro ||
    !cidade ||
    !estado
  ) {
    return false;
  }
  return true;
}
async function filtroStore(body, id) {
  const {
    razao_social,
    cnpj,
    nome_fantasia,
    email,
    telefone,
    celular,
    cep,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
    complemento,
    latitude,
    longitude,
    status,
  } = body;
  const novos_dados = {}
  if (id) {
    novos_dados.usuario_id = id;
  }
  if (razao_social) {
    novos_dados.razao_social = razao_social;
  }
  if (cnpj) {
    novos_dados.cnpj = cnpj;
  }
  if (nome_fantasia) {
    novos_dados.nome_fantasia = nome_fantasia;
  }
  if (email) {
    novos_dados.email = email;
  }
  if (telefone) {
    novos_dados.telefone = telefone;
  }
  if (celular) {
    novos_dados.celular = celular;
  }
  if (cep) {
    novos_dados.cep = cep;
  }
  if (logradouro) {
    novos_dados.logradouro = logradouro;
  }
  if (numero) {
    novos_dados.numero = numero;
  }
  if (bairro) {
    novos_dados.bairro = bairro;
  }
  if (cidade) {
    novos_dados.cidade = cidade;
  }
  if (estado) {
    novos_dados.estado = estado;
  }
  if (complemento) {
    novos_dados.complemento = complemento;
  }
  if (latitude) {
    novos_dados.latitude = latitude;
  }
  if (longitude) {
    novos_dados.longitude = longitude;
  }
  if (status) {
    novos_dados.status = status;
  }

  return novos_dados;

}
async function filtroUpdate(req, res) {
  // pegamos o body da requisição
  const body = req.body;
  // so destruturamos os campos que queremos permitir atualizar
  const {
    nome_fantasia,
    email,
    telefone,
    celular,
    cep,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
  } = body;
  // criamos um objeto vazio
  const novos_dados = {};
  // verificamos se o campo existe no body e se existe adicionamos ao objeto
  if (nome_fantasia) {
    novos_dados.nome_fantasia = nome_fantasia;
  }
  if (email) {
    novos_dados.email = email;
  }
  if (telefone) {
    novos_dados.telefone = telefone;
  }
  if (celular) {
    novos_dados.celular = celular;
  }
  if (cep) {
    novos_dados.cep = cep;
  }
  if (logradouro) {
    novos_dados.logradouro = logradouro;
  }
  if (numero) {
    novos_dados.numero = numero;
  }
  if (bairro) {
    novos_dados.bairro = bairro;
  }
  if (cidade) {
    novos_dados.cidade = cidade;
  }
  if (estado) {
    novos_dados.estado = estado;
  }
  // se o objeto estiver vazio, não temos dados para
  // atualizar ou informarem dados invalidos e não foi salvo no objeto
  // então criamos um erro que sera capturado pelo try catch
  if (Object.keys(novos_dados).length === 0) {
    res.status(400);
    throw new Error("Nenhum dado valido para atualizar");
  }
  // caso algunm dado valido esta em novos_dados retornamos o
  // objeto com os dados que queremos atualizar
  return novos_dados;
}
async function filtroStatus(req, res) {
  //so destruturamos os campos que queremos permitir atualizar
  const { status } = req.body;
  //criamos um objeto vazio
  const novos_dados = {};
  //verificamos se status existe no body e se existe adicionamos ao objeto
  if (status) {
    novos_dados.status = status;
  }
  //se o objeto estiver vazio, não temos dados para
  //atualizar ou informarem dados invalidos e não foi salvo no objeto
  //então criamos um erro que sera capturado pelo try catch
  if (Object.keys(novos_dados).length === 0) {
    res.status(400);
    throw new Error("Nenhum dado valido para atualizar");
  }
  //caso foi informado o status retornamos um
  //novo objeto com os status que queremos atualizar
  return novos_dados;
}
module.exports = {
  validarBody,
  filtroStore,
  filtroUpdate,
  filtroStatus,
};
