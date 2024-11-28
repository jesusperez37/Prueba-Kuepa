<template>
  <div class="chat">
    <h3>Chat</h3>

    <!-- Sección de mensajes -->
    <div class="messages-container" ref="messagesContainer">
      <!-- Mostrar un mensaje si no hay mensajes en el chat -->
      <p v-if="messages.length === 0">No hay mensajes aún. ¡Sé el primero en escribir!</p>

      <div
        v-for="message in messages"
        :key="message._id"
        :class="['message', { moderator: message.tipo_usuario === 'moderador' }]"
      >
        <!-- Resaltar al moderador -->
        <div class="message-header">
          <strong>
            <span v-if="message.tipo_usuario === 'moderador'" class="moderator-badge">[Moderador]</span>
            {{ message.nombre }}
          </strong>
        </div>
        <div class="message-body">
          <span>{{ message.contenido }}</span>
        </div>
      </div>
    </div>

    <!-- Formulario de envío de mensaje, visible solo si el usuario está logueado -->
    <form @submit.prevent="sendMessage" v-if="isAuthenticated" class="send-form">
      <input
        v-model="newMessage"
        type="text"
        placeholder="Escribe un mensaje..."
        required
        class="message-input"
      />
      <button type="submit" class="send-button">Enviar</button>
    </form>

    <!-- Mensaje si no está logueado -->
    <p v-else class="login-prompt">Debes iniciar sesión para enviar mensajes.</p>
  </div>
</template>

<script>
import chatService from "@/core/services/chatService";
import { socket } from "@/main"; 
import { mapGetters } from "vuex"; 

export default {
  data() {
    return {
      messages: [], // Almacena todos los mensajes
      newMessage: "", // Nuevo mensaje a enviar
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]), // Verifica si el usuario está autenticado
  },
  created() {
    if (this.isAuthenticated) {
      // Escuchar mensajes nuevos desde el servidor
      socket.on("message:update", (messages) => {
        this.messages = messages; // Actualizar la lista de mensajes
        this.scrollToBottom(); // Desplazar hacia el último mensaje
      });

      // Recuperar los mensajes iniciales desde el servidor
      this.fetchMessages();
    }
  },
  methods: {
    // Obtener los mensajes desde el servidor
    fetchMessages() {
      chatService
        .getMessages()
        .then((data) => {
          this.messages = data; // Guardar mensajes en el estado
          this.scrollToBottom(); // Desplazar hacia el último mensaje cuando se carguen los mensajes iniciales
        })
        .catch((error) => {
          console.error("Error al obtener mensajes:", error);
        });
    },
    // Enviar un nuevo mensaje
    sendMessage() {
      if (!this.newMessage.trim()) return;

      const payload = {
        contenido: this.newMessage,
        nombre: this.$store.state.user.nombre, 
        tipo_usuario: this.$store.state.user.tipo_usuario,
        autor: this.$store.state.user.id 
      };

      // Emitir el mensaje al servidor
      socket.emit("message:new", payload);

      // Limpiar el campo de entrada
      this.newMessage = "";
    },
    // Desplazar el contenedor de mensajes hacia abajo
    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      container.scrollTop = container.scrollHeight;
    }
  },
  beforeDestroy() {
    socket.off("message:update"); // Desconectar el evento
  },
};
</script>

<style scoped>
.chat {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  max-width: 100%;  /* Aseguramos que el chat ocupe todo el espacio disponible */
}

.messages-container {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 100%; /* Aseguramos que el contenedor de mensajes ocupe todo el espacio disponible */
}

.message {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Los mensajes se alinean a la izquierda */
  margin-bottom: 10px;
  font-size: 14px;
  max-width: 90%;
  word-wrap: break-word;
}

.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px; /* Espacio entre el nombre y el contenido */
}

.message-body {
  display: flex;
  align-items: center;
}

.moderator {
  background-color: #f0f8ff; /* Color diferente para mensajes de moderadores */
  border-left: 4px solid #007bff;
  padding-left: 10px;
  border-radius: 5px;
}

.moderator-badge {
  color: #007bff;
  font-weight: bold;
  margin-right: 5px;
}

.message-body span {
  display: block;
  margin-top: 5px;
  text-align: left;
}

form {
  display: flex;
  margin-top: 10px;
}

input {
  flex: 1;
  padding: 8px;
  margin-right: 5px;
}

button {
  padding: 8px 12px;
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

/* Media Queries para Responsividad */
@media (max-width: 768px) {
  .chat {
    padding: 15px;
    width: 100%;
  }

  .messages-container {
    max-height: 250px;
  }

  .message {
    font-size: 12px;
    max-width: 100%; /* Aseguramos que el mensaje ocupe todo el ancho disponible */
  }

  .message-body span {
    font-size: 14px;
  }

  form {
    flex-direction: column;
  }

  input {
    margin-right: 0;
    margin-bottom: 10px;
  }

  button {
    width: 100%; /* El botón se ajusta a todo el ancho disponible */
  }
}

@media (max-width: 480px) {
  .messages-container {
    max-height: 200px;
  }

  .message {
    font-size: 12px;
    max-width: 100%;
  }

  .message-body span {
    font-size: 14px;
  }

  form {
    flex-direction: column;
  }

  input {
    margin-right: 0;
    margin-bottom: 8px;
  }

  button {
    width: 100%;
  }

  p {
    font-size: 12px;
  }
}

</style>
