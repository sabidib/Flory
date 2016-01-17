/**
 * @author sabidib http://github.com/sabidib
 */
/** @constructor */
/*global Flory*/

'use strict';
Flory.baseVector = function () {
    this.components = [];
};
Flory.baseVector.prototype.constructor = Flory.baseVector;
Flory.baseVector.prototype = {
    dimension: function () {
        return this.components.length;
    }
};
