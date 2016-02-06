/**
 * @author sabidib http://github.com/sabidib
 */
/**
 * Creates a field where a vector is associated with an approximate position.
 * @constructor
 * @param {Array} data Each element of the data array must be an object containing
 *                     a |position| and a |vector| property.
 */
/*global Flory*/

    'use strict';
Flory.Field2D = function (data) {
    Flory.baseField.call(this);
    var len = data.length;
    var i;
    for (i = 0; i < len; i += 1) {
        this.field[i] = {};
        if (data[i].position === undefined) {
            this.field[i].position = new Flory.Vector2(data[i][0][0], data[i][0][1]);
        } else if (data[i].position instanceof Array) {
            this.field[i].position = new Flory.Vector2(data[i].position[0], data[i].position[1]);
        } else if (data[i].position instanceof Flory.baseVector) {
            if (data[i].position instanceof Flory.Vector3) {
                this.field[i].position = new Flory.Vector2([
                    data[i].position.x,
                    data[i].position.y
                ]);
            } else if (data[i].position instanceof Flory.Vector) {
                this.field[i].position = new Flory.Vector2([
                    data[i].position.components[0],
                    data[i].position.components[1]
                ]);
            } else {
                this.field[i].position = data[i].position.clone();
            }
        } else {
            console.log('Flory: data.position is not an Array or a descendant of Flory.baseVector');
            return undefined;
        }
        if (data[i].vector === undefined) {
            this.field[i].vector = new Flory.Vector2(data[i][1][0], data[i][1][1]);
        } else if (data[i].vector instanceof Array) {
            this.field[i].vector = new Flory.Vector2(data[i].vector[0], data[i].vector[1]);
        } else if (data[i].vector instanceof Flory.baseVector) {
            if (data[i].vector instanceof Flory.Vector3) {
                this.field[i].vector = new Flory.Vector2([
                    data[i].vector.x,
                    data[i].vector.y
                ]);
            } else if (data[i].vector instanceof Flory.Vector) {
                this.field[i].vector = new Flory.Vector2([
                    data[i].vector.components[0],
                    data[i].vector.components[1]
                ]);
            } else {
                this.field[i].vector = data[i].vector.clone();
            }
        } else {
            console.log('Flory: data.vector is not an Array or a descendant of Flory.baseVector');
            return undefined;
        }
    }
};
Flory.Field2D.prototype = Object.create(Flory.baseField.prototype);
Flory.Field2D.prototype.constructor = Flory.Field2D;
/**
 * Returns the force at the given position
 * by finding the closest point to the given position and returning
 * the associated vector
 *
 * @param  {base.Particle} entity
 * @return {baseVector}     The force at the given position
 */
Flory.Field2D.prototype.getForce = function (entity) {
    var closest = 0;
    var index_of_closest = 0;
    var len = this.field.length;
    var i;
    var cur_dist;
    var position = new Flory.Vector2(entity.position.clone().components;
    if(len > 0){
        closest = this.field[0].position.distanceToSq(position);    
    } else {
        return new Flory.Vector2(0,0);
    }
    for (i = 1; i < len; i += 1) {
        cur_dist = this.field[i].position.distanceToSq(position);
        if (cur_dist <= closest) {
            index_of_closest = i;
            closest = cur_dist;
        }
    }
    return this.field[index_of_closest].vector;
};

Flory.Field2D.prototype.clone = function () {
    return new Flory.Field2D(this.data);
};
