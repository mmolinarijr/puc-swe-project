import { createRouter, createWebHistory } from 'vue-router';
import LoginViewVue from '@/views/LoginView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: '/',
            redirect: { name: 'login' },
        },
        {
            path: '/login',
            name: 'login',
            component: LoginViewVue,
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
        },
    ],
});

export default router;
