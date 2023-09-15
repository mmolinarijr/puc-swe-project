<template>
    <v-overlay
        :persistent="true"
        class="align-center justify-center">
        <v-progress-circular
            class="ml-3"
            color="teal"
            indeterminate
            :width="9"
            size="60">
        </v-progress-circular>
        <v-alert
            class="pl-0"
            color="white"
            variant="text"
            text="Carregando...">
        </v-alert>
    </v-overlay>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>