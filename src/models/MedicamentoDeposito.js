const Sequelize = require("sequelize");
const connection = require("../database/connection");

const MedicamentoDeposito = connection.define(
  "medicamento_deposito",
  {
    quantidade: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
  }
);

module.exports = MedicamentoDeposito;
