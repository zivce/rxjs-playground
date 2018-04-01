//in game objects
import Enemy from './in_game_objects/Enemy';
import Player from './in_game_objects/Player';

import Rx from 'rxjs';
import {interval} from 'rxjs/observable/interval';
import fromPixelsToInt from './utils/fromPixelsToInt';

//styles
import styles from './styles/styles.css';

//container div
let wrapper = document.createElement("div");
wrapper.className="container";
document.body.appendChild(wrapper);

let DIFFICULTY = 20;

//consts    
let window_height = window.innerHeight - 50;

let Enemies = [];
let I = 0 ;
//generating enemies
Rx.Observable.interval(1000)
    .subscribe(function(){
        Enemies.push(new Enemy(wrapper));
        Enemies[Enemies.length-1].startMoving(300);
        I++
        if(I === DIFFICULTY)
            this.unsubscribe();

    },
    (err)=>{
        console.log(err)
    })
   

//player has joined the game
let player = new Player(wrapper);



//shots hit the target  
Rx.Observable.interval(1).subscribe(function(){
    
    player.bullets.forEach(function(bullet){
        Enemies.forEach(function(enemy){

            //if killed remove from array and continue
            
            if(enemy.health_points === 0)
            {
                let remove_enemy_index = Enemies.indexOf(enemy);
                Enemies.splice(remove_enemy_index,1);
                enemy.dom_element.parentNode.removeChild(enemy.dom_element);
                return;
            }
            

            let enemy_rect = enemy.dom_element.getBoundingClientRect();
            
            // console.log(enemy_rect);

            let bullet_rect = bullet.getBoundingClientRect();


            let x_match = ( Math.abs(bullet_rect.x - enemy_rect.x)) < 50;

            // let x_match_1 = ( Math.abs(enemy_rect.x - bullet_rect.x)) < 50;
            
            let y_match = enemy_rect.y ===
            bullet_rect.y;
            
            let bullet_hit_enemy = y_match && x_match ;
            // if(y_match)
            // console.log(" y koordinata ",y_match);
            // if(x_match)
            // console.log("x koordinata", x_match);
            // NANESI STETU
            if(bullet_hit_enemy)
            {
                console.log("bullet hit!");

                const parent = bullet.parentNode;

                if(parent != null)
                    parent.removeChild(bullet);

                enemy.health_points-=10;
                //console.log(enemy.health_points);
                
            }

        })
    })
},
(err)=>{
    console.log(err)
})


