/**
 * @author sabidib
 */


/** @constructor */
Flory.Newtonian2D = function(){
	Flory.Environment.call(this);
}


Flory.Newtonian2D.prototype = Object.create(Flory.Environment.prototype);


Flory.Newtonian2D.constructor = Flory.Newtonian2D;


Flory.Newtonian2D.prototype.update = function(additional){
	for(var i = 0, len = this.entities.length;i < len;i++){
		var entity = this.entities[i];
		var tmp = new Flory.Vector2();
		if(entity instanceof Flory.Monomer2D){
			for(var j = 0, len = this.entities.length;j < len;j++){
				var entity2 = this.entities[j];
				if(entity2 instanceof Flory.Field2D){
					var field = entity2;
					tmp.add(field.getForce(entity.position));
				} 
			}
			entity.force = tmp.clone();
		}
	}
	for(var i = 0 , len = this.entities.length; i < len; i++){
		var entity = this.entities[i];
		if(entity instanceof Flory.Monomer2D){
			entity.acceleration = entity.force.mult(1.0/entity.mass);
			entity.velocity.add(entity.acceleration.mult(Flory.timestep));
			entity.position.add(entity.velocity.mult(Flory.timestep*0.5));
			if(this.visualization){
				this.renderer.updateRenderablePosition(this.entities[i]);
			}
		}
	}
	if(this.visualization){
		this.renderer.render();
	}
	return this;
};
