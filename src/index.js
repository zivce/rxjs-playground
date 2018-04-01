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


//consts    
let window_height = window.innerHeight - 50;

let Enemies = [];

//generating enemies
Rx.Observable.interval(1000).take(3)
    .subscribe(function(){
        Enemies.push(new Enemy(wrapper));
        Enemies[Enemies.length-1].startMoving(500);
        
    },
    (err)=>{
        console.log(err)
    })
   

//player has joined the game
let player = new Player(wrapper);




// //Filter out enemies 
// Rx.Observable.interval(5).subscribe(function(){
    
//     //filter out only in game enemies
//     Enemies = Enemies.filter((enemy)=>{
        
//         let top_offset = fromPixelsToInt(enemy.dom_element.style.top);
//         let in_game_enemy = top_offset < window_height;    
//         let alive_enemy = enemy.health_points !== 0;
//         return in_game_enemy && alive_enemy;
//     })
// },
// (err)=>{
//     console.log(err)
// })

//shots hit the target  
Rx.Observable.interval(1).subscribe(function(){
    
    player.bullets.forEach((bullet)=>{
        Enemies.forEach((enemy)=>{

            //if killed remove from array and continue
            
            if(enemy.health_points === 0)
            {
                let remove_enemy_index = Enemies.indexOf(enemy);
                Enemies.splice(remove_enemy_index,1);

                console.log("removed enemy @ " + enemy.dom_element.style.left)
                enemy.dom_element.parentNode.removeChild(enemy.dom_element);
                console.log(Enemies)
                return;
            }

            let enemy_top_offset = enemy.dom_element.style.top;
            let enemy_left_offset = enemy.dom_element.style.left;


            let bullet_bottom_offset = bullet.style.bottom;
            let bullet_left_offset = bullet.style.left;
            
            //x and y coords of bullet hit
            let bullet_hit_enemy_y =
                enemy_top_offset === bullet_bottom_offset;
            console.log("bullet hit on y", bullet_hit_enemy_y);


            let enemy_x = fromPixelsToInt(enemy_left_offset);
            let bullet_x = fromPixelsToInt(bullet_left_offset);
            let deviation = 50;

            let bullet_hit_enemy_x = 
                (Math.abs(enemy_x - bullet_x) < deviation);
            
            // console.log("hit on x coord " + bullet_hit_enemy_x)
            let bullet_hit_enemy = bullet_hit_enemy_x && bullet_hit_enemy_y;

            //NANESI STETU
            if(bullet_hit_enemy)
            {
                console.log("bullet hit!");
                enemy.health_points-=20;
                
                
                
                console.log(enemy.health_points);
                
            }
        })
    })
},
(err)=>{
    console.log(err)
})

//Remove killed enemy
// Rx.Observable.interval(5).subscribe(function(){
//     Enemies.forEach((enemy)=>{
//         if(enemy.health_points <= 0)
//         {
//         }
//     })
//     },
//     (err)=>{
//         console.log(err)
//     }
// )
