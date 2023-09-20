<template>
    <v-menu>
        <template #activator="{ props }">
            <v-btn
                color="info"
                depressed
                v-bind="props">
                Menu
                <v-icon
                    class="pl-2 ml-1"
                    size="30">
                    mdi-menu-down
                </v-icon>
            </v-btn>
        </template>

        <v-list>
            <v-list-item
                v-for="(item, index) in items"
                :key="index">
                <v-list-item-title>
                    <v-btn
                        @click="openModal(item.type)"
                        variant="plain">
                        <v-icon
                            class="pr-2"
                            size="20">
                            {{ item.icon }}
                        </v-icon>
                        {{ item.title }}
                    </v-btn>
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>

    <!-- About program -->
    <v-dialog
        v-model="modals.about"
        max-width="560">
        <v-form>
            <v-row>
                <v-col>
                    <v-card class="text-center">
                        <v-card-title class="py-4 my-4 pb-0 mb-1">Sobre</v-card-title>

                        <v-card-text class="text-center">
                            <AboutView />
                        </v-card-text>

                        <v-card-actions class="text-center">
                            <v-spacer></v-spacer>
                            <v-btn
                                color="teal"
                                variant="text"
                                @click="modals.about = false">
                                Fechar
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-form>
    </v-dialog>

    <!-- Exit program -->
    <v-dialog
        v-model="modals.exit"
        max-width="560">
        <v-form>
            <v-row>
                <v-col>
                    <v-card class="text-center">
                        <v-card-title class="py-4 my-4"> Deseja Realmente sair? </v-card-title>

                        <v-card-actions class="text-center">
                            <v-spacer></v-spacer>
                            <v-btn
                                color="error"
                                variant="tonal"
                                @click="modals.exit = false">
                                Não
                            </v-btn>
                            <v-btn
                                color="info"
                                variant="tonal"
                                to="/">
                                Sim
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-form>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AboutView from '@/views/sobre/AboutView.vue';

const items = ref([
    {
        title: 'Sobre',
        type: 'about',
        icon: 'mdi-information-outline',
        link: '/about',
    },
    {
        title: 'Sair',
        type: 'exit',
        icon: 'mdi-exit-to-app',
        link: '/',
    },
]);

const modals = ref({
    about: false,
    exit: false,
});

const openModal = (type: string) => {
    switch (type) {
        case 'about':
            modals.value.about = true;
            break;
        case 'exit':
            modals.value.exit = true;
            break;
    }
};
</script>
