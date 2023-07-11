const usuariosRoutes = require("express").Router();
const { store } = require("../../controllers/usuarios.controller");

usuariosRoutes.post("/api/usuarios", store);

module.exports = usuariosRoutes;
