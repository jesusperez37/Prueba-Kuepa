import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/modules/auth/views/Login.vue';
import Register from '@/modules/auth/views/Register.vue'; // Ruta de registro
import Admin from '@/views/Admin.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresUnauth: true }, // Nueva meta para evitar redirección infinita
  },
  {
    path: '/register',
    name: 'register',
    component: Register, // Ruta de registro
    meta: { requiresUnauth: true }, // Nueva meta para evitar redirección infinita
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: { requiresAuth: true, isModerator: true },
  },
];

const router = new Router({
  routes,
});
router.beforeEach((to, from, next) => {
  const userData = localStorage.getItem('user');
  let user = null;

  // Verificación antes de hacer JSON.parse
  if (userData) {
    try {
      user = JSON.parse(userData); // Si hay datos, los parseamos
    } catch (error) {
      console.error('Error al parsear datos del usuario:', error);
      localStorage.removeItem('user'); // Eliminar el usuario corrupto
    }
  }

  // Si la ruta requiere autenticación y el usuario no está autenticado, redirigir a login
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user) {
      return next({ name: 'login' }); // Si no hay usuario, ir a login
    }

    if (to.meta.isModerator && user.tipo_usuario !== 'moderador') {
      return next({ name: 'home' }); // Si es un moderador, ir a la home
    }
  }

  // Si la ruta requiere que el usuario no esté autenticado (login o registro)
  if (to.matched.some((record) => record.meta.requiresUnauth)) {
    if (user) {
      // Si ya está logueado, redirigir a la home
      return next({ name: 'home' });
    }
  }

  next(); // Continúa con la navegación
});


export default router;
