/**
 * @author sabidib http://github.com/sabidib
 */

/**
 * Creates a field where a vector is associated with an approximate position.
 * @constructor 
 * @param {Array} data Each element of the data array must be an object containing
 *                     a |position| and a |vector| property. 
 */
Flory.Field3D = function(data) {
    Flory.baseField.call(this);


    for (var i = 0, len = data.length; i < len; i++) {
        this.field[i] = {}

        if (data[i].position == undefined) {
            this.field[i].position = new Flory.Vector3(data[i][0][0], data[i][0][1], data[i][0][2]);
        } else if (data[i].position instanceof Array) {
            this.field[i].position = new Flory.Vector3(data[i].position[0], data[i].position[1], data[i].position[2]);
        } else if (data[i].position instanceof baseVector) {
            if (data[i].position instanceof Flory.Vector2) {
                this.field[i].position = new Flory.Vector3([data[i].position.x, data[i].position.y,0])
            } else if (data[i].position instanceof Flory.Vector) {
                this.field[i].position = new Flory.Vector3([data[i].position.components[0], data[i].position.components[1], data[i].position.components[2]])
            } else {
                this.field[i].position = data[i].position.clone();
            }
        } else {
            console.log("Flory: data.position is not an Array or a descendant of Flory.baseVector");
            return undefined;
        }

        if (data[i].vector == undefined) {
            this.field[i].vector = new Flory.Vector3(data[i][1][0], data[i][1][1], data[i][1][2]);
        } else if (data[i].vector instanceof Array) {
            this.field[i].vector = new Flory.Vector3(data[i].vector[0], data[i].vector[1], data[i].vector[2]);
        } else if (data[i].vector.x != undefined || data[i].vector.y != undefined || data[i].postiion.z != undefined) {
            this.field[i].vector = data[i].vector.clone();
        } else if (data[i].vector instanceof baseVector) {
            if (data[i].vector instanceof Flory.Vector2) {
                this.field[i].vector = new Flory.Vezctor3([data[i].vector.x, data[i].vector.y,0])
            } else if (data[i].vector instanceof Flory.Vector) {
                this.field[i].vector = new Flory.Vector3([data[i].vector.components[0], data[i].vector.components[1], data[i].vector.components[2]])
            } else {
                this.field[i].vector = data[i].vector.clone();
            }
        } else {
            console.log("Flory: data.vector is not an Array or a descendant of Flory.baseVector");
            return undefined;
        }
    }
};


Flory.Field3D.prototype = Object.create(Flory.baseField.prototype);

Flory.Field3D.prototype.constructor = Flory.Field3D;


Flory.Field3D.prototype.clone = function() {
    return new Flory.Field3D(this.field);
};
