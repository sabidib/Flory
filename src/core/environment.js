/**
 * @author sabidib
 */

/** @constructor */
Flory.Environment = function() {
    Flory._CoreEnvironment.call(this);
}

Flory.Environment.prototype = Object.create(Flory._CoreEnvironment.prototype);


Flory.Environment.prototype.constructor = Flory.Environment;


Flory.Environment.prototype.removedEntity = function(entity, id, index) {
	if(this.visualization){
		this.renderer.removeRenderable(id);
	}
	return this;
}


Flory.Environment.prototype.addedEntity = function(entity) {
	if(this.visualization){	
		this.renderer.addRenderable(entity);
	}
	return this;
}


Flory.Environment.prototype.update = function(data) {

}


Flory.Environment.prototype.setUpVisualization = function(data) {
	this.data.visualization_data = data;
	for(var i = 0; i  < this.entities.length; i++){
		this.renderer.addRenderable(this.entities[i]);
	}
}


Flory.Environment.prototype.disabledVisualization = function() {
	for(var i = 0; i  < this.entities.length; i++){
		this.renderer.removeRenderable(this.entity[i]);
	}
	this.data.visualization_data = undefined;
	delete this.data.visualization_data;
}


Flory.Environment.prototype.resetEnvironment = function() {


}



