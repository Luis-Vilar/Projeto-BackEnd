const Sequelize = require("sequelize");
const connection = require("../database/connection");

const MedicamentoDeposito = connection.define(
  "medicamento_deposito",
  {
    deposito_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "depositos", key: "id" },
    },
    medicamento_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "medicamentos", key: "id" },
    },
  },
  {
    paranoid: true,
    underscored: true,
  }
);

module.exports = MedicamentoDeposito;
