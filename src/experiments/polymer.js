/**
 * @author sabidib http://github.com/sabidib
 */


/** @constructor */
Flory.Polymer = function(seed,step_size,bondLength,springScalar,sigma,epsilon){
	Flory.Environment.call(this);
	this.randomGen = new Flory.RandomGen(seed);
	this.step_size = (step_size != undefined) ? step_size : 1;
	this.data['bondPairs'] = [];
	this.springConstant = springScalar;
	this.bondLength = bondLength;
	this.sigma= sigma;
	this.epsilon = epsilon;
}


Flory.Polymer.prototype = Object.create(Flory.Environment.prototype);

Flory.Polymer.prototype.constructor = Flory.Polymer;

Flory.Polymer.prototype.removedEntity = function(entity,id,index){
	if(this.visualization){
		this.renderer.removeRenderable(id);
	}
}

Flory.Polymer.prototype.addedEntity = function(entity){
	if(this.visualization){	
		entity.mesh = this.generateMonomerMesh(entity,this.data.visualization_data);
		this.renderer.addRenderable(entity);
	}
	return this;
}


Flory.Polymer.prototype.addedEntityPair = function(entity1,entity2){
	if(this.visualization){	
		entity.mesh = this.generateMonomerMesh(entity,this.data.visualization_data);
		this.renderer.addRenderable(entity);
	}
	return this;
}

Flory.Polymer.prototype.createBondBetweenEntities = function(entity1,entity2,length) {
	var entity1Exists = false;
	var entity2Exists = false;
	var entity2Index = 0;
	var entity1Index = 0;
	for(var i = 0, len = this.entities.length; i  < len ; i++){
		if(this.entities[i].id === entity2.id){
			entity2Exists = true;
			entity2Index = i;
		}
		if(this.entities[i].id === entity1.id){
			entity1Exists = true;
			entity1Index = i;
		}
	}
	if(entity1Exists && entity2Exists){
		this.data['bondPairs'].push([entity1Index,entity2Index,length]);		
	} else {
		console.log("Flory : Could not create bond between entities because the entities are not added to environment.")
	}
	
	return this;
};


Flory.Polymer.prototype.generateMonomerMesh = function(entity,settings){

	if(entity instanceof Flory.Monomer || entity instanceof Flory.Monomer2D || entity instanceof Flory.Monomer3D){
		var material = {};
		var geometry = {};

        var segments = (settings != undefined && typeof settings.segments == "number" ) ? settings.segments : 20;

        var dim = entity.position.dimension();
        if(dim >= 3){
            geometry = new THREE.SphereGeometry(entity.radius,segments,segments);
        } else {
            geometry = new THREE.CircleGeometry(entity.radius, segments, 0, 2*3.14159265359);
        }

        var color_of_mesh = (settings != undefined && typeof settings.color == "number" ) ? settings.color : 0xFF0000;
        
        if(settings == undefined){
            material = new THREE.MeshBasicMaterial({color : color_of_mesh});
        } else if(settings.material != undefined && settings.materials instanceof THREE.Material){
            material = settings.material;
        } else {
            material = new THREE.MeshBasicMaterial({color : color_of_mesh});        
        }
        return new THREE.Mesh(geometry, material); 
	} else {	
		return undefined;
	}
}

Flory.Polymer.prototype.setUpVisualization = function(data){
	this.data.visualization_data = data;
	for(var i = 0; i  < this.entities.length; i++){
		this.entities[i].mesh = this.generateMonomerMesh(this.entities[i],data);
		this.renderer.addRenderable(this.entities[i]);
	}
}

Flory.Polymer.prototype.disabledVisualization = function(){
	for(var i = 0; i  < this.entities.length; i++){
		this.renderer.removeRenderable(this.entity[i]);
	}
	this.data.visualization_data = undefined;
	delete this.data.visualization_data;
}

Flory.Polymer.prototype.update = function(additional){
	var len = this.data["bondPairs"].length;
	var entity;
	var number_of_dimensions;
	var dimension_increment;
	var dimension_to_choose;
	var rnum;
	var number_of_steps = 1;

	if(additional.number_of_steps != undefined){
		number_of_steps = additional.number_of_steps;
	}

	for(var k = 0; k < number_of_steps;k++){
		for( var i = 0;i<len;i++){
			pair = this.data["bondPairs"][i];
			entity1 = this.entities[pair[0]];
			entity2 = this.entities[pair[1]];
			entity2.applyForce((entity1.position.clone().sub(entity2.position)).mult(this.springConstant*(entity1.distanceTo(entity2)-pair[2])) ,Flory.timestep);
			entity1.applyForce(entity1.position.clone().sub(entity2.position).mult(-this.springConstant*(entity1.distanceTo(entity2)-pair[2])),Flory.timestep);
		}

		for(var i = 0, len = this.entities.length;i < len;i++){
			var entity = this.entities[i];
			if(entity instanceof Flory.Monomer){
				for(var j = 0, len = this.entities.length;j < i;j++){
					var entity2 = this.entities[j];
					if(entity2 instanceof Flory.Monomer){
						var r = entity2.position.clone().sub(entity.position);
						var r_mag = r.length();

						if(r_mag > Flory.Polymer.far_cutoff_distance){
							continue;
						}

						var sigma_over_r = (this.sigma/r_mag);
						var force = r.scale((-24*this.epsilon/(r_mag*r_mag))*(2*Math.pow(sigma_over_r,12) - Math.pow(sigma_over_r,6)));
						entity.applyForce(force,Flory.timestep);
						entity2.applyForce(force.negate(),Flory.timestep);
					} 
				}
			}
		}


		for(var i =0 ; i < this.entities.length;i++){
			this.entities[i].velocity.add(this.entities[i].acceleration.mult(Flory.timestep));
			this.entities[i].position.add(this.entities[i].velocity.mult(Flory.timestep*0.5));
			if(this.visualization){
				this.renderer.updateRenderablePosition(this.entities[i]);
			}
		}

	}

	if(this.visualization){
		this.renderer.render();
	}
	return this;
}



Flory.Polymer.prototype.resetEnvironment = function(){
	this.entities = [];
	
}


Flory.Polymer.far_cutoff_distance = 5;
Flory.Polymer.default_sigma = 1;
Flory.Polymer.default_epsilon = 1;

