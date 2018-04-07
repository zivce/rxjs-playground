import Enemy from './Enemy';

export default class EnemyRomb extends Enemy{
    constructor(node)
    {
        super(node);
        this.health_points = 200;
        this.dom_element.className = "enemy_romb_fill";
    }
}