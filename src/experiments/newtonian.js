/**
 * @author sabidib http://github.com/sabidib
 */


/** @constructor */
Flory.Newtonian = function(){
	Flory.Environment.call(this);
	this.meshes = [];
}


Flory.Newtonian.prototype = Object.create(Flory.Environment.prototype);


Flory.Newtonian.constructor = Flory.Newtonian;

Flory.Newtonian.prototype.update = function(additional){
	var len = this.entities.length;
	for(var i = 0;i < len;i++){
		var entity = this.entities[i];
		var tmp = new Flory.Vector();
		if(entity instanceof Flory.Particle){
			for(var j = 0;j < len;j++){
				var entity2 = this.entities[j];
				if(entity2 instanceof Flory.baseField){
					tmp.add(entity2.getForce(entity.position));
				} 
			}
			entity.force = tmp.clone();
			entity.acceleration = entity.force.mult(1.0/entity.mass);
			entity.velocity.add(entity.acceleration.mult(Flory.timestep));
			entity.position.add(entity.velocity.mult(Flory.timestep*0.5));
		}
	}
	return this;
}
