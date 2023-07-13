const Sequelize = require("sequelize");
const connection = require("../database/connection");
const { validaEmail } = require("../libs/validators");
const Medicamentos = require("./Medicamentos");
const MedicamentoDeposito = require("./MedicamentoDeposito");
const Usuarios = require("./Usuarios");

const Depositos = connection.define(
  "depositos",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    razao_social: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cnpj: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [14, 14],
          msg: "O CNPJ deve ter 14 caracteres",
        },
      },
    },
    nome_fantasia: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        validaEmail,
      },
    },
    telefone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    celular: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cep: { type: Sequelize.STRING(20), allowNull: false },
    logradouro: { type: Sequelize.STRING(20), allowNull: false },
    numero: { type: Sequelize.STRING(20), allowNull: false },
    bairro: { type: Sequelize.STRING(20), allowNull: false },
    cidade: { type: Sequelize.STRING(20), allowNull: false },
    estado: { type: Sequelize.STRING(20), allowNull: false },
    complemento: { type: Sequelize.STRING(20), allowNull: true },
    latitude: { type: Sequelize.STRING(20), allowNull: true },
    longitude: { type: Sequelize.STRING(20), allowNull: true },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "ativo",
      validate: {
        isIn: {
          args: [["ativo", "inativo"]],
          msg: "O status deve ser ativo ou inativo",
        },
      },
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
  }
);

Depositos.belongsToMany(Medicamentos, { through: MedicamentoDeposito });
Medicamentos.belongsToMany(Depositos, { through: MedicamentoDeposito });
Medicamentos.hasMany(MedicamentoDeposito, { as: "stock" });
Depositos.hasMany(MedicamentoDeposito, { as: "stock" });

Depositos.belongsTo(Usuarios);

module.exports = Depositos;
