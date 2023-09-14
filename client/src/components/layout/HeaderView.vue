<template>
    <v-layout>
        <v-app-bar
            :elevation="2"
            class="w-100 mb-6"
            color="white">
            <template #prepend>
                <v-app-bar-nav-icon>
                    <v-btn
                        variant="text"
                        icon="mdi-menu"
                        @click.stop="drawer = !drawer">
                    </v-btn>
                </v-app-bar-nav-icon>
                <v-avatar
                    image="medicalIcon.png"
                    size="50">
                </v-avatar>
                <v-app-bar-title class="text-no-wrap"> Sistema de Gerenciamento de Consultas </v-app-bar-title>
            </template>

            <template #append>
                <MenuView />
            </template>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            disable-route-watcher
            permanent>
            <v-list>
                <v-list-item
                    v-for="(item, index) in menus"
                    :key="index"
                    :to="item.link">
                    <v-list-item-title>
                        <v-btn variant="plain">
                            <v-icon
                                class="pr-2"
                                size="20">
                                {{ item.icon }}
                            </v-icon>
                            {{ item.title }}
                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MenuView from './MenuView.vue';
import { menus } from '@/services/menus';

const drawer = ref(true);
const rail = ref(true);

const sidebar = ref({
    rail: true,
    drawer: true,
});
</script>

<style>
.v-list-group__items .v-list-item {
    padding-inline-start: 26px !important;
}
</style>
