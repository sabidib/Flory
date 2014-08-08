/**
 * @author sabidib
 */

Flory.Entity = function(){
	this.id = Flory.Entity.entityIDCount++;
	this.name = '';
	this.position = {};
	this.velocity = {};
	this.acceleration = {};
	this.charge = 0;
}

Flory.Entity.prototype = {
	update : function(){

	}
}






Flory.Entity.entityIDCount = 0;


