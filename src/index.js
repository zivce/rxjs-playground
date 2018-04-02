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


//select difficulty

let buttons_group_cfg = document.createElement("div");
buttons_group_cfg.className ="buttons_group";

let btn_easy = document.createElement("button");
btn_easy.className = "btn_config";
btn_easy.innerHTML = "Easy";
buttons_group_cfg.appendChild(btn_easy);


let btn_med = document.createElement("button");
btn_med.className = "btn_config";
btn_med.innerHTML = "Medium";

buttons_group_cfg.appendChild(btn_med);


let btn_hard = document.createElement("button");
btn_hard.className = "btn_config";
btn_hard.innerHTML = "Hard";

buttons_group_cfg.appendChild(btn_hard);

wrapper.appendChild(buttons_group_cfg);

//consts    
let window_height = window.innerHeight - 50;


let NUMBER_ENEMIES = 20;//HIGHER = HARDER
let ENEMIES_SPEED = 100;//LOWER = HARDER
let ENEMY_HP_DESTRUCTION = 5;//LOWER = HARDER
let Enemies = [];
let I = 0 ;




let io_promise = new Promise((resolve,reject)=>{

    setTimeout(()=>{
        //do ajax here 
        btn_easy.onclick = (event)=>{
            fetch("http://localhost:3000/easy")
                .then((data)=>{            
                    data.json().then((objJson)=>{
                        NUMBER_ENEMIES = objJson.NUMBER_ENEMIES;
                        ENEMIES_SPEED  = objJson.ENEMIES_SPEED;
                        ENEMY_HP_DESTRUCTION = objJson.ENEMY_HP_DESTRUCTION;
                    })
                    
                //after fetched proceed to game     
                resolve();

        
                })
        }
        
        
        
        btn_med.onclick = (event)=>{
            fetch("http://localhost:3000/medium")
                .then((data)=>{
                    data.json().then((objJson)=>{
                        NUMBER_ENEMIES = objJson.NUMBER_ENEMIES;
                        ENEMIES_SPEED  = objJson.ENEMIES_SPEED;
                        ENEMY_HP_DESTRUCTION = objJson.ENEMY_HP_DESTRUCTION;
                    })
                    
                //after fetched proceed to game     
                resolve();

                })

        }
        
        
        
        
        btn_hard.onclick = (event)=>{
            fetch("http://localhost:3000/hard")
                .then((data)=>{
                    data.json().then((objJson)=>{
                        NUMBER_ENEMIES = objJson.NUMBER_ENEMIES;
                        ENEMIES_SPEED  = objJson.ENEMIES_SPEED;
                        ENEMY_HP_DESTRUCTION = objJson.ENEMY_HP_DESTRUCTION;
                    })

                //after fetched proceed to game     
                resolve();

                })
        }

    },1000)


})
// btn_easy.onclick = (event)=>{
//     fetch("http://localhost:3000/easy")
//         .then((data)=>{            
//             data.json().then((objJson)=>{
//                 NUMBER_ENEMIES = objJson.NUMBER_ENEMIES;
//                 ENEMIES_SPEED  = objJson.ENEMIES_SPEED;
//                 ENEMY_HP_DESTRUCTION = objJson.ENEMY_HP_DESTRUCTION;
//             })
//             data_retrieved = true;

//         })
// }



// btn_med.onclick = (event)=>{
//     fetch("http://localhost:3000/medium")
//         .then((data)=>{
//             data.json().then((objJson)=>{
//                 NUMBER_ENEMIES = objJson.NUMBER_ENEMIES;
//                 ENEMIES_SPEED  = objJson.ENEMIES_SPEED;
//                 ENEMY_HP_DESTRUCTION = objJson.ENEMY_HP_DESTRUCTION;
//             })
//             data_retrieved = true;
//         })
// }




// btn_hard.onclick = (event)=>{
//     fetch("http://localhost:3000/hard")
//         .then((data)=>{
//             data.json().then((objJson)=>{
//                 NUMBER_ENEMIES = objJson.NUMBER_ENEMIES;
//                 ENEMIES_SPEED  = objJson.ENEMIES_SPEED;
//                 ENEMY_HP_DESTRUCTION = objJson.ENEMY_HP_DESTRUCTION;
//             })

//             data_retrieved = true;
//         })
// }

console.log(io_promise);

io_promise
.then(()=>{

    if(buttons_group_cfg.parentNode !== null)
        buttons_group_cfg.parentNode.removeChild(buttons_group_cfg);

    console.log("start game");
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

    Rx.Observable.interval(1).subscribe(function(){

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
                    player.score += ENEMY_HP_DESTRUCTION;
                    
                    enemy.health_points-= ENEMY_HP_DESTRUCTION;
                    //console.log(enemy.health_points);
                    
                }

            })
        })
    },
    (err)=>{
        console.log(err)
    })
})

        


