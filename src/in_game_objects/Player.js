import styles from '../styles/player.css';

import Rx from 'rxjs';
import {interval} from 'rxjs/Observable/interval';

export default class Player {
    
    constructor(node){
        this.health_points = 100;
        this.container = node;
        this.dom_element = document.createElement("div");
        this.dom_element.className = "player_fill";
        
        node.appendChild(this.dom_element);
        

        const mouse_move_events = Rx.Observable.fromEvent(document,'mousemove');
        mouse_move_events.subscribe((event)=>{

            let cursor_not_close_to_right_edge
                = event.clientX < window.innerWidth - 200;

            if(cursor_not_close_to_right_edge)
                this.dom_element.style.left = event.clientX + 50;
            else   

                this.dom_element.style.left = window.innerWidth - 200;
        
        })



    }

}

