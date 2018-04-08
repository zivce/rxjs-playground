
//Base class
import Enemy from './Enemy';

export class EnemyCone extends Enemy{
    constructor(node)
    {
        super(node);
        this.health_points = 100;
        this.dom_element.className = "enemy enemy_cone_fill";
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
        this.health_points = 300;
        this.dom_element.className = "enemy enemy_diamond_fill";
    }
    startMoving(speed)
    {
        super.startMoving(speed/2);
    }
}
