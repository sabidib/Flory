/**
 * @author sabidib http://github.com/sabidib
 */
/*global Flory*/
/** @constructor */
'use strict';
Flory.Entity = function () {
    Flory.baseEntity.call(this);
    this.data = {};
};
Flory.Entity.prototype = Object.create(Flory.baseEntity.prototype);
Flory.Entity.prototype.constructor = Flory.Entity;
