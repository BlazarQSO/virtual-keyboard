export default class Keyboard {
    constructor(buttons) {
        this.shiftL = false;
        this.shiftR = false;
        this.ctrlL = false;
        this.ctrlR = false;
        this.altL = false;
        this.altR = false;
        this.caps = false;
        this.lang = sessionStorage.getItem('lang') || 'firstLang';
        this.buttons = buttons;
        this.idBtns = Object.keys(this.buttons);
    }

    create(targetId) {
        this.createKeyboard(targetId);
        this.createEvent(targetId);
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
        keyboard.id = 'keyboard';

        for (let i = 0; i < this.idBtns.length; i += 1) {
            const btn = document.createElement('button');
            btn.setAttribute('type', 'button');
            btn.className = 'button';
            btn.id = this.idBtns[i];
            btn.classList.add(this.idBtns[i]);

            if (this.lang === 'secondLang' && !this.buttons[this.idBtns[i]].service) {
                const letter = this.buttons[this.idBtns[i]].secondLang.signDef;
                this.buttons[this.idBtns[i]].current = letter;
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

    createEvent(targetId) {
        const keyboard = document.getElementById('keyboard');
        keyboard.addEventListener('mousedown', this.mouseDown.bind(this), false);
        keyboard.addEventListener('mouseup', this.mouseUp.bind(this), false);

        document.getElementById(targetId).addEventListener('keydown', this.keyDown.bind(this), false);
        document.getElementById(targetId).addEventListener('keyup', this.keyUp.bind(this), false);
        window.addEventListener('blur', this.keyDefault.bind(this), false);
    }

    writeLetter(current) {
        const select = this.input.selectionStart;
        let text = this.input.textContent;
        text = text.substring(0, select) + current + text.substring(select, text.length);
        this.input.innerHTML = text;
        this.input.selectionStart = select + 1;
        this.input.selectionEnd = select + 1;
    }

    pressKey(id) {
        if (!this.buttons[id].service) {
            this.writeLetter(this.buttons[id].current);
        } else if (this.buttons[id].write) {
            this.writeLetter(this.buttons[id].write);
        } else {
            switch (id) {
            case 'delete':
                this.buttonDelete();
                break;
            case 'backspace':
                this.buttonBackspace();
                break;
            case 'shiftLeft':
                this.buttonShiftDown('left');
                break;
            case 'shiftRight':
                this.buttonShiftDown('right');
                break;
            case 'controlLeft':
                this.buttonCtrlDown('left');
                break;
            case 'controlRight':
                this.buttonCtrlDown('right');
                break;
            case 'altLeft':
                this.buttonAltDown('left');
                break;
            case 'altRight':
                this.buttonAltDown('right');
                break;
            case 'capsLock':
                this.buttonCapsDown();
                break;
            default:
                break;
            }
        }
    }

    upKey(id) {
        switch (id) {
        case 'shiftLeft':
            this.buttonShiftUp('left');
            break;
        case 'shiftRight':
            this.buttonShiftUp('right');
            break;
        case 'controlLeft':
            this.buttonCtrlUp('left');
            break;
        case 'controlRight':
            this.buttonCtrlUp('right');
            break;
        case 'altLeft':
            this.buttonAltUp('left');
            break;
        case 'altRight':
            this.buttonAltUp('right');
            break;
        case 'capsLock':
            this.buttonCapsUp();
            break;
        default:
            break;
        }
        this.input.focus();
    }

    mouseDown(e) {
        if (e.target.closest('div').className === 'keyboard' && e.target.id !== 'keyboard') {
            this.pressKey(e.target.id);
        }
    }

    mouseUp(e) {
        if (e.target.closest('div').className === 'keyboard') {
            this.upKey(e.target.id);
        }
    }

    keyDown(e) {
        const id = e.code.substring(0, 1).toLowerCase() + e.code.substring(1, e.code.length);
        if (document.getElementById(id)) {
            if (id !== 'capsLock') {
                document.getElementById(id).classList.add('press');
                this.pressKey(id);
            } else if (!this.buttons.capsLock.down) {
                this.buttons.capsLock.down = true;
                document.getElementById(id).classList.add('press');
                this.pressKey(id);
            }
        }
        this.input.focus();
    }

    keyUp(e) {
        const id = e.code.substring(0, 1).toLowerCase() + e.code.substring(1, e.code.length);
        if (document.getElementById(id)) {
            this.buttons.capsLock.down = false;
            document.getElementById(id).classList.remove('press');
            this.upKey(id);
        }
    }

    keyDefault() {
        for (let i = 0, len = this.idBtns.length; i < len; i += 1) {
            document.getElementById(this.idBtns[i]).classList.remove('press');
        }
    }

    buttonDelete() {
        const select = this.input.selectionStart;
        const selectEnd = this.input.selectionEnd;
        let text = this.input.textContent;
        if (select === selectEnd) {
            text = text.substring(0, select) + text.substring(select + 1, text.length);
        } else {
            text = text.substring(0, select) + text.substring(selectEnd, text.length);
        }
        this.input.innerHTML = text;
        this.input.selectionStart = select;
        this.input.selectionEnd = select;
    }

    buttonBackspace() {
        const select = this.input.selectionStart;
        let text = this.input.textContent;
        const selectEnd = this.input.selectionEnd;

        if (select === selectEnd) {
            text = text.substring(0, select - 1) + text.substring(select, text.length);
            this.input.innerHTML = text;
            this.input.selectionStart = select - 1;
            this.input.selectionEnd = select - 1;
        } else {
            text = text.substring(0, select) + text.substring(selectEnd, text.length);
            this.input.innerHTML = text;
            this.input.selectionStart = select;
            this.input.selectionEnd = select;
        }
    }

    buttonShiftDown(direction) {
        this.shiftL = (direction === 'left') ? true : this.shiftL;
        this.shiftR = (direction === 'right') ? true : this.shiftR;
        this.redrawLetters();
    }

    buttonShiftUp(direction) {
        this.shiftL = (direction === 'left') ? false : this.shiftL;
        this.shiftR = (direction === 'right') ? false : this.shiftR;
        if (this.shiftL) document.getElementById('shiftLeft').classList.remove('press');
        if (this.shiftR) document.getElementById('shiftRight').classList.remove('press');
        this.redrawLetters();
    }

    buttonCtrlDown(direction) {
        this.ctrlL = (direction === 'left') ? true : this.ctrlL;
        this.ctrlR = (direction === 'right') ? true : this.ctrlR;
        if (this.altL || this.altR) {
            this.lang = (this.lang === 'firstLang') ? 'secondLang' : 'firstLang';
            sessionStorage.setItem('lang', this.lang);
            this.redrawLetters();
        }
    }

    buttonCtrlUp(direction) {
        this.ctrlL = (direction === 'left') ? false : this.ctrlL;
        this.ctrlR = (direction === 'right') ? false : this.ctrlR;
    }

    buttonAltDown(direction) {
        this.altL = (direction === 'left') ? true : this.altL;
        this.altR = (direction === 'right') ? true : this.altR;
        if (this.ctrlL || this.ctrlR) {
            this.lang = (this.lang === 'firstLang') ? 'secondLang' : 'firstLang';
            sessionStorage.setItem('lang', this.lang);
            this.redrawLetters();
        }
    }

    buttonAltUp(direction) {
        this.altL = (direction === 'left') ? false : this.altL;
        this.altR = (direction === 'right') ? false : this.altR;
    }

    buttonCapsDown() {
        if (!this.buttons.capsLock.down) {
            document.getElementById('capsLock').classList.add('press');
        }
        this.caps = !this.caps;
        this.redrawLetters();
    }

    buttonCapsUp() {
        if (!this.buttons.capsLock.down) {
            document.getElementById('capsLock').classList.remove('press');
        }
    }

    redrawLetters() {
        for (let key = 0, len = this.idBtns.length; key < len; key += 1) {
            if (!this.buttons[this.idBtns[key]].service) {
                if (this.lang === 'firstLang') {
                    this.changeLetter(key, 'firstLang');
                } else {
                    this.changeLetter(key, 'secondLang');
                }
            }
        }
    }

    changeLetter(key, lang) {
        let letter;
        if ((this.shiftL || this.shiftR) && this.caps) {
            letter = this.buttons[this.idBtns[key]][lang].signShiftCaps;
            document.getElementById(this.idBtns[key]).innerHTML = letter;
            this.buttons[this.idBtns[key]].current = letter;
        } else if (this.caps) {
            letter = this.buttons[this.idBtns[key]][lang].signCaps;
            document.getElementById(this.idBtns[key]).innerHTML = letter;
            this.buttons[this.idBtns[key]].current = letter;
        } else if (this.shiftL || this.shiftR) {
            letter = this.buttons[this.idBtns[key]][lang].signShift;
            document.getElementById(this.idBtns[key]).innerHTML = letter;
            this.buttons[this.idBtns[key]].current = letter;
        } else {
            letter = this.buttons[this.idBtns[key]][lang].signDef;
            document.getElementById(this.idBtns[key]).innerHTML = letter;
            this.buttons[this.idBtns[key]].current = letter;
        }
    }
}
