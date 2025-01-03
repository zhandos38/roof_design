import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router';
import { UserRolesEnum } from '@/types/users';
import AppLayout from '@/layouts/AppLayout.vue';

export enum RoutesEnum {
  HOME = 'HOME',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  USERS = 'USERS',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: RoutesEnum.HOME,
          component: () => import('@/views/HomeView.vue'),
          meta: { auth: true }
        },
        {
          path: '/users',
          name: RoutesEnum.USERS,
          component: () => import('../views/UsersView.vue'),
          meta: { auth: true }
        },
      ]
    },
    {
      path: '/login',
      name: RoutesEnum.LOGIN,
      component: () => import('../views/auth/LoginView.vue'),
      meta: { auth: false }
    },
    {
      path: '/auth/access',
      name: 'accessDenied',
      component: () => import('@/views/auth/AccessView.vue')
    },
    {
      path: '/auth/error',
      name: 'error',
      component: () => import('@/views/auth/ErrorView.vue')
    },
    {
      path: '/pages/notfound',
      name: 'notfound',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (!to.meta.auth) {
    next();
    return;
  }

  if (to.meta.auth) {
    const authStore = useAuthStore();

    if (
      authStore.getIsLoggedIn() &&
      (authStore.getUser().role === UserRolesEnum.ADMIN
        ? true
        : to.meta.roles && to.meta.roles.includes(authStore.getUser().role))
    ) {
      next();
    } else {
      next({ name: RoutesEnum.LOGIN });
    }
  }
});

export default router;
