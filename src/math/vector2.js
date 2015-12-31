/**
 * @author sabidib
 */

/** @constructor */
Flory.Vector2 = function(x, y) {
    Flory.baseVector.call(this);
    if (x instanceof Object && x == undefined) {
        y = x.y
        x = x.x
    }
    this.x = (x === undefined) ? 0 : x;
    this.y = (y === undefined) ? 0 : y;
    this.components = [this.x, this.y];
}


Flory.Vector2.prototype = Object.create(Flory.baseVector.prototype);

Flory.Vector2.prototype.constructor = Flory.Vector2;

Flory.Vector2.prototype.add = function(a) {
    this.x += a.x;
    this.y += a.y;

    return this;
}

Flory.Vector2.prototype.sub = function(a) {
    this.x -= a.x;
    this.y -= a.y;

    return this;
}
Flory.Vector2.prototype.scale = function(num) {
    this.x *= num;
    this.y *= num;

    return this;
}
Flory.Vector2.prototype.mult = function(num) {
    return new Flory.Vector2(this.x * num, this.y * num);
}
Flory.Vector2.prototype.dot = function(a) {
    return this.x * a.x + this.y * a.y;
}

Flory.Vector2.prototype.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
}

Flory.Vector2.prototype.lengthSq = function() {
    return this.x * this.x + this.y * this.y;
}

Flory.Vector2.prototype.distanceTo = function(a) {
    return Math.sqrt((a.x - this.x) * (a.x - this.x) + (a.y - this.y) * (a.y - this.y));
}

Flory.Vector2.prototype.distanceToSq = function(a) {
    return ((a.x - this.x) * (a.x - this.x) + (a.y - this.y) * (a.y - this.y));
}
Flory.Vector2.prototype.zero = function() {
    this.x = 0;
    this.y = 0;
    return this;
}
Flory.Vector2.prototype.negate = function() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
}
Flory.Vector2.prototype.clone = function() {
    return new Flory.Vector2(this.x, this.y);
}
