
//Base class
import Enemy from './Enemy';

export class EnemyRomb extends Enemy{
    constructor(node)
    {
        super(node);
        this.health_points = 200;
        this.dom_element.className = "enemy_romb_fill";
    }
    
    startMoving(speed)
    {
        super.startMoving(speed/1.5);
    }
}

export class EnemyCone extends Enemy{
    constructor(node)
    {
        super(node);
        this.health_points = 150;
        this.dom_element.className = "enemy_cone_fill";
    }

    startMoving(speed)
    {
        super.startMoving(speed/3);
    }
}

export class EnemyDiamond extends Enemy{
    constructor(node)
    {
        super(node);
        this.health_points = 250;
        this.dom_element.className = "enemy_diamond_fill";
    }
    startMoving(speed)
    {
        //diamond moves faster 
        super.startMoving(speed/2);
    }
}
