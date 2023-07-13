const depositosRoutes = require("express").Router();
const {store} = require('../../controllers/depositos.controller')
const { validarToken } = require("../../middlewares/auth");

depositosRoutes.post("/api/depositos",validarToken,store);


module.exports = depositosRoutes;
