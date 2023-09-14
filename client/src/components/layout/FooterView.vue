<template>
    <v-layout>
        <v-bottom-navigation
            v-model="value"
            color="primary"
            horizontal>
            <v-spacer></v-spacer>
            <v-footer class="text-end">
                Made by Eliene & Mauricio <br> {{ new Date().getFullYear() }} &reg; All rights reserved 
            </v-footer>

            <!-- <v-btn>
                <v-icon>mdi-information-outline</v-icon>
                Sobre
            </v-btn> -->
        </v-bottom-navigation>
    </v-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(0);
</script>

<style scoped></style>
