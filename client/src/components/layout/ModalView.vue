<template>
    <v-dialog>
        <v-card :class="props.cardClass">
            <v-card-item>
                <v-card-title>{{ props.title }}</v-card-title>
                <v-card-subtitle>props.subtitle</v-card-subtitle>
            </v-card-item>

            <v-card-text>{{props.text}}</v-card-text>

            <v-card-actions>{{ props.actions }}</v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        default: 'Modal Title'
    },
    subtitle: {
        type: String,
        default: 'Modal Subtitle'
    },
    text: {
        type: String,
        default: 'Modal Text'
    },
    actions: {
        type: String,
        default: 'Modal Actions'
    },
    cardClass: {
        type: String,
        default: 'elevation-12'
    },
});
</script>

<style scoped>

</style>