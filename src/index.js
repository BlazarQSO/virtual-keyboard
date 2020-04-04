import './style/style.css';
import buttons from './model/buttons';
import languagesList from './model/languages';
import Keyboard from './controller/keyboard';

function chooseLanguages(languages) {
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapperLanguages';
    const firstSelect = document.createElement('select');
    firstSelect.setAttribute('id', 'firstLang');
    firstSelect.className = 'chooseLanguages';

    const secondSelect = document.createElement('select');
    secondSelect.setAttribute('id', 'secondLang');
    secondSelect.className = 'chooseLanguages';

    for (let i = 0, len = languages.length; i < len; i += 1) {
        let option = document.createElement('option');
        option.textContent = languages[i];
        if (languages[i] === 'US') option.selected = true;
        firstSelect.append(option);

        option = document.createElement('option');
        option.textContent = languages[i];
        if (languages[i] === 'Russian') option.selected = true;
        secondSelect.append(option);
    }

    let label = document.createElement('label');
    label.textContent = 'Choose first language';
    wrapper.append(label);
    wrapper.append(firstSelect);

    label = document.createElement('label');
    label.textContent = 'Choose second language';

    const info = document.createElement('p');
    info.className = 'info';
    info.innerHTML = 'OS: Window 10, change language: Ctrl + Alt';

    wrapper.append(label);
    wrapper.append(secondSelect);
    wrapper.append(info);
    document.body.append(wrapper);
}

window.addEventListener('load', () => {
    const keyboard = new Keyboard(buttons);
    keyboard.create('body');
    const languages = Object.keys(languagesList);
    chooseLanguages(languages);

    document.getElementById('firstLang').addEventListener('change', () => {
        const lang = document.getElementById('firstLang').value;
        keyboard.changeLanguages('firstLang', languagesList[lang]);
    }, false);

    document.getElementById('secondLang').addEventListener('change', () => {
        const lang = document.getElementById('secondLang').value;
        keyboard.changeLanguages('secondLang', languagesList[lang]);
    }, false);
});
