import { createRouter, createWebHistory } from 'vue-router';
import LoginViewVue from '@/views/login/LoginView.vue';

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
            component: () => import('../views/home/HomeView.vue'),
        },
        {
            path: '/sobre',
            name: 'sobre',
            component: () => import('../views/sobre/AboutView.vue'),
        },
        {
            path: '/cadastro',
            name: 'cadastro',
            component: () => import('../views/cadastro/RegisterView.vue'),
        },
        {
            path: '/consultas',
            name: 'consulta',
            component: () => import('../views/consulta/QueryView.vue'),
        },
        {
            path: '/relatorios',
            name: 'relatorio',
            component: () => import('../views/relatorio/ReportsView.vue'),
        },
        {
            path: '/configuracoes',
            name: 'configuracao',
            component: () => import('../views/configuracao/ConfigView.vue'),
        },
    ],
});

export default router;
