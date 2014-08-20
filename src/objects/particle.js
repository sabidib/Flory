/**
 * @author sabidib
 */

Flory.Particle = function(){
	Flory.Entity.call(this);
	this.position = {};
	this.velocity = {};
	this.acceleration = {};

	this.radius = {};
	this.charge = {};
	this.mass = {};
}


Flory.Particle.prototype = Object.create(Flory.Entity.prototype);


