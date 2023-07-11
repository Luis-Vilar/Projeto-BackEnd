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
        razao_social: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true,
        },
        cnpj: { type: Sequelize.STRING(20), allowNull: false, unique: true },
        nome_fantasia: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true,
        },
        email: { type: Sequelize.STRING(50), allowNull: false, unique: true },
        telefone: { type: Sequelize.STRING(20), allowNull: true },
        celular: { type: Sequelize.STRING(20), allowNull: false },
        cep: { type: Sequelize.STRING(20), allowNull: false },
        logradouro: { type: Sequelize.STRING(20), allowNull: false },
        numero: { type: Sequelize.STRING(20), allowNull: false },
        bairro: { type: Sequelize.STRING(20), allowNull: false },
        cidade: { type: Sequelize.STRING(20), allowNull: false },
        estado: { type: Sequelize.STRING(20), allowNull: false },
        complemento: { type: Sequelize.STRING(20), allowNull: true },
        latitude: { type: Sequelize.STRING(20), allowNull: true },
        longitude: { type: Sequelize.STRING(20), allowNull: true },
        status: {
          type: Sequelize.STRING(7),
          allowNull: false,
          defaultValue: "ativo",
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
    await queryInterface.dropTable("depositos");
  },
};
