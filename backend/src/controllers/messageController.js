const MessageService = require("../application/services/messageService");

const sendMessage = async (req, res) => {
  try {
    const { contenido, nombre, tipo_usuario } = req.body;

    // Validar que los datos requeridos están presentes
    if (!contenido || !nombre || !tipo_usuario) {
      throw new Error("Datos incompletos para guardar el mensaje.");
    }

    // Verificar que req.user y req.user.id estén definidos
    if (!req.user || !req.user.id) {
      throw new Error("Usuario no autenticado o ID de usuario no disponible.");
    }

    // Verificar si el usuario existe en la base de datos
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new Error("El usuario no existe en la base de datos.");
    }

    // Guardar el mensaje
    const savedMessage = await MessageService.saveMessage({
      contenido,
      autor: req.user.id, // Usar el id del usuario autenticado
      nombre,
      tipo_usuario,
    });

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error al guardar el mensaje:", error.message);
    res.status(400).json({ error: error.message });
  }
};


const fetchMessages = async (req, res) => {
  try {
    const messages = await MessageService.getAllMessages();
    res.json(messages);
  } catch (error) {
    console.error("Error al obtener los mensajes:", error.message);
    res.status(500).json({ error: "Error al obtener los mensajes." });
  }
};

module.exports = { sendMessage, fetchMessages };
