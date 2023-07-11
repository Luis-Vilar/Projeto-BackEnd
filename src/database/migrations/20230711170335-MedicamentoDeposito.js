"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
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
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },

      {
        paranoid: true,
        underscored: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("medicamento_deposito");
  },
};
