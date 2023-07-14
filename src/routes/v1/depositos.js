const depositosRoutes = require("express").Router();
const {store, update, status, index, indexId, deleteId} = require('../../controllers/depositos.controller');
const { validarToken } = require("../../middlewares/auth");
//endpoints protegidos por token
depositosRoutes.post("/api/depositos",validarToken,store);
depositosRoutes.patch("/api/depositos/:id",validarToken,update);
depositosRoutes.patch("/api/depositos/:id/status",validarToken,status)
depositosRoutes.get("/api/depositos",validarToken,index)
depositosRoutes.get("/api/depositos/:id",validarToken,indexId)
depositosRoutes.delete("/api/depositos/:id",validarToken,deleteId)


module.exports = depositosRoutes;
