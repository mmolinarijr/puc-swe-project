<template>
    <v-btn
        class="pr-3 mr-3"
        variant="tonal"
        :color="props.color"
        prepend-icon="mdi-arrow-left"
        :to="props.to">
        Voltar
    </v-btn>
</template>

<script setup lang="ts">
const props = defineProps({
    to: {
        type: String,
        default: '/home'
    },
    color: {
        type: String,
        default: 'teal'
    },
});
</script>

<style scoped></style>
