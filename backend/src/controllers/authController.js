const AuthService = require("../application/services/authService");

const register = async (req, res) => {
  try {
    const result = await AuthService.register(req.body);
    res.status(201).json({ mensaje: "Usuario registrado con éxito", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const token = await AuthService.login(req.body);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login };
