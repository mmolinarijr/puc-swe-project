<template>
    <v-toolbar
        :elevation="3"
        class="w-100 mb-2"
        prominent
        title="Consulta Medica">
        <template #prepend>
            <v-app-bar-nav-icon>
                <v-icon>mdi-medical-bag</v-icon>
            </v-app-bar-nav-icon>
        </template>
    </v-toolbar>

    <!-- <MenuView /> -->
</template>

<script setup lang="ts">
import MenuView from './MenuView.vue';
</script>
