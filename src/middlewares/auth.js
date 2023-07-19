const { verify } = require("jsonwebtoken");

module.exports = {
  async validarToken(req, res, next) {
    try {
      const token = req.headers.authorization;
      const payload = verify(token, process.env.JWT_KEY);
      if (payload) {
        req.payload = payload;
      }
      next();
    } catch (error) {
      return res.status(401).json("Token inválido");
    }
  },
};
