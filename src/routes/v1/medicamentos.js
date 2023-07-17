const medicamentosRoutes = require("express").Router();
const Medicamentos = require("../../models/Medicamentos");
const { validarToken } = require("../../middlewares/auth");
const { store , update} = require("../../controllers/medicamentos.controller");

medicamentosRoutes.get("/api/medicamentos", async (req, res) => {
  const medicamentos = await Medicamentos.findAll({});
  res.json(medicamentos);
});
//endpoints protegidos con token
medicamentosRoutes.post("/api/medicamentos", validarToken, store);
medicamentosRoutes.patch("/api/medicamentos/:id", validarToken, update)
module.exports = medicamentosRoutes;
