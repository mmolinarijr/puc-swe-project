<template>
    <v-container fluid>
        <v-row class="mx-auto">
            <v-spacer></v-spacer>
            <v-col
                cols="12"
                class="mt-5 pt-5"
                sm="8"
                md="6"
                lg="4">
                <v-form @submit.prevent="login">
                    <v-card class="mx-auto">
                        <v-card-title
                            class="mx-6 py-6 text-center"
                            justify-center
                            align-center>
                            <v-img
                                :width="300"
                                class="mx-auto"
                                aspect-ratio="16/9"
                                cover
                                alt="Company Logo"
                                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
                            </v-img>
                        </v-card-title>

                        <v-card-text class="mx-6">
                            <v-row align="center">
                                <v-col
                                    cols="12"
                                    class="pb-0"
                                    md="12">
                                    <v-text-field
                                        v-model="form.email"
                                        label="E-mail"
                                        outlined
                                        dense
                                        :rules="[
                                            (v) => !!v || 'E-mail é obrigatório',
                                            (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
                                        ]"
                                        required
                                        type="email">
                                    </v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    class="py-0"
                                    md="12">
                                    <v-text-field
                                        v-model="form.password"
                                        label="Senha"
                                        outlined
                                        :rules="[
                                            (v) => !!v || 'Senha é obrigatória',
                                            (v) => v.length >= 6 || 'Senha deve ter no mínimo 6 caracteres',
                                        ]"
                                        dense
                                        required
                                        type="password">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row align="center">
                                <v-col
                                    cols="12"
                                    class="text-center"
                                    md="12">
                                    <v-btn
                                        color="info"
                                        rounded
                                        type="submit">
                                        Acessar
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-form>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
    email: '',
    password: '',
});

const login = () => {
    console.log('login', form.value);
};
</script>

<style scoped></style>
