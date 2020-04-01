export default class Keyboard {
    constructor(buttons) {
        this.shift = false;
        this.caps = false;
        this.alt = false;
        this.ctrl = false;
        this.lang = sessionStorage.getItem('lang') || 'en';
        this.buttons = buttons;
        this.idBtns = Object.keys(this.buttons);
    }

    create(targetId) {
        this.createKeyboard(targetId);
        this.createEvent();
    }

    createKeyboard(targetId) {
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper';

        const input = document.createElement('textarea');

        input.setAttribute('id', 'input');
        input.className = 'input';
        input.addEventListener('keydown', (e) => {
            e.preventDefault();
        }, false);

        const keyboard = document.createElement('div');
        keyboard.className = 'keyboard';

        for (let i = 0; i < this.idBtns.length; i += 1) {
            const btn = document.createElement('button');
            btn.setAttribute('type', 'button');
            btn.className = 'button';
            btn.id = this.idBtns[i];

            if (this.lang === 'ru' && !this.buttons[this.idBtns[i]].service) {
                this.buttons[this.idBtns[i]].current = this.buttons[this.idBtns[i]].ru.signDef;
            }
            btn.innerHTML = this.buttons[this.idBtns[i]].current;
            keyboard.append(btn);
        }

        const info = document.createElement('p');
        info.className = 'info';
        info.innerHTML = 'OS: Window 10, change language: Ctrl + Alt';

        wrapper.append(input);
        wrapper.append(keyboard);
        wrapper.append(info);
        document.getElementById(targetId).append(wrapper);

        input.focus();
        this.input = input;
    }

    createEvent() {
        this.cap = 'ok';
    }
}
