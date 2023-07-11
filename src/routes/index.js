const usuariosRoutes = require("./v1/usuarios");
const medicamentosRoutes = require("./v1/medicamentos");
const depositosRoutes = require("./v1/depositos");

const { Router } = require('express')
const routes = new Router()

routes.use(usuariosRoutes);
routes.use(medicamentosRoutes);
routes.use(depositosRoutes);

module.exports = routes;

