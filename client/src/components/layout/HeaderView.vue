<template>
    <v-layout>
        <v-app-bar
            :elevation="3"
            class="w-100 mb-6"
            color="white">
            <v-app-bar-title class="text-no-wrap">
                Sistema de Gerenciamento de Consultas
            </v-app-bar-title>
            <template #prepend>
                <v-app-bar-nav-icon @click.stop="sidebar.rail = !sidebar.rail"></v-app-bar-nav-icon>
    
                <v-app-bar-nav-icon to="/">
                    <v-avatar image="/src/assets/images/icons8-medical-96.png" size="50"></v-avatar>
                </v-app-bar-nav-icon>
                
            </template>
    
            <!-- SideBar -->
            <v-layout>
                <v-navigation-drawer
                    v-model="sidebar.drawer"
                    disable-route-watcher
                    permanent
                    :rail="sidebar.rail"
                    @click="sidebar.rail = false">
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
    
            <!-- <template #append> -->
                <MenuView />
            <!-- </template> -->
        </v-app-bar>
    </v-layout>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import MenuView from './MenuView.vue';
import { menus } from '@/services/menus';
import emitt from 'emitt';
import { emittBus } from '@/services/emittBus'

const emitter = emitt();

const openDrawer = () => {
    console.log('openDrawer');
    emittBus.emit('openDrawer');    
};

const sidebar = ref({
    rail: false,
    drawer: false,
});
</script>

<style>
.v-list-group__items .v-list-item {
    padding-inline-start: 26px !important;
}
</style>