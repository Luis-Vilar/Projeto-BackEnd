"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "depositos",
      {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        usuario_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: "usuarios", key: "id" },
        },
        razao_social: { type: Sequelize.STRING(30), allowNull: false },
        cnpj: { type: Sequelize.STRING(20), allowNull: false },
        nome_fantasia: { type: Sequelize.STRING(30), allowNull: false },
        email: { type: Sequelize.STRING(40), allowNull: false },
        telefone: { type: Sequelize.STRING(20), allowNull: true },
        celular: { type: Sequelize.STRING(20), allowNull: false },
        endereco: {
          type: Sequelize.JSON,
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING(7),
          allowNull: false,
          defaultValue: "ativo",
        },
        createdAt: { type: Sequelize.DATE, allowNull: false },
        updatedAt: { type: Sequelize.DATE, allowNull: false },
        deletedAt: { type: Sequelize.DATE, allowNull: true },
      },
      {
        timestamps: true,
        paranoid: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("depositos");
  },
};
