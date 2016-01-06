/**
 * @author sabidib http://github.com/sabidib
 */

/** @constructor */
Flory.Renderable = function(){
	Flory.baseEntity.call(this);
	this.mesh = {};
	this.geometry = {};
	this.material = {};
	this.updateGeometry = true;
}


Flory.Renderable.prototype = Object.create(Flory.baseEntity.prototype);

Flory.Renderable.prototype.constructor = Flory.Renderable;

Flory.Renderable.prototype.destroy = function(){

    if(this.mesh.geometry != {}){
    	this.mesh.geometry.dispose();
    }
    if(this.mesh.material != {}){
    	this.mesh.material.dispose();
    }
    this.mesh = {}
    if(this.geometry != {}){
    	this.geometry.dispose();
    	this.geometry =  {};
    }
    if(this.material != {}){
    	this.material.dispose();
    	this.material =  {};
    }

}



