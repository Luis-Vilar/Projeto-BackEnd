const medicamentosRoutes = require("express").Router();
const { validarToken } = require("../../middlewares/auth");
const { store, update, index , indexId} = require("../../controllers/medicamentos.controller");


//endpoints protegidos con token
medicamentosRoutes.post("/api/medicamentos", validarToken, store);
medicamentosRoutes.patch("/api/medicamentos/:id", validarToken, update)
medicamentosRoutes.get("/api/medicamentos/", validarToken, index);
medicamentosRoutes.get("/api/medicamentos/:id", validarToken, indexId);
module.exports = medicamentosRoutes;
