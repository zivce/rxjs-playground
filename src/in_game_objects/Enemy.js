import styles from '../styles/enemy.css';

import Rx from 'rxjs';
import {interval} from 'rxjs/Observable/interval';

export default class Enemy {
    
    constructor(node){
        this.container = node;
        this.dom_element = document.createElement("div");
        this.dom_element.className = "enemy_fill";
        
        //HACK 
        this.dom_element.setAttribute('id',"en1");
        
        node.appendChild(this.dom_element);
        console.log(this)
        
    }

    startMoving(speed){
        let that = this;
        let top_offset = 20;
        let windowHeight = window.innerHeight;
       
        
        Rx.Observable.interval(speed).subscribe(function()
        {
            top_offset+=20;
            that.dom_element.style.top = `${top_offset}px`;
            
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

