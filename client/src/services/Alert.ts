import { ref } from 'vue';

export default class Alert {
    message = ref('');
    color = ref('success');

    public static show(message: string): void {
        alert(message);
    }
}

export const alerts  =  ref('');
