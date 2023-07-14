const depositosRoutes = require("express").Router();
const {store, update, status, index, indexId} = require('../../controllers/depositos.controller');
const { validarToken } = require("../../middlewares/auth");
//endpoints protegidos por token
depositosRoutes.post("/api/depositos",validarToken,store);
depositosRoutes.patch("/api/depositos/:id",validarToken,update);
depositosRoutes.patch("/api/depositos/:id/status",validarToken,status)
depositosRoutes.get("/api/depositos",validarToken,index)
depositosRoutes.get("/api/depositos/:id",validarToken,indexId)


module.exports = depositosRoutes;
