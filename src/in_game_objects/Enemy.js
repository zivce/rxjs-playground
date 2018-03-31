import styles from '../styles/enemy.css';

import Rx from 'rxjs';
import {interval} from 'rxjs/Observable/interval';

export default class Enemy {
    
    constructor(node){
        this.health_points = 100;
        this.container = node;
        this.dom_element = document.createElement("div");
        this.dom_element.className = "enemy_fill";
        
        
        node.appendChild(this.dom_element);
        console.log(this)
        
    }

    startMoving(speed){
        //variables block
        let that = this;
        let top_offset = 20;
        let windowHeight = window.innerHeight;
        let windowWidth = window.innerWidth;
        let left_offset = Math.random()*(windowWidth-100) % windowWidth;
        
        //on certaion `speed` the enemy moves down
        Rx.Observable.interval(speed).subscribe(function()
        {

            top_offset+=20;
            that.dom_element.style.top = `${top_offset}px`;


            left_offset = Math.random()*(windowWidth-100) % windowWidth;
            that.dom_element.style.left = `${left_offset}px`;
            
            //when enemy has reached the end of window
            //remove it from playground
            // & unsubscribe from Observable

            if(top_offset >= windowHeight)
            {
                this.unsubscribe();
                that.container.removeChild(that.dom_element);
                return;
                
            }
                
        });

    }


}

