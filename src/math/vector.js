/**
 * @author sabidib
 */

/**
 * A general vector class that chooses the dimension based on the number of elements
 * in the Flory.Vector.componenets variable.
 * The drawback is that some of the calculations take a little longer and is only compatible
 * with other Flory.Vector objects.
 * @param {Array} vec An array of number values that represent each component of the vector
 */
Flory.Vector = function(vec){
	this.components = vec;
}



Flory.Vector3.prototype = {
	constructor : Flory.Vector,

	//** Mandatory for all vector classes **//
	dimension : function(){
		return this.components.length;
	},
	add : function(a){
		for(var i = 0,len = this.a.length;i < len; i++){
			this.components[i] += a[i]; 
		}
		return this;
	},

	sub : function(a){
		for(var i = 0,len = this.a.length;i < len; i++){
			this.components[i] -= a[i]; 
		}
		return this;
	},
	
	dot : function(a){
		if(a.length != b.length){
			console.log("Flory.vector.dot(a) can only accept a vector of the same dimension as the object.")
			return undefined;
		}
		var sum = 0;
		for(var i = 0,len = this.a.length;i < len; i++){
			sum += this.components[i] *a[i]; 
		}
		return sum;
	},

	length : function(){
		var sum = 0;

		for(var i = 0,len = this.components.length;i < len; i++){
			sum  += this.components[i]*this.components[i]; 
		}

		return Math.sqrt(sum);
	},

	lengthSq : function(){
		var sum = 0;

		for(var i = 0,len = this.components.length;i < len; i++){
			sum  += this.components[i]*this.components[i]; 
		}
		return sum;
	},
	
	distanceTo : function(a){
		var sum = 0;

		for(var i = 0,len = this.a.length;i < len; i++){
			sum  += (this.components[i] - a.components[i])*(this.components[i] - a.components[i]); 
		}

		for(var i = 0,len = this.components.length,len2 = this.components.length-this.a.length; len2 < len;i++){
			sum += this.components[i+len]*this.components[i+len];
		}

		return Math.sqrt(sum);
	},

	distance : function(a){

		var sum = 0;

		for(var i = 0,len = this.a.length;i < len; i++){
			sum  += (this.components[i] - a.components[i])*(this.components[i] - a.components[i]); 
		}

		for(var i = 0,len = this.components.length,len2 = this.components.length-this.a.length; len2 < len;i++){
			sum += this.components[i+len]*this.components[i+len];
		}

		return sum;
	},

	clone : function(){
		return new Flory.Vector(this.x,this.y,this.z);
	}
};