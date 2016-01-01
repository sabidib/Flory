/**
 * @author sabidib http://github.com/sabidib
 */


Flory.Box2D = function(x,y,width,height,name){
	Flory.Entity.call(this);
	this.name = (name == undefined ? "Box2D" : name);
	this.x = (x == undefined ? 0 : x);
	this.y = (y == undefined ? 0 : y);
	this.width = (width == undefined ? 0 : width);
	this.height = (height == undefined ? 0 :height);
}

Flory.Box2D.prototype = Object.create(Flory.Entity);

Flory.Box2D.prototype.contructor = Flory.Box2D;













