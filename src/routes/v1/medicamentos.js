const medicamentosRoutes = require("express").Router();
const { validarToken } = require("../../middlewares/auth");
const { store, update, index , indexId, deleteId} = require("../../controllers/medicamentos.controller");
//endpoints protegidos com token
medicamentosRoutes.post("/api/medicamentos", validarToken, store);
medicamentosRoutes.patch("/api/medicamentos/:id", validarToken, update)
medicamentosRoutes.get("/api/medicamentos/", validarToken, index);
medicamentosRoutes.get("/api/medicamentos/:id", validarToken, indexId);
medicamentosRoutes.delete("/api/medicamentos/:id", validarToken, deleteId);

module.exports = medicamentosRoutes;
