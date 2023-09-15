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
                            <GoBackBtnVue color="primary" />
                            Cadastros
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
                        <th>Id</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>1</td>
                        <td>João</td>
                        <td>
                            <v-chip
                                color="primary"
                                label
                                >ddfd
                            </v-chip>
                        </td>
                        <td>sdsdsd</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
    </v-container>

    <!-- Add new User -->
    <ModalView
        v-model="modals.register"
        :submit="submit"
        title="Cadastro de Usuarios do Sistema">
        <template #body>
            <v-row>
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
                        outlined
                        dense>
                    </v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-select v-model="form.type" label="Tipo" :items="['medico', 'paciente']"></v-select>
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

    <LoadingView v-model="state.isLoading" />

    <FooterViewVue />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeaderViewVue from '@/components/layout/HeaderView.vue';
import FooterViewVue from '@/components/layout/FooterView.vue';
import GoBackBtnVue from '@/components/layout/GoBackBtn.vue';
import ModalView from '@/components/layout/ModalView.vue';
import LoadingView from '@/components/layout/LoadingView.vue';

const modals = ref({
    register: false,
});

const state = ref({
    isLoading: false,
})

const form = ref({
    name: '',
    email: '',
    type: '',
});

const submit = () => {
    console.log('submit form', form.value);
};
</script>

<style scoped></style>
