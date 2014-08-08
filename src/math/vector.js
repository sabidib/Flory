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
	if(vec == undefined){
		this.components = []
	} else {
		this.components = vec;
	}
}



Flory.Vector.prototype = {
	constructor : Flory.Vector,

	//** Mandatory for all vector classes **//
	dimension : function(){
		return this.components.length;
	},
	add : function(a){
		if(a.components.length > this.components.length){
			var i = 0;
			for(len = this.components.length;i < len; i++){
				this.components[i] += a.components[i]; 
			}
			for(len = a.components.length; i < len;i++){
				this.components[i] = 0;
				this.components[i] += a.components[i]; 
			}
		} else {
			for(var i = 0,len = a.components.length;i < len; i++){
				this.components[i] += a.components[i]; 
			}
		}
		return this;
	},

	sub : function(a){
		if(a.components.length > this.components.length){
			var i = 0;
			for(len = this.components.length;i < len; i++){
				this.components[i] -= a.components[i]; 
			}
			for(len = a.components.length; i < len;i++){
				this.components[i] = 0;
				this.components[i] -= a.components[i]; 
			}
		} else {
			for(var i = 0,len = a.components.length;i < len; i++){
				this.components[i] -= a.components[i]; 
			}
		}
		return this;
	},
	
	scale : function(num){
		for(var i = 0, len = this.components.length; i <len; i++){
			this.components[i] *= num;
		}
		return this;
	},
	mult : function(num){
		components = [];
		for(var i = 0, len = this.components.length; i <len; i++){
			components[i] = num*this.components[i];
		}
		return new Flory.Vector(components);
	},
	
	dot : function(a){
		if(a.components.length != this.components.length){
			console.log("Flory.vector.dot(a) can only accept a vector of the same dimension as the object.")
			return undefined;
		}
		var sum = 0;
		for(var i = 0,len = a.components.length;i < len; i++){
			sum += this.components[i] *a.components[i]; 
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
		var i = 0;
		if(a.components.length > this.components.length){
			for(var len = this.components.length;i < len; i++){
				sum  += (this.components[i] - a.components[i])*(this.components[i] - a.components[i]); 
			}
			for(var len = a.components.length;i<len2;i++){
				sum += (0 - a.components[i])*(0 - a.components[i]);
			}
		} else if(a.components.length < this.components.length){
			for(var len = a.components.length;i < len; i++){
				sum  += (this.components[i] - a.components[i])*(this.components[i] - a.components[i]); 
			}
			for(var len = this.components.length;i<len2;i++){
			sum  += (this.components[i] - 0)*(this.components[i] - 0); 
			}
		} else {
			for(len = a.components.length;i < len; i++){
				sum  += (this.components[i] - a.components[i])*(this.components[i] - a.components[i]); 
			}
		}
		return Math.sqrt(sum);
	},

	distanceToSq : function(a){

		var sum = 0;
		var i = 0;
		if(a.components.length > this.components.length){
			for(var len = this.components.length;i < len; i++){
				sum  += (this.components[i] - a.components[i])*(this.components[i] - a.components[i]); 
			}
			for(var len = a.components.length;i<len2;i++){
				sum += (0 - a.components[i])*(0 - a.components[i]);
			}
		} else if(a.components.length < this.components.length){
			for(var len = a.components.length;i < len; i++){
				sum  += (this.components[i] - a.components[i])*(this.components[i] - a.components[i]); 
			}
			for(var len = this.components.length;i<len2;i++){
			sum  += (this.components[i] - 0)*(this.components[i] - 0); 
			}
		} else {
			for(len = a.components.length;i < len; i++){
				sum  += (this.components[i] - a.components[i])*(this.components[i] - a.components[i]); 
			}
		}

		return sum;
	},

	clone : function(){
		return new Flory.Vector(this.components);
	}
};