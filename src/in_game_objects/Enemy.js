import  '../styles/enemy.css';
import removeDomElement from '../util/removeElem';

import Rx from 'rxjs';
import {interval} from 'rxjs/observable/interval';

export default class Enemy {
    
    constructor(node){
        this.health_points = 100;
        this.container = node;
        this.dom_element = document.createElement("div");
        this.dom_element.className = "enemy enemy_fill";
        
        
        let windowWidth = window.innerWidth;
        let left_offset = Math.random()*(windowWidth-100) % windowWidth;
        this.dom_element.style.left = `${left_offset}px`;
        

        node.appendChild(this.dom_element);
        
    }

    startMoving(speed){
        //variables block
        let that = this;
        let TOP_OFFSET = 20;
        let MOVEMENT_SPEED = 1;

        let windowHeight = window.innerHeight;
        
        
        //on certaion `speed` the enemy moves down
        Rx.Observable.interval(speed).subscribe(function()
        {

            TOP_OFFSET+=MOVEMENT_SPEED;
            that.dom_element.style.top = `${TOP_OFFSET}px`;

            
            //console.log(that.dom_element.getBoundingClientRect());


            //when enemy has reached the end of window
            //remove it from playground
            // & unsubscribe from Observable
            
            let off_bottom_edge = TOP_OFFSET >= windowHeight - 50;
            
            //ako ima 0 onda je obrisan

            if(off_bottom_edge && that.health_points > 0)
            {
                this.unsubscribe();
                //console.log(that);
                removeDomElement(that.dom_element);
                return;
            }
        });

    }


}

