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
        firstSelect.append(option);

        option = document.createElement('option');
        option.textContent = languages[i];
        secondSelect.append(option);
    }

    let label = document.createElement('label');
    label.textContent = 'Choose first language';
    wrapper.append(label);
    wrapper.append(firstSelect);

    label = document.createElement('label');
    label.textContent = 'Choose second language';
    wrapper.append(label);
    wrapper.append(secondSelect);

    document.body.append(wrapper);
}

window.addEventListener('load', () => {
    const keyboard = new Keyboard(buttons);
    keyboard.create('body');
    const languages = Object.keys(languagesList);
    keyboard.changeLanguages('firstLang', languagesList.Belarusian);

    chooseLanguages(languages);
});
