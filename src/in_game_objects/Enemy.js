import "../styles/enemy.css";
import removeDomElement from "../util/removeElem";

import Rx from "rxjs";
import { interval } from "rxjs/observable/interval";

export default class Enemy {
  constructor(node) {
    this.health_points = 100;
    this.container = node;
    this.dom_element = document.createElement("div");
    this.dom_element.className = "enemy enemy_fill";

    let windowWidth = window.innerWidth;
    let left_offset = (Math.random() * (windowWidth - 100)) % windowWidth;
    this.dom_element.style.left = `${left_offset}px`;

    node.appendChild(this.dom_element);
  }

  startMoving(speed) {
    //variables block
    let that = this;
    let TOP_OFFSET = 20;
    let MOVEMENT_SPEED = 1;

    let windowHeight = window.innerHeight;

    //on certaion `speed` the enemy moves down
    Rx.Observable.interval(speed).subscribe(function() {
      TOP_OFFSET += MOVEMENT_SPEED;
      that.dom_element.style.top = `${TOP_OFFSET}px`;

      let off_bottom_edge = TOP_OFFSET >= windowHeight - 50;

      let alive_and_off_the_screen = off_bottom_edge && that.health_points > 0;

      if (alive_and_off_the_screen) {
        this.unsubscribe();
        removeDomElement(that.dom_element);
        return;
      }
    });
  }
}
