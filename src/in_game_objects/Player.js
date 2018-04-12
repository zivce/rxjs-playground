//styling
import '../styles/player.css';
import '../styles/bullet.css'

//utils 
import removeDomElement from '../util/removeElem';


//rx components
import Rx from 'rxjs';
import {interval} from 'rxjs/observable/interval';

export default class Player {
   

    constructor(node,userna,cfg){
        //simple init
        this.difficulty = cfg;
        this.username =userna;
        this.score = 0;
        this.health_points = 100;
        this.bullets = [];
        this.container = node;
        this.dom_element = document.createElement("div");
        this.dom_element.className = "player_fill";
        let that = this;
        const FREQ_HP_SCORES_UPDATES = 10; 


        node.appendChild(this.dom_element);
        
        
        //movement events handled
        const mouse_move_events = Rx.Observable.fromEvent(document,'mousemove');

        let mouse_moved = (event)=>{
    
            let cursor_not_close_to_right_edge
                = event.clientX < window.innerWidth - 250;

            if(cursor_not_close_to_right_edge)
                this.dom_element.style.left = event.clientX + 50;
            else   

                this.dom_element.style.left = window.innerWidth - 200;
        
        }
        
        mouse_move_events.subscribe(mouse_moved);


        //space pressed handled
        const spacebar_pressed = Rx.Observable.fromEvent(document,'keypress');
        let spacebar_pressed_handler = function(keypressed_event){
            if(keypressed_event.code === 'Space')
            {
                that.firePower();
            }
            
            let shown_game_over_txt = 
            document.querySelector(".game_over_txt_style") !== null;

            if(shown_game_over_txt)
                this.unsubscribe();

        }
        spacebar_pressed.subscribe(spacebar_pressed_handler);


        //vars used in subscription below
        let thisPlayer = this;
        let RETURN_TO_NORMAL_PLAYER = 300;

        let recoil_player_movement_handler = function(keypressed_event){
            let that = this;//unsubscribe function
            if(keypressed_event.code === 'Space')
            {
                thisPlayer.dom_element.className = "player_shooted";
                
            }

            window.setTimeout(()=>
            {
                thisPlayer.dom_element.className= "player_fill";    

            },RETURN_TO_NORMAL_PLAYER);
            
        }

        spacebar_pressed.subscribe(recoil_player_movement_handler)
        
        //scores and hp info 

        let score_container = document.createElement("p");
        score_container.className = "player_score";
        node.appendChild(score_container);

        let hp_container = document.createElement("p");
        hp_container.className = "hp_score";
        node.appendChild(hp_container);

        //Update score 
        let hp_scores_updater = function(){
            score_container.innerHTML = `Score: ${that.score}`;
            hp_container.innerHTML = `HP: ${that.health_points}`;
            
            let shown_game_over_txt = 
            document.querySelector(".game_over_txt_style") !== null;

            
            if(shown_game_over_txt)
            {   
                removeDomElement(score_container);
                removeDomElement(hp_container);
                this.unsubscribe();
            }

        }


        Rx.Observable.interval(FREQ_HP_SCORES_UPDATES).subscribe(hp_scores_updater)

    }

    
    listenerForCollision(enemies){
        enemies
            .filter((enemy)=>{
                let en = enemy.dom_element.getBoundingClientRect();
                let enemy_in_game = en.x !== 0 && en.y !== 0;
                return enemy_in_game;

            })

           
            
        enemies.forEach((enemy)=>{
                let enemy_rect = enemy.dom_element.getBoundingClientRect();
                let player_rect = this.dom_element.getBoundingClientRect();

                let x_hit = ( Math.abs((player_rect.x + player_rect.width/2) - (enemy_rect.x+enemy_rect.width/2))) < 100;
                let y_hit = Math.abs(enemy_rect.y - player_rect.y) < 20;
                
                if(x_hit && y_hit)
                {
                    this.health_points -= 10;
                    // KIA
                    if(this.health_points <= 0)
                    {
                        
                        removeDomElement(this.dom_element);

                    }
                        
                }
            })
            return this.health_points;
    }
    firePower(){
        
        let SPEED = 5;
        let MOVEMENT_SPEED = 5;

        let bullet = document.createElement("div");
        bullet.className = "bullet_fill";  
        bullet.style.left = this.dom_element.offsetLeft + 55;
        bullet.style.bottom = "100px";
        
        this.container.appendChild(bullet);
        this.bullets.push(bullet);
        let bottom_bullet = bullet.getBoundingClientRect();

        let bottom_offset = 100;

        let that = this;
        
        let player_shooted = function(){

            //player shooted
            
            bottom_offset += MOVEMENT_SPEED;
            bullet.style.bottom = `${bottom_offset}px`;
            let over_top_edge = bottom_offset >= window.innerHeight;

            if(over_top_edge)
            {
                this.unsubscribe();
                removeDomElement(bullet);

                //Removing not visible bullet
                let remove_this_bullet_index = that.bullets.indexOf(bullet);
                that.bullets.splice(remove_this_bullet_index,1);
                return;   
            }
            
        }

        Rx.Observable
            .interval(SPEED)
            .subscribe(player_shooted)

    }

}

