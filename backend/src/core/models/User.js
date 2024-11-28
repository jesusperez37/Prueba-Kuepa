const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  usuario: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  tipo_usuario: { type: String, enum: ["estudiante", "moderador"], required: true },
});

module.exports = mongoose.model("User", userSchema);
