//in game objects
import Enemy from './in_game_objects/Enemy';
import {EnemyRomb,EnemyCone, EnemyDiamond} from './in_game_objects/DerivedEnemies'
import Player from './in_game_objects/Player';
import removeDomElement from './util/removeElem';

//utils
import buildStartScreen from './util/buildStartScreen';
import buildEndScreen from './util/buildEndScreen';
import checkUsername from './util/checkUsername';
import buildScoresTable from './util/buildScoresTable';


//Rx modules
import Rx from 'rxjs';
import {interval} from 'rxjs/observable/interval';

//styles
import styles from './styles/styles.css';



//container div
let wrapper = document.createElement("div");
document.body.appendChild(wrapper);


let start_screen_elems = buildStartScreen(wrapper);



//consts    
let window_height = window.innerHeight - 50;


let NUMBER_ENEMIES = 20;//HIGHER = HARDER
let ENEMIES_SPEED = 100;//LOWER = HARDER
let ENEMY_HP_DESTRUCTION = 5;//LOWER = HARDER
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

                checkUsername(username).then((user_in_use)=>{
                    if(user_in_use)
                    {
                        start_screen_elems.input_player.value = "";
                        start_screen_elems.input_player.placeholder = "Insert other username";
                    }
                    else 
                    {
                        fetch("http://localhost:3000/easy")
                        .then((data)=>{            
                            data.json().then((objJson)=>{
                                NUMBER_ENEMIES = objJson.NUMBER_ENEMIES;
                                ENEMIES_SPEED  = objJson.ENEMIES_SPEED;
                                ENEMY_HP_DESTRUCTION = objJson.ENEMY_HP_DESTRUCTION;
                            })
                            
                            resolve(username);
    
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
                
                checkUsername(username).then((user_in_use)=>{
                    if(user_in_use)
                    {
                        start_screen_elems.input_player.value = "";
                        start_screen_elems.input_player.placeholder = "Insert other username";
                    }
                    else 
                    {
                        fetch("http://localhost:3000/medium")
                        .then((data)=>{            
                            data.json().then((objJson)=>{
                                NUMBER_ENEMIES = objJson.NUMBER_ENEMIES;
                                ENEMIES_SPEED  = objJson.ENEMIES_SPEED;
                                ENEMY_HP_DESTRUCTION = objJson.ENEMY_HP_DESTRUCTION;
                            })
                            
                            resolve(username);
    
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
                
                checkUsername(username).then((user_in_use)=>{
                    if(user_in_use)
                    {
                        start_screen_elems.input_player.value = "";
                        start_screen_elems.input_player.placeholder = "Insert other username";
                    }
                    else 
                    {
                        fetch("http://localhost:3000/hard")
                        .then((data)=>{            
                            data.json().then((objJson)=>{
                                NUMBER_ENEMIES = objJson.NUMBER_ENEMIES;
                                ENEMIES_SPEED  = objJson.ENEMIES_SPEED;
                                ENEMY_HP_DESTRUCTION = objJson.ENEMY_HP_DESTRUCTION;
                            })
                            resolve(username);
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
    .then((username)=>{

        
        //remove start screen 
        
        for(let prop in start_screen_elems)
        {
            removeDomElement(start_screen_elems[prop]);
        }

        console.log("start game");

        
        //player has joined the game
        let player = new Player(wrapper,username);
        

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
                resolve(player);
                this.unsubscribe();
            }
        })
        


        //generating enemies
        Rx.Observable.interval(1000)  
            .subscribe(function(){
                
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


                if(I % 4 === 0)
                    Enemies.push(new Enemy(wrapper));
                else if( I % 4 === 1)
                    Enemies.push(new EnemyRomb(wrapper));
                else if (I% 4 === 2)
                    Enemies.push(new EnemyCone(wrapper));
                else
                    Enemies.push(new EnemyDiamond(wrapper));

                Enemies[Enemies.length-1].startMoving(ENEMIES_SPEED);
                I++;

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
                resolve(player);            
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
        },
        (err)=>{
            console.log(err)
        })
    })
})

//building screen after game done 
game_over.then((player)=>{

    window.setTimeout(
        ()=>{},1000
    )

    document.body.style.overflowY = "auto";

    let end_screen_elems = {};

    end_screen_elems = buildEndScreen(wrapper,player);
    
    end_screen_elems.new.onclick = ()=>{
        window.location.reload(true);
    }

    const scores = end_screen_elems.table_scores;

    buildScoresTable(scores);

    const save_button = end_screen_elems.save;
    
    save_button.onclick = ()=>{
        let user =  player.username;
        let score = player.score;

        let score_for_save = 
        {
            score : score,
            username : user

        }

        fetch('http://localhost:3001/scores',{
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
                buildScoresTable(scores);
            });
    }

})

        


