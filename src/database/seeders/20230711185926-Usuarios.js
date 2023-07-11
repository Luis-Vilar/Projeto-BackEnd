"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "usuarios",
      [
        {
          genero: "Masculino",
          email: "usuario1@dominio.com",
          nome: "Nome1",
          data_nascimento: "2000-01-01",
          cpf: "11111111111",
          senha: "senha1",
          telefone: "11111111111",
          sobrenome: "Sobrenome1",
          created_at: new Date("2021-07-11"),
          updated_at: new Date("2021-07-11"),
        },
        {
          genero: "Feminino",
          email: "usuario2@dominio.com",
          nome: "Nome2",
          data_nascimento: "1995-02-15",
          cpf: "22222222222",
          senha: "senha2",
          telefone: "22222222222",
          sobrenome: "Sobrenome2",
          created_at: new Date("2021-07-11"),
          updated_at: new Date("2021-07-11"),
        },
        {
          genero: "Masculino",
          email: "usuario3@dominio.com",
          nome: "Nome3",
          data_nascimento: "1988-07-30",
          cpf: "33333333333",
          senha: "senha3",
          telefone: "33333333333",
          sobrenome: "Sobrenome3",
          created_at: new Date("2021-07-11"),
          updated_at: new Date("2021-07-11"),
        },
        {
          genero: "Feminino",
          email: "usuario4@dominio.com",
          nome: "Nome4",
          data_nascimento: "1992-04-10",
          cpf: "44444444444",
          senha: "senha4",
          telefone: "44444444444",
          sobrenome: "Sobrenome4",
          created_at: new Date("2021-07-11"),
          updated_at: new Date("2021-07-11"),
        },
        {
          genero: "Masculino",
          email: "usuario5@dominio.com",
          nome: "Nome5",
          data_nascimento: "1985-11-22",
          cpf: "55555555555",
          senha: "senha5",
          telefone: "55555555555",
          sobrenome: "Sobrenome5",
          created_at: new Date("2021-07-11"),
          updated_at: new Date("2021-07-11"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("usuarios", null, {});
  },
};
