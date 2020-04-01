const buttons = {

    // #region Row №1.

    backquote: {
        service: false,
        current: '`',
        en: {
            signDef: '`',
            signCaps: '`',
            signShift: '~',
            signShiftCaps: '~',
        },
        ru: {
            signDef: 'ё',
            signCaps: 'Ё',
            signShift: 'Ё',
            signShiftCaps: 'ё',
        },
    },
    digit1: {
        service: false,
        current: '1',
        en: {
            signDef: '1',
            signCaps: '1',
            signShift: '!',
            signShiftCaps: '!',
        },
        ru: {
            signDef: '1',
            signCaps: '1',
            signShift: '!',
            signShiftCaps: '!',
        },
    },
    digit2: {
        service: false,
        current: '2',
        en: {
            signDef: '2',
            signCaps: '2',
            signShift: '@',
            signShiftCaps: '@',
        },
        ru: {
            signDef: '2',
            signCaps: '2',
            signShift: '&quot;',
            signShiftCaps: '&quot;',
        },
    },
    digit3: {
        service: false,
        current: '3',
        en: {
            signDef: '3',
            signCaps: '3',
            signShift: '#',
            signShiftCaps: '#',
        },
        ru: {
            signDef: '3',
            signCaps: '3',
            signShift: '№',
            signShiftCaps: '№',
        },
    },
    digit4: {
        service: false,
        current: '4',
        en: {
            signDef: '4',
            signCaps: '4',
            signShift: '$',
            signShiftCaps: '$',
        },
        ru: {
            signDef: '4',
            signCaps: '4',
            signShift: ';',
            signShiftCaps: ';',
        },
    },
    digit5: {
        service: false,
        current: '5',
        en: {
            signDef: '5',
            signCaps: '5',
            signShift: '%',
            signShiftCaps: '%',
        },
        ru: {
            signDef: '5',
            signCaps: '5',
            signShift: '%',
            signShiftCaps: '%',
        },
    },
    digit6: {
        service: false,
        current: '6',
        en: {
            signDef: '6',
            signCaps: '6',
            signShift: '^',
            signShiftCaps: '^',
        },
        ru: {
            signDef: '6',
            signCaps: '6',
            signShift: ':',
            signShiftCaps: ':',
        },
    },
    digit7: {
        service: false,
        current: '7',
        en: {
            signDef: '7',
            signCaps: '7',
            signShift: '&',
            signShiftCaps: '&',
        },
        ru: {
            signDef: '7',
            signCaps: '7',
            signShift: '?',
            signShiftCaps: '?',
        },
    },
    digit8: {
        service: false,
        current: '8',
        en: {
            signDef: '8',
            signCaps: '8',
            signShift: '*',
            signShiftCaps: '*',
        },
        ru: {
            signDef: '8',
            signCaps: '8',
            signShift: '*',
            signShiftCaps: '*',
        },
    },
    digit9: {
        service: false,
        current: '9',
        en: {
            signDef: '9',
            signCaps: '9',
            signShift: '(',
            signShiftCaps: '(',
        },
        ru: {
            signDef: '9',
            signCaps: '9',
            signShift: '(',
            signShiftCaps: '(',
        },
    },
    digit0: {
        service: false,
        current: '0',
        en: {
            signDef: '0',
            signCaps: '0',
            signShift: ')',
            signShiftCaps: ')',
        },
        ru: {
            signDef: '0',
            signCaps: '0',
            signShift: ')',
            signShiftCaps: ')',
        },
    },
    minus: {
        service: false,
        current: '-',
        en: {
            signDef: '-',
            signCaps: '-',
            signShift: '_',
            signShiftCaps: '_',
        },
        ru: {
            signDef: '-',
            signCaps: '-',
            signShift: '_',
            signShiftCaps: '_',
        },
    },
    equal: {
        service: false,
        current: '=',
        en: {
            signDef: '=',
            signCaps: '=',
            signShift: '+',
            signShiftCaps: '+',
        },
        ru: {
            signDef: '=',
            signCaps: '=',
            signShift: '+',
            signShiftCaps: '+',
        },
    },
    backspace: {
        service: true,
        current: 'BackSpace',

        onClickHandler() {
            return () => {
                const input = document.getElementById('input');
                const select = input.selectionStart;
                let text = input.textContent;
                const selectEnd = input.selectionEnd;

                if (select === selectEnd) {
                    text = text.substring(0, select - 1) + text.substring(select, text.length);
                    input.innerHTML = text;
                    input.selectionStart = select - 1;
                    input.selectionEnd = select - 1;
                } else {
                    text = text.substring(0, select) + text.substring(selectEnd, text.length);
                    input.innerHTML = text;
                    input.selectionStart = select;
                    input.selectionEnd = select;
                }

                input.focus();
            };
        },
    },

    // #endregion

    // #region Row №2.

    tab: {
        service: true,
        current: 'Tab',
    },
    keyQ: {
        title: 'KeyQ',
        value: 81,
        service: false,
        current: 'q',
        en: {
            signDef: 'q',
            signCaps: 'Q',
            signShift: 'Q',
            signShiftCaps: 'q',
        },
        ru: {
            signDef: 'й',
            signCaps: 'Й',
            signShift: 'Й',
            signShiftCaps: 'й',
        },
    },
    keyW: {
        service: false,
        current: 'w',
        en: {
            signDef: 'w',
            signCaps: 'W',
            signShift: 'W',
            signShiftCaps: 'w',
        },
        ru: {
            signDef: 'ц',
            signCaps: 'Ц',
            signShift: 'Ц',
            signShiftCaps: 'ц',
        },
    },
    keyE: {
        service: false,
        current: 'e',
        en: {
            signDef: 'e',
            signCaps: 'E',
            signShift: 'E',
            signShiftCaps: 'e',
        },
        ru: {
            signDef: 'у',
            signCaps: 'У',
            signShift: 'У',
            signShiftCaps: 'у',
        },
    },
    keyR: {
        service: false,
        current: 'r',
        en: {
            signDef: 'r',
            signCaps: 'R',
            signShift: 'R',
            signShiftCaps: 'r',
        },
        ru: {
            signDef: 'к',
            signCaps: 'К',
            signShift: 'К',
            signShiftCaps: 'к',
        },
    },
    keyT: {
        service: false,
        current: 't',
        en: {
            signDef: 't',
            signCaps: 'T',
            signShift: 'T',
            signShiftCaps: 't',
        },
        ru: {
            signDef: 'е',
            signCaps: 'Е',
            signShift: 'Е',
            signShiftCaps: 'е',
        },
    },
    keyY: {
        service: false,
        current: 'y',
        en: {
            signDef: 'y',
            signCaps: 'Y',
            signShift: 'Y',
            signShiftCaps: 'y',
        },
        ru: {
            signDef: 'н',
            signCaps: 'Н',
            signShift: 'Н',
            signShiftCaps: 'н',
        },
    },
    keyU: {
        service: false,
        current: 'u',
        en: {
            signDef: 'u',
            signCaps: 'U',
            signShift: 'U',
            signShiftCaps: 'u',
        },
        ru: {
            signDef: 'г',
            signCaps: 'Г',
            signShift: 'Г',
            signShiftCaps: 'г',
        },
    },
    keyI: {
        service: false,
        current: 'i',
        en: {
            signDef: 'i',
            signCaps: 'I',
            signShift: 'I',
            signShiftCaps: 'i',
        },
        ru: {
            signDef: 'ш',
            signCaps: 'Ш',
            signShift: 'Ш',
            signShiftCaps: 'ш',
        },
    },
    keyO: {
        service: false,
        current: 'o',
        en: {
            signDef: 'o',
            signCaps: 'O',
            signShift: 'O',
            signShiftCaps: 'o',
        },
        ru: {
            signDef: 'щ',
            signCaps: 'Щ',
            signShift: 'Щ',
            signShiftCaps: 'щ',
        },
    },
    keyP: {
        service: false,
        current: 'p',
        en: {
            signDef: 'p',
            signCaps: 'P',
            signShift: 'P',
            signShiftCaps: 'p',
        },
        ru: {
            signDef: 'з',
            signCaps: 'З',
            signShift: 'З',
            signShiftCaps: 'з',
        },
    },
    bracketLeft: {
        service: false,
        current: '[',
        en: {
            signDef: '[',
            signCaps: '[',
            signShift: '{',
            signShiftCaps: '{',
        },
        ru: {
            signDef: 'х',
            signCaps: 'Х',
            signShift: 'Х',
            signShiftCaps: 'х',
        },
    },
    bracketRight: {
        service: false,
        current: ']',
        en: {
            signDef: ']',
            signCaps: ']',
            signShift: '}',
            signShiftCaps: '}',
        },
        ru: {
            signDef: 'ъ',
            signCaps: 'Ъ',
            signShift: 'Ъ',
            signShiftCaps: 'ъ',
        },
    },
    backslash: {
        service: false,
        current: '\\',
        en: {
            signDef: '\\',
            signCaps: '\\',
            signShift: '|',
            signShiftCaps: '|',
        },
        ru: {
            signDef: '\\',
            signCaps: '\\',
            signShift: '/',
            signShiftCaps: '/',
        },
    },

    // #endregion

    // #region Row №3.

    capsLock: {
        title: 'capsLock',
        service: true,
        current: 'CapsLock',
        down: false,
    },
    keyA: {
        service: false,
        current: 'a',
        en: {
            signDef: 'a',
            signCaps: 'A',
            signShift: 'A',
            signShiftCaps: 'a',
        },
        ru: {
            signDef: 'ф',
            signCaps: 'Ф',
            signShift: 'Ф',
            signShiftCaps: 'ф',
        },
    },
    keyS: {
        service: false,
        current: 's',
        en: {
            signDef: 's',
            signCaps: 'S',
            signShift: 'S',
            signShiftCaps: 's',
        },
        ru: {
            signDef: 'ы',
            signCaps: 'Ы',
            signShift: 'Ы',
            signShiftCaps: 'ы',
        },
    },
    keyD: {
        service: false,
        current: 'd',
        en: {
            signDef: 'd',
            signCaps: 'D',
            signShift: 'D',
            signShiftCaps: 'd',
        },
        ru: {
            signDef: 'в',
            signCaps: 'В',
            signShift: 'В',
            signShiftCaps: 'в',
        },
    },
    keyF: {
        service: false,
        current: 'f',
        en: {
            signDef: 'f',
            signCaps: 'F',
            signShift: 'F',
            signShiftCaps: 'f',
        },
        ru: {
            signDef: 'а',
            signCaps: 'А',
            signShift: 'А',
            signShiftCaps: 'а',
        },
    },
    keyG: {
        service: false,
        current: 'g',
        en: {
            signDef: 'g',
            signCaps: 'G',
            signShift: 'G',
            signShiftCaps: 'g',
        },
        ru: {
            signDef: 'п',
            signCaps: 'П',
            signShift: 'П',
            signShiftCaps: 'п',
        },
    },
    keyH: {
        service: false,
        current: 'h',
        en: {
            signDef: 'h',
            signCaps: 'H',
            signShift: 'H',
            signShiftCaps: 'h',
        },
        ru: {
            signDef: 'р',
            signCaps: 'Р',
            signShift: 'Р',
            signShiftCaps: 'р',
        },
    },
    keyJ: {
        service: false,
        current: 'j',
        en: {
            signDef: 'j',
            signCaps: 'J',
            signShift: 'J',
            signShiftCaps: 'j',
        },
        ru: {
            signDef: 'о',
            signCaps: 'О',
            signShift: 'О',
            signShiftCaps: 'о',
        },
    },
    keyK: {
        service: false,
        current: 'k',
        en: {
            signDef: 'k',
            signCaps: 'K',
            signShift: 'K',
            signShiftCaps: 'k',
        },
        ru: {
            signDef: 'л',
            signCaps: 'Л',
            signShift: 'Л',
            signShiftCaps: 'л',
        },
    },
    keyL: {
        service: false,
        current: 'l',
        en: {
            signDef: 'l',
            signCaps: 'L',
            signShift: 'L',
            signShiftCaps: 'l',
        },
        ru: {
            signDef: 'д',
            signCaps: 'Д',
            signShift: 'Д',
            signShiftCaps: 'д',
        },
    },
    semicolon: {
        service: false,
        current: ';',
        en: {
            signDef: ';',
            signCaps: ';',
            signShift: ':',
            signShiftCaps: ':',
        },
        ru: {
            signDef: 'ж',
            signCaps: 'Ж',
            signShift: 'Ж',
            signShiftCaps: 'ж',
        },
    },
    quote: {
        service: false,
        current: "'",
        en: {
            signDef: "'",
            signCaps: "'",
            signShift: '&quot;',
            signShiftCaps: '&quot;',
        },
        ru: {
            signDef: 'э',
            signCaps: 'Э',
            signShift: 'Э',
            signShiftCaps: 'э',
        },
    },
    enter: {
        service: true,
        current: 'Enter',
    },

    // #endregion

    // #region Row №4.

    shiftLeft: {
        service: true,
        current: 'Shift',
    },
    keyZ: {
        service: false,
        current: 'z',
        en: {
            signDef: 'z',
            signCaps: 'Z',
            signShift: 'Z',
            signShiftCaps: 'z',
        },
        ru: {
            signDef: 'я',
            signCaps: 'Я',
            signShift: 'Я',
            signShiftCaps: 'я',
        },
    },
    keyX: {
        service: false,
        current: 'x',
        en: {
            signDef: 'x',
            signCaps: 'X',
            signShift: 'X',
            signShiftCaps: 'x',
        },
        ru: {
            signDef: 'ч',
            signCaps: 'Ч',
            signShift: 'Ч',
            signShiftCaps: 'ч',
        },
    },
    keyC: {
        service: false,
        current: 'c',
        en: {
            signDef: 'c',
            signCaps: 'C',
            signShift: 'C',
            signShiftCaps: 'c',
        },
        ru: {
            signDef: 'с',
            signCaps: 'С',
            signShift: 'С',
            signShiftCaps: 'с',
        },
    },
    keyV: {
        service: false,
        current: 'v',
        en: {
            signDef: 'v',
            signCaps: 'V',
            signShift: 'V',
            signShiftCaps: 'v',
        },
        ru: {
            signDef: 'м',
            signCaps: 'М',
            signShift: 'М',
            signShiftCaps: 'м',
        },
    },
    keyB: {
        service: false,
        current: 'b',
        en: {
            signDef: 'b',
            signCaps: 'B',
            signShift: 'B',
            signShiftCaps: 'b',
        },
        ru: {
            signDef: 'и',
            signCaps: 'И',
            signShift: 'И',
            signShiftCaps: 'и',
        },
    },
    keyN: {
        service: false,
        current: 'n',
        en: {
            signDef: 'n',
            signCaps: 'N',
            signShift: 'N',
            signShiftCaps: 'n',
        },
        ru: {
            signDef: 'т',
            signCaps: 'Т',
            signShift: 'Т',
            signShiftCaps: 'т',
        },
    },
    keyM: {
        service: false,
        current: 'm',
        en: {
            signDef: 'm',
            signCaps: 'M',
            signShift: 'M',
            signShiftCaps: 'm',
        },
        ru: {
            signDef: 'ь',
            signCaps: 'Ь',
            signShift: 'Ь',
            signShiftCaps: 'ь',
        },
    },
    comma: {
        service: false,
        current: ',',
        en: {
            signDef: ',',
            signCaps: ',',
            signShift: '<',
            signShiftCaps: '<',
        },
        ru: {
            signDef: 'б',
            signCaps: 'Б',
            signShift: 'Б',
            signShiftCaps: 'б',
        },
    },
    period: {
        service: false,
        current: '.',
        en: {
            signDef: '.',
            signCaps: '.',
            signShift: '>',
            signShiftCaps: '>',
        },
        ru: {
            signDef: 'ю',
            signCaps: 'Ю',
            signShift: 'Ю',
            signShiftCaps: 'ю',
        },
    },
    slash: {
        service: false,
        current: '/',
        en: {
            signDef: '/',
            signCaps: '/',
            signShift: '?',
            signShiftCaps: '?',
        },
        ru: {
            signDef: '.',
            signCaps: '.',
            signShift: ',',
            signShiftCaps: ',',
        },
    },
    arrowUp: {
        service: true,
        obj: this,
        current: '&uarr;',
    },
    shiftRight: {
        service: true,
        current: 'Shift',
    },

    // #endregion

    // #region Row №5.

    controlLeft: {
        service: true,
        func: this.changeSigns,
        obj: this,
        current: 'Ctrl',
    },
    altLeft: {
        service: true,
        current: 'Alt',
        func: this.changeSigns,
        obj: this,
    },
    space: {
        service: true,
        current: 'Space',
    },
    altRight: {
        service: true,
        func: this.changeSigns,
        obj: this,
        current: 'Alt',
    },
    controlRight: {
        service: true,
        func: this.changeSigns,
        obj: this,
        current: 'Ctrl',
    },
    arrowLeft: {
        service: true,
        obj: this,
        current: '&larr;',
    },
    arrowDown: {
        service: true,
        obj: this,
        current: '&darr;',
    },
    arrowRight: {
        service: true,
        obj: this,
        current: '&rarr;',
    },
    delete: {
        service: true,
        current: 'Del',
    },

    // #endregion

};

export default buttons;
