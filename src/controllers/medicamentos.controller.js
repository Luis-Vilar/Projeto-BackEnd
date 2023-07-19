const { usuarioEstaAtivo } = require("../libs/validators");
const { validarBody, salvarMedicamento, atualizarMedicamento, listarMedicamentos, listarMedicamentosId } = require("../libs/medicamentos.lib");


async function store(req, res) {
  const body = req.body;
  const usuario_id = req.payload.id;
  const quantidade = body.quantidade;

  try {
    //obrigamos a passar a quantidade de medicamentos a serem salvos mas também verificamos se tem um payload com o id do usuário que esta fazendo a requisição para depois verificar se ele esta ativo na bd.
    if (quantidade == null || usuario_id == null) {
      throw new Error(
        "Requisição incompleta, faltam dados obrigatórios :  quantidade "
      );
    }
    // validar que usuário este ativo na bd pode ter sido desativado por um admin e ter um token valido ainda
    await usuarioEstaAtivo(usuario_id, res);
    // validar que o body tenha os campos necessários para salvar um medicamento
    if (!(await validarBody(body))) {
      res.status(400);
      throw new Error("Requisição com dados inválidos");
    }
    // salvar medicamento em si, se tudo estiver ok tmb a relação com o deposito onde esta a quantidade , se o medicamento ja existir no deposito a quantidade sera atualizada se não existir sera criado um novo registro por que nossa BD tem relação de muitos para muitos entre medicamentos e depósitos na tabela medicamentos_depósitos e nao podemos ter dois medicamentos iguais com diferentes valores em  suas propriedades.
    await salvarMedicamento(body, quantidade, usuario_id, req, res);
  } catch (error) {
    return res.json(error.message);
  }
}
async function update(req, res) {

  const body = req.body;
  const usuario_id = req.payload.id;
  const medicamento_id = req.params.id;
  const quantidade = body.quantidade;

  try {
    // validar que usuário este ativo na bd pode ter sido desativado por um admin e ter um token valido ainda
    await usuarioEstaAtivo(usuario_id, res);
    //verificar que quantidade e body.preco_unitario sejam numeros, que a descricao nao seja um numero e que o body nao esteja vazio
    if ((Object.keys(body).length === 0) || (quantidade && isNaN(quantidade)) || (body.preco_unitario && isNaN(body.preco_unitario)) || (body.descricao && !isNaN(body.descricao))) {
      res.status(400);
      throw new Error("Requisição com dados inválidos");
    }
    // validar que o body, o req.payload e req.params tenha os campos necessários para atualizar um medicamento e/o a quantidade num deposito e logo atualizar dependedo da requisição
    await atualizarMedicamento(usuario_id, medicamento_id, quantidade, req, res);
  } catch (error) {
    return res.json(error.message);
  }
}
async function index(req, res) {
  const usuario_id = req.payload.id;

  try {
    // validar que usuário este ativo na bd pode ter sido desativado por um admin e ter um token valido ainda
    await usuarioEstaAtivo(usuario_id, res);
    // listar medicamentos aceita query params para filtrar por controlado ou não controlado
    await listarMedicamentos(req, res);
  } catch (error) {
    return res.json(error.message);
  }

}
async function indexId(req, res) {
  const usuario_id = req.payload.id;
  const medicamento_id = req.params.id;
  try {
    //verificamos se o id passado por parametro é um numero caso contrario retornamos um erro
    if (isNaN(medicamento_id)) {
      res.status(400);
      throw new Error("Requisição com dados inválidos, o id do medicamento deve ser um numero");
    }
    // validar que usuário este ativo na bd pode ter sido desativado por um admin e ter um token valido ainda
    await usuarioEstaAtivo(usuario_id, res);
    // listamos um medicamento por id
    await listarMedicamentosId(req, res, medicamento_id);
  } catch (error) {
    return res.json(error.message);
  }

}

module.exports = {
  store,
  update,
  index,
  indexId
};
