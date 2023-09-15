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
                            <GoBackBtnVue color="info" />
                            Relatorios
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
                                        color="info">
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
                                        color="info"
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

    <ModalView />

    <FooterViewVue />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeaderViewVue from '@/components/layout/HeaderView.vue';
import FooterViewVue from '@/components/layout/FooterView.vue';
import GoBackBtnVue from '@/components/layout/GoBackBtn.vue';
import ModalView from '@/components/layout/ModalView.vue';
</script>

<style scoped></style>
