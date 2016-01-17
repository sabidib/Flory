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
Flory.Field2D.prototype.clone = function () {
    return new Flory.Field2D(this.data);
};
