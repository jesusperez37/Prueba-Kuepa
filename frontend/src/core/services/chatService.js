import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/messages/";

export default {
  // Método para obtener los mensajes
  async getMessages() {
    try {
      const response = await axios.get(`${API_URL}list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener los mensajes:", error);
      throw error;  
    }
  },

  // Método para enviar un nuevo mensaje
  async sendMessage(message) {
    try {
      //console.log(message);
      
      const response = await axios.post(`${API_URL}send`, message, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      throw error; 
    }
  },
};
