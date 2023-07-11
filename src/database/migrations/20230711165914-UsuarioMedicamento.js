"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "usuario_medicamento",
      {
        usuario_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: "usuarios", key: "id" },
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
    await queryInterface.dropTable("usuario_medicamento");
  },
};
