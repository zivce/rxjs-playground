//styling
import '../styles/player.css';
import '../styles/bullet.css'

import Rx from 'rxjs';
import {interval} from 'rxjs/observable/interval';

export default class Player {
    
    constructor(node){
        //simple init
        this.health_points = 100;
        this.container = node;
        this.dom_element = document.createElement("div");
        this.dom_element.className = "player_fill";
        
        node.appendChild(this.dom_element);
        
        //movement events handled
        const mouse_move_events = Rx.Observable.fromEvent(document,'mousemove');
        mouse_move_events.subscribe((event)=>{

            let cursor_not_close_to_right_edge
                = event.clientX < window.innerWidth - 250;

            if(cursor_not_close_to_right_edge)
                this.dom_element.style.left = event.clientX + 50;
            else   

                this.dom_element.style.left = window.innerWidth - 200;
        
        })


        //space pressed handled
        const spacebar_pressed = Rx.Observable.fromEvent(document,'keypress');
        spacebar_pressed.subscribe((keypressed_event)=>{
            if(keypressed_event.code === 'Space')
            {
                this.firePower();
            }
        })


    }
    
    firePower(){
        
        let SPEED = 30;
        let MOVEMENT_SPEED = 5;

        let bullet = document.createElement("div");
        bullet.className = "bullet_fill";  
        bullet.style.left = this.dom_element.offsetLeft + 55;
        bullet.style.bottom = "100px";
        
        this.container.appendChild(bullet);
        let len = bullet.style.bottom.length;
        
        let bottom_offset = bullet.style.bottom.slice(0,len-2);
        bottom_offset = new Number(bottom_offset);
        let that = this;

        Rx.Observable.interval(SPEED)
            .subscribe(function(){

                bottom_offset += MOVEMENT_SPEED;
                bullet.style.bottom = `${bottom_offset}px`;

                let over_top_edge = bottom_offset >= window.innerHeight;
                
                if(over_top_edge)
                {
                    this.unsubscribe();
                    that.container.removeChild(bullet);
                    return;   
                }

            })

    }

}

