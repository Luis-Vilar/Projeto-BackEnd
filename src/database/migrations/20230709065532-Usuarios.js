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
      cpf: { type: Sequelize.STRING(11), allowNull: false, unique: true },
      telefone: { type: Sequelize.STRING(20), allowNull: true },
      email: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      senha: { type: Sequelize.STRING(20), allowNull: false },
      status: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "ativo",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
    },{
      paranoid : true,
      underscored : true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("usuarios");
  },
};
