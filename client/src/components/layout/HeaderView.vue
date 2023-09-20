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
                    class="d-none d-sm-flex"
                    image="medicalIcon.png"
                    size="45">
                </v-avatar>
                <v-app-bar-title class="text-no-wrap text-end text-body-2 text-md-h6">
                    Sistema de Gerenciamento de Consultas
                </v-app-bar-title>
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
                    :disabled="item.active === false"
                    :to="item.link">
                    <v-list-item-title>
                        <v-btn variant="text">
                            <v-icon
                                class="pr-2"
                                size="20">
                                {{ item.icon }}
                            </v-icon>
                            {{ item.title }}
                        </v-btn>
                        <span
                            style="font-weight: 0.1em; font-size: 0.7em"
                            class="ml-n4 text-warning"
                            v-if="item.active === false">
                            {{ item.message }}
                        </span>
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

const drawer = ref(false);
</script>

<style>
.v-list-group__items .v-list-item {
    padding-inline-start: 26px !important;
}
</style>
