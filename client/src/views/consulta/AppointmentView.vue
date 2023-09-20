<template>
    <HeaderViewVue />

    <v-container
        class="pt-6 mt-6 mb-4"
        fluid>
        <v-row class="mt-6">
            <v-col>
                <v-form @submit.prevent="getAppointments">
                    <v-card>
                        <v-card-title>
                            <GoBackBtnVue color="secondary" />
                            Consulta
                        </v-card-title>

                        <v-card-text>
                            <v-row>
                                <v-col
                                    cols="12"
                                    class="pb-0"
                                    md="6">
                                    <v-text-field
                                        label="Id"
                                        v-model="searchParams.id"
                                        :hide-details="true"
                                        type="number"
                                        dense>
                                    </v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    class="pb-0"
                                    md="6">
                                    <v-text-field
                                        label="Data"
                                        :hide-details="true"
                                        v-model="searchParams.date"
                                        type="date"
                                        dense>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>

                        <v-card-actions>
                            <v-row>
                                <v-col
                                    cols="12"
                                    class="text-center text-md-start"
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
                                    class="text-center text-md-end"
                                    md="6">
                                    <v-btn
                                        prepend-icon="mdi-backspace-outline"
                                        @click="
                                            searchParams.id = '';
                                            searchParams.date = '';
                                            getAppointments();
                                        "
                                        color="secondary"
                                        variant="tonal">
                                        limpar
                                    </v-btn>
                                    <v-btn
                                        append-icon="mdi-account-search"
                                        color="secondary"
                                        type="submit"
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
                        <th scope="col">
                            <v-chip>ID</v-chip>
                        </th>
                        <th scope="col">Nome</th>
                        <th scope="col">Data</th>
                        <th scope="col">Descrição</th>
                    </tr>
                </thead>

                <tbody v-if="noData">
                    <tr>
                        <td
                            class="text-center"
                            colspan="4">
                            Nenhum resultado encontrado!
                        </td>
                    </tr>
                </tbody>

                <tbody>
                    <tr
                        v-for="(item, index) in apiData"
                        :key="index">
                        <td>
                            <v-chip>{{ item.id }}</v-chip>
                        </td>
                        <td>{{ item.name }}</td>
                        <td>{{ convertDate(item.date) }}</td>
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
        :submit="saveAppointment">
        <template #body>
            <v-row>
                <v-col
                    cols="12"
                    md="6">
                    <v-autocomplete
                        label="Paciente"
                        v-model="form.user"
                        :items="users"
                        required
                        :rules="[(v) => !!v || 'Campo Obrigatorio']"
                        :return-object="false"
                        item-title="name"
                        item-value="id">
                    </v-autocomplete>
                </v-col>
                <v-col
                    cols="12"
                    md="6">
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
                <v-col
                    cols="12"
                    class="text-center">
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

    <LoadingView
        color="secondary"
        v-model="state.isLoading">
    </LoadingView>

    <AlertView
        v-model="alert.display"
        :color="alert.color"
        :message="alert.text"
        :icon="alert.icon">
    </AlertView>

    <FooterViewVue />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { userStore } from '@/stores/user';
import { convertDate } from '../../utils/common';
import axios from 'axios';
import Alert from '@/services/Alert';
import AlertView from '@/components/layout/AlertView.vue';
import HeaderViewVue from '@/components/layout/HeaderView.vue';
import FooterViewVue from '@/components/layout/FooterView.vue';
import GoBackBtnVue from '@/components/layout/GoBackBtn.vue';
import ModalView from '@/components/layout/ModalView.vue';
import LoadingView from '@/components/layout/LoadingView.vue';

onMounted(async () => {
    await getAppointments();
    await getUser();
});

const api = ref(import.meta.env.VITE_API_URL);
const apiData = ref([]) as any;
const noData = ref(false);

const alert = ref(new Alert());

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

const searchParams = ref({
    id: '',
    name: '',
    date: '',
});

const form = ref({
    user: undefined,
    date: '',
    description: '',
}) as any;

const getUser = async () => {
    const response = await userStore().getUser();
    const filteredResponse = response.filter((item: any) => item.type === 'paciente');
    console.log('22 getUser users', response);

    users.value = filteredResponse;
};

const getAppointments = async () => {
    console.log('get data');

    state.value.isLoading = true;

    const params = {} as any;

    for (const [param, value] of Object.entries(searchParams.value)) {
        if (value !== '') {
            console.log('3333333 - items', value);
            params[param] = value;
        }
    }

    console.log('getAppointments - params', params);

    const queryParams = [];

    if (params.id !== undefined) {
        queryParams.push(`id=${params.id}`);
    }

    if (params.date !== undefined) {
        queryParams.push(`date=${params.date}`);
    }

    const queryString = queryParams.join('&');

    try {
        const response = await axios.get(`${api.value}/appointment?${queryString}`);

        console.log('getData - response', response);

        if (response.data.length === 0) {
            noData.value = true;
        } else {
            noData.value = false;
        }

        apiData.value = response.data;
    } catch (error) {
        console.log('error', error);
    } finally {
        state.value.isLoading = false;
    }
};

const validateForm = () => {
    console.log('validateForm', form.value);
    if (form.value.user !== '' && form.value.date !== '' && form.value.description !== '') {
        return true;
    }

    return false;
};

const saveAppointment = async () => {
    console.log('submit form', form.value);
    alert.value.hide();

    if (validateForm()) {
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
                alert.value.show('Consulta salva com sucesso', 'mdi-check-circle', 'success');
            }
        } catch (error) {
            console.log('error', error);
            alert.value.show('Erro ao salvar consulta', 'mdi-alert-circle', 'error');
        }
    } else {
        alert.value.show('Preencha todos os campos', 'mdi-alert-circle', 'error');
    }
};
</script>
