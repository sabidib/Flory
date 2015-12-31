/**
 * @author sabidib
 */

/** @constructor */
Flory.Vector3 = function(x, y, z) {
    Flory.baseVector.call(this);
    if (x instanceof Object && x == undefined && z == undefined) {
        y = x.y
        z = x.z;
        x = x.x
    }
    this.x = (x === undefined) ? 0 : x;
    this.y = (y === undefined) ? 0 : y;
    this.z = (z === undefined) ? 0 : z;
    this.components = [this.x, this.y, this.z];
}



Flory.Vector3.prototype = Object.create(Flory.baseVector.prototype);

Flory.Vector3.prototype.constructor = Flory.Vector3;

//** Mandatory for all vector classes **//

Flory.Vector3.prototype.add = function(a) {
    this.x += a.x;
    this.y += a.y;
    this.z += a.z;

    return this;
}

Flory.Vector3.prototype.sub = function(a) {
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z;

    return this;
}

Flory.Vector3.prototype.scale = function(num) {
    this.x *= num;
    this.y *= num;
    this.z *= num;

    return this;
}
Flory.Vector3.prototype.mult = function(num) {
    return new Flory.Vector3(this.x * num, this.y * num, this.z * num);
}

Flory.Vector3.prototype.dot = function(a) {
    return (this.x * a.x + this.y * a.y + this.z * a.z);
}

Flory.Vector3.prototype.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}

Flory.Vector3.prototype.lengthSq = function() {
    return (this.x * this.x + this.y * this.y + this.z * this.z);
}

Flory.Vector3.prototype.distanceTo = function(a) {
    return Math.sqrt((a.x - this.x) * (a.x - this.x) + (a.y - this.y) * (a.y - this.y) + (a.z - this.z) * (a.z - this.z));
}

Flory.Vector3.prototype.distanceToSq = function(a) {
    return ((a.x - this.x) * (a.x - this.x) + (a.y - this.y) * (a.y - this.y) + (a.z - this.z) * (a.z - this.z));
}

Flory.Vector3.prototype.zero = function() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    return this;
}
Flory.Vector3.prototype.negate = function() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
}
Flory.Vector3.prototype.clone = function() {
    return new Flory.Vector3(this.x, this.y, this.z);
}
