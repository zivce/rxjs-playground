//in game objects
import Enemy from './in_game_objects/Enemy';
import Player from './in_game_objects/Player';
import removeDomElement from './util/removeElem';

//utils
import buildStartScreen from './util/buildStartScreen';
import buildEndScreen from './util/buildEndScreen';

//Rx modules
import Rx from 'rxjs';
import {interval} from 'rxjs/observable/interval';

//styles
import styles from './styles/styles.css';



//container div
let wrapper = document.createElement("div");
wrapper.className="container start_screen";
document.body.appendChild(wrapper);


let start_screen_elems = buildStartScreen(wrapper);



//consts    
let window_height = window.innerHeight - 50;


let NUMBER_ENEMIES = 20;//HIGHER = HARDER
let ENEMIES_SPEED = 100;//LOWER = HARDER
let ENEMY_HP_DESTRUCTION = 5;//LOWER = HARDER
let Enemies = [];
let I = 0 ;




let io_promise = new Promise((resolve,reject)=>{
    // let username_empty = start_screen_elems.input_player.innerHTML === "";
    // Rx.Observable.interval(100).subscribe(function(){
        // let observer = this;

        setTimeout(()=>{
            //do ajax here 
            start_screen_elems.easy.onclick = (event)=>{
                fetch("http://localhost:3000/easy")
                    .then((data)=>{            
                        data.json().then((objJson)=>{
                            NUMBER_ENEMIES = objJson.NUMBER_ENEMIES;
                            ENEMIES_SPEED  = objJson.ENEMIES_SPEED;
                            ENEMY_HP_DESTRUCTION = objJson.ENEMY_HP_DESTRUCTION;
                        })
                        
                    //after fetched proceed to game     
                    
                    // if(username_empty)
                        // reject();
                    // else 
                    // {
                        // observer.unsubscribe();
                        resolve();
                    // }

                })
            }
            
            
            
            start_screen_elems.med.onclick = (event)=>{
                fetch("http://localhost:3000/medium")
                    .then((data)=>{
                        data.json().then((objJson)=>{
                            NUMBER_ENEMIES = objJson.NUMBER_ENEMIES;
                            ENEMIES_SPEED  = objJson.ENEMIES_SPEED;
                            ENEMY_HP_DESTRUCTION = objJson.ENEMY_HP_DESTRUCTION;
                        })
                        
                    //after fetched proceed to game     
                     // if(username_empty)
                        // reject();
                    // else 
                    // {
                        // observer.unsubscribe();
                        resolve();
                    // }

                    })

            }
            
            
            
            
            start_screen_elems.hard.onclick = (event)=>{
                fetch("http://localhost:3000/hard")
                    .then((data)=>{
                        data.json().then((objJson)=>{
                            NUMBER_ENEMIES = objJson.NUMBER_ENEMIES;
                            ENEMIES_SPEED  = objJson.ENEMIES_SPEED;
                            ENEMY_HP_DESTRUCTION = objJson.ENEMY_HP_DESTRUCTION;
                        })

                    //after fetched proceed to game   
                    
                    // if(username_empty)
                        // reject();
                    // else 
                    // {
                        // observer.unsubscribe();
                        resolve();
                    // }
                })
            }

        },1000)
        
    // })


})

let game_over = new Promise((resolve,reject)=>{

    //When difficulty selected proceed to starting game
    io_promise
    .then(()=>{


        //remove start screen 
        
        for(let prop in start_screen_elems)
        {
            removeDomElement(start_screen_elems[prop]);
        }

        console.log("start game");

        
        //player has joined the game
        let player = new Player(wrapper);


        //check if enemies are all gone,killed.

        Rx.Observable
        .interval(1010)
        .subscribe(function(){
            
            //gets in game enemies
            Enemies = Enemies
                .filter((enemy)=>{
                    let enemy_rect = enemy.dom_element.getBoundingClientRect();
                    let enemy_in_game =  enemy_rect.x !== 0 ;
                    
                    return enemy_in_game;
                })

            if(Enemies.length === 0)
            {
                let not_shown_game_over_txt = 
                    document.querySelector(".game_over_txt_style") === null;
                
                //all enemies killed
                if(not_shown_game_over_txt)
                {
                    let game_over_text = document.createElement("h1");
                    game_over_text.innerText=`GAME OVER! Your score is: ${player.score}`;
                    game_over_text.className="game_over_txt_style";
                    wrapper.appendChild(game_over_text);
                    
                    //start building end screen
                    resolve();
                }



                this.unsubscribe();
            }
        })
        


        //generating enemies
        Rx.Observable.interval(1000)
            .subscribe(function(){
                Enemies.push(new Enemy(wrapper));
                Enemies[Enemies.length-1].startMoving(ENEMIES_SPEED);
                I++;

                if(I === NUMBER_ENEMIES)
                    this.unsubscribe();
            },
            (err)=>{
                console.log(err)
            })
        

        //Check for collision

        Rx.Observable.interval(1).subscribe(function(){
            let hp = player.listenerForCollision(Enemies);
            let player_killed = hp <= 0;

            if(player_killed)
            {
                this.unsubscribe();    
                resolve();            
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
                        removeDomElement(enemy.dom_element);
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

                        removeDomElement(bullet);

                        player.score += ENEMY_HP_DESTRUCTION;
                        
                        enemy.health_points-= ENEMY_HP_DESTRUCTION;
                        
                    }

                })
            })
        },
        (err)=>{
            console.log(err)
        })
    },
    //reject
    ()=>{
        alert("Popuni input!");
    })
})

//building screen after game done 
game_over.then(()=>{
    buildEndScreen(wrapper);

})

        


