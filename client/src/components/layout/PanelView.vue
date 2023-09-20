<template>
    <v-row class="mt-6 mb-6">
        <v-col
            v-for="(item, index) in menus"
            :key="index"
            cols="12"
            md="4">
            <v-card
                :disabled="item.active === false"
                class="pa-2 ma-1 mt-5">
                <template #prepend>
                    <v-avatar size="50">
                        <v-icon
                            :color="item.color"
                            size="50">
                            {{ item.icon }}
                        </v-icon>
                    </v-avatar>
                </template>

                <template
                    v-if="item.active === false"
                    #append>
                    <v-icon
                        :color="item.color"
                        size="40">
                        mdi-alert-circle
                    </v-icon>
                    {{ item.message }}
                </template>

                <v-card-item>
                    <v-card-title>
                        {{ item.title }}
                    </v-card-title>

                    <v-card-subtitle class="text-body-2 pl-0">
                        {{ item.descriptions }}
                    </v-card-subtitle>
                </v-card-item>

                <v-card-actions>
                    <v-btn
                        :color="item.color"
                        append-icon="mdi-arrow-right-bold-box"
                        :to="item.link">
                        Acessar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { menus } from '@/services/menus';
</script>
