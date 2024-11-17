import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/chat/index.vue'),
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: () => import('../views/chat/index.vue'),
    },
    {
      path: '/model',
      name: 'model',
      component: () => import('../views/model/index.vue'),
      meta: {
        navbarType: 'model',
      },
      children: [
        {
          path: '',
          name: 'hasModel',
          component: () => import('@/views/model/hasModel.vue'),
        },
        {
          path: 'obtain',
          name: 'obtainModel',
          component: () => import('@/views/model/obtainModel.vue'),
        },
      ],
    },
    { path: '/:pathMatch(.*)', component: () => import('../components/404.vue') },
  ],
});

export default router;
