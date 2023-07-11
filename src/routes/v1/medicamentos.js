const medicamentosRoutes = require('express').Router()


medicamentosRoutes.get('/api/medicamentos', async (req, res) => {
   res.json({ message: 'Endpoint medicamentos' });
});

module.exports = medicamentosRoutes;