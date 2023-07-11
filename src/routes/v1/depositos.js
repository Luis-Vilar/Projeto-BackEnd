const depositosRoutes = require("express").Router();

depositosRoutes.get("/api/depositos", async (req, res) => {
 res.json({ message: "Endpoint depositos" });
});

module.exports = depositosRoutes;
