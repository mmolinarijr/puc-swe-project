<template>
    <v-dialog :persistent="props.isPersistent">
        <v-form @submit.prevent="props.submit">
            <v-card :class="props.cardClass">
                <v-card-item>
                    <v-card-title class="text-center">{{ props.title }}</v-card-title>
                    <v-card-subtitle>{{ props.subtitle }}</v-card-subtitle>
                </v-card-item>
    
                <v-card-text>
                    {{ props.text }}
                    <slot name=body></slot>
                </v-card-text>
    
                <v-card-actions class="text-center">
                    <slot name=footer></slot>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
    },
    subtitle: {
        type: String,
    },
    text: {
        type: String,
    },
    cardClass: {
        type: String,
        default: 'elevation-12',
    },
    submit: {
        type: Function,
        default: () => {},
    },
    isPersistent: {
        type: Boolean,
        default: false,
    },
});
</script>

<style scoped></style>
