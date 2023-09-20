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
                                src="https://img.freepik.com/premium-vector/making-appointment-with-doctor-flat-concept-vector-illustration_151150-12192.jpg">
                            </v-img>
                        </v-card-title>

                        <v-card-text class="mx-6">
                            <v-row align="center">
                                <v-col
                                    cols="12"
                                    class="pb-0"
                                    md="12">
                                    <v-text-field
                                        v-model="form.username"
                                        label="Usuário"
                                        outlined
                                        :rules="[(v) => !!v || 'Usuário é obrigatório']"
                                        dense
                                        required>
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
                                            (v) => v.length >= 3 || 'Senha deve ter no mínimo 3 caracteres',
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
                                        :loading="isLoading"
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

    <alert-view
        v-model="alert.display"
        :icon="alert.icon"
        :color="alert.color"
        :message="alert.text">
    </alert-view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import AlertView from '@/components/layout/AlertView.vue';
import Alert from '@/services/Alert';

const api = ref(import.meta.env.VITE_API_URL);

// const alert = new Alert();

const alert = ref(new Alert());

const router = useRouter();

const isLoading = ref(false);

const form = ref({
    username: '',
    password: '',
});

const validate = () => {
    console.log('validate', form.value);
    if (form.value.username && form.value.password) {
        return true;
    }
};

const login = async () => {
    console.log('login', form.value);
    alert.value.hide();

    if (validate()) {
        isLoading.value = true;

        try {
            const response = await axios.post(`${api.value}/login`, form.value);

            if (response?.status === 200 && response?.data.message === 'User logged in successfully') {
                router.push('/home');
            } else {
                console.log('01 LOGIN else negative - response', response);
            }
        } catch (error) {
            console.error('Login Error :: ', error);

            alert.value.show('Usuário ou senha inválidos', 'mdi-alert-circle-outline', 'error');
        } finally {
            isLoading.value = false;
        }
    }
};
</script>
