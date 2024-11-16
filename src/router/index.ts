import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/index.vue'),
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: () => import('../views/home/index.vue'),
    },
    { path: '/:pathMatch(.*)', component: () => import('../components/404.vue') },
  ],
});

export default router;
