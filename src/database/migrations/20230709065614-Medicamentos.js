"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("medicamentos", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      usuario_id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "usuarios", key: "id" },
      },
      deposito_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "depositos", key: "id" },
      },
      nome_medicamento: { type: Sequelize.STRING(20), allowNull: false },
      nome_laboratorio: { type: Sequelize.STRING(20), allowNull: false },
      descricao: { type: Sequelize.STRING(400), allowNull: true },
      dosagem: { type: Sequelize.FLOAT, allowNull: false },
      unidade_dosagem: { type: Sequelize.STRING(20), allowNull: false },
      tipo: { type: Sequelize.STRING(20), allowNull: false },
      preco_unitario: { type: Sequelize.FLOAT, allowNull: false },
      quantidade: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      deletedAt: { type: Sequelize.DATE, allowNull: true },

    },
    {
      timestamps : true,
      paranoid : true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("medicamentos");
  },
};
