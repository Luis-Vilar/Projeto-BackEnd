const Sequelize = require("sequelize");
const connection = require("../database/connection");
const { validaSenha, validaEmail } = require("../libs/validators");
const Medicamentos = require("./Medicamentos");
const UsuarioMedicamento = require("./UsuarioMedicamento");

const Usuarios = connection.define(
  "usuarios",
  {
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 20],
          msg: "O nome deve ter entre 2 e 20 caracteres",
        },
      },
    },
    sobrenome: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 20],
          msg: "O sobrenome deve ter entre 2 e 20 caracteres",
        },
      },
    },
    genero: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    data_nascimento: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: "A data de nascimento deve ser uma data válida",
        },
      },
    },
    cpf: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [11, 11],
          msg: "O CPF deve ter 11 caracteres",
        },
      },
    },
    telefone: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [10, 15],
          msg: "O telefone deve ter entre 10 e 15 caracteres",
        },
        isNumeric: {
          args: true,
          msg: "O telefone deve conter apenas números",
        },

      },

    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        validaEmail,
        
      },
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        validaSenha,
      },
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "ativo",
      validate: {
        isIn: {
          args: [["ativo", "inativo"]],
          msg: "O status deve ser ativo ou inativo",
        },
      },
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
  }
)

Medicamentos.belongsToMany(Usuarios, { through: UsuarioMedicamento });
Usuarios.belongsToMany(Medicamentos, { through: UsuarioMedicamento });

Usuarios.hasMany(UsuarioMedicamento);
Medicamentos.hasMany(UsuarioMedicamento);

UsuarioMedicamento.belongsTo(Usuarios);
UsuarioMedicamento.belongsTo(Medicamentos);



module.exports = Usuarios;
