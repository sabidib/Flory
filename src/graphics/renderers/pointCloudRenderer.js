/**
 * @author sabidib
 */

/** @constructor */
Flory.PointCloudRenderer = function(canvas){
	Flory.Renderer.call(this,canvas);
	this.data.particles = new THREE.Geometry();
	this.data.pMaterial = new THREE.PointCloudMaterial({color : 0xFF0000, size:2});
	this.data.particle_system = new THREE.PointCloud(this.data.particles,this.data.pMaterial);
}

Flory.PointCloudRenderer.prototype = Object.create(Flory.Renderer.prototype);

Flory.PointCloudRenderer.prototype.updatePointPositions  = function(entities){
	
	if(entities != undefined){
		for(var i = 0, len = entities.length; i < len;i++){
			this.data.particles.vertices[i] = new THREE.Vector3(entities[i].position.components[0],entities[i].position.components[1],entities[i].position.components[2]);	
		}
		this.data.particle_system.geometry.verticesNeedUpdate = true;
	}

	return this;
}

Flory.PointCloudRenderer.prototype.updatePointList = function(entities){
	if(entities == undefined){
		return this;
	}
	this.data.particles = new THREE.Geometry();
	this.data.pMaterial = new THREE.PointCloudMaterial({color : 0xFF0000, size:2});

	for(var i = 0, len = entities.length; i < len;i++){
		if(entities[i] instanceof Flory.Monomer){
			this.data.particles.vertices.push(new THREE.Vector3(entities[i].position.components[0],entities[i].position.components[1],entities[i].position.components[2]));		
		}
	}

	this.scene.remove(this.data.particle_system);
	for(var i in this.renderables){
		if(this.renderables[i].id == this.data.particle_system.id){
			this.renderables[i] = undefined;
			delete this.renderables[i];
			break;
		} 
	}
	this.data.particle_system = new THREE.PointCloud(this.data.particles,this.data.pMaterial);
	this.scene.add(this.data.particle_system);
	this.renderables[this.data.particle_system.id]= this.data.particle_system;
	return this;
}






