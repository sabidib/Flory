/**
 * @author sabidib http://github.com/sabidib
 */
/**
 * A general vector class that chooses the dimension based on the number of elements
 * in the Flory.Vector.componenets variable.
 * The drawback is that some of the calculations take a little longer and is only compatible
 * with other Flory.Vector objects.
 * @constructor
 * @param {Array} vec An array of number values that represent each component of the vector
 */

/*global Flory*/

'use strict';
Flory.Vector = function (vec) {
    Flory.baseVector.call(this);
    if (vec === undefined) {
        this.components = [];
    } else if (typeof vec === 'number') {
        this.components = new Array(vec);
        var a = this.components;
        var i;
        for (i = 0; i < vec; i += 1) {
            a[i] = 0;
        }
    } else {
        this.components = vec;
    }
};
Flory.Vector.prototype = Object.create(Flory.baseVector.prototype);
Flory.Vector.prototype.constructor = Flory.Vector;
Flory.Vector.prototype.add = function (a) {
    var i = 0;
    var len;
    if (a.components.length > this.components.length) {
        for (len = this.components.length; i < len; i += 1) {
            this.components[i] += a.components[i];
        }
        for (len = a.components.length; i < len; i += 1) {
            this.components[i] = a.components[i];
        }
    } else {
        for (len = a.components.length; i < len; i += 1) {
            this.components[i] += a.components[i];
        }
    }
    return this;
};
Flory.Vector.prototype.sub = function (a) {
    var i = 0;
    var len;
    if (a.components.length > this.components.length) {
        for (len = this.components.length; i < len; i += 1) {
            this.components[i] -= a.components[i];
        }
        for (len = a.components.length; i < len; i += 1) {
            this.components[i] = a.components[i];
        }
    } else {
        for (len = a.components.length; i < len; i += 1) {
            this.components[i] -= a.components[i];
        }
    }
    return this;
};
Flory.Vector.prototype.scale = function (num) {
    var i;
    var len = this.components.length;
    for (i = 0; i < len; i += 1) {
        this.components[i] *= num;
    }
    return this;
};
Flory.Vector.prototype.mult = function (num) {
    var components = [];
    var i;
    var len = this.components.length;
    for (i = 0; i < len; i += 1) {
        components[i] = num * this.components[i];
    }
    return new Flory.Vector(components);
};
Flory.Vector.prototype.dot = function (a) {
    if (a.components.length !== this.components.length) {
        console.log('Flory.vector.dot(a) can only accept a vector of the same dimension as the object.');
        return undefined;
    }
    var sum = 0;
    var i;
    var len = a.components.length;
    for (i = 0; i < len; i += 1) {
        sum += this.components[i] * a.components[i];
    }
    return sum;
};
Flory.Vector.prototype.length = function () {
    var sum = 0;
    var i = 0;
    var len = this.components.length;
    for (i = 0; i < len; i += 1) {
        sum += this.components[i] * this.components[i];
    }
    return Math.sqrt(sum);
};
Flory.Vector.prototype.lengthSq = function () {
    var sum = 0;
    var i;
    var len = this.components.length;
    for (i = 0; i < len; i += 1) {
        sum += this.components[i] * this.components[i];
    }
    return sum;
};
Flory.Vector.prototype.cross = function (vec) {
    if (vec.components[2] === undefined) {
        return new Flory.Vector([
            -this.components[2] * vec.components[1],
            this.components[2] * vec.components[0],
            this.components[0] * vec.components[1] - this.components[1] * vec.components[0]
        ]);
    } else {
        return new Flory.Vector([
            this.components[1] * vec.components[2] - this.components[2] * vec.components[1],
            this.components[2] * vec.components[0] - this.components[0] * vec.components[2],
            this.components[0] * vec.components[1] - this.components[1] * vec.components[0]
        ]);
    }
};
Flory.Vector.prototype.distanceTo = function (a) {
    var sum = 0;
    var i = 0;
    var len;
    var len2;
    if (a.components.length > this.components.length) {
        len = this.components.length;
        len2 = a.components.length;
        while (i < len) {
            sum += (this.components[i] - a.components[i]) * (this.components[i] - a.components[i]);
            i += 1;
        }
        while (i < len2) {
            sum += a.components[i] * a.components[i];
            i += 1;
        }
    } else if (a.components.length < this.components.length) {
        len = a.components.length;
        len2 = this.components.length;
        while (i < len) {
            sum += (this.components[i] - a.components[i]) * (this.components[i] - a.components[i]);
            i += 1;
        }
        while (i < len2) {
            sum += this.components[i] * this.components[i];
            i += 1;
        }
    } else {
        len = a.components.length;
        while (i < len) {
            sum += (this.components[i] - a.components[i]) * (this.components[i] - a.components[i]);
            i += 1;
        }
    }
    return Math.sqrt(sum);
};
Flory.Vector.prototype.distanceToSq = function (a) {
    var sum = 0;
    var i = 0;
    var len, len2;
    if (a.components.length > this.components.length) {
        len = this.components.length;
        len2 = a.components.length;
        while (i < len) {
            sum += (this.components[i] - a.components[i]) * (this.components[i] - a.components[i]);
            i += 1;
        }
        while (i < len2) {
            sum += (0 - a.components[i]) * (0 - a.components[i]);
            i += 1;
        }
    } else if (a.components.length < this.components.length) {
        len = a.components.length;
        len2 = this.components.length;
        while (i < len) {
            sum += (this.components[i] - a.components[i]) * (this.components[i] - a.components[i]);
            i += 1;
        }
        while (i < len2) {
            sum += (this.components[i] - 0) * (this.components[i] - 0);
            i += 1;
        }
    } else {
        len = a.components.length;
        while (i < len) {
            sum += (this.components[i] - a.components[i]) * (this.components[i] - a.components[i]);
            i += 1;
        }
    }
    return sum;
};
Flory.Vector.prototype.zero = function () {
    var i;
    var len = this.components.length;
    for (i = 0; i < len; i += 1) {
        this.components[i] = 0;
    }
    return this;
};
Flory.Vector.prototype.negate = function () {
    var i;
    var len = this.components.length;
    for (i = 0; i < len; i += 1) {
        this.components[i] = -this.components[i];
    }
    return this;
};
Flory.Vector.prototype.normalize = function () {
    var length = this.length();
    var i;
    var len = this.components.length;
    for (i = 0; i < len; i += 1) {
        this.components[i] = this.components[i] / length;
    }
    return this;
};
Flory.Vector.prototype.clone = function () {
    return new Flory.Vector(this.components.slice(0));
};
