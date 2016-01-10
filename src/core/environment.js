/**
 * @author sabidib http://github.com/sabidib
 */

/** @constructor */
Flory.Environment = function(handler) {
    Flory._CoreEnvironment.call(this);
    if(handler !== undefined){
    	this.handler = this.addHandler(handler);
    } else {
    	this.handler = [];
    }
}

Flory.Environment.prototype = Object.create(Flory._CoreEnvironment.prototype);


Flory.Environment.prototype.constructor = Flory.Environment;


Flory.Environment.prototype.addHandler = function(handler){
	if(handler !== undefined){
		this.handler.push(handler);
	}
}

Flory.Environment.prototype.removedEntity = function(entity, id, index) {
	if(this.visualization && entity instanceof Flory.Renderable){
		this.renderer.removeRenderable(id);
	}
	return this;
}


Flory.Environment.prototype.addedEntity = function(entity) {
	if(this.visualization && entity instanceof Flory.Renderable){	
		this.renderer.addRenderable(entity);
	}
	return this;
}

Flory.Environment.prototype.update = function(data) {
	for (var i = 0; i < this.handler.length; i++) {
		this.handler[i].update(this.entities);
	};
}

Flory.Environment.prototype.setUpVisualization = function(data) {
	this.data.visualization_data = data;
	for(var i = 0; i  < this.entities.length; i++){
		if(this.entities[i] instanceof Flory.Renderable){
			this.renderer.addRenderable(this.entities[i]);	
		}		
	}
}


Flory.Environment.prototype.disabledVisualization = function() {
	for(var i = 0; i  < this.entities.length; i++){
		if(this.entities[i] instanceof Flory.Renderable){
			this.renderer.removeRenderable(this.entity[i]);	
		}		
	}
	this.data.visualization_data = undefined;
	delete this.data.visualization_data;
}


Flory.Environment.prototype.resetEnvironment = function() {


}



