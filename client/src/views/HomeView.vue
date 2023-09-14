<template>
    <header-view />

    <v-card class="pa-2 mt-6 v-100 h-100 pb-6 mb-6">
        <PanelView />
    </v-card>

    <footer-view />
</template>

<script setup lang="ts">
import HeaderView from '@/components/layout/HeaderView.vue';
import FooterView from '@/components/layout/FooterView.vue';
import PanelView from '@/components/layout/PanelView.vue';
</script>
