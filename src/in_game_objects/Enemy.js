import styles from '../styles/enemy.css';

import Rx from 'rxjs';
import {interval} from 'rxjs/observable/interval';

export default class Enemy {
    
    constructor(node){
        this.health_points = 100;
        this.container = node;
        this.dom_element = document.createElement("div");
        this.dom_element.className = "enemy_fill";
        
        
        node.appendChild(this.dom_element);
        
    }

    startMoving(speed){
        //variables block
        let that = this;
        let TOP_OFFSET = 20;

        let windowHeight = window.innerHeight;
        let windowWidth = window.innerWidth;
        
        let left_offset = Math.random()*(windowWidth-100) % windowWidth;
        
        //on certaion `speed` the enemy moves down
        Rx.Observable.interval(speed).subscribe(function()
        {

            TOP_OFFSET+=20;
            that.dom_element.style.top = `${TOP_OFFSET}px`;

            that.dom_element.style.left = `${left_offset}px`;
            
            //when enemy has reached the end of window
            //remove it from playground
            // & unsubscribe from Observable
            
            let off_bottom_edge = TOP_OFFSET >= windowHeight;
            
            if(off_bottom_edge)
            {
                this.unsubscribe();
                that.container.removeChild(that.dom_element);
                return;
            }
        });

    }


}

