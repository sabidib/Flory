/**
 * @author sabidib
 */

Flory.Vector3 = function(x,y,z){
	this.x = (x === undefined) ? 0 : x;
	this.y = (y === undefined) ? 0 : y;
	this.z = (z === undefined) ? 0 : z; 
}



Flory.Vector3.prototype = {
	constructor : Flory.Vector3,

	//** Mandatory for all vector classes **//
	
	dimension : function(){
		return 3;
	},

	add : function(a){
		this.x += a.x;
		this.y += a.y;
		this.z += a.z;

		return this;
	},

	sub : function(a){
		this.x -= a.x;
		this.y -= a.y;
		this.z -= a.z;

		return this;
	},

	scale : function(num){
		this.x *= num;
		this.y *= num;
		this.z *= num;
		
		return this;
	},
	mult : function(num){
		return new Flory.Vector3(this.x*num, this.y*num,this.z*num);
	},
	
	dot : function(a){
		return this.x * a.x + this.y * a.y + this.z * a.z;
	},

	length : function(){
		return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
	},

	lengthSq : function(){
		return this.x*this.x + this.y*this.y + this.z*this.z;
	},
	
	distanceTo : function(a){
		return Math.sqrt((a.x - this.x)*(a.x - this.x) + (a.y - this.y)*(a.y - this.y) + (a.z - this.z)*(a.z - this.z)); 
	},

	distanceToSq : function(a){
		return ((a.x - this.x)*(a.x - this.x) + (a.y - this.y)*(a.y - this.y) + (a.z - this.z)*(a.z - this.z)); 
	},

	clone : function(){
		return new Flory.Vector3(this.x,this.y,this.z);
	}
};