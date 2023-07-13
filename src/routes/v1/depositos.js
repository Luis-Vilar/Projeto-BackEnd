const depositosRoutes = require("express").Router();
const {store, update} = require('../../controllers/depositos.controller');
const { validarToken } = require("../../middlewares/auth");
//endpoinst protegidos por token
depositosRoutes.post("/api/depositos",validarToken,store);
depositosRoutes.patch("/api/depositos/:id",validarToken,update);


module.exports = depositosRoutes;
