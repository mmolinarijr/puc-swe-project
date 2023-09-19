<template>
    <HeaderViewVue />

    <v-container
        class="pt-6 mt-6"
        fluid>
        <v-row class="mt-6">
            <v-col>
                <v-form>
                    <v-card>
                        <v-card-title>
                            <GoBackBtnVue color="secondary" />
                            Consulta
                        </v-card-title>

                        <v-card-text>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        label="Id"
                                        outlined
                                        dense></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        label="Nome"
                                        outlined
                                        dense></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        label="E-mail"
                                        outlined
                                        dense></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>

                        <v-card-actions>
                            <v-row>
                                <v-col
                                    cols="12"
                                    md="6">
                                    <v-btn
                                        variant="text"
                                        @click="modals.appointment = true"
                                        color="secondary">
                                        <v-icon>mdi-pencil</v-icon>
                                        Nova Consulta
                                    </v-btn>
                                </v-col>

                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>

                                <v-col
                                    cols="12"
                                    class="text-end"
                                    md="6">
                                    <v-btn
                                        append-icon="mdi-account-search"
                                        color="secondary"
                                        variant="tonal">
                                        Pesquisar
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>

        <br />

        <v-card>
            <v-table>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Data</th>
                        <th scope="col">Descricao</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="(item, index) in apiData"
                        :key="index">
                        <td>
                            <v-chip>{{ item.id }}</v-chip>
                        </td>
                        <td>{{ item.user_id }}</td>
                        <td>{{ item.date }}</td>
                        <td>{{ item.description }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
    </v-container>

    <!-- New Medical Appointment -->
    <ModalView
        v-model="modals.appointment"
        :is-persistent="true"
        title="Nova Consulta"
        :submit="submit">
        <template #body>
            <v-row>
                <v-col>
                    <v-autocomplete
                        label="Paciente"
                        v-model="form.user"
                        :items="users"
                        required
                        :rules="[(v) => !!v || 'Campo Obrigatorio']"
                        :return-object="false"
                        item-title="username"
                        item-value="id">
                    </v-autocomplete>
                </v-col>
                <v-col>
                    <v-text-field
                        label="Data"
                        v-model="form.date"
                        :rules="[(v) => !!v || 'Campo Obrigatorio']"
                        required
                        type="date"
                        outlined
                        dense>
                    </v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-textarea
                        :rules="[(v) => !!v || 'Campo Obrigatorio']"
                        required
                        label="Descricao"
                        v-model="form.description">
                    </v-textarea>
                </v-col>
            </v-row>
        </template>

        <template #footer>
            <v-btn
                color="secondary"
                @click="modals.appointment = false">
                Cancelar
            </v-btn>
            <v-btn
                color="secondary"
                variant="tonal"
                append-icon="mdi-content-save"
                type="submit">
                Salvar
            </v-btn>
        </template>
    </ModalView>

    <LoadingView v-model="state.isLoading" />

    <FooterViewVue />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { userStore } from '@/stores/user';
import axios from 'axios';
import HeaderViewVue from '@/components/layout/HeaderView.vue';
import FooterViewVue from '@/components/layout/FooterView.vue';
import GoBackBtnVue from '@/components/layout/GoBackBtn.vue';
import ModalView from '@/components/layout/ModalView.vue';
import LoadingView from '@/components/layout/LoadingView.vue';

onMounted(async () => {
    console.log('mounted');
    await getUser();
    await getAppointments();
});

const api = ref(import.meta.env.VITE_API_URL);
const apiData = ref([]) as any;

const modals = ref({
    appointment: false,
});

watch(
    () => modals.value.appointment,
    () => {
        if (modals.value.appointment) {
            form.value.date = '';
            form.value.description = '';
            form.value.user = undefined;
        }
    }
);

const state = ref({
    isLoading: false,
});

const users = ref([]) as any;

const form = ref({
    user: undefined,
    date: '',
    description: '',
});

const getUser = async () => {
    const response = await userStore().getUser();
    const filteredResponse = response.filter((item: any) => item.type === 'paciente');
    console.log('22 getUser users', response);

    users.value = filteredResponse;
};

const getAppointments = async () => {
    console.log('get data');

    state.value.isLoading = true;

    try {
        const response = await axios.get(`${api.value}/appointment`);

        console.log('getData - response', response);

        apiData.value = response.data;
    } catch (error) {
        console.log('error', error);
    } finally {
        state.value.isLoading = false;
    }
};

const submit = async () => {
    console.log('submit form', form.value);

    const params = {
        user_id: form.value.user,
        date: form.value.date,
        description: form.value.description,
    };

    console.log('submit params', params);

    try {
        const response = await axios.post(`${api.value}/appointment`, params);
        console.log('submit - response', response);

        if (response.status === 200) {
            modals.value.appointment = false;
            await getAppointments();
        }
    } catch (error) {
        console.log('error', error);
    }
};
</script>
