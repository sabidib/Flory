/**
 * @author sabidib http://github.com/sabidib
 */
/*global Flory*/


'use strict';
Flory.baseField = function () {
    Flory.Entity.call(this);
    this.data.field = [];
    this.field = this.data.field;
};
Flory.baseField.prototype = Object.create(Flory.Entity.prototype);
Flory.baseField.prototype.constructor = Flory.baseField;
/**
 * Returns the force at the given position
 * by finding the closest point to the given position and returning
 * the associated vector
 *
 * @param  {baseVector} position
 * @return {baseVector}     The force at the given position
 */
Flory.baseField.prototype.getForce = function (position) {
    var closest = 0;
    var index_of_closest = 0;
    var len = this.field.length;
    var i;
    var cur_dist;
    for (i = 0; i < len; i += 1) {
        cur_dist = this.field[i].position.distanceToSq(position);
        if (cur_dist <= closest) {
            index_of_closest = i;
            closest = cur_dist;
        }
    }
    return this.field[index_of_closest].vector;
};
Flory.baseField.prototype.scale = function (num) {
    var len = this.field.length;
    var i;
    for (i = 0; i < len; i += 1) {
        this.field.vector.scale(num);
    }
};
