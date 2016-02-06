/**
 * @author sabidib http://github.com/sabidib
 */
/** @constructor */
/*global Flory*/
/*jslint white*/

'use strict';
Flory.generic_class_name_you_choose = function () {
    Flory.Environment.call(this);

};

//This will bring in all the methods from the parent
Flory.generic_class_name_you_choose.prototype = Object.create(Flory.Environment.prototype);

Flory.generic_class_name_you_choose.prototype.constructor = Flory.generic_class_name_you_choose;

Flory.generic_class_name_you_choose.prototype.update = function () {
    //Here is where you update the position of the
    //this.entities array.
    return this;
};

//......
//......
//......
//Other methods you override...
//......
//......
//......



Flory.generic_class_name_you_choose.a_static_variable = 100;
