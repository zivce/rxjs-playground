//in game objects
import Enemy from './in_game_objects/Enemy';
import {EnemyCone, EnemyDiamond} from './in_game_objects/DerivedEnemies'
import Player from './in_game_objects/Player';
import removeDomElement from './util/removeElem';

//utils
import buildStartScreen from './util/buildStartScreen';
import buildEndScreen from './util/buildEndScreen';
import checkUsername from './util/checkUsername';
import buildScoresTable from './util/buildScoresTable';


//Rx modules
import Rx, { Subject } from 'rxjs';
import {interval} from 'rxjs/observable/interval';
//styles
import styles from './styles/styles.css';



//container div
let wrapper = document.createElement("div");
document.body.appendChild(wrapper);


let start_screen_elems = buildStartScreen(wrapper);



const window_height = window.innerHeight - 50;
let NUMBER_ENEMIES = undefined;//HIGHER = HARDER
let ENEMIES_SPEED = undefined;//LOWER = HARDER
let ENEMY_HP_DESTRUCTION = undefined;//LOWER = HARDER

//globals.

let Enemies = [];
let I = 0 ;





let game_start = new Promise((resolve,reject)=>{
    let username = "";

    let username_empty;

    Rx.Observable.interval(10).subscribe(function(){
        username_empty = start_screen_elems.input_player.value === "";
    })


    setTimeout(()=>{
        //do ajax here 
        start_screen_elems.easy.onclick = (event)=>{
            
            if(username_empty)
            {
                start_screen_elems.input_player.placeholder = "Fill the input";
                return;
            }
            else
            {                    
                username = start_screen_elems.input_player.value;

                checkUsername(username,"easy").then((user_in_use)=>{
                    if(user_in_use)
                    {
                        start_screen_elems.input_player.value = "";
                        start_screen_elems.input_player.placeholder = "Insert other username";
                    }
                    else 
                    {
                        let url_easy = "http://localhost:3000/easy";

                        fetch(url_easy)
                        .then((data)=>{            
                            data.json().then((objJson)=>{
                                NUMBER_ENEMIES = objJson.NUMBER_ENEMIES;
                                ENEMIES_SPEED  = objJson.ENEMIES_SPEED;
                                ENEMY_HP_DESTRUCTION = objJson.ENEMY_HP_DESTRUCTION;
                            })
                            let resolveObj ={
                                username : username,
                                diff : "easy"
                            }
                            resolve(resolveObj);
    
                        })
                    }
                })
            }

        
        }
        
        
        
        start_screen_elems.med.onclick = (event)=>{
            
            if(username_empty)
            {
                start_screen_elems.input_player.placeholder = "Fill the input";
                return;
            }
            else
            {

                username = start_screen_elems.input_player.value;
                
                checkUsername(username,"medium").then((user_in_use)=>{
                    if(user_in_use)
                    {
                        start_screen_elems.input_player.value = "";
                        start_screen_elems.input_player.placeholder = "Insert other username";
                    }
                    else 
                    {
                        let url_medium = "http://localhost:3000/medium";

                        fetch(url_medium)
                        .then((data)=>{            
                            data.json().then((objJson)=>{
                                NUMBER_ENEMIES = objJson.NUMBER_ENEMIES;
                                ENEMIES_SPEED  = objJson.ENEMIES_SPEED;
                                ENEMY_HP_DESTRUCTION = objJson.ENEMY_HP_DESTRUCTION;
                            })
                            let resolveObj ={
                                username : username,
                                diff : "medium"
                            }
                            resolve(resolveObj);
    
                        })
                    }
                })


            }


        }
        
        
        
        
        start_screen_elems.hard.onclick = (event)=>{
            
            
            if(username_empty)
            {
                start_screen_elems.input_player.placeholder = "Fill the input";
                return;
            }
            else
            {
                username = start_screen_elems.input_player.value;
                
                checkUsername(username,"hard").then((user_in_use)=>{
                    if(user_in_use)
                    {
                        start_screen_elems.input_player.value = "";
                        start_screen_elems.input_player.placeholder = "Insert other username";
                    }
                    else 
                    {
                        let url_hard = "http://localhost:3000/hard";

                        fetch(url_hard)
                        .then((data)=>{            
                            data.json().then((objJson)=>{
                                NUMBER_ENEMIES = objJson.NUMBER_ENEMIES;
                                ENEMIES_SPEED  = objJson.ENEMIES_SPEED;
                                ENEMY_HP_DESTRUCTION = objJson.ENEMY_HP_DESTRUCTION;
                            })
                            let resolveObj ={
                                username : username,
                                diff : "hard"
                            }
                            resolve(resolveObj);
                        })
                    }
                })

            }

        }

        },1000)
        


})

let game_over = new Promise((resolve,reject)=>{

    //When difficulty selected proceed to starting game
    game_start
    .then((user_and_diff)=>{
        
        
        const ENEMY_GEN_SPEED = 1000;
        const FREQ_COLLISION_LISTENER = 1;
        const FREQ_FIELD_EMPTY_CHECK = 1010;
        const FREQ_BULLET_HITS = 1;



        document.body.style.background = "url('./src/img/tic-tac-toe.png') repeat";

        //remove start screen 
        for(let prop in start_screen_elems)
        {
            removeDomElement(start_screen_elems[prop]);
        }

        //player has joined the game
        let player = new Player(wrapper,user_and_diff.username,user_and_diff.diff);
        
        
        //generate enemy logic

        const generate_enemy = function(){
                
            if(I === NUMBER_ENEMIES)
            {
                this.unsubscribe();
                return;                
            }    

            if(player.health_points === 0)
            {
                this.unsubscribe();
                resolve(player); 
                return;
            }


            if(I % 3 === 0)
                Enemies.push(new Enemy(wrapper));
            else if (I % 3 === 1)
                Enemies.push(new EnemyCone(wrapper));
            else
                Enemies.push(new EnemyDiamond(wrapper));

            Enemies[Enemies.length-1].startMoving(ENEMIES_SPEED);
            
            I++;
        }

        //generating enemies
        Rx.Observable.interval(ENEMY_GEN_SPEED)  
            .subscribe(generate_enemy,
            (err)=>{
                console.log(err)
            })
        

        //collision logic

        const collision_listener = function(){
            let hp = player.listenerForCollision(Enemies);
            let player_killed = hp <= 0;

            if(player_killed)
            {
                this.unsubscribe();    
                resolve(player);            
            }
        }

        Rx.Observable.interval(FREQ_COLLISION_LISTENER)
            .subscribe(collision_listener,
            (err)=>{
                console.log(err)
            });



        const field_clear_checker = function(){
            let enemies =  wrapper.querySelector(".enemy");

            if(enemies === null)
            {
                Enemies = [];
                this.unsubscribe();
                resolve(player);
            }
                
        }

        Rx.Observable
        .interval(FREQ_FIELD_EMPTY_CHECK)
        .subscribe(field_clear_checker,
            (err)=>{
                console.log(err)
            })

        const bullets_hit_enemies = function(){

            player.bullets
                .forEach(function(bullet){
                    Enemies = Enemies
                    .filter((enemy)=>{
                        let enemy_rect = enemy.dom_element.getBoundingClientRect();
                        let enemy_in_game =  enemy_rect.x !== 0 ;
                        return enemy_in_game;
                    })

                    Enemies.forEach(function(enemy){

                        //if killed remove from array and continue
                        
                        if(enemy.health_points === 0)
                        {
                            let remove_enemy_index = Enemies.indexOf(enemy);
                            Enemies.splice(remove_enemy_index,1);
                            removeDomElement(enemy.dom_element);
                            return;
                        }
                        
                    
                        //this block is for bullet hit enemy logic
                        let enemy_rect = enemy.dom_element.getBoundingClientRect();
                        let bullet_rect = bullet.getBoundingClientRect();
                        let x_match = Math.abs(bullet_rect.x - (enemy_rect.x + enemy_rect.width/2)) - 10 <= enemy_rect.width/2;
                        let y_match = Math.abs(enemy_rect.y - bullet_rect.y) <= (enemy_rect.height / 2);
                        let bullet_hit_enemy = y_match && x_match ;
                        //end block

                        if(bullet_hit_enemy)
                        {

                            removeDomElement(bullet);

                            player.score += ENEMY_HP_DESTRUCTION;
                            enemy.health_points-= ENEMY_HP_DESTRUCTION;
                            
                        }

                    })
                })
        }


        //shots hit the target  
        Rx.Observable.interval(FREQ_BULLET_HITS)
            .subscribe(bullets_hit_enemies,
            (err)=>{
                console.log(err)
            })


        })
})

//building screen after game done 
game_over.then((player)=>{
    document.body.style.background = "";
    window.setTimeout(
        ()=>{},1000
    )

    document.body.style.overflowY = "auto";

    let end_screen_elems = {};

    end_screen_elems = buildEndScreen(wrapper,player);
    
    end_screen_elems.new.onclick = ()=>{
        window.location.reload(true);
    }


    buildScoresTable(wrapper,player);

    const save_button = end_screen_elems.save;
    
    save_button.onclick = ()=>{
        let user =  player.username;
        let score = player.score;
        
        let score_for_save = 
        {
            score : score,
            username : user

        }
        let url_diff = `http://localhost:3001/${player.difficulty}`;
        fetch(url_diff,{
            method:'POST',
            body: JSON.stringify(score_for_save),
            headers: new Headers({
                'Content-Type' : 'application/json'
            })
        })
        .then(res => res.json())
        .catch(err => console.error('Error: ', err))
        .then(response => 
            {
                alert('Score saved!');
                removeDomElement(end_screen_elems.save);
                buildScoresTable(wrapper,player);
            });
    }

})

        


