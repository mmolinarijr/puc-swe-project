<template>
    <div>
        <v-card
            class="pa-2 ma-1"
            v-for="(item, index) in data"
            :key="index"
            :title="item.title">
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref([
    {
        title: 'Cadastrados',
        icon: 'mdi-account',
        link: '/cadastrados',
    },
    {
        title: 'Consultas',
        icon: 'mdi-calendar',
        link: '/consultas',
    },
    {
        title: 'Relatórios',
        icon: 'mdi-file-chart',
        link: '/relatorios',
    },
    {
        title: 'Configurações',
        icon: 'mdi-cog',
        link: '/configuracoes',
    }
]);
</script>

