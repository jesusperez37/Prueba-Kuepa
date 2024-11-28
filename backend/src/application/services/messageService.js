const MessageRepository = require("../../infrastructure/repositories/messageRepository");

const saveMessage = async (data) => {
  if (!data.contenido || !data.autor || !data.nombre || !data.tipo_usuario) {
    throw new Error("Datos incompletos para guardar el mensaje.");
  }
  try {
    return MessageRepository.saveMessage(data);
    
  } catch (error) {
    throw new Error("Error al guardar el mensaje: " + error.message);
  }

};

const getAllMessages = async () => MessageRepository.getMessages();

module.exports = { saveMessage, getAllMessages };
