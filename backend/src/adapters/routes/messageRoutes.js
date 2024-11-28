const express = require("express");
const { sendMessage, fetchMessages } = require("../../controllers/messageController");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

// Rutas para los mensajes
router.post("/send", authMiddleware, sendMessage); // Enviar un mensaje
router.get("/list", authMiddleware, fetchMessages); // Obtener todos los mensajes

module.exports = router;
