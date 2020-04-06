import languagesList from '../model/languages';

export default class Keyboard {
    constructor(buttons, cols = 60, viewRow = 7, rowHeight = 30.5) {
        this.shiftL = false;
        this.shiftR = false;
        this.ctrlL = false;
        this.ctrlR = false;
        this.altL = false;
        this.altR = false;
        this.caps = false;
        this.ctrlAlt = false;
        this.scroll = 0;
        this.viewRow = viewRow - 1;
        this.inputFrame = [0, this.viewRow];
        this.cols = cols;
        this.rowHeight = rowHeight;
        this.lang = sessionStorage.getItem('lang') || 'firstLang';
        this.buttons = buttons;
        this.idBtns = Object.keys(this.buttons);
        this.select = -1;
        this.selectionSideLeft = false;
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
        input.setAttribute('cols', this.cols);
        input.setAttribute('wrap', 'hard');
        input.className = 'input';
        input.addEventListener('keydown', (e) => {
            e.preventDefault();
        }, false);

        const keyboard = document.createElement('div');
        keyboard.className = 'keyboard';
        keyboard.id = 'keyboard';

        for (let i = 0, len = this.idBtns.length; i < len; i += 1) {
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

        wrapper.append(input);
        wrapper.append(keyboard);
        document.getElementById(targetId).append(wrapper);
        document.getElementById('capsLock').classList.add('lamp');
        this.input = input;

        const firstLang = sessionStorage.getItem('firstLang') || false;
        if (firstLang && firstLang !== 'US') {
            this.changeLanguages('firstLang', languagesList[firstLang]);
        }
        const secondLang = sessionStorage.getItem('secondLang') || false;
        if (secondLang && secondLang !== 'Russian') {
            this.changeLanguages('secondLang', languagesList[secondLang]);
        }
        input.focus();
    }

    createEvent(targetId) {
        const keyboard = document.getElementById('keyboard');
        keyboard.addEventListener('mousedown', this.mouseDown.bind(this), false);
        keyboard.addEventListener('mouseup', this.mouseUp.bind(this), false);
        this.input.addEventListener('mouseup', this.mouseInputUp.bind(this), false);
        this.input.addEventListener('mousedown', this.setSelection.bind(this), false);

        document.getElementById(targetId).addEventListener('keydown', this.keyDown.bind(this), false);
        document.getElementById(targetId).addEventListener('keyup', this.keyUp.bind(this), false);
        window.addEventListener('blur', this.keyDefault.bind(this), false);
    }

    changeLanguages(order, language) {
        try {
            for (let i = 0, len = language.length; i < len; i += 1) {
                const [signDef, signCaps, signShift, signShiftCaps] = language[i];
                this.buttons[this.idBtns[i]].current = signDef;
                if (this.buttons[this.idBtns[i]][order]) {
                    if (language[i].length === 2) {
                        this.buttons[this.idBtns[i]][order].signDef = signDef;
                        this.buttons[this.idBtns[i]][order].signCaps = signCaps;
                        this.buttons[this.idBtns[i]][order].signShift = signCaps;
                        this.buttons[this.idBtns[i]][order].signShiftCaps = signDef;
                    } else if (language[i].length === 3) {
                        this.buttons[this.idBtns[i]][order].signDef = signDef;
                        this.buttons[this.idBtns[i]][order].signCaps = signCaps;
                        this.buttons[this.idBtns[i]][order].signShift = signShift;
                        this.buttons[this.idBtns[i]][order].signShiftCaps = signShift;
                    } else {
                        this.buttons[this.idBtns[i]][order].signDef = signDef;
                        this.buttons[this.idBtns[i]][order].signCaps = signCaps;
                        this.buttons[this.idBtns[i]][order].signShift = signShift;
                        this.buttons[this.idBtns[i]][order].signShiftCaps = signShiftCaps;
                    }
                }
            }
            this.redrawLetters();
        } catch (error) {
            this.error = error.message;
        }
    }

    writeLetter(current) {
        const select = this.input.selectionStart;
        let text = this.input.textContent;

        text = text.substring(0, select) + current + text.substring(select, text.length);
        this.input.innerHTML = text;
        if (current !== '    ') {
            this.input.selectionStart = select + 1;
            this.input.selectionEnd = select + 1;
        } else {
            this.input.selectionStart = select + 4;
            this.input.selectionEnd = select + 4;
        }

        const nextLetter = this.input.innerHTML[this.input.selectionStart];
        let rowsText;
        if (nextLetter === ' ' || nextLetter === '\n' || nextLetter === undefined) {
            rowsText = this.parseText();
        } else {
            rowsText = this.input.innerHTML.split('\n');
        }
        this.getRowHavingCursor(this.input.selectionStart, rowsText);
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
                this.buttonLeftShiftDown();
                break;
            case 'shiftRight':
                this.buttonRightShiftDown();
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
            case 'arrowLeft':
                this.buttonArrowLeft();
                break;
            case 'arrowRight':
                this.buttonArrowRight();
                break;
            case 'arrowDown':
                this.buttonArrowDown();
                break;
            case 'arrowUp':
                this.buttonArrowUp();
                break;
            default:
                break;
            }
        }
    }

    upKey(id) {
        switch (id) {
        case 'shiftLeft':
            this.buttonLeftShiftUp();
            break;
        case 'shiftRight':
            this.buttonRightShiftUp();
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
            if (e.code === 'KeyA' && (this.ctrlL || this.ctrlR)) {
                this.pushCtrlA();
            } else if (e.code === 'KeyC' && (this.ctrlL || this.ctrlR)) {
                this.pushCtrlC();
            } else if (e.code === 'KeyV' && (this.ctrlL || this.ctrlR)) {
                this.pushCtrlV();
            } else if (e.target.id !== 'capsLock') {
                this.pressKey(e.target.id);
            } else if (!this.buttons.capsLock.down) {
                this.buttons.capsLock.down = true;
                document.getElementById(e.target.id).classList.add('press');
                document.getElementById(e.target.id).classList.toggle('lampActive');
                this.pressKey(e.target.id);
            }
        }
    }

    mouseUp(e) {
        if (e.target.closest('div').className === 'keyboard') {
            this.buttons.capsLock.down = false;
            this.upKey(e.target.id);
        }
    }

    mouseInputUp() {
        if (this.input.selectionEnd !== this.input.selectionStart) {
            this.selectionSideLeft = (this.input.selectionDirection === 'backward');
        }
    }

    keyDown(e) {
        if (e.code === 'KeyA' && (this.ctrlL || this.ctrlR)) {
            this.pushCtrlA();
        } else if (e.code === 'KeyC' && (this.ctrlL || this.ctrlR)) {
            this.pushCtrlC();
        } else if (e.code === 'KeyV' && (this.ctrlL || this.ctrlR)) {
            this.pushCtrlV();
        } else {
            const id = e.code.substring(0, 1).toLowerCase() + e.code.substring(1, e.code.length);
            if (document.getElementById(id)) {
                if (id !== 'capsLock') {
                    document.getElementById(id).classList.add('press');
                    this.pressKey(id);
                } else if (!this.buttons.capsLock.down) {
                    this.buttons.capsLock.down = true;
                    document.getElementById(id).classList.add('press');
                    document.getElementById(id).classList.toggle('lampActive');
                    this.pressKey(id);
                }
            }
        }
        this.input.focus();
    }

    keyUp(e) {
        const id = e.code.substring(0, 1).toLowerCase() + e.code.substring(1, e.code.length);
        if (document.getElementById(id)) {
            this.buttons.capsLock.down = false;
            document.getElementById(id).classList.remove('press');
            if (!e.shiftKey) {
                document.getElementById('shiftLeft').classList.remove('press');
                document.getElementById('shiftRight').classList.remove('press');
                this.shiftR = false;
                this.shiftL = false;
            }
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
        const rowsText = this.parseText();
        this.getRowHavingCursor(this.input.selectionStart, rowsText);
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
        const rowsText = this.parseText();
        this.getRowHavingCursor(this.input.selectionStart, rowsText);
    }

    buttonLeftShiftDown() {
        this.rememberSelect();
        this.shiftL = true;
        if (!(this.shiftL && this.shiftR)) {
            this.redrawLetters();
        }
    }

    buttonRightShiftDown() {
        this.rememberSelect();
        this.shiftR = true;
        if (!(this.shiftL && this.shiftR)) {
            this.redrawLetters();
        }
    }

    buttonLeftShiftUp() {
        if (this.select > this.input.selectionStart) {
            this.selectionSideLeft = true;
        } else {
            this.selectionSideLeft = false;
        }
        this.select = -1;

        this.shiftL = false;
        if (!this.shiftR) {
            this.redrawLetters();
        }
    }

    buttonRightShiftUp() {
        if (this.select > this.input.selectionStart) {
            this.selectionSideLeft = true;
        } else {
            this.selectionSideLeft = false;
        }
        this.select = -1;

        this.shiftR = false;
        if (!this.shiftL) {
            this.redrawLetters();
        }
    }

    rememberSelect() {
        if (this.input.selectionStart === this.input.selectionEnd) {
            this.select = this.input.selectionStart;
        } else if (this.selectionSideLeft) {
            this.select = this.input.selectionEnd;
        } else {
            this.select = this.input.selectionStart;
        }
    }

    buttonCtrlDown(direction) {
        this.ctrlL = (direction === 'left') ? true : this.ctrlL;
        this.ctrlR = (direction === 'right') ? true : this.ctrlR;
        if ((this.altL || this.altR) && !this.ctrlAlt) {
            this.lang = (this.lang === 'firstLang') ? 'secondLang' : 'firstLang';
            sessionStorage.setItem('lang', this.lang);
            this.ctrlAlt = true;
            this.redrawLetters();
        }
    }

    buttonCtrlUp(direction) {
        this.ctrlL = (direction === 'left') ? false : this.ctrlL;
        this.ctrlR = (direction === 'right') ? false : this.ctrlR;
        if (!this.ctrlL && !this.ctrlR) {
            this.ctrlAlt = false;
        }
    }

    buttonAltDown(direction) {
        this.altL = (direction === 'left') ? true : this.altL;
        this.altR = (direction === 'right') ? true : this.altR;
        if ((this.ctrlL || this.ctrlR) && !this.ctrlAlt) {
            this.lang = (this.lang === 'firstLang') ? 'secondLang' : 'firstLang';
            sessionStorage.setItem('lang', this.lang);
            this.ctrlAlt = true;
            this.redrawLetters();
        }
    }

    buttonAltUp(direction) {
        this.altL = (direction === 'left') ? false : this.altL;
        this.altR = (direction === 'right') ? false : this.altR;
        if (!this.altL && !this.altR) {
            this.ctrlAlt = false;
        }
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

    buttonArrowLeft() {
        const rowsText = this.parseText();
        if (this.shiftL || this.shiftR) {
            if (this.select < this.input.selectionEnd) {
                if (this.input.selectionEnd > 0) {
                    this.input.selectionEnd -= 1;
                }
            } else if (this.input.selectionStart > 0) {
                this.input.selectionStart -= 1;
            }
        } else if (this.input.selectionEnd === this.input.selectionStart) {
            if (this.input.selectionStart > 0) {
                this.input.selectionStart -= 1;
                this.input.selectionEnd -= 1;
            }
        } else {
            this.input.selectionEnd = this.input.selectionStart;
        }

        this.getRowHavingCursor(this.input.selectionStart, rowsText);
    }

    buttonArrowRight() {
        const rowsText = this.parseText();
        if (this.shiftL || this.shiftR) {
            if (this.select > this.input.selectionStart) {
                this.input.selectionStart += 1;
            } else {
                this.input.selectionEnd += 1;
            }
        } else if (this.input.selectionEnd === this.input.selectionStart) {
            this.input.selectionEnd += 1;
            this.input.selectionStart += 1;
        } else {
            this.input.selectionStart = this.input.selectionEnd;
        }

        this.getRowHavingCursor(this.input.selectionStart, rowsText);
    }

    buttonArrowDown() {
        let select;
        if (this.select > this.input.selectionStart) {
            select = this.input.selectionStart;
        } else {
            select = this.input.selectionEnd;
        }

        const rowsText = this.parseText();
        const { row, marginLeftSelect } = this.getRowHavingCursor(select, rowsText, 'down');

        if (row < rowsText.length - 1) {
            if (marginLeftSelect >= rowsText[row + 1].length) {
                select += rowsText[row].length - marginLeftSelect + rowsText[row + 1].length;
            } else {
                select += rowsText[row].length + 1;
            }
        } else {
            select = this.input.innerHTML.length;
        }

        let overSelectionEnd;
        if (!this.shiftL && !this.shiftR) {
            if (this.input.selectionStart === this.input.selectionEnd) {
                this.input.selectionStart = select;
                this.input.selectionEnd = select;
            } else {
                this.input.selectionStart = this.input.selectionEnd;
            }
        } else if (this.select > this.input.selectionStart) {
            overSelectionEnd = this.input.selectionEnd;
            this.input.selectionStart = select;
        } else {
            this.input.selectionEnd = select;
        }
        if (this.input.selectionStart > overSelectionEnd) {
            this.input.selectionStart = overSelectionEnd;
        }
    }

    buttonArrowUp() {
        let select;
        if (this.select < this.input.selectionEnd) {
            select = this.input.selectionEnd;
        } else {
            select = this.input.selectionStart;
        }

        const rowsText = this.parseText();
        const { row, marginLeftSelect } = this.getRowHavingCursor(select, rowsText, 'up');

        if (row > 0) {
            if (marginLeftSelect >= rowsText[row - 1].length) {
                select -= marginLeftSelect + 2;
            } else {
                select -= rowsText[row - 1].length + 1;
            }
        } else {
            select = 0;
        }

        let overSelectionStart;
        if (!this.shiftL && !this.shiftR) {
            if (this.input.selectionStart === this.input.selectionEnd) {
                this.input.selectionStart = select;
                this.input.selectionEnd = select;
            } else {
                this.input.selectionEnd = this.input.selectionStart;
            }
        } else if (this.select < this.input.selectionEnd) {
            overSelectionStart = this.input.selectionStart;
            this.input.selectionEnd = select;
        } else {
            this.input.selectionStart = select;
        }
        if (overSelectionStart > this.input.selectionEnd) {
            this.input.selectionEnd = overSelectionStart;
        }
    }

    getRowHavingCursor(select, rowsText, direction) {
        let count = 0;
        let row = 0;
        let marginLeftSelect = 0;
        for (let i = 0, len = rowsText.length; i < len; i += 1) {
            count += rowsText[i].length + 1;
            if (select < count) {
                row = i;
                len = 0;
                marginLeftSelect = select - (count - rowsText[i].length);
            }
        }

        let nextRow = row;
        if (direction === 'up') nextRow = row - 1;
        if (direction === 'down') nextRow = row + 1;

        if (nextRow < this.inputFrame[0]) {
            this.inputFrame[0] -= 1;
            this.inputFrame[1] -= 1;
            this.scroll = (nextRow) * this.rowHeight;
            this.input.scrollTop = this.scroll;
        } if (nextRow > this.inputFrame[1]) {
            this.inputFrame[0] += 1;
            this.inputFrame[1] += 1;
            this.scroll = (nextRow - 6) * this.rowHeight;
            this.input.scrollTop = this.scroll;
        }
        this.input.scrollTop = this.scroll;

        return { row, marginLeftSelect };
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

    parseText() {
        const text = this.input.innerHTML;
        const rowsWithEnter = text.split('\n');
        const rowsText = [];
        const { cols } = this.input;

        for (let i = 0, len = rowsWithEnter.length; i < len; i += 1) {
            if (rowsWithEnter[i].length <= cols) {
                rowsText.push(rowsWithEnter[i]);
            } else {
                let word = '';
                let space = '';
                let row = '';
                let curIndexWord = 0;
                let curIndexSpace = 0;
                for (let j = 0, { length } = rowsWithEnter[i]; j < length; j += 1) {
                    if (rowsWithEnter[i].length <= cols) {
                        rowsText.push(rowsWithEnter[i]);
                        length = 0;
                    } else if (rowsWithEnter[i][j] !== ' ') {
                        word += rowsWithEnter[i][j];
                        curIndexWord += 1;

                        if (space !== '') {
                            row += space;
                            space = '';
                            curIndexSpace = 0;
                        }

                        if (curIndexWord > cols) {
                            rowsText.push(word.slice(0, cols));
                            rowsWithEnter[i] = rowsWithEnter[i].slice(cols);
                            length = rowsWithEnter[i].length;
                            j = -1;
                            word = '';
                            row = '';
                            curIndexWord = 0;
                        } if (row.length + curIndexWord > cols) {
                            rowsText.push(row);
                            rowsWithEnter[i] = rowsWithEnter[i].slice(row.length);
                            length = rowsWithEnter[i].length;
                            j = -1;
                            word = '';
                            row = '';
                            curIndexWord = 0;
                        }
                    } else {
                        curIndexSpace += 1;
                        space += ' ';
                        if (word !== '') {
                            row += word;
                            word = '';
                            curIndexWord = 0;
                        }

                        if (curIndexSpace > cols) {
                            rowsText.push(space.slice(0, cols));
                            rowsWithEnter[i] = rowsWithEnter[i].slice(cols).replace(/^\s+/g, '');
                            length = rowsWithEnter[i].length;
                            j = -1;
                            space = '';
                            row = '';
                            curIndexSpace = 0;
                        } if (row.length + curIndexSpace > cols) {
                            row += String(' ').repeat(cols - row.length);
                            rowsText.push(row);
                            rowsWithEnter[i] = rowsWithEnter[i].slice(cols).replace(/^\s+/g, '');
                            length = rowsWithEnter[i].length;
                            j = -1;
                            space = '';
                            row = '';
                            curIndexSpace = 0;
                        }
                    }
                }
            }
        }
        const start = this.input.selectionStart;
        const end = this.input.selectionEnd;
        this.input.innerHTML = rowsText.join('\n');
        this.input.selectionEnd = end - (text.length - this.input.innerHTML.length);
        this.input.selectionStart = start - (text.length - this.input.innerHTML.length);
        return rowsText;
    }

    pushCtrlA() {
        this.input.selectionStart = 0;
        this.input.selectionEnd = this.input.innerHTML.length;
        this.input.scrollTop = this.scroll;
    }

    pushCtrlC() {
        const buf = this.input.innerHTML.slice(this.input.selectionStart, this.input.selectionEnd);
        navigator.clipboard.writeText(buf);
        this.input.scrollTop = this.scroll;
    }

    pushCtrlV() {
        navigator.clipboard.readText()
            .then((buffer) => {
                const text = this.input.innerHTML;
                const start = this.input.selectionStart;
                const end = this.input.selectionEnd;
                this.bufferSelect = end - (end - start) + buffer.length;
                this.input.innerHTML = text.slice(0, start) + buffer + text.slice(end);
            })
            .finally(() => {
                this.input.focus();
                this.input.selectionEnd = this.bufferSelect;
                this.input.selectionStart = this.input.selectionEnd;
                this.input.scrollTop = this.scroll;
            })
            .catch((err) => {
                this.error = err.message;
            });
    }

    setSelection() {
        this.scroll = this.input.scrollTop;
        const rowScroll = Math.round(this.scroll / this.rowHeight);
        this.inputFrame[0] = rowScroll;
        this.inputFrame[1] = rowScroll + this.viewRow;
    }
}
