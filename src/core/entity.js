/**
 * @author sabidib
 */

/** @constructor */
Flory.Entity = function(){
	Flory.baseEntity.call(this);
	this.data = {};
}

Flory.Entity.prototype = Object.create(Flory.baseEntity.prototype);

Flory.Entity.prototype.constructor = Flory.Entity;

