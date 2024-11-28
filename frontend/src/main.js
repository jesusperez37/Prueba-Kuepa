import Vue from 'vue';
import App from './App.vue';
import router from './modules/router';
import { io } from "socket.io-client";
import store from './core/store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;

// Configurar socket.io globalmente
export const socket = io('http://localhost:4000');

// Aquí puedes emitir cualquier evento desde el front-end si es necesario
socket.on('connect', () => {
  console.log('Conectado a Socket.io');
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
