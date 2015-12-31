/**
 * @author sabidib
 */

Flory.Particle = function(name){
	Flory.Renderable.call(this);
	this.position = {};
	this.velocity = {};
	this.acceleration = {};

	this.radius = {};
	this.charge = {};
	this.mass = {};
	
	this.name = (name == undefined ? "Particle" : name);
}



Flory.Particle.prototype = Object.create(Flory.Renderable.prototype);


Flory.Particle.prototype.setDefaultMesh = function(){

}

