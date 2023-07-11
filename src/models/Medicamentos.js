const Sequelize = require("sequelize");
const connection = require("../database/connection");
const Usuarios = require("./Usuarios");
const UsuarioMedicamento = require("./UsuarioMedicamento");
const Depositos = require("./Depositos");
const MedicamentoDeposito = require("./MedicamentoDeposito");


const Medicamentos = connection.define(
  "medicamentos",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
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
    },
    quantidade: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    paranoid: true,
    timestamps: true,
  }
);

Medicamentos.hasMany(Usuarios, { through: UsuarioMedicamento });
Medicamentos.hasMany(Depositos, { through: MedicamentoDeposito });


module.exports = Medicamentos;
