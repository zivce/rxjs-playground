//in game objects
import Enemy from './in_game_objects/Enemy';
import Player from './in_game_objects/Player';

//styles
import styles from './styles/styles.css';

//container div
let wrapper = document.createElement("div");
wrapper.className="container";
document.body.appendChild(wrapper);



//generating enemies
let en = new Enemy(wrapper);

en.startMoving(500);

let en1 = new Enemy(wrapper);

en1.startMoving(500);

//player has joined the game
let player = new Player(wrapper);
