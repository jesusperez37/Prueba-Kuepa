const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  contenido: {
    type: String,
    required: true,
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Relación con el modelo de usuarios
    required: true,
  },
  nombre: {
    type: String,
    required: true, // Nombre del autor (estudiante o moderador)
  },
  tipo_usuario: {
    type: String,
    enum: ["moderador", "estudiante"], // Solo se admiten estos valores
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
