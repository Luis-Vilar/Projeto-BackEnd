"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  
    await queryInterface.createTable("usuarios", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nome: { type: Sequelize.STRING(20), allowNull: false },
      sobrenome: { type: Sequelize.STRING(20), allowNull: false },
      genero: { type: Sequelize.STRING(20), allowNull: true },
      data_nascimento: { type: Sequelize.DATE, allowNull: false },
      cpf: { type: Sequelize.STRING(11), allowNull: false },
      telefone: { type: Sequelize.STRING(20), allowNull: true },
      email: { type: Sequelize.STRING(20), allowNull: false },
      senha: { type: Sequelize.STRING(20), allowNull: false },
      status: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "Ativo",
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      deletedAt: { type: Sequelize.DATE, allowNull: true },
    },{
      timestamps : true,
      paranoid : true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("usuarios");
  },
};
