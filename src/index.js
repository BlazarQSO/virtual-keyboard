import './style/style.css';
import Keyboard from './controller/keyboard';

window.addEventListener('load', () => {
    const keyboard = new Keyboard('ok');
    document.getElementById('id').innerHTML += keyboard.toString();
});
