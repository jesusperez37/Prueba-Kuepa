const MessageService = require("../../application/services/messageService");

const chatSocket = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:8080", //URL de tu frontend
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    // Escuchar cuando un cliente envía un nuevo mensaje
    socket.on("message:new", async (data) => {
      try {
        // Verificar que todos los campos requeridos estén presentes
        const { contenido, nombre, tipo_usuario, autor } = data;
        if (!contenido || !nombre || !tipo_usuario || !autor) {
          throw new Error("Datos incompletos para guardar el mensaje.");
        }

        // Guardar el mensaje en la base de datos
        const savedMessage = await MessageService.saveMessage(data);

        // Obtener todos los mensajes (puedes personalizar esto según tus necesidades)
        const populatedMessage = await MessageService.getAllMessages();

        // Emitir los mensajes a todos los clientes conectados
        //console.log("Emitir mensajes actualizados:", populatedMessage);
        io.emit("message:update", populatedMessage);
      } catch (error) {
        console.error("Error al guardar el mensaje:", error.message);
      }
    });

    // Escuchar cuando un cliente se desconecta
    socket.on("disconnect", () => {
      console.log(`Usuario desconectado: ${socket.id}`);
    });
  });
};

module.exports = chatSocket;
