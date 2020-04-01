import './style/style.css';
import buttons from './model/buttons';
import Keyboard from './controller/keyboard';

window.addEventListener('load', () => {
    const keyboard = new Keyboard(buttons);
    document.getElementById('id').innerHTML += keyboard.toString();
});
