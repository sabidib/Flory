/**
 * @author sabidib
 */


/** @constructor */
Flory.Newtonian = function(){
	Flory.Environment.call(this);
	this.meshes = [];
}


Flory.Newtonian.prototype = Object.create(Flory.Environment.prototype);


Flory.Newtonian.constructor = Flory.Newtonian;

Flory.Newtonian.prototype.addedEntity = function(entity){
	if(this.visualization){
		if(entity instanceof Flory.Monomer || entity instanceof Flory.Monomer2D || entity instanceof Flory.Monomer3D){
		    this.meshes.push(this.generateMonomerMesh(entity));
			this.addRenderable(entity);
		}
	}
	return this;
}

Flory.Newtonian.prototype.generateMonomerMesh = function(entity,settings){
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

Flory.Newtonian.prototype.removedEntity = function(entity,id,index){
	if(this.meshes.length != 0){
		if(this.visualization){
			this.renderer.scene.remove(this.meshes[index]);
		}
		this.meshes.splice(index);
	}
}

Flory.Newtonian.prototype.disabledVisualization = function(){
	for(var i = 0, len = this.meshes.length;i <len;i++){
		this.renderer.scene.remove(this.meshes[i]);
	}
	this.meshes = [];
}

Flory.Newtonian.prototype.setUpVisualization = function(data){
	for(var i = 0, len = this.entities.length;i < len;i++){
		var entity = this.entities[i];
		if(entity instanceof Flory.Monomer || entity instanceof Flory.Monomer2D || entity instanceof Flory.Monomer3D){
		    var mesh = this.generateMonomerMesh(this.entities[i]);
		    this.meshes.push(mesh);
		    this.entities[i].mesh = mesh;
		    this.renderer.addRenderable(this.entities[i]);
		}		
	}
}

Flory.Newtonian.prototype.update = function(additional){
	var len = this.entities.length;
	for(var i = 0;i < len;i++){
		var entity = this.entities[i];
		var tmp = new Flory.Vector();
		if(entity instanceof Flory.Monomer){
			for(var j = 0;j < len;j++){
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
			if(this.visualization){
				this.renderer.updateRenderablePosition(entity);
			}
		}
	}
	
	if(this.visualization){
		this.renderer.render()
	}

	return this;
}
