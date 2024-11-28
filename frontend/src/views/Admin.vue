<template>
  <div class="admin container">
    <h1 class="text-center my-4">Panel de Administración</h1>

    <div class="messages-container mb-4">
      <h3 class="text-center">Mensajes del Chat</h3>
      <ul class="list-unstyled">
        <li v-for="message in messages" :key="message.id" class="message-item">
          <strong>{{ message.nombre }}</strong> 
          <span class="badge" :class="{'badge-primary': message.tipo_usuario === 'moderador', 'badge-secondary': message.tipo_usuario === 'estudiante'}">
            {{ message.tipo_usuario }}
          </span>
          : <span>{{ message.contenido }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// Importar el servicio de chat
import chatService from "@/core/services/chatService";

export default {
  data() {
    return {
      messages: [], 
    };
  },
  created() {
    // Obtener los mensajes cuando se crea el componente
    this.fetchMessages();
  },
  methods: {
    // Método para obtener los mensajes utilizando el chatService
    fetchMessages() {
      chatService
        .getMessages()
        .then((data) => {
          this.messages = data;
        })
        .catch((error) => {
          console.error("Error al obtener mensajes:", error);
        });
    },
  },
};
</script>

<style scoped>
.admin {
  padding: 20px;
}

.messages-container {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  background-color: #f9f9f9;
}

h3 {
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.message-item {
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message-item strong {
  color: #333;
}

.badge {
  margin-left: 10px;
}

.badge-primary {
  background-color: #007bff;
}

.badge-secondary {
  background-color: #6c757d;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem; /* Tamaño de fuente más pequeño */
  }

  .messages-container {
    padding: 10px;
  }

  .message-item {
    padding: 8px;
    margin-bottom: 8px;
  }

  .message-item strong {
    font-size: 1rem;
  }

  .badge {
    font-size: 0.9rem;
  }
}
</style>
