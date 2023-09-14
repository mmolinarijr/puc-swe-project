<template>
    <v-snackbar :color="props.color">
        {{ message }}
        <v-btn>
            Fechar
        </v-btn>
    </v-snackbar>
</template>

<script setup lang="ts">
const props = defineProps({
    message: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: false,
        default: 'success',
    },
    timeout: {
        type: Number,
        required: false,
        default: 3000,
    },
});
</script>

<style scoped>

</style>