const { sign, verify } = require("jsonwebtoken");
const { config } = require("dotenv");
const e = require("express");
config();

async function validarBody(body) {
  const {
    usuario_id,
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
    status,
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
    !estado ||
    !status
  ) {
    return false;
  }
  return true;
}

module.exports = {
  validarBody,
};
