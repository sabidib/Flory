/**
 * @author sabidib
 */


/** @constructor */
Flory.RandomWalk = function(seed,step_size){
	Flory.Environment.call(this);
	this.randomGen = new Flory.RandomGen(seed);
	this.step_size = (step_size != undefined) ? step_size : 1;
}


Flory.RandomWalk.prototype = Object.create(Flory.Environment.prototype);

Flory.RandomWalk.prototype.constructor = Flory.RandomWalk;

Flory.RandomWalk.prototype.removedEntity = function(entity,id,index){
	if(this.visualization){
		this.renderer.removeRenderable(id);
	}
}

Flory.RandomWalk.prototype.addedEntity = function(entity){
	if(this.visualization){	
		entity.mesh = this.generateMonomerMesh(entity,this.data.visualization_data);
		this.renderer.addRenderable(entity);
	}
	return this;
}


Flory.RandomWalk.prototype.generateMonomerMesh = function(entity,settings){

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

Flory.RandomWalk.prototype.setUpVisualization = function(data){
	this.data.visualization_data = data;
	for(var i = 0; i  < this.entities.length; i++){
		this.entities[i].mesh = this.generateMonomerMesh(this.entities[i],data);
		this.renderer.addRenderable(this.entities[i]);
	}
}

Flory.RandomWalk.prototype.disabledVisualization = function(){
	for(var i = 0; i  < this.entities.length; i++){
		this.renderer.removeRenderable(this.entity[i]);
	}
	this.data.visualization_data = undefined;
	delete this.data.visualization_data;
}

Flory.RandomWalk.prototype.update = function(additional){
	var len = this.entities.length;
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
			entity = this.entities[i];
			if(entity instanceof Flory.Monomer){
				number_of_dimensions = entity.position.dimension();
				dimension_increment = (1.0/number_of_dimensions);
				dimension_to_choose = 0;
				rnum = this.randomGen.random();
				rnum -= dimension_increment;
				while(rnum > 0){
					rnum -= dimension_increment;
					dimension_to_choose++;
				}
				//Choose the direction of movement in the dimension
				rnum = this.randomGen.random();
				if(rnum < 0.5){
					entity.position.components[dimension_to_choose]++;
				} else {
					entity.position.components[dimension_to_choose]--;
				} 

				if(this.visualization){
					this.renderer.updateRenderablePosition(this.entities[i]);
				}
			}
		}
	}

	if(this.visualization){
		this.renderer.render();
	}
	return this;
}

