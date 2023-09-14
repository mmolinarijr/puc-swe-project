<template>
    <header-view />

    <v-card class="pa-2 mt-6">
        <PanelView />
    </v-card>
</template>

<script setup lang="ts">
import HeaderView from '@/components/layout/HeaderView.vue';
import PanelView from '@/components/layout/PanelView.vue';
</script>
