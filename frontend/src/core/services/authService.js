import axios from 'axios';

// URL base del backend
const apiUrl = 'http://localhost:4000/api/v1/auth';

export default {
  async login({ usuario, contraseña }) {
    try {
      //console.log('Datos enviados al backend:', { usuario, contraseña });
  
      // Realizar la solicitud POST al servidor
      const response = await axios.post(`${apiUrl}/login`, {
        usuario: usuario,  // Enviar los datos correctamente al backend
        contraseña: contraseña,
      });
  
      // Verificar la respuesta
      //console.log('Respuesta del servidor:', response.data);
  
      // El objeto token contiene tanto el user como el token
      const { user, token } = response.data.token;  // Acceder correctamente al objeto token
  
      if (!user || !token) {
        throw new Error('Respuesta del servidor incorrecta. Se esperaba un usuario y un token.');
      }
  
      // Almacenar el usuario y el token en Vuex y localStorage
      localStorage.setItem('token', token);  // Guardar el token en localStorage
      localStorage.setItem('user', JSON.stringify(user));  // Guardar el usuario como string JSON
  
      // Devolver el usuario y el token para ser usados en el frontend
      return { user, token };
    } catch (error) {
      // Manejo de errores detallados
      if (error.response) {
        console.error('Error en el login:', error.response.data);
        throw new Error(error.response.data.message || 'Error al intentar iniciar sesión.');
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.message);
        throw new Error('Error de conexión. Por favor, verifica tu conexión a internet.');
      } else {
        console.error('Error desconocido:', error.message);
        throw new Error('Ocurrió un error inesperado. Intenta de nuevo más tarde.');
      }
    }
  },
  

  // Registro: envía los datos de registro al backend
  async register(data) {
    try {
      const response = await axios.post(`${apiUrl}/register`, data);
      return response.data;  // Devuelve la respuesta para manejarla en el frontend
    } catch (error) {
      console.error('Error en el registro:', error.response?.data || error.message);
      throw error;  // Propaga el error para que se maneje en el frontend
    }
  },
};
