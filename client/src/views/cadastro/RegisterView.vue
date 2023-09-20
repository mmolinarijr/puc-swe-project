<template>
    <HeaderViewVue />

    <v-container
        class="pt-6 mt-6"
        fluid>
        <v-row class="mt-6">
            <v-col>
                <v-form @submit.prevent="getUsers">
                    <v-card>
                        <v-card-title>
                            <GoBackBtnVue color="primary" />
                            Cadastros
                        </v-card-title>

                        <v-card-text>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        label="Id"
                                        outlined
                                        dense>
                                    </v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        label="CPF"
                                        outlined
                                        dense>
                                    </v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        label="Nome"
                                        outlined
                                        dense>
                                    </v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        label="E-mail"
                                        outlined
                                        dense>
                                    </v-text-field>
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
                                        @click="modals.register = true"
                                        color="primary">
                                        <v-icon>mdi-pencil</v-icon>
                                        Cadastrar
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
                                        color="primary"
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
                        <th scope="col">Id</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Nome</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Tipo</th>
                        <th
                            class="text-center"
                            scope="col">
                            Ação
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="(item, index) in apiData"
                        :key="index">
                        <td>{{ item.id }}</td>
                        <td>{{ item.cpf }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.type }}</td>
                        <td class="text-center">
                            <v-btn
                                color="primary"
                                @click="openModal('edit', item)"
                                variant="text">
                                <v-tooltip activator="parent">Editar</v-tooltip>
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn
                                color="red"
                                @click="openModal('delete', item)"
                                variant="text">
                                <v-tooltip activator="parent">Deletar</v-tooltip>
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
    </v-container>

    <!-- Add new User -->
    <ModalView
        v-model="modals.register"
        :submit="registerUser"
        title="Cadastro de Usuários do Sistema">
        <template #body>
            <v-row>
                <v-col>
                    <v-text-field
                        label="CPF"
                        type="number"
                        v-model="form.cpf"
                        outlined
                        dense>
                    </v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                        label="Nome"
                        outlined
                        v-model="form.name"
                        dense>
                    </v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                        label="E-mail"
                        v-model="form.email"
                        type="email"
                        outlined
                        dense>
                    </v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-select
                        v-model="form.type"
                        label="Tipo"
                        :items="['medico', 'paciente']">
                    </v-select>
                </v-col>
            </v-row>
        </template>

        <template #footer>
            <v-btn
                color="primary"
                @click="modals.register = false">
                Cancelar
            </v-btn>
            <v-btn
                color="primary"
                variant="tonal"
                append-icon="mdi-account-plus"
                type="submit">
                Cadastrar
            </v-btn>
        </template>
    </ModalView>

    <!-- Edit User -->
    <ModalView
        title="Edição de Usuário"
        v-model="modals.edit">
        <template #body>
            <v-row>
                <v-col>
                    <v-alert>{{ selectedItem.cpf }}</v-alert>
                    <v-text-field
                        label="CPF"
                        type="number"
                        v-model="form.cpf"
                        outlined
                        dense>
                    </v-text-field>
                </v-col>
                <v-col>
                    <v-alert>{{ selectedItem.name }}</v-alert>
                    <v-text-field
                        label="Nome"
                        outlined
                        v-model="form.name"
                        dense>
                    </v-text-field>
                </v-col>
                <v-col>
                    <v-alert>{{ selectedItem.email }}</v-alert>
                    <v-text-field
                        label="E-mail"
                        v-model="form.email"
                        type="email"
                        outlined
                        dense>
                    </v-text-field>
                </v-col>
            </v-row>
        </template>

        <template #footer>
            <v-btn
                color="primary"
                @click="modals.edit = false">
                Cancelar
            </v-btn>
            <v-btn
                color="primary"
                variant="tonal"
                append-icon="mdi-account-plus"
                @click="editUser(selectedItem)"
                type="submit">
                Salvar
            </v-btn>
        </template>
    </ModalView>

    <!-- Delete -->
    <ModalView
        :width="360"
        v-model="modals.delete">
        <template #body>
            <v-alert
                class="text-start ma-2"
                type="error"
                variant="text">
                Deseja realmente deletar o usuário?
            </v-alert>
        </template>

        <template #footer>
            <v-btn
                color="primary"
                @click="modals.delete = false">
                Cancelar
            </v-btn>
            <v-btn
                color="primary"
                variant="tonal"
                append-icon="mdi-account-minus"
                @click="deleteUser(selectedItem)"
                type="submit">
                Deletar
            </v-btn>
        </template>
    </ModalView>

    <LoadingView
        color="primary"
        v-model="state.isLoading">
    </LoadingView>

    <FooterViewVue />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import HeaderViewVue from '@/components/layout/HeaderView.vue';
import FooterViewVue from '@/components/layout/FooterView.vue';
import GoBackBtnVue from '@/components/layout/GoBackBtn.vue';
import ModalView from '@/components/layout/ModalView.vue';
import LoadingView from '@/components/layout/LoadingView.vue';

onMounted(async () => {
    console.log('mounted');
    await getUsers();
});

const api = ref(import.meta.env.VITE_API_URL);
const apiData = ref([]) as any;

const modals = ref({
    register: false,
    edit: false,
    delete: false,
});

const state = ref({
    isLoading: false,
});

const selectedItem = ref(undefined) as any;

const form = ref({
    cpf: '',
    name: '',
    email: '',
    type: '',
});

watch(modals.value, () => {
    console.log('watch modals', modals.value);

    if (modals.value) {
        form.value.name = '';
        form.value.cpf = '';
        form.value.email = '';
        form.value.type = '';
    }
});

const openModal = (type: string, item: any) => {
    console.log('openModal');
    selectedItem.value = item;

    switch (type) {
        case 'edit':
            modals.value.edit = true;
            break;
        case 'delete':
            modals.value.delete = true;
            break;
    }
};

const editUser = async (item: any) => {
    console.log('editUser');

    const params = {
        cpf: form.value.cpf !== '' ? form.value.cpf : item.cpf,
        name: form.value.name !== '' ? form.value.name : item.name,
        email: form.value.email !== '' ? form.value.email : item.email,
    };

    console.log('editUser - params', params);

    try {
        const response = await axios.put(`${api.value}/user/${item.id}`, params);

        console.log('editUser - response', response);

        if (response.data) {
            modals.value.edit = false;
            await getUsers();
        }
    } catch (error) {
        console.error('editUser - error', error);
    }
};

const deleteUser = async (id: number) => {
    console.log('deleteUser');
    try {
        const response = await axios.delete(`${api.value}/user/${id}`);

        console.log('deleteUser - response', response);

        await getUsers();
    } catch (error) {
        console.error('deleteUser - error', error);
    } finally {
        state.value.isLoading = false;
        modals.value.delete = false;
    }
};

const getUsers = async () => {
    state.value.isLoading = true;

    try {
        const response = await axios.get(`${api.value}/user`);

        console.log('getUsers - response', response);

        apiData.value = response.data;
    } catch (error) {
        console.log('error', error);
    } finally {
        state.value.isLoading = false;
    }
};

const registerUser = async () => {
    console.log('submit form', form.value);
    console.log('submit api', api.value);

    const params = {
        cpf: form.value.cpf,
        name: form.value.name,
        password: form.value.name.toLowerCase(),
        type: form.value.type,
        email: form.value.email,
    };

    try {
        const response = await axios.post(`${api.value}/user`, params);

        console.log('submit - response', response);
    } catch (error) {
        console.log('error', error);
    } finally {
        modals.value.register = false;
        await getUsers();
    }
};
</script>
