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
                        v-model="form.patient"
                        required
                        :rules="[(v) => !!v || 'Campo Obrigatorio']"
                        :items="['Maria', 'Jose', 'Carlos', 'Irla', 'Amanda', 'Josefa']">
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
import { ref, watch } from 'vue';
import HeaderViewVue from '@/components/layout/HeaderView.vue';
import FooterViewVue from '@/components/layout/FooterView.vue';
import GoBackBtnVue from '@/components/layout/GoBackBtn.vue';
import ModalView from '@/components/layout/ModalView.vue';
import LoadingView from '@/components/layout/LoadingView.vue';

const modals = ref({
    appointment: false,
});

watch(
    () => modals.value.appointment,
    () => {
        if (modals.value.appointment) {
            form.value.patient = '';
            form.value.date = '';
            form.value.description = '';
        }
    }
);

const state = ref({
    isLoading: false,
});

const form = ref({
    patient: '',
    date: '',
    description: '',
});

const submit = () => {
    console.log('submit form', form.value);
};
</script>

<style scoped></style>
