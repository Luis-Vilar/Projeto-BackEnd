"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "medicamentos",
      {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        nome_medicamento: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        nome_laboratorio: { type: Sequelize.STRING(20), allowNull: false },
        descricao: { type: Sequelize.STRING(400), allowNull: true },
        dosagem: { type: Sequelize.FLOAT, allowNull: false },
        unidade_dosagem: { type: Sequelize.STRING(20), allowNull: false },
        tipo: { type: Sequelize.STRING(20), allowNull: false },
        preco_unitario: { type: Sequelize.FLOAT, allowNull: false },
        quantidade: { type: Sequelize.INTEGER, allowNull: false },
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
    await queryInterface.dropTable("medicamentos");
  },
};
