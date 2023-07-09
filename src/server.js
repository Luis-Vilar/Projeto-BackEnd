// dependencias
const express = require("express");
const { config } = require("dotenv");
config();

// classe server
class Server {
  // constructor de classe
  constructor(app = express()) {
    this.database();
    this.initializeServer(app);
  }
  // connect database
  async database() {
    const connection = require("./database/connection");
    try {
      await connection.authenticate();
      console.log("Conexão com o banco de dados estabelecida com sucesso!");
    } catch (error) {
      console.error("Não foi possível conectar com o banco de dados:", error.message);
    }
  }
  // start server
  async initializeServer(app) {
    const port = process.env.NODE_PORT || 3000 ;
    app.listen(port, () => console.log(`Servidor executando em http://localhost:${port}/`));
  }

}

module.exports = { Server };
