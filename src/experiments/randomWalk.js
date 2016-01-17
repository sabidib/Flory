/**
 * @author sabidib http://github.com/sabidib
 */
/** @constructor */
/*global Flory*/
/*jslint white*/

'use strict';
Flory.RandomWalk = function (seed, step_size) {
    Flory.Environment.call(this);
    this.randomGen = new Flory.RandomGen(seed);
    this.step_size = step_size !== undefined ? step_size : 1;
};
Flory.RandomWalk.prototype = Object.create(Flory.Environment.prototype);
Flory.RandomWalk.prototype.constructor = Flory.RandomWalk;
Flory.RandomWalk.prototype.update = function (additional) {
    var len = this.entities.length;
    var entity;
    var number_of_dimensions;
    var dimension_increment;
    var dimension_to_choose;
    var rnum;
    var number_of_steps = 1;
    var i, k;
    var prob_right = 0.5;
    if (additional.number_of_steps !== undefined) {
        number_of_steps = additional.number_of_steps;
    }
    for (k = 0; k < number_of_steps; k += 1) {
        for (i = 0; i < len; i += 1) {
            entity = this.entities[i];
            if (entity instanceof Flory.Particle) {
                number_of_dimensions = entity.position.dimension();
                dimension_increment = 1 / number_of_dimensions;
                dimension_to_choose = 0;
                //Choose which dimension to move in
                rnum = this.randomGen.random();
                rnum -= dimension_increment;
                while (rnum > 0) {
                    rnum -= dimension_increment;
                    dimension_to_choose += 1;
                }
                //Choose the direction of movement in the dimension
                rnum = this.randomGen.random();
                if (rnum < prob_right) {
                    entity.position.components[dimension_to_choose] += 1;
                } else {
                    entity.position.components[dimension_to_choose] -= 1;
                }
            }
        }
    }
    return this;
};
