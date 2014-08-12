/**
 * @author sabidib
 */

/** @constructor */
Flory.Environment = function(){
	this.entities = [];
	this.renderer = {};
	this.visualization = false;
}


Flory.Environment.prototype = {

	constuctor : Flory.Environment,

	add : function(entity){
		if(this.id == entity.id ){
			console.log("Flory: Can't add an entity to itself.");
		} else {
			for(var i = 0, len = this.entities.length; i  < len ; i++){
				if(this.entities[i].id === entity.id){
					console.log("Flory : Can't add an entity twice to the same enviroment.");
					return undefined;
				}
			}
			if(this.visualization){
				entity.prepareRenderable();
				this.renderer.addRenderable(entity);
			}
				this.entities.push(entity);	
		}
		return this;
	},
	update : function(data){

	},
	enableVisualization : function(data){
		this.renderer = new Flory.Renderer();
		this.visualization = true;
		for(var i = 0, len = this.entities.length; i < len;i++){
			this.entities[i].prepareRenderable();
			this.renderer.addRenderable(this.entities[i]);
		}
		return this;
	},
	disableVisualization : function(){ 
		this.renderer  = {}
		var elem = this.renderer.renderer.domElement;
		elem.parentElement.removeChild(elem);
		this.visualization = false;
		return this;
	}
}




