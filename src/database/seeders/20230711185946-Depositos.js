"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "depositos",
      [
        {
          telefone: "11111111111",
          razao_social: "Empresa A",
          latitude: 1.234,
          complemento: "Complemento A",
          estado: "Estado A",
          celular: "11111111111",
          numero: "Número A",
          cep: "11111111",
          logradouro: "Logradouro A",
          longitude: 1.234,
          cnpj: "11111111111111",
          cidade: "Cidade A",
          nome_fantasia: "Fantasia A",
          bairro: "Bairro A",
          usuario_id: 1,
          email: "empresaA@dominio.com",
          created_at: new Date("2021-07-11"),
          updated_at: new Date("2021-07-11")
        },
        {
          telefone: "22222222222",
          razao_social: "Empresa B",
          latitude: 2.345,
          complemento: "Complemento B",
          estado: "Estado B",
          celular: "22222222222",
          numero: "Número B",
          cep: "22222222",
          logradouro: "Logradouro B",
          longitude: 2.345,
          cnpj: "22222222222222",
          cidade: "Cidade B",
          nome_fantasia: "Fantasia B",
          bairro: "Bairro B",
          usuario_id: 2,
          email: "empresaB@dominio.com",
          created_at: new Date("2021-07-11"),
          updated_at: new Date("2021-07-11")
        },
        {
          telefone: "33333333333",
          razao_social: "Empresa C",
          latitude: 3.456,
          complemento: "Complemento C",
          estado: "Estado C",
          celular: "33333333333",
          numero: "Número C",
          cep: "33333333",
          logradouro: "Logradouro C",
          longitude: 3.456,
          cnpj: "33333333333333",
          cidade: "Cidade C",
          nome_fantasia: "Fantasia C",
          bairro: "Bairro C",
          usuario_id: 3,
          email: "empresaC@dominio.com",
          created_at: new Date("2021-07-11"),
          updated_at: new Date("2021-07-11")
        },
        {
          telefone: "44444444444",
          razao_social: "Empresa D",
          latitude: 4.567,
          complemento: "Complemento D",
          estado: "Estado D",
          celular: "44444444444",
          numero: "Número D",
          cep: "44444444",
          logradouro: "Logradouro D",
          longitude: 4.567,
          cnpj: "44444444444444",
          cidade: "Cidade D",
          nome_fantasia: "Fantasia D",
          bairro: "Bairro D",
          usuario_id: 4,
          email: "empresaD@dominio.com",
          created_at: new Date("2021-07-11"),
          updated_at: new Date("2021-07-11")
        },
        {
          telefone: "55555555555",
          razao_social: "Empresa E",
          latitude: 5.678,
          complemento: "Complemento E",
          estado: "Estado E",
          celular: "55555555555",
          numero: "Número E",
          cep: "55555555",
          logradouro: "Logradouro E",
          longitude: 5.678,
          cnpj: "55555555555555",
          cidade: "Cidade E",
          nome_fantasia: "Fantasia E",
          bairro: "Bairro E",
          usuario_id: 5,
          email: "empresaE@dominio.com",
          created_at: new Date("2021-07-11"),
          updated_at: new Date("2021-07-11")
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("depositos", null, {});
  },
};
