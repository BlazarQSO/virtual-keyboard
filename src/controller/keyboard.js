import keys from '../model/keys';

export default class Keyboard {
    constructor(value) {
        document.getElementById('id').innerHTML = keys.prop + value;
    }
}
