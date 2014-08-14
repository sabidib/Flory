/**
 * @author sabidib
 */

/** @constructor */
Flory.Environment = function(){
	this.entities = [];
	this.renderer = {};
	this.data  = {};
	this.data.rendererType = "default";
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
			this.addedEntity(this.entities[this.entities.push(entity)-1]);	
		}
		return this;
	},
	addedEntity : function(){

	},
	update : function(data){

	},
	enableVisualization : function(data){
		if(this.data.rendererType == Flory.Environment.RendererType.Default || this.data.rendererType == ""){
			this.renderer = new Flory.Renderer();
		} else if(this.data.rendererType == Flory.Environment.RendererType.PointCloud) {
			this.renderer = new Flory.PointCloudRenderer();
		}
		this.visualization = true;
		this.setUpVisualization();
		return this;
	},
	disableVisualization : function(){ 
		this.renderer  = {}
		var elem = this.renderer.renderer.domElement;
		elem.parentElement.removeChild(elem);
		this.visualization = false;
		return this;
	},
	setUpVisualization : function(){

	},
}


Flory.Environment.RendererType = {
	Default : "default",
	PointCloud : "pointCloud",
}



