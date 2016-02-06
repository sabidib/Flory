/**
 * @author sabidib http://github.com/sabidib
 */
/** @constructor */
/*global Flory*/
/*jslint white*/
'use strict';

Flory.PairWiseField = function (field_function) {
    Flory.baseField.call(this, []);
    this.scaler = 1;
    this.field_function = (field_function !== undefined) ? field_function : function () {};
};
Flory.PairWiseField.prototype = Object.create(Flory.baseField.prototype);
Flory.PairWiseField.prototype.constructor = Flory.PairWiseField;
Flory.PairWiseField.prototype.getForce = function (entity_1,entity_2) {
    return this.field_function(entity_1,entity_2).mult(this.scaler);
};
Flory.PairWiseField.prototype.scale = function (num) {
    if (typeof num === 'number') {
        this.scaler = num;
    }
    return this;
};
Flory.PairWiseField.prototype.clone = function () {
    return new Flory.PairWiseField(this.field_function);
};
