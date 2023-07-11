const Sequelize = require("sequelize");
const connection = require("../database/connection");
const Usuarios = require("./Usuarios");
const Medicamentos = require("./Medicamentos");

const UsuarioMedicamento = connection.define(
    "usuario_medicamento",
    {
        usuario_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: "usuarios", key: "id" },
        },
        medicamento_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: "medicamentos", key: "id" },
        },
    },
    {
        paranoid: true,
        underscored: true,
    }
);

module.exports = UsuarioMedicamento;