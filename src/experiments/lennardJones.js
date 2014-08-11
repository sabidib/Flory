/**
 * @author sabidib
 */


/** @constructor */
Flory.LennardJones = function(epsilon,sigma){
	Flory.Environment.call(this);
	this.epsilon = (epsilon != undefined) ? epsilon : Flory.LennardJones.default_epsilon;
	this.sigma = (sigma != undefined) ? sigma  : Flory.LennardJones.default_sigma;
}


Flory.LennardJones.prototype = Object.create(Flory.Environment.prototype);

Flory.LennardJones.prototype.constructor = Flory.LennardJones;

Flory.LennardJones.prototype.update = function(additional){
	for(var i = 0, len = this.entities.length;i < len;i++){
		var entity = this.entities[i];
		var tmp = new Flory.Vector(this.entities[i].position.dimension());
		if(entity instanceof Flory.Monomer){
			for(var j = 0, len = this.entities.length;j < len;j++){
				var entity2 = this.entities[j];
				if(entity2 instanceof Flory.Monomer){
					if(entity2.id == entity.id){
						continue;
					}

					var r = entity2.position.clone().sub(entity.position);
					var r_mag = r.length();

					if(r_mag > Flory.LennardJones.far_cutoff_distance){
						continue;
					}

					var sigma_over_r = (this.sigma/r_mag);
					var force = r.scale((24*this.epsilon/(r_mag*r_mag))*(2*Math.pow(sigma_over_r,12) - Math.pow(sigma_over_r,6)));
					tmp.add(force);
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


Flory.LennardJones.far_cutoff_distance = 100;
Flory.LennardJones.default_sigma = 1;
Flory.LennardJones.default_epsilon = 1;

