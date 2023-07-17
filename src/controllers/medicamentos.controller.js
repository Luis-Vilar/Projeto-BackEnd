const { usuarioEstaAtivo } = require("../libs/validators");
const { validarBody, salvarMedicamento } = require("../libs/medicamentos.lib");

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
    await usuarioEstaAtivo(usuario_id);
    // validar que o body tenha os campos necessários para salvar um medicamento
    if (!(await validarBody(body))) {
      res.status(400);
      throw new Error("Requisição com dados inválidos");
    }
    // salvar medicamento em si, se tudo estiver ok tmb a relação com o deposito onde esta a quantidade , se o medicamento ja existir no deposito a quantidade sera atualizada se não existir sera criado um novo registro por que nossa BD tem relação de muitos para muitos entre medicamentos e depósitos na tabela medicamentos_depósitos e nao podemos ter dois medicamentos iguais com diferentes valores em  suas propriedades.
    await salvarMedicamento(body, quantidade, usuario_id, req, res);
  } catch (error) {
    res.json(error.message);
  }
}
async function update(req, res) {
  res.json({ message: "update", payload: req.payload });
}

module.exports = {
  store,
  update,
};
