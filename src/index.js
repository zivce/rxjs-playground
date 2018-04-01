//in game objects
import Enemy from './in_game_objects/Enemy';
import Player from './in_game_objects/Player';

import Rx from 'rxjs';
import {interval} from 'rxjs/observable/interval';

//styles
import styles from './styles/styles.css';

//container div
let wrapper = document.createElement("div");
wrapper.className="container";
document.body.appendChild(wrapper);


//consts
let window_height = window.innerHeight - 50;

let Enemies = [];

//generating enemies
Rx.Observable.interval(1000)
    .subscribe(function(){
        Enemies.push(new Enemy(wrapper));
        Enemies[Enemies.length-1].startMoving(500);
        
        Enemies = Enemies.filter((enemy)=>{
            let len = enemy.dom_element.style.top.length;
            let top_offset = enemy.dom_element.style.top.slice(0,len-2); 
            let in_game_enemy = top_offset < window_height;    
            return in_game_enemy;
        })
        console.log(Enemies); 
    })


//player has joined the game
let player = new Player(wrapper);
