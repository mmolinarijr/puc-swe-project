<template>
    <v-toolbar
        :elevation="3"
        class="w-100 mb-2"
        color="blue-darken-4"
        title="Sistema de Gerenciamento de Consultas">
        <template #prepend>
            <v-app-bar-nav-icon to="/">
                <v-avatar image="/src/assets/images/icons8-medical-96.png" size="50"></v-avatar>
            </v-app-bar-nav-icon>
        </template>
    </v-toolbar>

    <!-- <MenuView /> -->
</template>

<script setup lang="ts">
import MenuView from './MenuView.vue';
</script>
