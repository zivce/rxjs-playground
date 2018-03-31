import Enemy from './in_game_objects/Enemy';
import styles from './styles/styles.css';

//container div


let wrapper = document.createElement("div");
document.body.appendChild(wrapper);


//generating enemies
let en = new Enemy(wrapper);

en.startMoving(500);