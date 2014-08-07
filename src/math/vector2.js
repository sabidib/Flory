/**
 * @author sabidib
 */

Flory.Vector2 = function(x,y){
	this.x = (x === undefined) ? 0 : x;
	this.y = (y === undefined) ? 0 : y;
}



Flory.Vector2.prototype = {
	constructor : Flory.Vector2,

	//** Mandatory for all vector classes **//
	
	dimension : function(){
		return 2;
	},

	add : function(a){
		this.x += a.x;
		this.y += a.y;

		return this;
	},

	sub : function(a){
		this.x -= a.x;
		this.y -= a.y;

		return this;
	},
	scale : function(num){
		this.x *= num;
		this.y *= num;
		
		return this;
	},
	dot : function(a){
		return this.x * a.x + this.y * a.y ;
	},

	length : function(){
		return Math.sqrt(this.x*this.x + this.y*this.y );
	},

	lengthSq : function(){
		return this.x*this.x + this.y*this.y;
	},
	
	distanceTo : function(a){
		return Math.sqrt((a.x - this.x)*(a.x - this.x) + (a.y - this.y)*(a.y - this.y)); 
	},

	distanceToSq : function(a){
		return ((a.x - this.x)*(a.x - this.x) + (a.y - this.y)*(a.y - this.y)); 
	},

	clone : function(){
		return new Flory.Vector2(this.x,this.y);
	}
};