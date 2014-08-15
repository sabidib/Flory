/**
 * @author sabidib
 */


Flory.Box3D = function(x,y,z,width,height,length,name){
	Flory.Entity.call(this);
	this.name = (name == undefined ? "Box3D" : name);
	this.x = (x == undefined ? 0 : x);
	this.y = (y == undefined ? 0 : y);
	this.z = (y == undefined ? 0 : z);
	this.width = (width == undefined ? 0 : width);
	this.height = (height == undefined ? 0 :height);
	this.length = (length == undefined ? 0 :length);
}

Flory.Box3D.prototype = Object.create(Flory.Entity);

Flory.Box3D.prototype.contructor = Flory.Box3D;













