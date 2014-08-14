/**
 * @author sabidib
 */

/** @constructor */
Flory.Entity = function(){
	Flory.Renderable.call(this);
	this.id = Flory.Entity.entityIDCount++;
	this.name = '';
	this.data = {};
}

Flory.Entity.prototype = Object.create(Flory.Renderable.prototype);

Flory.Entity.prototype.update = function(data){
		return undefined;
	}

Flory.Entity.entityIDCount = 0;


