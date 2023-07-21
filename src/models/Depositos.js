const Sequelize = require("sequelize");
const connection = require("../database/connection");
const { validaEmail } = require("../libs/validators");
const Medicamentos = require("./Medicamentos");
const MedicamentoDeposito = require("./MedicamentoDeposito");
const Usuarios = require("./Usuarios");

const Depositos = connection.define(
  "depositos",
  {
    usuario_id: {
      type: Sequelize.INTEGER,
    },
    razao_social: {
      type: Sequelize.STRING,
    },
    cnpj: {
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [14, 14],
          msg: "O CNPJ deve ter 14 caracteres",
        },
        isNumeric: {
          args: true,
          msg: "O CNPJ deve conter apenas números e não deve conter pontos ou traços",
        },

      },
    },
    nome_fantasia: {
      type: Sequelize.STRING,
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
      validate: {
        isNumeric: {
          args: true,
          msg: "O telefone deve conter apenas números e não deve conter pontos ou traços",
        },
      },
    },
    celular: {
      type: Sequelize.STRING,
      validate: {
        isNumeric: {
          args: true,
          msg: "O celular deve conter apenas números e não deve conter pontos ou traços",
        },
      },
    },
    cep: { type: Sequelize.STRING(20) },
    logradouro: { type: Sequelize.STRING(20) },
    numero: { type: Sequelize.STRING(20) },
    bairro: { type: Sequelize.STRING(20) },
    cidade: { type: Sequelize.STRING(20) },
    estado: { type: Sequelize.STRING(20) },
    complemento: { type: Sequelize.STRING(20) },
    latitude: {
      type: Sequelize.STRING(20),
      validate: {
        isNumeric: {
          args: true,
          msg: "Latitude deve ser numérico, exemplo : 12.3456"
        }
      }
    },
    longitude: {
      type: Sequelize.STRING(20),
      validate: {
        isNumeric: {
          args: true,
          msg: "Longitude deve ser numérico, exemplo : 12.3456"
        }
      }
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: "ativo",
      validate: {
        isIn: {
          args: [["ativo", "inativo"]],
          msg: "O status deve ser ativo ou inativo",
        },
      },
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
  }
);

Medicamentos.belongsToMany(Depositos, { through: MedicamentoDeposito });
Depositos.belongsToMany(Medicamentos, { through: MedicamentoDeposito });

Medicamentos.hasMany(MedicamentoDeposito);
Depositos.hasMany(MedicamentoDeposito);

MedicamentoDeposito.belongsTo(Medicamentos);
MedicamentoDeposito.belongsTo(Depositos);

Depositos.belongsTo(Usuarios);


module.exports = Depositos;
