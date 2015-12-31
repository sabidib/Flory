/**
 * @author sabidib
 */

/** @constructor */
Flory.Renderable = function(){
	Flory.baseEntity.call(this);
	this.mesh = {};
	this.geometry = {};
	this.material = {};
	this.updateGeometry = true;
}


Flory.Renderable.prototype = Object.create(Flory.baseEntity.prototype);

Flory.Renderable.prototype.constructor = Flory.Renderable;

