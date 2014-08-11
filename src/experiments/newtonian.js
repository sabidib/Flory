/**
 * @author sabidib
 */


/** @constructor */
Flory.Newtonian = function(){
	Flory.Environment.call(this);
}


Flory.Newtonian.prototype = Object.create(Flory.Environment.prototype);


Flory.Newtonian.constructor = Flory.Newtonian;


Flory.Newtonian.prototype.update = function(additional){
	for(var i = 0, len = this.entities.length;i < len;i++){
		var entity = this.entities[i];
		var tmp = new Flory.Vector();
		if(entity instanceof Flory.Monomer){
			for(var j = 0, len = this.entities.length;j < len;j++){
				var entity2 = this.entities[j];
				if(entity2 instanceof Flory.Field){
					var field = entity2;
					tmp.add(field.getForce(entity.position));
				} 
			}
			entity.force = tmp.clone();
		}
	}
	for(var i = 0 , len = this.entities.length; i < len; i++){
		var entity = this.entities[i];
		if(entity instanceof Flory.Monomer){
			entity.acceleration = entity.force.mult(1.0/entity.mass);
			entity.velocity.add(entity.acceleration.mult(Flory.timestep));
			entity.position.add(entity.velocity.mult(Flory.timestep*0.5));
		}
	}
	return this;
}