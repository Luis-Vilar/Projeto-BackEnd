const { config } = require("dotenv");
config();
var parse = require('pg-connection-string').parse;
var configdatabase = parse(process.env.HOST);
module.exports = {
  dialect: "postgres", //Qual banco de dados está utilizando;
  host: configdatabase.host, //Qual servidor está utilizando;
  username: configdatabase.user, //Qual o nome do seu usuário no postgres;
  password: configdatabase.password, //Qual a senha do seu usuário no postgres;
  database: configdatabase.database, //Qual o nome do seu database no postgres;
  port: configdatabase.port, //Qual porta do seu postgres (Normalmente é a 5432);
  define: {
    underscored: true,
    underscoredAll: true,
    freezeTableName: true,
  },
};
