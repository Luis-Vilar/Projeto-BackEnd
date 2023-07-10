const Sequelize = require("sequelize");
const connection = require("../database/connection");
const Usuarios = require("./Usuarios");
const Medicamentos = require("./Medicamentos");
const { validaEmail } = require("../libs/validators");

const Depositos = connection.define(
  "depositos",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
    endereco: {
      type: Sequelize.JSON,
      allowNull: false,
      validate: {
        hasEndereco(value) {
          if (!value.cep || typeof value.cep !== "string") {
            throw new Error("O endereço deve ter um CEP válido (string)");
          }
          if (!value.logradouro || typeof value.logradouro !== "string") {
            throw new Error(
              "O endereço deve ter um logradouro válido (string)"
            );
          }
          if (!value.numero || typeof value.numero !== "string") {
            throw new Error("O endereço deve ter um número válido (string)");
          }
          if (!value.bairro || typeof value.bairro !== "string") {
            throw new Error("O endereço deve ter um bairro válido (string)");
          }
          if (!value.cidade || typeof value.cidade !== "string") {
            throw new Error("O endereço deve ter uma cidade válida (string)");
          }
          if (!value.estado || typeof value.estado !== "string") {
            throw new Error("O endereço deve ter um estado válido (string)");
          }
        },
      },
    },
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
  }
);

Depositos.belongsTo(Usuarios, { foreignKey: "usuario_id" });

module.exports = Depositos;
