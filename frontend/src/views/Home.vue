<template>
  <div class="home">
    <header>
      <div class="container">
        <div class="logo">Clase Virtual</div>
        <!-- Navbar -->
        <nav>
          <ul>
            <li v-if="isAuthenticated"><a href="#" @click="logout">Cerrar sesión</a></li>
          </ul>
        </nav>
      </div>
    </header><br>
    
    <div class="main-content">  
      <!-- Mostrar el nombre del usuario si está en localStorage -->
      <div v-if="isAuthenticated" class="welcome-message mb-4">
        <h2>Bienvenido, {{ userName }}!</h2> <!-- Nombre del usuario -->
      </div><br>
    <!-- Contenedor flex para alinear el iframe y el chat -->
    <div class="content-container d-flex flex-column flex-md-row">
      <div class="video-container">
        <iframe
          src="https://player.vimeo.com/video/1033758374?h=3e74b207ae&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          allowfullscreen
          title="Clase Virtual"
        ></iframe>
      </div>

      <!-- Chat -->
      <Chat />
    </div>
  </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Chat from "@/modules/chat/components/Chat.vue";

export default {
  components: {
    Chat,
  },
  computed: {
    // Accedemos al getter 'isAuthenticated' de Vuex para verificar si el usuario está autenticado
    ...mapGetters(['isAuthenticated']),
    // Accedemos al nombre del usuario almacenado en localStorage
    userName() {
      const user = JSON.parse(localStorage.getItem('user'));
      return user ? user.nombre : 'Usuario';  // Si el usuario está en localStorage, mostramos su nombre
    },
  },
  methods: {
    ...mapActions(['logout']),  // Usamos la acción logout de Vuex
    logout() {
      this.$store.dispatch('logout'); // Llamamos a la acción logout de Vuex
      this.$router.push({ name: 'login' }); // Redirigimos al login
    },
  },
};
</script>

<style scoped>
/* Estilos para el Header y Navbar */
header {
  background-color: #007bff;
  padding: 15px 0;
  color: white;
}

header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

header .logo {
  font-size: 24px;
  font-weight: bold;
}

nav ul {
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

nav ul li a:hover {
  text-decoration: underline;
}

.home {
  text-align: center;
}

.content-container {
  margin-top: 20px;
}

.video-container {
  width: 100%;
  height: 400px; /* Ajustar el tamaño del video */
  margin-bottom: 20px;
}

.video-container iframe {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

@media (min-width: 768px) {
  .content-container {
    align-items: flex-start;
    justify-content: space-between;
  }

  .video-container {
    flex: 1;
    margin-right: 20px;
  }

  .chat {
    flex: 1;
    max-width: 400px; /* Limitar el ancho del chat */
    margin-left: 20px;
  }
}
</style>