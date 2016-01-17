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
Flory.Field = function (data) {
    Flory.baseField.call(this);
    var len = data.length;
    var i;
    for (i = 0; i < len; i += 1) {
        this.field[i] = {};
        if (data[i].position === undefined) {
            this.field[i].position = new Flory.Vector(data[i][0]);
        } else if (data[i].position instanceof Array) {
            this.field[i].position = new Flory.Vector(data[i].position);
        } else if (data[i].position instanceof Flory.baseVector) {
            if (data[i].position instanceof Flory.Vector2) {
                this.field[i].position = new Flory.Vector([
                    data[i].position.x,
                    data[i].position.y
                ]);
            } else if (data[i].position instanceof Flory.Vector3) {
                this.field[i].position = new Flory.Vector([
                    data[i].position.x,
                    data[i].position.y,
                    data[i].position.z
                ]);
            } else {
                this.field[i].position = data[i].position.clone();
            }
        } else {
            console.log('Flory: data.position is not an Array or a descendant of Flory.baseVector');
            return undefined;
        }
        if (data[i].vector === undefined) {
            this.field[i].vector = new Flory.Vector(data[i][1]);
        } else if (data[i].vector instanceof Array) {
            this.field[i].vector = new Flory.Vector(data[i].vector);
        } else if (data[i].vector instanceof Flory.baseVector) {
            if (data[i].vector instanceof Flory.Vector2) {
                this.field[i].vector = new Flory.Vector([
                    data[i].vector.x,
                    data[i].vector.y
                ]);
            } else if (data[i].vector instanceof Flory.Vector3) {
                this.field[i].vector = new Flory.Vector([
                    data[i].vector.x,
                    data[i].vector.y,
                    data[i].vector.z
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
Flory.Field.prototype = Object.create(Flory.baseField.prototype);
Flory.Field.prototype.constructor = Flory.Field;
Flory.Field.prototype.clone = function () {
    return new Flory.Field(this.field);
};
