const medicamentosRoutes = require("express").Router();
const { validarToken } = require("../../middlewares/auth");
const { store, update, index } = require("../../controllers/medicamentos.controller");


//endpoints protegidos con token
medicamentosRoutes.post("/api/medicamentos", validarToken, store);
medicamentosRoutes.patch("/api/medicamentos/:id", validarToken, update)
medicamentosRoutes.get("/api/medicamentos/", validarToken, index);
module.exports = medicamentosRoutes;
