const Sequelize = require("sequelize");
const connection = require("../database/connection");


const UsuarioMedicamento = connection.define(
    "usuario_medicamento",
    {
        usuario_id: {
            type: Sequelize.INTEGER,
        },
        medicamento_id: {
            type: Sequelize.INTEGER,
        },
    },
    {
        paranoid: true,
        underscored: true,
    }
);

module.exports = UsuarioMedicamento;