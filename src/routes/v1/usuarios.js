const usuariosRoutes = require("express").Router();
const { store, login, update, status,  senha } = require("../../controllers/usuarios.controller");

usuariosRoutes.post("/api/usuarios", store);
usuariosRoutes.post("/api/usuarios/login", login);
usuariosRoutes.patch("/api/usuarios/:id", update);
usuariosRoutes.patch("/api/usuarios/:id/status", status);
usuariosRoutes.patch("/api/usuarios/:id/senha", senha);

module.exports = usuariosRoutes;
