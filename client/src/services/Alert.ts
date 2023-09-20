export default class Alert {
    text: string = '';
    icon: string = '';
    color: string = '';
    display: boolean = false;

    // constructor() {
    //     this.text = '';
    //     this.icon = '';
    //     this.color = '';
    //     this.display = false;
    // }

    show(message: string = 'Sucesso', icon: string = 'mdi-alert-outlined', color: string = 'success') {
        console.log('Alert.show() message', message);

        this.display = true;
        this.text = message;
        this.icon = icon;
        this.color = color;
    }

    hide(): void {
        this.display = false;
        this.text = '';
        this.icon = '';
        this.color = '';
    }
}
