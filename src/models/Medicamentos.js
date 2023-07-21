const Sequelize = require("sequelize");
const connection = require("../database/connection");


const Medicamentos = connection.define(
  "medicamentos",
  {
    nome_medicamento: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nome_laboratorio: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    descricao: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [0, 400],
          msg: "A descrição deve ter até 400 caracteres",
        },
      },
    },
    dosagem: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    unidade_dosagem: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["mg", "mcg", "g", "mL", "%", "Outro"]],
          msg: "A dosagem deve ser mg, mcg, g, mL, % ou Outro",
        },
      },
    },
    tipo: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["Controlado", "Não Controlado"]],
          msg: "O tipo deve ser Controlado ou Não Controlado",
        },
      },
    },
    preco_unitario: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: {
          args: true,
          msg: "O preço unitário deve ser um número",
        },
        min: {
          args: [0.1],
          msg: "O preço unitário deve ser maior ou igual a 0.1",
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


module.exports = Medicamentos;
