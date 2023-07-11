"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "medicamento_deposito",
      [
        {
          deposito_id : 1,
          medicamento_id : 3,
          created_at : new Date("2021-07-11"),
          updated_at : new Date("2021-07-11")
        },    {
          deposito_id : 2,
          medicamento_id : 1,
          created_at : new Date("2021-07-11"),
          updated_at : new Date("2021-07-11")
        },    {
          deposito_id : 1,
          medicamento_id : 2,
          created_at : new Date("2021-07-11"),
          updated_at : new Date("2021-07-11")
        },    {
          deposito_id : 3,
          medicamento_id : 3,
          created_at : new Date("2021-07-11"),
          updated_at : new Date("2021-07-11")
        },    {
          deposito_id : 5,
          medicamento_id : 3,
          created_at : new Date("2021-07-11"),
          updated_at : new Date("2021-07-11")
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("medicamento_deposito", null, {});
  },
};
