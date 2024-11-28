const Message = require("../../core/models/Message");

const saveMessage = async (data) => {
  const message = new Message(data);
  //console.log(message);
  return await message.save();
};

const getMessages = async () => {
  try {
    return await Message.find()
      .sort({ fecha: 1 }) // Ordenar por fecha, de más antiguo a más reciente
      .populate("autor", "nombre tipo_usuario");
  } catch (error) {
    console.error("Error al obtener los mensajes:", error.message);
    throw new Error("Error al obtener los mensajes.");
  }
};


module.exports = { saveMessage, getMessages };
