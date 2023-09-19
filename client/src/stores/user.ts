import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const userStore = defineStore('user', () => {
    const data = ref([]) as any;

    async function getUser() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`);

            console.log('userStore - response', response.data);

            data.value = response.data;

            return response.data;
        } catch (error) {
            console.error('userStore Error', error);
        }
    }

    return { data, getUser };
});
