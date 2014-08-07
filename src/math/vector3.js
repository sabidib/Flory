/**
 * @author sabidib
 */

Flory.Vector3 = function(x,y,z){
	this.x = x === undefined ? 0 : x;
	this.y = y === undefined ? 0 : y;
	this.z = z === undefined ? 0 : z; 
}



Flory.Vector3.prototype = {
	constructor : Flory.Vector3,
	//** Mandatory for all vector classes **//
	clone : function(){
		return Flory.Vector3(this.x,this.y,this.z);
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
	dotProduct : function(b){
		this.x = this.x * b.x;
		this.y = this.y * b.y;
		this.z = this.z * b.z;

		return this;
	}

}