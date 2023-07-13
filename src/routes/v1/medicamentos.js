const medicamentosRoutes = require("express").Router();
const Medicamentos = require("../../models/Medicamentos");
const Depositos = require("../../models/Depositos");
const MedicamentoDeposito = require("../../models/MedicamentoDeposito");

medicamentosRoutes.get("/api/medicamentos", async (req, res) => {
  const medicamentos = await Medicamentos.findAll();
  res.json(medicamentos);
});


module.exports = medicamentosRoutes;
