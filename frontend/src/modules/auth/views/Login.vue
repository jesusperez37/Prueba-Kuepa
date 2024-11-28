<template>
  <div class="login container">
    <h2 class="text-center my-4">Iniciar Sesión</h2>
    
    <form @submit.prevent="login" class="form-container">
      <div class="form-group">
        <input v-model="username" type="text" class="form-control" placeholder="Usuario" required />
      </div>
      <div class="form-group">
        <input v-model="password" type="password" class="form-control" placeholder="Contraseña" required />
      </div>
      <button type="submit" class="btn btn-primary btn-block">Ingresar</button>
    </form>

    <p class="mt-3 text-center">
      ¿No tienes una cuenta? <router-link to="/register">Regístrate</router-link>
    </p>
  </div>
</template>

<script>
import authService from '@/core/services/authService';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        // Validar si los campos no están vacíos
        if (!this.username || !this.password) {
          alert("Por favor, ingrese ambos campos: Usuario y Contraseña.");
          return;
        }

        // Enviar las credenciales al servicio de autenticación
        const response = await authService.login({
          usuario: this.username,
          contraseña: this.password,
        });

        // Verificar si la respuesta contiene el usuario y el token
        if (response && response.user && response.token) {
          // Guardar los datos en Vuex
          this.$store.commit('setUser', { user: response.user, token: response.token });
          // Redirigir a la página principal (home)
          this.$router.push({ name: 'home' });
        } else {
          alert("Error en la respuesta del servidor. Por favor, intente nuevamente.");
        }
      } catch (error) {
        // Manejar el error cuando las credenciales son incorrectas
        alert('Credenciales inválidas. Verifique su usuario y contraseña.');
        console.error("Error al intentar iniciar sesión:", error);
      }
    },
  },
};
</script>

<style scoped>
.login {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.form-container {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input {
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

p {
  font-size: 14px;
  color: #555;
}

@media (max-width: 768px) {
  .login {
    padding: 15px;
  }

  input {
    padding: 8px;
  }

  button {
    padding: 10px;
  }
}
</style>