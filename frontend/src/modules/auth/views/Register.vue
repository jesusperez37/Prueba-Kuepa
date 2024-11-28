<template>
  <div class="register container">
    <h2 class="text-center my-4">Registro</h2>
    
    <form @submit.prevent="register" class="form-container">
      <div class="form-group">
        <input v-model="name" type="text" class="form-control" placeholder="Nombre completo" required />
      </div>
      <div class="form-group">
        <input v-model="username" type="text" class="form-control" placeholder="Usuario" required />
      </div>
      <div class="form-group">
        <input v-model="password" type="password" class="form-control" placeholder="Contraseña" required />
      </div>
      <div class="form-group">
        <select v-model="role" class="form-control" required>
          <option value="estudiante">Estudiante</option>
          <option value="moderador">Moderador</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary btn-block">Registrarse</button>
    </form>
    <p class="mt-3 text-center">
      Ya tengo cuenta. <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>
  
  <script>
  import authService from '@/core/services/authService';
  
  export default {
    data() {
      return {
        name: '',
        username: '',
        password: '',
        role: 'estudiante',
      };
    },
    methods: {
      async register() {
        try {
          await authService.register({ nombre: this.name, usuario: this.username, contraseña: this.password, tipo_usuario: this.role });
          alert('Registro exitoso');
          this.$router.push({ name: 'login' });
        } catch (error) {
          alert('Error al registrarse');
        }
      },
    },
  };
  </script>
  
  <style scoped>
.register {
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

input, select {
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

@media (max-width: 768px) {
  .register {
    padding: 15px;
  }

  input, select {
    padding: 8px;
  }

  button {
    padding: 10px;
  }
}
</style>