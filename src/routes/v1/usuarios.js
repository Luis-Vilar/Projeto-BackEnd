const usuariosRoutes = require('express').Router();

usuariosRoutes.get('/api/usuarios', async (req, res) => 
res.json({ message: 'Endpoint usuarios' })
);

module.exports = usuariosRoutes;