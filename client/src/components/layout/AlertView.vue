<template>
    <v-snackbar
        :timeout="props.timeout"
        :color="props.color">
        <v-icon>{{ props.icon }}</v-icon>
        {{ props.message }}
        <template #actions>
            <v-btn
                color="white"
                @click="emit">
                Fechar
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script setup lang="ts">
const emits = defineEmits(['update:modelValue']);

const props = defineProps({
    message: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: 'success',
    },
    timeout: {
        type: Number,
        default: 3000,
    },
    icon: {
        type: String,
        default: 'mdi-check-circle',
    },
});

const emit = () => {
    emits('update:modelValue', false);
};
</script>
