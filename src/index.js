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

let NUMBER_ENEMIES = 20;//HIGHER = HARDER
let ENEMIES_SPEED = 100;//LOWER = HARDER
let DIFFICULTY_ENEMY_HP_DESTRUCTION = 5;//LOWER = HARDER

//consts    
let window_height = window.innerHeight - 50;

let Enemies = [];
let I = 0 ;
//generating enemies
Rx.Observable.interval(1000)
    .subscribe(function(){
        Enemies.push(new Enemy(wrapper));
        Enemies[Enemies.length-1].startMoving(ENEMIES_SPEED);
        I++
        if(I === NUMBER_ENEMIES)
            this.unsubscribe();

    },
    (err)=>{
        console.log(err)
    })
   

//player has joined the game
let player = new Player(wrapper);

//Check for collision

Rx.Observable.interval(10).subscribe(function(){
    //console.log(player);
    let hp = player.listenerForCollision(Enemies);

    if(hp <= 0)
    {
        
        this.unsubscribe();                
    }
})


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
            

            let bullet_rect = bullet.getBoundingClientRect();

            let x_match = ( Math.abs(bullet_rect.x - (enemy_rect.x+enemy_rect.width/2))) < 50;


            let y_match = Math.abs(enemy_rect.y -
            bullet_rect.y) < 5 ;
            
            let bullet_hit_enemy = y_match && x_match ;
            

            // NANESI STETU
            if(bullet_hit_enemy)
            {
                //console.log("bullet hit!");

                const parent = bullet.parentNode;

                if(parent != null)
                    parent.removeChild(bullet);

                enemy.health_points-= DIFFICULTY_ENEMY_HP_DESTRUCTION;
                //console.log(enemy.health_points);
                
            }

        })
    })
},
(err)=>{
    console.log(err)
})


