const usuariosRoutes = require("express").Router();
const { store, login } = require("../../controllers/usuarios.controller");

usuariosRoutes.post("/api/usuarios", store);
usuariosRoutes.post("/api/usuarios/login", login);

module.exports = usuariosRoutes;
