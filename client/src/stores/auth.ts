import { ref } from "vue";
import { defineStore } from "pinia";

export const authStore = defineStore('auth', () => {
    const apiData = ref({});
    const token = ref<string>("");
    const isLoggedIn = ref<boolean>(false);

    function setApiData(data: object) {
        apiData.value = data;
    }

    function setToken(data: string) {
        token.value = data;
    }

    function setIsLoggedIn(data: boolean) {
        isLoggedIn.value = data;
    }

    function logout() {
        apiData.value = {};
        token.value = "";
        isLoggedIn.value = false;
    }

    return { apiData, token, isLoggedIn, setApiData, setToken, setIsLoggedIn, logout };
});